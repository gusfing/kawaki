const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Find process-section block
const processStart = content.indexOf('<section class="section process-section" id="process">');
const processEnd = content.indexOf('</section>', processStart) + '</section>'.length;
const processBlock = content.substring(processStart, processEnd);

// Find works-wrapper block
const servicesStart = content.indexOf('<section class="section works-wrapper" id="services">');
const servicesEnd = content.indexOf('</section>', servicesStart) + '</section>'.length;
const servicesBlock = content.substring(servicesStart, servicesEnd);

if (processStart !== -1 && servicesStart !== -1 && processStart < servicesStart) {
    // Cut out servicesBlock first (higher index)
    let beforeProcess = content.substring(0, processStart);
    let between = content.substring(processEnd, servicesStart);
    let afterServices = content.substring(servicesEnd);

    // Reconstruct with servicesBlock first, then between (if any comments), then processBlock
    content = beforeProcess + servicesBlock + '\r\n\r\n        ' + between.trim() + (between.trim() ? '\r\n\r\n        ' : '') + processBlock + afterServices;
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('Successfully swapped Services before How It Works!');
} else {
    console.log('Already in correct order or sections not found.');
}
