import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Barlow_Condensed, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { organizationJsonLd } from "@/lib/seo";
import { NewHeader } from "@/components/layout/NewHeader";
import { NewFooter } from "@/components/layout/NewFooter";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-host-grotesk",
});

export const metadata: Metadata = {
  title: "Kawaki Studios",
  description: "Custom web apps that outgrow spreadsheets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${hostGrotesk.variable}`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-[100dvh] bg-paper w-full overflow-x-hidden text-ink font-body">
        <SmoothScroll>
          <MotionConfig reducedMotion="user">
            <SkipLink />
            <NewHeader />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <NewFooter />
          </MotionConfig>
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
