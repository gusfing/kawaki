# Kawaki Agent Chrome Bridge

Lets an agent on this computer read and drive your normal Chrome profile, so it can use sites you are already signed in to (Search Console, Bing Webmaster Tools) without API keys. The agent talks to a local server, which talks to this extension.

## Install (once)

1. Start the bridge: `npm run bridge:chrome`. Leave it running. It writes a token to `tools/chrome-bridge/.token`; that file is gitignored.
2. In Chrome, open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and choose this folder (`tools/chrome-extension`). If an older "Kawaki Agent Chrome Bridge" is listed, remove it first: version 2 has a fixed ID, `cnbanaljfhnkgdecagmjeflcckaoigme`.
4. Check: `node tools/chrome-bridge/cli.js status` should print `connected`.

## Safety

- The server listens on 127.0.0.1 only. It refuses requests from web pages (`Origin`/`Sec-Fetch` headers), refuses other `Host` names (DNS rebinding), and sends no CORS headers.
- Every request needs the token. `client.js` and `cli.js` read it for you.
- The WebSocket only accepts this extension's ID.
- The agent works in its own window and tab, so your tabs are left alone.
- Typing with `--trusted`, `eval`, `back` fallbacks and background screenshots use the Chrome debugger. While it is attached, Chrome shows a "started debugging this browser" bar. Press **Cancel** there, or **Stop debugging** in the popup, to stop it. Cancel pauses debugger actions for five minutes.
- The popup lists the last actions the agent took.
- Old scripts that send no token can run if you start the server with `BRIDGE_ALLOW_NO_TOKEN=1`. Requests from web pages are still refused in that mode.

## Commands

```bash
node tools/chrome-bridge/cli.js open https://search.google.com/search-console --wait Overview
node tools/chrome-bridge/cli.js snap --i           # controls and headings only, numbered
node tools/chrome-bridge/cli.js click 12 --snap    # click ref 12 and show the page after
node tools/chrome-bridge/cli.js click "Pages"      # or click by visible text
node tools/chrome-bridge/cli.js table 0 --rows 50  # a table as tab-separated rows
node tools/chrome-bridge/cli.js text main --max 2000
node tools/chrome-bridge/cli.js shot report.jpg    # saves a scaled JPEG, prints the path
node tools/chrome-bridge/cli.js batch '[{"do":"click","text":"Export"},{"do":"wait","text":"Download"}]'
```

Run `node tools/chrome-bridge/cli.js` with no arguments for the full list. From Node, use `require('./tools/chrome-bridge/client').call(action, params)`.

## Files

- `background.js`: the service worker with every action.
- `legacy.js`: the v1 actions that older scripts in `scripts/` still call.
- `popup.html` and `popup.js`: the status panel.
- `../chrome-bridge/server.js`: the local relay.
- `../chrome-bridge/client.js`: the Node client.
- `../chrome-bridge/cli.js`: the command line.
