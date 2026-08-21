const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
    let res = [];
    fs.readdirSync(dir).forEach(f => {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            res = res.concat(getHtmlFiles(full));
        } else if (f.endsWith('.html')) {
            res.push(full);
        }
    });
    return res;
}

const files = getHtmlFiles('public');

const replacements = [
    { from: /https:\/\/i\.pinimg\.com\/736x\/2d\/46\/b7\/2d46b7b8aeb8cec7bdc78edeadefdfef\.jpg/g, to: '/assets/images/project_1_1787254271240.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/4a\/62\/15\/4a6215c4463f68dbabb3ac0f3996f289\.jpg/g, to: '/assets/images/project_2_1787254282785.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/65\/74\/af\/6574af961dfe8754c28b377a6e047db2\.jpg/g, to: '/assets/images/project_3_1787254295127.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/ec\/64\/00\/ec6400c4369a4732aa8c4c478e124b81\.jpg/g, to: '/assets/images/about_hero_bg.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/07\/7d\/51\/077d510bf4c86a3d6cb7f3fdf5d68d1b\.jpg/g, to: '/assets/images/team_placeholder.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/77\/89\/3e\/77893ed6ca353e680a672625fe9f4fa7\.jpg/g, to: '/assets/images/about-studio.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/736x\/2c\/3f\/8a\/2c3f8a003f56e07871bfae8e3f947bb3\.jpg/g, to: '/assets/images/about-studio.jpg' },
    { from: /https:\/\/i\.pinimg\.com\/control1\/736x\/be\/2b\/93\/be2b93da249b0fc75819bda5b77d1dbc\.jpg/g, to: '/assets/images/project_3_1787254295127.jpg' }
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    replacements.forEach(r => {
        if (r.from.test(content)) {
            content = content.replace(r.from, r.to);
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Cleaned Pinterest URLs in:', file);
    }
});
