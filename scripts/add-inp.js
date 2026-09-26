const fs = require('fs');
const path = require('path');

const perfFile = path.join(__dirname, '../public/services/website-performance-optimization.html');
let content = fs.readFileSync(perfFile, 'utf8');

const target = `<div class="service-row" style="cursor: default;">
                        <h3 class="service-name">Explicit Dimensioning &amp; Aspect Ratio Preservation</h3>`;

const block = `<div class="definition-callout" style="background: #fafafa; border: 1px solid rgba(17,17,17,0.08); border-left: 3px solid #C6FF00; padding: 22px 24px; margin-bottom: 2rem; border-radius: 4px;">
                        <span style="font-family: 'Host Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #111; display: block; margin-bottom: 6px;">// Core Web Vitals Metric Definition</span>
                        <h3 style="font-family: 'Host Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; color: #111; margin: 0 0 10px 0;">What is Interaction to Next Paint (INP)?</h3>
                        <p style="font-size: 0.95rem; color: #333; line-height: 1.65; margin: 0;">
                            Interaction to Next Paint (INP) is an official Core Web Vitals metric that evaluates a webpage’s overall responsiveness to user interactions across the entire duration of a page visit. It measures the latency between when a visitor initiates an action—such as clicking a navigation link, tapping a mobile button, or typing in a form—and when the browser is next able to paint an updated visual frame. Google categorizes an INP score of 200 milliseconds or less as "good" responsiveness, while scores above 500 milliseconds indicate severe main-thread interaction delays.
                        </p>
                    </div>
                    `;

const normContent = content.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normContent.includes(normTarget)) {
  const updated = normContent.replace(normTarget, block + normTarget);
  fs.writeFileSync(perfFile, updated.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully inserted INP definition block.');
} else {
  console.error('Target not found for INP definition block.');
}
