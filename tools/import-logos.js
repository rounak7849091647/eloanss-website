#!/usr/bin/env node
/* ===========================================================================
   ELOANSS — lender logo importer

   Takes a folder of logo files you have been licensed to use (each partner's
   brand kit / press page), matches them to the lender slugs in src/data.js,
   normalises and optimises them, and writes them into
   public/assets/img/lenders/ where the build picks them up automatically.

     node tools/import-logos.js "C:/path/to/downloaded-logos"
     node tools/import-logos.js "C:/path/to/downloaded-logos" --dry

   Matching is fuzzy: "HDFC-Bank-Logo.png", "hdfc_bank.svg" and "HDFC BANK.jpg"
   all map to the `hdfc-bank` slug. Anything it cannot match is reported so you
   can rename it and re-run.

   SVGs are copied through untouched (they are already resolution-independent).
   Raster files are trimmed of surrounding whitespace, fitted inside 360x72 and written
   as palette PNG with transparency preserved (visually identical, ~5x smaller than RGBA).
   =========================================================================== */

const fs = require("fs");
const path = require("path");
const { lenders } = require("../src/data");

const SRC_DIR = process.argv[2];
const DRY = process.argv.includes("--dry");
const OUT_DIR = path.join(__dirname, "..", "public", "assets", "img", "lenders");
const RASTER = [".png", ".jpg", ".jpeg", ".webp"];

if (!SRC_DIR) {
  console.error("Usage: node tools/import-logos.js <folder-of-logos> [--dry]");
  process.exit(1);
}
if (!fs.existsSync(SRC_DIR)) {
  console.error("Folder not found: " + SRC_DIR);
  process.exit(1);
}

let sharp = null;
try { sharp = require("sharp"); } catch (e) { /* raster optimisation unavailable */ }

/* normalise a string down to comparable letters+digits */
const norm = (s) => s.toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/[^a-z0-9]/g, "");

const targets = lenders.map(([name, cat, slug]) => ({ name, cat, slug, key: norm(slug), nameKey: norm(name) }));
const files = fs.readdirSync(SRC_DIR).filter((f) => fs.statSync(path.join(SRC_DIR, f)).isFile());

function matchTarget(file) {
  const k = norm(file);
  let hit = targets.find((t) => k === t.key || k === t.nameKey);
  if (hit) return hit;
  hit = targets.find((t) => k.includes(t.key) || t.key.includes(k));
  if (hit) return hit;
  return targets.find((t) => k.includes(t.nameKey) || t.nameKey.includes(k)) || null;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const done = [];
  const skipped = [];

  for (const file of files) {
    if (file.toLowerCase() === "readme.md") continue;
    const ext = path.extname(file).toLowerCase();
    const target = matchTarget(file);

    if (!target) { skipped.push([file, "no matching lender slug"]); continue; }
    if (ext !== ".svg" && !RASTER.includes(ext)) { skipped.push([file, "unsupported type " + ext]); continue; }

    const from = path.join(SRC_DIR, file);

    if (ext === ".svg") {
      const to = path.join(OUT_DIR, target.slug + ".svg");
      if (!DRY) fs.copyFileSync(from, to);
      done.push([file, target.slug + ".svg", "copied"]);
      continue;
    }

    const to = path.join(OUT_DIR, target.slug + ".png");
    if (!sharp) {
      if (!DRY) fs.copyFileSync(from, path.join(OUT_DIR, target.slug + ext));
      done.push([file, target.slug + ext, "copied (sharp unavailable, not optimised)"]);
      continue;
    }
    if (!DRY) {
      await sharp(from)
        .trim()
        .resize({ width: 360, height: 72, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true, quality: 95, effort: 10 })
        .toFile(to);
    }
    done.push([file, target.slug + ".png", "trimmed + optimised"]);
  }

  console.log((DRY ? "[dry run] " : "") + "Imported " + done.length + " of " + files.length + " file(s)\n");
  done.forEach(([f, out, how]) => console.log("  ok   " + f + "  ->  " + out + "   (" + how + ")"));
  if (skipped.length) {
    console.log("\nSkipped:");
    skipped.forEach(([f, why]) => console.log("  --   " + f + "   (" + why + ")"));
  }

  const have = new Set(done.map(([, out]) => out.replace(/\.[a-z0-9]+$/, "")));
  const missing = targets.filter((t) => !have.has(t.slug) &&
    ![".svg", ".png", ".webp", ".jpg", ".jpeg"].some((e) => fs.existsSync(path.join(OUT_DIR, t.slug + e))));
  if (missing.length) {
    console.log("\nStill without a logo (" + missing.length + ") — these keep the wordmark placeholder:");
    console.log("  " + missing.map((t) => t.slug).join(", "));
  }
  console.log("\nRun `node build.js` to publish.");
})();
