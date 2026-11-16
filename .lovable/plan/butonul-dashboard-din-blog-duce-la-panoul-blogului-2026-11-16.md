# Butonul „Dashboard" din blog duce la panoul blogului

## Ce se schimbă
- În meniul lateral din `/admin/blog`, butonul **Dashboard** și logo-ul vor deschide panoul blogului (pagina cu cifrele: total articole, publicate, ciorne și lista de articole), nu panoul de business.
- Când ești pe panoul blogului, „Dashboard" apare evidențiat cu auriu.
- Restul meniului (Articole, Articol nou, Categorii, Comentarii, Statistici, Setări) rămâne neschimbat.

## Detalii tehnice
- `src/pages/admin/AdminBlog.tsx`: cele două `Link to="/admin"` (logo + Dashboard) devin `to="/admin/blog"`; Dashboard primește stilul activ.
- Ruta `/admin` redirecționează spre `/admin/blog`, ca orice link vechi către `/admin` să ajungă tot la panoul blogului.
