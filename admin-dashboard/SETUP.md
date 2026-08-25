# Local Development Setup

Complete guide for setting up the admin dashboard locally.

## Requirements

- **Node.js** 18.0.0+
- **pnpm** 8.0.0+ (or npm/yarn)
- **Git** 2.0+
- **SQLite** (included with Node.js)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/admin-dashboard.git
cd admin-dashboard
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Using npm:

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` if needed:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=./data.db
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173
```

### 4. Initialize Database

```bash
cd backend
pnpm migrate
cd ..
```

This creates `data.db` in the backend root with the complete schema.

### 5. Generate Initial API Key (Optional)

```bash
cd backend
npm exec -- tsx scripts/create-key.ts --name "Development"
cd ..
```

This outputs an API key you can use for testing. Keep it safe!

### 6. Start Development Servers

**Start both backend and frontend:**

```bash
pnpm dev
```

This runs:
- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:5173

**Or start separately:**

```bash
# Terminal 1 — Backend
cd backend && pnpm dev

# Terminal 2 — Frontend
cd frontend && pnpm dev
```

## First Steps

1. Visit http://localhost:5173
2. Paste your API key into the login form
3. Click Login
4. You should see the dashboard

## Database Inspection

View and edit the SQLite database:

```bash
# Open with SQLite CLI
sqlite3 data.db

# Or use a GUI tool
# - DB Browser for SQLite (https://sqlitebrowser.org)
# - DBeaver (https://dbeaver.io)
```

Common queries:

```sql
-- List all blogs
SELECT id, title, slug, status FROM blogs;

-- Count API keys
SELECT COUNT(*) FROM api_keys;

-- Recent analytics events
SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT 10;
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
pnpm test

# Watch mode
pnpm test --watch

# Coverage report
pnpm test:coverage
```

### Frontend Tests

```bash
cd frontend

# Run all tests
pnpm test

# Watch mode
pnpm test --watch
```

### End-to-End Testing

```bash
# Run with Playwright (once set up in Phase 4+)
pnpm test:e2e
```

## Building for Production

```bash
# Build both backend and frontend
pnpm build

# Or individually
cd backend && pnpm build
cd frontend && pnpm build
```

Outputs:
- Backend: `backend/dist/`
- Frontend: `frontend/dist/`

## Common Issues

### `pnpm: command not found`

Install pnpm:

```bash
npm install -g pnpm
```

### Database locked error

The database is locked if two processes try to access it simultaneously. Kill any running processes and restart:

```bash
# Kill any node processes
pkill -f "node"

# Restart
pnpm dev
```

### API key not working

Make sure you:
1. Generated the key with the correct prefix (`sk_`)
2. Stored it in localStorage (the UI does this automatically)
3. The key exists in the database: `sqlite3 data.db "SELECT * FROM api_keys;"`

### Port already in use

If port 3000 or 5173 is in use, set a different port:

```bash
PORT=3001 pnpm run -C backend dev
VITE_PORT=5174 pnpm run -C frontend dev
```

## Debugging

### Enable verbose logging

```bash
LOG_LEVEL=debug pnpm run -C backend dev
```

### View API requests

Check browser DevTools Network tab (frontend) or check console logs (backend).

### Database schema

Run a migration without changes to verify the schema:

```bash
cd backend && pnpm migrate
```

Check migrations in `src/db/migrations/`.

## Next Steps

- Read [README.md](./README.md) for feature overview
- Check [docs/API.md](./docs/API.md) for API endpoints
- Explore the implementation plan in [docs/IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md)
- Start implementing Phase 2 (Blog CRUD)

---

For help, see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) or open a GitHub issue.
