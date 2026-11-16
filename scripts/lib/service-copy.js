/* Kawaki Studios: copy for the generated service, technology and industry pages.
   Written per subject group in plain language, using only facts from data/kawaki-facts.json.
   Long paragraphs carry the page's own service name (the content gate rejects repeated
   paragraphs over 15 words); card and step lines are short, shared statements. */

const BRANDS = {
  ai: 'AI', seo: 'SEO', crm: 'CRM', api: 'API', apis: 'APIs', saas: 'SaaS', n8n: 'n8n', pr: 'PR', cro: 'CRO',
  zapier: 'Zapier', chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini', perplexity: 'Perplexity', google: 'Google',
  reddit: 'Reddit', whatsapp: 'WhatsApp', woocommerce: 'WooCommerce', wordpress: 'WordPress', shopify: 'Shopify',
  japanese: 'Japanese', maps: 'Maps', overview: 'Overview', overviews: 'Overviews', make: 'Make.com', llm: 'LLM'
};
/* "N8n Automation" -> "n8n automation"; brand and acronym casing kept. */
function words(name) {
  return String(name).trim().split(/\s+/).map(w => BRANDS[w.toLowerCase()] || w.toLowerCase());
}
function display(name) {
  const w = words(name);
  const fixed = w.join(' ').replace(/google business profile/i, 'Google Business Profile').split(' ');
  w.splice(0, w.length, ...fixed);
  if (!BRANDS[String(name).trim().split(/\s+/)[0].toLowerCase()]) w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
  return w.join(' ');
}
const lower = name => words(name).join(' ').replace(/google business profile/i, 'Google Business Profile');

const GROUPS = {
  automation: /automation|n8n|zapier|make-automation|api-integration/,
  agents: /ai-agent|chatbot|voice-agents|receptionist/,
  aisearch: /chatgpt|claude-seo|gemini|perplexity|generative-engine|answer-engine|ai-overview|ai-visibility|digital-pr-ai|entity-seo|semantic-seo|local-ai-search|saas-ai-seo/,
  local: /local-seo|google-business-profile|google-maps|local-citation|local-business/,
  security: /security|malware|blacklist|backup|database-recovery|firewall|monitoring|website-recovery|hack-removal/,
  reddit: /reddit/,
  build: /website-development|^web-development|landing-page|wordpress-website-design|woocommerce|ecommerce-development|website-maintenance|website-migration|conversion-rate/,
  marketing: /content-|lead-generation-services|growth-marketing|digital-marketing/,
  seo: /seo|technical-audit|link-building/,
  webdev: /.*/
};
const groupOf = slug => { const g = Object.keys(GROUPS).find(k => GROUPS[k].test(slug)); return g === 'build' ? 'webdev' : g; };

const C = (title, body) => ({ title, body });
const STEP = (n, title, desc) => ({ num: n, title, desc });

const COPY = {
  automation: (N, n, slug) => ({
    overview: `${N} at Kawaki Studios means mapping the work your team repeats by hand, then moving it into workflows that run on their own: triggers, checks, hand-offs and alerts. We build them in n8n or Make.com, connect them to your tools through REST and webhook APIs, and document each one so your team can change it later.`,
    cards: [C('Mapped before it is built', 'Every step, owner and failure case written down before the first node.'), C('Owned by your team', 'Workflows run in your own accounts, with a written guide to each one.'), C('Checked, not trusted', 'Inputs validated, webhooks verified, failures logged and sent to a person.')],
    challengeTitle: `What ${n} usually fixes`,
    challenge: `Most teams come to us with the same symptoms: data typed twice, leads answered late, reports assembled by hand every Monday. ${N} removes those steps, but only once the process is understood, so that is where every project starts.`,
    deliverables: [C('Lead and enquiry routing', 'Form, chat and WhatsApp enquiries scored, assigned and answered quickly.'), C('CRM and sheet sync', 'Records kept identical across your CRM, sheets and internal tools.'), C('Scheduled reports', 'Numbers pulled from each system and sent to the right people.'), C('AI steps where they help', 'Classification, summaries and drafts by a language model, approved by a person.')],
    archTitle: `How we build ${n}`,
    arch: `Four stages, with a working version of ${n} running on your real data before anything is switched on for good.`,
    steps: [STEP(1, 'Process map', 'The current process, its owners and its failure points, written down.'), STEP(2, 'Prototype', 'One workflow built end to end and tested on real records.'), STEP(3, 'Rollout', 'Remaining workflows added one at a time, each alerting on failure.'), STEP(4, 'Handoff', 'Documentation and a walkthrough, so your team can change workflows safely.')],
    faqs: [
      { q: `Which tools do you use for ${n}?`, a: slug === 'zapier-automation'
        ? `We can build and tidy up Zapier workflows. When run volume or pricing starts to hurt, ${n} can also move to n8n or Make.com, which we use for most new builds.`
        : `Mostly n8n and Make.com, connected to your existing tools through REST and webhook APIs. For ${n}, the choice depends on where your data lives, how many runs a month you expect and who will maintain the workflows.` },
      { q: `Can ${n} work with the tools we already use?`, a: `Usually, yes. If a tool has an API or sends webhooks, it can be part of ${n}. Where a tool has neither, we look at exports, email parsing or a small custom connector before suggesting a change.` },
      { q: 'What happens when a workflow fails?', a: `Every workflow we build for ${n} logs its runs, retries the steps that can safely retry, and messages a named person when something needs attention.` },
      { q: `How is ${n} priced?`, a: `By scope: the number of workflows, the systems they touch and the logic inside each. ${N} work is scoped after a short process review and priced per milestone before it starts.` }
    ]
  }),
  agents: (N, n) => ({
    overview: `${N} at Kawaki Studios starts with the job the agent has to do and the systems it may touch. We build agents that answer from your own documents and data, act through APIs with narrow permissions, and hand over to a person when a question goes beyond what they know.`,
    cards: [C('Answers from your sources', 'Grounded in your documents and data, with sources a person can check.'), C('Narrow permissions', 'Each agent can only read and change what its job requires.'), C('A person in the loop', 'Clear handover to your team when confidence is low or stakes are high.')],
    challengeTitle: `What ${n} is good for`,
    challenge: `Agents earn their place on repetitive, well defined conversations: first replies, bookings, qualification and status questions. ${N} works best when the agent's limits are designed as carefully as its answers, so we write both before building either.`,
    deliverables: [C('Website and WhatsApp chat', 'An assistant that answers questions and collects enquiries on your channels.'), C('Voice and phone flows', 'Call answering, booking and routing, with a transcript for every call.'), C('Internal assistants', 'Search and drafting over your own documents, for your team.'), C('Integrations', "Bookings, records and tickets created through your tools' own APIs.")],
    archTitle: `How we build ${n}`,
    arch: `Four stages, from a written scope of what the agent may and may not do to a monitored launch of ${n}.`,
    steps: [STEP(1, 'Scope and limits', 'What it answers, what it hands over and which data it may use.'), STEP(2, 'Knowledge base', "Your documents cleaned, structured and connected as the agent's sources."), STEP(3, 'Build and test', 'Tested against real questions, including the ones it should refuse.'), STEP(4, 'Launch and review', 'Conversations reviewed weekly at first, answers corrected where needed.')],
    faqs: [
      { q: `Will ${n} make things up?`, a: `It can, which is why we design against it. Agents we build for ${n} answer from your approved sources, say when they do not know, and hand the conversation to a person instead of guessing.` },
      { q: `Which AI models do you use for ${n}?`, a: `The task decides: cost, speed, language and privacy needs. For ${n} we keep the model swappable, so you are not tied to one provider as prices and quality change.` },
      { q: `Can ${n} connect to our booking system or CRM?`, a: `If the system has an API, yes. ${N} can create bookings, update records or open tickets, with each action limited to the permissions the job needs.` },
      { q: 'Who can see the conversations?', a: `You can. Transcripts from ${n} are stored in your own accounts, and what is kept, for how long and who reads it is agreed before launch.` }
    ]
  }),
  aisearch: (N, n) => ({
    overview: `${N} is about being understood and cited when people ask AI tools instead of searching. We work on what you control: clear page structure, factual statements a model can quote, JSON-LD that names your organisation and services, and consistent details on the sources these tools already read.`,
    cards: [C('Structure a model can read', 'Headings, lists and definitions that survive being summarised.'), C('Entities, not keywords', 'Your organisation, people and services described the same way everywhere.'), C('Measured honestly', 'Tracked by asking the tools real questions, not by a vanity score.')],
    challengeTitle: `What gets in the way of ${n}`,
    challenge: `AI answers draw on pages that are easy to parse and claims that agree across the web. Thin service pages, contradictory details and missing structured data are the usual reasons a business is left out, and they are what ${n} work fixes first.`,
    deliverables: [C('Visibility check', 'Real prompts run across ChatGPT, Gemini, Perplexity and AI Overviews.'), C('Page restructuring', 'Answers moved up, facts made quotable, thin pages merged.'), C('Structured data', 'Organization, Service, FAQ and Article JSON-LD that matches the page.'), C('Off-site consistency', 'Profiles and listings corrected so every source agrees.')],
    archTitle: `How ${n} work runs`,
    arch: `Four steps, with the same prompts run again at the end so you can see what changed for ${n}.`,
    steps: [STEP(1, 'Baseline', 'Where you appear now, for the questions your buyers actually ask.'), STEP(2, 'Fix the source', 'Pages, structured data and facts corrected on your own site.'), STEP(3, 'Fix the web', 'Profiles, listings and references brought into line.'), STEP(4, 'Measure again', 'The same prompts run again, with results side by side.')],
    faqs: [
      { q: `Can you guarantee we will appear in AI answers through ${n}?`, a: `No one can; AI tools choose their own sources. What ${n} does is remove the reasons you are left out, and measure the result with the same questions before and after.` },
      { q: `How is ${n} different from SEO?`, a: `The foundations overlap: crawlable pages, clear structure and accurate facts. ${N} adds attention to how models summarise and cite, so answers are written to hold up when quoted out of context.` },
      { q: `How do you measure ${n}?`, a: `We run a fixed set of real buyer questions through the AI tools that matter to you, record whether and how you are cited, and repeat the same set once the ${n} work is done.` },
      { q: 'What do you need from us?', a: `Access to the website code or CMS, the questions your customers ask, and someone who can confirm facts. For ${n}, accurate facts matter more than a volume of content.` }
    ]
  }),
  seo: (N, n) => ({
    overview: `${N} at Kawaki Studios is done in the code, not with a plugin. We fix how pages are crawled and rendered, how URLs and internal links are structured and how structured data describes the business, then rework the pages that should rank. We do not promise positions; we fix what the site controls.`,
    cards: [C('Fixed in the code', 'Changes made in templates, so every page benefits, not just one.'), C('Led by real data', 'Search Console and crawl data set the priorities, not a generic checklist.'), C('Written for people', 'Pages that answer the question first and read naturally.')],
    challengeTitle: `What usually holds back ${n}`,
    challenge: `The common causes are technical: pages search engines cannot render, duplicate URLs splitting signals, slow templates and thin pages competing with each other. ${N} starts there, because content rarely pays off on a site that cannot be crawled cleanly.`,
    deliverables: [C('Crawl and index audit', 'Rendering, canonicals, redirects, sitemaps and coverage, checked by page type.'), C('Template fixes', 'Titles, headings, internal links and JSON-LD corrected at the source.'), C('Speed work', 'Core Web Vitals improved where the code causes the delay.'), C('Content restructuring', 'Overlapping pages merged, thin pages expanded, answers moved up.')],
    archTitle: `How ${n} work runs`,
    arch: `Four stages, starting from your own Search Console data and ending with a plain report on what changed for ${n}.`,
    steps: [STEP(1, 'Audit', 'Crawl, Search Console and template review, with issues ranked by impact.'), STEP(2, 'Fix', 'Template and code changes deployed to staging, then production.'), STEP(3, 'Content', 'Pages merged, expanded or rewritten where the data says so.'), STEP(4, 'Report', 'Before and after numbers from Search Console, explained plainly.')],
    faqs: [
      { q: `How long until ${n} shows results?`, a: `Technical fixes are usually picked up within weeks of being crawled; content and authority take longer. With ${n} we report on crawl and index changes first, then on traffic as it moves.` },
      { q: `Do you guarantee rankings for ${n}?`, a: `No. Rankings depend on competitors and on search engines nobody outside them controls. What we commit to for ${n} is a clear list of fixes, the work itself and honest reporting on the result.` },
      { q: 'Can you work on our existing site?', a: `Yes. ${N} work happens in your current codebase or CMS where possible. If a template cannot be fixed without a rebuild, we explain the trade-off before recommending one.` },
      { q: 'What access do you need?', a: `Search Console, analytics and access to the site's code or CMS. For ${n}, read access is enough to start the audit, and every change goes through staging first.` }
    ]
  }),
  local: (N, n) => ({
    overview: `${N} helps people nearby find you when they search with a place in mind. We work on what decides it: a complete and accurate Google Business Profile, matching name, address and phone details across directories, location pages that say something real, and reviews that are asked for and answered.`,
    cards: [C('One set of details', 'Name, address, phone and hours identical everywhere they appear.'), C('A complete profile', 'Categories, services, photos and posts kept current.'), C('Reviews handled', 'A simple way to ask for reviews, and a reply to every one.')],
    challengeTitle: `What usually holds back ${n}`,
    challenge: `Local results reward accuracy and activity. Old addresses on directories, a half-filled profile, a website with no local detail and unanswered reviews are the usual problems, and ${n} work fixes them in that order.`,
    deliverables: [C('Profile setup and cleanup', 'Google Business Profile completed, verified and organised by service.'), C('Citation cleanup', 'Directory listings found, corrected and kept consistent.'), C('Location pages', 'Pages with real local detail, not a city name swapped in.'), C('Review routine', 'A request flow and reply templates your team can keep up.')],
    archTitle: `How ${n} work runs`,
    arch: `Four stages, beginning with an audit of every listing and ending with a monthly routine your team can run for ${n}.`,
    steps: [STEP(1, 'Audit', 'Profile, listings, website and reviews checked against each other.'), STEP(2, 'Correct', 'Profile and directory details fixed and made consistent.'), STEP(3, 'Build', 'Location pages and structured data added to the site.'), STEP(4, 'Maintain', 'A monthly routine for posts, photos and reviews.')],
    faqs: [
      { q: `How long does ${n} take to show results?`, a: `Profile and listing corrections are often reflected within weeks, though some directories update slowly. For ${n}, reviews and regular activity build on that over the following months.` },
      { q: `Do we need an office address for ${n}?`, a: `Google needs a real address or a defined service area. ${N} works with either, but we will not create listings at addresses where you do not operate.` },
      { q: 'Can you manage our reviews?', a: `We set up the request flow and reply templates and can draft responses, but replies should come from your business. That keeps ${n} honest and the replies credible.` },
      { q: 'Which directories matter?', a: `Google Business Profile first, then the directories that rank for your category and city. For ${n} we prioritise listings people and search engines actually use over long submission lists.` }
    ]
  }),
  security: (N, n) => ({
    overview: `${N} at Kawaki Studios follows one rule: find out how the attacker got in before calling the site clean. We remove malicious code, backdoors and spam pages, close the entry point, restore what was damaged, and leave you with backups and monitoring so a repeat is caught early.`,
    cards: [C('Entry point first', 'Cleanup is not finished until we know how the attacker got in.'), C('Nothing left behind', 'Files, database, users and scheduled tasks checked, not just visible pages.'), C('Backups you can trust', 'Stored off the server and restored on purpose, not hoped for.')],
    challengeTitle: `Signs you need ${n}`,
    challenge: `Visitors redirected to spam, Google listing pages in Japanese or pharmacy terms, a hosting suspension or a browser warning are the usual signs. ${N} deals with the visible damage and with the access that caused it, in that order.`,
    deliverables: [C('Malware and backdoor removal', 'Infected files, injected scripts and hidden admin users removed.'), C('Spam and redirect cleanup', 'Spam pages removed from search and redirects traced to their source.'), C('Blacklist and warning removal', 'Review requests filed once the site is verifiably clean.'), C('Hardening and backups', 'Updates, permissions, firewall rules and tested off-site backups.')],
    archTitle: `How ${n} works`,
    arch: `Four stages, from containing the damage to a written report on what happened and what changed during ${n}.`,
    steps: [STEP(1, 'Contain', 'Site isolated or put into maintenance, with a full copy kept first.'), STEP(2, 'Clean', 'Malicious code, users and spam removed from files and database.'), STEP(3, 'Close', 'Entry point patched, passwords rotated, hardening applied.'), STEP(4, 'Report', 'What was found, what was done and what to watch.')],
    faqs: [
      { q: `How quickly can you start ${n}?`, a: `Active infections are prioritised. For ${n}, the fastest start is to send the site address on WhatsApp with hosting access ready; we confirm timing once we have looked.` },
      { q: `Will the hack come back after ${n}?`, a: `Not through the same route, because closing the entry point is part of ${n}. No site is beyond attack, so we add monitoring and tested backups to catch anything new early.` },
      { q: 'Will we lose content or orders?', a: `We work from a full copy taken before any change. ${N} removes malicious content, keeps legitimate content, and restores anything damaged from the cleanest available backup.` },
      { q: 'Do you work on sites you did not build?', a: `Yes, most ${n} work is on sites someone else built. WordPress, WooCommerce and custom PHP sites are the most common.` }
    ]
  }),
  marketing: (N, n) => ({
    overview: `${N} at Kawaki Studios is run by people who also build websites, so what you publish and how the site converts are planned together. We choose topics from real search and sales questions, write pages that answer them plainly, and fix the forms and pages where interested visitors drop off.`,
    cards: [C('Planned from demand', 'Topics chosen from search data and the questions your sales team hears.'), C('Written plainly', 'Clear answers first, no filler, and facts you can stand behind.'), C('Connected to enquiries', 'Every piece leads to a next step that is easy to take.')],
    challengeTitle: `Where ${n} usually goes wrong`,
    challenge: `Publishing on a schedule without a plan, chasing traffic that never buys and sending visitors to pages that do not convert are the usual problems. ${N} starts from the questions buyers ask and ends at an enquiry.`,
    deliverables: [C('Topic and keyword plan', 'Clusters mapped to buyer questions and the pages that answer them.'), C('Writing and editing', 'Articles and landing pages written plainly and checked for accuracy.'), C('Conversion fixes', 'Forms, calls to action and page structure tested and improved.'), C('Reporting', 'Traffic, enquiries and the pages that produced them, monthly.')],
    archTitle: `How ${n} runs`,
    arch: `Four stages, repeated monthly once ${n} is under way, with the plan adjusted to what the numbers show.`,
    steps: [STEP(1, 'Research', 'Search data, competitors and sales questions gathered into one plan.'), STEP(2, 'Plan', 'Topics prioritised by intent and effort, with owners and dates.'), STEP(3, 'Publish', 'Pages written, reviewed and published with internal links in place.'), STEP(4, 'Measure', 'Results reviewed monthly and the plan adjusted.')],
    faqs: [
      { q: `How soon does ${n} pay off?`, a: `Content compounds slowly: expect months, not weeks, for organic traffic. ${N} usually shows earlier gains from conversion fixes on pages that already get visitors.` },
      { q: 'Who writes the content?', a: `We draft and edit; you review for accuracy and voice. For ${n}, your team's knowledge is the raw material, so we interview the people who know the subject.` },
      { q: 'Do you use AI to write?', a: `As an assistant for research and outlines, not as the author. Everything published under ${n} is written or edited by a person and checked for accuracy.` },
      { q: 'What do you report on?', a: `Search traffic, enquiries and the pages that produced them. ${N} reports focus on outcomes your team cares about, not on how much was published.` }
    ]
  }),
  reddit: (N, n) => ({
    overview: `${N} works only if you take part in Reddit the way its communities expect: openly, usefully and without fake accounts. We find the threads where your category is discussed, help your team contribute answers people value, and monitor mentions so problems are answered early.`,
    cards: [C('No fake accounts', 'Your team posts as itself; no sock puppets, no bought votes.'), C('Useful first', 'Answers that help the asker, with a link only when it fits.'), C('Monitored', 'Mentions of your brand and category tracked and flagged.')],
    challengeTitle: `Why ${n} is different`,
    challenge: `Reddit threads now appear in search results and AI answers, and its communities punish promotion quickly. ${N} has to earn trust in each community before it can do anything for visibility.`,
    deliverables: [C('Community map', 'The subreddits and threads where your category is discussed, ranked.'), C('Contribution plan', 'What to answer, who answers and how to disclose your role.'), C('Mention monitoring', 'Alerts for new threads about your brand or category.'), C('Response guidance', 'Drafts and advice for handling criticism in public.')],
    archTitle: `How ${n} runs`,
    arch: `Four stages, starting with listening before anyone from your team posts a word as part of ${n}.`,
    steps: [STEP(1, 'Listen', 'Communities, rules and existing conversations about your category mapped.'), STEP(2, 'Plan', 'Where to contribute, who posts and how to disclose.'), STEP(3, 'Contribute', 'Your team answers questions, with drafts and review from us.'), STEP(4, 'Monitor', 'Mentions tracked and responses coordinated as threads appear.')],
    faqs: [
      { q: `Do you post on our behalf for ${n}?`, a: `No. Posts come from your team's own accounts, disclosed as such. For ${n} we research, draft and review, which keeps contributions credible and within Reddit's rules.` },
      { q: 'Can you remove negative threads?', a: `Not unless they break Reddit's rules. ${N} focuses on responding well, correcting facts and giving people a better answer to find.` },
      { q: 'Does Reddit help SEO?', a: `Reddit threads rank in Google and are cited by AI tools, so useful answers there can bring visibility. ${N} treats that as a result of being helpful, not as a tactic.` },
      { q: 'How long before we see results?', a: `Trust in a community builds over weeks of consistent, useful answers. ${N} reports on mentions, sentiment and referral traffic from the start.` }
    ]
  }),
  webdev: (N, n) => ({
    overview: `${N} at Kawaki Studios is designed and coded by the developers you speak to, with no page builder underneath. We plan the structure around what visitors need to do, write semantic and fast front-end code, and hand over a site your team can edit and a repository you own.`,
    cards: [C('Designed for the job', 'Layouts built around what visitors need to find and do.'), C('Fast by construction', 'Lean templates and optimised media, checked against Core Web Vitals.'), C('Yours to keep', 'Repository, documentation and access handed over at launch.')],
    challengeTitle: `What ${n} usually fixes`,
    challenge: `Most projects start with a site that is slow, hard to edit or built on a theme nobody understands any more. ${N} replaces that with a structure that fits the business and code your team, or the next developer, can work with.`,
    deliverables: [C('Information architecture', 'Pages, navigation and URLs planned before design starts.'), C('Interface design', 'Layouts and a type system designed for the browser, reviewed with you.'), C('Front-end build', 'Semantic HTML, accessible components and structured data on every template.'), C('Launch and redirects', 'Every old URL mapped, tested and redirected at launch.')],
    archTitle: `How ${n} runs`,
    arch: `Four stages. Every milestone of ${n} lands on a staging link you can open and review before anything goes live.`,
    steps: [STEP(1, 'Discovery', 'Goals, content and integrations written down before design starts.'), STEP(2, 'Design', 'Layouts and components designed and reviewed on real content.'), STEP(3, 'Build', 'Templates coded in milestones, each deployed to staging.'), STEP(4, 'Launch', 'Redirects, analytics and checks, then handoff of the repository.')],
    faqs: [
      { q: `How much does ${n} cost?`, a: `Most of our builds fall between ₹1,50,000 and ₹5,00,000, or $2,500 to $10,000 for clients abroad. Where ${n} sits in that range depends on the templates, integrations and content work involved.` },
      { q: `How long does ${n} take?`, a: `A typical site takes 4 to 8 weeks from discovery to launch. Larger ${n} projects are scheduled after discovery, once the integrations and content are known.` },
      { q: 'Will we be able to edit the site ourselves?', a: `Yes. ${N} includes an editing setup that suits your team, whether a headless CMS, WordPress or simple Markdown files, plus a short guide.` },
      { q: 'What happens to our current rankings?', a: `Every existing URL is mapped and redirected, titles and structured data are carried over, and the launch is checked in Search Console. ${N} is planned so rankings move with the site.` }
    ]
  })
};

/* Content fields in the shape renderPage expects. */
function serviceCopy(entry) {
  const slug = entry.kawakiUrl.replace(/^\//, '');
  const N = display(entry.service);
  const n = lower(entry.service);
  const g = groupOf(slug);
  const c = COPY[g](N, n, slug);
  return {
    group: g,
    section1Title: `What ${n} covers`,
    overviewParagraph: c.overview,
    valueCards: c.cards,
    challengeTitle: c.challengeTitle,
    challengeDesc: c.challenge,
    deliverables: c.deliverables,
    archTitle: c.archTitle,
    archDesc: c.arch,
    processSteps: c.steps,
    faqs: c.faqs
  };
}

/* The page heading: "n8n automation services", "SEO for law firms". */
function serviceH1(entry) {
  const N = display(entry.service);
  return / for |services?$|agents$/i.test(entry.service) ? N : N + ' services';
}


/* Meta description: what the service is, in one plain sentence. */
const META = {
  automation: N => `${N} from Kawaki Studios: n8n or Make.com workflows that move data between your tools, flag failures and come documented.`,
  agents: N => `${N} from Kawaki Studios: agents that answer from your own sources, act with narrow permissions and hand over to a person.`,
  aisearch: N => `${N} from Kawaki Studios: page structure, quotable facts and JSON-LD that help AI tools understand and cite you.`,
  seo: N => `${N} from Kawaki Studios, done in the code: crawling, rendering, internal links and structured data, led by Search Console data.`,
  local: N => `${N} from Kawaki Studios: a complete Google Business Profile, consistent listings, real location pages and a review routine.`,
  security: N => `${N} from Kawaki Studios: malicious code and backdoors removed, the entry point closed, backups and monitoring set up.`,
  marketing: N => `${N} from Kawaki Studios: topics planned from real buyer questions, pages written plainly and drop-off points fixed.`,
  reddit: N => `${N} from Kawaki Studios: honest participation in the right communities, mention monitoring and response guidance.`,
  webdev: N => `${N} from Kawaki Studios: designed and coded by the developers you speak to, no page builder, repository handed over.`
};
function serviceMeta(entry) {
  const g = groupOf(entry.kawakiUrl.replace(/^\//, ''));
  return META[g](display(entry.service));
}

module.exports = { display, lower, serviceCopy, serviceH1, serviceMeta, groupOf };
