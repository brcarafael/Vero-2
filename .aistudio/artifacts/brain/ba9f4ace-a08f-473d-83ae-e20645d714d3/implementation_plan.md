# Vero Trading Co. — B2B Product-Discovery & Lead-Generation Platform

## 1. Architectural Overview & Completed Transformations

The Vero Trading Co. website has been completely redesigned and rebuilt into a dedicated, publication-grade B2B commodity discovery and lead-generation platform.

### A. Full-Stack Express & Vite Architecture
- **Backend API (`server.ts`)**: Built with Express 4, mounted with Vite middlewares in development (`npm run dev`) and serving static assets in production (`npm run build` / `npm start`).
- **Endpoint `POST /api/inquiries`**:
  - Full schema and type validation for the 4 required intake fields: `name`, `email`, `company`, `products`.
  - Anti-spam honeypot detection (`honeypot` trap field) and bot timing validation (`elapsedSeconds` check).
  - Generates verifiable trade reference identifiers (`VTC-YYYYMMDD-XXXX`).
  - Persistent lead logging to `data/inquiries.json`.
  - Dispatches commercial alert queue to `rafael@verotrading.ca`.
  - Transparent, honest status returns (never simulated or faked).
- **Endpoint `GET /api/health`**: Real-time service monitoring and API readiness check.

---

## 2. Product Catalog & Deep-Linking Routing

### A. 8 Brazilian Commodities (5 Core + 3 Sourcing on Inquiry)
1. **Brazilian Green Coffee (Arabica & Conilon)**: Unroasted pale green Arabica (Strictly Soft, Fine/Good Cup) and Conilon/Robusta with authentic origin macro photography (`unroasted_green_coffee`).
2. **Brazilian Cane Sugar (ICUMSA 45 & VHP)**: Refined white crystal sugar and raw centrifugal VHP bulk sugar with authentic export sacks photography (`sugar_vhp_icumsa`).
3. **Brazilian Beans & Pulses (Edible Legumes)**: Carioca, Feijão Preto, Dark Red Kidney, and Fradinho (Cowpea) with high-res burlap and wooden scoop photography (`brazilian_beans_pulses`).
4. **Brazilian Fresh Fruits (Cold-Chain Export)**: Export cartons of Tahiti limes, Palmer mangoes, seedless grapes, and melons with authentic packing room photography (`fresh_fruits_export`).
5. **Brazilian Grain Sorghum (Feed & Energy Grain)**: Red and bronze grain sorghum crop panicles and seed clusters (`grain_sorghum_field`), strictly agricultural grain replacing all previous unrelated livestock imagery.
6. **Brazilian Soybeans (Commercial & Non-GMO)**: ANEC 41 and Identity Preserved (IP) Non-GMO soybeans with grading tray photography (`soybeans_export_crop`).
7. **Brazilian Yellow Corn (Feed Grade)**: ANEC 43 yellow feed corn in inspection scoops (`corn_yellow_feed`).
8. **Brazilian Açaí & Frozen Fruit Pulps**: Pure pasteurized frozen açaí pulp blocks and Amazonian berries in stainless food-processing facility (`acai_pulp_amazon`).

### B. Shareable Product Detail Routes (`/products/:id`)
- Deep linking support via `RouterContext` and HTML5 History API (`window.history.pushState` + `popstate`).
- Direct page refreshes and browser bookmarks load `/products/:id` directly without 404s.
- Detailed technical views featuring:
  - Export specifications and standard quality grades
  - Packaging and containerization options (25kg/50kg PP bags, 1000kg Big Bags, Bulk Container Liners, Reefers)
  - Producing regions and export port outlets (Santos, Paranaguá, Vitória, Belém)
  - Harvest calendars and peak shipping windows
  - Phytosanitary, SGS, and MAPA inspection protocols
  - One-click "Add to inquiry" and "Share technical page" actions.

---

## 3. Multi-Product Inquiry Basket & Intake Form

### A. Floating Multi-Product Basket (`InquiryBar.tsx`)
- Allows international buyers to explore commodities and click "Add to inquiry" without auto-redirecting.
- Visible floating bar displays count: *"Your inquiry — N commodities selected: [Green Coffee ×] [Cane Sugar ×]"*.
- Expanding drawer preview with one-click item removal and instant scroll to form.

### B. Streamlined 1-Step Lead Form (`LeadForm.tsx`)
- **4 Required Fields**:
  1. Products (multi-select checklist pre-filled from catalog or basket)
  2. Full Name
  3. Corporate Work Email
  4. Company Name
- **Optional Fast Details**: Country/Market, Phone/WhatsApp, Notes/Message.
- **Collapsed Technical Accordion**: Volume estimate, target packaging, preferred Incoterm (FOB/CIF), and discharge port for technical buyers.
- **Real Backend Registration**: Submits to `POST /api/inquiries`. Displays official protocol ID and timestamp.
- **Fail-Safe Email Fallback**: One-click "Open in My Email App" and "Copy Full Inquiry Text" with `mailto:rafael@verotrading.ca` and un-truncated summary text.

---

## 4. Brand Facts & Identity Alignment

- **Brand**: VERO Trading Co. (Canada Commercial Desk).
- **Central Contact**: `rafael@verotrading.ca`.
- **Origination Partner**: Brasensa (Brazilian export structure).
- **Prohibitions Respected**: No claims of exclusive representation, subsidiary status, signed contractual authority, owned inventory/farms, or fixed importer/exporter-of-record status. Internal status phrases omitted.
- **Trilingual Parity**: English (default), Portuguese, and Spanish fully synchronized across all 8 products, navigation, and intake forms.
