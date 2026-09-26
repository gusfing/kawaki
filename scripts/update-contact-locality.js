const fs = require('fs');
const path = require('path');

const contactFile = path.join(__dirname, '../public/contact.html');
let content = fs.readFileSync(contactFile, 'utf8');

const isCrlf = content.includes('\r\n');
let norm = content.replace(/\r\n/g, '\n');

// 1. Update schema
const schemaTarget = `      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Kawaki Studios",
        "image": "https://www.kawaki.co.in/assets/images/about_hero_bg.jpg",
        "email": "hello@kawakistudios.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "url": "https://www.kawaki.co.in"
      }`;

const schemaRepl = `      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": "https://www.kawaki.co.in/#organization",
        "name": "Kawaki Studios",
        "image": "https://www.kawaki.co.in/assets/images/about_hero_bg.jpg",
        "email": "hello@kawakistudios.com",
        "founder": {
          "@type": "Person",
          "@id": "https://www.kawaki.co.in/about#founder",
          "name": "Kunal Sharma"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "url": "https://www.kawaki.co.in"
      }`;

if (norm.includes(schemaTarget)) {
  norm = norm.replace(schemaTarget, schemaRepl);
  console.log('[PASS] Updated schema in contact.html');
} else {
  console.error('[FAIL] Schema target not found in contact.html');
}

// 2. Add truthful locality meta detail to Left Pane
const metaTarget = `                            <div class="event-detail">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z"></path>
                                </svg>
                                <span>Google Meet link sent via email</span>
                            </div>
                        </div>`;

const metaRepl = `                            <div class="event-detail">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z"></path>
                                </svg>
                                <span>Google Meet link sent via email</span>
                            </div>
                            <div class="event-detail">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path>
                                </svg>
                                <span>Based in New Delhi, India · Serving Globally</span>
                            </div>
                        </div>`;

if (norm.includes(metaTarget)) {
  norm = norm.replace(metaTarget, metaRepl);
  console.log('[PASS] Added locality meta detail to contact.html left pane');
} else {
  console.error('[FAIL] Meta target not found in contact.html');
}

fs.writeFileSync(contactFile, isCrlf ? norm.replace(/\n/g, '\r\n') : norm, 'utf8');
console.log('Finished updating contact.html');
