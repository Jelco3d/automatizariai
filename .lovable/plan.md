
# Formular Progresiv (Multi-Step Wizard) - Audit Strategic

## Obiectiv
Transformarea formularului curent dintr-un formular lung cu scroll intr-un wizard progresiv cu 5 pasi, progress bar vizual si navigare inainte/inapoi.

## Structura pasilor

```text
[Pas 1] --> [Pas 2] --> [Pas 3] --> [Pas 4] --> [Pas 5] --> [Confirmare]
 Date      Context    Fragment.   Impact     Motivatie    Multumim!
 contact   afacere    actuala     & Volum    & Budget
```

**Pas 1 - Date de contact (obligatorii)**
- Nume complet, Telefon, Email, Nume firma
- Validare zod inainte de a putea trece la pasul urmator

**Pas 2 - Contextul afacerii tale**
- Tipul afacerii (dropdown + camp "Altceva")
- Marimea echipei
- Cifra de afaceri

**Pas 3 - Fragmentarea actuala**
- Nr. fisiere Excel
- Platforme folosite (checkbox-uri)
- Timp pierdut saptamanal
- Frustrari (textarea)

**Pas 4 - Impact & Volum**
- Scala impact 1-10 (slider)
- Oferte pe saptamana
- Interactiuni zilnice

**Pas 5 - Motivatie & Disponibilitate**
- Motivatie investitie (textarea)
- Calendly embed
- Buget aproximativ
- Butonul final de submit

## Elemente UI noi

1. **Progress bar** - bara gold animata in header care arata progresul (ex. "Pas 2 din 5")
2. **Butoane navigare** - "Inapoi" (stanga, outline gold) si "Continua" (dreapta, btn-3d-gold) in footer-ul fiecarui pas
3. **Animatie tranzitie** - fade + slide horizontal la schimbarea pasilor folosind framer-motion (deja instalat)
4. **Indicator pasi** - cercuri numerotate conectate cu linie, pasul activ gold, cele completate cu check

## Detalii tehnice

### Fisier modificat
- `src/components/website/AuditFormModal.tsx` - refactorizare completa

### Logica de navigare
- State: `const [currentStep, setCurrentStep] = useState(0)`
- La Pas 1: validare campuri obligatorii cu `form.trigger(["fullName", "phone", "email", "companyName"])` inainte de a avansa
- Pasii 2-4: navigare libera inainte/inapoi
- Pas 5: butonul "Trimite" face submit-ul final
- La inchidere modal: reset step la 0

### Progress bar
- Componenta `Progress` existenta din `@radix-ui/react-progress` va fi utilizata
- Valoare calculata: `((currentStep + 1) / totalSteps) * 100`
- Stilizata cu gradient gold

### Animatii
- `framer-motion` `AnimatePresence` + `motion.div` pentru tranzitii intre pasi
- Slide la dreapta cand avanseaza, slide la stanga cand se intoarce
- Fade in/out pe fiecare pas

### Indicator vizual pasi (step dots)
- 5 cercuri cu numere, conectate cu linie
- Pas curent: border gold + glow
- Pas completat: background gold + iconita check
- Pas viitor: border subtle, text muted
