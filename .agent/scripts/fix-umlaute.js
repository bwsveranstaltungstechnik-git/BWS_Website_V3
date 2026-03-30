const fs = require('fs');
const path = require('path');

const UMLAUT_MAP = {
    'Ã¼': 'ü',
    'Ã¤': 'ä',
    'Ã¶': 'ö',
    'ÃŸ': 'ß',
    'Ã„': 'Ä',
    'Ã–': 'Ö',
    'Ãœ': 'Ü',
    'â‚¬': '€',
    'â€”': '—',
    'â€“': '–',
    'â†’': '→',
    'â†‘': '↑',
    'â†“': '↓',
    'â€ž': '„',
    'â€œ': '“',
    'âš¡': '⚡',
    'âš–ï¸ ': '⚖️',
    'âš ï¸ ': '⚠️',
    'â ­ï¸ ': '⏭️',
    'â¬›': '⬛',
    'â€¢': '•',
    'â ­': '⏭',
    'âš–': '⚖',
    'âš ': '⚠'
};

function fixUmlauteInDirectory(dir) {
    const files = fs.readdirSync(dir);
    let changedFilesCount = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            changedFilesCount += fixUmlauteInDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            for (const [broken, fixed] of Object.entries(UMLAUT_MAP)) {
                // Globaler Replace
                content = content.split(broken).join(fixed);
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Repariert: ${fullPath}`);
                changedFilesCount++;
            }
        }
    }

    return changedFilesCount;
}

const projectRoot = path.join(__dirname, '../..');
const agentDir = path.join(__dirname, '../../.agent');

console.log("Starte Reparatur der Umlaute...");
let total = 0;
if (fs.existsSync(projectRoot)) total += fixUmlauteInDirectory(projectRoot);

console.log(`Fertig! ${total} Dateien wurden repariert.`);
