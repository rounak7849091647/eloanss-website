const fs = require("fs"), path = require("path");
const DIST = path.join(__dirname, "dist");
function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => { const p = path.join(d, e.name); return e.isDirectory() ? walk(p) : [p]; }); }
const all = walk(DIST).map(f => path.relative(DIST, f).split(path.sep).join("/"));
const exists = new Set(all);
const htmls = all.filter(f => f.endsWith(".html"));
let broken = [];
for (const rel of htmls) {
  const html = fs.readFileSync(path.join(DIST, rel), "utf8");
  const links = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);
  for (const l of links) {
    const target = l.replace(/^\//, "");
    if (target === "" || target.startsWith("assets/")) continue;
    if (!exists.has(target)) broken.push(rel + " -> " + l);
  }
}
console.log("HTML pages:", htmls.length);
console.log("Broken internal links:", broken.length);
[...new Set(broken)].slice(0, 40).forEach(b => console.log("  x", b));
