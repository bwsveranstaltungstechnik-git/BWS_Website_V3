/**
 * Inventory Health Diagnostic Script
 * 
 * Usage from Claude:
 * 1. Fetch all InventoryItems.
 * 2. Pass data into `sweepInventory(inventory)`.
 */

function sweepInventory(inventory) {
    const reports = {
        critical: [],
        warnings: [],
        info: [],
        orphans: []
    };

    const inventoryMap = {};
    const barcodes = new Set();
    const serials = new Set();

    for (const item of inventory) {
        inventoryMap[item.id] = item;
    }

    const today = new Date().toISOString().split('T')[0];

    for (const item of inventory) {
        // 1. Maintenance Checks
        if (item.nextMaintenanceDate && item.nextMaintenanceDate < today) {
            reports.warnings.push(`Overdue maintenance: ${item.name} (${item.barcode || item.id}), due ${item.nextMaintenanceDate}`);
        }
        if ((item.condition === 'DEFECT' || item.condition === 'MAINTENANCE') && !item.maintenanceNotes) {
            reports.critical.push(`Defective item missing notes: ${item.name} (${item.barcode || item.id})`);
        }
        if ((item.category.toLowerCase().includes('kabel') || item.category.toLowerCase().includes('truss')) && !item.weight) {
            reports.info.push(`Missing weight for rigging/cable: ${item.name}`);
        }

        // 2. Barcode & Serial Checks
        if (!item.isBulk) {
            if (!item.barcode) {
                reports.warnings.push(`Missing barcode on unique item: ${item.name} (ID: ${item.id})`);
            } else {
                if (barcodes.has(item.barcode)) reports.critical.push(`Duplicate Barcode detected: ${item.barcode}`);
                barcodes.add(item.barcode);
            }
        }

        if (item.serialNumber) {
            if (serials.has(item.serialNumber)) reports.critical.push(`Duplicate Serial Number detected: ${item.serialNumber}`);
            serials.add(item.serialNumber);
        }

        // 3. Hierarchy Checks
        if (item.parentId && !inventoryMap[item.parentId]) {
            reports.orphans.push(`Orphaned item: ${item.name} points to non-existent parent ID: ${item.parentId}`);
            reports.critical.push(`Orphaned item: ${item.name} (Parent: ${item.parentId})`);
        }
    }

    return reports;
}

module.exports = { sweepInventory };
