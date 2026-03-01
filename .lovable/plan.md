

# Butoane Premium 3D cu Animatii Moderne

## Obiectiv
Transformarea tuturor butoanelor CTA din site intr-un stil premium cu efect 3D, shadow-uri stratificate, shimmer si animatii moderne.

---

## Abordare

### 1. Clasa CSS globala `.btn-3d-gold` in `src/index.css`

Se creaza o clasa reutilizabila care contine:
- **3D depth**: `box-shadow` cu multiple layere (inset shadow pentru iluminare de sus, shadow exterior gold pentru glow, shadow negru pentru profunzime)
- **Gradient imbunatatit**: `linear-gradient` cu 3 opriri (yellow-300, amber-400, amber-500) pentru efect de volum
- **Border subtil**: `border-bottom: 2px solid rgba(0,0,0,0.2)` pentru efect de buton ridicat
- **Shimmer animation**: Pseudo-element `::after` cu gradient alb translucent care se misca pe suprafata butonului
- **Hover state**: La hover, shadow-ul creste, butonul se ridica cu `translateY(-2px)`, glow-ul se intensifica
- **Active/pressed state**: La click, `translateY(1px)` si shadow redus pentru efect de apasare fizica
- **Tranzitie smooth**: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

Keyframes noi:
- `btn-shimmer`: sweep diagonal pe suprafata butonului (la hover)
- Glow pulse imbunatatit cu layere 3D

### 2. Actualizare butoane in toate componentele (13 fisiere)

Se inlocuiesc clasele flat actuale cu noua clasa `.btn-3d-gold` plus clasele Tailwind specifice fiecarui buton (size, padding etc).

**Fisiere afectate:**
1. `src/components/website/HeroSection.tsx` - buton principal hero
2. `src/components/website/CTASection.tsx` - buton CTA final
3. `src/components/website/SolutionSection.tsx` - buton "Vreau sa automatizez"
4. `src/components/website/VSLSection.tsx` - buton sub video
5. `src/components/website/services/CTASection.tsx` - buton CTA servicii
6. `src/components/website/services/PricingPlans.tsx` - 3 butoane pricing
7. `src/components/portfolio/CTASection.tsx` - buton CTA portofoliu
8. `src/components/website/Navigation.tsx` - buton din meniu lateral
9. `src/pages/AuditGratuit.tsx` - buton CTA audit
10. `src/pages/AboutUs.tsx` - 2 butoane (profil + CTA final)
11. `src/pages/Contact.tsx` - buton consultatie

---

## Detalii Tehnice

### CSS nou in `src/index.css`:

```text
.btn-3d-gold {
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  box-shadow:
    0 4px 15px rgba(250, 204, 21, 0.4),
    0 8px 30px rgba(250, 204, 21, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-3d-gold:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 8px 25px rgba(250, 204, 21, 0.5),
    0 15px 40px rgba(250, 204, 21, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15);
}

.btn-3d-gold:active {
  transform: translateY(1px) scale(0.98);
  box-shadow:
    0 2px 8px rgba(250, 204, 21, 0.3),
    inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-3d-gold::after {
  /* shimmer sweep */
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: btn-shimmer 3s ease-in-out infinite;
}
```

### Aplicare pe butoane

Fiecare buton va primi:
- Clasa `.btn-3d-gold` pentru efectele 3D/shadow/shimmer
- Se pastreaza `text-black font-bold` si dimensiunile specifice (px, py, h-auto)
- Se elimina `bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600` (inlocuit de clasa CSS)
- Se pastreaza `animate-glow-pulse` doar pe butoanele hero/CTA principale (nu pe toate)
- Se elimina `shadow-lg shadow-yellow-500/20` (gestionat de clasa)
- Se pastreaza `rounded-xl` si alte clase de layout

