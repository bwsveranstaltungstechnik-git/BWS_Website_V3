---
name: inventory-health-sweep
description: Audits the entire inventory for overdue maintenance, missing barcodes, inconsistent data types, and orphaned items.
---
# Inventory Health Sweep

This agent skill performs a deep diagnostic audit of the entire BWS Lager inventory database. It helps warehouse managers keep their equipment pool reliable, safe, and up-to-date.

## Execution Steps

1. **Database Access**
   - Use the Supabase MCP or local fallback data stores to fetch all `InventoryItem` records.
   
2. **Maintenance Validation**
   - Identify equipment where the `nextMaintenanceDate` is in the past.
   - Flag any equipment with the `condition` set to `DEFECT` or `MAINTENANCE` that lacks an explanatory note in `maintenanceNotes`.
   - List any cables, trussing, or rigged items missing valid `weight` definitions.

3. **Barcode & IDs Audit**
   - Check if any non-bulk items (`isBulk !== true`) are missing a valid `barcode` string.
   - Detect duplicate barcodes or duplicate serial numbers across the database.

4. **Container / Case Hierarchy**
   - Find all items with a `parentId` that does not match any existing item ID in the database (Identify orphaned child items).
   - Ensure items acting as containers (`Category === 'Case/Koffer/Tasche'`) are not nested infinite-loop style, nor have invalid IDs.

5. **Report Generation**
   - Render a formatted markdown table summarizing:
     - "Critical Attention Required" (defects without notes, orphaned items)
     - "Warnings" (overdue maintenance, duplicate barcodes)
     - "Information" (missing weights, unassigned dimensions)
   - Promptly notify the user using the `notify_user` tool with these structured findings.
