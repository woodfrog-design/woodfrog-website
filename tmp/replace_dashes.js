const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Woodfrog_Website\\src';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let count = 0;

files.forEach(file => {
    // Skip binary files or large files if any, but focus on text-based ones
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.css')) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes('—')) {
                const newContent = content.replace(/—/g, '-');
                fs.writeFileSync(file, newContent, 'utf8');
                console.log(`Updated: ${file}`);
                count++;
            }
        } catch (err) {
            console.error(`Failed to process ${file}: ${err.message}`);
        }
    }
});

console.log(`Finished. Updated ${count} files.`);
