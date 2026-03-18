

# Plan: Fix Remaining Performance Issues (94 → 95+)

Three root causes remain:

## 1. CLS 0.321 — Background orbs cause layout shift
The `div.absolute > div.absolute` elements (lines 23-28 in `Website.tsx`) with `animate-pulse` are the layout shift culprits identified by Lighthouse.

**Fix in `src/pages/Website.tsx`:**
- Add `will-change: transform` and explicit fixed dimensions via inline styles
- Replace `animate-pulse` (which animates `opacity`) with a CSS animation using only `transform: scale()` so no layout recalculation occurs
- Add `contain: layout style paint` to the orbs container to isolate it from layout flow

## 2. Main bundle 901 KiB — All routes eagerly imported
`App.tsx` imports 30+ page components eagerly. Only the `/` route matters for initial load.

**Fix in `src/App.tsx`:**
- Lazy-load ALL route components except `Website` (the homepage at `/`)
- Wrap `<Routes>` in `<Suspense fallback={null}>`
- This should cut the initial bundle by ~60%

## 3. LCP element render delay (2,660ms)
The H1 in `HeroSection` uses framer-motion with `initial={{ opacity: 0 }}` — the element is invisible until JS runs the animation. This delays LCP.

**Fix in `src/components/website/HeroSection.tsx`:**
- Remove `initial`/`animate` from the H1 (the LCP element) — render it immediately without animation
- Keep animations on non-LCP elements (badge, subtitle, metrics)

## Files modified
1. `src/App.tsx` — lazy-load all non-homepage routes
2. `src/pages/Website.tsx` — fix orbs container with `contain` and transform-only animations
3. `src/components/website/HeroSection.tsx` — remove animation from LCP H1 element
4. `src/index.css` — add a transform-based pulse animation for orbs

