# Periodic Table App

A responsive, accessible, animated Periodic Table of Elements built with React, Vite, TypeScript, Tailwind CSS, Motion (Framer Motion successor), and Heroicons.

## Features
- 18-column responsive CSS Grid approximating real periodic layout (first 20 elements seeded)
- Animated element cards with hover + tap micro-interactions
- Accessible modal dialog (focus trap, Esc close, aria-modal, labelled title)
- Code-splitting of modal via `React.lazy` + `Suspense`
- Local JSON dataset with extensible schema
- Theme toggle with persisted preference (localStorage, system fallback)
- Keyboard navigation across element cards (Arrow keys) and Enter/Space to open modal
- Tailwind custom tokens (brand palette, glass shadows, 18-col grid)

## Data Schema
`elements.json` entries:
```
{
  id: string;
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group: number;
  period: number;
  category: string;
  block: string;
  summary: string;
  color: string;
}
```

## Development
```powershell
npm install
npm run dev
```
Visit http://localhost:5173.

## Build
```powershell
npm run build
npm run preview
```

## Extending Layout
Add additional element objects to `src/data/elements.json` then update `positionMap` in `PeriodicGrid.tsx` with `atomicNumber: { col, row }`. For full table, consider generating positions algorithmically or using `grid-template-areas`.

## Accessibility Notes
- Dialog implements focus trapping and returns focus to invoker.
- Escape key closes modal.
- Uses semantic `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- High contrast focus rings via utility class `.focus-ring`.

## Future Enhancements
- Full periodic layout including Lanthanides/Actinides rows
- Advanced filters (group, block, category) with animated chips
- Compare mode for two selected elements
- Lazy load compare/insight panels
- Add tests (Jest/Vitest) for accessibility behaviors

## License
MIT (data sources credit: Bowserinator / Exabyte periodic table datasets)
