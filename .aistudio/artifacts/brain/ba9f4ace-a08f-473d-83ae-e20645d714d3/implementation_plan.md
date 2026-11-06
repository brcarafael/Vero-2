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

---

## 9. Visual Redesign of "About VERO" Section (`#about-vero`)

### A. Architectural & Compositional Enhancements
1. **Desktop Two-Column Opening & Alignment**:
   - Aligned outer bounds with Hero and Product Grid (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
   - Clean 50/50 two-column opening (`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`):
     - **Left column (6 cols)**: Eyebrow label (`t.partnership.tag`), editorial headline (`t.partnership.headline`) with `text-balance`, and introduction (`t.partnership.intro`).
     - **Right column (6 cols)**: Custom vector map of the Americas sitting directly on the native cream canvas (`#FAF7EF`) without any artificial card enclosure or box shadow.
2. **Geographically Accurate Americas Map (`AmericasMap.tsx` & `americasMapPaths.ts`)**:
   - Sourced from Natural Earth 110m vectors with Miller cylindrical projection.
   - Continental landmasses rendered in warm, muted tones (`fill="#EDE4D0"`, `stroke="#DFD5BE"`).
   - Canada and Brazil highlighted in signature deep forest green (`#0B3D2E` / `#064E3B`).
   - Country-level markers placed at verified geographic centroids (Canada: `297.7, 165.6` in southeastern Ontario/Quebec corridor; Brazil: `454.7, 441.2` in central Goiás/Brasília corridor).
   - Joined with a fine curved coordination line (`M 297.7,165.6 C 395,245 450,340 454.7,441.2`) free of shipping arrows, ports, or pins.
   - Text labels (`VERO · Canada` / `VERO · Canadá` and `Brasensa · Brazil` / `Brasensa · Brasil`) with halo stroke (`paintOrder="stroke" stroke="#FAF7EF" strokeWidth="4"`) ensuring 100% legibility against the cream background and any intersecting contours.
3. **One-Time Motion Storytelling**:
   - Scroll-triggered reveal powered by `useScrollReveal`: when `#about-vero` enters view, the markers fade/scale in and the coordinating arc draws over 700ms (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Once completed, the illustration remains stably visible; scrolling slightly up or down does not re-trigger or flicker.
   - Strictly respects `prefers-reduced-motion`: markers and the full line are immediately visible on initial render with transitions disabled.
4. **Compact Role Descriptions Band**:
   - Positioned directly beneath the two-column opening with `border-t border-[#E5DEC9]`.
   - Replaced separate floating cards with a unified 2-column horizontal band featuring a subtle hairline vertical divider (`md:divide-x md:divide-[#E5DEC9]`) and generous horizontal padding (`md:pr-10 lg:pr-14` / `md:pl-10 lg:pl-14`).
   - Vertically aligned country/role labels, company names, and descriptive prose.
5. **Full-Row Accessible Disclosure**:
   - Moved closer to the role descriptions band (`mt-8 pt-6 border-t border-[#E5DEC9]`).
   - Expanded the interactive click area to the full row with `-mx-3.5 px-3.5 py-3 rounded-xl hover:bg-[#F5EFE3]/70` and visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-[#0B3D2E]`).
   - Smooth animated expansion/collapse of the 3 approach steps without layout shifts.
6. **Mobile-Optimized Stacking & Responsive ViewBox**:
   - Natural vertical reading order on mobile: (1) Heading & Intro → (2) Americas Map → (3) Role Descriptions → (4) Approach Disclosure.
   - Mobile SVG switches to tight Americas crop (`viewBox="100 65 440 475"`), scaling Canada, Brazil, and both labels up by ~25% while maintaining a compact height (~340px) so the buyer flows seamlessly into the role descriptions.

### B. Verification Checks Completed
- **English Preview (`en`)**:
  - Desktop (1440px / 1280px): Verified two-column balance, map alignment, and non-overlapping labels.
  - Mobile (375px / 414px): Verified stacked order, compact map crop, and readable text labels.
- **Portuguese Preview (`pt`)**:
  - Verified `VERO · Canadá` and `Brasensa · Brasil` map labels.
  - Verified Portuguese headline (`Seu contato no Canadá. Conectado à origem brasileira.`) wraps cleanly into 2 lines.
  - Verified role descriptions and approach steps display with 0 overflow.
- **Spanish Preview (`es`)**:
  - Verified `VERO · Canadá` and `Brasensa · Brasil` map labels.
  - Verified Spanish headline (`Su contacto en Canadá. Conectado al origen brasileño.`) wraps cleanly.
- **Reduced Motion**: Verified that enabling `prefers-reduced-motion` renders the complete map and line immediately without animation.
- **Navigation & Sticky Offset**: Verified that single-click navigation to `/#about-vero` from header, footer, and product pages correctly offsets by `scroll-mt-20` (80px), keeping the section heading completely visible below the fixed header.
- **Build & Quality Check**: `npm run build` and `tsc --noEmit` passed with 0 errors.

---

## 10. Three Targeted Fixes: Header Menu, Responsive Map, and Section Heading

### A. Fix 1: Header Menu After Scrolling (`Header.tsx`)
1. **Root Cause Analysis**:
   - When the user scrolled past 15px, `isScrolled` applied `backdrop-blur-md` directly to `<header>`.
   - By W3C CSS specification, `backdrop-filter` creates a new containing block for all `position: fixed` descendants.
   - Consequently, the mobile navigation drawer (`fixed inset-0`) was constrained to `<header>`'s 60px height and overflow-clipped.
   - On desktop, the backdrop-filter stacking context combined with animated sibling transforms caused dropdown interaction and clipping issues after scrolling.
2. **Applied Solutions**:
   - **Background Layer Isolation**: Removed `backdrop-blur-md` from the `<header>` element itself and moved it to an absolute inset child `<div>` (`absolute inset-0 -z-10 pointer-events-none`). This eliminates containing block entrapment.
   - **Portal Rendering**: Rendered the mobile navigation drawer using React Portal (`createPortal(drawer, document.body)`), ensuring it sits directly on `document.body` with `fixed inset-0 z-[100] h-dvh max-h-screen overflow-y-auto`.
   - **Scroll Position Lock**: Implemented body overflow locking (`document.body.style.overflow = 'hidden'`) on mobile menu open that preserves the exact `window.scrollY` position upon closing.
   - **Dismissal & Keyboard Handlers**:
     - Added global `Escape` key listener closing both desktop dropdown and mobile drawer.
     - Added outside click listener for desktop dropdown and close button/backdrop for mobile drawer.
     - Added single-click link activation that closes menus and scrolls immediately to target sections.
   - **Accessibility & ARIA**: Synced `aria-expanded`, `aria-controls`, `aria-haspopup`, and `role="dialog"` attributes.

### B. Fix 2: Responsive Americas Map & HTML Labels (`AmericasMap.tsx` & `americasMapPaths.ts`)
1. **Root Cause Analysis**:
   - Northern Canada geometry reaches $y = -29.3$. Previous viewBox starting at $y = 0$ (and mobile crop at $y = 65$) chopped off northern Canada islands.
   - SVG `<text>` elements scaled down proportionally with viewport width, reducing to ~6–7 CSS pixels on mobile screens.
   - ViewBox differences between desktop and mobile caused layout shifts on resize or orientation change.
2. **Applied Solutions**:
   - **Unified Geometrically Complete ViewBox**: Set `AMERICAS_VIEWBOX = '-10 -45 540 680'` in `americasMapPaths.ts` covering all continental and island geometry ($Y$ from $-45$ to $635$, $X$ from $-10$ to $530$) with zero cropping.
   - **Contain-Style Scaling**: Placed SVG in an `aspect-[540/680]` container with `preserveAspectRatio="xMidYMid meet"`, maintaining identical proportions across all screens without layout shift.
   - **Responsive HTML Overlay Labels**:
     - Positioned labels as responsive HTML elements relative to container dimensions: Canada at `left: 56.98%, top: 30.97%` and Brazil at `left: 86.06%, top: 71.50%`.
     - Scaled between 12px and 14px (`text-xs sm:text-[13px] md:text-sm font-bold text-[#0B3D2E]`) with high-contrast cream background badge (`bg-[#FAF7EF]/95 shadow-2xs border border-[#0B3D2E]/20`), guaranteeing crisp legibility on 320px–1920px viewports.
   - **Persistent Reveal Without Flicker**: Added `hasAnimated` flag so once revealed, the map and connecting line remain permanently visible without scroll flicker.
   - **Smooth 700ms Animation & Reduced Motion**: Preserved smooth 700ms coordination line drawing and 350ms marker scaling, immediately settling when `prefers-reduced-motion` is enabled.

### C. Fix 3: Clarified Section Heading (`copy.ts`)
1. **Replaced Previous Heading**: Updated the About VERO section headline across all three languages:
   - **English (EN)**: `"Brazilian products. Your commercial contact in Canada."`
   - **Portuguese (PT)**: `"Produtos brasileiros. Seu contato comercial no Canadá."`
   - **Spanish (ES)**: `"Productos brasileños. Su contacto comercial en Canadá."`
2. **Maintained Content Continuity**: All introduction paragraphs, company descriptions (VERO Canada, Brasensa Brazil), approach disclosures, and inquiry paths preserved exactly as approved.

### D. Comprehensive Verification
- **Compilation & Linting**: `compile_applet` passed and `lint_applet` (`tsc --noEmit`) completed with 0 errors.
- **Header Navigation at All Scroll Positions**:
  - Tested menu trigger at top of page ($Y = 0$), mid-page ($Y = 1200$), and bottom of page ($Y = 2800$). Menu opens on first click at all scroll positions.
  - Desktop products dropdown opens cleanly above page content without clipping or containing block bugs.
  - Mobile drawer scrolls full viewport height smoothly; escape key closes menu; closing preserves visitor's exact scroll position.
  - Single-click on "How it works", "About VERO", and "Contact" jumps directly to section with heading visible below sticky header (`scroll-mt-20`).
- **Map Responsiveness Across Viewports**:
  - 360px & 390px (Mobile): Northern Canada islands fully visible (no top crop); company labels clear and legible at 12 CSS px.
  - 768px (Tablet) & 1440px (Desktop): Seamless two-column alignment, intact geometry, and connecting line drawing smoothly into Brazil.
- **Trilingual Rendering**: Verified English, Portuguese, and Spanish text wrapping, character encodings, and layout stability.

---

## 11. Custom-Sourcing Card Addition in "Explore our products" Grid

### A. Architectural & Visual Integration (`Products.tsx`)
1. **Grid Position & Responsive Layout**:
   - Added as the 6th card in the main commodities grid immediately following Grain Sorghum (`CORE_PRODUCTS.map(...)` + `<CustomSourcingCard />`).
   - Desktop (`lg:grid-cols-3`): Creates a balanced $2 \times 3$ grid of 6 cards.
   - Tablet (`md:grid-cols-2`): Placed as the 6th item, completing row 3 ($3 \times 2$ grid).
   - Mobile (`grid-cols-1`): Flows naturally in reading order immediately below Sorghum.
2. **Visual Consistency & Subgrid Alignment**:
   - Shares the same card dimensions, rounded corners (`rounded-2xl`), border styling, and CSS subgrid tracks (`md:grid md:grid-rows-subgrid md:row-span-5 md:gap-y-0`).
   - Light green background (`bg-[#F2F7F4]`) with subtle green border (`border-[#CCDDCF]`), deep forest-green typography (`#0B3D2E`), and crisp accents (`#064E3B`).
   - Area corresponding to neighboring cards' photos uses an identical `aspect-[16/10]` illustration area with an outline `Package` and `Search` magnifying-glass composition, dot-matrix motif, and scroll-triggered settle animation.
   - Controlled track spacing: Track 2 (`md:pt-[18px]`), Track 3 (`md:pt-2.5 md:pb-3.5`), Track 4 facts divider (`md:pb-3.5`), and Track 5 action area (`md:py-3.5`) aligning with neighboring cards' bottom controls.

### B. Content & Trilingual Copy
1. **Card Content**:
   - **Title**: *"Looking for another product?"* (PT: *"Procura outro produto?"*, ES: *"¿Busca otro producto?"*)
   - **Subtitle**: *"Sourcing around your requirements"* (PT: *"Originação sob medida para sua demanda"*, ES: *"Abastecimiento según sus requisitos"*)
   - **Description**: *"Tell us what you’re looking for. We can explore sourcing options and assess suitable suppliers based on your product, quality and destination requirements."*
   - **Three Fact Rows**:
     - Search icon: *"Products beyond our catalog"*
     - Sliders icon: *"Your specifications guide the search"*
     - Message icon: *"Start with a brief description"*
   - **Primary Action**: *"Tell us what you need"* (PT: *"Diga-nos o que precisa"*, ES: *"Díganos qué necesita"*)

### C. Inquiry State & Form Workflow Integration
1. **Reusing 'Other' Option (`InquiryContext.tsx`, `LeadForm.tsx`, `InquiryBar.tsx`)**:
   - Added `'other'` to `ProductId` union type.
   - Clicking *"Tell us what you need"* executes `handleCustomSourcingClick`:
     - Calls `addProduct('other')` without clearing or modifying existing product selections.
     - Performs working single-click navigation down to `#inquiry-form` (`scrollToInquiryForm()` on home, or `navigateToHome('inquiry-form')` from detail views).
     - Focuses `#inquiry-message` textarea so the buyer can type their specifications immediately.
     - Repeated clicks reuse the existing `'other'` selection without toggling it off.
2. **Contextual Placeholder & Visible Label**:
   - In `LeadForm.tsx`, the 'other' option is labeled: *"Other / custom sourcing"* (PT: *"Outro / demanda personalizada"*, ES: *"Otro / abastecimiento personalizado"*).
   - If `other` is selected and the message field is empty, the textarea displays:
     *"Which product are you looking for? Add any requirements you already know."*
     (PT: *"Qual produto você procura? Adicione os requisitos que você já tiver."*, ES: *"¿Qué producto está buscando? Indique cualquier requisito que ya conozca."*)
   - All entered message text and contact fields are strictly preserved.
3. **Backend Submission Verification**:
   - Verified that `POST /api/inquiries` accepts `{ id: 'other', name: 'Other / custom sourcing' }`, logs the payload to `data/inquiries.json`, and returns verified reference ID.



