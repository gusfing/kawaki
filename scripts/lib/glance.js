/* "At a glance": a short, quotable facts block for service, city and solution pages.
   Answer engines and AI assistants lift short factual statements; this gives every page one,
   built only from verified facts (AGENTS.md, data/kawaki-facts.json):
   - most custom builds ₹1,50,000 to ₹5,00,000, or $2,500 to $10,000 abroad, billed by milestone
   - web apps at the top of that range or above
   - a typical marketing site takes 4 to 8 weeks
   - one studio, in New Delhi; other cities are served remotely
   Security, SEO, automation and maintenance work is quoted per project (no price is stated). */
const S = require('./shell');

const APP = /web-app|application|mobile-app|app-development|saas-mvp|ai-saas|mvp|software|(^|[-\/])(erp|lms)([-\/]|$)|portal|management-system|school-erp/;
const NOT_APP = /seo|marketing|content|growth/;
const NOT_BUILD = /backdoor|removal|spam|cleanup|hardening|conversion|security|malware|backup|recovery|monitoring|maintenance|migration|firewall|blacklist|database|performance|virus|vulnerability|file-restoration|hack|seo|automation|agent|chatbot|receptionist|reddit|marketing|content|citation|audit|optimization|link-building|lead-|crm|email|whatsapp|zapier|n8n|make-automation/;
const BUILD = /website|web-development|web-design|ecommerce|shopify|woocommerce|wordpress|landing-page|redesign|custom-web|webflow/;

function kindOf(slug) {
  if (APP.test(slug) && !NOT_APP.test(slug)) return 'app';
  if (BUILD.test(slug) && !NOT_BUILD.test(slug.replace(/seo-website-development|ai-website-development/, 'website'))) return 'build';
  return 'quote';
}

const CITY_KIND = {
  Delhi: 'home', Gurgaon: 'near', Noida: 'near', Ghaziabad: 'near', Faridabad: 'near',
  Dubai: 'abroad', London: 'abroad', Canada: 'abroad'
};

/* name: what the page offers, in lower case ("shopify development", "web design").
   slug: the page path without the leading slash. city: the city name for city pages. */
function glance({ name, slug, city }) {
  const kind = kindOf(slug);
  const ck = city ? (CITY_KIND[city] || 'india') : null;
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  const where = city ? ` for ${city} businesses` : '';
  const clause = kind === 'build'
    ? 'usually for ₹1,50,000 to ₹5,00,000, with a typical marketing site live in 4 to 8 weeks'
    : kind === 'app'
      ? 'planned in milestones and usually priced at the top of our ₹1,50,000 to ₹5,00,000 range or above'
      : 'quoted per project after a short call about what you need';
  const lead = `${Name}${where}: done at Kawaki Studios by the developers in our New Delhi studio, ${clause}.`;

  const studioNote = !city ? 'The developers you speak to are the people who do the work.'
    : ck === 'home' ? 'The studio is in the city, so the first meeting can be in person.'
      : ck === 'near' ? `A short trip from ${city}, so meeting in person is easy; day-to-day work runs remotely.`
        : ck === 'abroad' ? `Work for clients in ${city} runs remotely, with agreed overlap hours for calls.`
          : `Work for ${city} clients runs remotely, through calls, a shared repository and staging links.`;
  const rows = [['Studio', 'Kawaki Studios, New Delhi', studioNote]];
  if (kind === 'build') {
    rows.push(['Cost', '₹1,50,000 to ₹5,00,000', 'For most custom builds; $2,500 to $10,000 for clients outside India. Billed by milestone.']);
    rows.push(['Timeline', '4 to 8 weeks', 'For a typical marketing site. Larger builds are scoped in discovery.']);
  } else if (kind === 'app') {
    rows.push(['Cost', '₹5,00,000 and up', 'Web and mobile apps sit at the top of our ₹1,50,000 to ₹5,00,000 range or above. Billed by milestone.']);
    rows.push(['Timeline', 'Set in discovery', 'Planned as milestones, each with a working staging link.']);
  } else {
    rows.push(['Cost', 'Quoted per project', 'After a short call about the site or workflow. Billed by milestone.']);
  }
  rows.push(['Working', 'Git repository and staging', 'Work happens in a Git repository, with a staging link to test at each milestone.']);

  const html = `<section class="sec wrap glance" aria-labelledby="glance-title">
            <div class="sec-head grid">
                <h2 class="h2" id="glance-title" data-reveal>At a glance</h2>
                <div class="sec-head__aside"><p>${S.esc(lead)}</p></div>
            </div>
            <dl class="spec">
                ${rows.map(([dt, val, note]) => `<div class="spec__row"><dt>${dt}</dt><dd class="spec__val">${S.esc(val)}</dd><dd class="spec__note">${S.esc(note)}</dd></div>`).join('\n                ')}
            </dl>
        </section>`;

  // Service schema extras: who provides it, where, and a price range when one is verified.
  const ld = {
    provider: { '@type': 'ProfessionalService', '@id': S.SITE + '/#localservice', name: 'Kawaki Studios' },
    areaServed: city ? { '@type': ck === 'abroad' ? 'Place' : 'City', name: city } : [{ '@type': 'Country', name: 'India' }, 'Worldwide']
  };
  if (kind !== 'quote') {
    ld.offers = {
      '@type': 'Offer', priceCurrency: 'INR',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: kind === 'app' ? 500000 : 150000, ...(kind === 'build' ? { maxPrice: 500000 } : {}) }
    };
  }
  return { html, ld, kind, lead };
}

module.exports = { glance, kindOf };
