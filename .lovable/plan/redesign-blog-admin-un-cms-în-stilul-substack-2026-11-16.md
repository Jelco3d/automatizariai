# Redesign Blog Admin: un CMS în stilul Substack

Toate funcțiile, datele, rutele și permisiunile de acum rămân la fel. Textele rămân în română.

## Ce face fiecare pagină acum
- **Dashboard (/admin/blog):** 3 carduri cu cifre reale (Total, Ciorne, Publicate), plus tabelul de articole cu căutare, vizualizare, editare și ștergere. Fiecare pagină își are propriul meniu lateral.
- **Editor (new / edit):** titlu, slug automat, rezumat, editor vizual TipTap, imagine principală, categorie, autor, câmpuri SEO și status (ciornă, programat, publicat, arhivat).
- **Categorii (/admin/categories):** adaugă, editează și șterge categorii. Arată numărul de articole din fiecare.
- **Comentarii:** tab-uri În așteptare / Aprobate / Spam. Le poți aproba, marca ca spam sau șterge.
- **Analytics:** citiri pe 7, 30 sau 90 de zile, top articole, surse de trafic.
- **Setări:** titlu, descriere, autor implicit și un buton care pornește sau oprește comentariile. Doar adminul le poate salva.

## Aspect
- Bază albă și gri foarte deschis, text aproape negru, margini subțiri, carduri rotunjite fără umbre grele.
- **Auriul brandului** este singurul accent: butoanele principale, meniul activ și lucrurile importante.
- **Etichete de status colorate:** verde = publicat, chihlimbar = ciornă, albastru = programat, roșu = spam.
- **Fonturi:** titlurile articolelor și textul din editor folosesc Lora (serif). Restul interfeței rămâne pe fontul actual.
- **Mod închis:** un buton îl comută. Alegerea se ține minte și se aplică doar în zona de admin a blogului.
- **Încărcare și erori:** schelete de încărcare, notificări la fiecare acțiune, confirmare înainte de orice ștergere.
- **Pe ecrane mici:** sub 1024px meniul devine sertar, iar tabelele devin carduri.

## Structură comună
- **Meniu lateral:** logo, „Postare nouă”, apoi Dashboard, Articole, Categorii, Comentarii (cu numărul celor în așteptare), Analytics și Setări. Jos: „Vezi blogul” și meniul contului. Meniul se poate restrânge la iconițe.
- **Bara de sus:** titlul paginii, o scurtă descriere și acțiunile paginii. Căutarea rapidă ⌘K sare la articole, pagini și acțiuni.
- **Breadcrumbs** pe paginile din interior, de exemplu „Articole / Editare”.

## Pagini
1. **Dashboard:** salut („Bună, {nume}”) și butonul „Scrie o postare nouă”. 4 carduri: Vizualizări 30 de zile, Publicate, Comentarii noi și Timp mediu de citire, fiecare cu diferența față de perioada anterioară și un mini-grafic. Mai jos: graficul de citiri (7/30/90 zile), „Continuă să scrii” (ultimele 3 ciorne), „Cele mai citite” (top 5) și „Activitate recentă” (comentarii cu Aprobă și Răspunde).
2. **Articole (rută nouă /admin/blog/posts):**
   - Tab-uri cu număr: Toate, Publicate, Ciorne, Programate.
   - Căutare, filtru pe categorie, sortare după dată sau citiri, comutare între listă și grilă.
   - Pe fiecare rând: imaginea, titlul serif, rezumatul, categoria, statusul, data, citirile și comentariile. Acțiunile apar la hover, plus un meniu „⋯”.
   - Selecție multiplă cu bară de acțiuni: publică, mută în ciorne, schimbă categoria, șterge.
   - Paginare și o stare goală frumoasă când nu există articole.
3. **Editor:**
   - Coloană centrată de 720px, cu titlu serif mare și subtitlu.
   - Imaginea principală se pune prin tragere sau click, și poate fi înlocuită sau scoasă.
   - Editorul actual primește un meniu care apare la selectarea textului și un meniu „/” (titlu, imagine, citat, cod, separator, video YouTube).
   - Bara de sus rămâne fixă: înapoi, „Salvat acum 5s”, cuvinte și minute de citire, Previzualizare și Publică (cu opțiunea „Programează”).
   - Panoul lateral „Setări postare”: slug, categorie, tag-uri, rezumat, SEO (cu previzualizare Google și numărători de caractere), imagine pentru rețele sociale, autor, data publicării și comentarii pornite sau oprite.
   - Salvare automată (la ciorne), avertisment dacă pleci cu modificări nesalvate, ⌘S salvează, ⌘⇧P publică.
4. **Comentarii:** stil inbox, cu tab-urile În așteptare, Aprobate, Spam și Coș, fiecare cu număr. Pe fiecare comentariu: avatar, nume, email, cât timp a trecut, textul și articolul. Acțiuni: Aprobă, Răspunde (răspunsul tău apare imediat pe site), Spam, Șterge (merge în Coș). Acțiuni în masă și taste rapide (j/k pentru navigare, a pentru aprobare). Când nu e nimic: „Totul e la zi 🎉”.
5. **Categorii (rută nouă /admin/blog/categories):** lista în stânga, cu culoare, slug, număr de articole și ordine prin tragere. Formularul e în dreapta. La ștergere, confirmarea spune câte articole sunt afectate.
6. **Analytics:** alegi perioada (7z / 30z / 90z / interval propriu). Sus: vizualizări, vizitatori unici, timp mediu pe articol și rata comentariilor. Mai jos: graficul mare, top articole cu bare, surse de trafic, categorii și dispozitive. Unde nu sunt încă date, apare o stare goală, nu cifre inventate.
7. **Setări:** sub-meniu cu General, SEO implicit, Comentarii, Autori, Integrări și Zonă periculoasă. Bara „Salvează modificările” apare doar când ai ceva de salvat.

## Date noi (adăugate)
- **Categorii:** culoare și ordine.
- **Articole:** subtitlu și comentarii pornite sau oprite pentru fiecare articol în parte.
- **Comentarii:** statusul „Coș” și marcarea răspunsurilor date de admin.
- **Măsurare citiri, doar de acum înainte:** timpul petrecut pe articol, tipul de dispozitiv (telefon, tabletă, desktop) și vizitatorii unici.
- **Setări noi:** SEO implicit, logo, favicon și cuvinte anti-spam.

## Rămâne de făcut după redesign
- **Integrări:** secțiunea apare, dar nu conectează încă nimic.
- **„Autori”:** arată conturile cu rol de admin sau editor. Invitarea unor oameni noi nu se face de aici.
- **Cifrele noi din Analytics** pornesc de la 0, pentru că nu există date vechi.

## Detalii tehnice
- **Migrație aditivă:**
  - `blog_categories.color`, `sort_order`
  - `blog_posts.subtitle`, `allow_comments` (default true)
  - enum `comment_status` + `trash`; `blog_comments.is_staff_reply`
  - `blog_post_views.device`, `duration_seconds`
  - RPC `record_post_read_time(_view_id, _seconds)`. `increment_post_view` va returna id-ul și va primi device.
  - Inserarea comentariilor publice verifică `allow_comments`. Staff-ul poate insera răspunsuri aprobate direct.
- **Fișiere noi:**
  - `src/components/admin/blog/`: `BlogAdminLayout`, `BlogSidebar`, `CommandPalette`, `PageHeader`, `StatCard`, `StatusBadge`, `EmptyState`, `ConfirmDialog`, `SlideOverPanel`, `Sparkline`
  - `src/hooks/useBlogAdmin.ts` (react-query: posts, comments, stats)
  - Tema: clasa `.blog-admin` cu tokeni HSL light și `.dark` în `index.css`; Lora prin Google Fonts
- **Rute:** `/admin/blog/posts` și `/admin/blog/categories` sunt noi. `/admin/categories` redirecționează. Toate rămân în `BlogStaffGuard`.
- **Pagina publică a articolului:**
  - trimite device-ul și durata citirii (beacon la ieșire)
  - arată subtitlul
  - ascunde formularul de comentarii dacă `allow_comments` e false
  - marchează răspunsurile adminului
- **Ordine:** layout + tokeni → Dashboard → Articole → Editor → Comentarii → Categorii → Analytics → Setări. După fiecare pagină: verificare cu Playwright pe desktop și mobil, în modul luminos și închis, inclusiv CRUD și guard.
