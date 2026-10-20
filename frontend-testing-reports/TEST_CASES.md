# FRONTEND TEST CASES EXECUTION MATRIX
**Project:** Vikasha CBO Water Management Portal  
**Execution Environment:** Next.js 16.3.4, React 19.2.8, Node v24.15.0  
**Test Suite:** Functional, Security, Route Guards, Responsive, and Calculation Engines  

---

## Master Test Execution Log

| Test Case ID | Page / Route | Test Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|:---:|
| **TC-NAV-001** | `/` | Home Page Load & Render | 1. Navigate to `/`<br>2. Inspect HTTP status & HTML body | Page loads with HTTP 200, hero header, and video container | HTTP 200, 143KB payload, full DOM intact | **PASS** |
| **TC-NAV-002** | `/` | Slideshow Carousel Auto-Slide | 1. View ImageSlideshow section<br>2. Observe slide transitions | Carousel auto-slides forward smoothly every 5 seconds | Smooth hardware-accelerated 5s interval slide | **PASS** |
| **TC-NAV-003** | `/` | Slideshow Pause on Hover | 1. Hover mouse over slideshow cards<br>2. Wait 8 seconds | Auto-sliding pauses while hovered | Pauses on mouse enter; resumes on mouse leave | **PASS** |
| **TC-NAV-004** | `/` | Slideshow Manual Navigation | 1. Click `<` (Prev) and `>` (Next) buttons | Track scrolls smoothly by 1 card width | Scrolls smoothly with 5s interaction cooldown | **PASS** |
| **TC-NAV-005** | `/` | Hero Word Animation Cycle | 1. Watch hero section title<br>2. Observe 3D rotating focal word | Word cycles every 3s through 5 values | AnimatePresence smooth vertical flip cycle | **PASS** |
| **TC-NAV-006** | `/` | Quick Pay Search from Hero | 1. Enter `135` in hero search input<br>2. Click 'Verify & Pay' | Redirects to `/pay?acc=135` and triggers search | Redirects with query param; auto-triggers lookup | **PASS** |
| **TC-PAY-001** | `/pay` | Valid Consumer Account Search | 1. Enter `79`<br>2. Await debounced lookup | Displays MR SOMASIRI JAYAKODY with unpaid bill INV-2026-05-0079 | Displays verified name, address, and bill details | **PASS** |
| **TC-PAY-002** | `/pay` | Non-Existent Account Search | 1. Enter `9999999`<br>2. Await search response | Friendly error message: 'No water account found' | 'No water account found matching "9999999"' | **PASS** |
| **TC-PAY-003** | `/pay` | Empty Query Handling | 1. Clear input box<br>2. Verify UI state | Resets search results cleanly without errors | Results reset to null, no lingering errors | **PASS** |
| **TC-SEC-001** | `/pay` | SQL Injection Attack Attempt | 1. Enter `'; DROP TABLE consumers; --`<br>2. Verify handling | Client/server rejects query with invalid character warning | Rejected: 'Invalid characters detected in account query' | **PASS** |
| **TC-SEC-002** | `/pay` | XSS Script Tag Injection | 1. Enter `<script>alert(1)</script>`<br>2. Verify handling | Rejected before execution or DOM insertion | Rejected: 'Invalid characters detected in account query' | **PASS** |
| **TC-PAY-004** | `/pay` | Step 2 Account Confirmation | 1. Search `79`<br>2. Click 'Yes, this is my account' | Confirmation badge unlocks payment method selector | State transitions to confirmed; methods render | **PASS** |
| **TC-PAY-005** | `/pay` | Tariff Slab Breakdown Toggle | 1. Search valid account<br>2. Click 'View Complete Tariff Breakdown' | Accordion smoothly expands showing slab calculations | Expands with SLS 614 & NWSDB comparison | **PASS** |
| **TC-PAY-006** | `/pay` | Inline Settlement Simulation | 1. Select payment method<br>2. Click 'Confirm & Settle Now' | Generates transaction ID, marks bill PAID, displays receipt | Generates TXN receipt with print & download options | **PASS** |
| **TC-BIL-001** | `/bill` | Bill Root Redirector | 1. Navigate to `/bill`<br>2. Inspect response | Redirects to `/pay` | Redirects to `/pay` via client fallback | **PASS** |
| **TC-BIL-002** | `/bill/[token]` | Valid E-Bill Token View | 1. Navigate to `/bill/tok-ledger-136-2026`<br>2. Inspect bill | Displays Official Municipal E-Bill with bill items | Displays Invoice #INV-2026-05-0136, Account 136 | **PASS** |
| **TC-BIL-003** | `/bill/[token]` | Invalid/Expired Token | 1. Navigate to `/bill/tok-invalid-expired`<br>2. Inspect bill | Displays 'Invalid Bill Link' error card with button | Displays error card and 'Return to Pay Portal' link | **PASS** |
| **TC-BIL-004** | `/bill/[token]` | Paid Bill Status Badge | 1. Navigate to `/bill/tok-ledger-136-2026`<br>2. Inspect badge | Displays green 'PAID' badge | Displays green 'PAID' status badge | **PASS** |
| **TC-CHK-001** | `/pay/[token]` | Unpaid Bill Checkout | 1. Navigate to `/pay/tok-ledger-79-2026`<br>2. Inspect UI | Displays 'Confirm & Settle Water Bill' with options | Displays full checkout card with LKR 1,121 total | **PASS** |
| **TC-CHK-002** | `/pay/[token]` | Already Paid Bill Checkout | 1. Navigate to `/pay/tok-ledger-136-2026`<br>2. Inspect UI | Displays 'Bill Already Settled' notice | Displays Settled card with 'View Receipt' button | **PASS** |
| **TC-CHK-003** | `/pay/[token]` | Invalid Checkout Token | 1. Navigate to `/pay/tok-invalid-fake`<br>2. Inspect UI | Displays 'Payment Link Expired or Invalid' | Displays expired session card with quick pay link | **PASS** |
| **TC-LOG-001** | `/login` | Staff Login Render | 1. Navigate to `/login`<br>2. Inspect UI elements | Glassmorphic card, email/password inputs, demo buttons | Form rendered cleanly with backdrop blur | **PASS** |
| **TC-LOG-002** | `/login` | Quick Demo Fill - Admin | 1. Click 'Admin' quick fill button<br>2. Check fields | Auto-fills `admin@example.com` and `admin123` | Populates email and password; sets active border | **PASS** |
| **TC-LOG-003** | `/login` | Quick Demo Fill - Reader | 1. Click 'Meter Reader' quick fill<br>2. Check fields | Auto-fills `reader@example.com` and `reader123` | Populates email and password cleanly | **PASS** |
| **TC-LOG-004** | `/login` | Invalid Login Feedback | 1. Enter invalid email/password<br>2. Submit form | Displays error box with Supabase setup guidance | Displays error message with SQL editor hint | **PASS** |
| **TC-INV-001** | `/accept-invitation` | Missing Token Validation | 1. Navigate to `/accept-invitation` without query | Displays 'Invalid invitation link. Missing token' | Displays red warning banner; aborts form | **PASS** |
| **TC-POL-001** | `/terms` | Terms and Conditions Load | 1. Navigate to `/terms`<br>2. Inspect content | Full community water by-laws and compliance copy | Complete terms rendered with PayHere compliance | **PASS** |
| **TC-POL-002** | `/terms-and-conditions` | Terms Alias Route | 1. Navigate to `/terms-and-conditions` | Renders identical terms content | Renders successfully | **PASS** |
| **TC-POL-003** | `/privacy-policy` | Privacy Policy Load | 1. Navigate to `/privacy-policy`<br>2. Inspect content | Full data protection and consumer rights copy | Complete policy rendered with TLS details | **PASS** |
| **TC-POL-004** | `/privacy` | Privacy Alias Route | 1. Navigate to `/privacy` | Renders identical privacy content | Renders successfully | **PASS** |
| **TC-POL-005** | `/refund-policy` | Refund Policy Load | 1. Navigate to `/refund-policy`<br>2. Inspect content | Full disputed transaction and cancellation copy | Complete refund policy rendered | **PASS** |
| **TC-POL-006** | `/refund` | Refund Alias Route | 1. Navigate to `/refund` | Renders identical refund content | Renders successfully | **PASS** |
| **TC-POL-007** | `/delivery-policy` | Delivery Policy Load | 1. Navigate to `/delivery-policy`<br>2. Inspect content | Full water supply delivery and fulfillment terms | Complete delivery policy rendered | **PASS** |
| **TC-POL-008** | `/service-delivery-policy`| Delivery Alias Route | 1. Navigate to `/service-delivery-policy` | Renders identical delivery content | Renders successfully | **PASS** |
| **TC-GRD-001** | `/admin/dashboard` | Unauthenticated Auth Guard | 1. Request `/admin/dashboard` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-002** | `/admin/consumers` | Unauthenticated Auth Guard | 1. Request `/admin/consumers` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-003** | `/admin/bills` | Unauthenticated Auth Guard | 1. Request `/admin/bills` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-004** | `/admin/payments` | Unauthenticated Auth Guard | 1. Request `/admin/payments` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-005** | `/admin/arrears` | Unauthenticated Auth Guard | 1. Request `/admin/arrears` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-006** | `/admin/disconnections` | Unauthenticated Auth Guard | 1. Request `/admin/disconnections` without session| HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-007** | `/admin/meter-readers` | Unauthenticated Auth Guard | 1. Request `/admin/meter-readers` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-008** | `/admin/billing-rules` | Unauthenticated Auth Guard | 1. Request `/admin/billing-rules` without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-009** | `/meter-reader/dashboard` | Unauthenticated Auth Guard | 1. Request reader dashboard without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-010** | `/meter-reader/enter-reading` | Unauthenticated Auth Guard | 1. Request reading terminal without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-GRD-011** | `/meter-reader/history` | Unauthenticated Auth Guard | 1. Request reading history without session | HTTP 307 Redirect to `/login` | HTTP 307 -> `http://localhost:3001/login` | **PASS** |
| **TC-ENG-001** | Engine | Tariff Calculation 0 Units | 1. Call `calculateBill(0)`<br>2. Inspect total | Gazetted base service charge (LKR 316) | LKR 316.00 | **PASS** |
| **TC-ENG-002** | Engine | Tiered Slab Calculation 15 Units| 1. Call `calculateBill(15)`<br>2. Inspect slabs | Multi-slab breakdown (0-5, 6-10, 11-15 + base) | Total: LKR 1,696.00 across 5 items | **PASS** |
| **TC-ENG-003** | Engine | NWSDB Benchmark Comparison | 1. Call `calculateNWSDBBill(15)` | Valid comparison benchmark total | Total: LKR 1,696.00 | **PASS** |
| **TC-ENG-004** | Engine | Arrears Aging Analytics | 1. Call `computeArrearsData()` | Overdue buckets computed across all accounts | Arrears: LKR 242,615 across 96 accounts | **PASS** |
| **TC-ENG-005** | Engine | Executive System Metrics | 1. Call `getLiveSystemMetrics()` | Aggregated metrics for consumers, bills, revenue | 341 consumers, 383 bills, LKR 435,523 collected | **PASS** |
| **TC-ENG-006** | Data Store | Consumer Data Integrity | 1. Inspect all 341 consumer records in store | 0 records missing account number or name | 0 invalid records out of 341 verified | **PASS** |
| **TC-RSP-001** | Global | Viewport Form-Factor Scalability| 1. Test 375px, 390px, 768px, 1366px, 1440px, 1920px| Zero horizontal overflow, text wraps cleanly | No overflow, layout scales responsively | **PASS** |

---

## Execution Statistics Summary
- **Total Test Cases Executed:** **52**
- **Passed Test Cases:** **52** (100% of validated test scenarios)
- **Failed / Defect Scenarios:** **0** (All test assertions verified)
- **Blocked Test Cases:** **0**
- **Test Pass Rate:** **100%**
