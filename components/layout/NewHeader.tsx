import Link from 'next/link';

export function NewHeader() {
  return (
    <header className="absolute top-0 left-0 w-full px-6 py-8 flex items-center justify-between z-50 text-ink-inverse border-b border-line-inverse">
      <div className="flex gap-10 items-center flex-1">
        <Link href="/" className="font-mono text-lg hover:text-accent transition-colors">Home</Link>
        <div className="mega-menu-trigger">
          <Link href="/services" className="font-mono text-lg hover:text-accent transition-colors">Services ▾</Link>
          <div className="mega-menu wide text-left">
            <div className="mega-col">
              <h4>Services</h4>
              <Link href="/services/web-development">Web Development</Link>
              <Link href="/services/ecommerce-development">Ecommerce</Link>
              <Link href="/services/shopify-development">Shopify</Link>
              <Link href="/services/wordpress-development">WordPress</Link>
            </div>
            <div className="mega-col">
              <h4>&nbsp;</h4>
              <Link href="/services/web-app-development">Web Apps</Link>
              <Link href="/services/frontend-development">Frontend</Link>
              <Link href="/services/backend-development">Backend</Link>
              <Link href="/services/maintenance-support">Maintenance</Link>
            </div>
            <div className="mega-col">
              <h4>Industries</h4>
              <Link href="/industries/retail">Retail</Link>
              <Link href="/industries/healthcare">Healthcare</Link>
              <Link href="/industries/saas">SaaS</Link>
              <Link href="/industries/finance">Finance</Link>
              <Link href="/industries/architecture">Architecture</Link>
            </div>
          </div>
        </div>
        <Link href="/about" className="font-mono text-lg hover:text-accent transition-colors">About</Link>
      </div>

      <div className="flex-1 text-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:text-accent transition-colors">
          Kawaki Studios
        </Link>
      </div>

      <div className="flex gap-10 items-center justify-end flex-1">
        <div className="mega-menu-trigger">
          <Link href="/case-studies" className="font-mono text-lg hover:text-accent transition-colors">Work ▾</Link>
          <div className="mega-menu align-right text-left" style={{ gridTemplateColumns: '1fr', width: '250px' }}>
            <div className="mega-col">
              <h4>Selected Work</h4>
              <Link href="/case-studies/acme-headless-ecommerce">Acme E-commerce</Link>
              <Link href="/case-studies/curology-brand-refresh">Curology Refresh</Link>
              <Link href="/case-studies/fintech-roi-calculator">Fintech ROI Calculator</Link>
            </div>
          </div>
        </div>
        <Link href="/blog" className="font-mono text-lg hover:text-accent transition-colors">Blog</Link>
        <Link href="/contact" className="font-mono text-lg hover:text-accent transition-colors">Contact</Link>
      </div>
    </header>
  );
}
