

# Plan: Optimize Website Performance (Lighthouse 95+)

The Lighthouse report shows **FCP 25.5s, LCP 38.4s, Performance score 31**. The main culprits are:

1. **Loom embed** — loads ~2MB of JS vendor bundles, causing 14 long tasks (biggest: 1,191ms)
2. **Render-blocking Google Fonts** (910ms savings)
3. **Non-composited CSS animations** (box-shadow, left property)
4. **Missing accessibility attributes** (button names, iframe titles, link names)
5. **Framer Motion** loaded eagerly for below-fold sections

## Changes

### 1. Lazy-load Loom embed (biggest impact — eliminates ~2MB JS)
**`src/components/website/VSLSection.tsx`**
- Replace the always-loaded `<iframe>` with a static thumbnail + play button
- Only load the Loom iframe when user clicks play (using `useState`)
- Use Loom thumbnail URL: `https://cdn.loom.com/sessions/thumbnails/1e8e609e6b73490ba33fa5a4b0c091aa-...jpg`
- Add `loading="lazy"` and `title` attribute to iframe when loaded

### 2. Fix render-blocking Google Fonts
**`index.html`**
- Change the `@import` in `src/index.css` to use `<link rel="preload" as="style">` pattern with `media="print" onload="this.media='all'"` for non-blocking load
- Add `font-display: swap` fallback

**`src/index.css`**
- Remove the `@import url('https://fonts.googleapis.com/css2?...')` line (move to HTML with async loading)

### 3. Fix non-composited animations (CLS impact)
**`src/index.css`**
- Replace `box-shadow` animations with `opacity` or `filter` (composited properties)
- For `logo-glow`: use `filter: drop-shadow()` instead of `box-shadow` animation, or use `will-change: filter`
- For `btn-shimmer`: replace `left` animation with `transform: translateX()` (already partially done, but the keyframe uses `left`)
- For `glow-pulse`: same approach — use `filter` instead of `box-shadow`

### 4. Add missing accessibility attributes
**Multiple files:**
- `Navigation.tsx`: Add `aria-label="Meniu"` to hamburger button, `aria-label` to icon-only links
- `VSLSection.tsx`: Add `title="Video prezentare"` to iframe
- `Footer.tsx`: Add `aria-label` to icon-only social links (GitHub, LinkedIn, Mail)
- `WebsiteChatbot.tsx`: Ensure chat bubble has accessible name (already has `aria-label`)
- `Website.tsx`: Add `<main>` landmark wrapper

### 5. Lazy-load below-fold sections
**`src/pages/Website.tsx`**
- Use `React.lazy()` + `Suspense` for ProblemSection, SolutionSection, TestimonialsSection, CTASection, Footer, WebsiteChatbot
- This reduces initial JS bundle

### 6. Defer 3rd-party scripts
**`index.html`**
- Add `defer` to GTM script (it already has `async`)
- Add `loading="lazy"` approach for Meta Pixel — load after page interaction or after a delay

## Files modified
1. `src/index.css` — remove font import, fix animations
2. `index.html` — async font loading, defer 3rd-party scripts  
3. `src/components/website/VSLSection.tsx` — lazy Loom embed with click-to-play
4. `src/pages/Website.tsx` — add `<main>` landmark, lazy-load below-fold sections
5. `src/components/website/Navigation.tsx` — accessibility labels
6. `src/components/website/Footer.tsx` — accessibility labels

## Expected impact
- **Loom lazy-load**: Eliminates ~2MB JS + 1.2s blocking time → FCP/LCP drop massively
- **Font fix**: -910ms render-blocking
- **Animation fixes**: CLS → 0, removes jank warnings
- **Accessibility**: 84 → 95+
- **Lazy sections**: Reduces initial bundle ~30%

