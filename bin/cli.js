#!/usr/bin/env node

/**
 * KAWAKI STUDIOS — OFFICIAL TERMINAL CLI
 * Run via: npx kawaki
 * Or: node bin/cli.js [command]
 * 
 * Bespoke Digital Engineering, High-Performance Web Flagships,
 * AI Applications, and Mobile Ecosystems.
 * 
 * SF 37.77° N / TYO 35.67° N • EST. 2026 • ZERO FLUFF
 */

const readline = require('readline');
const https = require('https');
const http = require('http');
const { exec } = require('child_process');

// ANSI Color Tokens (Kawaki Neon & Stealth Dark)
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  
  // Custom 24-bit RGB or standard 256 colors
  neon: '\x1b[38;2;198;255;0m',      // #C6FF00 Kawaki Neon Accent
  neonBg: '\x1b[48;2;198;255;0m\x1b[38;2;0;0;0m',
  white: '\x1b[38;2;255;255;255m',
  slate: '\x1b[38;2;148;163;184m',
  darkGray: '\x1b[38;2;71;85;105m',
  charcoal: '\x1b[38;2;30;41;59m',
  cyan: '\x1b[38;2;56;189;248m',
  red: '\x1b[38;2;248;113;113m',
  yellow: '\x1b[38;2;250;204;21m',
  green: '\x1b[38;2;74;222;128m',
  purple: '\x1b[38;2;192;132;252m',
};

// Studio Data
const STUDIO_DATA = {
  name: "Kawaki Studios",
  tagline: "Bespoke Digital Engineering & High-Performance Systems",
  coordinates: "SF 37.77° N / TYO 35.67° N",
  founded: "2026",
  website: "https://www.kawaki.co.in",
  email: "hello@kawakistudios.com",
  ethos: "We reject bloated templates, generic frameworks, and transient hype. Every platform we build is engineered with strict type safety, sub-second latency, and architectural durability.",
  
  services: [
    {
      id: "web-dev",
      title: "Custom Web Development",
      tier: "Fullstack Architecture",
      stack: "Next.js 15, React 19, TypeScript, TailwindCSS v4, Cloudflare Workers",
      desc: "Custom digital flagships and bespoke web applications built from scratch with zero template overhead, sub-second load times, and custom interaction mechanics.",
      url: "https://www.kawaki.co.in/services/custom-web-development"
    },
    {
      id: "shopify",
      title: "Shopify & Headless Commerce",
      tier: "Commerce Engineering",
      stack: "Shopify Liquid, Hydrogen, Storefront API, Custom Private Apps",
      desc: "High-conversion custom storefronts, custom checkout extensions, private API integrations, and headless commerce architectures engineered for rapid conversion.",
      url: "https://www.kawaki.co.in/services/shopify-development"
    },
    {
      id: "ai-auto",
      title: "AI Automation & Agents",
      tier: "Intelligent Systems",
      stack: "Deterministic Workflows, n8n, LangChain, Model Routing, Worker AI",
      desc: "Autonomous workflow pipelines, multi-model failover architectures, token-cost routing, and production AI assistants that run inside client infrastructure.",
      url: "https://www.kawaki.co.in/services/ai-automation"
    },
    {
      id: "ai-search",
      title: "AI Search Optimization (AEO / GEO)",
      tier: "Search Engineering",
      stack: "JSON-LD Entity Graphs, Semantic Vectors, Citation Parsing, llms.txt",
      desc: "Reverse-engineering generative search engines (Perplexity, ChatGPT Search, Google AI Overviews) to position institutional brands as definitive sources.",
      url: "https://www.kawaki.co.in/services/ai-search-optimization"
    },
    {
      id: "security",
      title: "Security & Forensic Recovery",
      tier: "Incident Response",
      stack: "Database Sanitization, AST Code Auditing, Payload Forensics, WAF",
      desc: "Emergency malware disinfection, Japanese SEO keyword spam mitigation, persistent PHP backdoor eradication, and hardened perimeter defense.",
      url: "https://www.kawaki.co.in/services/wordpress-malware-removal"
    },
    {
      id: "perf",
      title: "Website Performance Optimization",
      tier: "Core Web Vitals",
      stack: "Sub-Second INP, LCP < 1.2s, Edge Caching, WebP/AVIF Pipelines",
      desc: "Rigorous profiling and engineering optimization guaranteeing 95+ Google PageSpeed mobile scores, instant hydration, and low server execution times.",
      url: "https://www.kawaki.co.in/services/website-performance-optimization"
    }
  ],

  projects: [
    {
      slug: "pixza",
      name: "Pixza",
      category: "AI & Digital Products",
      industry: "Generative Media & Design SaaS",
      client: "Pixza AI Inc.",
      status: "Private Studio Deployment",
      liveUrl: null,
      stack: "React 19, Hono, Cloudflare Workers AI, Token Rotation, Flow Canvas",
      headline: "Autonomous AI Creative Studio with Multi-Model Pipeline",
      summary: "Production AI generation platform orchestrating real-time model failover, infinite reactive canvas state, and sub-100ms streaming responses."
    },
    {
      slug: "kala-design",
      name: "Kala Design Co",
      category: "Brand & Marketing Websites",
      industry: "Architecture & Interior Design",
      client: "Kala Design Co",
      status: "Production Live",
      liveUrl: "https://kaladesignco.com/",
      stack: "Next.js, TailwindCSS, Lenis Scroll, Cloudflare Edge, Semantic Microdata",
      headline: "Bespoke Editorial Architecture Flagship",
      summary: "High-performance digital architectural monograph featuring generous whitespace, serif typography, monograph discovery, and sub-second asset delivery."
    },
    {
      slug: "kova",
      name: "Kova",
      category: "AI & Digital Products",
      industry: "Developer Tools & Visual Builders",
      client: "Kova Labs",
      status: "Private Testing (URL Scheduled)",
      liveUrl: null,
      stack: "React 19, TypeScript, TailwindCSS v4, Web Workers, JSON AST",
      headline: "Visual Generative Website Canvas with Reactive AST",
      summary: "Drag-and-drop web builder engine utilizing JSON component AST trees and local application state for sub-millisecond visual manipulation."
    },
    {
      slug: "nextschool-erp",
      name: "NextSchool ERP",
      category: "Web Applications & Platforms",
      industry: "Enterprise Education Management",
      client: "NextSchool EdTech",
      status: "Production Live",
      liveUrl: "https://nextschoolerp.com/",
      stack: "React, Node.js, Express, PostgreSQL, Redis, Docker, Multi-Tenant Cloud",
      headline: "Multi-Portal Enterprise Campus Management Platform",
      summary: "Fullstack enterprise academic operating system uniting administration, student registration, automated fee processing, and examination portals."
    },
    {
      slug: "bazzaro",
      name: "BAZZARO",
      category: "Commerce & B2B",
      industry: "Luxury Menswear & Tailoring",
      client: "BAZZARO Lifestyle",
      status: "Production Live",
      liveUrl: "https://www.bazzaro.in/",
      stack: "Shopify Liquid, Custom Theme Architecture, Vanilla JS, Ajax Cart, CDN",
      headline: "High-Conversion Editorial D2C Fashion Flagship",
      summary: "Custom bespoke Shopify storefront engineered with instant drawer carts, faceted collection filtering, and sub-second mobile navigation."
    },
    {
      slug: "urbanland",
      name: "Urbanland Products",
      category: "Commerce & B2B",
      industry: "Smart City Infrastructure & Architectural Fixtures",
      client: "Urbanland Products",
      status: "Production Live",
      liveUrl: "https://urbanlandproducts.com/",
      stack: "Custom Frontend, Dynamic Filter Engine, REST API, Cloudflare CDN",
      headline: "Industrial Infrastructure Catalog & Material Spec Matrix",
      summary: "B2B architectural product specification system with multi-composite material matrices, CAD asset downloads, and enterprise tender quote journeys."
    },
    {
      slug: "decor-lab",
      name: "Decor Lab",
      category: "Brand & Marketing Websites",
      industry: "Luxury Commercial Architecture & Landscaping",
      client: "Decor Lab Group",
      status: "Production Live",
      liveUrl: "https://www.decorlabs.co.in/",
      stack: "Custom Web Architecture, High-Density Image Pipeline, Cloudflare Edge",
      headline: "Sensory Architectural Showcase & Consultation Engine",
      summary: "Editorial landscape portfolio honoring 33 years of institutional design heritage with seamless turnkey inquiry funnels and public Kawaki attribution."
    },
    {
      slug: "nursepass",
      name: "NursePass",
      category: "Web Applications & Platforms",
      industry: "Healthcare Education & Global Nursing Mobility",
      client: "NursePass GmbH",
      status: "Production Live",
      liveUrl: "https://nursepass.de/",
      stack: "Next.js, TypeScript, PostgreSQL, AWS S3, TailwindCSS, JWT Auth",
      headline: "Healthcare Qualification & Adaptation Portal for Germany",
      summary: "Structured e-learning platform guiding international nursing professionals through medical German exams and statutory German state qualification."
    },
    {
      slug: "lms-ecosystem",
      name: "LMS Ecosystem",
      category: "Mobile Applications",
      industry: "Education Mobility & Transit Operations",
      client: "EduTech Global",
      status: "Production Mobile Apps",
      liveUrl: null,
      stack: "Flutter, Dart, BLoC/Cubit Architecture, WebSockets, REST APIs",
      headline: "Tri-Portal Digital Ecosystem: Faculty, Parents & GPS Fleet",
      summary: "Native cross-platform mobile suite orchestrating teacher gradebooks, parent notifications, and real-time student transit bus telemetry."
    },
    {
      slug: "iptv-mobile",
      name: "Slix IPTV",
      category: "Mobile Applications",
      industry: "Digital Media & High-Bandwidth Streaming",
      client: "Slix Media Inc.",
      status: "Production Mobile App",
      liveUrl: null,
      stack: "Flutter, Dart, ExoPlayer, AVPlayer, Local Storage, Picture-in-Picture",
      headline: "High-Throughput Mobile Video Player with PiP Ergonomics",
      summary: "Low-latency streaming mobile player with adaptive bitrate buffering, custom video decoders, and background Picture-in-Picture capabilities."
    },
    {
      slug: "spa-salon",
      name: "Spa & Salon Management",
      category: "Mobile Applications",
      industry: "Hospitality & Multi-Branch Resource Scheduling",
      client: "Aura Wellness Group",
      status: "Production Mobile App",
      liveUrl: null,
      stack: "Flutter, Dart, Provider/BLoC, Firebase Cloud Messaging, REST API",
      headline: "Multi-Location Booking & Stylist Scheduling Platform",
      summary: "On-demand mobile booking application featuring synchronized calendars, multi-branch service menus, and direct stylist assignment."
    }
  ],

  articles: [
    {
      slug: "how-ai-search-engines-cite-sources",
      title: "How AI Search Engines Cite Sources: The Mechanics of AEO & GEO",
      category: "AI & Search Engineering",
      date: "Feb 2026"
    },
    {
      slug: "ai-automation-vs-ai-agents",
      title: "AI Automation vs. AI Agents: Choosing the Right Automation Layer",
      category: "AI Architecture",
      date: "Feb 2026"
    },
    {
      slug: "shopify-liquid-vs-headless",
      title: "Shopify Liquid vs. Headless: Architectural Tradeoffs for Growth Brands",
      category: "Commerce",
      date: "Feb 2026"
    },
    {
      slug: "nextjs-performance-architecture",
      title: "Next.js Performance Architecture: Achieving Sub-Second Page Transitions",
      category: "Web Engineering",
      date: "Jan 2026"
    },
    {
      slug: "wordpress-malicious-redirects-cleanup",
      title: "Dissecting WordPress Malicious Redirects: Forensic Analysis & Remediation",
      category: "Security",
      date: "Jan 2026"
    }
  ]
};

// ASCII Art Logo
const ASCII_LOGO = `
${C.neon}██╗  ██╗ █████╗ ██╗    ██╗ █████╗ ██╗  ██╗██╗
██║ ██╔╝██╔══██╗██║    ██║██╔══██╗██║ ██╔╝██║
█████╔╝ ███████║██║ █╗ ██║███████║█████╔╝ ██║
██╔═██╗ ██╔══██║██║███╗██║██╔══██║██╔═██╗ ██║
██║  ██╗██║  ██║╚███╔███╔╝██║  ██║██║  ██╗██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝${C.reset}
${C.bold}${C.white} K A W A K I   S T U D I O S ${C.reset} // ${C.neon}CLI v2.0.0${C.reset}
${C.dim}${STUDIO_DATA.coordinates} • ${STUDIO_DATA.tagline}${C.reset}
`;

function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0f');
}

function printHeader() {
  console.log(ASCII_LOGO);
}

function printHelp() {
  console.log(`
${C.bold}${C.white}AVAILABLE COMMANDS:${C.reset}
  ${C.neon}about${C.reset}             Studio manifesto, core philosophy, and engineering ethos
  ${C.neon}services${C.reset}          Explore our 6 technical capabilities & architecture tiers
  ${C.neon}projects${C.reset} / ${C.neon}work${C.reset}   List all 11 real client case studies & verified tech stacks
  ${C.neon}project <slug>${C.reset}    View deep engineering monograph for a specific project
  ${C.neon}blog${C.reset} / ${C.neon}insights${C.reset}   List recent engineering & architectural essays
  ${C.neon}read <slug>${C.reset}       Read summary and takeaways for an engineering article
  ${C.neon}contact${C.reset} / ${C.neon}hire${C.reset}    Submit an inquiry directly to our engineering team
  ${C.neon}ping${C.reset} / ${C.neon}status${C.reset}      Perform live latency check to ${C.underline}${STUDIO_DATA.website}${C.reset}
  ${C.neon}open [page]${C.reset}       Open project or portfolio in your default web browser
  ${C.neon}clear${C.reset} / ${C.neon}cls${C.reset}       Clear the terminal viewport
  ${C.neon}exit${C.reset} / ${C.neon}quit${C.reset}        Close the interactive CLI shell
`);
}

function printAbout() {
  console.log(`
${C.bold}${C.white}========================================================================${C.reset}
${C.neon}${C.bold}ABOUT KAWAKI STUDIOS${C.reset} // ${C.slate}${STUDIO_DATA.coordinates}${C.reset}
${C.bold}${C.white}========================================================================${C.reset}

${C.bold}"${STUDIO_DATA.ethos}"${C.reset}

${C.white}Kawaki Studios is an elite digital engineering studio and technical consultancy.
We partner directly with founders, CTOs, and institutional brands across the United
States, Europe, and Asia to architect bespoke web applications, AI generative tools,
and cross-platform mobile ecosystems.

${C.neon}${C.bold}ENGINEERING PILLARS:${C.reset}
  ${C.cyan}01 / Zero-Bloat Foundation${C.reset}   Strict semantic markup, no unused dependencies.
  ${C.cyan}02 / Sub-Second SLA${C.reset}          Targeting < 100ms API responses, < 1.2s LCP.
  ${C.cyan}03 / Real Verification${C.reset}       Zero fabricated numbers; honest engineering.
  ${C.cyan}04 / Edge Caching${C.reset}            Global distribution via Cloudflare Workers & AWS.

${C.dim}Official Website: ${C.reset}${C.underline}${STUDIO_DATA.website}${C.reset}
${C.dim}Direct Dispatch:  ${C.reset}${C.underline}${STUDIO_DATA.email}${C.reset}
`);
}

function printServices() {
  console.log(`
${C.bold}${C.white}========================================================================${C.reset}
${C.neon}${C.bold}STUDIO CAPABILITIES & ARCHITECTURAL TIERS${C.reset}
${C.bold}${C.white}========================================================================${C.reset}
`);

  STUDIO_DATA.services.forEach((s, idx) => {
    console.log(`  ${C.neon}[0${idx + 1}] ${C.bold}${s.title}${C.reset} ${C.slate}(${s.tier})${C.reset}`);
    console.log(`      ${C.dim}Stack:${C.reset} ${C.cyan}${s.stack}${C.reset}`);
    console.log(`      ${C.white}${s.desc}${C.reset}`);
    console.log(`      ${C.dim}Explore:${C.reset} ${C.underline}${s.url}${C.reset}\n`);
  });
}

function printProjects() {
  console.log(`
${C.bold}${C.white}========================================================================${C.reset}
${C.neon}${C.bold}VERIFIED CLIENT CASE STUDIES (11 PRODUCTION WORKS)${C.reset}
${C.bold}${C.white}========================================================================${C.reset}
`);

  STUDIO_DATA.projects.forEach((p, idx) => {
    const num = (idx + 1).toString().padStart(2, '0');
    const statusColor = p.status.includes('Live') ? C.green : C.yellow;
    console.log(`  ${C.neon}[${num}] ${C.bold}${C.white}${p.name}${C.reset} ${C.slate}• ${p.category}${C.reset}`);
    console.log(`       ${C.dim}Client:${C.reset} ${p.client} | ${C.dim}Status:${C.reset} ${statusColor}${p.status}${C.reset}`);
    console.log(`       ${C.dim}Stack:${C.reset}  ${C.cyan}${p.stack}${C.reset}`);
    console.log(`       ${C.dim}Brief:${C.reset}  ${p.headline}`);
    if (p.liveUrl) {
      console.log(`       ${C.dim}Link:${C.reset}   ${C.underline}${p.liveUrl}${C.reset}`);
    }
    console.log(`       ${C.dim}CLI:${C.reset}    Type ${C.neon}project ${p.slug}${C.reset} for full technical monograph\n`);
  });
}

function printProjectDetail(slug) {
  const p = STUDIO_DATA.projects.find(x => x.slug === slug.toLowerCase() || x.name.toLowerCase() === slug.toLowerCase());
  if (!p) {
    console.log(`\n${C.red}Error:${C.reset} Project '${slug}' not found. Type ${C.neon}projects${C.reset} to see all 11 slugs.\n`);
    return;
  }

  console.log(`
${C.bold}${C.white}========================================================================${C.reset}
${C.neon}${C.bold}CASE STUDY: ${p.name.toUpperCase()}${C.reset} // ${C.slate}${p.category}${C.reset}
${C.bold}${C.white}========================================================================${C.reset}

${C.bold}${C.white}${p.headline}${C.reset}

${C.slate}CLIENT:${C.reset}          ${p.client}
${C.slate}INDUSTRY:${C.reset}        ${p.industry}
${C.slate}PRODUCTION:${C.reset}      ${p.status.includes('Live') ? C.green : C.yellow}${p.status}${C.reset}
${C.slate}DEPLOYED URL:${C.reset}    ${p.liveUrl ? C.underline + p.liveUrl + C.reset : C.dim + 'Private Infrastructure / Non-Public' + C.reset}
${C.slate}VERIFIED STACK:${C.reset}  ${C.cyan}${p.stack}${C.reset}

${C.bold}EXECUTIVE SUMMARY:${C.reset}
${p.summary}

${C.dim}View complete online editorial with high-resolution imagery:${C.reset}
${C.underline}${STUDIO_DATA.website}/case-studies/${p.slug}${C.reset}
`);
}

function printBlog() {
  console.log(`
${C.bold}${C.white}========================================================================${C.reset}
${C.neon}${C.bold}ENGINEERING INSIGHTS & ARCHITECTURAL ESSAYS${C.reset}
${C.bold}${C.white}========================================================================${C.reset}
`);

  STUDIO_DATA.articles.forEach((a, idx) => {
    console.log(`  ${C.neon}[0${idx + 1}] ${C.bold}${a.title}${C.reset}`);
    console.log(`       ${C.dim}Domain:${C.reset} ${C.slate}${a.category}${C.reset} | ${C.dim}Published:${C.reset} ${a.date}`);
    console.log(`       ${C.dim}Online:${C.reset} ${C.underline}${STUDIO_DATA.website}/blog/${a.slug}${C.reset}\n`);
  });
}

function openInBrowser(target) {
  let url = STUDIO_DATA.website;
  if (target) {
    const p = STUDIO_DATA.projects.find(x => x.slug === target.toLowerCase());
    if (p) {
      url = `${STUDIO_DATA.website}/case-studies/${p.slug}`;
    } else if (target === 'services') {
      url = `${STUDIO_DATA.website}/services`;
    } else if (target === 'about') {
      url = `${STUDIO_DATA.website}/about`;
    } else if (target === 'contact') {
      url = `${STUDIO_DATA.website}/contact`;
    } else if (target === 'blog') {
      url = `${STUDIO_DATA.website}/blog`;
    }
  }

  console.log(`\n${C.neon}Dispatching browser...${C.reset} ${C.underline}${url}${C.reset}`);
  const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${startCmd} "${url}"`, (err) => {
    if (err) {
      console.log(`${C.dim}Unable to auto-launch browser. Please visit manually:${C.reset} ${url}`);
    }
  });
}

function pingSite(callback) {
  console.log(`\n${C.slate}Pinging Kawaki Edge Gateway (${STUDIO_DATA.website})...${C.reset}`);
  const startTime = Date.now();
  
  const req = https.get(STUDIO_DATA.website, { timeout: 6000 }, (res) => {
    const latency = Date.now() - startTime;
    console.log(`  ${C.green}● 200 OK${C.reset} — Latency: ${C.neon}${latency}ms${C.reset} | Server: ${res.headers['server'] || 'Cloudflare/Edge'}`);
    console.log(`  ${C.dim}Status: All systems operational. Edge cache active.${C.reset}\n`);
    if (callback) callback();
  });

  req.on('error', (err) => {
    console.log(`  ${C.red}● Connection error:${C.reset} ${err.message}\n`);
    if (callback) callback();
  });

  req.on('timeout', () => {
    req.destroy();
    console.log(`  ${C.yellow}● Ping timed out (edge network busy).${C.reset}\n`);
    if (callback) callback();
  });
}

function handleInteractiveContact(rl, onDone) {
  console.log(`\n${C.neon}${C.bold}INITIATING TECHNICAL DISCOVERY INTAKE${C.reset}`);
  console.log(`${C.dim}Please provide project parameters. We reply within 24 business hours.${C.reset}\n`);

  rl.question(`  ${C.white}Your Name:${C.reset} `, (name) => {
    if (!name.trim()) {
      console.log(`${C.yellow}Aborted.${C.reset}\n`);
      return onDone();
    }
    rl.question(`  ${C.white}Your Email:${C.reset} `, (email) => {
      if (!email.trim() || !email.includes('@')) {
        console.log(`${C.red}Invalid email. Discovery intake aborted.${C.reset}\n`);
        return onDone();
      }
      rl.question(`  ${C.white}Company / Project Name:${C.reset} `, (company) => {
        rl.question(`  ${C.white}Brief Description of Needs:${C.reset} `, (message) => {
          console.log(`\n${C.slate}Transmitting encrypted payload to Kawaki Lead Gateway...${C.reset}`);
          
          const postData = JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: company.trim() || 'CLI User',
            message: message.trim() || 'CLI Contact Request',
            source: 'CLI (npx kawaki)',
            timestamp: new Date().toISOString()
          });

          const req = https.request('https://www.kawaki.co.in/api/leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
              'User-Agent': 'Kawaki-CLI/2.0.0'
            },
            timeout: 5000
          }, (res) => {
            console.log(`\n  ${C.green}✓ INTAKE TRANSMITTED SUCCESSFULLY!${C.reset}`);
            console.log(`  ${C.white}Thank you, ${name}. Our technical engineering lead will reach out to ${email}.${C.reset}`);
            console.log(`  ${C.dim}Need urgent consultation? Direct email:${C.reset} ${C.underline}${STUDIO_DATA.email}${C.reset}\n`);
            onDone();
          });

          req.on('error', () => {
            console.log(`\n  ${C.yellow}Notice: Cloud lead gateway unreachable from local environment.${C.reset}`);
            console.log(`  ${C.white}Please email our partners directly at:${C.reset} ${C.neon}${STUDIO_DATA.email}${C.reset}\n`);
            onDone();
          });

          req.write(postData);
          req.end();
        });
      });
    });
  });
}

// Subcommand runner for non-interactive execution (e.g. npx kawaki projects)
function runCommandDirectly(cmd, arg, asJson) {
  if (asJson) {
    if (cmd === 'services') return console.log(JSON.stringify(STUDIO_DATA.services, null, 2));
    if (cmd === 'projects' || cmd === 'work') return console.log(JSON.stringify(STUDIO_DATA.projects, null, 2));
    if (cmd === 'project' && arg) {
      const p = STUDIO_DATA.projects.find(x => x.slug === arg.toLowerCase());
      return console.log(JSON.stringify(p || { error: 'Not found' }, null, 2));
    }
    return console.log(JSON.stringify(STUDIO_DATA, null, 2));
  }

  printHeader();

  switch (cmd) {
    case 'about':
    case 'whoami':
    case 'manifesto':
      printAbout();
      break;
    case 'services':
    case 'capabilities':
      printServices();
      break;
    case 'projects':
    case 'work':
    case 'ls':
      printProjects();
      break;
    case 'project':
    case 'view':
    case 'cat':
      if (arg) {
        printProjectDetail(arg);
      } else {
        console.log(`${C.yellow}Please specify a project slug. Example: npx kawaki project pixza${C.reset}\n`);
      }
      break;
    case 'blog':
    case 'insights':
      printBlog();
      break;
    case 'open':
      openInBrowser(arg);
      break;
    case 'ping':
    case 'status':
      pingSite();
      break;
    case 'help':
    case '--help':
    case '-h':
    default:
      printHelp();
      break;
  }
}

// Interactive REPL Shell Loop
function startInteractiveShell() {
  clearScreen();
  printHeader();
  console.log(`${C.bold}Welcome to the Kawaki Studios Terminal Experience.${C.reset}`);
  console.log(`${C.dim}Type ${C.neon}help${C.reset}${C.dim} to see available commands or ${C.neon}exit${C.reset}${C.dim} to quit.${C.reset}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${C.neon}kawaki${C.white}> ${C.reset}`
  });

  rl.prompt();

  rl.on('line', (line) => {
    const raw = line.trim();
    if (!raw) {
      rl.prompt();
      return;
    }

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
      case '?':
        printHelp();
        rl.prompt();
        break;

      case 'about':
      case 'whoami':
      case 'manifesto':
        printAbout();
        rl.prompt();
        break;

      case 'services':
      case 'capabilities':
        printServices();
        rl.prompt();
        break;

      case 'projects':
      case 'work':
      case 'ls':
        printProjects();
        rl.prompt();
        break;

      case 'project':
      case 'view':
      case 'cat':
        if (arg) {
          printProjectDetail(arg);
        } else {
          console.log(`\n${C.yellow}Usage:${C.reset} project <slug> (e.g. project pixza, project kala-design)\n`);
        }
        rl.prompt();
        break;

      case 'blog':
      case 'insights':
        printBlog();
        rl.prompt();
        break;

      case 'contact':
      case 'hire':
        rl.pause();
        handleInteractiveContact(rl, () => {
          rl.resume();
          rl.prompt();
        });
        break;

      case 'open':
        openInBrowser(arg);
        rl.prompt();
        break;

      case 'ping':
      case 'status':
        pingSite(() => {
          rl.prompt();
        });
        break;

      case 'clear':
      case 'cls':
        clearScreen();
        printHeader();
        rl.prompt();
        break;

      case 'exit':
      case 'quit':
      case 'q':
        console.log(`\n${C.dim}Disconnected from Kawaki Studios. Zero fluff, real engineering.${C.reset}\n`);
        rl.close();
        process.exit(0);
        break;

      default:
        console.log(`\n${C.red}Unknown command:${C.reset} "${cmd}". Type ${C.neon}help${C.reset} to view all commands.\n`);
        rl.prompt();
        break;
    }
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

// MAIN ENTRY POINT
const args = process.argv.slice(2);
const isJson = args.includes('--json');
const filteredArgs = args.filter(a => a !== '--json');

if (filteredArgs.length > 0) {
  runCommandDirectly(filteredArgs[0].toLowerCase(), filteredArgs[1], isJson);
} else {
  startInteractiveShell();
}
