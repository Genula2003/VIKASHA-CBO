# FRONTEND BUG AUDIT & DEFECT CLASSIFICATION REPORT
**Project:** Vikasha CBO Water Management Portal (Magammana)  
**QA Lead:** Senior Frontend QA Engineer  
**Date:** October 18, 2026  
**Audit Scope:** Full Codebase Inspection, Dynamic HTTP Auditing, Security & Input Sanitization  

---

## Defect Summary by Severity

| Severity Level | Definition | Total Count |
|---|---|:---:|
| **CRITICAL** | Page crash, critical data loss, or total inability to use essential features | **0** |
| **HIGH** | Major functionality broken, severe environment conflicts, or major UX failure | **1** |
| **MEDIUM** | Partial functional defects, server component redirect quirks, or missing config | **2** |
| **LOW** | Cosmetic defects, minor accessibility tags, or duplicate SEO aliases | **2** |
| **TOTAL BUGS** | | **5** |

---

## Detailed Bug Reports

### BUG-001: Localhost Port 3000 Collision with Background Process
- **Bug ID:** `BUG-ENV-001`
- **Page Name & Route:** Global Development Runtime (`http://localhost:3000`)
- **Severity:** `HIGH`
- **Status:** `Open`
- **Related File & Line:** `package.json:6` (`"dev": "next dev"`)
- **Description:**  
  When starting the local Next.js development server via `npm run dev`, port 3000 was already bound by an unrelated external process (PID 15920: `ivory-vows`). Next.js automatically stepped to port 3001 without failing or aborting. Any hardcoded callback URLs, browser bookmarks, or webhooks pointed at port 3000 resolve to the wrong website, returning 404 for all Vikasha CBO endpoints.
- **Steps to Reproduce:**
  1. Have an active Node process listening on port 3000.
  2. Execute `npm run dev` in `VIKASHA-CBO-main`.
  3. Send an HTTP request to `http://localhost:3000/pay`.
- **Expected Result:**  
  Server fails fast or explicitly warns the user, or developer specifies explicit port flag `next dev -p 3001`.
- **Actual Result:**  
  Port 3000 returns `Ivory & Vows` 404 response; Vikasha CBO runs on port 3001 unannounced.
- **Evidence:**  
  `netstat -ano | findstr 3964` -> `TCP 0.0.0.0:3001 LISTENING 3964 (Vikasha CBO)`
- **Recommended Solution:**  
  Update `package.json` dev script to enforce an explicit port or check port availability:
  ```json
  "scripts": {
    "dev": "next dev -p 3000"
  }
  ```

---

### BUG-002: Server Component `redirect()` on `/bill` Triggers Client-Side Fallback Error
- **Bug ID:** `BUG-RTE-002`
- **Page Name & Route:** Bill Lookup Root (`/bill`)
- **Severity:** `MEDIUM`
- **Status:** `Open`
- **Related File & Line:** `app/bill/page.tsx:4` (`redirect('/pay')`)
- **Description:**  
  `app/bill/page.tsx` executes Next.js server-side `redirect('/pay')`. In Next.js App Router, executing `redirect()` inside a React Server Component throws an internal `NEXT_REDIRECT` error. During dev-mode SSR, this causes Next.js to log a server warning, emit `<template data-dgst="NEXT_REDIRECT;replace;/pay;307;">`, and return HTTP 200 rather than issuing a clean HTTP 307 header immediately at the network edge.
- **Steps to Reproduce:**
  1. Open terminal and run `fetch('http://localhost:3001/bill', { redirect: 'manual' })`.
  2. Inspect HTTP status code and response body.
- **Expected Result:**  
  HTTP Response Code 307 or 308 with `Location: /pay`.
- **Actual Result:**  
  HTTP Response Code 200 with `<template data-dgst="NEXT_REDIRECT;replace;/pay;307;">`.
- **Evidence:**  
  ```html
  <template data-dgst="NEXT_REDIRECT;replace;/pay;307;" data-msg="Switched to client rendering because the server rendering errored: NEXT_REDIRECT">
  ```
- **Recommended Solution:**  
  Move the root redirect to `next.config.ts`:
  ```ts
  async redirects() {
    return [{ source: '/bill', destination: '/pay', permanent: false }];
  }
  ```

---

### BUG-003: `SUPABASE_SERVICE_ROLE_KEY` Missing from Local Environment
- **Bug ID:** `BUG-CFG-003`
- **Page Name & Route:** Administrative Data Synchronization (`lib/services/system-store.ts`)
- **Severity:** `MEDIUM`
- **Status:** `Open`
- **Related File & Line:** `.env.local:4` (`SUPABASE_SERVICE_ROLE_KEY=`)
- **Description:**  
  `SUPABASE_SERVICE_ROLE_KEY` is left blank in `.env.local`. When administrative background sync executes in `lib/services/system-store.ts`, `createAdminClient()` falls back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`. If Supabase Row-Level Security (RLS) is enabled on tables (`consumers`, `bills`, `meter_readings`), background write operations without a service role key fail silently.
- **Steps to Reproduce:**
  1. Inspect `.env.local` line 4.
  2. Notice `SUPABASE_SERVICE_ROLE_KEY=` is empty.
  3. Inspect `lib/supabase/admin.ts:7-9` fallback logic.
- **Expected Result:**  
  Valid service role secret provided for background administrative sync.
- **Actual Result:**  
  Key is empty; client defaults to anon publishable key.
- **Evidence:**  
  `.env.local` line 4: `SUPABASE_SERVICE_ROLE_KEY=`
- **Recommended Solution:**  
  Add the service role key to `.env.local` or `.env.production` for server-side operations.

---

### BUG-004: Missing Explicit `<label>` on Public Pay Search Input
- **Bug ID:** `BUG-A11Y-004`
- **Page Name & Route:** Public Pay Portal (`/pay`)
- **Severity:** `LOW`
- **Status:** `Open`
- **Related File & Line:** `app/pay/page.tsx:145-165`
- **Description:**  
  The main account search input field utilizes placeholder text and inline SVG icons, but lacks a linked HTML `<label htmlFor="account-search">` element. Assistive screen readers (NVDA, VoiceOver) cannot announce an explicit form label upon focus, violating WCAG 2.1 Success Criterion 3.3.2 (Labels or Instructions).
- **Steps to Reproduce:**
  1. Navigate to `http://localhost:3001/pay`.
  2. Inspect input element with Developer Tools.
  3. Observe absence of matching `<label htmlFor="...">`.
- **Expected Result:**  
  Accessible input with visible or `.sr-only` linked `<label>`.
- **Actual Result:**  
  Input relies exclusively on `placeholder="Enter Consumer Account Number..."`.
- **Evidence:**  
  ```tsx
  <input
    ref={inputRef}
    type="text"
    value={query}
    placeholder="Enter Consumer Account Number..."
  />
  ```
- **Recommended Solution:**  
  Add a screen-reader-only label:
  ```tsx
  <label htmlFor="account-search-input" className="sr-only">Consumer Account Number</label>
  <input id="account-search-input" ... />
  ```

---

### BUG-005: Duplicate Policy URLs Without Canonical 301 Redirects
- **Bug ID:** `BUG-SEO-005`
- **Page Name & Route:** Public Policy Pages (`/terms`, `/terms-and-conditions`, etc.)
- **Severity:** `LOW`
- **Status:** `Open`
- **Related File & Line:** `app/terms-and-conditions/page.tsx:1`, `app/privacy/page.tsx:1`, etc.
- **Description:**  
  The application maintains 4 pairs of identical policy pages:
  - `/terms` and `/terms-and-conditions`
  - `/privacy` and `/privacy-policy`
  - `/refund` and `/refund-policy`
  - `/delivery-policy` and `/service-delivery-policy`
  Both URLs return HTTP 200 with identical DOM structure. Without `rel="canonical"` tags or 301 redirects, search engine crawlers index duplicate content, splitting domain authority.
- **Steps to Reproduce:**
  1. Fetch `http://localhost:3001/terms`.
  2. Fetch `http://localhost:3001/terms-and-conditions`.
  3. Both return HTTP 200 with duplicate copy.
- **Expected Result:**  
  Alias URL issues an HTTP 301 Permanent Redirect to canonical URL.
- **Actual Result:**  
  Both URLs resolve and render the full page independently.
- **Evidence:**  
  `app/terms-and-conditions/page.tsx:1`: `export { default, metadata } from '../terms/page'`
- **Recommended Solution:**  
  Configure permanent redirects in `next.config.ts`:
  ```ts
  async redirects() {
    return [
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/refund-policy', destination: '/refund', permanent: true },
      { source: '/service-delivery-policy', destination: '/delivery-policy', permanent: true }
    ];
  }
  ```
