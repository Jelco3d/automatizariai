

# Redesign Complet - Aliniere Vizuala cu Pagina Acasa

## Obiectiv
Toate paginile secundare (Servicii, Audit Gratuit, Despre Noi, Portofoliu, Contact) folosesc inca tema veche purple/pink. Le aliniem la tema premium gold/amber de pe pagina principala.

---

## Schimbari Globale pe Toate Paginile

**Background**: `bg-[#0a0e1a]` in loc de `bg-[#1A1F2C]` sau `bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C]`

**Orbs animate**: Gold/amber (`bg-yellow-500/[0.07]`, `bg-amber-500/[0.05]`) in loc de purple/blue

**Gradient-uri text**: `from-yellow-300 to-amber-400` in loc de `from-purple-400 to-pink-300/600`

**Accent culori**: `text-yellow-400` in loc de `text-purple-400`

**Borders**: `border-white/[0.06]`, hover `border-yellow-400/30` in loc de `border-purple-500/20-50`

**Cards**: `bg-white/[0.03]` cu `border-white/[0.08]` in loc de `bg-[#1A1F2C]/80 border-purple-500/50`

**Butoane CTA**: `from-yellow-400 to-amber-500 text-black` in loc de `from-purple-500 to-pink-500 text-white`

**Dividers** intre sectiuni: `via-yellow-400/20` pattern din homepage

---

## 1. Services.tsx (pagina principala)
- Background: `bg-[#0a0e1a]`
- Orbs: gold/amber, pointer-events-none
- Adaugare dividers intre sectiuni

## 2. ServicesHero.tsx
- Gradient heading: `from-yellow-300 to-amber-400`
- Adaugare motion animations (fade-in)
- Padding ajustat `pt-32`

## 3. DetailedServices.tsx
- Cards: `bg-white/[0.03] border-white/[0.08]` cu hover `border-yellow-400/30`
- Icons: `text-yellow-400` in loc de `text-purple-400`
- Arrow icons: `text-yellow-400/60`
- Adaugare hover shadow `shadow-yellow-500/[0.05]`

## 4. PricingPlans.tsx
- Heading gradient: gold
- Cards: aceeasi tema `bg-white/[0.03]`
- Preturi: `text-yellow-400` in loc de `text-purple-400`
- "Cel Mai Popular" badge: `from-yellow-400 to-amber-500 text-black`
- Butoane: `from-yellow-400 to-amber-500 text-black`
- Arrow icons: `text-yellow-400/60`

## 5. CaseStudies.tsx (services)
- Heading + accent colors: gold
- Cards tema consistenta

## 6. TechnicalCapabilities.tsx
- Heading, icons, cards: gold theme

## 7. IntegrationOptions.tsx
- Heading: gold
- Grid items: `bg-white/[0.04] border border-white/[0.08]` cu hover effects

## 8. CTASection.tsx (services)
- Heading + buton: gold theme

## 9. AuditGratuit.tsx
- Background: `bg-[#0a0e1a]`
- Orbs: gold/amber
- Hero heading: "AUDIT GRATUIT!" ramane alb, gradient text devine gold
- "Cum functioneaza" heading: gold
- Step cards: `bg-white/[0.03] border-white/[0.08]`, icon circles `from-yellow-400 to-amber-500`
- "Next Steps" card: `from-yellow-400/10 to-amber-500/5`, border `border-yellow-400/20`
- CTA buton: gold theme cu glow

## 10. AboutUs.tsx
- Background: `bg-[#0a0e1a]`
- Adaugare orbs animate gold
- Founder card: `bg-white/[0.03] border-white/[0.08]`, name `text-yellow-400`
- Button: gold CTA
- "Povestea Noastra" heading: gold gradient
- Mission/Values cards: gold accents
- Culture badges: `bg-yellow-400/10`
- Final CTA: gold button cu glow

## 11. Portfolio.tsx
- Background: `bg-[#0a0e1a]`
- Adaugare orbs animate

## 12. PortfolioHero.tsx
- Heading gradient: gold

## 13. CategoryFilters.tsx
- Active: `bg-yellow-400 text-black` in loc de `bg-purple-500 text-white`
- Inactive: `border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10`

## 14. CaseStudyCard.tsx
- Card: `bg-white/[0.03] border-white/[0.08]` hover `border-yellow-400/30`
- Client name: `text-yellow-400`
- Before/After bg: `bg-yellow-400/5`
- Sub-headings: `text-yellow-400`
- Icons: `text-yellow-400`

## 15. CTASection.tsx (portfolio)
- Heading alb, buton gold

## 16. Contact.tsx
- Background: `bg-[#0a0e1a]`
- Orbs: gold/amber
- Heading gradient: gold
- Cards: `bg-white/[0.03] border-white/[0.08]`
- Icon containers: `bg-yellow-400/10`
- Icons: `text-yellow-400`
- Hover links: `hover:text-yellow-400`
- Buton consultatie: gold CTA

---

## Detalii Tehnice

**Fisiere modificate (16 fisiere):**
1. `src/pages/Services.tsx`
2. `src/components/website/services/ServicesHero.tsx`
3. `src/components/website/services/DetailedServices.tsx`
4. `src/components/website/services/PricingPlans.tsx`
5. `src/components/website/services/CaseStudies.tsx`
6. `src/components/website/services/TechnicalCapabilities.tsx`
7. `src/components/website/services/IntegrationOptions.tsx`
8. `src/components/website/services/CTASection.tsx`
9. `src/pages/AuditGratuit.tsx`
10. `src/pages/AboutUs.tsx`
11. `src/pages/Portfolio.tsx`
12. `src/components/portfolio/PortfolioHero.tsx`
13. `src/components/portfolio/CategoryFilters.tsx`
14. `src/components/portfolio/CaseStudyCard.tsx`
15. `src/components/portfolio/CTASection.tsx`
16. `src/pages/Contact.tsx`

**Paleta unificata (identica cu homepage):**
- Background: `#0a0e1a`
- Accent primar: `yellow-400` / `amber-500`
- Text: `white`, `white/60`, `white/40`, `white/50`
- Borders: `white/[0.06]`, `white/[0.08]`
- Card bg: `white/[0.03]`
- CTA buttons: `from-yellow-400 to-amber-500`, text negru, glow pulse
- Orbs: `yellow-500/[0.07]`, `amber-500/[0.05]`

