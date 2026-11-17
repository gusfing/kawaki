const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { FALLBACK_BLOGS: blogs } = require('../lib/db-api-handler');
const caseStudies = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'case-studies.json'), 'utf8'));

const queue = [];

// Base start date: Tomorrow morning at 10:30 AM IST (Monday to Friday)
let curDate = new Date();
curDate.setDate(curDate.getDate() + 1);
curDate.setHours(10, 30, 0, 0);

function nextBusinessDate() {
  while (curDate.getDay() === 0 || curDate.getDay() === 6) {
    curDate.setDate(curDate.getDate() + 1);
  }
  const iso = curDate.toISOString();
  curDate.setDate(curDate.getDate() + 1);
  return iso;
}

// 1. Process 20 Blogs
for (const b of blogs) {
  let imgRel = b.featuredImage || `/assets/images/blog/${b.slug}-cover.jpg`;
  if (!imgRel.startsWith('/')) imgRel = '/' + imgRel;
  const absImg = path.join(ROOT, 'public', imgRel);

  // Fallback to WebP or jpg if exists
  let validImg = fs.existsSync(absImg) ? absImg : '';
  if (!validImg) {
    const webpCandidate = absImg.replace(/\.jpg$/, '.webp');
    if (fs.existsSync(webpCandidate)) validImg = webpCandidate;
  }

  const postText = `${b.title}

${b.excerpt}

Read the full engineering guide on Kawaki Studios:
https://kawaki.co.in/blog/${b.slug}

#WebDevelopment #Engineering #SoftwareArchitecture #${(b.tags && b.tags[0] ? b.tags[0].replace(/\s+/g, '') : 'Nextjs')}`;

  queue.push({
    id: `blog_${b.slug}`,
    type: 'blog_article',
    title: b.title,
    slug: b.slug,
    url: `https://kawaki.co.in/blog/${b.slug}`,
    imagePath: validImg,
    text: postText,
    scheduledSlot: nextBusinessDate(),
    status: 'ready'
  });
}

// 2. Process 12 Case Studies
for (const c of caseStudies) {
  let frameSrc = c.frame && c.frame.src ? c.frame.src : `/assets/images/home/${c.slug}-live.webp`;
  if (!frameSrc.startsWith('/')) frameSrc = '/' + frameSrc;
  let absImg = path.join(ROOT, 'public', frameSrc);
  if (!fs.existsSync(absImg) && c.gallery && c.gallery[0] && c.gallery[0].src) {
    absImg = path.join(ROOT, 'public', c.gallery[0].src.startsWith('/') ? c.gallery[0].src.slice(1) : c.gallery[0].src);
  }

  const postText = `Case Study: ${c.name} (${c.category})

${c.lede || c.metaDescription || c.client}

Key Deliverables:
${(c.built || []).map(b => `• ${b}`).slice(0, 4).join('\n')}

Explore the complete architecture and project breakdown:
https://kawaki.co.in/case-studies/${c.slug}

#CaseStudy #WebDesign #CustomDevelopment #KawakiStudios #${(c.category || 'Digital').replace(/[^a-zA-Z]/g, '')}`;

  queue.push({
    id: `case_${c.slug}`,
    type: 'case_study',
    title: c.name,
    slug: c.slug,
    url: `https://kawaki.co.in/case-studies/${c.slug}`,
    imagePath: fs.existsSync(absImg) ? absImg : '',
    text: postText,
    scheduledSlot: nextBusinessDate(),
    status: 'ready'
  });
}

const outPath = path.join(ROOT, 'data', 'linkedin-posts-queue.json');
fs.writeFileSync(outPath, JSON.stringify(queue, null, 2), 'utf8');
console.log(`Generated ${queue.length} queue items in ${outPath}`);
