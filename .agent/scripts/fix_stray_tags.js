const fs = require('fs');

const files = [
    'tontechnik.html',
    'lichttechnik.html',
    'event-zubehoer.html',
    'dj-service.html',
    'mietartikel-details.html'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');

    // Remove the stray </button> </div> that follow the legitimate </div> 
    // Usually it looks exactly like:
    //                 </button>
    //             </div>
    //                 </button>
    //             </div>
    // First, let's just do a regex replace for the duplicated block.
    // The exact string that is duplicated is:
    /*
                </button>
            </div>
                </button>
            </div>
    */
    // We can replace two sets of them with one set.
    const strayPattern = /(<\/button>\s*<\/div>\s*)<\/button>\s*<\/div>/g;
    content = content.replace(strayPattern, '$1');
    
    // Also add max-w-sm to the product cards to ensure they don't grow too much on mobile? No, wait. 
    // They are in a grid-cols-1, which means they span full width minus padding. `max-w-full` is better.
    // Let's first just write out the fixed tags.
    fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed stray tags!');
