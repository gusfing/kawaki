#!/usr/bin/env node

/**
 * Kawaki Agent Chrome Bridge — Command Line Client
 * 
 * Allows the AI agent or developer to interact with the active Chrome profile
 * directly from the command line, with optional background tab targeting.
 */

const http = require('http');

const PORT = 8765;
const HOST = '127.0.0.1';

async function request(path, payload = null) {
  return new Promise((resolve, reject) => {
    const isPost = Boolean(payload);
    const postData = isPost ? JSON.stringify(payload) : '';

    const req = http.request({
      hostname: HOST,
      port: PORT,
      path,
      method: isPost ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Could not connect to bridge server at http://${HOST}:${PORT}. Is 'node tools/chrome-bridge/server.js' running?`));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  const rawArgs = process.argv.slice(2);
  let targetTabId = null;

  // Extract --tab <id> if present
  const args = [];
  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === '--tab' && rawArgs[i + 1]) {
      targetTabId = parseInt(rawArgs[i + 1], 10);
      i++;
    } else {
      args.push(rawArgs[i]);
    }
  }

  const [cmd, ...cmdArgs] = args;

  if (!cmd || cmd === 'help' || cmd === '--help') {
    console.log(`
Kawaki Agent Chrome Bridge CLI

Usage:
  node tools/chrome-bridge/cli.js [--tab <id>] <command> [args]

Commands:
  status                             Check connection to extension & bridge
  tabs                               List open tabs in your Chrome profile
  open <url>                         Open a new tab in your Chrome profile
  navigate <url> [--tab <id>]        Navigate tab to a URL
  screenshot [output.png] [--tab]    Capture screenshot of tab
  eval <script> [--tab <id>]         Evaluate JavaScript in tab
  click <selector> [--tab <id>]      Click an element in tab
  fill <selector> <text> [--tab]     Fill input in tab
  content [--tab <id>]               Get title, URL, and text of tab
  close [tabId]                      Close active or specified tab
`);
    return;
  }

  try {
    switch (cmd) {
      case 'status': {
        const res = await request('/status');
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'tabs': {
        const res = await request('/list_tabs', {});
        if (res.success) {
          console.log(`Found ${res.data.length} tabs:`);
          res.data.forEach(t => {
            const activeMark = t.active ? '★ (Active)' : ' ';
            console.log(`  [${t.id}] ${activeMark} ${t.title || 'Untitled'} - ${t.url}`);
          });
        } else {
          console.error('Error:', res.error);
        }
        break;
      }

      case 'open': {
        const url = cmdArgs[0] || 'https://kawaki.co.in';
        console.log(`Opening ${url} in your Chrome profile...`);
        const res = await request('/open_tab', { url, wait: true, active: false });
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'navigate': {
        const url = cmdArgs[0];
        if (!url) throw new Error('Usage: navigate <url>');
        const res = await request('/navigate', { url, tabId: targetTabId, wait: true });
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'screenshot': {
        const savePath = cmdArgs[0] || 'screenshot.png';
        console.log(`Capturing screenshot to ${savePath}...`);
        const res = await request('/screenshot', { savePath, tabId: targetTabId });
        if (res.success) {
          console.log(`✓ Saved screenshot (${(res.data.fileSize / 1024).toFixed(1)} KB) to ${res.data.savedTo}`);
        } else {
          console.error('Error:', res.error);
        }
        break;
      }

      case 'eval': {
        const expression = cmdArgs.join(' ');
        if (!expression) throw new Error('Usage: eval <expression>');
        const res = await request('/eval', { expression, tabId: targetTabId });
        if (res.success) {
          console.log(res.data.value);
        } else {
          console.error('Error:', res.error);
        }
        break;
      }

      case 'click': {
        const selector = cmdArgs[0];
        if (!selector) throw new Error('Usage: click <selector>');
        const res = await request('/click', { selector, tabId: targetTabId });
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'fill': {
        const selector = cmdArgs[0];
        const text = cmdArgs.slice(1).join(' ');
        if (!selector || !text) throw new Error('Usage: fill <selector> <text>');
        const res = await request('/fill', { selector, text, tabId: targetTabId });
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      case 'content': {
        const res = await request('/get_content', { tabId: targetTabId });
        if (res.success) {
          console.log('Title:', res.data.title);
          console.log('URL:  ', res.data.url);
          console.log('\nText Snippet:');
          console.log(res.data.textSnippet.slice(0, 500) + '...');
        } else {
          console.error('Error:', res.error);
        }
        break;
      }

      case 'close': {
        const id = targetTabId || parseInt(cmdArgs[0], 10);
        const res = await request('/close_tab', { tabId: id });
        console.log(JSON.stringify(res, null, 2));
        break;
      }

      default:
        console.error(`Unknown command: ${cmd}. Run with --help for usage.`);
    }
  } catch (err) {
    console.error('❌', err.message);
  }
}

main();
