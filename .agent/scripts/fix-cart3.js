const fs = require('fs');

// The issue: the buttons got duplicated - there are TWO qty selectors per product
// because the first script wrapped in a div, and the second script found "In den Warenkorb" inside each wrapper too.
// Solution: Remove the outer wrapper that doesn't have add-to-cart-btn class

const files = ['lichttechnik.html', 'tontechnik.html', 'event-zubehoer.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // The pattern is: there are nested <div class="flex items-center gap-2"> blocks
    // The outer one (from first script) has a button WITHOUT add-to-cart-btn class
    // The inner one (from second script) has a button WITH add-to-cart-btn class
    
    // Strategy: Find the outer wrapper pattern and remove it, keeping only the inner one
    // The outer wrapper starts with: <div class="flex items-center gap-2">\n                <div class="flex items-center bg-black/40...
    // and contains another <div class="flex items-center gap-2"> inside
    
    // Simpler: just find lines with qty-minus that are immediately followed by another qty-minus block
    // and remove the outer one
    
    const lines = html.split('\n');
    const filtered = [];
    let skipUntilClosingDiv = false;
    let skipDepth = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Detect the OUTER wrapper (it's the one whose button does NOT have add-to-cart-btn)
        // Look for pattern: a <div class="flex items-center gap-2"> that contains a button without add-to-cart-btn
        if (trimmed === '<div class="flex items-center gap-2">' && !skipUntilClosingDiv) {
            // Check if this is the outer wrapper by looking ahead for a button without add-to-cart-btn
            // and another <div class="flex items-center gap-2">
            let hasNestedSelector = false;
            let hasButtonWithoutClass = false;
            for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
                if (lines[j].includes('add-to-cart-btn') && !lines[j].includes('qty-minus')) {
                    // This line has the real button
                }
                if (lines[j].trim() === '<div class="flex items-center gap-2">') {
                    hasNestedSelector = true;
                    break;
                }
            }
            
            if (hasNestedSelector) {
                // This is the outer duplicate wrapper - skip its opening div and the first set of qty controls
                // Skip until we hit the next <div class="flex items-center gap-2">
                skipUntilClosingDiv = true;
                continue; // Skip this line
            }
        }
        
        if (skipUntilClosingDiv) {
            // Skip lines until we reach the next <div class="flex items-center gap-2">
            if (line.trim() === '<div class="flex items-center gap-2">') {
                skipUntilClosingDiv = false;
                // Don't skip this line - it's the start of the real one
                filtered.push(line);
            }
            // Skip everything else (the outer wrapper's qty controls and its non-add-to-cart button)
            continue;
        }
        
        filtered.push(line);
    }
    
    // Now we also need to remove the extra closing </div> that was from the outer wrapper
    // But this is getting complicated. Let me take a different approach...
    // Let me just rewrite the file properly.
    
    // Actually, let me take the brutal approach: read the file fresh, find ALL the nested patterns and clean them
    let cleanHtml = filtered.join('\n');
    
    // Remove orphaned closing </div> after the qty+button block 
    // The pattern is: </button>\n            </div>\n            </div>\n (extra closing div from outer wrapper)
    // Actually, we need to count. Let me just check if the result is valid...
    
    fs.writeFileSync(file, cleanHtml);
    
    // Count remaining buttons
    const countBtns = (cleanHtml.match(/add-to-cart-btn/g) || []).length;
    const countQtyMinus = (cleanHtml.match(/qty-minus/g) || []).length;
    console.log(`${file}: ${countBtns} add-to-cart buttons, ${countQtyMinus} qty-minus buttons`);
});

console.log('Dedup done!');
