import Link from "next/link";

export function ModernFooter() {
  return (
    <footer data-od-id='footer'>
      <div className='container'>
        <div className='foot-grid'>
          <div className='foot-brand'>
            <Link href='#top' className='brand'>
              <img className='brand-mark' src='/assets/kawaki-logo.png' alt='Kawaki Studios logo' width='36' height='36' />
              <span>Kawaki</span>
            </Link>
            <p style={{"marginTop":"18px"}}>Kawaki Studios is a Delhi-based web development studio building precise, durable web systems — websites, storefronts, and web apps for teams who've outgrown templates. <Link className='inline-link' href='#contact'>Start a project</Link>.</p>
          </div>
          <div className='foot-col'>
            <h5>Studio</h5>
            <ul>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/process'>Process</Link></li>
                <li><Link href='/case-studies'>Selected work</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Services</h5>
            <ul>
                <li><Link href='/services/web-development'>Web Development</Link></li>
                <li><Link href='/services/ecommerce-development'>Ecommerce Development</Link></li>
                <li><Link href='/services/web-app-development'>Web App Development</Link></li>
                <li><Link href='/services/frontend-development'>Frontend Engineering</Link></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Industries</h5>
            <ul>
                <li><Link href='/industries/retail'>Retail & E-commerce</Link></li>
                <li><Link href='/industries/healthcare'>Healthcare</Link></li>
                <li><Link href='/industries/saas'>SaaS & Technology</Link></li>
                <li><Link href='/industries/finance'>Financial Services</Link></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Connect</h5>
            <ul>
                <li><a href='mailto:hello@kawaki.studio' target='_blank' rel='noreferrer noopener'>Email</a></li>
                <li><a href='https://github.com' target='_blank' rel='noreferrer noopener'>GitHub</a></li>
                <li><Link href='/contact'>LinkedIn</Link></li>
                <li><Link href='/contact'>Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className='foot-bottom'>
          <span><span className='pulse'></span>● <b style={{"color":"var(--ink)"}}>Kawaki</b> · © 2026 · 2026 / Vol. 01 / Issue Nº 01</span>
          <span className='right'>
            <span>Delhi / Est. 2019</span>
            <span>28.6139° N · 77.2090° E</span>
            <span style={{"color":"var(--coral)"}}>♥ MMXXVI</span>
          </span>
        </div>
        <div className='foot-mega'>
          <div className='word' data-reveal='rise-lg'>Made <em>to last</em>.</div>
        </div>
      </div>
    </footer>
  );
}
