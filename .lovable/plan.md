# Auriu cu negru peste tot + linkuri footer funcționale

## 1. Înlocuire mov cu auriu (toate paginile)
Am găsit mov/violet/indigo în ~70 de fișiere (site public, blog, articol nou, admin, business dashboard: facturi, oferte, contracte, clienți, statistici, AI Insights etc.).
- Tot ce e mov (texte, butoane, borduri, fundaluri, iconițe, badge-uri, gradiente) devine auriu/chihlimbar, pe fundal negru-navy `#0a0e1a`.
- Articolul de blog nou (titlul cu gradient mov, rezumatul) trece pe auriu.
- Culorile cu sens (verde = plătit, roșu = întârziat/șters) rămân neschimbate, ca statusurile să fie ușor de citit.
- Paginile cu temă proprie (webinarul cu cyan/portocaliu) — rămân așa, nu au mov.

## 2. Linkuri footer pe toate paginile
Toate rutele din footer există, dar la click pagina nouă se deschide derulată jos (la footer), deci pare că linkul nu merge.
- Adaug derulare automată sus la fiecare schimbare de pagină, pe tot site-ul.
- Înlocuiesc linkurile generice GitHub/LinkedIn (duc la paginile principale ale acelor site-uri) — LinkedIn spre profilul tău (am nevoie de link), GitHub îl elimin.
- Adaug „Blog" și „Audit gratuit" în footer.
- Footerul din admin: linkul „/admin/help" nu există — îl scot.

## Detalii tehnice
- Componentă `ScrollToTop` (useLocation + window.scrollTo) montată în `App.tsx` lângă Routes.
- Înlocuire sistematică în clase Tailwind: `purple|violet|indigo|fuchsia-*` → `amber/yellow-*` echivalent ca intensitate; hex-uri mov → auriu; tokenii `.blog-article-theme` în `index.css` → primary auriu.
- Verificare cu rg că nu mai rămâne mov, plus capturi Playwright pe câteva pagini.
