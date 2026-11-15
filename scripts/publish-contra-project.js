/**
 * Automated Contra Portfolio Project Publisher
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

function bridgeRequest(action, payload = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: `/${action}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
      timeout: 25000
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function createProject(tabId, project) {
  console.log(`\n==============================================`);
  console.log(`Publishing: ${project.title}`);
  console.log(`==============================================`);

  // 1. Navigate to new project URL
  console.log('Navigating to /portfolio/new...');
  await bridgeRequest('navigate', {
    tabId,
    url: 'https://contra.com/w/kunal_sharma_3knl9lca/portfolio/new?r=kunal_sharma_3knl9lca'
  });
  await sleep(4000);

  // 2. Fill Title
  console.log('Filling Title...');
  await bridgeRequest('fill', {
    tabId,
    selector: 'textarea[placeholder="Title"]',
    text: project.title
  });
  await sleep(1000);

  // 3. Fill Summary
  console.log('Filling Summary...');
  await bridgeRequest('fill', {
    tabId,
    selector: 'textarea[placeholder="Briefly describe the project and your contribution."]',
    text: project.summary
  });
  await sleep(1000);

  // 4. Fill Completed Work Link
  console.log('Filling Link:', project.link);
  await bridgeRequest('fill', {
    tabId,
    selector: 'input[placeholder="https://"]',
    text: project.link
  });
  await sleep(1000);

  // 5. Upload Cover Image (if provided and small)
  if (project.imagePath && fs.existsSync(project.imagePath)) {
    console.log('Uploading Cover Image:', project.imagePath);
    const base64Data = fs.readFileSync(project.imagePath).toString('base64');
    const ext = path.extname(project.imagePath).replace('.', '').toLowerCase();
    const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    
    const uploadRes = await bridgeRequest('upload_file', {
      tabId,
      selector: 'input[type="file"]',
      base64Data,
      fileName: path.basename(project.imagePath),
      mimeType
    });
    console.log('Upload result:', uploadRes);
    await sleep(2500);
  }

  // 6. Click "Publish work"
  console.log('Clicking "Publish work"...');
  const pubRes = await bridgeRequest('click', {
    tabId,
    selector: 'Publish work'
  });
  console.log('Publish result:', pubRes);
  await sleep(4000);

  const currentContent = await bridgeRequest('get_content', { tabId });
  console.log('Current URL after publish:', currentContent.data ? currentContent.data.url : 'Unknown');
}

async function run() {
  const tabId = 573207320;

  const project1 = {
    title: 'Headless E-Commerce Architecture (Next.js & Shopify Plus)',
    summary: 'Engineered a decoupled headless e-commerce flagship using Next.js App Router and Shopify Storefront GraphQL API. Achieved 98+ Core Web Vitals, sub-second page transitions, and scaled infrastructure for high concurrency.',
    link: 'https://kawaki.co.in/case-studies/acme-headless-ecommerce',
    imagePath: path.resolve('public/assets/images/about_hero_bg.webp')
  };

  await createProject(tabId, project1);
}

run().catch(console.error);

