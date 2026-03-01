---
name: proactive-maintenance-planner
description: Generates a to-do list for the warehouse crew based on upcoming maintenance dates and frequently rented items.
---
# Proactive Maintenance Planner

Equipment fails when it's not maintained. This skill looks at the inventory to schedule downtime and DGUV V3 (PAT) testing efficiently.

## Execution Steps

1. **Fetch Inventory**
   - Load the complete equipment list.

2. **Determine Maintenance Priorities**
   - **Overdue**: Filter items where `nextMaintenanceDate` is in the past.
   - **Upcoming**: Filter items where `nextMaintenanceDate` is within the next 30 days.
   - **High-Usage Wear**: Identify items with very high `rentalCount` but no recent `lastMaintenanceDate`. (e.g., Moving heads or smoke machines that go out every weekend but haven't been serviced in 6 months).

3. **Group by Action**
   - Group the flagged equipment logically: e.g., "Lichtpulte", "Kabel (DGUV V3 Prüfungen)", "Nebelmaschinen (Reinigung)".
   - If items are inside a specific `storageLocation` (e.g., "Regal 3"), group them by location so the crew can walk through the warehouse systematically.

4. **Task Generation**
   - Create a formatted "Warehouse To-Do List" that can be handed to the technicians or printed out.
