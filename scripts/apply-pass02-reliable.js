const fs = require('fs');
const path = require('path');

function normalizeAndReplace(filePath, replacers) {
  let content = fs.readFileSync(filePath, 'utf8');
  const isCrlf = content.includes('\r\n');
  let normalized = content.replace(/\r\n/g, '\n');
  let modified = false;

  for (const { name, from, to } of replacers) {
    const normFrom = from.replace(/\r\n/g, '\n');
    const normTo = to.replace(/\r\n/g, '\n');
    if (normalized.includes(normFrom)) {
      normalized = normalized.replace(normFrom, normTo);
      console.log(`[PASS] ${path.basename(filePath)}: ${name}`);
      modified = true;
    } else {
      console.error(`[FAIL] ${path.basename(filePath)}: ${name}`);
    }
  }

  if (modified) {
    const finalContent = isCrlf ? normalized.replace(/\n/g, '\r\n') : normalized;
    fs.writeFileSync(filePath, finalContent, 'utf8');
  }
}

// 1. custom-web-development.html
const customWebPath = path.join(__dirname, '../public/services/custom-web-development.html');
normalizeAndReplace(customWebPath, [
  {
    name: 'Hero Title',
    from: `<h1 class="hero-title" style="font-size: clamp(2.8rem, 6vw, 5.5rem);">
                    Custom Web Development &amp;<br><em>Modern Web Applications</em>
                </h1>`,
    to: `<h1 class="hero-title" style="font-size: clamp(2.8rem, 6vw, 5.5rem);">
                    Custom Web Development &amp;<br><em>Digital Flagship Engineering</em>
                </h1>`
  },
  {
    name: 'Story Title and Lead Copy',
    from: `                <div class="story-title">
                    <h2>Bespoke Websites and<br><em>Scalable Web Applications</em></h2>
                </div>
                <div class="story-content">
                    <p>
                        Websites are not brochure pages—they are interactive software systems that define how clients, investors, and buyers perceive your organization. As a dedicated custom web development company, we engineer bespoke web development solutions and scalable web application development with clean Next.js architecture, responsive layouts, and disciplined frontend performance.
                    </p>
                    <p>
                        Every line of code is purposeful: no bloated third-party plugins, no unmaintained dependencies, and no compromises on accessibility. We bridge high-concept editorial aesthetics with robust full-stack engineering to build custom websites and web applications that endure and convert.
                    </p>`,
    to: `                <div class="story-title">
                    <h2>Bespoke Websites and<br><em>High-Conversion Flagships</em></h2>
                </div>
                <div class="story-content">
                    <p>
                        Websites are not brochure pages—they are interactive software systems that define how clients, investors, and buyers perceive your organization. As a dedicated custom web development studio, we engineer bespoke digital flagships, editorial brand platforms, and high-conversion marketing websites with clean Next.js architecture, responsive layouts, and disciplined frontend performance.
                    </p>
                    <p>
                        Every line of code is purposeful: no bloated third-party plugins, no unmaintained dependencies, and no compromises on accessibility. We bridge high-concept editorial aesthetics with robust engineering to build custom web platforms that endure, convert, and scale. Looking to engineer an authenticated SaaS platform, internal operations tool, or interactive client portal instead? Explore our dedicated <a href="/services/web-application-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">Web Application Development</a> capabilities.
                    </p>`
  }
]);

// 2. web-application-development.html
const webAppPath = path.join(__dirname, '../public/services/web-application-development.html');
normalizeAndReplace(webAppPath, [
  {
    name: 'Web App Title and Meta Description',
    from: `<meta name="description" content="Custom web application development, client portals, interactive dashboards, and business workflow software built with Next.js, TypeScript, and secure APIs." />
    <link rel="canonical" href="https://www.kawaki.co.in/services/web-application-development" />
    <title>Custom Web Application Development &amp; Portal Engineering — Kawaki Studios</title>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.kawaki.co.in/services/web-application-development" />
    <meta property="og:title" content="Custom Web Application Development &amp; Portal Engineering — Kawaki Studios" />
    <meta property="og:description" content="Custom web application development, client portals, interactive dashboards, and business workflow software built with Next.js, TypeScript, and secure APIs." />
    <meta property="og:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="Custom Web Application Development &amp; Portal Engineering — Kawaki Studios" />
    <meta name="twitter:description" content="Custom web application development, client portals, interactive dashboards, and business workflow software built with Next.js, TypeScript, and secure APIs." />`,
    to: `<meta name="description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />
    <link rel="canonical" href="https://www.kawaki.co.in/services/web-application-development" />
    <title>Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios</title>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.kawaki.co.in/services/web-application-development" />
    <meta property="og:title" content="Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios" />
    <meta property="og:description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />
    <meta property="og:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="Web Application Development &amp; Custom SaaS Engineering — Kawaki Studios" />
    <meta name="twitter:description" content="Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript." />`
  },
  {
    name: 'Web App Schema',
    from: `"name": "Custom Web Application Development & Portal Engineering",
          "url": "https://www.kawaki.co.in/services/web-application-development",
          "description": "Custom web application development, client portals, interactive dashboards, and business workflow software built with Next.js, TypeScript, and secure APIs.",
          "provider": {
            "@type": "Organization",
            "@id": "https://www.kawaki.co.in/#organization",
            "name": "Kawaki Studios",
            "url": "https://www.kawaki.co.in",
            "logo": "https://www.kawaki.co.in/assets/images/kawaki-logo.png"
          },
          "serviceType": "Custom Web Application Development"`,
    to: `"name": "Web Application Development & Custom SaaS Engineering",
          "url": "https://www.kawaki.co.in/services/web-application-development",
          "description": "Custom web application engineering, authenticated SaaS platforms, client portals, interactive dashboards, and multi-tenant software built with Next.js and TypeScript.",
          "provider": {
            "@type": "Organization",
            "@id": "https://www.kawaki.co.in/#organization",
            "name": "Kawaki Studios",
            "url": "https://www.kawaki.co.in",
            "logo": "https://www.kawaki.co.in/assets/images/kawaki-logo.png"
          },
          "serviceType": "Web Application Development & Custom SaaS Engineering"`
  },
  {
    name: 'Breadcrumb Schema List',
    from: `            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://www.kawaki.co.in/services"
            },
            {
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
    to: `            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://www.kawaki.co.in/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Web Application Development",
              "item": "https://www.kawaki.co.in/services/web-application-development"
            }`
  },
  {
    name: 'DOM Breadcrumbs and Hero',
    from: `                <nav class="service-breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/services">Services</a>
                    <span>/</span>
                    <a href="/services/custom-web-development">Custom Web Development</a>
                    <span>/</span>
                    <span style="color: #111;">Web Application Development</span>
                </nav>

                <h1 class="hero-title" style="font-size: clamp(2.6rem, 5.5vw, 5rem);">
                    Custom Web Application Development &amp;<br><em>Portal Engineering</em>
                </h1>`,
    to: `                <nav class="service-breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/services">Services</a>
                    <span>/</span>
                    <span style="color: #111;">Web Application Development</span>
                </nav>

                <h1 class="hero-title" style="font-size: clamp(2.6rem, 5.5vw, 5rem);">
                    Web Application Development &amp;<br><em>Custom SaaS Engineering</em>
                </h1>`
  },
  {
    name: 'Web App Lead Story Differentiation',
    from: `                    <p>
                        As part of our <a href="/services/custom-web-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">custom web development</a> capabilities, we engineer authenticated client portals, high-density analytical dashboards, and internal business tools. Every web application is built with strict TypeScript type-safety, responsive React component systems, and scalable relational data models engineered for performance and security.
                    </p>`,
    to: `                    <p>
                        While our <a href="/services/custom-web-development" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">custom web development</a> practice specializes in brand flagships and marketing platforms, our web application engineering practice focuses on authenticated client portals, multi-tenant SaaS products, and high-density analytical dashboards. Every application is built with strict TypeScript type-safety, responsive React component systems, and scalable relational data models engineered for security, tenant isolation, and sub-second execution.
                    </p>`
  }
]);

// 3. build-blog.js
const blogScriptPath = path.join(__dirname, '../scripts/build-blog.js');
normalizeAndReplace(blogScriptPath, [
  {
    name: 'Contextual Service Resolver',
    from: `function getContextualService(article) {
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
    to: `function getContextualService(article) {
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

// 4. wordpress-malware-removal.html
const malwarePath = path.join(__dirname, '../public/services/wordpress-malware-removal.html');
normalizeAndReplace(malwarePath, [
  {
    name: 'Add WordPress Development to Related Services',
    from: `                <div class="flex-col-right service-items">
                    <a href="/services/custom-web-development" class="service-row">
                        <h3 class="service-name">Custom Web Development</h3>
                        <span class="service-desc">Modern web architectures built with Next.js, headless CMS layers, and secure hosting infrastructure designed to eliminate legacy CMS vulnerabilities.</span>
                    </a>`,
    to: `                <div class="flex-col-right service-items">
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

// 5. ai-search-optimization.html
const aiSearchPath = path.join(__dirname, '../public/services/ai-search-optimization.html');
normalizeAndReplace(aiSearchPath, [
  {
    name: 'GEO Definition Card in Section 02',
    from: `                <div class="flex-col-right service-items">
                    <p style="font-size: 0.98rem; line-height: 1.7; color: #444; margin-bottom: 1.5rem;">
                        The marketplace is crowded with newly invented acronyms sold as proprietary silver bullets. At Kawaki Studios, we recognize that SEO, AEO, GEO, and LLM SEO represent complementary layers of the same overarching objective: making your company's digital presence clear, authoritative, and machine-readable.
                    </p>`,
    to: `                <div class="flex-col-right service-items">
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

// 6. seo-spam-removal.html
const spamPath = path.join(__dirname, '../public/services/seo-spam-removal.html');
normalizeAndReplace(spamPath, [
  {
    name: 'Japanese Keyword Hack Definition Card in Section 01',
    from: `                <div class="flex-col-right service-items">
                    <div class="service-row" style="cursor: default;">
                        <h3 class="service-name">The Japanese Keyword Hack</h3>`,
    to: `                <div class="flex-col-right service-items">
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

console.log('Finished applying reliable pass 02 enhancements.');
