
# Modal Formular Audit Strategic - Plan de Implementare

## Obiectiv
Inlocuirea tuturor link-urilor Calendly din butoanele CTA cu un modal care contine un formular complex de audit strategic, stilizat in tema gold/amber a brandului.

## Ce se va crea

### 1. Componenta noua: `src/components/website/AuditFormModal.tsx`
Un modal full-featured cu formular multi-sectiune, construit cu Dialog (Radix), react-hook-form + zod.

**Layout-ul modalului:**
- Background dark (#0a0e1a) cu border gold
- Header mare cu titlul "Audit Strategic Gratuit -- Recupereaza-ti timpul pierdut cu Excel-urile si platformele separate"
- Text introductiv sub titlu
- Formular scrollabil cu 4 sectiuni vizuale separate

**Campuri obligatorii (sus):**
- Nume complet, Telefon, Email, Nume firma

**Sectiunea 1 - Contextul afacerii:**
- Q1: Dropdown tipul afacerii (7 optiuni + camp "Altceva")
- Q2: Dropdown marime echipa (5 optiuni)
- Q3: Dropdown cifra de afaceri (5 optiuni)

**Sectiunea 2 - Fragmentarea actuala:**
- Q4: Dropdown nr. fisiere Excel (4 optiuni)
- Q5: Checkbox-uri multiple platforme (8 optiuni + camp "Altceva")
- Q6: Dropdown timp pierdut saptamanal (5 optiuni)
- Q7: Textarea frustrari (cu placeholder)

**Sectiunea 3 - Impact & Volum:**
- Q8: Slider/Radio 1-10 (scala impact)
- Q9: Input numeric oferte/saptamana
- Q10: Input numeric interactiuni zilnice

**Sectiunea 4 - Motivatie & Disponibilitate:**
- Q11: Textarea motivatie investitie
- Q12: Embed Calendly iframe sau dropdown date/ore
- Q13: Dropdown buget (5 optiuni)

**Buton submit:** "Trimite raspunsurile si rezerva-ti auditul gratuit" - stilizat btn-3d-gold

**Dupa submit:** Ecran de confirmare cu mesaj de multumire, trimite datele catre webhook-ul n8n existent + Facebook Pixel Lead event

### 2. Modificari in componentele CTA existente

Toate butoanele CTA care deschideau Calendly vor deschide modalul:

- **`src/components/website/HeroSection.tsx`** - butonul "Programeaza o discutie gratuita"
- **`src/components/website/CTASection.tsx`** - butonul "Programeaza Audit AI Gratuit"
- **`src/components/website/SolutionSection.tsx`** - butonul "Vreau sa automatizez si eu"

Abordare: Se va adauga state management in `src/pages/Website.tsx` pentru `isAuditModalOpen` si se va pasa callback-ul `onOpenAuditModal` catre fiecare sectiune prin props.

### 3. Pagina Website.tsx - orchestrare

- Import `AuditFormModal`
- State: `const [isAuditModalOpen, setIsAuditModalOpen] = useState(false)`
- Render `<AuditFormModal>` la nivel de pagina
- Transmite `onOpenModal` ca prop catre HeroSection, CTASection, SolutionSection

## Detalii tehnice

**Validare (Zod):**
- Campuri obligatorii: fullName, phone, email, companyName
- Email valid, telefon min 6 caractere
- Restul campurilor optionale dar recomandate

**Submit:**
- POST catre webhook-ul n8n existent (sau un endpoint nou daca se doreste)
- Payload: toate raspunsurile + metadata (timestamp, sessionId)
- Facebook Pixel: `fbq('track', 'Lead')` la submit reusit

**Stilizare:**
- Modal mare `max-w-3xl` cu ScrollArea pentru scroll intern
- Sectiuni separate cu titluri gold gradient
- Inputuri cu background `bg-yellow-900/10`, border `border-yellow-500/30`
- Labels in `text-white/80`
- Sectiune headers cu gold gradient text
- Buton submit `btn-3d-gold` cu `animate-glow-pulse`

## Fisiere afectate
1. **NOU** - `src/components/website/AuditFormModal.tsx` (componenta principala)
2. **EDIT** - `src/pages/Website.tsx` (state + render modal + props)
3. **EDIT** - `src/components/website/HeroSection.tsx` (primeste prop onOpenModal)
4. **EDIT** - `src/components/website/CTASection.tsx` (primeste prop onOpenModal)
5. **EDIT** - `src/components/website/SolutionSection.tsx` (primeste prop onOpenModal)
