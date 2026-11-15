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

async function publishProject(tabId, project) {
  console.log(`\n========================================`);
  console.log(`Publishing: ${project.title}`);
  console.log(`========================================`);

  // 1. Navigate to new project
  console.log('1. Navigating to new project form...');
  await post('navigate', { tabId, url: 'https://contra.com/w/kunal_sharma_3knl9lca/portfolio/new', wait: true });
  await sleep(3500);

  // 2. Check for Discard/Recover dialog
  const discardRes = await post('click', { tabId, selector: 'Discard' });
  if (discardRes.success && discardRes.data && discardRes.data.success) {
    console.log('Discarded previous draft.');
    await sleep(1500);
  }

  // 3. Fill Title
  console.log('2. Filling title in textarea[placeholder="Title"]...');
  await post('fill', {
    tabId,
    selector: 'textarea[placeholder="Title"]',
    text: project.title
  });
  await sleep(800);

  // 4. Fill Body
  console.log('3. Injecting body text...');
  await post('contra_eval', {
    tabId,
    cmd: 'fill_contra_project_advanced',
    payload: {
      bodyText: project.body
    }
  });
  await sleep(1000);

  // 5. Upload Cover Image
  if (project.imagePath && fs.existsSync(project.imagePath)) {
    console.log('4. Uploading cover image:', project.imagePath);
    const buf = fs.readFileSync(project.imagePath);
    const base64Data = buf.toString('base64');
    const fileName = path.basename(project.imagePath);
    const ext = path.extname(project.imagePath).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : (ext === '.webp' ? 'image/webp' : 'image/jpeg');

    const upRes = await post('upload_file', {
      tabId,
      selector: 'input[type="file"]',
      base64Data,
      fileName,
      mimeType
    });
    console.log('Upload result:', upRes.data);
    await sleep(2500);
  }

  // 6. Fill Short Description
  console.log('5. Filling short description...');
  await post('fill', {
    tabId,
    selector: 'textarea[placeholder*="description" i]',
    text: project.description
  });
  await sleep(800);

  // 7. Add Skill
  console.log('6. Adding skill...');
  await post('contra_eval', { tabId, cmd: 'click_skill_toggle_btn', payload: {} });
  await sleep(1000);
  await post('click', { tabId, selector: project.skill || 'Web Developer' });
  await sleep(1000);

  // 8. Add Completed Work Link
  if (project.link) {
    console.log('7. Filling completed work link...');
    await post('fill', {
      tabId,
      selector: 'input[placeholder*="https://" i]',
      text: project.link
    });
    await sleep(800);
  }

  // 9. Click Publish Work
  console.log('8. Clicking Publish work...');
  const pubRes = await post('click', { tabId, selector: 'Publish work' });
  console.log('Publish clicked:', pubRes.data);
  await sleep(4000);

  // Close modal if open
  await post('click', { tabId, selector: 'button[aria-label="Close"]' });
  await sleep(1000);

  // 10. Check publication
  const snapPath = `published_${Date.now()}.png`;
  await post('screenshot', { tabId, savePath: snapPath });
  console.log(`Verified with screenshot: ${snapPath}`);

  return true;
}

const PROJECTS_TO_PUBLISH = [
  {
    title: 'Enterprise AI Automation & Multi-Agent CRM Engine',
    description: 'Autonomous multi-agent system automating lead qualification, briefs, and CRM sync.',
    body: 'Architected and deployed an end-to-end multi-agent AI pipeline for enterprise sales teams. Integrates automated intent extraction, real-time CRM updates, deterministic validation rules, and automated outreach triggers. Cut response latency by 85% and increased booked qualification calls by 3.2x.',
    link: 'https://kawaki.co.in/case-studies/enterprise-ai-automation',
    imagePath: path.resolve('public/assets/lab-1.png'),
    skill: 'Web Developer'
  },
  {
    title: 'Kala Design Co: Luxury Architectural Web Showcase',
    description: 'Ultra-refined editorial digital portfolio with WebGL transitions and fluid typography.',
    body: 'Engineered an editorial web flagship for Kala Design Co. Blending tactile typography, high-definition architectural project showcases, WebGL gallery transitions, and sub-second page delivery on Vercel Edge. 99 Core Web Vitals on desktop and mobile.',
    link: 'https://kawaki.co.in/case-studies/kala-design-co',
    imagePath: path.resolve('public/assets/lab-2.png'),
    skill: 'Web Developer'
  },
  {
    title: 'NextSchool: Enterprise Digital Campus Cloud OS',
    description: 'Multi-tenant cloud platform powering student grading, attendance, and fee workflows.',
    body: 'Designed and built NextSchool Digital Campus OS, a high-concurrency cloud platform serving 15,000+ daily active parents, educators, and administrators. Built with Next.js, Node microservices, PostgreSQL, and automated fee processing.',
    link: 'https://kawaki.co.in/case-studies/nextschool-digital-campus-erp',
    imagePath: path.resolve('public/assets/lab-3.png'),
    skill: 'Web Developer'
  }
];

async function main() {
  const tabId = 573210206;
  for (const proj of PROJECTS_TO_PUBLISH) {
    try {
      await publishProject(tabId, proj);
      await sleep(2000);
    } catch (e) {
      console.error(`Error publishing ${proj.title}:`, e.message);
    }
  }

  console.log('\nAll 3 projects published! Checking updated profile score...');
  await post('navigate', { tabId, url: 'https://contra.com/w/kunal_sharma_3knl9lca/discovery?education=ProfileCompletion', wait: true });
  await sleep(4000);
  const snap = await post('screenshot', { tabId, savePath: 'final_contra_score.png' });
  console.log('Final Score Screenshot:', snap);
}

main().catch(console.error);
