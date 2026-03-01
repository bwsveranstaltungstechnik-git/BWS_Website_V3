---
name: ui-component-consistency-check
description: Audits the React codebase for missing mobile responsiveness, standardized wrapper usage, and unhandled empty states.
---
# UI Component Consistency Check

BWS Lager relies on a high-end, responsive, and robust visual design. This skill acts as a standard compliance checker to scan newly developed UI pages or components.

## Execution Steps

1. **Target Selection**
   - Either ask the user which route/component to audit, or sweep all `/src/app/**/*.tsx` pages modified recently.

2. **Layout Compliance Check**
   - Ensure the page is wrapped correctly in `<ClientLayout>` or appropriately manages viewport rules.
   - If the component displays list or table data, ensure there is an "Empty State" (e.g., `Keine Daten gefunden`) if arrays are empty. 

3. **Mobile Responsiveness Auditing**
   - Verify that all complex grid layouts (`grid-cols-X`) are gracefully collapsed on smaller screens using standard tailwind prefixes (e.g., `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`).
   - Check horizontal menus or heavy tables for `overflow-x-auto` to prevent layout breaks on iPhones/Android devices.

4. **React Performance & Render Optimization**
   - *Memoization*: Check components that render lists or complex forms. Are filter functions, sort functions, or mapped lists wrapped in `useMemo`? Are deeply passed callbacks wrapped in `useCallback`?
   - *Lazy Loading*: If a UI component implements a large modal (`Dialog`) or a heavy dependency (like Three.js or heavy charts) that is NOT visible on initial load, strongly suggest implementing `next/dynamic`.
   - *Component Splitting*: If a UI component is massive and causes full re-renders on simple state changes (like text input), suggest splitting the stateful parts into smaller child components.

5. **Feedback Output**
   - Outline any UI anomalies and performance bottlenecks found.
   - Propose inline automated fixes (`multi_replace_file_content`) to correct missing flex wrappers, broken layouts, unresolved empty states, or missing `useMemo`/`next/dynamic`. Notify the user to approve these aesthetic shifts.
