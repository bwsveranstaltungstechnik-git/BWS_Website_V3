---
name: validate-dmx-integrity
description: Scans all inventory items and jobs to ensure DMX patches are valid, channels don't overlap, and fixtures have appropriate modes. Use this skill when the user asks to "check the DMX patch", "find DMX overlaps", "verify universe", or references "validate-dmx-integrity". Trigger when dealing with lighting plans or DMX configurations to prevent console collisions.
---

# Skill: Validate DMX Integrity

This skill ensures that the DMX data within the **BWS Fixture Builder** is consistent and valid for the target consoles.
 It helps ensure that lighting setups run smoothly without runtime collisions on the console.

## Quick Start
To validate DMX integrity for upcoming jobs:
1. **Fetch Data:** Read the `InventoryItem` and `job_plans` (`type === 'dmx'`) for active/upcoming jobs.
2. **Run Validation Script:** Pass the patched fixtures to the validation script.
   ```bash
   node .agent/skills/validate-dmx-integrity/scripts/validate-overlap.js
   ```
3. **Report:** Use `notify_user` to present any overlaps, missing modes, or orphaned patches.

## References & Tools
- **Database Schemas:** For exact typings of `InventoryItem` and `PatchedFixture`, see [schema.md](references/schema.md).
- **Validation Script:** To manually check logic or run automated overlap checks, use [validate-overlap.js](scripts/validate-overlap.js).

## Detailed Checks
If running checks manually without the script, ensure:
1. All DMX-capable items have at least one valid object in their `dmxModes` array (with `channels` and `name`).
2. No two fixtures on the same `universe` have overlapping address spaces (`address` to `address + channels - 1`).
3. Addresses are within the valid boundary (1 - 512).
4. Patched fixtures mapped in the job plan correspond to valid, existing `barcode` strings in the inventory database.
