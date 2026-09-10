/* ELOANSS — shared HTML components */
const { icons } = require("./icons");
const { site, loans, insurance, loanCatalogue, insuranceCatalogue, footerCols } = require("./data");

const fsx = require("fs");
const pathx = require("path");
const cryptox = require("crypto");
/* short content hash so browsers pick up CSS/JS changes immediately after a deploy */
const assetVer = (rel) => {
  try {
    const f = pathx.join(__dirname, "..", "public", rel);
    return cryptox.createHash("md5").update(fsx.readFileSync(f)).digest("hex").slice(0, 8);
  } catch (e) { return String(Date.now()); }
};
const CSS_V = assetVer("assets/css/styles.css");
const JS_V = assetVer("assets/js/app.js");

const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text || "Hi ELOANSS, I'd like to know more about your loan & insurance services.")}`;

/* ---- <head> -------------------------------------------------------------- */
function head({ title, description, path }) {
  const url = `https://${site.domain}/${path === "index.html" ? "" : path}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | ${site.name}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#075E45">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title} | ${site.name}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${site.name}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="180x180" href="/assets/img/brand/favicon-180.png">
<link rel="apple-touch-icon" href="/assets/img/brand/favicon-180.png">
<script>(function(){try{var t=localStorage.getItem("eloanss-theme");if(t==="dark"||t==="light"||t==="navy")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();</script>
<link rel="stylesheet" href="/assets/css/styles.css?v=${CSS_V}">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FinancialService","name":"${site.name}","description":"${site.tagline}","url":"https://${site.domain}","telephone":"${site.phone}","email":"${site.email}","address":{"@type":"PostalAddress","streetAddress":"#8-3-903/F/7&10, Ratna Complex, Flat No: 404, Opp. R.S. Brothers, Y R Guda, Ameerpet","addressLocality":"Hyderabad","addressRegion":"Telangana","postalCode":"500038","addressCountry":"IN"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${site.rating}","reviewCount":"12400"}}
</script>
</head>
<body>`;
}

/* ---- Brand --------------------------------------------------------------- */
/* kind: "lockup" = icon + wordmark (header, tight vertical space)
        "full"   = icon + wordmark + tagline (footer, more room) */
const brand = (href = "/", variant = "", kind = "lockup") => {
  const file = kind === "full" ? "logo-full" : "logo-lockup";
  return `<a class="brand brand--${kind} ${variant}" href="${href}" aria-label="${site.name} home">
  <picture>
    <source type="image/webp" srcset="/assets/img/brand/${file}.webp">
    <img src="/assets/img/brand/${file}.png" alt="${site.name}" decoding="async">
  </picture>
</a>`;
};

/* ---- Header: utility bar + dark primary nav ------------------------------ */
function header(active = "") {
  const na = (key) => (active === key ? "is-active" : "");

  const megaCol = (g) => `<div class="mega__col">
      <h5>${g.group}</h5>
      ${(g.items.slice(0, 6)).map((it) => { const [n, h] = Array.isArray(it) ? it : [it, g.href]; return `<a href="${h}">${n}</a>`; }).join("")}
      ${g.items.length > 6 ? `<a class="mega__more" href="${g.href}">+${g.items.length - 6} more</a>` : ""}
    </div>`;
  const loanMega = loanCatalogue.map(megaCol).join("");
  const insMega2 = insuranceCatalogue.map(megaCol).join("");

  const insMega = insurance.map((i) => `<a class="mega__link" href="/insurance/${i.slug}.html">
      <span class="mega__ic">${icons[i.icon]}</span><span class="mega__t">${i.name}</span>
    </a>`).join("");

  const calcMega = [
    ["EMI Calculator", "/calculators.html#emi", "calculator"],
    ["Eligibility Check", "/calculators.html#eligibility", "checkCircle"],
    ["Credit Score Check", "/credit-score.html", "gauge"],
    ["Compare Loan Offers", "/loans.html", "scale"],
    ["Balance Transfer Saving", "/loans/home-loan.html", "trendingUp"],
    ["Insurance Premium Quote", "/insurance.html", "umbrella"],
  ].map(([n, h, ic]) => `<a class="mega__link" href="${h}"><span class="mega__ic">${icons[ic]}</span><span class="mega__t">${n}</span></a>`).join("");

  const resMega = [
    ["Blog & Guides", "/blog.html", "fileText"],
    ["How It Works", "/how-it-works.html", "route"],
    ["About ELOANSS", "/about.html", "info"],
    ["Global Distributor", "/partner.html", "handshake"],
    ["Contact Us", "/contact.html", "headset"],
    ["Grievance Redressal", "/grievance.html", "shield"],
  ].map(([n, h, ic]) => `<a class="mega__link" href="${h}"><span class="mega__ic">${icons[ic]}</span><span class="mega__t">${n}</span></a>`).join("");

  return `<header class="header">
  <div class="util">
    <div class="container util__in">
      ${brand()}
      <span class="util__slogan">Your Financial Growth Partner</span>
      <form class="util__search" role="search" data-simplesearch>
        <span class="util__searchic">${icons.search}</span>
        <input type="search" placeholder="Search loans, insurance, banks, calculators…" aria-label="Search ELOANSS">
      </form>
      <div class="util__acts">
        <a class="util__link" href="/contact.html">${icons.headset}<span>Support</span></a>
        <a class="util__link" href="/contact.html">${icons.fileText}<span>Track Application</span></a>
        <a class="btn btn--blue btn--sm" href="/contact.html">${icons.arrowRight} Apply Now</a>
        <button class="themebtn" data-theme-toggle aria-label="Switch between light and dark theme" title="Switch theme"><span class="themebtn__sun">${icons.sun}</span><span class="themebtn__moon">${icons.moon}</span><span class="themebtn__navy">${icons.navyTheme}</span></button>
        <button class="util__grid" aria-label="All products" data-jump="#universe">${icons.grid}</button>
      </div>
      <button class="nav__toggle" aria-label="Open menu">${icons.menu}</button>
    </div>
  </div>

  <nav class="pnav">
    <div class="container pnav__in">
      <ul class="pnav__menu">
        <li><a class="pnav__link ${na("home")}" href="/index.html">Home</a></li>
        <li class="pnav__item--has-menu">
          <a class="pnav__link ${na("loans")}" href="/loans.html">Loans ${icons.chevronDown}</a>
          <div class="mega mega--cols"><div class="container"><div class="mega__cols">${loanMega}</div>
            <a class="mega__foot" href="/business-finance.html"><span>Working Capital &amp; Business Finance — ₹10 Lakhs to ₹100 Crores</span>${icons.arrowRight}</a>
            <a class="mega__foot" href="/loans.html"><span>Browse all 105 loan products</span>${icons.arrowRight}</a></div></div>
        </li>
        <li><a class="pnav__link ${na("banks")}" href="/banks.html">Banks &amp; NBFCs</a></li>
        <li class="pnav__item--has-menu">
          <a class="pnav__link ${na("insurance")}" href="/insurance.html">Insurance ${icons.chevronDown}</a>
          <div class="mega mega--cols"><div class="container"><div class="mega__cols mega__cols--ins">${insMega2}</div>
            <a class="mega__foot" href="/insurance.html"><span>Browse all 177 insurance products</span>${icons.arrowRight}</a></div></div>
        </li>
        <li><a class="pnav__link ${na("cards")}" href="/credit-cards.html">Credit Cards</a></li>
        <li><a class="pnav__link ${na("score")}" href="/credit-score.html">Credit Score</a></li>
        <li class="pnav__item--has-menu">
          <a class="pnav__link ${na("calc")}" href="/calculators.html">Calculators ${icons.chevronDown}</a>
          <div class="mega"><div class="container"><div class="mega__grid">${calcMega}</div></div></div>
        </li>
        <li><a class="pnav__link ${na("share")}" href="/share-markets.html">Share Markets</a></li>
        <li><a class="pnav__link ${na("invest")}" href="/investments.html">Investments</a></li>
        <li><a class="pnav__link ${na("partner")}" href="/partner.html">Global Distributor</a></li>
        <li class="pnav__item--has-menu">
          <a class="pnav__link ${na("blog")}" href="/blog.html">Resources ${icons.chevronDown}</a>
          <div class="mega"><div class="container"><div class="mega__grid">${resMega}</div></div></div>
        </li>
        <li><a class="pnav__link ${na("about")}" href="/about.html">About Us</a></li>
        <li><a class="pnav__link ${na("how")}" href="/how-it-works.html">Services</a></li>
        <li><a class="pnav__link ${na("contact")}" href="/contact.html">Contact Us</a></li>
      </ul>
    </div>
  </nav>
</header>
${mobileNav(active)}`;
}

function mobileNav() {
  const loanLinks = loans.map((l) => `<a href="/loans/${l.slug}.html">${l.name}</a>`).join("");
  const insLinks = insurance.map((i) => `<a href="/insurance/${i.slug}.html">${i.name}</a>`).join("");
  return `<div class="mnav">
  <div class="mnav__scrim"></div>
  <div class="mnav__panel">
    <div class="mnav__head">${brand()}<button class="mnav__close" aria-label="Close menu">${icons.close}</button></div>
    <div class="mnav__group"><a class="mnav__single" href="/index.html">Home</a></div>
    <div class="mnav__group">
      <button class="mnav__gbtn">Loans ${icons.chevronDown}</button>
      <div class="mnav__sub"><a href="/loans.html"><strong>All Loans</strong></a>${loanLinks}</div>
    </div>
    <div class="mnav__group">
      <button class="mnav__gbtn">Insurance ${icons.chevronDown}</button>
      <div class="mnav__sub"><a href="/insurance.html"><strong>All Insurance</strong></a>${insLinks}</div>
    </div>
    <div class="mnav__group"><a class="mnav__single" href="/banks.html">Banks &amp; NBFCs</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/credit-cards.html">Credit Cards</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/credit-score.html">Credit Score</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/calculators.html">Calculators</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/share-markets.html">Share Markets</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/investments.html">Investments</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/partner.html">Global Distributor</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/blog.html">Resources</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/about.html">About Us</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/how-it-works.html">Services</a></div>
    <div class="mnav__group"><a class="mnav__single" href="/contact.html">Contact Us</a></div>
    <div class="mnav__group"><button class="mnav__single" data-theme-toggle style="width:100%;text-align:left;background:none;border:0">Switch theme</button></div>
    <div class="mnav__cta">
      <a class="btn btn--gold btn--block" href="/contact.html">Apply for Loan</a>
      <a class="btn btn--ghost btn--block" href="tel:${site.phoneHref}">${icons.phone} ${site.phone}</a>
    </div>
  </div>
</div>`;
}

/* ---- Floating actions + sticky CTA -------------------------------------- */
function floatingActions() {
  return `<a class="wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><span class="wa__pulse"></span>${icons.whatsapp}</a>
<div class="sticky-cta">
  <small>Get the best offer<span>Free · No obligation</span></small>
  <a class="btn btn--gold btn--sm" href="/contact.html">Apply Now ${icons.arrowRight}</a>
</div>`;
}

/* ---- Footer -------------------------------------------------------------- */
function footer() {
  const cols = footerCols.map(([title, links]) => `<div class="fcol">
      <h4>${title}</h4>
      <ul class="footer__links">${links.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join("")}</ul>
    </div>`).join("");

  return `<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brandcol">
        ${brand("/", "brand--light", "full")}
        <p class="footer__about">${site.tagline}. We compare offers from ${site.partners} banks and NBFCs so you get the best deal — fast, transparent and expert-guided.</p>
        <ul class="footer__contact">
          <li>${icons.mapPin}<span>${site.address}</span></li>
          <li>${icons.phone}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
          <li>${icons.mail}<a href="mailto:${site.email}">${site.email}</a></li>
          <li>${icons.clock}<span>Mon–Sat, 10:00 AM – 7:00 PM</span></li>
        </ul>
        <div class="footer__social">
          <a href="#" aria-label="Facebook">${icons.facebook}</a>
          <a href="#" aria-label="Instagram">${icons.instagram}</a>
          <a href="#" aria-label="LinkedIn">${icons.linkedin}</a>
          <a href="#" aria-label="YouTube">${icons.youtube}</a>
          <a href="#" aria-label="X">${icons.xLogo}</a>
        </div>
      </div>
      ${cols}
      <div class="fcol fcol--wide">
        <h4>Subscribe to Our Newsletter</h4>
        <p class="fcol__note">Get financial tips and the latest offers.</p>
        <form class="nl" data-simpleform>
          <input class="nl__input" type="email" name="email" required placeholder="Enter your email" aria-label="Email address">
          <button class="nl__btn" type="submit" aria-label="Subscribe">${icons.arrowRight}</button>
          <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} Subscribed — thank you!</span>
        </form>
        <div class="footer__apps">
          <a class="storebtn" href="#" aria-label="Get it on Google Play">${icons.play}<span><small>Get it on</small>Google Play</span></a>
          <a class="storebtn" href="#" aria-label="Download on the App Store">${icons.download}<span><small>Download on the</small>App Store</span></a>
        </div>
      </div>
      <div class="fcol fcol--qr">
        <h4>Scan to download app</h4>
        <div class="qr" aria-hidden="true"></div>
        <p class="fcol__note">Point your camera to install the ELOANSS app.</p>
      </div>
    </div>

    <p class="footer__disclaimer"><strong style="color:#CFE8DE">Disclaimer:</strong> ${site.name} is a loan and insurance facilitator / broker and <strong>does not lend money or underwrite insurance directly</strong>. We help customers compare and connect with banks, NBFCs and insurers. All loans and insurance policies are subject to the sole discretion, terms and approval of the respective lender or insurer. Final interest rates, charges, sum assured and approval depend entirely on the lender/insurer's assessment of your profile. Our services are 100% free for customers. Product names and logos are the property of their respective owners.</p>
  </div>

  <div class="skyband">
    <div class="skyband__art" aria-hidden="true"></div>
    <div class="container skyband__in">
      <div class="skyband__copy">
        <span>© <span data-year>2026</span> ${site.name}. All rights reserved.</span>
        <div class="footer__legal">
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/terms.html">Terms &amp; Conditions</a>
          <a href="/disclaimer.html">Disclaimer</a>
          <a href="/grievance.html">Grievance Redressal</a>
        </div>
      </div>
      <div class="skyband__nl">
        <div><b>Subscribe to Our Newsletter</b><small>Get financial tips and latest offers.</small></div>
        <form class="nl nl--dark" data-simpleform>
          <input class="nl__input" type="email" name="email" required placeholder="Enter your email" aria-label="Email address">
          <button class="nl__btn" type="submit" aria-label="Subscribe">${icons.arrowRight}</button>
          <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} Subscribed!</span>
        </form>
      </div>
      <p class="skyband__tag">Smarter Finances, Brighter Tomorrows.</p>
    </div>
  </div>
</footer>
${floatingActions()}
<script src="/assets/js/app.js?v=${JS_V}" defer></script>
</body>
</html>`;
}

/* ---- Reusable sections --------------------------------------------------- */

/* Compliance note */
const complianceNote = () => `<div class="note">
  <span class="ic">${icons.info}</span>
  <div><b>ELOANSS is a facilitator.</b><p>Final interest rates, charges and approval depend entirely on the lender. We help you compare and apply — the lending decision rests with the bank or NBFC.</p></div>
</div>`;

/* EMI Calculator block. cfg = {amount:[min,max,def], rate:[..], tenure:[..]} */
function emiCalculator(cfg, { compact = false } = {}) {
  const c = cfg || { amount: [50000, 5000000, 1000000], rate: [8, 24, 12], tenure: [1, 30, 5] };
  const fmtCr = (n) => n >= 10000000 ? (n / 10000000) + " Cr" : n >= 100000 ? (n / 100000) + " L" : (n / 1000) + "K";
  return `<div class="emi" data-emi>
    <div class="emi__panel">
      <div class="emi__row">
        <div class="emi__lab"><span>Loan Amount</span><span class="emi__val" data-out-amount></span></div>
        <input type="range" data-emi-amount min="${c.amount[0]}" max="${c.amount[1]}" step="${Math.max(1000, Math.round((c.amount[1]-c.amount[0])/200/1000)*1000)}" value="${c.amount[2]}">
        <div class="emi__scale"><span>₹${fmtCr(c.amount[0])}</span><span>₹${fmtCr(c.amount[1])}</span></div>
      </div>
      <div class="emi__row">
        <div class="emi__lab"><span>Interest Rate (p.a.)</span><span class="emi__val" data-out-rate></span></div>
        <input type="range" data-emi-rate min="${c.rate[0]}" max="${c.rate[1]}" step="0.05" value="${c.rate[2]}">
        <div class="emi__scale"><span>${c.rate[0]}%</span><span>${c.rate[1]}%</span></div>
      </div>
      <div class="emi__row">
        <div class="emi__lab"><span>Tenure</span><span class="emi__val" data-out-tenure></span></div>
        <input type="range" data-emi-tenure min="${c.tenure[0]}" max="${c.tenure[1]}" step="1" value="${c.tenure[2]}">
        <div class="emi__scale"><span>${c.tenure[0]} yr</span><span>${c.tenure[1]} yr</span></div>
      </div>
    </div>
    <div class="emi__result">
      <span class="lab">Estimated Monthly EMI</span>
      <div class="emi__emi" data-out-emi>₹0</div>
      <div class="emi__break">
        <div class="r"><span><span class="emi__dot" style="background:var(--gold)"></span>Principal</span><b data-out-principal></b></div>
        <div class="r"><span><span class="emi__dot" style="background:#4E7C6C"></span>Total Interest</span><b data-out-interest></b></div>
        <div class="r"><span>Total Payable</span><b data-out-total></b></div>
      </div>
      ${compact ? "" : `<a class="btn btn--gold btn--block mt" href="/contact.html">Get My Best Offer ${icons.arrowRight}</a>`}
      <p class="emi__note">Indicative estimate. Final EMI depends on the lender's approved rate and terms.</p>
    </div>
  </div>`;
}

/* FAQ accordion */
function faqSection(faqs, title = "Frequently Asked Questions") {
  const items = faqs.map(([q, a]) => `<div class="faq__item">
    <button class="faq__q">${q}<span class="pm">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'}</span></button>
    <div class="faq__a"><p>${a}</p></div>
  </div>`).join("");
  return `<section class="section section--soft"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">FAQs</span><h2>${title}</h2><p>Everything you need to know. Still have questions? Our experts are a call away.</p></div>
    <div class="faq reveal">${items}</div>
  </div></section>`;
}

/* Multi-step application form */
function applicationForm(productName = "") {
  const opts = loans.map((l) => `<option>${l.name}</option>`).join("");
  return `<form class="form-card" data-msform>
    <div class="steps-bar">
      <div class="sb"><span class="sb__dot">1</span><span class="sb__line"></span></div>
      <div class="sb"><span class="sb__dot">2</span><span class="sb__line"></span></div>
      <div class="sb"><span class="sb__dot">3</span></div>
    </div>
    <div class="fstep is-active">
      <h4>Your requirement</h4>
      <div class="field"><label>Product ${productName ? "" : "<span class='req'>*</span>"}</label>
        <select class="select" required>${productName ? `<option>${productName}</option>` : `<option value="">Select a product</option>` + opts}</select></div>
      <div class="field-row">
        <div class="field"><label>Loan amount (₹) <span class="req">*</span></label><input class="input" type="number" required placeholder="e.g. 500000"></div>
        <div class="field"><label>City <span class="req">*</span></label><input class="input" required placeholder="Your city"></div>
      </div>
    </div>
    <div class="fstep">
      <h4>About you</h4>
      <div class="field-row">
        <div class="field"><label>Full name <span class="req">*</span></label><input class="input" required placeholder="Your name"></div>
        <div class="field"><label>Employment type <span class="req">*</span></label>
          <select class="select" required><option value="">Select</option><option>Salaried</option><option>Self-employed</option><option>Business owner</option></select></div>
      </div>
      <div class="field"><label>Monthly income (₹) <span class="req">*</span></label><input class="input" type="number" required placeholder="e.g. 50000"></div>
    </div>
    <div class="fstep">
      <h4>Contact details</h4>
      <div class="field-row">
        <div class="field"><label>Mobile number <span class="req">*</span></label><input class="input" type="tel" required placeholder="10-digit mobile"></div>
        <div class="field"><label>Email</label><input class="input" type="email" placeholder="you@email.com"></div>
      </div>
      <div class="field" style="display:flex;gap:10px;align-items:flex-start"><input type="checkbox" required style="margin-top:5px"><label style="font-weight:400;font-size:.85rem;color:var(--muted)">I authorise ELOANSS to contact me and share my details with partner lenders. I agree to the <a href="/terms.html" style="color:var(--gold-600)">Terms</a> &amp; <a href="/privacy.html" style="color:var(--gold-600)">Privacy Policy</a>.</label></div>
    </div>
    <div class="form-nav">
      <button type="button" class="btn btn--ghost" data-prev>Back</button>
      <button type="button" class="btn btn--navy" data-next>Continue ${icons.arrowRight}</button>
      <button type="submit" class="btn btn--gold" style="display:none">Submit Application</button>
    </div>
    <div class="form-ok" hidden>
      <span class="ic">${icons.checkCircle}</span>
      <h4>Thank you! Your enquiry is submitted.</h4>
      <p>Our loan expert will call you shortly with the best matched offers. This is a demo form — no data is sent.</p>
    </div>
  </form>
  <script>
  // reveal submit on last step
  document.querySelectorAll('[data-msform]').forEach(function(f){
    f.addEventListener('click',function(e){
      var steps=f.querySelectorAll('.fstep');var next=f.querySelector('[data-next]');var sub=f.querySelector('button[type=submit]');
      setTimeout(function(){var last=steps[steps.length-1].classList.contains('is-active');next.style.display=last?'none':'';sub.style.display=last?'':'none';},10);
    });
  });
  </script>`;
}

module.exports = { head, header, footer, brand, floatingActions, complianceNote, emiCalculator, faqSection, applicationForm, waLink };
