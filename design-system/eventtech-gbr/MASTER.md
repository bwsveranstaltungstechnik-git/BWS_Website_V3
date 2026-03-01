# EventTech GbR - UI/UX Pro Max Design System

## 1. Core Identity & Theme
- **Product Type**: Event Equipment Rental / B2B & B2C Service
- **Style Concept**: "Liquid Premium" (Dark Mode First, Glassmorphism, Neon Accents)
- **Primary Stack**: HTML5 + Tailwind CSS + Material Symbols

## 2. Color Palette (Dark Mode Optimized)
- **Background Base**: `#111821` (Slate-900 / Background-Dark)
- **Surface Level 1**: `rgba(255, 255, 255, 0.03)` (Glass Container)
- **Surface Level 2**: `rgba(255, 255, 255, 0.08)` (Glass Hover / High)
- **Text Primary**: `#F1F5F9` (Slate-100)
- **Text Secondary**: `#94A3B8` (Slate-400)
- **Text Muted**: `#64748B` (Slate-500)

### Accents per Category:
- **General / UI Active**: `#3B82F6` (Blue-500)
- **Lichttechnik**: `#F59E0B` (Amber-500)
- **Tontechnik**: `#06B6D4` (Cyan-500)
- **Zubehör / Legal**: `#22C55E` (Green-500)
- **DJ Service**: `#A855F7` (Purple-500)
- **Impressionen**: `#D946EF` (Fuchsia/Magenta-500)

## 3. Typography
- **Primary Font**: `Inter` (Google Fonts)
- **Font Weights**:
  - `font-light (300)` for large decorative text.
  - `font-medium (500)` for secondary text.
  - `font-bold (700)` for standard headings.
  - `font-black (900)` for Hero Headings / Extreme emphasis.
- **Tracking/Spacing**: `tracking-tighter` (-0.05em) for large `font-black` headings to give a modern, compact look. `tracking-widest` for uppercase micro-labels.

## 4. UI Components & Effects

### Glassmorphism System (`.liquid-glass`)
- **Base Glass**: `bg-white/5 backdrop-blur-md border border-white/10`
- **Hover State**: Enhance background opacity slightly and add colored glow based on category. Include `transition-all duration-300`.

### Cards & Interactive Elements
- **Requirement**: All interactive cards MUST have `cursor-pointer`.
- **Hover Micro-interactions**: Use `group` on the parent, and `group-hover:scale-105` or `group-hover:translate-x-1` on children (images, icons).
- **Shadows**: Use colored shadows for call-to-action buttons (e.g., `shadow-[0_0_20px_rgba(245,158,11,0.3)]` for Amber buttons).

### Icons
- **System**: Material Symbols Outlined.
- **Usage**: Always pair text labels with relevant icons for scannability.
- **Anti-pattern**: No emojis (🎨, 🚀) anywhere in the UI.

## 5. Layout & Spacing
- **Container**: Max width `max-w-7xl` with `mx-auto` and `px-6` (or `px-4 lg:px-8`).
- **Navbar**: Sticky top, `backdrop-filter: blur(12px)`, translucent background. Must use `z-50`.
- **Spacing**: Use generous padding (`py-12`, `py-24`) to let content breathe.

## 6. UX Pre-Delivery Checklist Reminders
- [ ] No emojis as icons.
- [ ] Stable hover states (no layout shifting, use `border-transparent` -> `border-color`).
- [ ] `cursor-pointer` on all interactive divs.
- [ ] Clear visual feedback on hover.
- [ ] Smooth transitions (`duration-200` or `duration-300`).
- [ ] Good text contrast (Avoid gray-600 on dark backgrounds).
- [ ] Sticky navbar avoids overlapping with absolute headers.
