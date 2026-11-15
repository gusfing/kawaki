const http = require('http');
const fs = require('fs');
const path = require('path');

function post(action, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: '/' + action,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
      timeout: 30000
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve({ raw: b }); }
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

async function run() {
  const tabId = 573210206;
  console.log('1. Navigating to new project form...');
  await post('navigate', { tabId, url: 'https://contra.com/w/kunal_sharma_3knl9lca/portfolio/new', wait: true });
  await sleep(3500);

  // Check if draft exists, click Discard if present
  await post('click', { tabId, selector: 'Discard' });
  await sleep(1000);

  // Fill Title
  console.log('2. Filling title in textarea[placeholder="Title"]...');
  await post('fill', {
    tabId,
    selector: 'textarea[placeholder="Title"]',
    text: 'Enterprise AI Automation & Multi-Agent CRM Engine'
  });
  await sleep(800);

  // Fill Body
  console.log('3. Injecting body text...');
  await post('contra_eval', {
    tabId,
    cmd: 'fill_contra_project_advanced',
    payload: {
      bodyText: 'Architected and deployed an end-to-end multi-agent AI pipeline for enterprise sales teams. Integrates automated intent extraction, real-time CRM updates, deterministic validation rules, and automated outreach triggers. Cut response latency by 85% and increased booked qualification calls by 3.2x.'
    }
  });
  await sleep(1000);

  // Upload Cover Image
  const imgPath = path.resolve('public/assets/lab-1.png');
  console.log('4. Uploading cover image:', imgPath);
  const buf = fs.readFileSync(imgPath);
  const upRes = await post('upload_file', {
    tabId,
    selector: 'input[type="file"]',
    base64Data: buf.toString('base64'),
    fileName: 'lab-1.png',
    mimeType: 'image/png'
  });
  console.log('Upload result:', upRes.data);
  await sleep(2500);

  // Fill Description
  console.log('5. Filling short description...');
  await post('fill', {
    tabId,
    selector: 'textarea[placeholder*="describe the project" i]',
    text: 'Autonomous multi-agent system automating lead qualification, meeting briefs, and CRM sync.'
  });
  await sleep(800);

  // Add Skill
  console.log('6. Adding skill...');
  await post('contra_eval', { tabId, cmd: 'click_skill_toggle_btn', payload: {} });
  await sleep(1000);
  await post('click', { tabId, selector: 'Web Developer' });
  await sleep(1000);

  // Completed work link
  console.log('7. Filling link...');
  await post('fill', {
    tabId,
    selector: 'input[placeholder="https://"]',
    text: 'https://kawaki.co.in/case-studies/enterprise-ai-automation'
  });
  await sleep(800);

  // Publish
  console.log('8. Clicking Publish work...');
  const pubRes = await post('click', { tabId, selector: 'Publish work' });
  console.log('Publish result:', pubRes.data);
  await sleep(4000);

  await post('screenshot', { tabId, savePath: 'p2_published.png' });
}

run().catch(console.error);

