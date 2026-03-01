

## Recreare pagina `/` (Website) -- Landing page cu 5 sectiuni noi

Pagina `/` va fi complet reconstruita cu urmatoarele sectiuni, inlocuind componenta curenta si toate sub-componentele existente (HeroSection, ServicesSection, BenefitsSection, TechStackSection, TestimonialsSection, CTASection).

### Structura noua a paginii

**1. HERO SECTION (full-screen)**
- Headline mare, bold, centrat cu textul despre recuperarea a 20-40 ore/saptamana
- Subheadline cu cele 3 linii (fara developeri scumpi, fara proiecte lungi, platforma gata in 7-14 zile)
- Buton CTA mare: "Rezerva-ti Auditul Strategic Gratuit de 20 minute" (link Calendly)
- Text mic sub buton: "Doar 8 locuri disponibile in aceasta luna..."
- Design: gradient purple/pink, full viewport height, animatii subtile

**2. VSL SECTION**
- Titlu deasupra video
- Video player mare (placeholder iframe/video element pentru viitorul VSL)
- Buton sub video: "Vreau sa aflu cum poti face si tu la fel" (link Calendly)

**3. PROBLEM + AGITATION**
- Titlu sectiune
- Lista cu 5 probleme (calculate oferte manual, stoc/produse expirate, echipa suprasolicitata, mesaje WhatsApp/email, lipsa timp)
- Fiecare problema cu icon relevant
- Text tranzitie de empatie

**4. SOLUTIA**
- Titlu "Exista o cale mult mai inteligenta"
- Descriere platforma interna custom cu agenti AI
- 3 puncte cheie (gata in 30 zile, fara developeri, fara proiecte lungi)
- Rezultatul: 20-40 ore recuperate

**5. SOCIAL PROOF**
- Titlu sectiune
- 3 testimoniale cu citat, nume, industrie si locatie
- Design cu carduri si iconita de citat

### Fisiere modificate

| Fisier | Actiune |
|--------|---------|
| `src/pages/Website.tsx` | Restructurare -- import componente noi |
| `src/components/website/HeroSection.tsx` | Rescriere completa cu noul continut |
| `src/components/website/VSLSection.tsx` | Fisier NOU -- sectiunea video |
| `src/components/website/ProblemSection.tsx` | Fisier NOU -- probleme + agitare |
| `src/components/website/SolutionSection.tsx` | Fisier NOU -- solutia |
| `src/components/website/TestimonialsSection.tsx` | Rescriere cu cele 3 testimoniale noi |

### Componente pastrate
- `Navigation` -- ramine la fel
- `Footer` -- ramine la fel
- `WebsiteChatbot` -- ramine la fel

### Componente eliminate din pagina
- `ServicesSection` -- nu mai apare pe pagina /
- `BenefitsSection` -- nu mai apare pe pagina /
- `TechStackSection` -- nu mai apare pe pagina /
- `CTASection` -- nu mai apare pe pagina /

Fisierele vechi nu se sterg (pot fi folosite pe alte pagini), dar nu vor mai fi importate in `Website.tsx`.

### Design
- Acelasi stil dark gradient (purple/pink) ca acum
- Tipografie mare, aeriata, usor de citit
- Responsive (mobile-first)
- Animatii subtile cu framer-motion la scroll

