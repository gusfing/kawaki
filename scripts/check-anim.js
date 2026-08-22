const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const svgLines = html.match(/data-group="\d+"/g);
console.log('SVG data-group elements:', svgLines ? svgLines.length : 0);

const sidebarMatch = html.match(/class="subtitle/);
console.log('Has subtitle:', sidebarMatch !== null);

const riveMatch = html.match(/rive/gi);
console.log('Rive references:', riveMatch ? riveMatch.length : 0);

// find the closing </body> tag position
const bodyClose = html.lastIndexOf('</body>');
console.log('</body> at char:', bodyClose);
