/* ELOANSS — static site generator */
const fs = require("fs");
const path = require("path");
const { site, loans, insurance, posts, lenders } = require("./src/data");
const P = require("./src/pages");
const { minifyCSS, minifyJS, minifyHTML } = require("./src/minify");

const ROOT = __dirname;
const OUT = path.join(ROOT, "dist");
const PUBLIC = path.join(ROOT, "public");

/* --- fs helpers --- */
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function ensure(p) { fs.mkdirSync(p, { recursive: true }); }
function write(rel, html) {
  const full = path.join(OUT, rel);
  ensure(path.dirname(full));
  fs.writeFileSync(full, rel.endsWith(".html") ? minifyHTML(html) : html, "utf8");
  return rel;
}
function copyDir(src, dest) {
  ensure(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) { copyDir(s, d); continue; }
    if (entry.name.endsWith(".css")) fs.writeFileSync(d, minifyCSS(fs.readFileSync(s, "utf8")), "utf8");
    else if (entry.name.endsWith(".js")) fs.writeFileSync(d, minifyJS(fs.readFileSync(s, "utf8")), "utf8");
    else fs.copyFileSync(s, d);
  }
}

/* --- legal content --- */
const legal = {
  privacy: ["Privacy Policy", [
    ["Introduction", `${site.name} ("we", "our", "us") respects your privacy. This policy explains how we collect, use and protect your personal information when you use ${site.domain} or our services.`],
    ["Information we collect", "We collect information you provide — such as name, contact details, income and loan/insurance requirements — when you submit an enquiry or application. We may also collect technical data such as your device and usage information.", "We collect this information solely to match you with suitable financial products and to provide our facilitation services."],
    ["How we use your information", "We use your information to compare offers, share your details with relevant partner lenders and insurers (with your consent), respond to your enquiries, and improve our services. We do not sell your personal data to unrelated third parties."],
    ["Sharing with partners", "When you apply, you authorise us to share your details with partner banks, NBFCs and insurers so they can evaluate your application. Their use of your data is governed by their own privacy policies."],
    ["Data security", "We implement reasonable technical and organisational measures to protect your information. However, no method of transmission over the internet is completely secure."],
    ["Your rights", "You may request access to, correction of, or deletion of your personal data, and may withdraw consent for marketing communications at any time by contacting us."],
    ["Cookies", "Our website may use cookies to improve your experience. You can control cookies through your browser settings."],
    ["Contact", `For privacy questions, email ${site.email} or call ${site.phone}.`],
  ]],
  terms: ["Terms & Conditions", [
    ["Acceptance of terms", `By using ${site.domain} and our services, you agree to these Terms & Conditions. If you do not agree, please do not use our services.`],
    ["Nature of our services", `${site.name} is a loan and insurance facilitator / broker. We do not lend money or underwrite insurance ourselves. We help you compare and connect with banks, NBFCs and insurers. All approvals, rates and terms are at the sole discretion of the respective lender or insurer.`],
    ["No guarantee of approval", "Submitting an enquiry or application does not guarantee approval or any specific rate. Final decisions rest entirely with the lender or insurer based on their assessment of your profile."],
    ["Free service", "Our facilitation services are free for customers. We may receive commissions from partner lenders and insurers."],
    ["User responsibilities", "You agree to provide accurate and complete information. You are responsible for reviewing all loan and insurance documents before signing with any lender or insurer."],
    ["Intellectual property", `All content, logos and trademarks on ${site.domain} are the property of ${site.name} or their respective owners and may not be used without permission.`],
    ["Limitation of liability", "To the maximum extent permitted by law, we are not liable for any loss arising from your use of our services or from any lender's or insurer's decisions or products."],
    ["Changes to terms", "We may update these terms from time to time. Continued use of our services constitutes acceptance of the updated terms."],
    ["Governing law", "These terms are governed by the laws of India, with jurisdiction in the courts of Hyderabad, Telangana."],
  ]],
  disclaimer: ["Disclaimer", [
    ["Facilitator role", `${site.name} is a financial facilitator / broker and does not lend money or provide insurance directly. We assist customers in comparing and applying for loans and insurance from partner banks, NBFCs and insurers.`],
    ["Indicative information", "Interest rates, charges, loan amounts, tenures and insurance premiums shown on this website are indicative and for illustration only. Actual figures depend on the lender's or insurer's assessment and prevailing policies, and may change without notice."],
    ["EMI calculator", "Our EMI calculator provides estimates for planning purposes only. It does not constitute an offer. Actual EMIs depend on the approved amount, rate and terms of your chosen lender."],
    ["No financial advice", "Content on this website is for general information only and does not constitute financial, investment, legal or tax advice. Please consult a qualified professional for advice specific to your situation."],
    ["Investment risk", "Investments in securities and mutual funds are subject to market risks. Please read all scheme-related documents carefully before investing. ELOANSS facilitates access to SEBI-registered partners and does not guarantee returns."],
    ["Third-party content", "We are not responsible for the content, products or services of partner lenders, insurers or any third-party websites linked from our site."],
  ]],
  grievance: ["Grievance Redressal", [
    ["Our commitment", `${site.name} is committed to providing excellent service. If you have a complaint or concern, we aim to resolve it fairly and promptly.`],
    ["How to raise a grievance", `You can reach our grievance team by email at ${site.email} or by phone at ${site.phone}. Please include your name, contact details and a description of your concern along with any reference number.`],
    ["Resolution timeline", "We aim to acknowledge every grievance within 48 hours and resolve it within 7–10 working days. Complex cases may take longer, and we will keep you informed of progress."],
    ["Escalation", `If you are not satisfied with the resolution, you may escalate to our Grievance Officer at ${site.email} with the subject line "Escalation". For loan or insurance product grievances, you may also approach the concerned lender/insurer or the relevant regulatory ombudsman (RBI / IRDAI) as applicable.`],
    ["Grievance Officer", `Grievance Officer, ${site.name}, ${site.address}. Email: ${site.email}.`],
  ]],
};

/* --- build --- */
function build() {
  const t0 = Date.now();
  rmrf(OUT);
  ensure(OUT);
  copyDir(PUBLIC, OUT);

  const written = [];

  written.push(write("index.html", P.home()));
  written.push(write("loans.html", P.loansOverview()));
  written.push(write("insurance.html", P.insuranceOverview()));
  written.push(write("share-markets.html", P.shareMarkets()));
  written.push(write("about.html", P.about()));
  written.push(write("partner.html", P.partner()));
  written.push(write("how-it-works.html", P.howItWorks()));
  written.push(write("blog.html", P.blog()));
  written.push(write("contact.html", P.contact()));
  written.push(write("banks.html", P.banksPage()));
  written.push(write("credit-cards.html", P.creditCardsPage()));
  written.push(write("credit-score.html", P.creditScorePage()));
  written.push(write("calculators.html", P.calculatorsPage()));
  written.push(write("investments.html", P.investmentsPage()));
  written.push(write("business-finance.html", P.businessFinancePage()));
  written.push(write("track-application.html", P.trackApplicationPage()));

  loans.forEach((l) => written.push(write(`loans/${l.slug}.html`, P.loanPage(l))));
  insurance.forEach((i) => written.push(write(`insurance/${i.slug}.html`, P.insurancePage(i))));
  lenders.forEach((l) => written.push(write(`banks/${l[2]}.html`, P.bankPage(l))));
  posts.forEach((p) => written.push(write(`blog/${p[0]}.html`, P.blogPost(p))));

  Object.entries(legal).forEach(([slug, [title, sections]]) =>
    written.push(write(`${slug}.html`, P.legalPage(slug, title, sections))));

  /* sitemap + robots */
  const urls = written.filter((f) => f.endsWith(".html")).map((f) =>
    `  <url><loc>https://${site.domain}/${f === "index.html" ? "" : f.replace(/\\/g, "/")}</loc></url>`).join("\n");
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: https://${site.domain}/sitemap.xml\n`);

  const pages = written.filter((f) => f.endsWith(".html")).length;
  console.log(`✓ Built ${pages} pages + assets in ${Date.now() - t0}ms → ${OUT}`);
  written.filter((f) => f.endsWith(".html")).forEach((f) => console.log("  · " + f.replace(/\\/g, "/")));
}

build();
