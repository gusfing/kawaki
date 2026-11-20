/* Kawaki Directory Filler: the business profile the extension starts with.
   Everything here is public business information, taken from data/kawaki-facts.json and the live site.
   Edit it in the popup (Profile tab); changes are saved in this browser only. Prices and timelines follow AGENTS.md. */
const DEFAULT_PROFILE = {
  businessName: 'Kawaki Studios',
  legalName: 'Kawaki Studios LLP',
  contactName: 'Kunal Sharma',
  firstName: 'Kunal',
  lastName: 'Sharma',
  jobTitle: 'Founder',
  email: 'hello@kawaki.co.in',
  phone: '+91 76781 23943',
  phoneLocal: '076781 23943',
  website: 'https://kawaki.co.in',
  street: '',
  city: 'New Delhi',
  state: 'Delhi',
  postcode: '',
  country: 'India',
  founded: '2020',
  hours: 'Monday to Sunday, 10:00 to 19:00 IST',
  category: 'Web design and development',
  categoryKeywords: 'web design, web development, website, software, it services, ecommerce, mobile app, digital marketing, seo',
  tagline: 'Websites, web apps and Shopify stores, built by the developers you speak to.',
  keywords: 'website design, web development, web applications, Shopify development, mobile apps, AI automation, technical SEO',
  descriptionShort: 'Kawaki Studios is a website designing and web development company in New Delhi. Custom websites, web apps, Shopify stores and mobile apps.',
  descriptionMedium: 'Kawaki Studios is a website designing and web development company in New Delhi. We design and build custom websites, web applications, mobile apps and Shopify stores, and we handle technical SEO, website security and AI workflow automation.',
  descriptionLong: 'Kawaki Studios is a website designing and web development company in New Delhi. We design and build custom websites, web applications, mobile apps and Shopify stores for startups and growing businesses, and we handle technical SEO, website security and AI workflow automation.\n\nThe developers you speak to are the people who build your project. Work happens in a Git repository, with a staging link at every milestone. Most custom builds cost ₹1,50,000 to ₹5,00,000, billed by milestone, and a typical marketing site takes 4 to 8 weeks.\n\nWe meet clients in Delhi, Noida, Gurugram, Ghaziabad and Faridabad in person, and work with businesses across India and abroad remotely.',
  logoUrl: 'https://kawaki.co.in/assets/images/kawaki-logo.png',
  linkedin: 'https://www.linkedin.com/company/kawaki-studios',
  instagram: 'https://www.instagram.com/kawaki.agency',
  twitter: 'https://twitter.com/kawakistudios',
  facebook: '',
  googleMaps: 'https://maps.google.com/maps?cid=8378945977778123387'
};

/* The order and labels shown in the Profile tab. multiline fields get a textarea. */
const PROFILE_FIELDS = [
  ['businessName', 'Business name'], ['legalName', 'Legal name'], ['contactName', 'Contact person'], ['firstName', 'First name'], ['lastName', 'Last name'], ['jobTitle', 'Job title'],
  ['email', 'Email'], ['phone', 'Phone (international)'], ['phoneLocal', 'Phone (local)'], ['website', 'Website'],
  ['street', 'Street address (add the exact one)'], ['city', 'City'], ['state', 'State'], ['postcode', 'PIN code (add it)'], ['country', 'Country'],
  ['founded', 'Year founded'], ['hours', 'Opening hours'], ['category', 'Category'], ['categoryKeywords', 'Category words to match in dropdowns'],
  ['tagline', 'Tagline'], ['keywords', 'Keywords or tags'],
  ['descriptionShort', 'Description, short (up to 160)', true], ['descriptionMedium', 'Description, medium (up to 320)', true], ['descriptionLong', 'Description, long (up to 750)', true],
  ['logoUrl', 'Logo URL'], ['linkedin', 'LinkedIn'], ['instagram', 'Instagram'], ['twitter', 'X (Twitter)'], ['facebook', 'Facebook'], ['googleMaps', 'Google Maps listing']
];
