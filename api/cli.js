/**
 * KAWAKI STUDIOS — TERMINAL / CLI API ENDPOINT
 * Accessible via:
 *   curl -sL https://kawaki.co.in/cli
 *   curl -sL https://kawaki.co.in/term
 */

const ANSI_NEON = '\x1b[38;2;198;255;0m';
const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';
const ANSI_DIM = '\x1b[2m';
const ANSI_CYAN = '\x1b[38;2;56;189;248m';
const ANSI_WHITE = '\x1b[38;2;255;255;255m';
const ANSI_SLATE = '\x1b[38;2;148;163;184m';
const ANSI_GREEN = '\x1b[38;2;74;222;128m';
const ANSI_YELLOW = '\x1b[38;2;250;204;21m';
const ANSI_UNDERLINE = '\x1b[4m';

const CLI_BANNER = `
${ANSI_NEON}██╗  ██╗ █████╗ ██╗    ██╗ █████╗ ██╗  ██╗██╗
██║ ██╔╝██╔══██╗██║    ██║██╔══██╗██║ ██╔╝██║
█████╔╝ ███████║██║ █╗ ██║███████║█████╔╝ ██║
██╔═██╗ ██╔══██║██║███╗██║██╔══██║██╔═██╗ ██║
██║  ██╗██║  ██║╚███╔███╔╝██║  ██║██║  ██╗██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝${ANSI_RESET}
${ANSI_BOLD}${ANSI_WHITE} K A W A K I   S T U D I O S ${ANSI_RESET} // ${ANSI_NEON}TERMINAL SITE v2.0${ANSI_RESET}
${ANSI_DIM}SF 37.77° N / TYO 35.67° N • Bespoke Digital Engineering & High-Performance Systems${ANSI_RESET}
`;

const STUDIO_INFO = `
${ANSI_BOLD}"We reject bloated templates, generic frameworks, and transient hype.
Every platform we build is engineered with strict type safety, sub-second
latency, and architectural durability."${ANSI_RESET}

${ANSI_NEON}${ANSI_BOLD}► RUN THE FULL INTERACTIVE CLI:${ANSI_RESET}
  ${ANSI_WHITE}$ ${ANSI_BOLD}npx kawaki${ANSI_RESET}

${ANSI_NEON}${ANSI_BOLD}► 6 CORE ENGINEERING CAPABILITIES:${ANSI_RESET}
  ${ANSI_CYAN}[01] Custom Web Development${ANSI_RESET}       Next.js 15, React 19, TypeScript, Cloudflare Workers
  ${ANSI_CYAN}[02] Shopify & Headless Commerce${ANSI_RESET}  High-conversion bespoke Liquid & Hydrogen storefronts
  ${ANSI_CYAN}[03] AI Automation & Agents${ANSI_RESET}       Deterministic workflows, LangChain, n8n, Model Routing
  ${ANSI_CYAN}[04] AI Search Optimization${ANSI_RESET}       AEO / GEO, Knowledge Graphs, Citation Optimization
  ${ANSI_CYAN}[05] Malware & Incident Recovery${ANSI_RESET}  Disinfection, backdoor eradication, database sanitization
  ${ANSI_CYAN}[06] Performance Engineering${ANSI_RESET}      Core Web Vitals, Sub-second LCP, Edge distribution

${ANSI_NEON}${ANSI_BOLD}► 11 VERIFIED CLIENT CASE STUDIES:${ANSI_RESET}
  ${ANSI_WHITE}[01] Pixza${ANSI_RESET}            ${ANSI_DIM}AI & Digital Products${ANSI_RESET}      (Autonomous AI Creative Studio)
  ${ANSI_WHITE}[02] Kala Design Co${ANSI_RESET}   ${ANSI_DIM}Brand & Architecture${ANSI_RESET}       (${ANSI_GREEN}https://kaladesignco.com/${ANSI_RESET})
  ${ANSI_WHITE}[03] Kova${ANSI_RESET}              ${ANSI_DIM}Developer Tools / Canvas${ANSI_RESET}   (Visual Website Canvas Engine)
  ${ANSI_WHITE}[04] NextSchool ERP${ANSI_RESET}   ${ANSI_DIM}Fullstack SaaS${ANSI_RESET}             (${ANSI_GREEN}https://nextschoolerp.com/${ANSI_RESET})
  ${ANSI_WHITE}[05] BAZZARO${ANSI_RESET}          ${ANSI_DIM}Commerce & D2C${ANSI_RESET}             (${ANSI_GREEN}https://www.bazzaro.in/${ANSI_RESET})
  ${ANSI_WHITE}[06] Urbanland${ANSI_RESET}        ${ANSI_DIM}B2B Industrial Catalog${ANSI_RESET}     (${ANSI_GREEN}https://urbanlandproducts.com/${ANSI_RESET})
  ${ANSI_WHITE}[07] Decor Lab${ANSI_RESET}        ${ANSI_DIM}Brand & Interiors${ANSI_RESET}          (${ANSI_GREEN}https://www.decorlabs.co.in/${ANSI_RESET})
  ${ANSI_WHITE}[08] NursePass${ANSI_RESET}        ${ANSI_DIM}Healthcare EdTech${ANSI_RESET}          (${ANSI_GREEN}https://nursepass.de/${ANSI_RESET})
  ${ANSI_WHITE}[09] LMS Ecosystem${ANSI_RESET}   ${ANSI_DIM}Mobile (Flutter / BLoC)${ANSI_RESET}   (Tri-Portal Faculty, Parent & Fleet)
  ${ANSI_WHITE}[10] Slix IPTV${ANSI_RESET}       ${ANSI_DIM}Mobile Media Streaming${ANSI_RESET}    (Low-Latency PiP Player)
  ${ANSI_WHITE}[11] Spa & Salon${ANSI_RESET}     ${ANSI_DIM}Mobile Operations${ANSI_RESET}         (Multi-Branch Booking App)

${ANSI_NEON}${ANSI_BOLD}► CONTACT & ENGAGEMENT:${ANSI_RESET}
  ${ANSI_WHITE}Website:${ANSI_RESET}  ${ANSI_UNDERLINE}https://www.kawaki.co.in${ANSI_RESET}
  ${ANSI_WHITE}Email:${ANSI_RESET}    ${ANSI_UNDERLINE}hello@kawakistudios.com${ANSI_RESET}
  ${ANSI_WHITE}CLI Form:${ANSI_RESET} Run ${ANSI_BOLD}npx kawaki contact${ANSI_RESET} directly in your terminal
  ${ANSI_WHITE}Web Term:${ANSI_RESET} ${ANSI_UNDERLINE}https://www.kawaki.co.in/terminal${ANSI_RESET}

${ANSI_DIM}Tip: Run 'curl -sL kawaki.co.in/cli?q=projects' or 'curl -sL kawaki.co.in/cli?q=services'${ANSI_RESET}
`;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  if (req.method === 'OPTIONS') {
    return res.status ? res.status(204).end() : res.end();
  }

  const urlObj = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);
  const q = (urlObj.searchParams.get('q') || '').toLowerCase();
  const formatJson = urlObj.searchParams.get('json') === '1';

  if (formatJson) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      name: "Kawaki Studios",
      tagline: "Bespoke Digital Engineering & High-Performance Systems",
      website: "https://www.kawaki.co.in",
      cli: "npx kawaki",
      servicesUrl: "https://www.kawaki.co.in/services",
      caseStudiesUrl: "https://www.kawaki.co.in/case-studies"
    }, null, 2));
  }

  const output = `${CLI_BANNER}\n${STUDIO_INFO}\n`;
  res.end(output);
};
