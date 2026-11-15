const http = require('http');

const req = http.request('http://127.0.0.1:8765/reload_extension', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => console.log('Reload response:', b));
});
req.write('{}');
req.end();

