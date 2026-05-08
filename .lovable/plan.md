## Obiectiv

Înlocui sursa de date a paginii `/business-dashboard/calendar` din Cal.com cu **Google Calendar**, prin connector-ul Lovable Cloud (gateway).

## Pași

### 1. Conectare Google Calendar
- Linkez conexiunea existentă **"Jelco Personal"** (`google_calendar`) la proiect prin connector gateway. Asta face disponibile `LOVABLE_API_KEY` și `GOOGLE_CALENDAR_API_KEY` în edge functions.

### 2. Edge function nouă: `sync-google-calendar`
- Înlocuiește `sync-calcom-bookings` (păstrăm vechea funcție, doar nu mai e apelată).
- Primește `{ date }` (ISO) și opțional `{ rangeDays }` pentru fereastra de sync.
- Apelează gateway-ul:
  - `GET https://connector-gateway.lovable.dev/google_calendar/calendar/v3/calendars/primary/events?timeMin=...&timeMax=...&singleEvents=true&orderBy=startTime`
- Mapează fiecare event Google → schema `calendar_bookings`:
  - `booking_id` / `booking_uid` ← `event.id` / `event.iCalUID`
  - `title` ← `summary`
  - `description` ← `description`
  - `start_time` / `end_time` ← `start.dateTime` (sau `start.date` pentru all-day)
  - `duration` ← diferența în minute
  - `status` ← `confirmed | tentative | cancelled` din `event.status`
  - `meeting_url` ← `event.hangoutLink` sau primul `entryPoint` cu `uri` din `conferenceData`
  - `location` ← `event.location`
  - `attendees` ← array `{ email, name, responseStatus }`
  - `metadata` ← raw event JSON (pentru debugging)
  - `user_id` ← user-ul autentificat (din JWT)
- Upsert pe `(user_id, booking_uid)` ca să nu dubleze la re-sync.
- Returnează `{ count }`.

### 3. Frontend (`useCalendarBookings.ts` + `Calendar.tsx`)
- `syncMutation` apelează `sync-google-calendar` în loc de `sync-calcom-bookings`.
- Mesaj toast: "X apeluri sincronizate cu Google Calendar".
- Restul UI-ului (BookingCard, CalendarView, TodaysSummary) rămâne neschimbat — folosesc deja schema `calendar_bookings`.

### 4. DB
- Niciun migration necesar — `calendar_bookings` are deja toate câmpurile.
- Opțional: adaug constraint unique pe `(user_id, booking_uid)` dacă nu există, ca upsert să meargă curat. *(Verific întâi în migration.)*

### 5. Curățenie
- Las `sync-calcom-bookings` și secret `CAL_COM_API_KEY` pe loc (le pot șterge după ce confirmi că nu mai vrei Cal.com deloc).

## Detalii tehnice

- **Auth în edge function**: validez JWT-ul user-ului ca să asociez evenimentele cu `user_id`-ul corect (`verify_jwt = false` în config, dar verificare manuală cu `supabase.auth.getUser(token)`).
- **Fereastră sync**: default `timeMin = startOfDay(date - 1d)`, `timeMax = endOfDay(date + 30d)` ca să prind atât ziua selectată cât și apelurile viitoare afișate în dashboard.
- **Recurring events**: `singleEvents=true` expandează seriile recurente în instanțe individuale.
- **Token refresh**: gestionat automat de connector gateway — nu scriu logică custom.

## Ce confirmi înainte să încep

1. Folosim conexiunea **"Jelco Personal"** (calendarul tău primary), corect?
2. Vrei să șterg complet integrarea Cal.com (funcție + secret) sau o las ca backup?
