const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..', '..');
const contentDir = path.resolve(rootDir, 'content');
const publicDir = path.resolve(rootDir, 'public');
const blogHtmlDir = path.resolve(publicDir, 'blog');
const dataDir = path.resolve(rootDir, 'data');
const queueFile = path.resolve(dataDir, 'content-queue.json');
const historyFile = path.resolve(dataDir, 'blog-automation-history.json');
const factsFile = path.resolve(dataDir, 'kawaki-facts.json');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

// Database candidates
const dbCandidates = [
  path.resolve(rootDir, 'data.db'),
  path.resolve(rootDir, 'admin-dashboard', 'backend', 'data.db'),
  path.resolve(rootDir, 'admin-dashboard', 'data.db')
];

// Ensure content and data dirs exist
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(blogHtmlDir)) fs.mkdirSync(blogHtmlDir, { recursive: true });

// Editorial Requirements
const EDITORIAL_STANDARDS = {
  minWordCount: 1500,
  targetAuthor: 'Kunal Sharma',
  studioName: 'Kawaki Studios',
  headquarters: 'New Delhi, India',
  requiredSections: ['FAQ', 'Conclusion'],
  moneyPagePrefix: '/services/'
};

module.exports = {
  rootDir,
  contentDir,
  publicDir,
  blogHtmlDir,
  dataDir,
  queueFile,
  historyFile,
  factsFile,
  sitemapFile,
  dbCandidates,
  EDITORIAL_STANDARDS
};

