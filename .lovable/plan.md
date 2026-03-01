
# Pagina Servicii - Aliniere Culori + Servicii Noi

## 1. Aliniere culori cu Homepage

Pagina Services foloseste `bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C]` (mov), iar Homepage-ul foloseste `bg-[#0a0e1a]` (negru inchis) cu orb-uri gold subtile.

### Modificari in `src/pages/Services.tsx`:
- Inlocuire background mov cu `bg-[#0a0e1a]` (identic cu Homepage)
- Inlocuire orb-urile mov/blue cu orb-uri gold/amber subtile (identice cu cele din Homepage)
- Adaugare dividers gold intre sectiuni (ca pe Homepage)

## 2. Servicii noi in DetailedServices

### Modificari in `src/components/website/services/DetailedServices.tsx`:
Inlocuire cele 6 servicii generice cu cele 3 servicii specifice cerute:

1. **Creare Platforme Interne Personalizate** - Platforme custom construite pe nevoile afacerii, de la CRM-uri la dashboarduri interne
2. **Integrare Agenti AI Personalizati** - Agenti AI antrenati pe datele si procesele specifice ale afacerii
3. **Automatizari Personalizate** - Fluxuri de lucru automatizate adaptate proceselor unice ale companiei

Fiecare card va avea iconita, titlu, descriere si 3 bullet points cu beneficii concrete. Se pastreaza stilul vizual existent (cards cu glass effect, hover gold border).

## 3. Eliminare Footer duplicat

Pagina Services nu include `<Footer />` -- se adauga pentru consistenta cu Homepage.

---

## Fisiere modificate
1. `src/pages/Services.tsx` - background + orb-uri + dividers + Footer
2. `src/components/website/services/DetailedServices.tsx` - cele 3 servicii noi
