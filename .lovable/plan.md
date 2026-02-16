

## Integrare Meta Pixel -- Tracking Conversii

Pixel ID-ul tau: **909322945132522**

### Ce voi face

1. **Adaug Meta Pixel in `index.html`** -- scriptul de baza care urmareste automat PageView pe toate paginile

2. **Adaug type declaration in `src/vite-env.d.ts`** -- pentru ca TypeScript sa recunoasca functia `fbq`

3. **Adaug tracking "Lead" in `src/pages/CerereOferta.tsx`** -- cand cineva trimite formularul de cerere oferta, se trimite evenimentul Lead catre Meta

4. **Adaug tracking "Contact" in `src/components/AuditChat.tsx`** -- cand cineva interactioneaza cu chat-ul de audit, se trimite evenimentul Contact

### Detalii tehnice

| Fisier | Modificare |
|--------|-----------|
| `index.html` | Adaug scriptul Meta Pixel in `<head>` cu `fbq('init', '909322945132522')` si `fbq('track', 'PageView')` |
| `src/vite-env.d.ts` | Adaug declaratia `fbq` pe `Window` |
| `src/pages/CerereOferta.tsx` | Adaug `fbq('track', 'Lead')` dupa submit-ul cu succes al formularului |
| `src/components/AuditChat.tsx` | Adaug `fbq('track', 'Contact')` la prima interactiune cu chat-ul |

### Rezultat

- Toate vizitele pe site vor fi urmarite automat (PageView)
- Cand cineva trimite o cerere de oferta, Meta va inregistra un eveniment Lead
- Cand cineva foloseste chat-ul de audit, Meta va inregistra un eveniment Contact
- Poti vedea toate datele in Meta Events Manager si le poti folosi pentru campanii de remarketing si audienta lookalike

