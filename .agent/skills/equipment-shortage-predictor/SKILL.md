---
name: equipment-shortage-predictor
description: Analyzes all upcoming jobs and inventory levels to predict cross-rental needs and identify upcoming equipment shortages. Use this skill when the user asks to "check equipment shortages", "generate a dry-hire list", "Zumietliste erstellen", "find double bookings", or mentions "equipment-shortage-predictor". Trigger when dealing with future job planning to prevent empty shelves.
---
# Equipment Shortage Predictor

For an AV rental company, double-booking equipment is a nightmare. This skill looks ahead into the calendar to proactively warn about equipment shortages before they happen.

## Quick Start
To predict shortages:
1. **Fetch Data:** Read all `InventoryItem` records and `jobs` in `PLANNING`, `RESERVED`, or `PREPARED` states for the next 30-60 days.
2. **Run Prediction Script:** Pass the lists to the calculation script to find overlapping dates where Requirement > Stock.
   ```bash
   node .agent/skills/equipment-shortage-predictor/scripts/calculate-shortages.js
   ```
3. **Report:** Generate a clean "Dry-Hire List" (Zumietliste) grouped by week or specific job.

## References & Tools
- **Database Schemas:** For exact typings of `InventoryItem` and `Job`, see [schema.md](references/schema.md).
- **Calculation Script:** To manually check overlap logic or run automated checks, use [calculate-shortages.js](scripts/calculate-shortages.js).

## Detailed Logic
If running checks manually without the script:
1. For every day in the future timeline, calculate the total required quantity of every item ID across all active jobs on that specific day.
2. For bulk items (like cables) and unique items, compare the calculated maximum daily requirement against the `available` or total stock levels.
3. If Requirement > Stock, flag exactly *how many* extra units of the item need to be dry-hired and for *which date ranges*.
