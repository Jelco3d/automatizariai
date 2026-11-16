# Pagina /blog în stil arhivă Substack

Refac lista de articole de pe /blog după modelul mynextbillion.com/archive, păstrând meniul și footerul site-ului și tema navy cu auriu.

## Ce vei vedea
- O coloană centrată, îngustă (~600px), pe fundal navy.
- Sus: butoane „Recente” / „Populare” (după numărul de citiri) și o lupă care deschide căutarea după titlu.
- Fiecare articol pe un rând: titlu mare și bold în stânga, subtitlul dedesubt, apoi data și autorul cu litere mici, majuscule și gri. Imaginea de copertă apare în dreapta (~160x107px). Rândurile sunt despărțite de o linie subțire.
- Pe telefon: imaginea rămâne mică în dreapta, iar textul se strânge frumos.
- Articolele fără copertă rămân fără imagine, iar textul ocupă tot rândul.
- Încărcarea arată rânduri schelet. Dacă nu există articole sau rezultate, apare un mesaj simplu.
- Caseta de abonare/CTA de sub listă rămâne, restilizată discret.

## Detalii tehnice
- `src/components/blog/BlogContent.tsx`: aduce în plus `cover_image`, `subtitle`, `views`. Sortarea e făcută pe client (după `published_at` sau `views`). Căutarea se face local, după titlu sau excerpt. Linkurile duc spre `/blog/:slug`.
- Coperțile private: se semnează la fel ca în pagina articolului, dacă e cazul.
- Doar tokeni semantici. Desktopul și pagina articolului rămân neschimbate.
