
# Optimizare Mobile pentru Toate Paginile

## Principiu
Toate modificarile vizeaza exclusiv viewport-ul mobil (sub 768px). Desktop-ul ramane neschimbat prin folosirea claselor `md:` existente.

## Fisiere afectate si modificari

### 1. `src/components/website/AuditFormModal.tsx`
- Modalul devine full-screen pe mobil: `max-w-2xl` -> `w-full h-full md:w-auto md:h-auto md:max-w-2xl md:max-h-[90vh] md:rounded-lg rounded-none`
- Padding header redus pe mobil: `p-6` -> `p-4 md:p-6`
- Step indicators mai mici pe mobil: `w-8 h-8` -> `w-6 h-6 md:w-8 md:h-8`, text `text-[9px] md:text-xs`
- Padding continut: `px-6 py-4` -> `px-4 py-3 md:px-6 md:py-4`
- Footer navigare: `p-4` -> `p-3 md:p-4`

### 2. `src/components/website/Navigation.tsx`
- Logo mai mic pe mobil: `w-14 h-14` -> `w-11 h-11 md:w-14 md:h-14`
- Text sub logo: `text-[10px]` -> `text-[8px] md:text-[10px]`
- Padding nav: `py-2` -> `py-1.5 md:py-2`

### 3. `src/components/website/HeroSection.tsx`
- Padding top redus: `pt-32` -> `pt-24 md:pt-44` (deja exista partial)
- Metrici card-uri: `py-5 px-3` -> `py-3 px-2 md:py-5 md:px-3`
- Valori metrici: `text-3xl` -> `text-2xl md:text-3xl`
- Buton CTA: `px-10 py-7` -> `px-6 py-5 md:px-10 md:py-7`, `text-base` -> `text-sm md:text-base`

### 4. `src/components/website/VSLSection.tsx`
- Padding sectiune: `py-10` -> `py-6 md:py-10`
- Titlu: `text-2xl` -> `text-xl md:text-2xl`

### 5. `src/components/website/ProblemSection.tsx`
- Padding sectiune: `py-10` -> `py-6 md:py-10`
- Spatiu intre items: `space-y-5` -> `space-y-3 md:space-y-5`
- Card padding: `p-5` -> `p-3.5 md:p-5`
- Text bottom: `text-xl` -> `text-lg md:text-xl`

### 6. `src/components/website/SolutionSection.tsx`
- Padding sectiune: `py-10` -> `py-6 md:py-10`
- Rezultat card padding: `p-8` -> `p-5 md:p-8`

### 7. `src/components/website/TestimonialsSection.tsx`
- Padding sectiune: `py-10` -> `py-6 md:py-10`
- Card padding: `p-6` -> `p-4 md:p-6`

### 8. `src/components/website/CTASection.tsx`
- Padding sectiune: `py-16` -> `py-10 md:py-16`
- Buton: `px-10 py-7` -> `px-6 py-5 md:px-10 md:py-7`

### 9. `src/components/website/Footer.tsx`
- Padding: `py-16` -> `py-10 md:py-16`
- Gap intre coloane: `gap-12` -> `gap-8 md:gap-12`

### 10. `src/pages/AboutUs.tsx`
- Padding top sectiuni: `pt-32` -> `pt-24 md:pt-32`
- Avatar: `w-48 h-48` -> `w-32 h-32 md:w-48 md:h-48`
- Card padding: `p-8` -> `p-5 md:p-8`
- Sectiuni py: `py-16` -> `py-10 md:py-16`
- Cultura grid: `grid-cols-2` -> `grid-cols-2` (ramane, dar padding `p-4` -> `p-3 md:p-4`)

### 11. `src/pages/Contact.tsx`
- Padding top: `py-32` -> `py-24 md:py-32`
- Card padding: `p-8` -> `p-5 md:p-8`
- Titlu: `text-4xl` -> `text-3xl md:text-4xl`

### 12. `src/pages/Portfolio.tsx` si componente
- `PortfolioHero.tsx`: `pt-32` -> `pt-24 md:pt-32`, subtitle `text-xl` -> `text-base md:text-xl`
- `CaseStudyCard.tsx`: padding `p-6` -> `p-4 md:p-6`
- `CategoryFilters.tsx`: gap `gap-2` -> `gap-1.5 md:gap-2`

### 13. `src/pages/Services.tsx` si componente
- `ServicesHero.tsx`: `pt-32` -> `pt-24 md:pt-32`
- `DetailedServices.tsx`: padding `py-16` -> `py-10 md:py-16`, card `p-6` -> `p-4 md:p-6`
- `TechnicalCapabilities.tsx`: grid `grid-cols-1 md:grid-cols-4` -> `grid-cols-2 md:grid-cols-4`, `py-16` -> `py-10 md:py-16`
- `IntegrationOptions.tsx`: `py-16` -> `py-10 md:py-16`, `p-6` -> `p-4 md:p-6`
- `CaseStudies.tsx`: `py-16` -> `py-10 md:py-16`, `p-6` -> `p-4 md:p-6`
- `CTASection (services)`: `py-16` -> `py-10 md:py-16`

### 14. `src/pages/FidelizarePacienti.tsx`
- Sectiuni `py-16` -> `py-10 md:py-16`
- Hero padding: `py-16 md:py-24` exista deja, ok
- Cards padding: `p-8` -> `p-5 md:p-8`
- Final CTA: `p-12` -> `p-6 md:p-12`, buton `px-12 py-8` -> `px-6 py-5 md:px-12 md:py-8`

## Rezumat
~20 fisiere cu modificari minore de Tailwind classes, exclusiv pe mobile. Niciun breakpoint desktop nu se schimba.
