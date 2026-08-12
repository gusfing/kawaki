import Link from "next/link";

const SERVICES = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "E-commerce Development", href: "/services/ecommerce-development" },
  { label: "Shopify Development", href: "/services/shopify-development" },
  { label: "WordPress Development", href: "/services/wordpress-development" },
  { label: "Web App Development", href: "/services/web-app-development" },
  { label: "Frontend Development", href: "/services/frontend-development" },
  { label: "Backend Development", href: "/services/backend-development" },
  { label: "Maintenance & Support", href: "/services/maintenance-support" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "FAQs", href: "/faqs" },
];

const footerLink =
  "font-body text-sm text-ink-inverse/55 hover:text-ink-inverse transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px] w-fit";

const colHead =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-ink-inverse/40 mb-6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark-section bg-grid-inverse pt-24 pb-12 px-5 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Coordinate signature block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-20 border-b border-line-inverse">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent mb-6 block">
              Kawaki Studios — Delhi
            </span>
            <p className="font-display font-bold text-3xl md:text-4xl leading-[1.08] tracking-[-0.02em] text-ink-inverse">
              Have a project worth building right?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 mt-8 font-body text-base text-ink-inverse hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <dl className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-inverse/50 grid grid-cols-2 gap-x-12 gap-y-4 shrink-0">
            <div>
              <dt className="text-ink-inverse/35 mb-1">Latitude</dt>
              <dd className="text-ink-inverse tabular-nums">28.6139° N</dd>
            </div>
            <div>
              <dt className="text-ink-inverse/35 mb-1">Longitude</dt>
              <dd className="text-ink-inverse tabular-nums">77.2090° E</dd>
            </div>
            <div>
              <dt className="text-ink-inverse/35 mb-1">Established</dt>
              <dd className="text-ink-inverse tabular-nums">2019</dd>
            </div>
            <div>
              <dt className="text-ink-inverse/35 mb-1">Shipped</dt>
              <dd className="text-ink-inverse tabular-nums">142 projects</dd>
            </div>
          </dl>
        </div>

        {/* Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          <div>
            <h4 className={colHead}>Services</h4>
            <ul className="space-y-4 flex flex-col">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={colHead}>Company</h4>
            <ul className="space-y-4 flex flex-col">
              {COMPANY.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={colHead}>Resources</h4>
            <ul className="space-y-4 flex flex-col">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={colHead}>Contact</h4>
            <address className="not-italic space-y-4 flex flex-col">
              <a href="mailto:hello@kawaki.co.in" className={footerLink}>
                hello@kawaki.co.in
              </a>
              <a href="tel:+918368246502" className={footerLink}>
                +91 83682 46502
              </a>
            </address>
          </div>
        </div>

        {/* Bottom meta line */}
        <div className="pt-8 border-t border-line-inverse flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-inverse/50">
            © {currentYear} Kawaki Studios
          </span>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-inverse/50">
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
