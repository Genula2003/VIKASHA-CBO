# FRONTEND IMPROVEMENTS & ENGINEERING ROADMAP
**Project:** Vikasha Community-Based Organisation (CBO) Water Management Portal  
**Target Architecture:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 5  
**Author:** Senior Frontend QA Engineer & UI/UX Auditor  

---

## 1. Critical & High-Priority Fixes (Immediate Execution)

### 1.1 Strict Development & Production Port Binding
- **Current Issue:** Starting `npm run dev` defaults to port 3000, which can conflict with local apps (e.g. `ivory-vows`), pushing Vikasha CBO to port 3001 unannounced.
- **Actionable Fix:** Update `package.json` to enforce an explicit port configuration:
  ```json
  "scripts": {
    "dev": "next dev -p 3000",
    "dev:alt": "next dev -p 3001"
  }
  ```

### 1.2 Replace Server Component `redirect()` on `/bill` with Edge Route Configuration
- **Current Issue:** Invoking `redirect('/pay')` inside `app/bill/page.tsx` throws `NEXT_REDIRECT`, triggering React error boundaries in development SSR before redirecting on the client.
- **Actionable Fix:** Configure Next.js edge redirects in `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    async redirects() {
      return [
        {
          source: '/bill',
          destination: '/pay',
          permanent: false,
        },
      ];
    },
  };
  ```

---

## 2. Functionality Improvements

### 2.1 PayHere IPN Webhook Integration & Asynchronous State Polling
- **Current State:** Payment settlements are currently committed immediately in local state via `payConsumerBillDirect()`.
- **Recommended Upgrade:**
  1. Integrate PayHere / Commercial Bank IPN (Instant Payment Notification) server route (`/api/webhooks/payhere`).
  2. Implement an optimistic UI status indicator on `/pay/[token]` with polling or Supabase Realtime subscriptions to wait for the cryptographically signed bank settlement callback.

### 2.2 Offline Field Meter Reading Terminal for Remote Magammana Sectors
- **Current State:** `/meter-reader/enter-reading` relies on live network requests to `searchConsumer()` and `submitReading()`.
- **Recommended Upgrade:**
  1. Leverage `IndexedDB` or local storage caching for meter readers assigned to remote foothill routes with spotty 4G connectivity.
  2. Queue readings locally in a `pendingSyncQueue` and automatically flush them to the server when network connectivity is re-established.

---

## 3. UI/UX Quality Enhancements

### 3.1 Password Visibility Toggle on Staff Login
- **Current State:** Password field is fixed to `type="password"`.
- **Recommended Upgrade:** Add a small eye / eye-off toggle icon on the right side of the password input to reduce login errors on mobile devices.

### 3.2 Enhanced Payment Simulation Loading State
- **Current State:** Clicking 'Confirm & Settle Now' immediately shows the receipt upon Server Action resolution.
- **Recommended Upgrade:** Introduce a smooth 1.2-second bank processing overlay with animated security badges (*"Connecting to Central Bank LankaPay Switch..."*) to increase consumer trust and realism.

### 3.3 Dynamic Sinhal/English Dual-Language Toggle
- **Current State:** Eyebrow badges and cards feature bilingual text (e.g. `INFRASTRUCTURE • ජල සම්පාදන යටිතල පහසුකම්`), but body paragraphs are in English.
- **Recommended Upgrade:** Implement `next-intl` or lightweight client state to allow elderly village residents in Magammana to toggle the entire portal to 100% Sinhala.

---

## 4. Responsive Design Enhancements

### 4.1 Field Reader Numerical Keypad Optimization
- **Current State:** Meter input uses standard text input field.
- **Recommended Upgrade:** Add `inputMode="numeric"` and `pattern="[0-9]*"` to field reading inputs so mobile devices immediately summon the large numeric keypad instead of full QWERTY keyboard.

### 4.2 Compact Mobile Sticky Bar for Consumer Pay Portal
- **Current State:** On small phones, the consumer bill breakdown table requires vertical scrolling.
- **Recommended Upgrade:** Add a sticky bottom bar on mobile screens (`sm:hidden`) showing the total amount and a prominent "Settle LKR 1,121" CTA button.

---

## 5. Accessibility (a11y) Improvements (WCAG 2.1 AA)

### 5.1 Screen Reader Form Labels
- **Current State:** Search input in `/pay` relies on `placeholder`.
- **Recommended Upgrade:** Add `.sr-only` explicit `<label>` tags:
  ```tsx
  <label htmlFor="account-search-input" className="sr-only">
    Water Account Number or NIC
  </label>
  <input id="account-search-input" ... />
  ```

### 5.2 Focus Visible Rings on Interactive Buttons
- **Current State:** Some custom buttons rely on hover effects without strong keyboard focus outlines.
- **Recommended Upgrade:** Ensure all interactive elements include `focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:outline-none`.

---

## 6. Performance & Core Web Vitals Optimization

### 6.1 Image Optimization with `next/image`
- **Current State:** Images in `components/ImageSlideshow.tsx` and `app/page.tsx` use native `<img>` tags.
- **Recommended Upgrade:** Convert to `next/image` to benefit from automatic WebP/AVIF transcoding, responsive `srcset`, and blur placeholder generation, reducing LCP by an estimated 250ms.

### 6.2 Preconnect & DNS-Prefetch for External CDNs
- **Current State:** Supabase storage and Google Fonts are fetched on-demand.
- **Recommended Upgrade:** Add preconnect headers in `app/layout.tsx`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  ```
