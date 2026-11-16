import html, json, re, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SCRATCH = pathlib.Path(__file__).parent
head = (SCRATCH / "head.html").read_text("utf-8")

head = head.replace("Kawaki Studios \u2014 Custom Web Development &amp; Digital Products", "Kawaki Studios | Custom Web Development &amp; Digital Products")
head = head.replace('content="https://kawaki.co.in/assets/images/about_hero_bg.jpg"', 'content="https://kawaki.co.in/assets/images/og-home.jpg"')
head = head.replace("Kawaki Studios \u2014 Web Design, Custom Software &amp; Headless Ecommerce Studio in New Delhi", "Kawaki Studios: web design, custom software and headless ecommerce studio in New Delhi")

ARROW_UP = '<svg class="row__go" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW_R = '<svg class="row__go" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'

more = [
    ("Urbanland Products", "B2B catalogue for architectural materials", "/case-studies/urbanland", "/assets/images/case-studies/urbanland/hero.webp"),
    ("Decor Lab", "Interior design showroom", "/case-studies/decor-lab", "/assets/images/case-studies/decor-lab/hero.webp"),
    ("Pixza", "AI image generation app with a project workspace", "/case-studies/pixza", "/assets/images/case-studies/pixza/hero.webp"),
    ("Kova", "AI layout builder, in private testing", "/case-studies/kova", "/assets/images/case-studies/kova/hero.webp"),
    ("Spa &amp; Salon Platform", "Multi-branch booking and service catalogue", "/case-studies/spa-salon", "/assets/images/case-studies/spa-salon/hero.webp"),
    ("LMS Ecosystem", "Role-based platform for students, teachers and parents", "/case-studies/lms-ecosystem", None),
    ("Fintech ROI Calculator", "Interactive savings calculator", "/case-studies/fintech-roi-calculator", None),
]
rows = []
for name, cat, href, img in more:
    if img:
        rows.append(f'<li><a class="row" href="{href}"><span class="row__name">{name}</span><span class="row__strip" aria-hidden="true"><img data-src="{img}" alt="" width="1440" height="900" decoding="async" /></span><span class="row__cat">{cat}</span>{ARROW_UP}</a></li>')
    else:
        rows.append(f'<li><a class="row" href="{href}"><span class="row__name">{name}</span><span class="row__cat">{cat}</span>{ARROW_UP}</a></li>')

services = [
    ("Custom web development", "Company and marketing sites written in semantic HTML or Next.js, with no page builder underneath.", "/services/custom-web-development"),
    ("Web application development", "Portals, dashboards and internal tools with relational data, user roles and REST or webhook integrations.", "/services/web-application-development"),
    ("Shopify development", "Custom Liquid themes, or a headless storefront on the Storefront API when the catalogue needs one.", "/services/shopify-development"),
    ("Mobile app development", "iOS and Android apps in Flutter, React Native, Swift or Kotlin.", "/services/mobile-app-development"),
    ("AI automation", "n8n and Make.com workflows and agent integrations that move work between the tools your team already uses.", "/services/ai-automation"),
    ("AI search optimization", "Page structure, schema and content work aimed at being read and cited by AI search tools.", "/services/ai-search-optimization"),
    ("Technical SEO", "Crawlable architecture, clean URLs, internal links and JSON-LD, fixed in the code itself.", "/technical-seo"),
    ("Website security and recovery", "Hacked WordPress sites cleaned of backdoors, malicious redirects and spam pages, then hardened.", "/services/wordpress-malware-removal"),
    ("WordPress development", "Custom WordPress themes kept lean, without a stack of plugins doing the work.", "/services/wordpress-development"),
]
svc = [f'<li><a class="row svc" href="{href}"><h3 class="row__name">{name}</h3><span class="svc__desc">{desc}</span>{ARROW_R}</a></li>' for name, desc, href in services]

faq = [
    ("How much does a custom website or web application cost?",
     "Most custom builds fall between \u20b91,50,000 and \u20b95,00,000 for Indian startups and growing brands, or between $2,500 and $10,000 for international founders. The final figure depends on scope, interactive complexity and integrations such as headless Shopify, custom APIs or AI automation. Work is billed against fixed milestones, so the price of each stage is agreed before it starts."),
    ("What is a web application?",
     "A web application is a website that does the work of software: people sign in, enter data and get results back, all in the browser with nothing to install. School portals, booking systems, course platforms and internal dashboards are all web applications. NextSchool ERP and NursePass are two that we built."),
    ("Can you fix a hacked WordPress site?",
     "Yes. We clean infected WordPress installs, remove backdoors, malicious redirects and spam pages, and then harden the site to close the way the attacker got in."),
    ("How long does a project take?",
     "A marketing website usually takes 4 to 8 weeks from discovery to launch. Web applications and larger builds are scoped after discovery, because their timeline depends on the data and integrations involved."),
    ("Do you work with startups and founders?",
     "Yes, most of the people we work with are founders and small product teams, in India and abroad. You talk directly to the developers building your product, and every milestone goes to a staging link for your review before it ships."),
    ("Can you build custom websites and SaaS products?",
     "Yes. We build company websites, ecommerce stores, web applications, portals and SaaS tools, covering interface design, frontend and backend engineering, and deployment. Pixza, an AI image generation app with a project workspace, is one example."),
]
faq_html = []
for i, (q, a) in enumerate(faq, 1):
    faq_html.append(
        f'<div class="faq__item"><h3 class="faq__q"><button type="button" id="faq-q{i}" aria-expanded="true" aria-controls="faq-a{i}">'
        f'<span class="faq__q-text">{html.escape(q)}</span><span class="faq__icon" aria-hidden="true"></span></button></h3>'
        f'<div class="faq__a" id="faq-a{i}" role="region" aria-labelledby="faq-q{i}"><p>{html.escape(a)}</p></div></div>')

faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}
new_ld = '<script type="application/ld+json">\n    ' + json.dumps(faq_ld, ensure_ascii=False, indent=2).replace("\n", "\n    ") + '\n    </script>'
head, n = re.subn(r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema.org",\s*"@type": "FAQPage"[\s\S]*?</script>', lambda m: new_ld, head)
assert n == 1, "FAQ schema not found"

body = (SCRATCH / "home-body.html").read_text("utf-8")
body = body.replace("{{MORE_ROWS}}", "\n                ".join(rows))
body = body.replace("{{SERVICE_ROWS}}", "\n                ".join(svc))
body = body.replace("{{FAQ_HTML}}", "\n                ".join(faq_html))
mark = (ROOT / "public" / "assets" / "images" / "kawaki-word.svg").read_text("utf-8")
mark = mark.replace('<svg ', '<svg class="mark" focusable="false" ', 1)
body = body.replace("{{MARK_SVG}}", mark)
assert "{{" not in body

out = head + body
for ch in ["\u2014", "\u2013"]:
    visible = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", "", out)
    if ch in visible:
        print("WARNING dash in visible text:", ch, visible[visible.index(ch) - 60: visible.index(ch) + 20])
import hashlib
out = out.replace("+918368246502", "+917678123943").replace("918368246502", "917678123943").replace("+91 83682 46502", "+91 76781 23943")
def ver(rel):
    return hashlib.sha1((ROOT / "public" / rel).read_bytes()).hexdigest()[:10]
out = out.replace("/assets/css/site.css?v=20261115", "/assets/css/site.css?v=" + ver("assets/css/site.css"))
out = out.replace("/assets/js/site.js?v=20261115", "/assets/js/site.js?v=" + ver("assets/js/site.js"))
out = out.replace("/assets/css/chatbot.css?v=20260902_pill_v2", "/assets/css/chatbot.css?v=" + ver("assets/css/chatbot.css"))
out = out.replace('<script src="/assets/js/chatbot.js" defer>', '<script src="/assets/js/chatbot.js?v=' + ver("assets/js/chatbot.js") + '" data-css-v="' + ver("assets/css/chatbot.css") + '" defer>')
(ROOT / "public" / "index.html").write_bytes(out.encode("utf-8"))
print("wrote", len(out), "chars")
