# Extended Features Documentation

This document covers all 5 new advanced features added to the Kawaki Admin Dashboard.

## Features Overview

### 1. Post Scheduling ✅
**Location:** Features > Schedule Post

Schedule blog posts to be automatically published at a specific date and time.

**Capabilities:**
- Set publication date and time
- Automatic timezone handling
- See list of upcoming scheduled posts
- View scheduling statistics

**API Endpoints:**
- `POST /api/scheduling/posts` - Schedule a new post
- `GET /api/scheduling/upcoming` - Get upcoming scheduled posts
- `GET /api/scheduling/stats` - Get scheduling statistics

**Files:**
- Backend: `backend/src/api/scheduling/service.ts`, `backend/src/api/scheduling/routes.ts`
- Frontend: `frontend/src/components/Features/SchedulePost.tsx`

**Usage:**
```typescript
<SchedulePost 
  blogId="uuid-here"
  onScheduled={() => console.log('Post scheduled!')}
/>
```

---

### 2. Content Templates ✅
**Location:** Features > Content Templates

Pre-built templates to accelerate content creation. Includes 3 built-in templates:
- **Introduction Style** - Hook-based opening format
- **Tutorial Style** - Step-by-step guide format
- **Listicle** - Top 10 / Best practices format

**Capabilities:**
- Browse built-in templates
- Create custom templates
- Clone existing templates
- Quick template application

**API Endpoints:**
- `GET /api/templates?type=blog|page` - List templates
- `GET /api/templates/built-in` - Get built-in templates
- `GET /api/templates/:id` - Get single template
- `POST /api/templates` - Create custom template
- `POST /api/templates/:id/clone` - Clone template

**Files:**
- Backend: `backend/src/api/templates/service.ts`, `backend/src/api/templates/routes.ts`
- Frontend: `frontend/src/components/Features/TemplateLibrary.tsx`

**Usage:**
```typescript
<TemplateLibrary 
  type="blog"
  onSelectTemplate={(content) => setEditorContent(content)}
/>
```

---

### 3. Draft Recovery ✅
**Location:** Features > Recovered Drafts

Recover deleted drafts for up to 30 days. Automatically removes drafts older than 30 days.

**Capabilities:**
- View all recoverable drafts
- Recover draft content with one click
- Permanently delete drafts
- Automatic cleanup of old drafts
- Draft statistics

**API Endpoints:**
- `POST /api/recovery/save-draft` - Save a draft for recovery
- `GET /api/recovery/drafts?type=blog|page` - List recoverable drafts
- `POST /api/recovery/recover/:id` - Recover a draft
- `DELETE /api/recovery/:id` - Permanently delete draft
- `GET /api/recovery/stats` - Get recovery statistics

**Files:**
- Backend: `backend/src/api/recovery/service.ts`, `backend/src/api/recovery/routes.ts`
- Frontend: `frontend/src/components/Features/DraftRecovery.tsx`

**Usage:**
```typescript
<DraftRecovery 
  contentType="blog"
  onRecover={(content) => setEditorContent(content)}
/>
```

---

### 4. Content Export ✅
**Location:** Features > Export Content

Export blog posts and pages in multiple formats: Markdown (ZIP), JSON, or HTML.

**Capabilities:**
- Export single or multiple items
- Export all content at once
- Three format options:
  - **Markdown (ZIP)** - All files packaged for bulk download
  - **JSON** - Structured data with metadata
  - **HTML** - Rendered pages ready for archival
- Automatic file naming with date stamps

**API Endpoints:**
- `POST /api/export/content` - Export content in specified format

**Files:**
- Backend: `backend/src/api/export/service.ts`, `backend/src/api/export/routes.ts`
- Frontend: `frontend/src/components/Features/ExportContent.tsx`

**Usage:**
```typescript
<ExportContent 
  contentType="blog"
  ids={["id1", "id2"]}
  // or
  exportAll={true}
/>
```

---

### 5. Bulk Operations ✅
**Location:** Blog/Page Lists > Bulk Actions (bottom-right corner)

Perform operations on multiple items simultaneously: delete, change status, or update author.

**Capabilities:**
- Multi-select items via checkbox
- **Delete Multiple** - Remove selected items at once
- **Change Status** - Set draft/published/archived for bulk items
- **Change Author** - Update author for multiple items
- Operation history and statistics
- Per-item success/failure tracking

**API Endpoints:**
- `POST /api/bulk/execute` - Execute bulk operation
- `GET /api/bulk/operation/:id` - Get operation details
- `GET /api/bulk/operations` - List past operations
- `GET /api/bulk/stats` - Get bulk operation statistics

**Files:**
- Backend: `backend/src/api/bulk/service.ts`, `backend/src/api/bulk/routes.ts`
- Frontend: `frontend/src/components/Features/BulkActions.tsx`

**Usage:**
```typescript
<BulkActions 
  selectedIds={["id1", "id2", "id3"]}
  contentType="blog"
  onAction={() => refetchList()}
/>
```

---

## Integration with Existing Components

### Scheduling Integration
- Accessible from individual blog editor via `<SchedulePost>` component
- Scheduled posts automatically change status to "published" at scheduled time
- Statistics visible on Features dashboard

### Template Integration
- Quick access from blog/page editor
- One-click template application fills editor content
- Custom templates saved to database for reuse

### Draft Recovery Integration
- Appears as warning banner when drafts are available
- Auto-save feature (30-second intervals) creates recoverable snapshots
- Integration with `useAutosave` hook

### Export Integration
- Available on Features dashboard
- Supports filtered exports by ID
- Or bulk export entire collection

### Bulk Operations Integration
- Floating action panel appears when items are selected
- Checkbox selection in blog/page lists
- Real-time operation tracking

---

## Data Models

### Scheduling
```typescript
interface ScheduledPost {
  id: string;
  blogId: string;
  scheduledFor: Date;
  status: 'pending' | 'published' | 'failed';
  createdAt: Date;
}
```

### Templates
```typescript
interface Template {
  id: string;
  name: string;
  type: 'blog' | 'page';
  content: string;
  description?: string;
  isBuiltIn: boolean;
  createdAt: Date;
}
```

### Draft Recovery
```typescript
interface Draft {
  id: string;
  contentId: string;
  contentType: 'blog' | 'page';
  content: string;
  metadata?: Record<string, unknown>;
  deletedAt: Date;
  expiresAt: Date; // 30 days from deletedAt
}
```

### Bulk Operations
```typescript
interface BulkOperation {
  id: string;
  type: 'delete' | 'update_status' | 'update_author';
  targetIds: string[];
  status: 'pending' | 'completed' | 'failed';
  results: Record<string, { success: boolean; message?: string }>;
  createdAt: Date;
}
```

---

## Testing Scenarios

### Scenario 1: Schedule and Auto-Publish
1. Create a blog post in draft status
2. Use Schedule Post to schedule for 1 minute from now
3. Wait for automatic publication
4. Verify post status changed to published

### Scenario 2: Template Workflow
1. Create new blog from "Tutorial" template
2. Verify content pre-filled with template structure
3. Edit and save
4. Create another post, clone saved post as template

### Scenario 3: Draft Recovery
1. Edit a blog post, make changes
2. Auto-save fires (every 30 seconds)
3. Accidentally delete blog
4. Go to Features > Draft Recovery
5. Click restore on most recent draft
6. Verify content recovered

### Scenario 4: Bulk Export
1. Select multiple blogs
2. Go to Features > Export Content
3. Choose JSON format
4. Download file containing all selected posts

### Scenario 5: Bulk Status Update
1. Go to blog list
2. Select 3 blogs with checkboxes
3. Click "Bulk Actions" button
4. Choose "Change Status" → "Published"
5. Verify all 3 blogs now show as published

---

## Performance Notes

- **Scheduling:** Automatic publication checks run on a timer interval
- **Templates:** Built-in templates loaded from memory; custom templates cached after first fetch
- **Draft Recovery:** Automatic cleanup runs daily; drafts older than 30 days are purged
- **Export:** Large exports (100+ items) may take a few seconds
- **Bulk Operations:** Operations are sequential to avoid database locks

---

## Security Considerations

- All features require API authentication
- Bulk operations include per-item result tracking for audit purposes
- Draft recovery has automatic expiration (30 days)
- Export includes all data; consider access controls on Features page
- Scheduled posts respect original blog permissions

---

## Future Enhancements

Potential additions for future phases:
- [ ] Recurring post schedules
- [ ] Template categories and tagging
- [ ] Draft versioning and history
- [ ] Smart export (filter by date, status, etc.)
- [ ] Scheduled bulk operations
- [ ] Template sharing between users
- [ ] Draft comparison tool
- [ ] Export to external services (Medium, Dev.to, etc.)

---

## API Summary

| Feature | Endpoint | Method | Auth |
|---------|----------|--------|------|
| Schedule Post | `/api/scheduling/posts` | POST | ✅ |
| Get Scheduled | `/api/scheduling/upcoming` | GET | ✅ |
| List Templates | `/api/templates` | GET | ✅ |
| Create Template | `/api/templates` | POST | ✅ |
| Clone Template | `/api/templates/:id/clone` | POST | ✅ |
| Save Draft | `/api/recovery/save-draft` | POST | ✅ |
| Get Drafts | `/api/recovery/drafts` | GET | ✅ |
| Recover Draft | `/api/recovery/recover/:id` | POST | ✅ |
| Export Content | `/api/export/content` | POST | ✅ |
| Bulk Execute | `/api/bulk/execute` | POST | ✅ |
| Bulk Stats | `/api/bulk/stats` | GET | ✅ |

---

## Component Tree

```
App
├── Sidebar
│   └── Features Link
├── Main Content
│   └── FeaturesView
│       ├── SchedulePost (modal-based)
│       ├── TemplateLibrary (grid view)
│       ├── DraftRecovery (alert banner)
│       ├── ExportContent (form view)
│       └── BulkActions (floating panel)
└── BlogList / PageList
    └── BulkActions (when items selected)
```

---

**Last Updated:** 2026-08-24  
**Status:** All 5 features implemented and integrated
