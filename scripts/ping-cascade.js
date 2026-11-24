/**
 * Kawaki Studios - RSS & XML-RPC Ping Cascade
 * Broadcasts feed updates to search engine ping servers and WebSub hubs.
 */

const http = require('http');
const https = require('https');

const SITE_NAME = 'Kawaki Studios';
const SITE_URL = 'https://kawaki.co.in';
const RSS_URL = 'https://kawaki.co.in/rss.xml';

function sendXmlRpcPing(hostname, path, port = 80) {
  return new Promise((resolve) => {
    const xml = `<?xml version="1.0"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value>${SITE_NAME}</value></param>
    <param><value>${SITE_URL}</value></param>
    <param><value>${RSS_URL}</value></param>
  </params>
</methodCall>`;

    const req = http.request({
      hostname,
      port,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(xml),
        'User-Agent': 'Kawaki Studios Ping Agent/1.0'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const isOk = !data.includes('<boolean>1</boolean>') || data.includes('<boolean>0</boolean>');
        resolve({ host: hostname, status: res.statusCode, success: isOk });
      });
    });

    req.on('error', (err) => {
      resolve({ host: hostname, error: err.message, success: false });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ host: hostname, error: 'Timeout', success: false });
    });

    req.write(xml);
    req.end();
  });
}

async function pingWebSubHub() {
  return new Promise((resolve) => {
    const postData = new URLSearchParams({
      'hub.mode': 'publish',
      'hub.url': RSS_URL
    }).toString();

    const req = https.request({
      hostname: 'pubsubhubbub.appspot.com',
      port: 443,
      path: '/publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Kawaki Studios Publisher/1.0'
      },
      timeout: 10000
    }, (res) => {
      resolve({ host: 'pubsubhubbub.appspot.com', status: res.statusCode, success: res.statusCode >= 200 && res.statusCode < 300 });
    });

    req.on('error', (err) => {
      resolve({ host: 'pubsubhubbub.appspot.com', error: err.message, success: false });
    });

    req.write(postData);
    req.end();
  });
}

async function runPingCascade() {
  console.log('⚡ [Ping Cascade] Dispatching feed broadcast pings...');
  
  const pingomatic = await sendXmlRpcPing('rpc.pingomatic.com', '/');
  console.log(`   ${pingomatic.success ? '✓' : '⚠️'} [Ping-o-Matic] Status: ${pingomatic.status || pingomatic.error}`);

  const websub = await pingWebSubHub();
  console.log(`   ${websub.success ? '✓' : '⚠️'} [Google WebSub Hub] Status: ${websub.status || websub.error}`);

  console.log('🎉 [Ping Cascade] Completed broadcasting RSS update signals.');
}

if (require.main === module) {
  runPingCascade();
}

module.exports = { runPingCascade };
