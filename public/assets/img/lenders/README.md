# Lender logos

Files here are matched to the lender **slug** (third field of each entry in the `lenders`
array in `src/data.js`). Drop a file in, run `node build.js`, and the wall picks it up.
Any slug without a file falls back to a wordmark + category tile automatically.

Accepted extensions, in priority order: `.svg`, `.png`, `.webp`, `.jpg`, `.jpeg`

## Installed (12)

hdfc-bank, icici-bank, sbi, indusind-bank, yes-bank, idfc-first, bank-of-baroda,
bajaj-finserv, tata-capital, muthoot-finance, aditya-birla-capital, herofincorp

## Still on the wordmark fallback (8)

axis-bank, kotak, pnb, manappuram-finance, lendingkart, piramal-finance,
fullerton-india, incred

## Adding more

```bash
node tools/import-logos.js "C:/path/to/logos" --dry   # preview matching
node tools/import-logos.js "C:/path/to/logos"         # write
node build.js
```

The importer trims surrounding whitespace, fits the art inside 360x72 and writes an
optimised palette PNG. SVGs are copied through untouched — prefer SVG when available.

Notes:
- Logos render at up to 42px tall, so supply the **horizontal lockup**, not a stacked one.
- Supply art with a **transparent background**. JPEGs exported from a transparency-preview
  have the grey checkerboard baked in as real pixels; that has to be removed first or it
  shows on the page.
- Tiles sit on a light chip in both themes, because several partner marks are dark ink and
  would vanish on the dark theme. That also matches most bank brand guidelines.
- These are third-party trademarks — use the asset each partner supplies under your
  distribution agreement and follow their brand rules.
