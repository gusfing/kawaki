const fs = require('fs');
const path = require('path');

const auditData = require('../audit_full_30_urls.json');

const queryAnalysis = auditData.map(p => {
  let targetPrimary = '';
  let intent = '';
  let cluster = '';

  if (p.path === '/') {
    targetPrimary = 'digital engineering studio / bespoke web development studio';
    intent = 'Commercial / Brand Navigation';
    cluster = 'Agency Flagship';
  } else if (p.path === '/about') {
    targetPrimary = 'about kawaki studios / kunal sharma digital engineering';
    intent = 'Informational / Brand Verification';
    cluster = 'Entity & Leadership';
  } else if (p.path === '/services') {
    targetPrimary = 'web engineering services / bespoke development offerings';
    intent = 'Commercial Navigation';
    cluster = 'Services Directory';
  } else if (p.path === '/services/custom-web-development') {
    targetPrimary = 'custom web development services / bespoke nextjs development';
    intent = 'Commercial / Transactional';
    cluster = 'Custom Engineering';
  } else if (p.path === '/services/web-application-development') {
    targetPrimary = 'custom web application development / saas engineering services';
    intent = 'Commercial / Transactional';
    cluster = 'Custom Engineering';
  } else if (p.path === '/services/website-redesign') {
    targetPrimary = 'website redesign services / enterprise site migration';
    intent = 'Commercial / Transactional';
    cluster = 'Design & Modernization';
  } else if (p.path === '/services/website-performance-optimization') {
    targetPrimary = 'core web vitals optimization / nextjs speed consulting';
    intent = 'Commercial / Problem Resolution';
    cluster = 'Performance Engineering';
  } else if (p.path === '/services/wordpress-development') {
    targetPrimary = 'enterprise wordpress development / custom block architecture';
    intent = 'Commercial / Transactional';
    cluster = 'CMS Engineering';
  } else if (p.path === '/services/shopify-development') {
    targetPrimary = 'headless shopify development / bespoke ecommerce engineering';
    intent = 'Commercial / Transactional';
    cluster = 'Ecommerce Engineering';
  } else if (p.path === '/services/ai-automation') {
    targetPrimary = 'enterprise ai automation / n8n workflow engineering';
    intent = 'Commercial / Transactional';
    cluster = 'AI & Intelligent Systems';
  } else if (p.path === '/services/ai-search-optimization') {
    targetPrimary = 'ai search optimization / aeo and geo consulting';
    intent = 'Commercial / Transactional';
    cluster = 'Search Architecture';
  } else if (p.path === '/services/wordpress-malware-removal') {
    targetPrimary = 'wordpress malware removal / hacked site recovery service';
    intent = 'Transactional / Urgent Remediation';
    cluster = 'Security Hub';
  } else if (p.path === '/services/malicious-redirect-removal') {
    targetPrimary = 'wordpress malicious redirect removal / hacked redirect cleanup';
    intent = 'Transactional / Urgent Remediation';
    cluster = 'Security Specific';
  } else if (p.path === '/services/wordpress-backdoor-removal') {
    targetPrimary = 'wordpress backdoor removal / php webshell cleanup';
    intent = 'Transactional / Urgent Remediation';
    cluster = 'Security Specific';
  } else if (p.path === '/services/seo-spam-removal') {
    targetPrimary = 'wordpress seo spam removal / japanese keyword hack cleanup';
    intent = 'Transactional / Urgent Remediation';
    cluster = 'Security Specific';
  } else if (p.path === '/services/website-security-hardening') {
    targetPrimary = 'wordpress security hardening / website attack surface reduction';
    intent = 'Commercial / Preventative';
    cluster = 'Security Specific';
  } else if (p.path === '/services/wordpress-security-audit') {
    targetPrimary = 'wordpress security audit / code and vulnerability assessment';
    intent = 'Commercial / Investigative';
    cluster = 'Security Specific';
  } else if (p.path === '/case-studies') {
    targetPrimary = 'web engineering case studies / architectural portfolio';
    intent = 'Commercial Evidence / Navigation';
    cluster = 'Proof & Evidence';
  } else if (p.path === '/case-studies/acme-headless-ecommerce') {
    targetPrimary = 'headless ecommerce architecture concept / shopify storefront case study';
    intent = 'Informational / Commercial Proof';
    cluster = 'Proof & Evidence';
  } else if (p.path === '/case-studies/fintech-roi-calculator') {
    targetPrimary = 'client-side financial calculator architecture / reactive web application concept';
    intent = 'Informational / Commercial Proof';
    cluster = 'Proof & Evidence';
  } else if (p.path === '/blog') {
    targetPrimary = 'web engineering insights / software architecture blog';
    intent = 'Informational Navigation';
    cluster = 'Knowledge Hub';
  } else if (p.path === '/contact') {
    targetPrimary = 'hire digital engineering studio / contact kawaki studios';
    intent = 'Direct Conversion / Transactional';
    cluster = 'Conversion';
  } else if (p.path.startsWith('/blog/')) {
    intent = 'Informational / Educational Deep Dive';
    cluster = 'Technical Authority';
    if (p.path.includes('editorial-engineering')) {
      targetPrimary = 'what is editorial engineering / modern web craft guide';
    } else if (p.path.includes('headless-shopify')) {
      targetPrimary = 'headless shopify architecture guide / high velocity commerce';
    } else if (p.path.includes('webflow-vs-custom')) {
      targetPrimary = 'webflow vs custom development / graduating from no-code to code';
    } else if (p.path.includes('performance-architecture')) {
      targetPrimary = 'nextjs performance architecture / core web vitals optimization guide';
    } else if (p.path.includes('server-vs-client')) {
      targetPrimary = 'nextjs server vs client components / app router boundary design';
    } else if (p.path.includes('state-management')) {
      targetPrimary = 'nextjs state management / route handlers vs server actions';
    } else if (p.path.includes('ai-automation-architecture')) {
      targetPrimary = 'ai automation architecture / reliable workflow design and approval loops';
    } else if (p.path.includes('ai-agent-reliability')) {
      targetPrimary = 'ai agent reliability evaluation / guardrails and failure recovery';
    }
  }

  return {
    path: p.path,
    name: p.name,
    targetPrimary,
    intent,
    cluster,
    wordCount: p.wordCount,
    inlinkCount: p.inlinks.length,
    h1: p.h1,
    title: p.title
  };
});

console.log(JSON.stringify(queryAnalysis, null, 2));
