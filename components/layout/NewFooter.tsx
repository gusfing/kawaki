import Link from 'next/link';

export function NewFooter() {
  return (
    <footer className="w-full bg-ink-900 text-ink-inverse px-10 py-16">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        <div className="mb-20 text-center">
          <h2 className="font-display font-semibold text-4xl md:text-6xl mb-6">Ready to start a project?</h2>
          <Link href="/contact" className="inline-block px-8 py-4 bg-accent text-ink-inverse font-mono font-bold text-lg rounded-full hover:bg-white hover:text-ink transition-colors">
            Get in touch ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full border-t border-line-inverse pt-16">
          <div className="flex flex-col">
            <h4 className="font-display uppercase text-sm tracking-widest text-slate mb-6">Studio</h4>
            <Link href="/about" className="font-body text-lg mb-3 hover:text-accent transition-colors">About</Link>
            <Link href="/process" className="font-body text-lg mb-3 hover:text-accent transition-colors">Process</Link>
            <Link href="/contact" className="font-body text-lg mb-3 hover:text-accent transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col">
            <h4 className="font-display uppercase text-sm tracking-widest text-slate mb-6">Services</h4>
            <Link href="/services/web-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Web Development</Link>
            <Link href="/services/ecommerce-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Ecommerce</Link>
            <Link href="/services/shopify-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Shopify</Link>
            <Link href="/services/wordpress-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">WordPress</Link>
            <Link href="/services/web-app-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Web Apps</Link>
            <Link href="/services/frontend-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Frontend</Link>
            <Link href="/services/backend-development" className="font-body text-lg mb-3 hover:text-accent transition-colors">Backend</Link>
            <Link href="/services/maintenance-support" className="font-body text-lg mb-3 hover:text-accent transition-colors">Maintenance</Link>
          </div>
          <div className="flex flex-col">
            <h4 className="font-display uppercase text-sm tracking-widest text-slate mb-6">Industries</h4>
            <Link href="/industries/retail" className="font-body text-lg mb-3 hover:text-accent transition-colors">Retail</Link>
            <Link href="/industries/healthcare" className="font-body text-lg mb-3 hover:text-accent transition-colors">Healthcare</Link>
            <Link href="/industries/saas" className="font-body text-lg mb-3 hover:text-accent transition-colors">SaaS</Link>
            <Link href="/industries/finance" className="font-body text-lg mb-3 hover:text-accent transition-colors">Finance</Link>
            <Link href="/industries/architecture" className="font-body text-lg mb-3 hover:text-accent transition-colors">Architecture</Link>
          </div>
          <div className="flex flex-col">
            <h4 className="font-display uppercase text-sm tracking-widest text-slate mb-6">Insights & Socials</h4>
            <Link href="/blog" className="font-body text-lg mb-3 hover:text-accent transition-colors">Blog</Link>
            <Link href="/faqs" className="font-body text-lg mb-3 hover:text-accent transition-colors">FAQs</Link>
            <Link href="/guides" className="font-body text-lg mb-3 hover:text-accent transition-colors">Guides</Link>
            <a href="#" className="font-body text-lg mb-3 hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="font-body text-lg mb-3 hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="font-body text-lg mb-3 hover:text-accent transition-colors">Instagram</a>
          </div>
        </div>

        <div className="w-full mt-20 text-center text-slate font-mono text-sm border-t border-line-inverse pt-8">
          <span>&copy; 2026 Kawaki Studios. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
