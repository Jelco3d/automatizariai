# Plan: Restructurare completă formular Audit Strategic

## Structura nouă — 6 pași

### Pas 1 — Identificare și contact (toate obligatorii)

- **CUI** (text)
- **Prenume + Nume** (text)
- **Email profesional** (email)
- **Telefon / WhatsApp** (tel)
- **Rolul tău în firmă** (dropdown): Fondator / CEO / Administrator, Director operațional, Director financiar, Manager, Alt rol

### Pas 2 — Cum funcționează firma azi (opționale)

- **Cum primiți comenzile?** (multi-select): Telefon, WhatsApp, Email, Formular online, Marketplace, Reprezentanți pe teren, Altul
- **Comenzi zilnice** (dropdown): Sub 10, 10–50, 50–200, 200–500, Peste 500
- **Angajați back-office** (dropdown): 1–2, 3–5, 6–10, Peste 10
- **Cea mai mare problemă operațională** (single select): 6 opțiuni
- **Ore/săpt pe sarcini repetitive** (dropdown): Sub 5h, 5–15h, 15–30h, 30–60h, Peste 60h

### Pas 3 — Tech Stack actual (opționale)

- **ERP** (dropdown + câmp liber): Saga, WinMentor, SmartBill, Oblio, Odoo, SAP, Niciunul, Altul
- **CRM** (single select): 4 opțiuni
- **Urmărire stoc** (single select): 5 opțiuni
- **Website activ** (URL + select): Da cu vânzări, Da fără vânzări, Nu
- **Tool-uri automatizare/AI** (multi-select): ChatGPT/Claude, Zapier/Make, Power Automate, Niciun tool, Altul

### Pas 4 — Context financiar (opționale)

- **Obiectiv an** (single select): 5 opțiuni
- **Recuperare investiție 15k–50k €** (single select): 4 opțiuni
- **Investiție anterioară digitalizare** (single select): 4 opțiuni
- **Angajați evitabili prin automatizare** (dropdown): 0, 1–2, 3–5, Peste 5

### Pas 5 — Specific industrie (opționale, condiționate)

Întrebări specifice afișate în funcție de tipul afacerii selectat la Pas 2/detectat din CAEN. Grupuri: Distribuție, Construcții, Servicii, Producție. Fiecare cu 2–3 întrebări dedicate.

### Pas 6 — Rezervare Cal.com (păstrat ca acum)

## Modificări backend (migrație DB)

Adăugare coloane noi în tabelul `leadmagnet-audit-strategic`:

- `cui`, `role_in_company`, `order_channels` (jsonb), `order_channels_other`, `daily_orders`, `backoffice_employees`, `main_operational_problem`, `weekly_repetitive_hours`, `erp_software`, `erp_software_other`, `has_crm`, `stock_tracking`, `has_website`, `website_url`, `automation_tools` (jsonb), `automation_tools_other`, `yearly_objective`, `investment_recovery`, `previous_digitalization`, `employees_avoidable`, `industry_questions` (jsonb)

Coloanele vechi rămân (backwards compatible) dar nu mai sunt utilizate activ.

## Fișiere modificate

1. `**src/components/website/AuditFormModal.tsx**` — rescrie schema Zod, stepFields, stepLabels, și toate cele 5 componente Step1–Step5
2. **DB migration** — adaugă coloanele noi
3. **Webhook payload** — actualizat cu noile câmpuri

## Note

- TOTAL_STEPS rămâne 6 (5 întrebări + 1 rezervare)
- Validarea obligatorie doar pe Pas 1 (CUI, Nume, Email, Telefon, Rol)
- Pașii 2–5 sunt opționali dar au mare impact asupra calității auditului
- Pas 5 afișează întrebări condiționate pe baza selecției din câmpul „problemă operațională" sau tipul afacerii