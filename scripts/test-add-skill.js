const http = require('http');

function post(action, payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: '/' + action,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.write(data);
    req.end();
  });
}

async function run() {
  const tabId = 573210206;
  console.log('Adding skill Web Development...');
  const res = await post('contra_eval', {
    tabId,
    cmd: 'add_contra_skill',
    payload: { skill: 'Web Development' }
  });
  console.log('Skill add result:', res);

  await new Promise(r => setTimeout(r, 2000));
  await post('screenshot', { tabId, savePath: 'after_skill.png' });
}

run().catch(console.error);

