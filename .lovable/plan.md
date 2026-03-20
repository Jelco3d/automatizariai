

# Fix Cal.com embed in Step 6 — use @calcom/embed-react

## Problem
The current iframe embed shows a 404 error. The user wants to use the official `@calcom/embed-react` package with the correct calLink.

## Changes

### 1. Install package
- Add `@calcom/embed-react` dependency

### 2. Update Step6 in `src/components/website/AuditFormModal.tsx`
- Import `Cal` and `getCalApi` from `@calcom/embed-react`
- Replace the `<iframe>` with the `<Cal>` component using:
  - `namespace="test"`
  - `calLink="jelco-erdelean-ai-automatizari/test"`
  - `config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}`
  - Dark theme with `cal-brand: "#de9f1b"`
- Add `useEffect` to initialize the Cal API with UI config

