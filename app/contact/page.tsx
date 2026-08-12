"use client";

import { useActionState } from "react";
import { submitContactForm, FormState } from "./actions";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const initialState: FormState = {
  success: false,
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  const budgetOptions = [
    { value: "under-10k", label: "Under $10k" },
    { value: "10k-25k", label: "$10k – $25k" },
    { value: "25k-50k", label: "$25k – $50k" },
    { value: "over-50k", label: "$50k+" }
  ];

  const inputSelectStyles = cn(
    "w-full bg-paper border border-line rounded-[2px] px-4 py-3 font-body text-base text-ink placeholder:text-slate/50 transition-shadow appearance-none",
    "focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal focus:ring-opacity-50"
  );

  return (
    <>
      {/* Sub-Hero Header */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Connect" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Start a project.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              Tell us what you&rsquo;re building. We&rsquo;ll review your requirements and reply within
              1 business day with next steps. No sales pitch, just direct technical engineering feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

            {/* Sidebar Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <Eyebrow label="Contact Details" className="mb-8" />
                <div className="space-y-12">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-3 block">
                      Direct Email
                    </span>
                    <a
                      href="mailto:hello@kawaki.co.in"
                      className="font-display font-semibold text-xl md:text-2xl text-ink hover:text-signal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-[2px]"
                    >
                      hello@kawaki.co.in
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-3 block">
                      Direct Line
                    </span>
                    <a
                      href="tel:+918368246502"
                      className="font-display font-semibold text-xl md:text-2xl text-ink hover:text-signal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-[2px]"
                    >
                      +91 83682 46502
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-3 block">
                      Studio Coordinates
                    </span>
                    <p className="font-body text-lg text-slate">
                      Delhi, India &bull; 28.6139&deg; N, 77.2090&deg; E
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 lg:mt-0 pt-8 border-t border-line font-mono text-xs text-slate space-y-2">
                <div>RESPONSIVENESS average &bull; 24 hours</div>
                <div>No sales call required to get a straight technical answer.</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-field border border-line p-8 md:p-12 relative">

                {/* Aria-live region for accessibility announcement */}
                <div aria-live="polite" className="sr-only">
                  {state.success && "Form submitted successfully. We will be in touch shortly."}
                  {state.errors?.server && `Submission failed. ${state.errors.server}`}
                </div>

                {state.success ? (
                  <div className="text-left py-8">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-dim text-accent font-bold mb-6 text-xl">
                      ✓
                    </span>
                    <h3 className="font-display font-semibold text-2xl text-ink mb-4">
                      Message sent successfully.
                    </h3>
                    <p className="font-body text-base text-slate max-w-[45ch]">
                      Thank you. We review inquiries personally and will get back to you with scoping details shortly.
                    </p>
                  </div>
                ) : (
                  <form action={formAction} className="space-y-6">
                    {state.errors?.server && (
                      <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 font-mono text-xs rounded-sm">
                        ERROR: {state.errors.server}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="Your Name *"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        error={state.errors?.name}
                      />
                      <FormField
                        label="Email Address *"
                        type="email"
                        name="email"
                        placeholder="email@address.com"
                        required
                        error={state.errors?.email}
                      />
                    </div>

                    <FormField
                      label="Organization / Company"
                      type="text"
                      name="org"
                      placeholder="Company name"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Service Select Field */}
                      <div className="flex flex-col gap-2 w-full">
                        <label className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
                          Interested Capability
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            defaultValue="web-development"
                            aria-invalid={Boolean(state.errors?.service)}
                            aria-describedby={state.errors?.service ? "service-error" : undefined}
                            className={inputSelectStyles}
                          >
                            {SERVICES.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </div>
                        </div>
                        {state.errors?.service && (
                          <span id="service-error" className="font-mono text-xs text-red-500">
                            {state.errors.service}
                          </span>
                        )}
                      </div>

                      {/* Budget Select Field */}
                      <div className="flex flex-col gap-2 w-full">
                        <label className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
                          Estimated Budget
                        </label>
                        <div className="relative">
                          <select
                            name="budget"
                            defaultValue="10k-25k"
                            aria-invalid={Boolean(state.errors?.budget)}
                            aria-describedby={state.errors?.budget ? "budget-error" : undefined}
                            className={inputSelectStyles}
                          >
                            {budgetOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </div>
                        </div>
                        {state.errors?.budget && (
                          <span id="budget-error" className="font-mono text-xs text-red-500">
                            {state.errors.budget}
                          </span>
                        )}
                      </div>
                    </div>

                    <FormField
                      label="What are you building? *"
                      textarea
                      name="message"
                      placeholder="Describe your project, code constraints, and business goals..."
                      required
                      error={state.errors?.message}
                    />

                    <Button type="submit" disabled={isPending} className="w-full justify-center">
                      {isPending ? "Sending..." : "Start a project"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
