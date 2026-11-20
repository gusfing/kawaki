/* Exports the studio's real case studies and published blog posts for the Kawaki Directory Filler extension.
   node scripts/export-directory-content.js   ->   tools/directory-filler/content.json
   Nothing is written by hand: projects come from data/case-studies.json and articles from the blog database and
   content/*.md, so what you paste into another site is exactly what is on kawaki.co.in. Re-run after publishing a post. */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://kawaki.co.in';
const abs = u => (!u ? '' : /^https?:/.test(u) ? u : SITE + (u.startsWith('/') ? u : '/' + u));

const cs = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'case-studies.json'), 'utf8'));
const csList = Array.isArray(cs) ? cs : (cs.caseStudies || cs.studies || Object.values(cs));

const projects = csList.map(c => {
  const built = Array.isArray(c.built) ? c.built : [];
  const description = [
    c.lede,
    c.client ? '\n' + c.client : '',
    c.brief ? '\nThe brief: ' + c.brief : '',
    built.length ? '\nWhat we built:\n' + built.map(b => '- ' + b).join('\n') : '',
    c.stack ? '\nBuilt with: ' + c.stack : ''
  ].join('\n').replace(/\n{3,}/g, '\n\n').trim();
  const images = [c.frame && c.frame.src].concat((c.gallery || []).map(g => g.src)).filter(Boolean).map(abs);
  // Own products and concept builds are labelled so they are never presented as client work.
  const kind = /^(Product|Concept|In private testing)$/i.test(c.status || '') ? 'own' : 'client';
  return {
    id: c.slug, kind, name: c.name, category: c.category || '', year: String(c.year || ''), status: c.status || 'Live',
    liveUrl: c.live || '', pageUrl: `${SITE}/case-studies/${c.slug}`, summary: c.lede || '', metaDescription: c.metaDescription || '',
    description, built, stack: c.stack || '', tags: [c.category].concat(String(c.stack || '').split(',').map(s => s.trim())).filter(Boolean),
    images: Array.from(new Set(images)).slice(0, 8)
  };
});

let articles = [];
try {
  const blog = require(path.join(__dirname, 'build-blog.js'));
  const posts = blog.getPublishedArticles();
  articles = posts.map(a => {
    const md = String(a.content || '');
    const html = blog.renderMarkdown(md, a.title);
    const plain = md.replace(/```[\s\S]*?```/g, m => m.replace(/```\w*\n?/g, '')).replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\(([^)]*)\)/g, '$1').replace(/^#{1,6}\s+/gm, '').replace(/[*_`>]/g, '').replace(/\n{3,}/g, '\n\n').trim();
    return {
      id: a.slug, title: a.title, url: `${SITE}/blog/${a.slug}`, excerpt: a.excerpt || a.seoDescription || '',
      seoDescription: a.seoDescription || a.excerpt || '', tags: Array.isArray(a.tags) ? a.tags : [], date: String(a.createdAt || a.created_at || '').slice(0, 10),
      cover: abs(a.featuredImage), words: plain.split(/\s+/).length, markdown: md, html, plain
    };
  });
} catch (e) {
  console.warn('Could not read blog posts:', e.message);
}

const out = { generated: new Date().toISOString().slice(0, 10), site: SITE, projects, articles };
fs.writeFileSync(path.join(ROOT, 'tools', 'directory-filler', 'content.json'), JSON.stringify(out));
console.log(`content.json: ${projects.length} projects (${projects.filter(p => p.kind === 'own').length} are the studio's own products or concepts), ${articles.length} articles, ${(JSON.stringify(out).length / 1024).toFixed(0)} KB`);
