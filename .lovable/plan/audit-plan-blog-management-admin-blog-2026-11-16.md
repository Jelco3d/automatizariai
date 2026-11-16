# Audit + Plan: Blog Management (/admin/blog)

## 1. Inventar – ce există azi

### Rute
| Rută | Stare |
|---|---|
| /admin, /admin/blog, /admin/blog/new, /admin/categories, /admin/blog/comments, /admin/blog/analytics, /admin/blog/settings | Doar UI cu date mock |
| /blog (listă), /blog/:slug, /blog/automatizari-ai | Funcțional, dar conținut static în cod |

Notă: Categories e pe /admin/categories, nu /admin/blog/categories.

### Ce e funcțional vs. mock
- **AdminBlog**: cardurile 24/8/16 (StatsCards) și tabelul de 3 rânduri (RecentPosts) sunt valori scrise de mână. Doar căutarea e stare locală; nu citește nimic din bază.
- **NewBlogPost**: formular fără salvare.
- **Categories, Comments**: liste fictive, butoanele nu fac nimic.
- **BlogAnalytics**: grafic cu cifre inventate.
- **BlogSettings**: "Save" arată doar un toast, nu salvează.
- **Blog public**: articolele sunt fișiere în cod (`src/data/blog-posts/`, `AutomatizariAI.tsx`), cu SEO/JSON-LD funcțional. Orice articol nou cere programare.

### Bază de date, storage, auth
- **Nu există** tabele de blog (posts, categories, tags, comments, views).
- Există `user_roles` + `has_role()` security definer; enum `app_role` = admin, user (lipsește `editor`).
- Există `profiles` (id, full_name).
- Buckets: `audit-reports` (public), `invoice-logos` (public), `payable-invoices-pdfs` (privat). Niciun bucket pentru imagini de blog.
- **Risc critic azi**: rutele /admin/* nu au nicio protecție (fără verificare de login sau rol). Acum nu e grav pentru că totul e mock, dar devine critic imediat ce se conectează la date.

## 2. Schema propusă

- `app_role`: adăugăm valoarea `editor`.
- **blog_categories**: id, name, slug (unic), description, created_at.
- **blog_tags**: id, name, slug (unic).
- **blog_posts**: id, title, slug (unic), excerpt, content (markdown), cover_image, status (enum `post_status`: draft, scheduled, published, archived), published_at, scheduled_at, author_id (uuid, fără FK spre auth.users), category_id → blog_categories (ON DELETE SET NULL), seo_title, seo_description, og_image, reading_time (int), views (int, default 0), created_at, updated_at.
  - Indexuri: (status, published_at desc), category_id.
  - Trigger: updated_at; reading_time calculat din content; validare (scheduled cere scheduled_at, published setează published_at dacă lipsește) — trigger, nu CHECK.
- **blog_post_tags**: post_id, tag_id (PK compus, CASCADE).
- **blog_comments**: id, post_id (CASCADE), parent_id (opțional, răspunsuri), author_name, author_email, content, status (enum: pending, approved, spam), ip_hash, created_at.
- **blog_post_views**: id, post_id, viewed_at, session_hash, referrer. Incrementarea `views` printr-o funcție `increment_post_view(slug)` security definer (anti-abuz simplu: o vizualizare/sesiune/zi).
- **blog_settings**: key/value (titlu blog, comentarii on/off, moderare).
- Bucket nou **blog-images** (public la citire).

## 3. Politici RLS

- Helper: `is_blog_staff(uid)` = has_role admin OR editor.
- **blog_posts**: anon+auth SELECT unde `status='published' AND published_at <= now()`; staff ALL. Editorul poate fi limitat la propriile postări la UPDATE/DELETE (de decis); admin totul.
- **categories/tags/post_tags**: SELECT public; scriere doar staff.
- **blog_comments**: INSERT anon/auth doar cu `status='pending'` și pe postări publicate; SELECT public doar `approved`; staff SELECT/UPDATE/DELETE tot. Email-ul comentatorului nu e expus public (citire publică printr-un view fără email).
- **blog_post_views**: fără acces direct; doar prin funcție; staff SELECT.
- **blog_settings**: SELECT public pentru chei non-sensibile; scriere doar admin.
- **storage blog-images**: citire publică; upload/ștergere doar staff.
- Postările programate devin vizibile automat la `published_at <= now()`; opțional un job pg_cron care schimbă statusul scheduled → published.

## 4. Pași de implementare (în ordine)

1. **DB + securitate**: enum editor, tabele, grant-uri, RLS, funcții, bucket. Protecție /admin/* (login + rol admin/editor) și pagină de login.
2. **Admin CRUD**: listă postări reală (filtre status, căutare, paginare), statistici reale în carduri, ștergere/arhivare, categorii și tag-uri CRUD.
3. **Editor**: editor markdown cu previzualizare, upload copertă, slug auto + verificare unicitate, câmpuri SEO, salvare draft/programare/publicare, autosave.
4. **Blog public + SEO**: /blog și /blog/:slug citesc din bază; păstrăm articolele existente din cod (le migrăm în bază sau le lăsăm ca rute statice); meta, JSON-LD, sitemap generat din postările publicate.
5. **Comentarii**: formular public (pending), anti-spam (honeypot + limită), moderare în admin.
6. **Analytics**: înregistrare vizualizări, grafice reale pe zile/postare, top articole.
7. **AI assist** (Lovable AI): generare titlu/excerpt/SEO, outline, rescriere paragrafe, prin funcție backend accesibilă doar staff.

## 5. Riscuri

- **Admin neprotejat** – trebuie rezolvat înainte de orice conectare la date.
- **Sitemap static + SEO**: site-ul e SPA; postările din bază au meta setate în browser. Google le indexează, dar rețelele sociale pot să nu vadă OG-ul corect. Pe Vercel se poate adăuga ulterior pre-randare.
- **Sitemap**: trebuie regenerat (funcție backend) — azi e fișier static, pentru două domenii.
- **Migrarea articolelor existente**: risc de pierdere SEO dacă se schimbă slug-urile; păstrăm aceleași URL-uri.
- **Spam la comentarii** și umflarea vizualizărilor – limitare și hash de sesiune.
- **Conținut HTML nesigur** – randare markdown sanitizată (fără HTML brut).
- **Rol editor**: adăugarea unei valori în enum nu afectează politicile existente, dar trebuie decis ce poate editorul (doar propriile postări?).
- Stil: totul în tema auriu/negru existentă, mobil-first.

## Întrebări deschise
- Editorul poate publica sau doar trimite spre aprobare?
- Migrăm cele 2 articole existente în bază sau rămân în cod?
- Editor markdown sau vizual (WYSIWYG)?
