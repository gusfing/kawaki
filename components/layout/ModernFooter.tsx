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
                <li><a href='#about'>About</a></li>
                <li><a href='#method'>Process</a></li>
                <li><a href='#work'>Selected work</a></li>
                <li><a href='#contact'>Contact</a></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Services</h5>
            <ul>
                <li><a href='#capabilities'>Web Development</a></li>
                <li><a href='#capabilities'>Ecommerce Development</a></li>
                <li><a href='#capabilities'>Web App Development</a></li>
                <li><a href='#capabilities'>Frontend Engineering</a></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Industries</h5>
            <ul>
                <li><a href='#capabilities'>Retail & E-commerce</a></li>
                <li><a href='#capabilities'>Healthcare</a></li>
                <li><a href='#capabilities'>SaaS & Technology</a></li>
                <li><a href='#capabilities'>Financial Services</a></li>
            </ul>
          </div>
          <div className='foot-col'>
            <h5>Connect</h5>
            <ul>
                <li><a href='mailto:hello@kawaki.studio' target='_blank' rel='noreferrer noopener'>Email</a></li>
                <li><a href='https://github.com' target='_blank' rel='noreferrer noopener'>GitHub</a></li>
                <li><a href='#contact'>LinkedIn</a></li>
                <li><a href='#contact'>Instagram</a></li>
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
