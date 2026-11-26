/* Kawaki Studios: copy for city pages (location hubs and city + service pages).
   One studio, in New Delhi. Pages never claim an office or a local team elsewhere
   (data/kawaki-facts.json disallows it); they say plainly how remote work runs.
   Long paragraphs carry the city and service, so no two pages share one. */
const { display, lower } = require('./service-copy');
const SC = require('./service-copy');

const CITY = {
  Delhi: { kind: 'home', who: 'Delhi businesses, from retailers and clinics to schools and service firms' },
  Gurgaon: { kind: 'near', who: 'Gurgaon companies, from startups to the regional offices of larger firms' },
  Noida: { kind: 'near', who: 'Noida companies, from software teams to manufacturers and education groups' },
  Mumbai: { kind: 'india', who: 'Mumbai brands, from retail and media to finance and real estate' },
  Bangalore: { kind: 'india', who: 'Bangalore startups and product teams' },
  Pune: { kind: 'india', who: 'Pune manufacturers, software firms and education businesses' },
  Hyderabad: { kind: 'india', who: 'Hyderabad startups, healthcare groups and service firms' },
  Ahmedabad: { kind: 'india', who: 'Ahmedabad manufacturers, exporters and consumer brands' },
  Vadodara: { kind: 'india', who: 'Vadodara manufacturers and engineering firms' },
  Jaipur: { kind: 'india', who: 'Jaipur brands in craft, jewellery, travel and retail' },
  Chandigarh: { kind: 'india', who: 'Chandigarh clinics, education businesses and local brands' },
  Ludhiana: { kind: 'india', who: 'Ludhiana manufacturers, textile firms and exporters' },
  Kolkata: { kind: 'india', who: 'Kolkata firms, from architecture practices to retailers and schools' },
  Ghaziabad: { kind: 'near', who: 'Ghaziabad manufacturers, schools and service businesses' },
  Faridabad: { kind: 'near', who: 'Faridabad manufacturers, exporters and service firms' },
  Chennai: { kind: 'india', who: 'Chennai manufacturers, healthcare groups and software firms' },
  Lucknow: { kind: 'india', who: 'Lucknow businesses, from schools and clinics to retailers and service firms' },
  Indore: { kind: 'india', who: 'Indore manufacturers, education businesses and startups' },
  Dubai: { kind: 'abroad', who: 'Dubai businesses, from retail and hospitality to property' },
  London: { kind: 'abroad', who: 'London startups and growing businesses' },
  Canada: { kind: 'abroad', who: 'Canadian startups and small businesses' }
};

/* The service behind a city page's business-type name. */
const NOUN = {
  'SEO Company': 'SEO', 'AI Automation Agency': 'AI automation', 'AI SEO Agency': 'AI SEO', 'Digital Marketing Agency': 'digital marketing',
  'Ecommerce SEO Agency': 'ecommerce SEO', 'Google Business Profile Agency': 'Google Business Profile management', 'Local SEO Agency': 'local SEO',
  'Local SEO': 'local SEO', 'Real Estate Marketing Agency': 'real estate marketing', 'SaaS SEO Agency': 'SaaS SEO', 'Web Design Company': 'web design',
  'Web Development Company': 'web development', 'Website Recovery Service': 'website recovery', 'Remote Web Development': 'remote web development',
  'Technical Search Architecture': 'technical SEO', 'Mobile App Development Company': 'mobile app development'
};
const GROUP_OF_NOUN = {
  'SEO': 'seo', 'AI automation': 'automation', 'AI SEO': 'aisearch', 'digital marketing': 'marketing', 'ecommerce SEO': 'seo',
  'Google Business Profile management': 'local', 'local SEO': 'local', 'real estate marketing': 'marketing', 'SaaS SEO': 'seo',
  'web design': 'webdev', 'web development': 'webdev', 'website recovery': 'security', 'remote web development': 'webdev',
  'technical SEO': 'seo', 'mobile app development': 'mobile'
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function office(city, what) {
  const k = (CITY[city] || { kind: 'india' }).kind;
  if (k === 'home') return `Yes. The studio is in New Delhi, so ${what} work can start with an in-person kickoff, then run through calls, a shared repository and staging links.`;
  if (k === 'near') return `Our studio is in New Delhi, a short trip from ${city}, so meeting in person is easy to arrange. Day-to-day ${what} work runs remotely, through calls, a shared repository and staging links.`;
  if (k === 'abroad') return `No. We work with clients in ${city} remotely from New Delhi. Studio hours are 10:00 to 19:00 IST, and for ${what} projects we agree regular overlap hours for calls.`;
  return `No. We run ${what} projects for ${city} clients remotely from our New Delhi studio, through video calls, a shared Git repository and a staging link at every milestone.`;
}

/* City + service pages: the service group's copy, framed for the city. */
function cityServiceCopy(entry) {
  const city = entry.location;
  const noun = NOUN[entry.service] || lower(entry.service);
  const g = GROUP_OF_NOUN[noun] || 'webdev';
  const N = `${cap(noun)} for ${city} businesses`;
  const n = `${noun} for ${city} businesses`;
  const c = SC.COPY[g](N, n, '');
  const faqs = c.faqs.slice(0, 3).concat([{ q: `Do you have an office in ${city}?`, a: office(city, noun) }]);
  if (city === 'Gurgaon' && entry.service === 'Web Development Company') {
    faqs.push({
      q: 'How does Kawaki Studios compare to traditional IT companies in Gurgaon?',
      a: 'Many IT companies in Gurgaon and Udyog Vihar operate as staffing agencies or rely on bought templates. Kawaki Studios is an independent web engineering studio. You work directly with the developers writing your code, with no account managers, no page builders, and complete Git repository ownership at launch.'
    });
    faqs.push({
      q: 'Can you build custom Shopify and WordPress platforms for Gurgaon companies?',
      a: 'Yes. We engineer custom Shopify stores and headless commerce frontends, as well as lightweight WordPress platforms with custom blocks rather than sluggish page builders.'
    });
  } else if (city === 'Gurgaon' && entry.service === 'Mobile App Development Company') {
    faqs.push({
      q: 'Do you build Android and iOS apps for companies in Cyber City and Udyog Vihar?',
      a: 'Yes. We engineer cross-platform mobile apps using Flutter and React Native, as well as native Swift and Kotlin applications, deployed directly under your company developer accounts.'
    });
  }
  return {
    section1Title: `${cap(noun)} in ${city}`,
    overviewParagraph: c.overview,
    valueCards: c.cards,
    challengeTitle: c.challengeTitle,
    challengeDesc: c.challenge,
    deliverables: c.deliverables,
    archTitle: c.archTitle,
    archDesc: c.arch,
    processSteps: c.steps,
    faqs
  };
}

/* City hubs: what we build for businesses there, and how remote work runs. */
function cityHubCopy(entry) {
  const city = entry.location;
  const info = CITY[city] || { kind: 'india', who: `${city} businesses` };
  const how = info.kind === 'home' ? 'from our studio in the city' : info.kind === 'near' ? 'remotely from our New Delhi studio, close enough to meet in person' : 'remotely from our New Delhi studio';
  return {
    section1Title: `Websites and web apps for ${city}`,
    overviewParagraph: `Kawaki Studios designs and builds custom websites, web applications and Shopify stores for ${info.who}. We work ${how}, and you speak directly with the developers building your project.`,
    valueCards: [
      { title: 'Built by the people you talk to', body: 'No account managers between you and the developers.' },
      { title: 'No page builders', body: 'Designed and coded by hand, with no bought themes underneath.' },
      { title: 'Staging links throughout', body: 'Every milestone is live on a link you can open and review.' }
    ],
    challengeTitle: `What ${city} businesses ask us for`,
    challengeDesc: `Most projects from ${city} start with a website that no longer fits the business, a process still run on spreadsheets, or a store that has outgrown its theme. These are the builds we take on most often there.`,
    deliverables: [
      { title: 'Custom websites', body: 'Company, marketing and catalogue sites, designed and coded by hand.' },
      { title: 'Web applications', body: 'Portals, dashboards and internal tools with sign-in and user roles.' },
      { title: 'Shopify stores', body: 'Custom themes, or a headless storefront when the catalogue needs one.' },
      { title: 'Automation and search', body: 'Workflows between your tools, technical SEO and AI search work.' }
    ],
    archTitle: `Working with us from ${city}`,
    archDesc: `Four stages, run ${how}. Every milestone of a ${city} project lands on a staging link before anything goes live.`,
    processSteps: [
      { num: 1, title: 'Discovery call', desc: 'Goals, content and integrations written down before design starts.' },
      { num: 2, title: 'Proposal', desc: 'The work split into milestones, each priced before it starts.' },
      { num: 3, title: 'Build', desc: 'Designed and coded in milestones, each on a staging link.' },
      { num: 4, title: 'Launch', desc: 'Deployment, redirects and checks, then the repository is yours.' }
    ],
    faqs: [
      { q: `Do you have an office in ${city}?`, a: office(city, 'website and web app') },
      { q: `How much does a website cost for a ${city} business?`, a: `Most of our custom builds fall between ₹1,50,000 and ₹5,00,000, or $2,500 to $10,000 for clients abroad. For ${city} projects, as everywhere, each milestone is priced before work on it starts.` },
      { q: `Which services do you offer in ${city}?`, a: `Custom websites, web applications, Shopify stores, mobile apps, AI automation, technical SEO and hacked site recovery. The pages below cover the ones ${city} clients ask about most.` },
      { q: `How do we start a project from ${city}?`, a: `Send a short brief through the contact page or on WhatsApp. We reply the same day with questions or a time for a call, and a ${city} project starts with a discovery call.` }
    ]
  };
}

function cityHubH1(entry) { return `Websites and web apps in ${entry.location}`; }
function cityServiceH1(entry) { return `${display(entry.service)} in ${entry.location}`; }
function cityHubMeta(entry) {
  const k = (CITY[entry.location] || {}).kind;
  const where = k === 'home' ? 'from our New Delhi studio' : 'working remotely from New Delhi';
  return `Kawaki Studios builds custom websites, web apps and Shopify stores for ${entry.location} businesses, ${where}, with staging links at every step.`;
}
function cityServiceMeta(entry) {
  const noun = NOUN[entry.service] || lower(entry.service);
  const g = GROUP_OF_NOUN[noun] || 'webdev';
  const base = SC.META[g](`${display(entry.service)} in ${entry.location}`);
  return base.length <= 160 ? base : base.slice(0, base.lastIndexOf(' ', 156)).replace(/[,:;]$/, '') + '.';
}

module.exports = { cityServiceCopy, cityHubCopy, cityHubH1, cityServiceH1, cityHubMeta, cityServiceMeta, NOUN, CITY };
