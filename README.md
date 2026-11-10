# ASPIRE INDIA — Website Redesign & MVP

**A human-centred, high-conversion, responsive web MVP for ASPIRE India (*A Society for the Promotion of Inclusive and Relevant Education*).**

Reference Website: [https://aspire-india.org/](https://aspire-india.org/)

---

## 🌟 Executive Summary & Proposition

> **Core Proposition:**  
> *"Every child has a future. Every child deserves a chance. We work with communities to make quality education possible for every child — strengthening schools, empowering teachers and opening doors to opportunity."*

This product MVP transforms ASPIRE India's digital presence from an institutional information repository into an emotionally resonant, conversion-oriented storytelling experience. It presents the **Access – Learning – Governance** ecosystem model, verified grassroots impact data, leadership credentials, and dedicated journeys for individual donors, CSR partners, and researchers.

---

## 📁 Project Architecture & Page Inventory

```
AspireIndia/
├── index.html                      # Homepage (Full 11-section narrative journey)
├── css/
│   └── styles.css                  # Master stylesheet & complete design token system
├── js/
│   └── main.js                     # Vanilla ES6+ interaction controller (WCAG 2.2 AA)
├── pages/
│   ├── about.html                  # About ASPIRE (Identity, history, beliefs)
│   ├── execution-model.html        # Execution Model (Ecosystem interactive diagram)
│   ├── programmes.html             # Core Programmes (8 verified initiatives)
│   ├── trust-accountability.html   # Trust & Accountability (Statutory disclosures, audits)
│   ├── team.html                   # Our Team (Executive leadership & field educators)
│   ├── board-advisors.html         # Board & Advisors (Dr. N.V. Varghese & governance)
│   ├── partnerships.html           # Partnerships (CSR enquiry form & collaboration tracks)
│   ├── donate.html                 # Dedicated Donation Journey (Amounts, states, FAQs)
│   └── resources.html              # Resources & Publications Archive
├── images/                         # Media asset directory
├── build_pages.py                  # Page generator & verification utility
└── README.md                       # Comprehensive documentation
```

---

## 🎨 Brand System & Design Tokens

Extracted and calibrated strictly against the official ASPIRE brand:

| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--brand-primary` | `#E8491D` | Official ASPIRE terracotta orange |
| `--brand-primary-hover` | `#D03D14` | Deepened interactive state |
| `--brand-primary-light` | `#FFEDE8` | Warm highlight tint |
| `--brand-secondary` | `#1B5E20` | Deep education forest green |
| `--brand-secondary-light`| `#E8F5E9` | Growth / verified metric tint |
| `--brand-accent` | `#FF8F00` | Sunrise gold / warm amber |
| `--brand-dark` | `#121A24` | High-contrast slate navy for footers & dark cards |
| `--text-primary` | `#1E293B` | Slate 800 for readability |
| `--text-secondary` | `#475569` | Slate 600 for body copy |
| `--text-muted` | `#64748B` | Slate 500 for captions |
| `--font-family-base` | `'Poppins', sans-serif` | Clean, modern, accessible typography |

---

## 📊 Verified Impact Data (Sourced from Official Records)

All figures incorporated into the platform are sourced from official ASPIRE annual reports and verified monitoring registers:
- **12,00,000+** Children reached (First-generation learners across 5 states)
- **80,000+** Out-of-school children reclaimed from child labour / dropouts
- **99%** School retention and transition rate maintained
- **6,400+** Government schools supported
- **14,700+** Habitations covered and organized into Child Labour Free Zones (CLFZs)
- **7,125** Anganwadi centres upgraded for early childhood development
- **5 States of operation:** Odisha, Jharkhand, West Bengal, Chhattisgarh, and Delhi

---

## 🚀 Key Features & Interaction Capabilities

### 1. Header & Navigation
- **Sticky Header Transition:** Subtly shifts to a solid background with a soft drop shadow on scroll past 100px.
- **Desktop Dropdown Menus:** Click-triggered with keyboard arrow support, Esc-to-close, and outside-click dismissal.
- **Accessible Mobile Drawer:** Smooth slide-out panel with focus trapping, accordion sub-menus, and body scroll lock.
- **Skip-to-Content Link:** Integrated for screen reader and keyboard-only accessibility.

### 2. Homepage Narrative Journey
1. **Hero Section:** Clear 5-second value proposition with primary and secondary CTAs.
2. **Mission & Vision:** Distinguishable, concise purpose statements.
3. **The ASPIRE Story:** Editorial human-first narrative on breaking generational educational barriers.
4. **Three Pillars:** Distinct cards for **Access**, **Learning**, and **Governance**.
5. **Impact Counter Animation:** Numbers count up using easeOutQuart with Indian numbering format (`12,00,000+`) and respects `prefers-reduced-motion`.
6. **Geographical Reach:** Interactive SVG map highlighting operational states (Odisha, Jharkhand, West Bengal, Chhattisgarh, Delhi) with tooltips and an accessible alternative list.
7. **Testimonial Carousel:** Auto-advancing slider with pause-on-hover, touch swipe, previous/next buttons, and dot navigation.
8. **Partner Organisations:** Government bodies, UNICEF, and institutional collaborator badges.
9. **Final Donation CTA:** High-contrast call to action leading into the donation funnel.
10. **Comprehensive Footer:** Legal status, 80G/FCRA badges, office address, and sitemap.

### 3. Dedicated Donation Flow (`pages/donate.html`)
- Preset buttons (`₹500`, `₹1,000`, `₹2,500`, `₹5,000`) and validated custom amount input.
- Real-time display updates with currency formatting.
- Client-side validation for donor name, email, 10-digit mobile, and PAN format.
- Multi-state payment feedback: Initial &rarr; Processing (with spinner) &rarr; Verified Success / Error / Pending.
- Prominent prototype disclaimer preserving transaction integrity.
- Expandable FAQ accordion addressing tax receipts and fund utilization.

### 4. Systemic Execution Model & Core Programmes
- Interactive **Ecosystem Diagram** showing the interconnected network around the child.
- Detailed breakdown of all 8 flagship programmes with target groups, geographical locations, and outcomes.

---

## ♿ Accessibility & Standards Compliance (WCAG 2.2 AA)

- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Keyboard Operability:** All buttons, dropdowns, and form fields are navigable via `Tab` and `Enter`/`Space`.
- **Focus Management:** Clear `:focus-visible` outlines and focus traps in modal drawers.
- **Reduced Motion:** Full compliance with `prefers-reduced-motion: reduce`, disabling non-essential transitions and rendering counter values instantly.
- **Screen Reader Readiness:** ARIA live regions for carousel slide transitions and form error alerts.

---

## 💻 How to View & Run Locally

Open `index.html` directly in any modern browser:
```bash
open /Users/mac/AspireIndia/index.html
```

Or run Python's built-in HTTP server:
```bash
cd /Users/mac/AspireIndia
python3 -m http.server 8080
```
Then visit `http://localhost:8080/` in your browser.

