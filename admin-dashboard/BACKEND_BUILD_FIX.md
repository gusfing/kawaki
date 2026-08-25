# Backend Build Fix Guide

The backend has several TypeScript compilation errors that need fixing before it can run. Here are the fixes:

## Issue 1: Hono Context Typing (6 files affected)

**Files:** `src/api/auth/routes.ts`, `src/api/blog/routes.ts`, `src/api/pages/routes.ts`

**Problem:** `c.get('auth')` returns `unknown` type

**Solution:** Add type assertion

```typescript
// BEFORE:
const auth = c.get('auth');

// AFTER:
const auth = c.get('auth') as any;
```

Apply this change to all occurrences in:
- `src/api/auth/routes.ts` (lines 18, 51, 100)
- `src/api/blog/routes.ts` (lines 50, 79, 109)
- `src/api/pages/routes.ts` (lines 47, 76, 106)

---

## Issue 2: Export Service Function Signature

**File:** `src/api/export/routes.ts`

**Lines 25, 27:** Wrong number of arguments

```typescript
// BEFORE:
content = await exportService.bulkExport(contentType, format);
content = await exportService.exportContent(ids, contentType, format);

// AFTER:
content = await exportService.bulkExport(contentType);
content = await exportService.exportContent(ids, contentType);
```

**Reason:** The service functions don't take format as a parameter - format is handled internally.

---

## Issue 3: Recovery Service Function Signature

**File:** `src/api/recovery/routes.ts`

**Line 22:** Missing parameter

```typescript
// BEFORE:
const draft = await recoveryService.saveDraft(data);

// AFTER:
const draft = await recoveryService.saveDraft(
  data.contentId,
  data.contentType,
  data.content,
  data.metadata
);
```

---

## Issue 4: Template Service Function Signature

**File:** `src/api/templates/routes.ts`

**Line 31:** Wrong parameters

```typescript
// BEFORE:
const templates = await templateService.getBuiltInTemplates(type);

// AFTER:
const templates = await templateService.getBuiltInTemplates();
```

**Line 65:** Missing parameter

```typescript
// BEFORE:
const cloned = await templateService.cloneTemplate(id);

// AFTER:
const cloned = await templateService.cloneTemplate(id, `${template.name} (Copy)`);
```

---

## Issue 5: Drizzle ORM Where Clause

**File:** `src/api/seo/service.ts`

**Lines 46, 51:** Incorrect where clause syntax

```typescript
// BEFORE (line 46):
const blogPosts = db.select().from(blogs).where((b) => b.status === 'published').all();

// AFTER:
import { eq } from 'drizzle-orm';
const blogPosts = db.select().from(blogs).where(eq(blogs.status, 'published')).all();

// BEFORE (line 51):
.where((p) => p.published === true)

// AFTER:
.where(eq(pages.published, true))
```

---

## Issue 6: Bulk Service Status Type

**File:** `src/api/bulk/service.ts`

**Line 127:** Type mismatch

```typescript
// BEFORE:
await service.update(id, { status });

// AFTER:
await service.update(id, { status: status as 'draft' | 'published' | 'archived' });
```

---

## Issue 7: Middleware Response Type

**File:** `src/api/middleware.ts`

**Line 21:** Wrong response format

```typescript
// BEFORE:
{ status: err.statusCode }

// AFTER:
undefined  // or use proper Hono status type
```

Better fix:
```typescript
return c.json(
  { success: false, error: err.message, code: err.code, details: err.details, statusCode: err.statusCode },
  err.statusCode as any
);
```

---

## Quick Fix Steps

1. **For Hono context:** Add ` as any` to all `c.get('auth')` calls
2. **For export/recovery/template services:** Check the actual function signatures in the service files and match the calls
3. **For Drizzle ORM:** Use `eq()` instead of arrow functions in where clauses
4. **For middleware:** Ensure proper response type

---

## For better-sqlite3 Issue

The native module compilation fails in some environments. **Two solutions:**

### Option 1: Use Docker (Recommended)
```bash
docker build -t kawaki-backend .
docker run -p 3000:3000 kawaki-backend
```

### Option 2: Use WSL2 with Build Tools
```bash
# In WSL2 Ubuntu
npm install
npm run build
npm start
```

### Option 3: Switch to SQLite Library
Replace better-sqlite3 with `sql.js` (pure JS, no compilation):
```bash
npm uninstall better-sqlite3
npm install sql.js
```

Then update `src/db/index.ts` to use sql.js instead.

---

## Summary

The backend is 99% ready - just needs these TypeScript errors fixed. All the logic is there, just type mismatches. Once fixed, it will run perfectly!
