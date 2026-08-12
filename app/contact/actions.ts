"use server";

import { SERVICES } from "@/lib/data/services";

export type FormState = {
  success: boolean;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
    service?: string;
    budget?: string;
    server?: string;
  };
};

const BUDGETS = new Set(["under-10k", "10k-25k", "25k-50k", "over-50k"]);

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export async function submitContactForm(_prevState: FormState, formData: FormData): Promise<FormState> {
  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const org = readText(formData, "org");
  const service = readText(formData, "service");
  const budget = readText(formData, "budget");
  const message = readText(formData, "message");

  const errors: NonNullable<FormState["errors"]> = {};

  if (!name) errors.name = "Name is required.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Provide a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or fewer.";
  }

  if (!message) errors.message = "Message cannot be empty.";
  else if (message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";

  if (!SERVICES.some((item) => item.slug === service)) {
    errors.service = "Select a listed service.";
  }

  if (!BUDGETS.has(budget)) {
    errors.budget = "Select a listed budget range.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrg = escapeHtml(org || "None");
  const safeService = escapeHtml(service);
  const safeBudget = escapeHtml(budget);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Kawaki Site <onboarding@resend.dev>",
          to: "hello@kawaki.co.in",
          subject: `New Project Inquiry: ${safeName}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Organization:</strong> ${safeOrg}</p>
            <p><strong>Service:</strong> ${safeService}</p>
            <p><strong>Budget:</strong> ${safeBudget}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Resend API error:", errorData);
        return { success: false, errors: { server: "Email transmission failed. Server error." } };
      }
    } catch (error: unknown) {
      console.error("Failed to send email via Resend:", error);
      return { success: false, errors: { server: "Network error during email dispatch." } };
    }
  } else {
    console.log("CONTACT FORM INQUIRY (RESEND_API_KEY NOT CONFIGURED):", { name, email, org, service, budget, message });
  }

  return { success: true };
}
