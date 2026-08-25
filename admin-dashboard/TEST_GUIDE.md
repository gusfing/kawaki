# Testing Guide - Kawaki Admin Dashboard

## Quick Test Setup

### 1. Install Dependencies

```bash
cd admin-dashboard
npm install --legacy-peer-deps

cd backend
npm install --legacy-peer-deps
cd ../frontend
npm install --legacy-peer-deps
cd ..
```

### 2. Initialize Database

```bash
cd backend
npm run migrate
cd ..
```

### 3. Create API Key for Testing

```bash
cd backend
npm exec -- tsx scripts/create-key.ts --name "Test"
# Save the output API key (format: sk_...)
cd ..
```

### 4. Start Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Test Scenarios

### Test 1: Authentication
**Objective:** Verify login works

1. Visit http://localhost:5173
2. Paste API key into login form
3. Click "Login"
4. **Expected:** Dashboard loads with sidebar

### Test 2: Create Blog
**Objective:** Test blog creation

1. Click "Blogs" in sidebar
2. Click "+ New Blog"
3. Fill form:
   - Title: "Test Blog Post"
   - Content: "# Hello\n\nThis is a test blog post."
   - Author: "Test User"
   - Tags: "test, tutorial"
4. Click "Create Blog"
5. **Expected:** Blog created, redirected to list

### Test 3: List & Filter Blogs
**Objective:** Test blog listing and filtering

1. Click "Blogs"
2. Try search: type "test"
3. Try filter: select "draft"
4. **Expected:** Blogs filtered correctly

### Test 4: Edit Blog
**Objective:** Test blog updates

1. Click "Blogs"
2. Click edit icon on test blog
3. Change title to "Updated Title"
4. Click "Save Changes"
5. **Expected:** Blog updated, title changed

### Test 5: Create Page
**Objective:** Test page creation

1. Click "Pages"
2. Click "+ New Page"
3. Fill:
   - Title: "About Us"
   - Content: "# About Our Company"
   - SEO Title: "About Us - Company"
   - SEO Description: "Learn about our company"
4. Click "Create Page"
5. **Expected:** Page created

### Test 6: Analytics Dashboard
**Objective:** Test analytics display

1. Click "Analytics"
2. Select different periods (7d, 30d, 90d)
3. **Expected:** 
   - Dashboard displays (even with 0 data initially)
   - Charts render correctly
   - Stats cards show values

### Test 7: SEO Analyzer
**Objective:** Test SEO analysis

1. Click "SEO"
2. Fill form:
   - Title: "My Blog Post"
   - Content: "# Introduction\n\nThis is a test blog post with enough content to make it meaningful and valuable for readers looking for information."
3. Click "Analyze SEO"
4. **Expected:**
   - Score calculated (0-100)
   - Metrics displayed
   - Issues listed (if any)

### Test 8: API Key Management
**Objective:** Test API key operations

```bash
# Get all keys
curl http://localhost:3000/api/auth/keys \
  -H "Authorization: Bearer sk_your_test_key"

# Create new key
curl -X POST http://localhost:3000/api/auth/keys \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_your_test_key" \
  -d '{
    "name": "New Key",
    "permissions": ["blog.read", "blog.write"]
  }'

# Deactivate key
curl -X DELETE http://localhost:3000/api/auth/keys/{key-id} \
  -H "Authorization: Bearer sk_your_test_key"
```

## API Testing

### Test Health Endpoint (no auth)

```bash
curl http://localhost:3000/api/health
```

Expected:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0",
    "timestamp": "...",
    "database": "connected"
  }
}
```

### Test Blog Endpoints

```bash
# Create blog
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_..." \
  -d '{
    "title": "API Test",
    "content": "# Test Content",
    "author": "API",
    "status": "draft"
  }'

# List blogs
curl http://localhost:3000/api/blogs \
  -H "Authorization: Bearer sk_..."

# Get by slug
curl http://localhost:3000/api/blogs/api-test \
  -H "Authorization: Bearer sk_..."

# Update
curl -X PUT http://localhost:3000/api/blogs/{blog-id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_..." \
  -d '{"status": "published"}'

# Delete
curl -X DELETE http://localhost:3000/api/blogs/{blog-id} \
  -H "Authorization: Bearer sk_..."
```

### Test Analytics

```bash
# Track event (no auth)
curl -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "type": "page_view",
    "page": "/blog/test",
    "userId": "user-123"
  }'

# Get summary
curl http://localhost:3000/api/analytics/summary?period=30d \
  -H "Authorization: Bearer sk_..."
```

### Test SEO

```bash
# Analyze content (no auth)
curl -X POST http://localhost:3000/api/seo/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "content": "# Test\n\nLong content here..."
  }'

# Get sitemap
curl http://localhost:3000/api/seo/sitemap?baseUrl=https://example.com \
  -H "Authorization: Bearer sk_..."
```

## Troubleshooting

### "Database locked" error
- Kill node processes: `pkill -f node`
- Restart servers

### "API key not found"
- Verify key format starts with `sk_`
- Check key is in database: `sqlite3 backend/data.db "SELECT * FROM api_keys;"`

### Frontend not connecting to API
- Check CORS: Should allow `http://localhost:5173`
- Check backend is running on port 3000
- Check browser console for errors

### Port already in use
- Change port: `PORT=3001 npm run -C backend dev`
- Or: `VITE_PORT=5174 npm run -C frontend dev`

## Test Checklist

- [ ] Login with API key
- [ ] Create blog post
- [ ] Edit blog post
- [ ] List blogs with filters
- [ ] Create page
- [ ] View analytics dashboard
- [ ] Run SEO analyzer
- [ ] Health endpoint responds
- [ ] Blog API endpoints work
- [ ] Analytics tracking works
- [ ] Error handling works

## Success Criteria

✅ Dashboard loads and authenticates  
✅ Can create/edit/list blogs and pages  
✅ Analytics displays metrics  
✅ SEO analyzer scores content  
✅ API endpoints respond correctly  
✅ Error messages are clear  
✅ No console errors in browser  

---

Once all tests pass, you're ready for:
1. New features
2. Production deployment
3. AI agent integration
