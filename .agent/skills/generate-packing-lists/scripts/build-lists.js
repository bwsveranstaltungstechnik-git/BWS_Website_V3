/**
 * Packing List Generator Script
 * 
 * Usage from Claude:
 * 1. Fetch relevant Jobs for the timeframe.
 * 2. Fetch all InventoryItems representing the itemIds in those Jobs.
 * 3. Pass data into `buildPackingList(jobs, inventory)`.
 */

function buildPackingList(jobs, inventory) {
    const inventoryMap = {};
    for (const item of inventory) {
        inventoryMap[item.id] = item;
    }

    const reports = [];

    for (const job of jobs) {
        // 1. Resolve Items
        const items = (job.itemIds || [])
            .map(id => inventoryMap[id])
            .filter(Boolean);

        // 2. Build Hierarchy (Cases vs. Loose Items)
        const cases = items.filter(i => i.category.toLowerCase().includes('case') || i.category.toLowerCase().includes('koffer'));
        const loose = items.filter(i => !cases.includes(i));

        const packingStructure = {
            cases: [],
            loose: []
        };

        // Nest items under cases
        for (const c of cases) {
            const children = loose.filter(l => l.parentId === c.id);
            packingStructure.cases.push({
                caseName: c.name,
                barcode: c.barcode,
                contents: children
            });
        }

        // Keep items without parents in 'loose'
        packingStructure.loose = loose.filter(l => !l.parentId);

        // Group loose items by category for readability
        const looseByCategory = {};
        for (const l of packingStructure.loose) {
            if (!looseByCategory[l.category]) looseByCategory[l.category] = [];
            looseByCategory[l.category].push(l);
        }

        reports.push({
            jobName: job.name,
            startDate: job.startDate,
            company: job.company,
            packingList: {
                cases: packingStructure.cases,
                looseCategorized: looseByCategory
            }
        });
    }

    return reports;
}

module.exports = { buildPackingList };
