---
name: generate-packing-lists
description: Automatically compiles comprehensive, printable packing and loading lists for all upcoming jobs within the next 7 days. Use this skill when the user asks to "create a packing list", "Ladeliste erstellen", "generate pack list", or mentions "packing-lists". Trigger when dealing with immediate event logistics and loading preparations.
---
# Generate Packing Lists

This skill assists logistics and warehouse crew by automatically generating optimized, categorized packing lists for the events of the week.

## Quick Start
To generate a packing list:
1. **Fetch Data:** Read today's date and query `jobs` with a `startDate` inside a 7-day rolling window (excluding `CANCELLED` or `COMPLETED`).
2. **Resolve Items:** For each matching job, read its `itemIds` and resolve the exact `InventoryItem` data objects.
3. **Run Grouping Script:** Pass the lists to the calculation script to group items by cases and categories.
   ```bash
   node .agent/skills/generate-packing-lists/scripts/build-lists.js
   ```
4. **Report:** Create a clean `.md` document summarizing the packing list, adding job metadata headers (Company, Job Name, Location, Dates, Contact Person). Notification via `notify_user`.

## References & Tools
- **Database Schemas:** For exact typings, see [schema.md](references/schema.md).
- **Grouping Script:** To manually check case-nesting logic, use [build-lists.js](scripts/build-lists.js).

## Detailed Logic
If running logic manually:
1. Group the required items logically by `category` (Licht, Ton, Video, Rigging, etc.).
2. If an item has a `parentId` (is packed in a case), nest it under its parent case rather than listing it independently to simplify the loading process.
3. Aggregate identical bulk items (`isBulk === true` such as cables) into singular lines reading `e.g. 5x Schukokabel 10m`.
4. Optionally, check the `JobPlans` to attach summarized lists of power distributors or DMX nodes that are required.
