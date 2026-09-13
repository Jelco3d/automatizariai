# Plan: Landing page webinar „Afacere care rulează singură”

## Rezultat
O pagină separată, single-page, pentru trafic din TikTok și Instagram, construită mobile-first și concentrată exclusiv pe înscrierea la webinar.

Ruta propusă: `/webinar-afacere-autonoma`

## Structură și design
- Hero asimetric: mesajul exact în stânga și o schemă operațională animată discret în dreapta.
- Direcție vizuală „blueprint operațional / cameră de control”, fără imagini stock sau aspect generic de produs AI.
- Paletă dedicată paginii: bleumarin cerneală, cyan tehnic, alb hârtie, chihlimbar pentru acțiuni și gri-albăstrui pentru text secundar.
- Titluri cu font geometric-condensat și etichete de sistem monospace; fonturile vor fi încărcate fără blocarea afișării.
- Secțiunea „Ce înveți” ca listă editorială ierarhizată, nu trei carduri identice.
- Secțiune scurtă „Pentru cine e”, urmată de formular și footer minimal cu brandul AI Automatizări și contactul existent.
- Copy-ul furnizat va fi păstrat exact.

## Formular de înscriere
- Câmpuri obligatorii: Nume, Email și Număr WhatsApp.
- Validare clară, stare de trimitere, protecție împotriva trimiterii repetate și mesajul exact de confirmare.
- Trimitere JSON către o constantă clar marcată `WEBHOOK_URL`, pregătită pentru URL-ul n8n care va fi adăugat ulterior.
- Mesaj de eroare accesibil dacă webhook-ul nu este încă configurat sau trimiterea eșuează.

## Mișcare și accesibilitate
- O singură animație orchestrată la încărcarea întregii pagini; fără animații separate la scroll.
- Varianta fără mișcare pentru utilizatorii care au această preferință activată.
- Focus foarte vizibil, etichete asociate câmpurilor, mesaje anunțate cititoarelor de ecran și contrast verificat.
- Dimensiuni și spațiere optimizate pentru telefon, fără a sacrifica prezentarea desktop.

## Integrare
- Componentă nouă dedicată paginii, încărcată la cerere prin ruta nouă din aplicație.
- Tokenuri vizuale semantice izolate pentru această temă, fără a modifica aspectul celorlalte pagini.
- Comentarii placeholder în `<head>` pentru Meta Pixel și TikTok Pixel, cu textul cerut: `// înlocuiește cu codul real de pixel`.
- Titlu și descriere relevante pentru pagina webinarului în timpul navigării.

## Verificare
- Testarea formularului pentru validare, succes și eroare.
- Verificare vizuală pe mobil și desktop, inclusiv lipsa depășirilor de ecran.
- Verificarea navigării către ruta nouă, a focusului și a consolei.
- Confirmarea că aplicația se construiește fără erori.

## Fișiere vizate
- Pagina nouă de webinar
- Configurația rutei
- Stilurile/tokenurile globale necesare temei dedicate
- `<head>` pentru placeholder-ele pixelilor
