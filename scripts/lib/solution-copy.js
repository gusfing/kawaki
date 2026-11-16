/* Kawaki Studios: copy for the solution pages (/solutions/*): builds for a specific need.
   Plain language, facts only; features are described as what such a build includes. */
const C = (title, body) => ({ title, body });
const STEP = (n, title, desc) => ({ num: n, title, desc });

const HEALTH_CARDS = [C('Patients first', 'Treatments, doctors and booking found in a tap or two.'), C('Found locally', 'Built so search and maps show the right practice nearby.'), C('Easy to keep current', 'Doctors, timings and treatments updated without a developer.')];
const HEALTH_STEPS = [STEP(1, 'Discovery', 'Treatments, doctors, locations and how patients book today.'), STEP(2, 'Structure', 'Pages planned around what patients search for.'), STEP(3, 'Design and build', 'Designed and coded, reviewed on a staging link.'), STEP(4, 'Launch', 'Profiles, structured data and analytics checked at launch.')];

const S = {
  'healthcare-website-development': {
    h1: 'Healthcare website development', meta: 'Healthcare websites from Kawaki Studios: clear treatment pages, doctor profiles, appointment requests and local search built in, for clinics and hospitals.',
    overview: 'Healthcare website development at Kawaki Studios starts with how patients look for care: by condition, by doctor and by location. We build clinic and hospital sites with clear treatment pages, doctor profiles and an easy way to request an appointment.',
    cards: HEALTH_CARDS, challengeTitle: 'What patients need from a healthcare site',
    challenge: 'Patients arrive worried and in a hurry, usually on a phone. A healthcare website has to answer what is treated, who treats it, where and when, and how to book, before it says anything else.',
    deliverables: [C('Treatment and condition pages', 'Written plainly, reviewed by your doctors.'), C('Doctor profiles', 'Qualifications, specialities and timings, kept up to date.'), C('Appointment requests', 'Forms or WhatsApp booking routed to the right desk.'), C('Local search setup', 'Structured data and Google Business Profile alignment.')],
    faqs: [['Can patients book appointments on the website?', 'Yes. Healthcare websites we build can take appointment requests by form or WhatsApp and route them to the right department, or link to the booking system you already use.'], ['Who writes the medical content?', 'We structure and edit it; your doctors review every medical statement before it goes live on your healthcare website.']]
  },
  'medical-specialist-website-development': {
    h1: 'Websites for medical specialists', meta: 'Websites for medical specialists from Kawaki Studios: a clear profile, the conditions you treat, where you consult and how patients book.',
    overview: 'A medical specialist website has one job: help the right patients find you and book. We build sites around the specialist themselves, with a clear profile, the conditions treated, the places you consult and a simple way to request a visit.',
    cards: HEALTH_CARDS, challengeTitle: 'What a specialist site has to show',
    challenge: 'Referrals and searches both end on your website. A specialist site needs to show qualifications and experience clearly, explain each condition in plain words and make consulting locations and timings obvious.',
    deliverables: [C('Specialist profile', 'Qualifications, experience and memberships, set out clearly.'), C('Condition pages', 'One page per condition or procedure, in plain language.'), C('Consulting locations', 'Every clinic or hospital with timings and directions.'), C('Visit requests', 'A short form or WhatsApp link for appointments.')],
    faqs: [['Can a specialist site list several hospitals I consult at?', 'Yes. Each consulting location gets its own timings and directions, and the medical specialist website makes it clear where to book for each.'], ['Do you write the condition pages?', 'We draft and structure them from your notes; you review every medical statement before the specialist site goes live.']]
  },
  'physiotherapy-spine-clinic-website': {
    h1: 'Websites for physiotherapy and spine clinics', meta: 'Websites for physiotherapy and spine clinics from Kawaki Studios: treatment pages by condition, therapist profiles and simple session booking.',
    overview: 'Patients look for a physiotherapy or spine clinic by their problem: back pain, a sports injury, recovery after surgery. We build clinic websites organised by condition, with therapist profiles and a quick way to book a first session.',
    cards: HEALTH_CARDS, challengeTitle: 'What a physiotherapy site must answer',
    challenge: 'People in pain want to know if you treat their problem, how sessions work and when they can come in. A physiotherapy and spine clinic website should answer those three things on the first screen.',
    deliverables: [C('Condition pages', 'Back, neck, sports injuries and post-surgery rehab.'), C('Therapist profiles', 'Training, specialities and the days each therapist works.'), C('Session booking', 'First-visit requests by form or WhatsApp.'), C('Exercise and care content', 'Guides patients can return to between sessions.')],
    faqs: [['Can patients book a first session online?', 'Yes. A physiotherapy clinic website can take session requests by form or WhatsApp, or link to the booking tool you already use.'], ['Can we publish home exercise guides?', 'Yes. The physiotherapy site can include guides and videos patients return to between sessions, reviewed by your therapists.']]
  },
  'endocrinology-clinic-web-platform': {
    h1: 'Websites for endocrinology clinics', meta: 'Websites for endocrinology clinics from Kawaki Studios: diabetes, thyroid and hormone condition pages, doctor profiles and appointment requests.',
    overview: 'Endocrinology patients often manage a condition for years: diabetes, thyroid disorders, hormone problems. We build endocrinology clinic websites that explain each condition plainly, introduce the doctors and make follow-up appointments easy to request.',
    cards: HEALTH_CARDS, challengeTitle: 'What an endocrinology site should do',
    challenge: 'Long-term patients come back often, and new ones arrive confused by a diagnosis. An endocrinology clinic site should serve both: clear condition guides for new patients and quick routes to follow-ups and tests for existing ones.',
    deliverables: [C('Condition guides', 'Diabetes, thyroid, PCOS and other hormone conditions.'), C('Doctor profiles', 'Specialities, qualifications and consulting hours.'), C('Follow-up requests', 'Simple routes for repeat appointments and tests.'), C('Patient resources', 'Diet, monitoring and medication guides your doctors approve.')],
    faqs: [['Can existing patients request follow-ups online?', 'Yes. An endocrinology clinic website can give repeat patients a short route to follow-up and test appointments, separate from new-patient enquiries.'], ['Do you write the condition guides?', 'We draft them from your doctors\' input; every medical statement on the endocrinology site is reviewed by your team first.']]
  },
  'surgical-practice-web-portal': {
    h1: 'Websites for surgical practices', meta: 'Websites for surgical practices from Kawaki Studios: procedure pages, surgeon profiles, consultation requests and clear pre- and post-surgery information.',
    overview: 'Before choosing a surgeon, patients read a lot. We build surgical practice websites with a page for each procedure, surgeon profiles, what to expect before and after surgery, and a clear way to request a consultation.',
    cards: HEALTH_CARDS, challengeTitle: 'What surgical patients look for',
    challenge: 'Patients compare surgeons, procedures and recovery times, often with family. A surgical practice site needs careful procedure pages, honest recovery information and a consultation request that is easy to find.',
    deliverables: [C('Procedure pages', 'What it involves, recovery and when it is advised.'), C('Surgeon profiles', 'Training, specialities and hospitals of practice.'), C('Consultation requests', 'Forms or WhatsApp, routed to your coordinator.'), C('Before and after guides', 'Preparation and recovery information for patients.')],
    faqs: [['Can patients share reports when requesting a consultation?', 'A surgical practice site can accept report uploads with consultation requests, sent securely to your coordinator rather than stored on the public website.'], ['Who approves the procedure information?', 'Your surgeons. We draft and structure the procedure pages, and nothing medical goes live on the surgical practice site without their review.']]
  },
  'hospital-local-search-architecture': {
    h1: 'Local search for hospitals', meta: 'Local search for hospitals from Kawaki Studios: department and doctor pages, location data and Google Business Profiles that agree with each other.',
    overview: 'When someone searches for a department or a doctor nearby, a hospital needs the right page to appear. We structure hospital websites so every department, doctor and location has its own page and matches the hospital\'s Google Business Profiles.',
    cards: HEALTH_CARDS, challengeTitle: 'Why hospitals get lost in local search',
    challenge: 'Hospital sites often put every department on one page, list doctors without their specialities and leave Google profiles out of date. Hospital local search work gives each department, doctor and location its own clear, consistent page.',
    deliverables: [C('Department pages', 'One page per department, with doctors and timings.'), C('Doctor pages', 'Each doctor with speciality, qualifications and OPD hours.'), C('Location data', 'Structured data and maps for every hospital branch.'), C('Profile alignment', 'Google Business Profiles that match the website.')],
    faqs: [['Do you manage our Google Business Profiles?', 'We set up and correct them so they match the website, then hand over a simple routine. Hospital local search depends on profiles and pages agreeing.'], ['Can each branch have its own page?', 'Yes. Every branch gets a page with its departments, doctors, timings and directions, linked to its own Google Business Profile.']]
  },
  'hospital-management-web-portal': {
    h1: 'Hospital management web portals', meta: 'Hospital management portals from Kawaki Studios: web apps for appointments, OPD schedules, staff rosters and internal workflows, with role-based access.',
    overview: 'A hospital management web portal brings everyday operations into one place: appointments, OPD schedules, staff rosters and internal requests. We build these as web applications with role-based access, so each team sees only what it needs.',
    cards: [C('One set of records', 'Appointments, schedules and rosters from the same data.'), C('Role-based access', 'Each role sees and changes only what it should.'), C('Works on any device', 'At the front desk, on a ward or on a phone.')],
    challengeTitle: 'What hospital teams struggle with',
    challenge: 'Appointments in one register, OPD timings in another and staff rosters on paper make every change slow. A hospital management portal replaces that with one system the front desk, departments and administration share.',
    deliverables: [C('Appointment scheduling', 'Bookings by department and doctor, with OPD slots.'), C('Staff rosters', 'Shifts and availability, visible to the right people.'), C('Internal requests', 'Approvals and handoffs between departments.'), C('Reports', 'Daily numbers for administration, from the same data.')],
    steps: [STEP(1, 'Discovery', 'Departments, roles and the processes the portal must cover.'), STEP(2, 'Data model', 'Records, permissions and integrations designed first.'), STEP(3, 'Build in modules', 'Each module delivered and tested with real staff.'), STEP(4, 'Rollout', 'Training, data migration and support as teams switch over.')],
    faqs: [['Can the portal connect to our existing hospital software?', 'If your current system has an API or can export data, the hospital management portal can read from or write to it. We check this in discovery.'], ['How are patient details protected?', 'Access is limited by role, sign-ins are protected, and data stays in hosting accounts you control. We agree the details with your team before the hospital portal is built.']]
  },
  'school-erp-development': {
    h1: 'School ERP development', meta: 'School ERP development from Kawaki Studios: admissions, attendance, fees, timetables and gradebooks in one portal, as built for NextSchool ERP.',
    overview: 'School ERP development at Kawaki Studios brings admissions, attendance, fees, timetables and gradebooks into one portal for every campus. We built NextSchool ERP this way, and the same approach fits schools moving off paper and spreadsheets.',
    cards: [C('One portal', 'Admissions, attendance, fees and grades from the same records.'), C('Every role', 'Admin, teachers, parents and students each see their own view.'), C('Many campuses', 'Run several campuses from one system.')],
    challengeTitle: 'What schools are replacing',
    challenge: 'Paper registers, fee spreadsheets, separate grading software and another tool for buses make school administration slow and error-prone. A school ERP puts all of it on one set of records.',
    deliverables: [C('Admissions and records', 'Enquiries to enrolment, with student records in one place.'), C('Attendance', 'Daily attendance for students and staff, on any device.'), C('Fees', 'Fee ledgers, receipts and reminders.'), C('Timetables and grades', 'Scheduling, substitutions and gradebooks.')],
    steps: [STEP(1, 'Discovery', 'Campuses, roles and how each process runs today.'), STEP(2, 'Data model', 'Students, staff, classes and fees structured first.'), STEP(3, 'Build in modules', 'Admissions, attendance, fees and grades, one by one.'), STEP(4, 'Rollout', 'Data imported, staff trained and support during the switch.')],
    faqs: [['Can parents and teachers use it on their phones?', 'Yes. The school ERP works in any browser, and companion apps can be added, as we did with Flutter apps for the LMS Ecosystem.'], ['Can you import our existing student data?', 'Yes. Student, fee and attendance data from spreadsheets or older software is cleaned and imported before the school ERP goes live.']]
  },
  'ai-saas-mvp-development': {
    h1: 'AI SaaS MVP development', meta: 'AI SaaS MVP development from Kawaki Studios: a first version of your AI product, with sign-in, billing-ready structure and the core workflow, built to grow.',
    overview: 'AI SaaS MVP development at Kawaki Studios gets the first version of your product in front of real users: sign-in, the one workflow that matters, and AI features with sensible limits. Pixza, our own AI image app, was built the same way.',
    cards: [C('One core workflow', 'The feature users pay for, done properly first.'), C('Models you can swap', 'No lock-in to a single AI provider.'), C('Built to grow', 'A data model planned for the features that come next.')],
    challengeTitle: 'Where AI MVPs go wrong',
    challenge: 'Many AI products launch as a thin wrapper around one model, with no plan for cost, failures or the second feature. An AI SaaS MVP needs the same groundwork as any product: accounts, data, limits and a way to measure usage.',
    deliverables: [C('Accounts and workspace', 'Sign-in, teams and saved projects.'), C('AI features', 'Model calls with limits, retries and fallbacks.'), C('Usage tracking', 'What users do and what it costs you.'), C('Admin tools', 'Manage users, limits and content.')],
    steps: [STEP(1, 'Scope', 'The one workflow and who it is for.'), STEP(2, 'Prototype', 'The AI step proven on real inputs.'), STEP(3, 'Build', 'Accounts, workflow and limits, shipped to staging.'), STEP(4, 'Launch', 'First users, usage tracking and the next priorities.')],
    faqs: [['Which AI models do you use?', 'The task decides: quality, speed, cost and privacy. An AI SaaS MVP we build keeps the model behind a layer you can switch, as Pixza does across several image models.'], ['How do you control AI costs?', 'With limits per user, caching where results repeat, and tracking of what each feature costs, built into the AI SaaS MVP from the first version.']]
  },
  'media-production-website-development': {
    h1: 'Websites for media production companies', meta: 'Websites for media production companies from Kawaki Studios: showreels and project galleries that load fast, with credits, services and enquiries.',
    overview: 'A production company is judged on its work, so its website has to show reels and projects well without making visitors wait. We build media production websites around the work: showreels, project pages with credits, services and a clear way to enquire.',
    cards: [C('Work first', 'Reels and projects lead every page.'), C('Video that loads', 'Streams sized for each screen, posters while it loads.'), C('Easy to update', 'New projects added without a developer.')],
    challengeTitle: 'What production sites get wrong',
    challenge: 'Heavy autoplay videos, slow galleries and buried contact details are common on production company sites. A media production website should show the reel fast, let visitors browse projects quickly and make enquiring simple.',
    deliverables: [C('Showreel', 'A reel that starts quickly, with a poster image first.'), C('Project pages', 'Video, stills, credits and the client brief.'), C('Services', 'What you produce, from ads to documentaries.'), C('Enquiries', 'A short brief form or WhatsApp.')],
    steps: [STEP(1, 'Discovery', 'Your work, services and the clients you want.'), STEP(2, 'Design', 'Layouts built around your reel and stills.'), STEP(3, 'Build', 'Video set up to load fast on any connection.'), STEP(4, 'Launch', 'Projects loaded, analytics checked, your team trained.')],
    faqs: [['Where should our videos be hosted?', 'On a video host or CDN suited to streaming, not on the website server. The media production website then loads each video at the right size for the screen.'], ['Can we add new projects ourselves?', 'Yes. Projects are added through a simple editor, and the media production site lays them out automatically.']]
  },
  'fashion-ecommerce-development': {
    h1: 'Fashion ecommerce development', meta: 'Fashion ecommerce development from Kawaki Studios: Shopify stores built around photography, collections and size details, as with BAZZARO.',
    overview: 'Fashion ecommerce development at Kawaki Studios starts with the photography and the collections, then makes buying easy: clear sizes, quick browsing and a short path to checkout. BAZZARO\'s custom Shopify storefront is one we built.',
    cards: [C('Photography leads', 'Layouts that let the product images carry the store.'), C('Collections that browse well', 'Filters and drops that are quick on a phone.'), C('Sizes answered', 'Measurements and materials before shoppers have to ask.')],
    challengeTitle: 'What fashion stores need',
    challenge: 'Fashion shoppers browse visually, on phones, and leave when sizes or materials are unclear. A fashion ecommerce store should feel like a lookbook while answering the practical questions that stop a purchase.',
    deliverables: [C('Custom Shopify theme', 'Built for your collections, not a bought theme.'), C('Lookbook content', 'Editorial pages next to products.'), C('Product detail', 'Sizes, materials, care and zoomable images.'), C('Fast mobile pages', 'Lean scripts and right-sized images.')],
    steps: [STEP(1, 'Catalogue review', 'Products, variants, collections and your apps.'), STEP(2, 'Design', 'Homepage, collection and product templates on real products.'), STEP(3, 'Build', 'A custom theme tested on a development copy.'), STEP(4, 'Launch', 'Migration, redirects and your team trained.')],
    faqs: [['Shopify or something else for fashion?', 'Shopify for most fashion brands: reliable checkout and a large app ecosystem. Fashion ecommerce stores we build use a custom theme on it, or a headless storefront when content and markets demand it.'], ['Can we add lookbooks and campaigns?', 'Yes. Editorial pages sit alongside products in the fashion store, so a campaign can lead straight to what is in it.']]
  },
  'high-traffic-publishing-automation': {
    h1: 'Publishing automation for busy websites', meta: 'Publishing automation from Kawaki Studios: workflows that move articles from draft to published, with images, structured data and social posts handled.',
    overview: 'Publishing automation removes the repetitive steps between a finished draft and a live article: formatting, images, structured data, sitemaps and social posts. We build these workflows for teams that publish often and cannot afford mistakes.',
    cards: [C('Fewer manual steps', 'Formatting, images and metadata handled by the workflow.'), C('Checks before publishing', 'Missing fields caught before anything goes live.'), C('Fast pages', 'Static pages that stay quick when traffic spikes.')],
    challengeTitle: 'Where publishing slows down',
    challenge: 'Teams that publish every day lose hours to resizing images, filling metadata and sharing posts by hand. Publishing automation takes those steps over, while an editor still approves every article.',
    deliverables: [C('Draft to live', 'Approved drafts published with formatting and images.'), C('Structured data', 'Article JSON-LD, sitemaps and feeds updated.'), C('Distribution', 'Social posts and newsletters queued on publish.'), C('Static delivery', 'Pages built ahead of time so traffic spikes are fine.')],
    steps: [STEP(1, 'Map the workflow', 'Every step from draft to promotion.'), STEP(2, 'Automate', 'Workflows in n8n or Make.com, with an approval step.'), STEP(3, 'Test', 'Run on real articles before switching over.'), STEP(4, 'Hand over', 'Documentation and a walkthrough for editors.')],
    faqs: [['Does automation publish without an editor?', 'No. Publishing automation handles formatting, images and distribution, but an editor approves each article before it goes live.'], ['Which tools does it work with?', 'Most CMSs with an API, plus n8n or Make.com for the workflow. We check your current publishing tools during discovery.']]
  },
  'ai-hardware-product-website': {
    h1: 'Websites for AI hardware products', meta: 'Websites for AI hardware products from Kawaki Studios: product pages that explain what the device does, specifications, demos and pre-orders or enquiries.',
    overview: 'An AI hardware product has to explain itself quickly: what it does, how it works and why it beats software alone. We build product websites with clear explanations, specifications, demo video and a path to pre-order or enquire.',
    cards: [C('Clear in seconds', 'What it does, shown before it is explained.'), C('Specs that answer questions', 'Technical details for buyers who check.'), C('A clear next step', 'Pre-order, enquiry or waitlist, one tap away.')],
    challengeTitle: 'What hardware sites must explain',
    challenge: 'Buyers of a new AI device want to see it working, check the specifications and understand privacy and support. An AI hardware product website has to cover all of that without burying the product under jargon.',
    deliverables: [C('Product story', 'What it does, shown with demo video and imagery.'), C('Specifications', 'Hardware, connectivity, privacy and support details.'), C('Pre-orders or enquiries', 'Waitlist, pre-order or B2B enquiry routes.'), C('Fast media', 'Video and images that load quickly on any device.')],
    steps: [STEP(1, 'Discovery', 'The product, the buyer and the launch plan.'), STEP(2, 'Story and design', 'Pages that show the product working.'), STEP(3, 'Build', 'Media, specifications and conversion paths coded.'), STEP(4, 'Launch', 'Analytics and pre-order or enquiry flows tested.')],
    faqs: [['Can the site take pre-orders?', 'Yes, through Shopify or a payment provider you already use, or as a waitlist before pricing is final. We decide this with you in discovery for the AI hardware product site.'], ['How do you show the product before launch?', 'With renders, demo video and clear specifications. The AI hardware product website can be updated to real photography as units ship.']]
  }
};

function solutionCopy(entry) {
  const slug = entry.kawakiUrl.replace('/solutions/', '');
  const c = S[slug];
  if (!c) return null;
  const nm = c.h1.charAt(0).toLowerCase() + c.h1.slice(1);
  return {
    section1Title: `What ${nm} covers`,
    overviewParagraph: c.overview,
    valueCards: c.cards,
    challengeTitle: c.challengeTitle,
    challengeDesc: c.challenge,
    deliverables: c.deliverables,
    archTitle: 'How the project runs',
    archDesc: `Four stages, with every milestone of the ${nm} project on a staging link you can open and review.`,
    processSteps: c.steps || HEALTH_STEPS,
    faqs: c.faqs.map(([q, a]) => ({ q, a })).concat([{ q: `How much does ${nm} cost?`, a: `Most of our custom builds fall between ₹1,50,000 and ₹5,00,000, or $2,500 to $10,000 abroad. For ${nm}, the exact figure follows discovery, and each milestone is priced before it starts.` }])
  };
}
const solutionH1 = entry => (S[entry.kawakiUrl.replace('/solutions/', '')] || {}).h1;
const solutionMeta = entry => (S[entry.kawakiUrl.replace('/solutions/', '')] || {}).meta;

module.exports = { solutionCopy, solutionH1, solutionMeta };
