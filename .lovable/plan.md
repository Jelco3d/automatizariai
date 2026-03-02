

# Salvare date formular in tabelul `leadmagnet-audit-strategic`

## Rezumat
Toate datele completate in formularul "Audit Strategic Gratuit" (AuditFormModal) vor fi salvate automat intr-un tabel nou in baza de date, in paralel cu trimiterea catre webhook-ul n8n existent.

## 1. Creare tabel `leadmagnet-audit-strategic`

Tabel nou cu toate campurile din formular:

| Coloana | Tip | Obligatoriu |
|---------|-----|-------------|
| id | uuid (PK) | Da |
| full_name | text | Da |
| phone | text | Da |
| email | text | Da |
| company_name | text | Da |
| business_type | text | Nu |
| business_type_other | text | Nu |
| team_size | text | Nu |
| revenue | text | Nu |
| excel_count | text | Nu |
| platforms | jsonb | Nu |
| platforms_other | text | Nu |
| time_lost | text | Nu |
| frustrations | text | Nu |
| impact_scale | integer | Nu |
| weekly_quotes | text | Nu |
| daily_interactions | text | Nu |
| motivation | text | Nu |
| budget | text | Nu |
| source | text | Nu (default: 'audit-form-modal') |
| created_at | timestamptz | Da (default: now()) |

**Politici RLS:**
- INSERT public (anonim) -- formularul e completat de vizitatori neautentificati
- SELECT/UPDATE/DELETE doar pentru admin (via `has_role`)

## 2. Modificare `AuditFormModal.tsx`

In functia `onSubmit`, dupa trimiterea catre webhook, se adauga un insert in tabelul `leadmagnet-audit-strategic` folosind clientul Supabase. Webhook-ul ramane neschimbat.

## 3. Creare pagina `src/pages/business/Leads.tsx`

- Layout identic cu celelalte pagini business (Sidebar + content area)
- Verificare autentificare
- Fetch date din `leadmagnet-audit-strategic` ordonat descrescator dupa `created_at`
- Tabel cu coloane: Nume, Firma, Telefon, Email, Tip Afacere, Echipa, Data
- Click pe rand deschide dialog cu toate detaliile lead-ului

## 4. Adaugare ruta in `App.tsx`

Ruta noua: `/business-dashboard/leads` -> componenta `Leads`

## 5. Actualizare Sidebar

Link "Leads" adaugat sub "Dashboard" cu iconita `UserPlus`.

## Fisiere afectate
- **Migrare SQL**: creare tabel + politici RLS
- **Modificat**: `src/components/website/AuditFormModal.tsx`
- **Nou**: `src/pages/business/Leads.tsx`
- **Modificat**: `src/components/admin/Sidebar.tsx`
- **Modificat**: `src/App.tsx`

