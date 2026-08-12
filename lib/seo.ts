import type { Metadata } from "next";

type MetadataProps = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: MetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kawaki.co.in";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Kawaki Studios",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kawaki Studios",
    url: "https://kawaki.co.in",
    logo: "https://kawaki.co.in/logo.png",
    sameAs: [
      "https://twitter.com/kawakistudios",
      "https://linkedin.com/company/kawakistudios",
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  datePublished,
  authorName,
  url,
  image,
}: {
  title: string;
  description: string;
  datePublished: string;
  authorName: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Kawaki Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://kawaki.co.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: image || "https://kawaki.co.in/og-image.png",
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
