/**
 * Validation Script for Equipment Shortages
 * 
 * Usage from Claude:
 * 1. Fetch all InventoryItems.
 * 2. Fetch all Jobs inside the analysis timeframe.
 * 3. Pass both arrays into `calculateShortages(jobs, inventory)`.
 */

function calculateShortages(jobs, inventory) {
    // Pre-map inventory
    const inventoryMap = {};
    for (const item of inventory) {
        inventoryMap[item.id] = item;
    }

    // Find the required quantity per day per item
    const dailyRequirements = {}; // { 'YYYY-MM-DD': { 'ITEM_ID': 5 } }

    for (const job of jobs) {
        // Basic date parsing (ignoring times for simple daily overlap)
        const startDate = new Date(job.startDate);
        const endDate = new Date(job.endDate);

        for (const itemId of (job.itemIds || [])) {
            // Walk through each day of the job
            let current = new Date(startDate);
            while (current <= endDate) {
                const dateString = current.toISOString().split('T')[0];
                if (!dailyRequirements[dateString]) dailyRequirements[dateString] = {};

                dailyRequirements[dateString][itemId] = (dailyRequirements[dateString][itemId] || 0) + 1;

                current.setDate(current.getDate() + 1);
            }
        }
    }

    // Compare with actual stock
    const shortages = [];
    for (const [date, requiredItems] of Object.entries(dailyRequirements)) {
        for (const [itemId, requiredQty] of Object.entries(requiredItems)) {
            const item = inventoryMap[itemId];
            if (!item) continue;

            const maxAvailable = item.isBulk ? (item.quantity?.total || 1) : 1;

            if (requiredQty > maxAvailable) {
                shortages.push({
                    date,
                    item: item.name,
                    itemId: item.id,
                    required: requiredQty,
                    available: maxAvailable,
                    shortage: requiredQty - maxAvailable
                });
            }
        }
    }

    return shortages;
}

module.exports = { calculateShortages };
