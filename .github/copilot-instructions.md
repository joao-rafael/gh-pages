# Copilot Instructions

## Project Overview
Personal portfolio page (Angular 17, standalone components) deployed to GitHub Pages. Single-page app with no routing — `app.routes.ts` is empty by design.

## Architecture

```
src/app/
├── app.component.*          # Root shell: layout, corner SVGs, fadeIn animation
├── app.config.ts            # provideRouter + provideAnimationsAsync
├── components/card/         # Reusable link card (title + external link icon)
├── services/theme.service.ts # Picks random brand color on load, sets CSS vars
└── styles/
    ├── _config.scss         # CSS variables (:root) + all @keyframes
    ├── _background.scss     # .wrapper gradients, floating blobs, .corner-svg, .mobile-bg
    ├── _layout.scss         # .wrapper layout, header, .card-row, :host typography
    └── _responsive.scss     # ≤768px overrides: hides desktop elements, shows mobile-bg
```

`app.component.scss` only imports these four partials — never add styles directly to it.

## Dynamic Theming
`ThemeService` runs at startup, picks one of 4 brand colors at random, and writes CSS custom properties to `document.documentElement`:

- `--color-primary` — used on heading, card titles, avatar border, hover states
- `--gradient-main` / `--gradient-secondary` / `--gradient-tertiary` — used throughout `_background.scss`

**When adding new themed elements**, always use `var(--color-primary)` — never hardcode hex values like `#2D54DF`. When adding new gradient values, add the CSS var to `_config.scss` `:root` and set it in `ThemeService.applyTheme()` and `buildThemeConfig()`.

## SCSS Conventions
- All `@keyframes` live exclusively in `_config.scss`
- All background/blob/SVG corner animations live in `_background.scss`
- Desktop-only elements are hidden in `_responsive.scss` via `display: none !important`
- No SCSS is written directly in `app.component.scss` — use the partials

## Component Pattern
All components are **standalone**. Example `CardComponent`:
```typescript
@Component({ selector: 'app-card', standalone: true, imports: [CommonModule], ... })
export class CardComponent {
  @Input() title: string = '';
  @Input() url: string = '';
}
```
Always use `standalone: true` and declare imports at component level.

## Mobile vs Desktop Backgrounds
- **Desktop**: animated radial gradient blobs (`.wrapper::before/after`) + fixed corner SVGs (`upper-left.svg`, etc.)
- **Mobile (≤768px)**: all desktop bg elements hidden; `.mobile-bg` shown with `mobile.svg` scrolling horizontally via `@keyframes scrollHorizontal`
- Corner SVG `<img>` tags stay in the HTML with `aria-hidden="true"` — CSS controls visibility

## Dev Commands
```bash
npm start       # ng serve → http://localhost:4200
npm run build   # production build → dist/
npm test        # Karma unit tests
```

## Accessibility Conventions
- Card `<a>` elements use `[attr.aria-label]="title + ' - abre em nova aba'"` 
- Decorative SVGs and icons use `aria-hidden="true"`
- `role="list"` / `role="listitem"` on `.card-row` and `<app-card>`
- Focus styles use `&:focus-visible` (not `:focus`) with `var(--color-primary)`
