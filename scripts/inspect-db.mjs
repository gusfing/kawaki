import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';

const paths = [
  'admin-dashboard/backend/data.db',
  'admin-dashboard/data.db',
  'data.db'
];

for (const p of paths) {
  if (fs.existsSync(p)) {
    console.log(`\n=== Checking ${p} ===`);
    try {
      const db = new DatabaseSync(p);
      const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
      console.log('Tables:', tables.map(t => t.name));
      if (tables.some(t => t.name === 'blogs')) {
        const blogs = db.prepare("SELECT id, title, slug, status, created_at FROM blogs").all();
        console.log(`Blogs count: ${blogs.length}`);
        console.log(JSON.stringify(blogs, null, 2));
      }
    } catch (e) {
      console.log(`Error reading ${p}:`, e.message);
    }
  }
}
