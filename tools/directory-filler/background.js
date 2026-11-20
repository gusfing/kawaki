/* Keyboard shortcut (Alt+Shift+F): fill the form in the active tab. No network, no tracking: it only reads the profile
   saved in this browser and runs the filler in the open page. */
importScripts('defaults.js', 'filler.js');

async function profile() {
  const { profile: saved } = await chrome.storage.local.get('profile');
  return Object.assign({}, DEFAULT_PROFILE, saved || {});
}

chrome.commands.onCommand.addListener(async command => {
  if (command !== 'fill-page') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id || !/^https?:/.test(tab.url || '')) return;
  const results = await chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, func: fillPage, args: [await profile(), {}] }).catch(() => []);
  const n = results.reduce((a, r) => a + ((r.result && r.result.filled.length) || 0), 0);
  chrome.action.setBadgeBackgroundColor({ color: '#F94500' });
  chrome.action.setBadgeText({ text: n ? String(n) : '0', tabId: tab.id });
  setTimeout(() => chrome.action.setBadgeText({ text: '', tabId: tab.id }), 4000);
});
