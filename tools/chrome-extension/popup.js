const $ = id => document.getElementById(id);

function row(e) {
  const li = document.createElement('li');
  if (!e.ok) li.className = 'err';
  const t = document.createElement('span');
  t.className = 't';
  t.textContent = new Date(e.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0, 8);
  const a = document.createElement('span');
  a.className = 'a';
  a.textContent = e.a;
  const d = document.createElement('span');
  d.className = 'd';
  d.textContent = e.ok ? (e.d || '') + (e.ms != null ? '  ' + e.ms + 'ms' : '') : (e.e || 'failed');
  d.title = d.textContent;
  li.append(t, a, d);
  return li;
}

async function refresh() {
  let s;
  try {
    s = await chrome.runtime.sendMessage({ type: 'status' });
  } catch (e) {
    s = null;
  }
  $('dot').classList.toggle('on', !!(s && s.connected));
  $('state').textContent = s && s.connected ? 'Connected' : 'Waiting for bridge';
  $('ver').textContent = s ? 'v' + s.version : '-';
  $('dbg').textContent = s && s.debugger.length ? 'attached to ' + s.debugger.length + ' tab(s)' : 'off';
  if (s && s.agentTabId != null) {
    try {
      const t = await chrome.tabs.get(s.agentTabId);
      $('agent').textContent = t.title || t.url;
      $('agent').title = t.url;
    } catch (e) {
      $('agent').textContent = 'closed';
    }
  } else {
    $('agent').textContent = 'none';
  }
  const log = $('log');
  log.replaceChildren();
  if (!s || !s.activity.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Nothing yet.';
    log.append(li);
  } else {
    s.activity.forEach(e => log.append(row(e)));
  }
}

$('reconnect').addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'reconnect' });
  setTimeout(refresh, 800);
});
$('detach').addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'detach' });
  refresh();
});

refresh();
setInterval(refresh, 2000);
