const fs = require('fs');
const glob = require('glob'); // Not available unless installed, so let's just use pure node recursion
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src/components');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Remove dark: classes
    content = content.replace(/dark:text-\[[^\]]+\]/g, '');
    content = content.replace(/dark:bg-\[[^\]]+\]/g, '');
    content = content.replace(/dark:border-\[[^\]]+\]/g, '');
    content = content.replace(/dark:hover:text-\[[^\]]+\]/g, '');
    content = content.replace(/dark:prose-invert/g, 'prose-invert'); // Keep prose-invert
    
    // Replace hardcoded emerald/green colors with theme-green
    content = content.replace(/text-\[#00E676\]/g, 'text-theme-green');
    content = content.replace(/bg-\[#00E676\]/g, 'bg-theme-green');
    content = content.replace(/border-\[#00E676\]/g, 'border-theme-green');
    content = content.replace(/via-\[#00E676\]/g, 'via-theme-green');
    content = content.replace(/hover:text-\[#00E676\]/g, 'hover:text-theme-green');
    content = content.replace(/group-hover:text-\[#00E676\]/g, 'group-hover:text-theme-green');
    content = content.replace(/group-hover:bg-\[#00E676\]/g, 'group-hover:bg-theme-green');
    content = content.replace(/group-hover:border-\[#00E676\]/g, 'group-hover:border-theme-green');
    
    content = content.replace(/text-emerald-600/g, 'text-theme-green');
    content = content.replace(/text-emerald-700/g, 'text-theme-green');
    content = content.replace(/text-emerald-400/g, 'text-theme-green');
    content = content.replace(/bg-emerald-500\/10/g, 'bg-theme-green/10');
    content = content.replace(/border-emerald-500\/20/g, 'border-theme-green/20');
    
    // Replace gray colors with theme text classes
    content = content.replace(/text-gray-800/g, 'text-theme-text');
    content = content.replace(/text-gray-500/g, 'text-theme-text-muted');

    // Replace dark:opacity with normal opacity if needed? Just remove dark:opacity
    content = content.replace(/dark:opacity-\[0\.02\]/g, 'opacity-10'); // Or something consistent

    // Remove double spaces
    content = content.replace(/ +/g, ' ');
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});
