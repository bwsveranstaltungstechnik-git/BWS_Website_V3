/**
 * Validation Script for DMX Integrity
 * 
 * Usage from Claude:
 * 1. Read job plan and inventory item data via Supabase/API or local Mock.
 * 2. Pass the data to this script or implement the logic block directly via Node.
 */

function findOverlaps(fixtures) {
    const overlaps = [];

    // Group by universe
    const universes = {};
    for (const fix of fixtures) {
        if (!universes[fix.universe]) universes[fix.universe] = [];
        universes[fix.universe].push(fix);
    }

    // Check each universe
    for (const u in universes) {
        const sorted = universes[u].sort((a, b) => a.address - b.address);
        for (let i = 0; i < sorted.length - 1; i++) {
            const current = sorted[i];
            const next = sorted[i + 1];

            const currentEnd = current.address + current.channels - 1;
            if (currentEnd >= next.address) {
                overlaps.push({
                    universe: u,
                    conflict: [current, next],
                    message: `Overlap in Universe ${u}: ${current.name} (Addr: ${current.address}-${currentEnd}) conflicts with ${next.name} (Addr: ${next.address})`
                });
            }
        }
    }

    return overlaps;
}

module.exports = { findOverlaps };
