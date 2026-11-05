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

---

## 5. Restrained Motion Pass & Verification

### A. Implemented Motion Specifications
1. **Responsive Product Addition (`Products.tsx`)**:
   - Immediate toggle into selected state without latency or layout shift.
   - Checkmark icon settles smoothly over 160ms with cubic-bezier curve (`animate-settle-check`).
   - Button width strictly fixed (`w-[148px] sm:w-[168px]` on main cards, `w-[124px] sm:w-[136px]` on additional sourcing cards) so neighboring "View details" link stays 100% stationary across states.
   - Immediate removal without exit animation lag.
   - Preserves user scroll position and selections across desktop and mobile.
2. **Inquiry Counter Subtle Pulse (`InquiryBar.tsx` & `Header.tsx`)**:
   - Detects `inquiryCount` value changes via `useEffect` and pulses once for 240ms (`animate-counter-pulse`).
3. **Four-Step Commercial Process Visual Sequence (`CommercialProcess.tsx`)**:
   - Desktop: Grid intersection reveals gold step labels (`Step 01`–`Step 04`) with a 60ms staggered gentle fade.
   - Mobile: Per-card `IntersectionObserver` reveals each label as its card enters view.
   - Card bodies, titles, and descriptions remain 100% visible and readable from the first frame.
   - Plays once per session; respects `prefers-reduced-motion` with immediate visibility.
4. **Hero Entrance (`Hero.tsx`)**:
   - Headlines, copy, buttons, and benefits appear immediately with no delay.
   - Framed shipping photograph container settles upward by 6px over 300ms (`animate-hero-settle`), with aspect ratio pre-reserved to prevent layout shifts.
5. **Interactive Details & Static Restraint**:
   - Product photo zoom strictly scoped inside its existing overflow-hidden frame on hover (`group-hover/photo:scale-105`).
   - "View details" link arrow moves 2.5px on hover/focus (`group-hover/link:translate-x-[2.5px] group-focus-visible/link:translate-x-[2.5px]`).
   - Card containers, facts, dividers, and actions stay stationary.
   - "How VERO Helps" cards remain completely static.
   - All motion rules disabled under `prefers-reduced-motion: reduce`.

### B. Actual Tests Performed & Verified
- **TypeScript & Linting**: `tsc --noEmit` and Vite production build passed with 0 errors.
- **Dev Server Status**: Verified HTTP 200 on `http://localhost:3000/`.
- **Inquiry Basket Flow**:
  - Initial state: Green Coffee selected (`selectedProductIds = ['green-coffee']`).
  - Added Cane Sugar: `selectedProductIds = ['green-coffee', 'cane-sugar']`, counter = 2.
  - Removed Green Coffee: `selectedProductIds = ['cane-sugar']`, Cane Sugar remains selected, counter = 1.
  - Button state switched instantaneously, scroll position remained unchanged, and no inquiry was submitted.
- **Motion & Reduced Motion Verification**: Confirmed keyframes, classes, and media query overrides in `src/index.css`.

---

## 6. Scroll-Triggered Animation Pass & Re-Arming

### A. Motion Architecture & Section Details
1. **Consistent Heading Reveal (`.heading-reveal`)**:
   - Introductory label and heading settle upward 6px with subtle fade over 320ms (`opacity: 0; transform: translateY(6px)` -> `opacity: 1; transform: translateY(0)`).
   - Early trigger margin (`rootMargin: '0px 0px -30px 0px'`) ensures headings are fully readable before the visitor reaches them.
   - Applied consistently across Products, How VERO Helps, Commercial Process, Origin & Brasensa, and Inquiry.
2. **Products Row-Level Photograph Settle (`.photo-settle`)**:
   - As each row enters view, product photographs settle from 1.025× to normal 1.0× crop.
   - Staggered by 50ms within that row (`(index % 3) * 50ms`).
   - Separate inner/outer layers preserve existing `group-hover/photo:scale-105` hover zoom.
   - Titles, facts, dividers, and buttons remain strictly stationary for easy comparison.
3. **How VERO Helps Green Icon Tiles (`.icon-tile-settle`)**:
   - After heading appears, green icon tiles settle into place in reading order.
   - Desktop: 60ms stagger across the four cards.
   - Mobile: individual cards trigger as each comes into view.
   - Number labels, card containers, and copy remain stationary.
4. **Commercial Process Internal Dividers (`.divider-draw`)**:
   - Extends the existing gold step-label sequence to draw the card divider from left to right (`scaleX(0)` to `scaleX(1)` with `transform-origin: left`).
   - Descriptions and titles remain readable throughout.
   - Mobile: follows the visitor down one step at a time.
5. **Origin & Brasensa Role Labels & Disclosure Expansion**:
   - VERO Canada and Brasensa Brazil role labels reveal in reading order with 120ms stagger.
   - Secondary approach disclosure expands gently via CSS grid-rows (`grid-rows-[1fr] opacity-100` over 300ms) with keyboard Enter/Space support and immediate closing.
6. **Inquiry Section**:
   - Animates section heading only. Fields, placeholders, product checkboxes, and submit buttons remain stationary and immediately interactive.
7. **Natural Re-Arming & Edge Stability (`useScrollReveal`)**:
   - Triggers on entry when scrolling down or back up.
   - Keeps section settled while reading.
   - Re-arms only after the section/row has fully left the viewport by a 50px buffer (`rect.bottom < -50 || rect.top > window.innerHeight + 50`).
   - Small movements near screen edges never restart animations.
   - Under `prefers-reduced-motion: reduce`, all elements are immediately visible and settled.

### B. Verification Performed
- **TypeScript & Lint Verification**: `tsc --noEmit` passed with 0 errors.
- **Production Build**: Vite build succeeded with 0 errors.
- **Dev Server Check**: HTTP 200 verified on port 3000.
- **Product Detail Navigation Persistence**:
  - Selected 2 products (Green Coffee and Cane Sugar).
  - Navigated to Product Detail view (`/products/green-coffee`).
  - Returned to homepage.
  - Confirmed both selections remained active in React state, floating inquiry basket, and localStorage.

---

## 7. Desktop Product Card Subgrid Spacing Adjustment

### A. Root Cause Identified
- The outer commodity grid defined `gap-6 sm:gap-8` (32px row and column gap).
- In CSS Grid Subgrid (`md:grid-rows-subgrid md:row-span-5`), when no explicit row-gap is provided on the subgrid, it inherits the outer grid's 32px row gap between each of the five subgrid tracks.
- Combined with individual track paddings (`pt-5 sm:pt-6`, `pt-2 pb-2`, `pt-3.5 pb-2`, `py-4 sm:py-5`), this produced excessive internal gaps (~56px above title, ~40px above description, ~46px above dividers).

### B. Targeted CSS Adjustments Applied (`Products.tsx`)
1. **Subgrid Row Gap Override (`md:gap-y-0`)**:
   - Explicitly assigned `row-gap: 0` to the card subgrid on desktop (`md:gap-y-0`).
   - The outer grid's `gap-6 sm:gap-8` between separate cards remains untouched.
2. **Internal Track Spacing Targets**:
   - **Track 2 (Photo to Product Title)**: `md:pt-[18px]` (within target 16–20 px).
   - **Track 3 (Variety Subtitle to Description)**: `md:pt-2.5` / 10px (within target 8–12 px).
   - **Track 3 to Track 4 (Description to Facts Divider)**: `md:pb-3.5` / 14px below the longest description in that row (within target 12–16 px). Shorter descriptions (e.g. Cane Sugar) naturally absorb remaining space, keeping dividers aligned with Green Coffee and Beans & Pulses.
   - **Track 4 to Track 5 (Facts List to Action Area Divider)**: `md:pb-3.5` / 14px below the tallest facts list in that row (within target 12–16 px).
   - **Track 5 (Action Area)**: `md:py-3.5` balanced padding above and below action controls.
3. **Mobile Scope Preservation**:
   - Mobile continues using `flex flex-col` where subgrid does not apply. All mobile paddings remain identical to the approved layout.

### C. Verification Performed
- **1280 px & 1440 px Desktop Side-by-Side**: Checked Green Coffee, Cane Sugar, and Beans & Pulses; verified tight photo-to-title distance, natural subtitle-to-description flow, and shared divider/button alignment.
- **Portuguese Language Wrapping**: Verified that longer Portuguese variety lines and descriptions wrap naturally without breaking card alignment or clipping text.
- **Mobile Width (375 px / 640 px)**: Confirmed mobile card appearance and spacing remain intact.

---

## 8. Desktop Top-Menu Navigation Fix

### A. Root Cause Identified
- **Issue**: Clicking "How it works", "About VERO", or "Contact" took two clicks to reach the target section.
- **Mechanism**:
  - `RouterContext.tsx` had a `window.addEventListener('hashchange', handlePopState)` listener.
  - On the first click of an in-page navigation link, the URL hash changed from e.g. `/#products` to `/#how-it-works`.
  - The `hashchange` event triggered `handlePopState`, which ran `window.scrollTo({ top: restoreY, behavior: 'instant' })`, immediately overriding the browser's scroll and snapping the user back to their previous position.
  - On the second click, the URL hash was already set, so `hashchange` did not fire, allowing the browser to finally execute the scroll.

### B. Single-Owner Navigation Architecture
1. **Decoupled Hashchange from RestoreY (`RouterContext.tsx`)**:
   - Removed `hashchange` listener conflict.
   - Updated `handlePopState` to detect whether the route view is actually changing (`isViewChanging`). In-page hash changes on the homepage are recognized and preserved without running `restoreY` resets.
2. **Cross-View Navigation with Single-Owner Scroll**:
   - Extended `navigateToHome(targetHash?: string)` to accept an optional target section ID and set `pendingScrollHash`.
   - Dedicated `useEffect` in `RouterContext.tsx` runs when `route.view === 'home' && pendingScrollHash`, waiting for the DOM to mount via `requestAnimationFrame` and executing smooth scroll with immediate state clearing. No arbitrary timeouts (`setTimeout(..., 80)`) or simulated second clicks.
3. **Exact Destinations & Direct Smooth Scroll (`Header.tsx` & `Footer.tsx`)**:
   - Destinations in all languages:
     - **How it works** → `/#how-it-works` (ID: `how-it-works`)
     - **About VERO** → `/#about-vero` (ID: `about-vero`)
     - **Contact** → `/#inquiry-form` (ID: `inquiry-form`)
     - **Products / View All** → `/#products` (ID: `products`)
   - On the homepage: `handleNavClick` uses `e.preventDefault()`, synchronizes URL hash via `history.pushState(null, '', href)`, and calls `el.scrollIntoView({ behavior: 'smooth' })`.
   - **Same-Hash Click Support**: If the visitor has already scrolled to a section (hash in URL) and manually scrolls away, clicking the link again immediately re-scrolls to the section in one click because the handler explicitly invokes `el.scrollIntoView`.
   - From a product detail page: Single click calls `navigateToHome(targetId)`, cleanly switching view and smoothly scrolling to the target section once rendered.
4. **Header Clearance**:
   - All target sections (`how-it-works`, `about-vero`, `inquiry-form`, `products`) possess `scroll-mt-20` (80px), ensuring section headings settle comfortably visible below the sticky header (~60–68px).

### C. Verification Performed
- **TypeScript & Lint Verification**: `tsc --noEmit` and Vite production build passed with 0 errors.
- **Single-Click from `/#products`**: Tested clicking each of "How it works", "About VERO", and "Contact" from `/#products`. Verified all jump to their target section in exactly 1 click with heading visible below the header.
- **Same-Hash Re-Click**: Verified clicking a menu link after manually scrolling away re-scrolls immediately on the first click.
- **Product Detail Navigation**: Verified single-click navigation from `/products/green-coffee` to each target section on home.
- **Browser Back & Inquiry Basket**: Confirmed browser Back button restores previous page state, and inquiry selections remain intact across all navigations.

