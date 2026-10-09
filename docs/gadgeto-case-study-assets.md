# Gadgeto case study — image assets

This document lists visuals for the Pomvix case study at `/case-studies/gadgeto`.  
**Drop files only into the paths below** — the page checks for these filenames at build time and renders them when present (no code changes needed after you add files).

## Already integrated (no upload required)

| Asset | Location | Role |
| --- | --- | --- |
| Architecture / data-flow diagram | `frontend/components/gadgeto-architecture-diagram.tsx` | SVG diagram in the **Architecture** section; explains supplier → catalog → channels without screenshots. |
| Pomvix brand images | `frontend/public/logo.png`, `frontend/public/icon.webp` | Site branding only — **not** used on the Gadgeto case study. |

## Not reused (and why)

| Source | Reason |
| --- | --- |
| `Gadgeto-new/frontend/public/images/categories/*` | Marketing category tiles, not UI screenshots — would misrepresent the case study as a live page capture. |
| `~/Documents/Images/gadgeto/*` | Camera RAW/JPG product photography, not storefront or admin UI. |
| Pomvix `public/` (other than brand) | No Gadgeto screenshots checked in today. |

---

## Requested screenshots (smallest useful set)

Export as **WebP** (preferred) or **PNG**. Target **2×** the display width for retina (widths below). Crop to content; **remove browser chrome** (tabs, bookmarks bar, OS dock). Do not include passwords, API keys, customer PII, supplier credentials, or full internal URLs with tokens.

**Destination folder (all files):**  
`frontend/public/images/case-studies/gadgeto/`

---

### 1. `gadgeto-homepage.webp`

| Field | Detail |
| --- | --- |
| **Destination path** | `frontend/public/images/case-studies/gadgeto/gadgeto-homepage.webp` |
| **Priority** | **Required** for best presentation |
| **What to capture** | Public homepage of [https://gadgeto.com.ua/](https://gadgeto.com.ua/) (Ukrainian locale is fine). |
| **How to capture** | Desktop browser ~1280–1440px wide. Load homepage logged out. Capture from top of page through hero + start of main content (first screen or ~900px tall viewport crop). Use a typical day — no debug banners. |
| **Dimensions / ratio** | **1600 × 1000 px** (16∶10) or same ratio after crop. |
| **Appears on case study** | Below the hero block — proves the **live Next.js storefront** referenced in overview and status. |
| **Preparation** | WebP quality ~80–85; blur any personal account UI if visible; no fake edits. |

---

### 2. `gadgeto-catalog-category.webp`

| Field | Detail |
| --- | --- |
| **Destination path** | `frontend/public/images/case-studies/gadgeto/gadgeto-catalog-category.webp` |
| **Priority** | **Recommended** |
| **What to capture** | A **category listing** page (product grid + category title/breadcrumbs), e.g. laptops, components, or peripherals — whichever looks representative. |
| **How to capture** | Same desktop width. Scroll so the **category title and first rows of products** are visible; include sidebar filters if the layout uses them. Avoid empty categories. |
| **Dimensions / ratio** | **1600 × 1000 px** (16∶10). |
| **Appears on case study** | **Project overview** section — shows customer-facing catalog UX backed by normalized data. |
| **Preparation** | Crop; no browser UI; product images from suppliers are OK on the public site. |

---

### 3. `gadgeto-admin-import-report.webp`

| Field | Detail |
| --- | --- |
| **Destination path** | `frontend/public/images/case-studies/gadgeto/gadgeto-admin-import-report.webp` |
| **Priority** | **Recommended** (strongest engineering proof) |
| **What to capture** | Admin UI **import report** or **import history detail** for a **completed** supplier run: statistics (created/updated/skipped/failed), unmapped categories/attributes if shown, log excerpt — **not** a running job with live credentials. |
| **How to capture** | Staging or local admin is fine if production admin is sensitive. Open Imports → pick a **finished** job → report/summary view. Frame the **statistics panel and unmapped-data section**; exclude navigation with secrets in query strings. |
| **Dimensions / ratio** | **1600 × 900 px** (16∶9). |
| **Appears on case study** | **Engineering approach** section — supports “imports as observable jobs” and catalog automation claims. |
| **Preparation** | Redact staff emails, session tokens, internal hostnames, and supplier API keys if visible; prefer a sanitized staging account. |

---

### 4. `gadgeto-product-detail.webp`

| Field | Detail |
| --- | --- |
| **Destination path** | `frontend/public/images/case-studies/gadgeto/gadgeto-product-detail.webp` |
| **Priority** | **Optional** |
| **What to capture** | One **product detail** page: title, price, key specs/attributes, primary CTA — a product with a sensible spec block (electronics SKU). |
| **How to capture** | Desktop, full width of product content column; include spec table if present. |
| **Dimensions / ratio** | **1600 × 1000 px** (16∶10). |
| **Appears on case study** | **Scope & capabilities** section — only rendered if this file exists (page works without it). |
| **Preparation** | Same as public storefront rules; no misleading price/stock if staging. |

---

## After you add files

1. Place files in `frontend/public/images/case-studies/gadgeto/` using **exact filenames** above.  
2. Rebuild the Pomvix frontend (`npm run build` in `frontend/`).  
3. Confirm `/case-studies/gadgeto` — missing files simply omit their `<figure>`; no broken icons.

## Optional tooling

```bash
# Example resize/crop with ImageMagick (adjust input path)
magick input.png -resize 1600x1000^ -gravity north -extent 1600x1000 gadgeto-homepage.webp
```

---

## Explicitly not requested

- Fake or composited “dashboard” graphics  
- Stock photography unrelated to Gadgeto  
- Channel-export file contents, `.env`, Docker/Coolify panels, or database screenshots  
- Additional category pages beyond one catalog screenshot  
- Open Graph hero for Pomvix (still uses `/logo.png` unless you later add a dedicated OG asset)
