# Kawaki Admin Dashboard

An AI agent-first admin dashboard for content management. Built with **Hono** (backend), **React 19** (frontend), **SQLite** (database), and **TypeScript**.

## Features

- ✅ **Blog Management** — Create, edit, publish markdown blogs
- ✅ **Page Builder** — Manage static pages and content
- ✅ **Analytics** — Track page views and user events
- ✅ **SEO Tools** — Meta tags, keywords, sitemaps, and analysis
- ✅ **API-First** — RESTful API designed for human UIs and AI agents
- ✅ **MCP Integration** — Claude agents can use this dashboard as a tool
- ✅ **Open Source** — MIT licensed, easy to fork and extend

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/admin-dashboard.git
cd admin-dashboard

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Initialize database
cd backend && pnpm migrate && cd ..

# Start development servers
pnpm dev
```

- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:5173

### First Login

1. Generate an API key via the backend CLI (see [Backend Setup](./backend/README.md))
2. Copy the key and paste it into the login form at `http://localhost:5173`
3. You're in!

## Architecture

```
admin-dashboard/
├── backend/         # Hono API server
│   └── src/
│       ├── db/      # Drizzle ORM + SQLite schema
│       ├── api/     # REST endpoints (blog, pages, analytics, seo)
│       └── mcp/     # MCP server for Claude integration
├── frontend/        # React 19 dashboard
│   └── src/
│       ├── components/
│       ├── hooks/
│       └── lib/
└── docs/           # Documentation
```

## Documentation

- [API Reference](./docs/API.md) — REST endpoints for agents and UIs
- [MCP Integration](./docs/MCP-INTEGRATION.md) — How to use with Claude
- [Deployment Guide](./docs/DEPLOYMENT.md) — Production setup options
- [Contributing](./docs/CONTRIBUTING.md) — How to contribute

## Development Phases

- **Phase 1 ✅** — Foundation (database, core API)
- **Phase 2** — Blog & page CRUD (next)
- **Phase 3** — Authentication & API keys
- **Phase 4** — Frontend UI
- **Phase 5** — Analytics & SEO
- **Phase 6** — MCP integration
- **Phase 7** — Settings & admin
- **Phase 8** — Documentation & release

See [IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md) for details.

## Tech Stack

**Backend:**
- Hono — Modern, lightweight web framework
- Drizzle ORM — Type-safe SQL queries
- SQLite — Embedded database
- Zod — Schema validation

**Frontend:**
- React 19 — Latest React with improvements
- TypeScript — Type safety
- Tailwind CSS — Styling
- Vite — Fast bundler

## API Examples

### Create a Blog (as an AI agent)

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_..." \
  -d '{
    "title": "My First Post",
    "content": "# Hello World\n\nThis is markdown.",
    "excerpt": "A test post",
    "author": "Claude Agent",
    "tags": ["ai", "automation"],
    "status": "draft"
  }'
```

### List Blogs

```bash
curl http://localhost:3000/api/blogs?status=published \
  -H "Authorization: Bearer sk_..."
```

## License

MIT — See [LICENSE](./LICENSE) for details

## Support

- GitHub Issues — Report bugs and request features
- Discussions — Share ideas and get help
- Contributing — See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

---

Built with ❤️ for the open-source community.
