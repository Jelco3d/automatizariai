# Audit viteză încărcare + reparații

## Ce am găsit (măsurat pe site-ul publicat, telefon)
Nu există încă destule date de la vizitatori reali, așa că am măsurat eu 5 pagini (acasă, servicii, client portal, blog, audit gratuit).
- **Cauza principală:** logo-ul site-ului are **2,2 MB** (imagine 1024x1536) și se descarcă de **două ori** pe fiecare pagină (iconița din tab + preîncărcare) — ~4,4 MB din totalul de ~4,8 MB per pagină. Pe date mobile asta face site-ul să pară foarte lent.
- Codul site-ului (213 KB) și Facebook Pixel (~190 KB) sunt normale.
- **Video-ul de pe homepage (Loom):** se încarcă deja doar la click, deci nu încetinește pagina; după click durează cât încarcă playerul Loom.
- **Calendly:** se deschide într-o filă nouă pe site-ul Calendly; viteza lui depinde de Calendly, nu de site-ul tău.

## Ce repar
1. Fac variante mici ale logo-ului: iconiță tab 64x64 (~5 KB) și logo pentru pagină (~256 px, WebP, ~20 KB). Le folosesc peste tot în loc de fișierul de 2,2 MB. Elimin preîncărcarea dublă.
2. Video homepage: conectare anticipată la Loom (când utilizatorul ajunge lângă video) și imagine de previzualizare ușoară, ca playerul să pornească mai repede la click.
3. Calendly: conectare anticipată la Calendly când pagina se încarcă, plus scot parametrul fix „luna 2026-10” din link (deschide direct luna curentă).
4. Re-măsor toate paginile după publicare și îți arăt înainte/după.

Ținta: pagina sub ~600 KB în loc de ~4,8 MB (de ~8 ori mai puțin).

## Detalii tehnice
- Generare cu PIL: `public/favicon-64.png`, `public/lovable-uploads/logo-256.webp` (+ png fallback pentru JSON-LD/og). Actualizez `index.html` (icon, eliminare `<link rel=preload>` pentru logo) și componentele care afișează logo-ul.
- `<link rel="preconnect">` pentru `https://www.loom.com` și `https://calendly.com` / `assets.calendly.com`.
- Linkul Calendly în `Website.tsx` și `ClientPortalSystem.tsx` fără `?month=2026-10`.
