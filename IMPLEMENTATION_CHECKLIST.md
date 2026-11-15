# Kawaki Studios — Complete Redesign Implementation Checklist

**Status:** Ready to Deploy Across All 40+ Pages  
**Master CSS:** `public/assets/css/kawaki-master.css` ✅  
**Design System:** Complete with typography, colors, components ✅

---

## 📋 QUICK START

### Step 1: Add to HEAD of EVERY HTML file
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/kawaki-master.css">
```

### Step 2: Use these HTML patterns (no custom CSS needed)

**Heroes:**
```html
<section class="hero">
  <div class="container">
    <div class="hero-eyebrow">Subtitle</div>
    <h1>Main Heading</h1>
    <p class="hero-subtitle">Subheading with <em>emphasis</em></p>
    <div class="hero-cta-group">
      <button class="btn btn-primary">CTA</button>
      <button class="btn btn-secondary">Secondary</button>
    </div>
  </div>
</section>
```

**Content Sections:**
```html
<section class="section">
  <div class="container">
    <h2>Section Title</h2>
    <div class="grid-auto">
      <div class="card">
        <h3>Card Title</h3>
        <p>Card text</p>
      </div>
    </div>
  </div>
</section>
```

**Footers:**
```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-column">
        <h5>Column</h5>
        <p><a href="#">Link</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Kawaki Studios.</p>
    </div>
  </div>
</footer>
```

---

## ✅ PAGES TO UPDATE (40+ Files)

### TIER 1: CRITICAL (Update FIRST)
**Do these first — highest impact**

- [ ] **index.html** - Homepage
  - Add master CSS link
  - Add hero section with animations
  - Update services grid (use `.grid-auto` + `.card`)
  - Update stats section
  - Update CTA section
  - Update footer

- [ ] **about.html** - About page
  - Add master CSS link
  - Update hero
  - Add content sections with `.section`
  - Update founder spotlight
  - Update team cards with `.card`

- [ ] **services/custom-web-development.html**
- [ ] **services/shopify-development.html**
- [ ] **services/web-applications.html**
- [ ] **services/ai-automation.html**
- [ ] **services/ai-search-optimization.html**

**For ALL service pages:**
- Add master CSS
- Update hero with new copy (no AI slop)
- Use `.grid-auto` for case studies
- Update CTA section
- Update footer

### TIER 2: HIGH IMPACT (Medium Priority)

**All City Pages (10 pages):**
- [ ] delhi.html
- [ ] gurgaon.html
- [ ] bangalore.html
- [ ] hyderabad.html
- [ ] pune.html
- [ ] mumbai.html
- [ ] kolkata.html
- [ ] chandigarh.html
- [ ] jaipur.html
- [ ] dubai.html

**For ALL city pages:**
- Add master CSS link only
- Keep existing content
- Typography will auto-update
- Colors will auto-apply
- ~5 min per page

**All Case Study Pages (4 pages):**
- [ ] case-studies/bazzaro.html
- [ ] case-studies/urbanland.html
- [ ] case-studies/kala-design.html
- [ ] case-studies/decor-lab.html

**For ALL case studies:**
- Add master CSS
- Update hero
- Keep project content (it's good)
- Update footer
- ~15 min per page

### TIER 3: SUPPORTING (Lower Priority)

**Blog & Content:**
- [ ] blog.html - Blog index
- [ ] blog/*.html - All 15+ blog posts (just add CSS link)
- [ ] directory.html

### TIER 4: ADMIN

**Dashboard:**
- [ ] admin-dashboard/frontend/index.html
  - Create dashboard.css using kawaki-master.css variables
  - Apply color palette
  - Use typography scale
  - Update all admin UI components

---

## 🎨 PAGE TEMPLATE STRUCTURE

### Minimal Complete Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <title>Page Title</title>
    
    <!-- FONTS + MASTER CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/kawaki-master.css">
    
    <style>
        /* ONLY page-specific styles, NOT component styles */
        .custom-section {
            /* something unique to this page */
        }
    </style>
</head>
<body>
    <!-- HEADER/NAV (unchanged) -->
    
    <!-- HERO -->
    <section class="hero">
        <div class="container">
            <div class="hero-eyebrow">Live Badge</div>
            <h1>Page Heading</h1>
            <p class="hero-subtitle">Subtext with <em>emphasis</em></p>
            <div class="hero-cta-group">
                <button class="btn btn-primary">CTA</button>
            </div>
        </div>
    </section>

    <!-- CONTENT SECTIONS -->
    <section class="section">
        <div class="container">
            <h2>Section Title</h2>
            <div class="grid-auto">
                <div class="card">
                    <h3>Title</h3>
                    <p>Content</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h5>Column</h5>
                    <p><a href="#">Link</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Kawaki Studios.</p>
            </div>
        </div>
    </footer>
</body>
</html>
```

---

## 📊 TIME ESTIMATE

| Tier | Pages | Time/Page | Total |
|------|-------|-----------|-------|
| Tier 1 | 8 | 30-45 min | 4-6 hours |
| Tier 2 | 14 | 5-15 min | 2-3 hours |
| Tier 3 | 15+ | 5 min | 1-2 hours |
| Tier 4 | 1 | 2 hours | 2 hours |
| **TOTAL** | **40+** | - | **9-13 hours** |

**Parallelizable:** All pages can be updated simultaneously once you know the pattern.

---

## 🚀 PRIORITY EXECUTION PLAN

### Day 1: Critical Pages (Tier 1)
1. Update index.html (1 hour)
2. Update about.html (45 min)
3. Update 5 service pages (2-3 hours)
4. **Subtotal: 4-4.5 hours**

### Day 2: High Impact (Tier 2)
1. Update 10 city pages (50 min) - quick add CSS link
2. Update 4 case study pages (1 hour)
3. Test responsiveness across all (1 hour)
4. **Subtotal: 2.5-3 hours**

### Day 3: Supporting + Admin (Tier 3-4)
1. Update blog pages (1-2 hours)
2. Update dashboard CSS (2 hours)
3. Final testing + deploy (1 hour)
4. **Subtotal: 4-5 hours**

**Total: 10.5-12.5 hours over 3 days**

---

## ✅ FINAL CHECKLIST

### Before Launch
- [ ] Master CSS deployed to `public/assets/css/`
- [ ] All 40+ pages have master CSS link
- [ ] Homepage updated + tested
- [ ] All service pages updated
- [ ] All city pages updated
- [ ] Dashboard styled
- [ ] Mobile testing (375px, 768px, 1920px)
- [ ] Accessibility check (WCAG AAA)
- [ ] Performance test (Lighthouse)
- [ ] Old CSS files removed
- [ ] SEO meta tags updated (no AI slop)

### Deploy
- [ ] Commit all changes with message: "feat(design): global redesign with custom palette & optimized typography"
- [ ] Push to staging
- [ ] Final QA
- [ ] Deploy to production
- [ ] Monitor for issues

---

## 📞 CSS Classes You'll Need

### Text
```html
<h1>-<h5>               <!-- auto-styled headings -->
<p>, <p class="large">, <p class="small">  <!-- body text -->
<em>Emphasis</em>       <!-- yellow italic -->
<strong>Bold</strong>   <!-- semibold -->
```

### Layout
```html
<div class="container">        <!-- max 1200px -->
<section class="section">      <!-- full-width padding + border -->
<div class="grid-auto">        <!-- responsive 3-col grid -->
<div class="card">             <!-- with hover effects -->
```

### Buttons
```html
<button class="btn">           <!-- secondary -->
<button class="btn btn-primary">  <!-- red primary -->
<button class="btn btn-secondary"> <!-- yellow secondary -->
```

### Utilities
```html
<div class="mt-lg">            <!-- margin-top large -->
<div class="text-center">      <!-- text-align center -->
<div class="animate-fade-up">  <!-- fade-up animation -->
```

---

## 🎯 Success Criteria

✅ All pages load with new design  
✅ Color palette applied consistently  
✅ Typography renders at all sizes  
✅ Mobile responsive (375px+)  
✅ Animations smooth (60fps)  
✅ Accessibility meets WCAG AAA  
✅ No AI slop language remaining  
✅ Performance: Lighthouse > 95  
✅ All internal links working  
✅ SEO meta tags updated  

---

## 📞 Need Help?

- **Master CSS Reference:** GLOBAL_REDESIGN_GUIDE.md
- **Typography System:** kawaki-master.css (lines 40-120)
- **Component Styles:** kawaki-master.css (lines 200+)
- **Examples:** index-updated.html

**All tools are ready. You've got this!** 🚀
