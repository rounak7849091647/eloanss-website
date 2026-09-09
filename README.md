# ELOANSS — Website

A complete, production-ready, mobile-first marketing website for **ELOANSS**, a loan &
insurance facilitator. Built as a **static site** (plain HTML/CSS/JS) generated from a small
Node data layer, so it's fast, SEO-friendly and hostable anywhere (Netlify, Vercel, GitHub
Pages, S3, cPanel, or any web host) with no runtime or database.

- **Brand:** Deep Emerald `#075E45` · Soft Gold `#C9A227` · Warm Ivory `#FAF9F4`
- **Fonts:** Poppins (headings) + Inter (body) via Google Fonts
- **63 pages** generated: Home, Loans (overview + 12 loan types), Insurance (overview +
  7 types), Banks & NBFCs (overview + a page per partner), Credit Cards, Credit Score,
  Calculators, Investments,
  Share Markets, About, Partner (Global Distributor), How It Works, Blog
  (overview + 6 posts), Contact, and 4 legal pages — plus `sitemap.xml` and `robots.txt`.

## Features

### Homepage (v2 — matches the approved design mockup)

A 14-section homepage built to the approved design mockup:

1. **Utility bar** — logo, slogan, product search, Support, Track Application, Login / Sign Up
2. **Dark primary nav** — 14 items with full-width mega-menus for Loans, Insurance, Calculators, Resources
3. **Hero** — full-bleed photographic background (`public/assets/img/hero-*.{webp,jpg}`, responsive `<picture>`), left-aligned copy over a directional scrim, 4 trust chips and a 4-up glass stat bar
4. **What are you planning for?** — 9 photographic goal circles (5 + 4 centred) on a soft blue field; images sliced from the source artwork into `public/assets/img/goals/*.{webp,jpg}`
5. **Trio** — free credit-score card (animated SVG gauge), dark EMI calculator with 4 product tabs, home-loan promo
6. **Banking & lending network** — 20 partner tiles with working category filters
7. **Explore Our Loan Universe** — dark panel, 8 category tabs covering all 90 loan products
8. **Insurance for a Safer Tomorrow** — badge, two-line headline, three reassurance points
   and a hexagon-framed portrait; 4 headline cards (icon, tagline, 5 sub-products, corner
   photo, per-card accent); 9 supporting tiles; closing CTA band
9. **Why Choose ELOANSS?** — 5 pillars plus Vision / Mission
10. **Global Distributor panel + Invest Today panel** — world-map pins; investment tabs with chart
11. **Find What Fits Your Financial Profile** — card comparison form and ELOANSS card visual
12. **Quad row** — testimonial carousel, latest blog posts, app download, contact + map
13. **Footer** — 6 link columns, newsletter, app badges, QR code
14. **Skyline band** — second newsletter, legal links, copyright

### Theming

- **Three themes** — Light, Dark and Dark Navy — cycled from the utility bar button
  (and the mobile menu). The button shows one glyph per theme.
- **Dark Navy** is opt-in only: the OS preference never selects it, so a visitor with
  `prefers-color-scheme: dark` still gets the standard Dark theme until they choose Navy.
- Precedence: an explicit choice (stored in `localStorage` under `eloanss-theme`) beats the
  OS `prefers-color-scheme`. With no stored choice the site follows the OS and reacts live
  when it changes.
- An inline script in `<head>` applies the stored theme before first paint, so there is no flash.
- Colours are driven by CSS custom properties. The ones that flip are `--bg`, `--bg-soft`,
  `--surface`, `--surface-2`, `--ink`, `--body`, `--muted`, `--line`, `--line-2`, `--head`
  and the tint/shadow tokens — defined on `:root`, under `@media (prefers-color-scheme: dark)`
  guarded by `:root:not([data-theme="light"])`, and again on `:root[data-theme="dark"]`.
- **Adding a new component?** Use `var(--surface)` for panel backgrounds and `var(--head)`
  for heading-weight text rather than `#fff` / `var(--navy)`, or it will break in dark mode.
  Elements sitting on the gold accent keep a hard-coded dark text colour on purpose.

### Site-wide

- New header and footer roll across all 43 pages
- Every nav item resolves to a real page — nothing jumps to a homepage anchor
- Interactive **EMI calculator** on Home, Loans overview and every loan page — with per-product ranges
- **Multi-step application form** with progress bar + single-step quick-enquiry forms
- Per-loan pages: hero, intro, benefits, eligibility, documents, rates, features, EMI calc, FAQ, cross-sell, form
- Compliance messaging throughout ("ELOANSS is a facilitator…") + legal pages in footer
- SEO: unique titles/descriptions, canonical URLs, Open Graph, JSON-LD `FinancialService` schema, sitemap & robots
- Reveal-on-scroll animations, hover micro-interactions, fully responsive (mobile nav at ≤900px)

## Project structure

```
eloanss-website/
├─ build.js            # generator: reads src/, writes dist/
├─ check.js            # broken internal-link checker
├─ src/
│  ├─ data.js          # ALL content: site info, 12 loans, 7 insurance, testimonials, blog…
│  ├─ icons.js         # inline SVG icon set
│  ├─ components.js    # head, header, footer, EMI calc, forms, FAQ, WhatsApp, etc.
│  └─ pages.js         # page templates (home, loan page, insurance page, …)
├─ public/             # static assets copied verbatim into dist/
│  └─ assets/{css,js}
└─ dist/               # ← generated output; deploy THIS folder
```

## Colour palette

| Role | Colour | Hex | Token |
| --- | --- | --- | --- |
| Primary | Deep Emerald | `#075E45` | `--navy`, `--blue`, `--head`, `--accent-ink` |
| Primary Dark | Forest | `#043D2F` | `--blue-600`, `--bg-navy`, footer ground |
| Accent | Soft Gold | `#C9A227` | `--gold` |
| Background | Warm Ivory | `#FAF9F4` | `--bg` |
| Cards | Pure White | `#FFFFFF` | `--surface` |
| Main Text | Charcoal | `#202522` | `--ink` |
| Secondary Text | Slate | `#68716D` | `--muted` |
| Borders | Soft Sage Grey | `#DDE4DF` | `--line` |
| Success | Emerald Green | `#16845B` | `--success` |
| Error | Muted Burgundy | `#B84040` | `--danger` |

Token names still read `--navy` / `--blue` for historical reasons; they now hold the
emerald values. Everything derives from these, so a future re-skin is a token edit.

Two deliberate splits are worth knowing about:

- **`--accent-ink` is separate from `--blue`.** Accent *text* needs to be light on dark
  surfaces, while accent *backgrounds* must stay dark enough to carry white labels. One
  token cannot do both: at `#075E45` accent text scored 1.99:1 on the dark card, and any
  value bright enough to fix that dropped white-on-button below 3:1. So `--accent-ink` is
  `#075E45` in light and `#35C08D` in dark, while `--blue` stays `#075E45` for buttons.
- **Gold surfaces carry charcoal text, not emerald.** Emerald on Soft Gold is 3.22:1;
  charcoal is 6.43:1. See the rule block commented "elements that sit on the gold accent".

The footer sits on Forest rather than Primary — on the lighter emerald its muted text
measured 3.1-4.3:1. On Forest it is 6.7-12.3:1.

All text was audited against WCAG AA (4.5:1 body, 3:1 large) in both themes.

### Dark Navy theme

| Role | Hex | Token |
| --- | --- | --- |
| Background | `#061827` | `--bg` |
| Primary | `#0B3048` | `--surface`, `--navy` |
| Accent | `#16A085` | `--blue` |
| Light | `#E8F4F1` | `--ink`, `--head` |
| White | `#FFFFFF` | `--white` |

It reuses the Dark theme's component rules — those are written as
`:root:not([data-theme="light"])`, which already matches Navy — so only the tokens and the
large panel gradients are restated. The 19 light-restore guards were narrowed from
`:not([data-theme="dark"])` to also exclude Navy; without that, a visitor on a light OS
would have seen light panels behind Navy tokens.

Two Navy-specific notes:

- **The accent carries dark text, not white.** White on `#16A085` is 3.28:1. Dark navy
  `#061827` on it is 5.48:1, so accent buttons, active tabs and pills flip their
  foreground in this theme only.
- **`--accent-ink` is `#2ABFA2`, not the raw accent.** `#16A085` as text on the `#0B3048`
  card is 4.18:1, just under AA; the lifted tone reaches 5.96:1.

Measured in Navy: body 12.2:1, headings 12.2:1, secondary text 5.9:1, accent button 5.5:1,
gold button 6.4:1, nav 11:1, footer 12.9:1.

## Product catalogue

The full taxonomy lives in `src/data.js` as `loanCatalogue` (8 groups / 90 products) and
`insuranceCatalogue` (15 groups / 177 products, plus 16 riders and motor add-ons).

Each group carries a default `href` — the closest detailed page. An item is either a plain
string (inherits that default) or `["Name", "/its/own.html"]` when something more specific
exists. `catItems()` in `src/pages.js` resolves both forms.

It is rendered in four places, all from the same source:

- Homepage **Explore Our Loan Universe** — 8 tabs
- **Loans** overview page — full directory with a category jump bar
- **Insurance** overview page — full directory, including riders and add-ons
- Loans and Insurance **mega-menus** — top 6 per group plus a “+N more” link

Adding a product is a one-line edit to the relevant `items` array; every surface updates.

Only the 19 products with genuine page-level depth (rates, eligibility, documents, FAQs)
have their own generated pages — `loans` and `insurance` in `data.js`. To promote a
catalogue entry, add a full record there and point the catalogue item at its new slug.

### Partner pages

Every entry in `lenders` generates `/banks/<slug>.html` from `bankPage()` in `src/pages.js`,
driven by `lenderProfiles` in `src/data.js`. The tiles in the partner wall link to them.

Each profile declares a `kind` (`bank` / `nbfc` / `gold` / `hfc`, which selects the
descriptive copy and highlight set) and a `products` list of existing loan slugs.

**These pages carry no lender-specific interest rates.** ELOANSS cannot quote another
institution's pricing, so each product shows the indicative *market* range already held on
that product in `loans`, explicitly labelled as such. Every partner page also carries a
non-affiliation notice. Keep both if you edit the template.

### Lender logos

`lenders` entries are `[name, filter category, logo slug]`. At build time each slug is
looked up in `public/assets/img/lenders/` (`.svg`, `.png`, `.webp`, `.jpg`, `.jpeg`); if a
file is there it is used, otherwise a wordmark + category placeholder renders. No broken
images either way, and no code change when you add one.

To install a batch of licensed logos:

```bash
node tools/import-logos.js "C:/path/to/logos" --dry   # preview the matching
node tools/import-logos.js "C:/path/to/logos"         # write them
node build.js
```

The importer matches filenames to slugs loosely (`HDFC-Bank-Logo.png`, `hdfc_bank.svg` and
`HDFC BANK.jpg` all resolve to `hdfc-bank`), copies SVGs through untouched, and trims and
optimises raster files to fit 480x96 PNG. It reports anything it could not match and lists
the lenders still without a logo.

12 of the 20 partner logos are installed; the remaining 8 (axis-bank, kotak, pnb,
manappuram-finance, lendingkart, piramal-finance, fullerton-india, incred) still render the
wordmark fallback. See `public/assets/img/lenders/README.md`.

Supply logo art with a genuinely transparent background — JPEGs saved from a transparency
preview bake the grey checkerboard in as real pixels and it will show on the page.

## Assets

- Hero background: `public/assets/img/hero-{760,1200,2000}.{webp,jpg}`, served via `<picture>`.
- Goal circles: `public/assets/img/goals/<slug>.{webp,jpg}` at 240x240. The slug is the 5th
  field of each entry in the `goals` array in `src/data.js`.
- Both sets were produced from the source artwork with `sharp`. To regenerate after swapping
  artwork, re-crop to the same filenames and sizes — no code changes needed.
- `styles.css` and `app.js` are linked with a `?v=<md5>` content hash computed at build time,
  so a redeploy never serves a browser a stale stylesheet or script.

## Build & preview

No dependencies required — just Node.

```bash
node build.js          # regenerate dist/
node check.js          # verify no broken internal links

npx serve dist -l 4321 # preview locally at http://localhost:4321
```

## Editing content

Almost everything lives in **`src/data.js`** — no HTML editing needed for content changes:

- **Phone, email, address, stats, WhatsApp number** → the `site` object
- **Add / edit a loan** → the `loans` array (slug, rates, eligibility, documents, FAQs,
  EMI slider ranges, cross-sell). A new entry auto-appears in the nav, footer, mega-menu,
  sitemap and gets its own page.
- **Insurance, testimonials, blog posts, partner benefits** → their respective arrays
- **Homepage v2 sections** → `goals`, `journeyNodes`, `lenders`, `loanUniverse`,
  `insuranceMajor` / `insuranceMinor`, `whyPillars`, `investTabs`, `cardTypes`,
  `heroChips`, `distributorPoints`, `footerCols` (all at the bottom of `data.js`)

After any edit run `node build.js` and redeploy `dist/`.

## Deploy

Live on Cloudflare: **https://eloanss-website.ronith9999.workers.dev**

```bash
node build.js          # regenerate dist/
npx wrangler deploy    # push dist/ to Cloudflare
```

`wrangler.jsonc` holds the config. Two settings matter and should not be changed casually:

- **`html_handling: "none"`** — the site links to explicit `.html` paths, and those are what
  the `<link rel="canonical">` tags and `sitemap.xml` declare. The default
  `auto-trailing-slash` 307-redirects `/loans.html` to `/loans`, which puts a redirect hop on
  every navigation and serves each page at a URL its own canonical disagrees with.
- **`not_found_handling: "none"`** — returns a real 404 for unknown paths. The
  `single-page-application` mode would serve `index.html` with HTTP 200 for every bad URL,
  which search engines treat as a soft 404.

`html_handling: "none"` does not map `/` to `/index.html`, so `public/_redirects` does that
as a 200 rewrite. `public/` is copied verbatim into `dist/` by the build.

The output is plain static files, so any other host works too — upload the contents of
**`dist/`**. Update the domain in `src/data.js` (`site.domain`) when you point a real domain at it.

## Notes / next steps

- Forms are **front-end demos** (they show a success state but send nothing). Wire the
  `<form>` submit handlers in `public/assets/js/app.js` to your CRM / email / WhatsApp API
  or a service like Formspree when you go live.
- Replace the WhatsApp number, phone, email and office address in `src/data.js` with real values.
- Partner-bank names in the trust bar are placeholders — swap for real logos you're licensed
  to display.
- Images use Unsplash URLs; replace with your own licensed/branded photography for production.
- The Google Map embed points to "Financial District, Hyderabad" — update to your exact address.
