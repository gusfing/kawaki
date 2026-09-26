const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { target, replacement } of replacements) {
    if (content.includes(target)) {
      content = content.replace(target, replacement);
    } else {
      console.warn(`Target not found in ${filePath}:\n${target.slice(0, 100)}...`);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated: ${filePath}`);
    return true;
  }
  return false;
}

// 1. custom-web-development.html
const customWebPath = path.join(__dirname, '../public/services/custom-web-development.html');
replaceInFile(customWebPath, [
  {
    target: '<title>Custom Web Development &amp; Modern Web Applications — Kawaki Studios</title>',
    replacement: '<title>Custom Web Development &amp; Digital Flagship Engineering — Kawaki Studios</title>'
  },
  {
    target: '<meta name="description" content="Custom web development and bespoke web applications built with Next.js, TypeScript, and clean architecture. Engineered for performance, security, and scale." />',
    replacement: '<meta name="description" content="Bespoke custom web development, digital flagships, and high-conversion marketing websites engineered with Next.js, TypeScript, and clean editorial architecture." />'
  },
  {
    target: '<meta property="og:title" content="Custom Web Development &amp; Modern Web Applications — Kawaki Studios" />',
    replacement: '<meta property="og:title" content="Custom Web Development &amp; Digital Flagship Engineering — Kawaki Studios" />'
  },
  {
    target: '<meta property="og:description" content="Custom web development and bespoke web applications built with Next.js, TypeScript, and clean architecture. Engineered for performance, security, and scale." />',
    replacement: '<meta property="og:description" content="Bespoke custom web development, digital flagships, and high-conversion marketing websites engineered with Next.js, TypeScript, and clean editorial architecture." />'
  },
  {
    target: '<meta name="twitter:title" content="Custom Web Development &amp; Modern Web Applications — Kawaki Studios" />',
    replacement: '<meta name="twitter:title" content="Custom Web Development &amp; Digital Flagship Engineering — Kawaki Studios" />'
  },
  {
    target: '<meta name="twitter:description" content="Custom web development and bespoke web applications built with Next.js, TypeScript, and clean architecture. Engineered for performance, security, and scale." />',
    replacement: '<meta name="twitter:description" content="Bespoke custom web development, digital flagships, and high-conversion marketing websites engineered with Next.js, TypeScript, and clean editorial architecture." />'
  },
  {
    target: '"name": "Custom Web Development & Modern Web Applications",',
    replacement: '"name": "Custom Web Development & Digital Flagship Engineering",'
  },
  {
    target: '"description": "Custom web development and bespoke web applications built with Next.js, TypeScript, and clean architecture. Engineered for performance, security, and scale.",',
    replacement: '"description": "Bespoke custom web development, digital flagships, and high-conversion marketing websites engineered with Next.js, TypeScript, and clean editorial architecture.",'
  },
  {
    target: '"serviceType": "Custom Web Development and Web Application Engineering"',
    replacement: '"serviceType": "Custom Web Development & Digital Flagship Engineering"'
  },
  {
    target: `<h1 class="hero-title" style="font-size: clamp(2.8rem, 6vw, 5.5rem);">
                    Custom Web Development &amp;<br><em>Modern Web Applications</em>
                </h1>`,
    replacement: `<h1 class="hero-title" style="font-size: clamp(2.8rem, 6vw, 5.5rem);">
                    Custom Web Development &amp;<br><em>Digital Flagship Engineering</em>
                </h1>`
  },
  {
    target: `                <div class="story-title">
                    <h2>Bespoke Websites and<br><em>Scalable Web Applications</em></h2>
                </div>
                <div class="story-content">
                    <p>
                        Websites are not brochure pages—they are interactive software systems that define how clients, investors, and buyers perceive your organization. As a dedicated custom web development company, we engineer bespoke web development solutions and scalable web application development with clean Next.js architecture, responsive layouts, and disciplined frontend performance.
                    </p>
                    <p>
                        Every line of code is purposeful: no bloated third-party plugins, no unmaintained dependencies, and no compromises on accessibility. We bridge high-concept editorial aesthetics with robust full-stack engineering to build custom websites and web applications that endure and convert.
                    </p>`,
    replacement: `                <div class="story-title">
                    <h2>Bespoke Websites and<br><em>High-Conversion Flagships</em></h2>
                </div>
                <div class="story-content">
                    <p>
                        Websites are not brochure pages—they are interactive software systems that define how clients, investors, and buyers perceive your organization. As a dedicated custom web development studio, we engineer bespoke digital flagships, editorial brand platforms, and high-conversion marketing websites with clean Next.js architecture, responsive layouts, and disciplined frontend performance.
                    </p>
                    <p>
                        Every line of code is purposeful: no bloated third-party plugins, no unmaintained dependencies, and no compromises on accessibility. We bridge high-concept editorial aesthetics with robust engineering to build custom web platforms that endure, convert, and scale. Looking to engineer an authenticated SaaS platform, internal operations tool, or interactive client portal instead? Explore our dedicated <a href="/services/web-application-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">Web Application Development</a> capabilities.
                    </p>`
  },
  {
    target: 'Established platforms like WordPress, <a href="/services/shopify-development"',
    replacement: 'Established platforms like <a href="/services/wordpress-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">WordPress</a>, <a href="/services/shopify-development"'
  }
]);

// 2. web-application-development.html
const webAppPath = path.join(__dirname, '../public/services/web-application-development.html');
replaceInFile(webAppPath, [
  {
    target: '<title>Web Application Development &amp; Custom Portal Engineering — Kawaki Studios</title>',
    replacement: '<title>Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios</title>'
  },
  {
    target: '<meta name="description" content="Custom web application development, client portals, internal operations dashboards, and SaaS product engineering built with Next.js, React, and TypeScript." />',
    replacement: '<meta name="description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />'
  },
  {
    target: '<meta property="og:title" content="Web Application Development &amp; Custom Portal Engineering — Kawaki Studios" />',
    replacement: '<meta property="og:title" content="Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios" />'
  },
  {
    target: '<meta property="og:description" content="Custom web application development, client portals, internal operations dashboards, and SaaS product engineering built with Next.js, React, and TypeScript." />',
    replacement: '<meta property="og:description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />'
  },
  {
    target: '<meta name="twitter:title" content="Web Application Development &amp; Custom Portal Engineering — Kawaki Studios" />',
    replacement: '<meta name="twitter:title" content="Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios" />'
  },
  {
    target: '<meta name="twitter:description" content="Custom web application development, client portals, internal operations dashboards, and SaaS product engineering built with Next.js, React, and TypeScript." />',
    replacement: '<meta name="twitter:description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />'
  },
  {
    target: '"name": "Web Application Development & Custom Portal Engineering",',
    replacement: '"name": "Web Application Development & Custom SaaS Engineering",'
  },
  {
    target: '"description": "Custom web application development, client portals, internal operations dashboards, and SaaS product engineering built with Next.js, React, and TypeScript.",',
    replacement: '"description": "Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript.",'
  },
  {
    target: '"serviceType": "Web Application Development, Portal Engineering, and SaaS Development"',
    replacement: '"serviceType": "Web Application Development & Custom SaaS Engineering"'
  },
  {
    target: `            {
              "@type": "ListItem",
              "position": 3,
              "name": "Custom Web Development",
              "item": "https://www.kawaki.co.in/services/custom-web-development"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Web Application Development",
              "item": "https://www.kawaki.co.in/services/web-application-development"
            }`,
    replacement: `            {
              "@type": "ListItem",
              "position": 3,
              "name": "Web Application Development",
              "item": "https://www.kawaki.co.in/services/web-application-development"
            }`
  },
  {
    target: `                <nav class="service-breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/services">Services</a>
                    <span>/</span>
                    <a href="/services/custom-web-development">Custom Web Development</a>
                    <span>/</span>
                    <span style="color: #111;">Web Application Development</span>
                </nav>`,
    replacement: `                <nav class="service-breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/services">Services</a>
                    <span>/</span>
                    <span style="color: #111;">Web Application Development</span>
                </nav>`
  },
  {
    target: '<h1 class="hero-title" style="font-size: clamp(2.6rem, 5.5vw, 5rem);">\n                    Custom Web Application Development &amp;<br><em>Portal Engineering</em>\n                </h1>',
    replacement: '<h1 class="hero-title" style="font-size: clamp(2.6rem, 5.5vw, 5rem);">\n                    Web Application Development &amp;<br><em>Custom SaaS Engineering</em>\n                </h1>'
  },
  {
    target: `                    <p>
                        As part of our <a href="/services/custom-web-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">custom web development</a> capabilities, we engineer authenticated client portals, high-density analytical dashboards, and internal business tools. Every web application is built with strict TypeScript type-safety, responsive React component systems, and scalable relational data models engineered for performance and security.
                    </p>`,
    replacement: `                    <p>
                        While our <a href="/services/custom-web-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">custom web development</a> practice specializes in brand flagships and marketing platforms, our web application engineering practice focuses on authenticated client portals, multi-tenant SaaS products, and high-density analytical dashboards. Every application is built with strict TypeScript type-safety, responsive React component systems, and scalable relational data models engineered for security, tenant isolation, and sub-second execution.
                    </p>`
  }
]);

// 3. website-redesign.html
const redesignPath = path.join(__dirname, '../public/services/website-redesign.html');
replaceInFile(redesignPath, [
  {
    target: '<span class="service-desc">Transitioning out of monolithic CMS architectures or outdated site builders into modern Next.js frontends. We decouple presentation layers',
    replacement: '<span class="service-desc">Transitioning out of monolithic CMS architectures or outdated site builders into modern Next.js frontends or dedicated <a href="/services/web-application-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">web applications</a>. We decouple presentation layers'
  }
]);

// 4. website-performance-optimization.html
const perfPath = path.join(__dirname, '../public/services/website-performance-optimization.html');
replaceInFile(perfPath, [
  {
    target: '<span class="service-desc">For database-driven platforms, unindexed SQL queries and autoloaded transient records inflate TTFB. We profile slow queries, add relational indexes, and streamline database calls to ensure snappy backend execution.</span>',
    replacement: '<span class="service-desc">For database-driven platforms and full-stack <a href="/services/web-application-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">web applications</a>, unindexed SQL queries and autoloaded transient records inflate TTFB. We profile slow queries, add relational indexes, and streamline database calls to ensure snappy backend execution.</span>'
  },
  {
    target: `                <div class="flex-col-right service-items">
                    <div class="service-row" style="cursor: default;">
                        <h3 class="service-name">Explicit Dimensioning &amp; Aspect Ratio Preservation</h3>`,
    replacement: `                <div class="flex-col-right service-items">
                    <div class="definition-callout" style="background: #fafafa; border: 1px solid rgba(17,17,17,0.08); border-left: 3px solid #C6FF00; padding: 22px 24px; margin-bottom: 2rem; border-radius: 4px;">
                        <span style="font-family: 'Host Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #111; display: block; margin-bottom: 6px;">// Core Web Vitals Metric Definition</span>
                        <h3 style="font-family: 'Host Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; color: #111; margin: 0 0 10px 0;">What is Interaction to Next Paint (INP)?</h3>
                        <p style="font-size: 0.95rem; color: #333; line-height: 1.65; margin: 0;">
                            Interaction to Next Paint (INP) is an official Core Web Vitals metric that evaluates a webpage’s overall responsiveness to user interactions across the entire duration of a page visit. It measures the latency between when a visitor initiates an action—such as clicking a navigation link, tapping a mobile button, or typing in a form—and when the browser is next able to paint an updated visual frame. Google categorizes an INP score of 200 milliseconds or less as "good" responsiveness, while scores above 500 milliseconds indicate severe main-thread interaction delays.
                        </p>
                    </div>
                    <div class="service-row" style="cursor: default;">
                        <h3 class="service-name">Explicit Dimensioning &amp; Aspect Ratio Preservation</h3>`
  }
]);

// 5. wordpress-malware-removal.html
const malwarePath = path.join(__dirname, '../public/services/wordpress-malware-removal.html');
replaceInFile(malwarePath, [
  {
    target: `                <div class="flex-col-right service-items">
                    <a href="/services/custom-web-development" class="service-row">
                        <h3 class="service-name">Custom Web Development</h3>
                        <span class="service-desc">Modern web architectures built with Next.js, headless CMS layers, and secure hosting infrastructure designed to eliminate legacy CMS vulnerabilities.</span>
                    </a>`,
    replacement: `                <div class="flex-col-right service-items">
                    <a href="/services/wordpress-development" class="service-row">
                        <h3 class="service-name">WordPress Development &amp; Gutenberg Architecture</h3>
                        <span class="service-desc">Enterprise WordPress engineering, bespoke React Gutenberg blocks, and clean architectures built without vulnerable, unmaintained third-party plugins.</span>
                    </a>
                    <a href="/services/custom-web-development" class="service-row">
                        <h3 class="service-name">Custom Web Development</h3>
                        <span class="service-desc">Modern web architectures built with Next.js, headless CMS layers, and secure hosting infrastructure designed to eliminate legacy CMS vulnerabilities.</span>
                    </a>`
  }
]);

// 6. ai-search-optimization.html
const aiSearchPath = path.join(__dirname, '../public/services/ai-search-optimization.html');
replaceInFile(aiSearchPath, [
  {
    target: `                <div class="flex-col-right service-items">
                    <p style="font-size: 0.98rem; line-height: 1.7; color: #444; margin-bottom: 1.5rem;">
                        The marketplace is crowded with newly invented acronyms sold as proprietary silver bullets. At Kawaki Studios, we recognize that SEO, AEO, GEO, and LLM SEO represent complementary layers of the same overarching objective: making your company's digital presence clear, authoritative, and machine-readable.
                    </p>`,
    replacement: `                <div class="flex-col-right service-items">
                    <div class="definition-callout" style="background: #fafafa; border: 1px solid rgba(17,17,17,0.08); border-left: 3px solid #C6FF00; padding: 22px 24px; margin-bottom: 2rem; border-radius: 4px;">
                        <span style="font-family: 'Host Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #111; display: block; margin-bottom: 6px;">// Core Definition &amp; Architecture</span>
                        <h3 style="font-family: 'Host Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; color: #111; margin: 0 0 10px 0;">What is Generative Engine Optimization (GEO)?</h3>
                        <p style="font-size: 0.95rem; color: #333; line-height: 1.65; margin: 0;">
                            Generative Engine Optimization (GEO) is the technical and structural practice of optimizing digital assets for multi-modal AI systems and large language models (such as Google AI Overviews, Perplexity, ChatGPT Search, and Claude). Rather than chasing legacy keyword density, GEO focuses on establishing verifiable entity graphs, authoritative technical citations, structured schema markup, and crawlable factual hierarchies that allow generative AI engines to accurately parse, validate, synthesize, and cite a company's expertise when answering user queries.
                        </p>
                    </div>
                    <p style="font-size: 0.98rem; line-height: 1.7; color: #444; margin-bottom: 1.5rem;">
                        The marketplace is crowded with newly invented acronyms sold as proprietary silver bullets. At Kawaki Studios, we recognize that SEO, AEO, GEO, and LLM SEO represent complementary layers of the same overarching objective: making your company's digital presence clear, authoritative, and machine-readable.
                    </p>`
  }
]);

// 7. seo-spam-removal.html
const spamPath = path.join(__dirname, '../public/services/seo-spam-removal.html');
replaceInFile(spamPath, [
  {
    target: `                <div class="flex-col-right service-items">
                    <div class="service-row" style="cursor: default;">
                        <h3 class="service-name">The Japanese Keyword Hack</h3>`,
    replacement: `                <div class="flex-col-right service-items">
                    <div class="definition-callout" style="background: #fafafa; border: 1px solid rgba(17,17,17,0.08); border-left: 3px solid #C6FF00; padding: 22px 24px; margin-bottom: 2rem; border-radius: 4px;">
                        <span style="font-family: 'Host Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #111; display: block; margin-bottom: 6px;">// Threat Vector Definition</span>
                        <h3 style="font-family: 'Host Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; color: #111; margin: 0 0 10px 0;">What is the Japanese Keyword Hack?</h3>
                        <p style="font-size: 0.95rem; color: #333; line-height: 1.65; margin: 0;">
                            The Japanese Keyword Hack is an automated search engine poisoning infection where cyber attackers compromise a WordPress site to dynamically generate tens of thousands of cloaked spam URLs filled with auto-translated Japanese text promoting counterfeit merchandise and fraudulent storefronts. The malicious scripts typically implement server-side user-agent cloaking—serving normal content to legitimate human visitors while delivering spam to Googlebot—which results in Google search results displaying foreign Japanese characters for the infected company's brand name.
                        </p>
                    </div>
                    <div class="service-row" style="cursor: default;">
                        <h3 class="service-name">The Japanese Keyword Hack</h3>`
  }
]);

// 8. build-blog.js
const blogScriptPath = path.join(__dirname, '../scripts/build-blog.js');
replaceInFile(blogScriptPath, [
  {
    target: `function getContextualService(article) {
  const slug = (article.slug || '').toLowerCase();
  const category = (article.tags && article.tags[0] ? article.tags[0] : '').toLowerCase();

  if (slug.includes('shopify') || slug.includes('commerce') || category.includes('commerce')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('vitals') || slug.includes('search') || category.includes('performance')) {
    return {
      name: 'AI Search Optimization',
      url: '/services/ai-search-optimization',
      label: 'Explore AI Search Optimization & Web Performance'
    };
  }
  if (slug.includes('ai-') || slug.includes('automation') || category.includes('ai') || category.includes('automation')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  return {
    name: 'Custom Web Development',
    url: '/services/custom-web-development',
    label: 'Explore Custom Web Development & Architectural Tiers'
  };
}`,
    replacement: `function getContextualService(article) {
  const slug = (article.slug || '').toLowerCase();
  const category = (article.tags && article.tags[0] ? article.tags[0] : '').toLowerCase();

  if (slug.includes('shopify') || slug.includes('commerce') || category.includes('commerce')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('state-management') || slug.includes('api-boundaries') || slug.includes('web-application')) {
    return {
      name: 'Web Application Development',
      url: '/services/web-application-development',
      label: 'Explore Full-Stack Web Application Engineering'
    };
  }
  if (slug.includes('performance') || slug.includes('speed') || slug.includes('core-web-vitals') || category.includes('performance')) {
    return {
      name: 'Website Performance Optimization',
      url: '/services/website-performance-optimization',
      label: 'Explore Website Performance & Core Web Vitals Optimization'
    };
  }
  if (slug.includes('wordpress')) {
    return {
      name: 'WordPress Development',
      url: '/services/wordpress-development',
      label: 'Explore Custom WordPress Engineering & Gutenberg Architecture'
    };
  }
  if (slug.includes('search') || slug.includes('aeo') || slug.includes('geo')) {
    return {
      name: 'AI Search Optimization',
      url: '/services/ai-search-optimization',
      label: 'Explore AI Search Optimization & Search Engineering'
    };
  }
  if (slug.includes('ai-') || slug.includes('automation') || category.includes('ai') || category.includes('automation')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  return {
    name: 'Custom Web Development',
    url: '/services/custom-web-development',
    label: 'Explore Custom Web Development & Architectural Tiers'
  };
}`
  }
]);

console.log('All pass 02 enhancements applied.');
