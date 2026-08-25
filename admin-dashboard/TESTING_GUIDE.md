# Extended Features Testing Guide

## Quick Start

After the dependencies are installed and the server is running, follow these test scenarios to verify all new features work correctly.

## Pre-Test Setup

1. Ensure backend server is running on `http://localhost:3000`
2. Ensure frontend is running on `http://localhost:5173`
3. Generate an API key and log into the dashboard
4. Have sample blogs/pages ready or create new ones

---

## Test Scenario 1: Post Scheduling

**Objective:** Verify that posts can be scheduled for automatic publication

**Steps:**

1. Navigate to **Blogs** in the sidebar
2. Create a new blog post or select an existing one
3. In the blog editor, look for **Schedule Post** button/section
4. Click to open the scheduler
5. Select a date 1 day from today
6. Select a time (e.g., 2:00 PM)
7. Click **Schedule** button
8. Verify success message appears
9. Navigate to **Features** > scroll to see scheduled posts section
10. Verify the post appears in "Upcoming Scheduled Posts"

**Expected Results:**
- ✅ Schedule button accepts date/time input
- ✅ Confirmation message displays after scheduling
- ✅ Post appears in upcoming list
- ✅ Post automatically publishes at scheduled time

---

## Test Scenario 2: Content Templates

**Objective:** Test template library and template-based content creation

**Steps:**

1. Navigate to **Features** in the sidebar
2. Look for **Content Templates** section
3. You should see 3 built-in templates:
   - Introduction Style
   - Tutorial Style
   - Listicle
4. Click **Use Template** on "Tutorial Style"
5. The template content should be copied to clipboard/shown as preview
6. Create a new blog post
7. In the blog editor, paste or load the template
8. Edit the template content
9. Save the blog post
10. Create another post and verify you can clone the saved post as a template

**Expected Results:**
- ✅ 3 built-in templates display
- ✅ Template content is accessible
- ✅ Using a template populates editor
- ✅ Custom templates can be created

---

## Test Scenario 3: Draft Recovery

**Objective:** Verify draft recovery system works

**Steps:**

1. Go to **Blog** editor
2. Create a new blog post with some content
3. Make edits and observe auto-save status (should show "Last saved: now" or similar)
4. Don't save the blog - go back to the list without saving
5. Go to **Features** in the sidebar
6. Look for **Recovered Drafts** section
7. You should see the draft you just abandoned
8. Click the **Restore** button (circular arrow icon)
9. The draft content should be recovered
10. Verify the content you typed is still there

**Expected Results:**
- ✅ Auto-save works (fires every 30 seconds)
- ✅ Draft recovery banner appears when drafts exist
- ✅ Can restore abandoned draft
- ✅ Content is fully recovered

---

## Test Scenario 4: Content Export

**Objective:** Test exporting content in multiple formats

**Steps:**

1. Go to **Features** in the sidebar
2. Look for **Export Content** section
3. **Test JSON Export:**
   - Select "JSON" format
   - Click **Export**
   - JSON file downloads with all blog/page metadata
   - File name format: `blog-export-2026-08-24.json`

4. **Test Markdown Export:**
   - Select "Markdown (ZIP)" format
   - Click **Export**
   - ZIP file downloads containing all posts as .md files

5. **Test HTML Export:**
   - Select "HTML" format
   - Click **Export**
   - HTML file downloads with rendered content

6. Open downloaded files and verify content

**Expected Results:**
- ✅ All three formats available
- ✅ Files download with correct naming
- ✅ JSON contains structured data
- ✅ Markdown files are properly formatted
- ✅ HTML is renderable in browser

---

## Test Scenario 5: Bulk Operations

**Objective:** Test bulk delete, status update, and author update

**Steps:**

### 5A: Bulk Delete
1. Go to **Blogs** list
2. Create 3 test blogs if needed
3. Select multiple blogs by checking their checkboxes
4. A **Bulk Actions** button should appear (floating in bottom-right)
5. Click **Bulk Actions**
6. Click **Delete All**
7. Confirm deletion
8. Verify blogs are deleted from list

### 5B: Bulk Status Update
1. Create 3 draft blogs
2. Select all 3 with checkboxes
3. Click **Bulk Actions**
4. Select **Change Status**
5. Select "Published"
6. Click **Apply**
7. Verify all 3 blogs now show as published

### 5C: Bulk Author Update
1. Select multiple blogs
2. Click **Bulk Actions**
3. Select **Change Author**
4. Enter new author name (e.g., "AI Writer")
5. Click **Apply**
6. Verify author changed for all selected posts

**Expected Results:**
- ✅ Multi-select checkboxes appear in list
- ✅ Bulk Actions panel floats in bottom-right
- ✅ Delete operation removes all selected items
- ✅ Status update applies to all selected
- ✅ Author update applies to all selected
- ✅ Operation results show success/failure per item

---

## Test Scenario 6: API Endpoint Verification

**Objective:** Verify all new endpoints are registered and responding

Use Postman, curl, or your API client to test:

```bash
# Scheduling Endpoints
GET  /api/scheduling/upcoming
GET  /api/scheduling/stats
POST /api/scheduling/posts

# Template Endpoints
GET  /api/templates
GET  /api/templates/built-in
GET  /api/templates/:id
POST /api/templates
POST /api/templates/:id/clone

# Recovery Endpoints
POST /api/recovery/save-draft
GET  /api/recovery/drafts
POST /api/recovery/recover/:id
GET  /api/recovery/stats

# Export Endpoints
POST /api/export/content

# Bulk Endpoints
POST /api/bulk/execute
GET  /api/bulk/operations
GET  /api/bulk/stats
```

**Expected Results:**
- ✅ All endpoints return 200/201 responses
- ✅ All endpoints require authentication (Bearer token)
- ✅ Invalid requests return appropriate error codes
- ✅ Response formats match documented schemas

---

## Performance Tests

### Test 1: Bulk Operation on Large Set
- Create/import 100+ blogs
- Select all with checkboxes
- Perform bulk delete
- Operation should complete in < 5 seconds
- Results should show per-item tracking

### Test 2: Export Large Collection
- Export 100+ blogs to JSON
- File should download in < 10 seconds
- File should be < 10MB

### Test 3: Draft Recovery with Old Drafts
- Manually add drafts older than 30 days to database
- Run cleanup (if exposed via API)
- Old drafts should be purged
- Recent drafts should remain

---

## Negative Testing

### Test 1: Invalid Scheduling
- Try to schedule a post for past date
- Should show error: "Date must be in future"

### Test 2: Missing Required Fields
- Try to schedule without selecting date
- Should show validation error

### Test 3: Unauthorized Export
- Try to export without API key
- Should return 401 Unauthorized

### Test 4: Bulk Delete with Empty Selection
- Click bulk actions with no items selected
- Button should be disabled or show message

---

## Integration Tests

### Test 1: Scheduled Post Auto-Publishes
1. Schedule a blog post for 1 minute from now
2. Wait for the scheduled time
3. Manually refresh the blog list
4. Post status should have changed to "published"

### Test 2: Template → Scheduled Post
1. Use a template to create a blog
2. Schedule the created blog
3. Verify scheduled post works with template content

### Test 3: Recovered Draft → Scheduled
1. Recover a draft
2. Schedule the recovered content
3. Verify scheduling works with recovered content

### Test 4: Bulk Update → Export
1. Bulk update 5 blogs to status "published"
2. Export all blogs
3. Verify exported file reflects status changes

---

## Data Verification Checklist

- [ ] Database has scheduling table with correct schema
- [ ] Database has templates table with built-in templates
- [ ] Database has drafts table for recovery
- [ ] Draft expiration is set to 30 days
- [ ] Bulk operations tracking table exists
- [ ] All tables have proper indexes

---

## UI/UX Checks

- [ ] All new components render without errors
- [ ] Components are mobile-responsive
- [ ] Icons display correctly (from lucide-react)
- [ ] Loading states show (spinners, disabled buttons)
- [ ] Error messages are user-friendly
- [ ] Success messages appear after actions
- [ ] Floating actions panel doesn't obstruct content
- [ ] Modal dialogs have proper z-index

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iPhone Safari, Chrome Android)

---

## Accessibility Checks

- [ ] All buttons have proper `aria-label` attributes
- [ ] Forms have associated labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces important state changes

---

## Performance Benchmarks

Document baseline:
- **Initial load time:** ___ms
- **Bulk operation on 100 items:** ___ms
- **Export 50 posts to JSON:** ___ms
- **Template search/filter:** ___ms

---

## Common Issues & Troubleshooting

### Issue: "Cannot connect to API"
- Verify backend server is running on port 3000
- Check API key is valid
- Check CORS headers are set correctly

### Issue: "Scheduled post didn't publish"
- Verify system time is correct
- Check backend server is still running
- Check database for scheduled posts table

### Issue: "Templates not loading"
- Clear browser cache
- Verify database has templates table
- Check API response status

### Issue: "Bulk operation hangs"
- Check browser console for errors
- Verify database connection
- Try smaller batch size

---

## Sign-Off

When all tests pass, fill in:

- **Tested By:** _______________
- **Date:** _______________
- **Browser/OS:** _______________
- **API Key Used:** _______________
- **Notes:** _______________

**Overall Status:** ☐ PASS ☐ FAIL ☐ NEEDS REVIEW

---

**Last Updated:** 2026-08-24
