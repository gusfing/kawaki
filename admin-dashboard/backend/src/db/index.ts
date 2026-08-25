import { DatabaseSync } from 'node:sqlite';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDbPath = path.resolve(__dirname, '../../data.db');
const dbPath = process.env.DATABASE_URL ? path.resolve(process.cwd(), process.env.DATABASE_URL) : defaultDbPath;

const sqlite: any = new DatabaseSync(dbPath);
sqlite.pragma = function (pragmaStr: string) {
  try {
    return this.exec('PRAGMA ' + pragmaStr);
  } catch (e) {
    return null;
  }
};
const origPrepare = sqlite.prepare.bind(sqlite);
sqlite.prepare = function (sql: string) {
  const stmt = origPrepare(sql);
  let isRaw = false;
  const origGet = stmt.get.bind(stmt);
  const origAll = stmt.all.bind(stmt);

  stmt.raw = function (raw?: boolean) {
    isRaw = raw !== false;
    return stmt;
  };
  stmt.columns = function () {
    return [];
  };
  stmt.bind = function (...args: any[]) {
    return stmt;
  };
  stmt.get = function (...args: any[]) {
    const res = origGet(...args);
    if (!res) return undefined;
    return isRaw ? Object.values(res) : res;
  };
  stmt.all = function (...args: any[]) {
    const rows = origAll(...args);
    if (!rows) return [];
    return isRaw ? rows.map((r: any) => Object.values(r)) : rows;
  };
  return stmt;
};

export const db = drizzle(sqlite, { schema });

export async function initializeDatabase() {
  try {
    sqlite.exec(
      `CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        status TEXT DEFAULT 'draft',
        author TEXT NOT NULL,
        featured_image TEXT,
        tags TEXT,
        seo_keywords TEXT,
        seo_description TEXT,
        views INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`
    );

    sqlite.exec(
      `CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        seo_title TEXT,
        seo_description TEXT,
        seo_keywords TEXT,
        published INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`
    );

    sqlite.exec(
      `CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        permissions TEXT NOT NULL,
        last_used INTEGER,
        active INTEGER DEFAULT 1,
        created_at INTEGER NOT NULL
      )`
    );

    sqlite.exec(
      `CREATE TABLE IF NOT EXISTS analytics_events (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        page TEXT,
        user_id TEXT,
        metadata TEXT,
        created_at INTEGER NOT NULL
      )`
    );

    sqlite.exec(
      `CREATE TABLE IF NOT EXISTS site_metadata (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )`
    );

    // Create indexes
    sqlite.exec(`CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status)`);
    sqlite.exec(`CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug)`);
    sqlite.exec(`CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug)`);
    sqlite.exec(`CREATE INDEX IF NOT EXISTS api_keys_key_idx ON api_keys(key)`);
    sqlite.exec(`CREATE INDEX IF NOT EXISTS events_page_idx ON analytics_events(page)`);
    sqlite.exec(`CREATE INDEX IF NOT EXISTS events_type_idx ON analytics_events(type)`);

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    throw error;
  }
}

export function closeDatabase() {
  sqlite.close();
}
