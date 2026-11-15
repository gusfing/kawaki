# Kawaki Agent Chrome Bridge Extension

This Chrome Extension allows Antigravity AI Agent to automate, inspect, screenshot, and navigate your **active Google Chrome profile** (preserving all your logged-in cookies, Google Search Console sessions, Semrush dashboards, and bookmarks) with **zero extra startup flags** and without having to close your browser.

---

### How to Install (Takes 30 Seconds)

1. Open your regular **Google Chrome** window.
2. In the URL bar, go to:
   ```
   chrome://extensions/
   ```
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** (top left).
5. Select this folder:
   ```
   c:\Users\ks209\Documents\kunal saas\kawaki website\files\tools\chrome-extension
   ```
6. You will see **Kawaki Agent Chrome Bridge** appear in your extensions list.

---

### How It Works

* The extension runs in the background and connects over local loopback (`ws://127.0.0.1:8765`) to the Kawaki Agent Bridge server.
* The Agent can take high-resolution screenshots, open tabs, check console logs, inspect DOM elements, and click buttons right inside your logged-in Chrome profile.
* Whenever the agent debugs an active tab, Chrome shows a native notice bar: `Kawaki Agent Chrome Bridge started debugging this browser`, giving you full visibility and one-click cancel authority.

---

### CLI Commands Available to the Agent / Terminal

```bash
# Check status & connected profile
node tools/chrome-bridge/cli.js status

# List all open tabs in your Chrome
node tools/chrome-bridge/cli.js tabs

# Open a URL in your active Chrome profile
node tools/chrome-bridge/cli.js open https://search.google.com/search-console

# Take a screenshot of the active tab
node tools/chrome-bridge/cli.js screenshot screenshot.png

# Read title, URL and text content from active tab
node tools/chrome-bridge/cli.js content

# Evaluate JavaScript or click selectors
node tools/chrome-bridge/cli.js eval "document.title"
node tools/chrome-bridge/cli.js click "#my-button"
```

