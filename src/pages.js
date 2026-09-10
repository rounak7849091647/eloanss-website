/* ELOANSS — page templates */
const { icons } = require("./icons");
const { site, loans, insurance, steps, testimonials, posts, partnerBenefits,
  goals, lenders, lenderFilters, loanCatalogue, insuranceCatalogue, insuranceMajor, insuranceMinor,
  whyPillars, insuranceTrust, investTabs, cardTypes, incomeBands, cardRewards, heroChips, distributorPoints,
  appPoints, businessFinance, lenderProfiles, LENDER_KIND, BANK_HIGHLIGHTS, NBFC_HIGHLIGHTS, GOLD_HIGHLIGHTS } = require("./data");
const C = require("./components");

const layout = (meta, active, body) => C.head(meta) + C.header(active) + body + C.footer();

const findLoan = (slug) => loans.find((l) => l.slug === slug);
const findIns = (slug) => insurance.find((i) => i.slug === slug);
const catName = (slug) => { const l = findLoan(slug); const i = findIns(slug); return l ? l.name : i ? i.name : slug; };
const catLink = (slug) => findLoan(slug) ? `/loans/${slug}.html` : `/insurance/${slug}.html`;
const catIcon = (slug) => { const l = findLoan(slug); const i = findIns(slug); return icons[(l || i || {}).icon] || icons.wallet; };

/* Catalogue items are either "Name" (uses the group default href) or ["Name", "/href"]. */
const catItems = (g) => g.items.map((it) => (Array.isArray(it) ? it : [it, g.href]));
const catCount = (list) => list.reduce((n, g) => n + g.items.length, 0);

/* Full catalogue directory: every product, grouped, with a jump bar. */
function catalogueSection(list, id, title, sub) {
  const jump = list.map((g, k) => `<a href="#${id}-${k}">${g.group}</a>`).join("");
  const groups = list.map((g, k) => `<div class="catgroup reveal" id="${id}-${k}">
      <div class="catgroup__head">
        <span class="catgroup__ic">${icons[g.icon] || icons.layers}</span>
        <div><h3>${g.group}</h3><p>${g.blurb}</p></div>
        <span class="catgroup__n">${g.items.length}</span>
      </div>
      <ul class="catlist">${catItems(g).map(([n, h]) => `<li><a href="${h}">${icons.chevronRight}<span>${n}</span></a></li>`).join("")}</ul>
      ${g.extras ? `<div class="catextras"><b>${g.extrasLabel}</b><div>${g.extras.map((e) => `<span>${e}</span>`).join("")}</div></div>` : ""}
    </div>`).join("");
  return `<section class="section section--soft" id="${id}"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">Full catalogue</span><h2>${title}</h2><p>${sub}</p></div>
    <nav class="catjump reveal">${jump}</nav>
    <div class="catgrid">${groups}</div>
    <p class="lender__note">${icons.info} Availability, eligibility and pricing vary by partner. ELOANSS facilitates access — it does not lend or underwrite.</p>
  </div></section>`;
}

/* Build-time logo lookup. Drop a licensed file at
   public/assets/img/lenders/<slug>.(svg|png|webp|jpg) and it is used automatically;
   otherwise a wordmark placeholder is rendered so nothing appears broken. */
const fsL = require("fs");
const pathL = require("path");
const LOGO_DIR = pathL.join(__dirname, "..", "public", "assets", "img", "lenders");
const LOGO_EXT = ["svg", "png", "webp", "jpg", "jpeg"];
function lenderLogo(slug) {
  for (const ext of LOGO_EXT) {
    if (fsL.existsSync(pathL.join(LOGO_DIR, slug + "." + ext))) return "/assets/img/lenders/" + slug + "." + ext;
  }
  return null;
}
const CAT_LABEL = { personal: "Personal loans", business: "Business loans", home: "Home & property",
  vehicle: "Vehicle loans", gold: "Gold & secured", msme: "MSME finance" };
function lenderTile(name, cat, slug) {
  const src = lenderLogo(slug);
  const inner = src
    ? `<img class="lender__logo" src="${src}" alt="${name}" loading="lazy" decoding="async">`
    : `<span class="lender__name">${name}</span><span class="lender__cat">${CAT_LABEL[cat] || "Lending partner"}</span>`;
  return `<a class="lender${src ? " lender--haslogo" : ""}" data-cat="${cat}" href="/banks/${slug}.html" title="${name} — products, rates and eligibility">${inner}<span class="lender__go">${icons.arrowRight}</span></a>`;
}

const crumbs = (parts) => `<nav class="crumbs">${parts.map((p, k) => k < parts.length - 1 ? `<a href="${p[1]}">${p[0]}</a>${icons.chevronRight}` : `<span>${p[0]}</span>`).join("")}</nav>`;

/* ======================================================================= HOME */
function home() {
  /* ---- hero: trust chips + circular journey hub ---- */
  const chips = heroChips.map(([t, ic]) => `<li>${icons[ic]}<span>${t}</span></li>`).join("");

  /* ---- goals road ---- */
  const goalItems = goals.map(([t, h, ic, col, img], k) => `<a class="goal reveal" data-d="${k % 4}" href="${h}">
      <span class="goal__pic" style="--gc:${col}">
        <picture>
          <source type="image/webp" srcset="/assets/img/goals/${img}.webp">
          <img src="/assets/img/goals/${img}.jpg" alt="" width="240" height="240" loading="lazy" decoding="async">
        </picture>
      </span>
      <span class="goal__t">${t}</span>
    </a>`).join("");

  /* ---- lender wall ---- */
  const lenderTiles = lenders.map(([n, cat, slug]) => lenderTile(n, cat, slug)).join("");
  const lenderPills = lenderFilters.map((f, k) => `<button class="fpill ${k === 0 ? "is-active" : ""}" data-filter="${f.toLowerCase()}">${f}</button>`).join("");

  /* ---- loan universe tabs ---- */
  const uniTabs = loanCatalogue.map((g, k) => `<button class="utab ${k === 0 ? "is-active" : ""}" data-utab="${k}">${g.group}</button>`).join("");
  const uniPanels = loanCatalogue.map((g, k) => `<div class="upanel ${k === 0 ? "is-active" : ""}" data-upanel="${k}">
      <p class="upanel__blurb">${g.blurb}</p>
      <div class="upanel__grid">${catItems(g).map(([n, h]) => `<a href="${h}">${icons.chevronRight}<span>${n}</span></a>`).join("")}</div>
    </div>`).join("");

  /* ---- why choose ---- */
  const pillars = whyPillars.map(([t, ic], k) => `<div class="pillar reveal" data-d="${k % 4}"><span class="pillar__ic">${icons[ic]}</span><span>${t}</span></div>`).join("");

  /* ---- invest ---- */
  const invTabs = investTabs.map(([n], k) => `<button class="itab ${k === 0 ? "is-active" : ""}" data-itab="${k}">${n}</button>`).join("");
  const invPanels = investTabs.map(([, d], k) => `<p class="ipanel ${k === 0 ? "is-active" : ""}" data-ipanel="${k}">${d}</p>`).join("");

  /* ---- credit cards ---- */
  const rewardIcons = cardRewards.map(([n, ic]) => `<div class="rew"><span>${icons[ic]}</span><small>${n}</small></div>`).join("");

  /* ---- bottom row ---- */
  const tSlides = testimonials.map(([name, city, product, quote, img], k) => `<div class="tslide ${k === 0 ? "is-active" : ""}" data-tslide="${k}">
      <blockquote>“${quote}”</blockquote>
      <div class="tslide__who"><img src="${img}" alt="" loading="lazy"><div><b>${name}</b><span>${city} · ${product}</span></div></div>
      <div class="stars">★★★★★</div>
    </div>`).join("");
  const tDots = testimonials.map((_, k) => `<button class="tdot ${k === 0 ? "is-active" : ""}" data-tdot="${k}" aria-label="Testimonial ${k + 1}"></button>`).join("");

  const blogCards = posts.slice(0, 3).map(([slug, tag, title, excerpt, date, img]) => `<a class="rpost" href="/blog/${slug}.html">
      <img src="${img}" alt="" loading="lazy">
      <b>${title}</b><small>${date}</small>
    </a>`).join("");

  const body = `
<!-- ============================================ HERO -->
<section class="vhero">
  <picture class="vhero__bg">
    <source type="image/webp" srcset="/assets/img/hero-760.webp 760w, /assets/img/hero-1200.webp 1200w, /assets/img/hero-2000.webp 2000w" sizes="100vw">
    <img src="/assets/img/hero-1200.jpg" srcset="/assets/img/hero-760.jpg 760w, /assets/img/hero-1200.jpg 1200w, /assets/img/hero-2000.jpg 2000w" sizes="100vw" alt="" width="2098" height="750" fetchpriority="high" decoding="async">
  </picture>
  <span class="vhero__scrim" aria-hidden="true"></span>
  <div class="container vhero__in">
    <div class="vhero__copy reveal">
      <span class="vhero__eyebrow">Simple Solutions · Bigger Possibilities</span>
      <h1>Get Instant Loans Online –<br><span class="hl">Compare &amp; Apply</span> in Minutes</h1>
      <p>Best personal, business, home, gold &amp; vehicle loans from top banks &amp; NBFCs.</p>
      <div class="vhero__cta">
        <a class="btn btn--blue btn--lg" href="/contact.html">Apply for Loan ${icons.arrowRight}</a>
        <a class="btn btn--outline-light btn--lg" href="/credit-score.html">Check Free Credit Score</a>
      </div>
      <ul class="vhero__chips">${chips}</ul>
    </div>
  </div>
  <div class="vhero__statbar">
    <div class="container vhero__statbar-in">
      <div class="vstatb"><span class="vstatb__ic">${icons.star}</span><div><b>${site.rating}/5</b><small>${site.reviews} reviews</small></div></div>
      <div class="vstatb"><span class="vstatb__ic">${icons.bank}</span><div><b>${site.partners}</b><small>Lending partners</small></div></div>
      <div class="vstatb"><span class="vstatb__ic">${icons.rupee}</span><div><b>${site.disbursed}</b><small>Loans facilitated</small></div></div>
      <div class="vstatb"><span class="vstatb__ic">${icons.users}</span><div><b>${site.customers}</b><small>Happy customers</small></div></div>
    </div>
  </div>
</section>

<!-- ============================================ GOALS ROAD -->
<section class="section goals" id="goals">
  <div class="container">
    <div class="goals__card reveal">
      <div class="goals__head">
        <span class="goals__ic">${icons.compass}</span>
        <div>
          <h2>What are you planning for?</h2>
          <p>Find the right financial path for your goals.</p>
        </div>
        <div class="goals__headr">
          <span class="goals__note">Life moves forward. So should your finances.</span>
          <a class="btn btn--blue btn--sm" href="/loans.html">Explore All Loans ${icons.arrowRight}</a>
        </div>
      </div>
      <div class="goals__road">
        <div class="goals__sign goals__sign--l"><b>Bigger Goals</b><b>Brighter Tomorrow</b></div>
        <div class="goals__grid">${goalItems}</div>
        <div class="goals__sign goals__sign--r"><b>Different Goals</b><b>One Destination</b><span>ELOANSS</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================ SCORE · EMI · PROMO -->
<section class="section trio" id="calculators">
  <div class="container trio__grid">

    <div class="card score reveal" id="credit-score">
      <h3>Check Your Free <span class="hl-b">Credit Score</span></h3>
      <p class="score__sub">Know your CIBIL / Experian score and take control of your financial future.</p>
      <div class="score__body">
        <form class="score__form" data-simpleform>
          <input class="input" type="tel" name="mobile" required placeholder="Enter your mobile number" aria-label="Mobile number">
          <button class="btn btn--blue btn--block" type="submit">Get My Free Score ${icons.arrowRight}</button>
          <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} We'll text your score shortly.</span>
        </form>
        <div class="gauge">
          <svg viewBox="0 0 200 118" aria-hidden="true">
            <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#B84040"/><stop offset="35%" stop-color="#C9A227"/>
              <stop offset="70%" stop-color="#7DA83F"/><stop offset="100%" stop-color="#16845B"/>
            </linearGradient></defs>
            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="#EBF0EC" stroke-width="11" stroke-linecap="round"/>
            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="url(#gg)" stroke-width="11" stroke-linecap="round"
                  stroke-dasharray="251" stroke-dashoffset="50" data-gauge-arc/>
            <line x1="100" y1="110" x2="100" y2="62" stroke="#075E45" stroke-width="3" stroke-linecap="round" data-gauge-needle transform="rotate(48 100 110)"/>
            <circle cx="100" cy="110" r="5" fill="#075E45"/>
          </svg>
          <div class="gauge__val"><b data-gauge-num>780</b><span>Excellent</span></div>
          <div class="gauge__scale"><span>300</span><span>900</span></div>
        </div>
      </div>
      <ul class="score__points">
        <li>${icons.check} Free Forever</li><li>${icons.check} Instant Result</li>
        <li>${icons.check} No Impact on Credit Score</li><li>${icons.check} Personalised Insights</li>
      </ul>
      <div class="score__bureaus"><span>CIBIL</span><span>Experian</span><small>Powered by trusted partners</small></div>
    </div>

    <div class="card emicard reveal" data-d="1">
      <h3>EMI Calculator</h3>
      <div class="emicard__tabs">
        <button class="etab is-active" data-etab="home">Home Loan</button>
        <button class="etab" data-etab="personal">Personal Loan</button>
        <button class="etab" data-etab="car">Car Loan</button>
        <button class="etab" data-etab="business">Business Loan</button>
      </div>
      ${C.emiCalculator({ amount: [500000, 50000000, 5000000], rate: [8.35, 11.5, 8.5], tenure: [5, 30, 20] }, { dark: true })}
    </div>

    <a class="promo reveal" data-d="2" href="/loans/home-loan.html">
      <span class="promo__art" aria-hidden="true"></span>
      <div class="promo__in">
        <h3>Turn Aspirations into Addresses</h3>
        <p>Home Loans at Attractive Rates</p>
        <span class="btn btn--blue btn--sm">Apply Now ${icons.arrowRight}</span>
      </div>
    </a>

  </div>
</section>

<!-- ============================================ LENDER NETWORK -->
<section class="section section--soft" id="partners">
  <div class="container">
    <div class="lender__head reveal">
      <div>
        <h2>Our Banking &amp; Lending Network</h2>
        <p>Partnering with India's leading financial institutions to bring you the best offers.</p>
      </div>
      <div class="lender__tools">
        <div class="fpills">${lenderPills}</div>
        <a class="lender__all" href="/banks.html">View All Partners ${icons.arrowRight}</a>
      </div>
    </div>
    <div class="lender__wall reveal" data-lenderwall>${lenderTiles}</div>
    <p class="lender__note">${icons.info} All partner logos and trademarks are the property of their respective owners.</p>
  </div>
</section>

<!-- ============================================ LOAN UNIVERSE -->
<section class="section universe" id="universe">
  <div class="container">
    <div class="universe__card reveal">
      <div class="universe__art" aria-hidden="true"><span class="universe__door"></span></div>
      <div class="universe__in">
        <h2>Explore Our Loan Universe</h2>
        <p class="universe__sub">A complete range of financial solutions, designed for every stage of your life.</p>
        <div class="utabs">${uniTabs}</div>
        <div class="upanels">${uniPanels}</div>
        <a class="btn btn--blue" href="/loans.html">View Details ${icons.arrowRight}</a>
      </div>
      <p class="universe__scribble">Small Steps<br>Big Possibilities</p>
    </div>
  </div>
</section>

<!-- ============================================ INSURANCE -->
<section class="section insv2" id="insurance-grid">
  <div class="container">

    <div class="insv2__top">
      <div class="insv2__copy reveal">
        <span class="insv2__badge">${icons.checkCircle} Insurance</span>
        <h2>Insurance for a<br><span class="hl-b">Safer Tomorrow</span></h2>
        <p class="insv2__sub">Protect what matters, at every step of life.</p>
        <ul class="insv2__trust">
          ${insuranceTrust.map(([t, d, ic]) => `<li>
            <span class="insv2__tic">${icons[ic]}</span>
            <span><b>${t}</b><small>${d}</small></span>
          </li>`).join("")}
        </ul>
      </div>

      <div class="insv2__media reveal" data-d="2">
        <div class="insframe">
          <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=760&h=800&fit=crop" alt="A family protected by the right insurance cover" width="760" height="760" loading="lazy" decoding="async">
        </div>
        <span class="insv2__float">${icons.umbrella}<span>Because your<br>tomorrow matters</span></span>
      </div>
    </div>

    <div class="inscards">
      ${insuranceMajor.map((c, k) => `<a class="inscard reveal" data-d="${k % 4}" href="/insurance/${c.slug}.html" style="--ac:${c.accent};--tint:${c.tint}">
        <span class="inscard__art" style="background-image:url('${c.img}')" aria-hidden="true"></span>
        <span class="inscard__head">
          <span class="inscard__ic">${icons[c.icon]}</span>
          <span><b>${c.name}</b><small>${c.tagline}</small></span>
        </span>
        <ul class="inscard__list">${c.items.map((i) => `<li>${i}</li>`).join("")}</ul>
        <span class="inscard__go">Explore Plans ${icons.arrowRight}</span>
      </a>`).join("")}
    </div>

    <div class="instiles">
      ${insuranceMinor.map(([n, ic, slug, accent, tint], k) => `<a class="instile reveal" data-d="${k % 4}" href="/insurance/${slug}.html" style="--ac:${accent};--tint:${tint}">
        <span class="instile__ic">${icons[ic]}</span><b>${n}</b>
      </a>`).join("")}
    </div>

    <div class="insband reveal">
      <span class="insband__shield">${icons.shield}</span>
      <div class="insband__copy">
        <b>Get the right coverage. For every chapter of your life.</b>
        <span>Compare. Choose. Stay Protected.</span>
      </div>
      <a class="btn btn--gold" href="/insurance.html">Explore All Insurance Plans ${icons.arrowRight}</a>
    </div>

  </div>
</section>

<!-- ============================================ WHY CHOOSE -->
<section class="section why">
  <div class="container">
    <div class="why__card reveal">
      <div class="why__art" aria-hidden="true"></div>
      <div class="why__in">
        <h2>Why Choose <span class="hl">ELOANSS</span>?</h2>
        <div class="why__pillars">${pillars}</div>
      </div>
      <div class="why__vm">
        <div class="vmrow"><span class="ic">${icons.eye}</span><div><b>Our Vision</b><p>To be India's most trusted financial platform, empowering every individual and business to achieve their financial goals.</p></div></div>
        <div class="vmrow"><span class="ic">${icons.target}</span><div><b>Our Mission</b><p>To provide transparent, easy and accessible financial solutions through technology and trust.</p></div></div>
      </div>
      <p class="why__scribble">Better Finances<br>Happier Lives</p>
    </div>
  </div>
</section>

<!-- ============================================ DISTRIBUTOR + INVEST -->
<section class="section duo">
  <div class="container duo__grid">

    <div class="dpanel reveal">
      <div class="dpanel__map" aria-hidden="true">${Array.from({ length: 7 }, (_, k) => `<span class="dpin dpin--${k + 1}"></span>`).join("")}</div>
      <div class="dpanel__in">
        <h2>Build Your Financial<br>Business with <span class="hl">ELOANSS</span></h2>
        <p>Earn, grow and build your network globally.</p>
        <ul class="dpanel__pts">${distributorPoints.map((p) => `<li>${icons.checkCircle}<span>${p}</span></li>`).join("")}</ul>
        <a class="btn btn--blue" href="/partner.html">Become a Partner ${icons.arrowRight}</a>
      </div>
      <p class="dpanel__scribble">Global Network<br>Local Impact</p>
    </div>

    <div class="ipanel-wrap reveal" data-d="1" id="invest">
      <h2>Invest Today<br><span class="ipanel__sub">for a Brighter Tomorrow</span></h2>
      <div class="itabs">${invTabs}</div>
      <div class="ipanels">${invPanels}</div>
      <div class="ichart" aria-hidden="true">
        <svg viewBox="0 0 320 110" preserveAspectRatio="none">
          <defs><linearGradient id="ic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#075E45" stop-opacity=".45"/><stop offset="100%" stop-color="#075E45" stop-opacity="0"/>
          </linearGradient></defs>
          <path d="M0 92 L32 78 L64 84 L96 58 L128 66 L160 40 L192 48 L224 26 L256 34 L288 14 L320 20 V110 H0 Z" fill="url(#ic)"/>
          <path d="M0 92 L32 78 L64 84 L96 58 L128 66 L160 40 L192 48 L224 26 L256 34 L288 14 L320 20" fill="none" stroke="#075E45" stroke-width="2.5"/>
        </svg>
        <div class="icoins"><span></span><span></span><span></span></div>
      </div>
      <div class="ipanel__foot">
        <p><b>Smart Investments</b><span>Better Futures</span></p>
        <a class="btn btn--blue btn--sm" href="/investments.html">Explore Investments ${icons.arrowRight}</a>
      </div>
    </div>

  </div>
</section>

<!-- ============================================ CREDIT CARDS -->
<section class="section section--soft" id="cards">
  <div class="container">
    <div class="section-head section-head--left reveal">
      <h2>Find What Fits Your Financial Profile</h2>
      <p>Compare credit cards and check eligibility in seconds.</p>
    </div>
    <div class="cards__grid">
      <div class="card cards__form reveal">
        <div class="ctabs">
          <button class="ctab is-active" data-ctab="0">Credit Cards</button>
          <button class="ctab" data-ctab="1">Credit Score</button>
          <button class="ctab" data-ctab="2">Eligibility Check</button>
        </div>
        <form class="cards__row" data-simpleform>
          <div class="field"><label>Card Type</label><select class="select" name="cardType"><option value="">Select Card Type</option>${cardTypes.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="field"><label>Annual Income</label><select class="select" name="income"><option value="">Select Income Range</option>${incomeBands.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="field"><label>Preferred Bank</label><select class="select" name="bank"><option value="">Select Bank</option>${lenders.slice(0, 12).map(([n]) => `<option>${n}</option>`).join("")}</select></div>
          <button class="btn btn--blue" type="submit">Compare Now ${icons.arrowRight}</button>
          <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} Matching cards — an advisor will call you.</span>
        </form>
      </div>
      <div class="cards__visual reveal" data-d="1">
        <div class="ccard">
          <div class="ccard__top"><span class="ccard__brand">ELOAN<b>SS</b></span><span class="ccard__chip"></span></div>
          <p class="ccard__tag">Better Rewards<br>Brighter Tomorrows</p>
          <span class="ccard__num">•••• •••• •••• 5678</span>
        </div>
        <div class="rewards">
          <b>Rewards That Match Your Lifestyle</b>
          <div class="rewards__row">${rewardIcons}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================ QUAD ROW -->
<section class="section quad">
  <div class="container quad__grid">

    <div class="card qbox reveal">
      <h3>What Our Customers Say</h3>
      <div class="tslides">${tSlides}</div>
      <div class="tnav"><button class="tarrow" data-tprev aria-label="Previous">${icons.chevronRight}</button><div class="tdots">${tDots}</div><button class="tarrow" data-tnext aria-label="Next">${icons.chevronRight}</button></div>
    </div>

    <div class="card qbox reveal" data-d="1">
      <div class="qbox__head"><h3>Latest from Our Resources</h3><a href="/blog.html">View All Blogs ${icons.arrowRight}</a></div>
      <div class="rposts">${blogCards}</div>
    </div>

    <div class="card qbox qbox--app reveal" data-d="2">
      <h3>Download the <span class="hl-b">ELOANSS</span> App</h3>
      <p class="qbox__sub">Finance at your fingertips.</p>
      <ul class="applist">${appPoints.map((p) => `<li>${icons.checkCircle}<span>${p}</span></li>`).join("")}</ul>
      <div class="appstores">
        <a class="storebtn storebtn--dark" href="#">${icons.play}<span><small>Get it on</small>Google Play</span></a>
        <a class="storebtn storebtn--dark" href="#">${icons.download}<span><small>Download on the</small>App Store</span></a>
      </div>
      <div class="phone" aria-hidden="true"><span class="phone__notch"></span><b>ELOANSS</b><i></i><i></i><i></i></div>
    </div>

    <div class="card qbox reveal" data-d="3">
      <h3>Contact Us</h3>
      <ul class="clist">
        <li>${icons.mapPin}<span>${site.address}</span></li>
        <li>${icons.phone}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
        <li>${icons.mail}<a href="mailto:${site.email}">${site.email}</a></li>
        <li>${icons.clock}<span>Mon – Sat: 10:00 AM – 7:00 PM</span></li>
      </ul>
      <iframe class="map map--sm" title="ELOANSS office location" loading="lazy" src="https://www.google.com/maps?q=Ratna+Complex+Opp+R.S.+Brothers+Ameerpet+Hyderabad+500038&amp;output=embed"></iframe>
      <a class="btn btn--blue btn--sm btn--block" href="/contact.html">Get Directions ${icons.arrowRight}</a>
    </div>

  </div>
</section>`;

  return layout({
    title: "Get Instant Loans Online — Compare & Apply in Minutes",
    description: `${site.tagline}. Compare loan & insurance offers from ${site.partners} banks and NBFCs and get the best rates with expert guidance.`,
    path: "index.html",
  }, "home", body);
}

/* ---- shared testimonial card ---- */
function testimonialCard([name, city, product, quote, img], k = 0) {
  return `<div class="tcard reveal" data-d="${k % 3}">
    <div class="stars">★★★★★</div>
    <blockquote>“${quote}”</blockquote>
    <div class="tcard__who"><img src="${img}" alt="${name}" loading="lazy"><div><b>${name}</b><span>${city} · ${product}</span></div></div>
  </div>`;
}

/* ---- shared contact block (map + form) ---- */
function contactBlock() {
  return `<section class="section section--soft" id="contact">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Get in touch</span><h2>Visit us or send an enquiry</h2><p>Our advisors are ready to help you find the right loan or insurance — free of charge.</p></div>
    <div class="contact-grid">
      <div class="reveal">
        <div class="card" style="margin-bottom:20px">
          <div class="info-row"><span class="ic">${icons.mapPin}</span><div><b>Head Office</b><span>${site.address}</span></div></div>
          <div class="info-row"><span class="ic">${icons.phone}</span><div><b>Call us</b><a href="tel:${site.phoneHref}">${site.phone}</a></div></div>
          <div class="info-row"><span class="ic">${icons.mail}</span><div><b>Email</b><a href="mailto:${site.email}">${site.email}</a></div></div>
          <div class="info-row"><span class="ic">${icons.clock}</span><div><b>Working hours</b><span>Mon–Sat, 10:00 AM – 7:00 PM</span></div></div>
        </div>
        <iframe class="map" title="ELOANSS office location" loading="lazy" src="https://www.google.com/maps?q=Ratna+Complex+Opp+R.S.+Brothers+Ameerpet+Hyderabad+500038&amp;output=embed"></iframe>
      </div>
      <div class="reveal" data-d="1">${C.applicationForm()}</div>
    </div>
  </div>
</section>`;
}

/* ============================================================= LOAN OVERVIEW */
function loansOverview() {
  const cards = loans.map((l, k) => `<div class="card reveal" data-d="${k % 3}">
    <span class="card__ic">${icons[l.icon]}</span>
    <h3>${l.name.replace(" / Mortgage Loan", " / Mortgage")}</h3>
    <p>${l.tagline}</p>
    <div class="deflist" style="margin:14px 0;border-radius:12px">
      <div class="r" style="padding:10px 14px"><dt>Interest</dt><dd>${l.rate} p.a.</dd></div>
      <div class="r" style="padding:10px 14px"><dt>Amount</dt><dd>${l.amount}</dd></div>
    </div>
    <a class="card__link" href="/loans/${l.slug}.html">Explore &amp; apply ${icons.arrowRight}</a>
  </div>`).join("");

  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["Loans"]])}
  <h1>Compare Loans From 45+ Banks &amp; NBFCs</h1>
  <p>Whatever you need to finance, ELOANSS helps you find the lowest rate and the highest approval chance — free of cost, with expert guidance at every step.</p>
  <div class="hero__cta" style="justify-content:center;margin-top:26px"><a class="btn btn--gold btn--lg" href="/contact.html">Check Your Eligibility ${icons.arrowRight}</a></div>
</div></div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Loan products</span><h2>Choose your loan type</h2><p>12 loan categories, one trusted facilitator. Pick a product to see rates, eligibility and apply.</p></div>
  <div class="grid g-3">${cards}</div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Calculator</span><h2>Estimate your EMI</h2><p>Adjust the amount, rate and tenure to plan your repayment before you apply.</p></div>
  <div class="reveal">${C.emiCalculator({ amount: [50000, 5000000, 1000000], rate: [8, 24, 11], tenure: [1, 30, 5] })}</div>
</div></section>

${howItWorksStrip()}
<section class="section"><div class="container">
  <div class="banner reveal"><div class="banner__inner">
    <div>
      <span class="eyebrow">For businesses</span>
      <h2>Working Capital &amp; Business Finance</h2>
      <p>CC/OD, term loans, LAP, machinery finance, CGTMSE, BG/LC and project funding for MSME, SME and mid-corporate businesses — ₹10 Lakhs to ₹100 Crores.*</p>
    </div>
    <a class="btn btn--gold btn--lg" href="/business-finance.html">Explore Business Finance ${icons.arrowRight}</a>
  </div></div>
</div></section>

${catalogueSection(loanCatalogue, "loan-catalogue", "All 105 loan products we facilitate", "Nine categories, every product in each. Pick one to see rates, eligibility and documents.")}

${ctaBand("Not sure which loan is right for you?", "Talk to an ELOANSS expert. We'll understand your needs and recommend the best option — free and without obligation.")}`;

  return layout({ title: "Loans — Personal, Home, Business, Car, Gold & More", description: "Compare 12 types of loans from 45+ banks and NBFCs with ELOANSS. Lowest rates, minimal paperwork and expert guidance. Check eligibility free.", path: "loans.html" }, "loans", body);
}

/* =============================================================== LOAN PAGE */
function loanPage(l) {
  const benefits = l.benefits.map(([t, d], k) => `<div class="card reveal" data-d="${k % 3}"><span class="card__ic">${icons.checkCircle}</span><h3>${t}</h3><p class="mb0">${d}</p></div>`).join("");
  const elig = l.eligibility.map((e) => `<li>${icons.checkCircle ? '<span class="ic">' + icons.check + '</span>' : ''}<span><b>${e}</b></span></li>`).join("");
  const docs = l.documents.map((d) => `<li><span class="ic">${icons.fileText}</span>${d}</li>`).join("");
  const features = l.features.map((f) => `<li><span class="ic">${icons.check}</span><span>${f}</span></li>`).join("");
  const cross = (l.crossSell || []).map((s) => `<a class="card reveal" href="${catLink(s)}"><span class="card__ic">${catIcon(s)}</span><h3>${catName(s)}</h3><p class="mb0">Recommended alongside your ${l.name.replace(" / Mortgage Loan", "")}.</p><br><span class="card__link">Get a quote ${icons.arrowRight}</span></a>`).join("");

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Loans", "/loans.html"], [l.name]])}
    <span class="pill" style="background:rgba(245,166,35,.15);color:var(--gold);margin-bottom:14px">${icons[l.icon]} ${l.name.replace(" / Mortgage Loan", "")}</span>
    <h1>${l.name.replace(" / Mortgage Loan", " / Mortgage Loan")}</h1>
    <p>${l.tagline}</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="#apply">Apply Now ${icons.arrowRight}</a><a class="btn btn--on-navy btn--lg" href="#emi">Calculate EMI</a></div>
    <div class="phero__stats">
      <div class="phero__stat"><b>${l.rate}</b><span>Interest p.a.</span></div>
      <div class="phero__stat"><b>${l.amount}</b><span>Loan amount</span></div>
      <div class="phero__stat"><b>${l.tenure}</b><span>Tenure</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1">
    <h3 style="color:#fff">Quick enquiry</h3>
    <p style="font-size:.92rem;color:#B9DBCD;margin-bottom:16px">Get matched with the best ${l.name.replace(" / Mortgage Loan", "")} offers.</p>
    <form data-simpleform>
      <div data-formbody>
        <div class="field"><input class="input" required placeholder="Full name"></div>
        <div class="field"><input class="input" type="tel" required placeholder="Mobile number"></div>
        <div class="field"><input class="input" type="number" required placeholder="Loan amount (₹)"></div>
      </div>
      <button type="submit" class="btn btn--gold btn--block">Get Best Offer ${icons.arrowRight}</button>
      <div class="form-ok" hidden><span class="ic">${icons.checkCircle}</span><h4 style="color:#fff">Enquiry received!</h4><p style="color:#B9DBCD">Our expert will call you shortly. (Demo form.)</p></div>
    </form>
  </div>
</div></div></section>

<section class="section"><div class="container narrow reveal">
  <h2>About the ${l.name.replace(" / Mortgage Loan", " / Mortgage Loan")}</h2>
  <p class="lead">${l.intro}</p>
  ${C.complianceNote()}
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Why choose us</span><h2>Key benefits</h2><p>Here's what makes an ELOANSS-facilitated ${l.name.replace(" / Mortgage Loan", "")} a smart choice.</p></div>
  <div class="grid g-4">${benefits}</div>
</div></section>

<section class="section"><div class="container">
  <div class="grid g-2" style="align-items:start;gap:44px">
    <div class="reveal">
      <span class="eyebrow">${icons.user} Eligibility</span>
      <h2>Who can apply</h2>
      <ul class="checks mt">${elig}</ul>
    </div>
    <div class="reveal" data-d="1">
      <span class="eyebrow">${icons.fileText} Documents</span>
      <h2>Documents required</h2>
      <ul class="docgrid mt">${docs}</ul>
    </div>
  </div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="grid g-2" style="align-items:start;gap:44px">
    <div class="reveal">
      <span class="eyebrow">${icons.info} At a glance</span>
      <h2>Rates, tenure &amp; amount</h2>
      <dl class="deflist mt">
        <div class="r"><dt>Interest rate</dt><dd>${l.rate} per annum (indicative)</dd></div>
        <div class="r"><dt>Loan amount</dt><dd>${l.amount}</dd></div>
        <div class="r"><dt>Tenure</dt><dd>${l.tenure}</dd></div>
        <div class="r"><dt>Processing fee</dt><dd>As per lender (typically 0.5%–3%)</dd></div>
        <div class="r"><dt>Prepayment</dt><dd>Allowed as per lender policy</dd></div>
      </dl>
    </div>
    <div class="reveal" data-d="1">
      <span class="eyebrow">${icons.zap} Features</span>
      <h2>Features &amp; advantages</h2>
      <ul class="checks mt">${features.replace(/<span class="ic">/g, '<span class="ic">')}</ul>
    </div>
  </div>
</div></section>

<section class="section" id="emi"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">EMI Calculator</span><h2>Calculate your ${l.name.replace(" / Mortgage Loan", "")} EMI</h2><p>Move the sliders to estimate your monthly instalment and total interest.</p></div>
  <div class="reveal">${C.emiCalculator(l.emi)}</div>
</div></section>

${C.faqSection(l.faqs, `${l.name.replace(" / Mortgage Loan", "")} — FAQs`)}

${cross ? `<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">You may also need</span><h2>Related products &amp; protection</h2><p>Complete your financial plan with cover that protects what matters.</p></div>
  <div class="grid g-${(l.crossSell||[]).length > 1 ? 2 : 1}" style="max-width:${(l.crossSell||[]).length>1?'760px':'420px'};margin-inline:auto">${cross}</div>
</div></section>` : ""}

<section class="section section--soft" id="apply"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Apply now</span><h2>Start your ${l.name.replace(" / Mortgage Loan", "")} application</h2><p>Fill this quick 3-step form and our experts will get you the best matched offers — free.</p></div>
  <div class="narrow reveal">${C.applicationForm(l.name)}</div>
</div></section>`;

  return layout({ title: `${l.name} — Rates from ${l.rate.split("–")[0].trim()}`, description: `${l.tagline} Compare ${l.name} offers from 45+ banks & NBFCs with ELOANSS. ${l.amount}, ${l.tenure}. Apply free.`, path: `loans/${l.slug}.html` }, "loans", body);
}

/* ========================================================= INSURANCE OVERVIEW */
function insuranceOverview() {
  const cards = insurance.map((i, k) => `<div class="card reveal" data-d="${k % 3}">
    <span class="card__ic">${icons[i.icon]}</span>
    <h3>${i.name}</h3>
    <p>${i.tagline}</p>
    <a class="card__link" href="/insurance/${i.slug}.html">Get free quote ${icons.arrowRight}</a>
  </div>`).join("");

  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["Insurance"]])}
  <h1>Protect What Matters Most</h1>
  <p>Compare life, health, term, travel, property and vehicle insurance from leading insurers. ELOANSS helps you choose the right cover at the right price — free of cost.</p>
  <div class="hero__cta" style="justify-content:center;margin-top:26px"><a class="btn btn--gold btn--lg" href="/contact.html">Get a Free Quote ${icons.arrowRight}</a></div>
</div></div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Insurance products</span><h2>Cover for every need</h2><p>Pick a category and we'll compare plans across insurers for the best value.</p></div>
  <div class="grid g-3">${cards}</div>
</div></section>

${catalogueSection(insuranceCatalogue, "insurance-catalogue", "All 177 insurance products we facilitate", "Fifteen categories spanning life, health, motor, commercial and specialty cover.")}

${ctaBand("Get expert insurance advice — free", "No jargon, no pressure. Our advisors compare plans and explain everything in plain language so you can protect your family with confidence.")}`;

  return layout({ title: "Insurance — Life, Health, Term, Travel, Vehicle & Property", description: "Compare life, health, term, travel, property and vehicle insurance with ELOANSS. Free quotes, expert advice and the best cover for your needs.", path: "insurance.html" }, "insurance", body);
}

/* =========================================================== INSURANCE PAGE */
function insurancePage(i) {
  const points = i.points.map((p) => `<li><span class="ic">${icons.check}</span><span>${p}</span></li>`).join("");
  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Insurance", "/insurance.html"], [i.name]])}
    <span class="pill" style="background:rgba(245,166,35,.15);color:var(--gold);margin-bottom:14px">${icons[i.icon]} ${i.name}</span>
    <h1>${i.name}</h1>
    <p>${i.tagline}</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="#quote">Get Free Quote ${icons.arrowRight}</a><a class="btn btn--on-navy btn--lg" href="tel:${site.phoneHref}">${icons.phone} Talk to an advisor</a></div>
  </div>
  <div class="phero__card reveal" data-d="1" id="quote">
    <h3 style="color:#fff">Free insurance quote</h3>
    <p style="font-size:.92rem;color:#B9DBCD;margin-bottom:16px">Share a few details and we'll compare the best ${i.name.toLowerCase()} plans for you.</p>
    <form data-simpleform>
      <div data-formbody>
        <div class="field"><input class="input" required placeholder="Full name"></div>
        <div class="field"><input class="input" type="tel" required placeholder="Mobile number"></div>
        <div class="field"><input class="input" type="number" placeholder="Your age"></div>
      </div>
      <button type="submit" class="btn btn--gold btn--block">Get My Quote ${icons.arrowRight}</button>
      <div class="form-ok" hidden><span class="ic">${icons.checkCircle}</span><h4 style="color:#fff">Request received!</h4><p style="color:#B9DBCD">An advisor will call you with the best plans. (Demo form.)</p></div>
    </form>
  </div>
</div></div></section>

<section class="section"><div class="container narrow reveal">
  <h2>About ${i.name}</h2>
  <p class="lead">${i.intro}</p>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="grid g-2" style="align-items:center;gap:44px">
    <div class="reveal">
      <span class="eyebrow">Key highlights</span>
      <h2>Why choose this cover</h2>
      <ul class="checks mt">${points}</ul>
      <a class="btn btn--navy mt" href="#quote">Get a free quote ${icons.arrowRight}</a>
    </div>
    <div class="reveal" data-d="1"><img style="border-radius:var(--r-xl);box-shadow:var(--sh-md)" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&h=520&fit=crop" alt="${i.name} protection"></div>
  </div>
</div></section>

${C.faqSection(i.faqs, `${i.name} — FAQs`)}
${ctaBand(`Ready to secure your ${i.name.toLowerCase()}?`, "Get a free, no-obligation quote today. Our advisors compare plans across insurers so you get the best cover at the best price.")}`;

  return layout({ title: `${i.name} — Compare & Get Free Quote`, description: `${i.tagline} Compare ${i.name} plans across leading insurers with ELOANSS. Free quotes and expert advice.`, path: `insurance/${i.slug}.html` }, "insurance", body);
}

/* ============================================================ SHARE MARKETS */
function shareMarkets() {
  const services = [
    ["Demat & Trading Account", "Open a demat and trading account with our partner brokers to start investing in stocks and ETFs.", "chart"],
    ["Mutual Funds & SIPs", "Build long-term wealth with curated mutual funds and disciplined SIP investing.", "trendingUp"],
    ["IPO Applications", "Apply to the latest IPOs seamlessly and diversify your portfolio.", "layers"],
    ["Portfolio Guidance", "Get expert guidance to align your investments with your financial goals and risk appetite.", "compass"],
  ].map((s, k) => `<div class="card reveal" data-d="${k % 3}"><span class="card__ic">${icons[s[2]]}</span><h3>${s[0]}</h3><p class="mb0">${s[1]}</p></div>`).join("");

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Share Markets"]])}
    <h1>Grow Your Wealth in the Share Markets</h1>
    <p>From demat accounts to mutual funds, SIPs and IPOs — ELOANSS connects you with trusted partners and expert guidance to invest with confidence.</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="/contact.html">Start Investing ${icons.arrowRight}</a></div>
    <div class="phero__stats">
      <div class="phero__stat"><b>Zero</b><span>Account opening bias</span></div>
      <div class="phero__stat"><b>Expert</b><span>Guided investing</span></div>
      <div class="phero__stat"><b>SEBI-reg</b><span>Partner brokers</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1"><img style="border-radius:var(--r-lg)" src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=560&h=420&fit=crop" alt="Stock market charts"></div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Investment services</span><h2>Ways to invest with ELOANSS</h2><p>We work with SEBI-registered partners to give you a smooth, guided investing experience.</p></div>
  <div class="grid g-4">${services}</div>
</div></section>

<section class="section section--soft"><div class="container narrow reveal">
  <div class="note"><span class="ic">${icons.info}</span><div><b>Investments carry market risk.</b><p>ELOANSS facilitates access to SEBI-registered partners and does not provide personalized investment advice or guarantee returns. Mutual fund and securities investments are subject to market risks; please read all scheme-related documents carefully.</p></div></div>
</div></section>

${ctaBand("Ready to start your investment journey?", "Talk to our team about opening a demat account, starting an SIP, or applying to the latest IPOs.")}`;

  return layout({ title: "Share Markets & Investments — Demat, Mutual Funds, SIP, IPO", description: "Invest in stocks, mutual funds, SIPs and IPOs with ELOANSS and our SEBI-registered partners. Expert-guided investing to grow your wealth.", path: "share-markets.html" }, "share", body);
}

/* ==================================================================== ABOUT */
function about() {
  const values = [
    ["Transparency", "No hidden charges, no jargon. We show you real offers and explain every term clearly.", "eye"],
    ["Customer-first", "Our service is 100% free for customers. We win only when you get the best deal.", "heart"],
    ["Expertise", "A seasoned team that understands lending, insurance and investing inside out.", "award"],
    ["Speed", "Fast comparisons and quick disbursals so you never miss an opportunity.", "zap"],
  ].map((v, k) => `<div class="card reveal" data-d="${k % 3}"><span class="card__ic">${icons[v[2]]}</span><h3>${v[0]}</h3><p class="mb0">${v[1]}</p></div>`).join("");

  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["About Us"]])}
  <h1>Your Trusted Financial Facilitator</h1>
  <p>${site.name} was founded on a simple idea: getting the right loan or insurance should be fast, transparent and stress-free. We compare offers so you don't have to.</p>
</div></div></div></section>

<section class="section"><div class="container">
  <div class="grid g-2" style="align-items:center;gap:48px">
    <div class="reveal">
      <span class="eyebrow">Our story</span>
      <h2>Simplifying finance for every Indian</h2>
      <p>Navigating loans and insurance can be confusing — dozens of lenders, fine print, and rates that change daily. ${site.name} brings clarity. As a licensed facilitator, we partner with 45+ banks and NBFCs to compare offers on your behalf and connect you with the best fit for your profile.</p>
      <p>From personal and home loans to health cover and investments, our experts guide you end to end — and our service is completely free for customers.</p>
      <ul class="checks mt">
        <li><span class="ic">${icons.check}</span><span><b>${site.customers} customers served</b></span></li>
        <li><span class="ic">${icons.check}</span><span><b>${site.disbursed} in loans facilitated</b></span></li>
        <li><span class="ic">${icons.check}</span><span><b>${site.rating}/5 rating from ${site.reviews} reviews</b></span></li>
      </ul>
    </div>
    <div class="reveal" data-d="1"><img style="border-radius:var(--r-xl);box-shadow:var(--sh-md)" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=560&fit=crop" alt="ELOANSS team"></div>
  </div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="vm">
    <div class="vm__card reveal"><span class="ic">${icons.eye}</span><h3>Our Vision</h3><p class="mb0">To become the most trusted financial partner helping individuals and businesses achieve their goals with the right loan and insurance solutions.</p></div>
    <div class="vm__card reveal" data-d="1"><span class="ic">${icons.target}</span><h3>Our Mission</h3><p class="mb0">We simplify complex financial products, connect customers with the best lenders and insurers, and deliver transparent, fast, and personalized service.</p></div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">What we stand for</span><h2>Our core values</h2><p>The principles that guide every recommendation we make.</p></div>
  <div class="grid g-4">${values}</div>
</div></section>

${howItWorksStrip()}
${ctaBand("Let's find your best offer together", "Join 50,000+ customers who trust ELOANSS for loans, insurance and investments.")}`;

  return layout({ title: "About Us — Licensed Loan & Insurance Facilitator", description: `Learn about ${site.name}, a trusted loan and insurance facilitator helping ${site.customers} customers compare and get the best offers from 45+ banks and NBFCs.`, path: "about.html" }, "about", body);
}

/* ================================================================== PARTNER */
function partner() {
  const benefits = partnerBenefits.map((b, k) => `<div class="card reveal" data-d="${k % 3}"><span class="card__ic">${icons[b[2]]}</span><h3>${b[0]}</h3><p class="mb0">${b[1]}</p></div>`).join("");
  const who = ["Insurance & loan agents (DSA)", "Chartered accountants & tax consultants", "Real-estate & car dealers", "Financial advisors & wealth managers", "Retired bankers & professionals", "Ambitious entrepreneurs"]
    .map((w) => `<li><span class="ic">${icons.check}</span><span>${w}</span></li>`).join("");

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Partner With Us"]])}
    <span class="pill" style="background:rgba(245,166,35,.15);color:var(--gold);margin-bottom:14px">${icons.handshake} Global Distributor Program</span>
    <h1>Become an ELOANSS Global Distributor</h1>
    <p>Grow your financial business with India's fast-growing loan &amp; insurance facilitator. Earn high commissions with our full support — and zero investment to start.</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="#join">Apply to Partner ${icons.arrowRight}</a></div>
  </div>
  <div class="phero__card reveal" data-d="1"><img style="border-radius:var(--r-lg)" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=560&h=420&fit=crop" alt="ELOANSS partners collaborating"></div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Why partner</span><h2>Benefits of partnering with ELOANSS</h2><p>Everything you need to build a thriving financial distribution business.</p></div>
  <div class="grid g-3">${benefits}</div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="grid g-2" style="align-items:center;gap:48px">
    <div class="reveal">
      <span class="eyebrow">Eligibility</span>
      <h2>Who can apply</h2>
      <p>If you have a network and the ambition to grow, you can partner with us. Our program is ideal for:</p>
      <ul class="checks mt">${who}</ul>
    </div>
    <div class="reveal" data-d="1" style="position:relative">
      <img style="border-radius:var(--r-xl);box-shadow:var(--sh-md)" src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=460&fit=crop" alt="Partnership meeting">
      <a href="#" class="hero__badge hero__badge--br" style="text-decoration:none"><span class="ic">${icons.play}</span><div><b>Watch</b><small>Partner success story</small></div></a>
    </div>
  </div>
</div></section>

<section class="section" id="join"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Join us</span><h2>Apply to become a partner</h2><p>Fill in your details and our partnerships team will reach out within 24 hours.</p></div>
  <div class="narrow reveal">
    <form class="form-card" data-simpleform>
      <div data-formbody>
        <div class="field-row">
          <div class="field"><label>Full name <span class="req">*</span></label><input class="input" required placeholder="Your name"></div>
          <div class="field"><label>Mobile <span class="req">*</span></label><input class="input" type="tel" required placeholder="10-digit mobile"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>City <span class="req">*</span></label><input class="input" required placeholder="Your city"></div>
          <div class="field"><label>Current profession</label>
            <select class="select"><option value="">Select</option><option>DSA / Agent</option><option>CA / Consultant</option><option>Dealer</option><option>Financial advisor</option><option>Other</option></select></div>
        </div>
        <div class="field"><label>Tell us about your network</label><textarea class="input" rows="3" placeholder="e.g. I work with 100+ SME clients in Hyderabad"></textarea></div>
      </div>
      <button type="submit" class="btn btn--gold btn--block btn--lg">Submit Partnership Application ${icons.arrowRight}</button>
      <div class="form-ok" hidden><span class="ic">${icons.checkCircle}</span><h4>Application received!</h4><p>Our partnerships team will contact you within 24 hours. (Demo form — no data is sent.)</p></div>
    </form>
  </div>
</div></section>

${ctaBand("Have questions about the program?", "Call our partnerships team and we'll walk you through commissions, training and onboarding.", "Call " + site.phone, "tel:" + site.phoneHref)}`;

  return layout({ title: "Partner With Us — ELOANSS Global Distributor Program", description: "Become an ELOANSS Global Distributor. Earn high commissions across 45+ lenders with full training, marketing support and zero investment to start.", path: "partner.html" }, "partner", body);
}

/* ============================================================ HOW IT WORKS */
function howItWorksStrip() {
  const stepCards = steps.map(([t, d], k) => `<div class="step reveal" data-d="${k}"><span class="step__n">${k + 1}</span><h3>${t}</h3><p class="mb0">${d}</p></div>`).join("");
  return `<section class="section"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">Simple process</span><h2>How ELOANSS works</h2><p>From enquiry to disbursal in four clear, transparent steps.</p></div>
    <div class="grid g-4 steps steps--line">${stepCards}</div>
  </div></section>`;
}
function howItWorks() {
  const detail = [
    ["Submit your enquiry", "Tell us what you need through a quick 2-minute form or a call. Share your requirement, income and city. It's free and there's no obligation to proceed.", "send"],
    ["Get matched with the best offers", "Our platform and experts compare offers across 45+ banks and NBFCs, factoring in your profile to surface the lowest rates and highest approval odds.", "search"],
    ["Document verification", "Choose an offer and we guide you through the paperwork, help you avoid common rejections, and coordinate verification directly with the lender.", "fileText"],
    ["Loan disbursed", "Once the lender approves, funds are disbursed straight to your bank account. We stay with you through the process and after.", "checkCircle"],
  ].map(([t, d, ic], k) => `<div class="grid g-2 reveal" style="align-items:center;gap:44px;margin-bottom:44px">
    <div style="order:${k % 2 ? 2 : 1}"><span class="step__n" style="margin-bottom:18px">${k + 1}</span><h2>${t}</h2><p class="lead mb0">${d}</p></div>
    <div style="order:${k % 2 ? 1 : 2}" class="card" style="display:grid;place-items:center;min-height:200px;background:var(--navy-050);border:0"><span style="width:96px;height:96px;border-radius:26px;background:#fff;display:grid;place-items:center;color:var(--navy);box-shadow:var(--sh)"><span style="width:44px;height:44px;color:var(--gold-600)">${icons[ic]}</span></span></div>
  </div>`).join("");

  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["How It Works"]])}
  <h1>How ELOANSS Works</h1>
  <p>Getting the best loan or insurance offer is easier than you think. Here's exactly what happens from your first enquiry to disbursal.</p>
  <div class="hero__cta" style="justify-content:center;margin-top:26px"><a class="btn btn--gold btn--lg" href="/contact.html">Get Started ${icons.arrowRight}</a></div>
</div></div></div></section>

<section class="section"><div class="container">${detail}</div></section>

<section class="section section--soft"><div class="container narrow reveal">${C.complianceNote()}</div></section>
${ctaBand("Start in 2 minutes", "It's free, there's no obligation, and your data stays private and secure.")}`;

  return layout({ title: "How It Works — From Enquiry to Loan Disbursal", description: "See how ELOANSS works in 4 simple steps: submit an enquiry, get matched with the best offers, verify documents, and get your loan disbursed.", path: "how-it-works.html" }, "how", body);
}

/* =================================================================== BLOG */
function blog() {
  const cards = posts.map(([slug, tag, title, excerpt, date, img], k) => `<a class="post reveal" data-d="${k % 3}" href="/blog/${slug}.html">
    <img class="post__img" src="${img}" alt="${title}" loading="lazy">
    <div class="post__body"><span class="post__tag">${tag}</span><h3>${title}</h3><p>${excerpt}</p><div class="post__meta">${icons.calendar ? '' : ''}${date} · 5 min read</div></div>
  </a>`).join("");

  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["Resources"]])}
  <h1>Resources &amp; Financial Insights</h1>
  <p>Guides, tips and explainers to help you borrow smarter, insure better and invest with confidence.</p>
</div></div></div></section>

<section class="section"><div class="container">
  <div class="grid g-3">${cards}</div>
</div></section>
${ctaBand("Have a question we haven't answered?", "Our experts are happy to help — no cost, no obligation.")}`;

  return layout({ title: "Resources & Blog — Loan, Insurance & Investment Guides", description: "Practical guides and tips on loans, insurance and investments from the ELOANSS team. Learn how to borrow smarter and protect your future.", path: "blog.html" }, "blog", body);
}

function blogPost([slug, tag, title, excerpt, date, img]) {
  const body = `
<section class="section" style="padding-bottom:0"><div class="container narrow">
  ${crumbs([["Home", "/index.html"], ["Resources", "/blog.html"], [tag]])}
  <span class="post__tag">${tag}</span>
  <h1 style="margin-top:12px">${title}</h1>
  <p class="post__meta" style="color:var(--muted)">${date} · 5 min read · By the ELOANSS team</p>
</div></section>
<section class="section" style="padding-top:34px"><div class="container narrow">
  <img style="border-radius:var(--r-xl);box-shadow:var(--sh);margin-bottom:28px" src="${img.replace("600&h=360", "900&h=480")}" alt="${title}">
  <div class="prose">
    <p class="lead">${excerpt}</p>
    <p>At ELOANSS, we believe informed customers make better financial decisions. This guide breaks the topic down in plain language so you can act with confidence. Remember, ELOANSS is a facilitator — we help you compare and connect with the right banks, NBFCs and insurers, and final terms always rest with them.</p>
    <h2>Why this matters</h2>
    <p>Understanding the fundamentals here can save you significant money over the life of a loan or policy. Small differences in interest rate, tenure or cover can add up to lakhs of rupees. Our experts see these decisions every day and can guide you to the option that fits your profile.</p>
    <ul class="dots">
      <li>Compare offers from multiple lenders before committing.</li>
      <li>Read the fine print on fees, prepayment and exclusions.</li>
      <li>Match the product to your actual need and repayment capacity.</li>
      <li>Keep your documents ready to speed up approval.</li>
    </ul>
    <h2>How ELOANSS helps</h2>
    <p>Instead of visiting each bank yourself, ELOANSS compares offers across 45+ lending and insurance partners on your behalf — free of cost. We highlight the true cost of each option, flag hidden charges, and guide you through documentation to maximise your approval chances.</p>
    <p>Ready to put this into practice? Check your eligibility or get a free quote today.</p>
  </div>
  ${C.complianceNote()}
  <div class="center mt-l"><a class="btn btn--gold btn--lg" href="/contact.html">Check Eligibility / Apply ${icons.arrowRight}</a></div>
</div></section>
${ctaBand("Want more guides like this?", "Explore our full library of resources on loans, insurance and investments.", "Browse Resources", "/blog.html")}`;

  return layout({ title: title, description: excerpt, path: `blog/${slug}.html` }, "blog", body);
}

/* ================================================================ CONTACT */
function contact() {
  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], ["Contact / Apply"]])}
  <h1>Apply Now or Get in Touch</h1>
  <p>Start your free enquiry, or reach us by phone, email or WhatsApp. Our experts respond fast.</p>
  <div class="hero__cta" style="justify-content:center;margin-top:24px"><a class="btn btn--gold btn--lg" href="tel:${site.phoneHref}">${icons.phone} Call ${site.phone}</a><a class="btn btn--on-navy btn--lg" href="${C.waLink()}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp us</a></div>
</div></div></div></section>
${contactBlock()}
${ctaBand("Prefer to talk to a human?", "Call us Mon–Sat, 10 AM – 7 PM. We're happy to answer any question — free of charge.", "Call " + site.phone, "tel:" + site.phoneHref)}`;

  return layout({ title: "Contact Us / Apply Now", description: `Contact ${site.name} to apply for a loan or get an insurance quote. Call ${site.phone}, email ${site.email}, or send an enquiry online. Free & no obligation.`, path: "contact.html" }, "contact", body);
}

/* ================================================================ CTA band */
function ctaBand(title, text, btnText = "Apply Now", btnHref = "/contact.html") {
  return `<section class="section ctaband"><div class="container center reveal">
    <h2>${title}</h2><p>${text}</p>
    <a class="btn btn--navy btn--lg" href="${btnHref}">${btnText} ${icons.arrowRight}</a>
  </div></section>`;
}

/* ================================================================== LEGAL */
function legalPage(slug, title, sections) {
  const body = `
<section class="phero phero--center"><div class="container"><div class="phero__inner"><div>
  ${crumbs([["Home", "/index.html"], [title]])}
  <h1>${title}</h1>
  <p>Last updated: September 2026</p>
</div></div></div></section>
<section class="section"><div class="container narrow prose reveal">
  ${sections.map(([h, ...ps]) => `<h2>${h}</h2>${ps.map((p) => `<p>${p}</p>`).join("")}`).join("")}
  <div class="note" style="margin-top:30px"><span class="ic">${icons.info}</span><div><b>Questions?</b><p>Contact us at <a href="mailto:${site.email}" style="color:var(--gold-600)">${site.email}</a> or ${site.phone}.</p></div></div>
</div></section>`;
  return layout({ title, description: `${title} for ${site.name} (${site.domain}).`, path: `${slug}.html` }, "", body);
}

/* ============================================================ BANKS & NBFCS */
function banksPage() {
  const wall = lenders.map(([n, cat, slug]) => lenderTile(n, cat, slug)).join("");
  const pills = lenderFilters.map((f, k) => `<button class="fpill ${k === 0 ? "is-active" : ""}" data-filter="${f.toLowerCase()}">${f}</button>`).join("");

  const compare = [
    ["Banks", "bank", "Scheduled commercial banks regulated by the RBI.", [
      "Usually the lowest interest rates",
      "Longer tenures, especially on home loans",
      "Stricter eligibility and credit-score requirements",
      "Slower processing — more documentation",
    ]],
    ["NBFCs", "building2", "Non-Banking Financial Companies, also RBI-registered.", [
      "Faster approvals and disbursal",
      "More flexible eligibility criteria",
      "Better options for thin credit files and self-employed borrowers",
      "Rates typically a little higher than banks",
    ]],
  ].map(([t, ic, sub, pts], k) => `<div class="card reveal" data-d="${k}">
      <span class="card__ic">${icons[ic]}</span>
      <h3>${t}</h3><p>${sub}</p>
      <ul class="ticks">${pts.map((p) => `<li>${icons.check}<span>${p}</span></li>`).join("")}</ul>
    </div>`).join("");

  const why = [
    ["One application, many lenders", "Apply once with ELOANSS and we run your profile past every relevant partner instead of you filling in a dozen forms.", "layers"],
    ["We know each lender's appetite", "Every bank and NBFC has its own scorecard. We match you to the ones most likely to approve you at a good rate.", "target"],
    ["No cost to you", "Our service is free for customers. We are paid a commission by the lender you choose.", "handshake"],
    ["Soft check first", "Checking your options with us does not put a hard enquiry on your credit report.", "shield"],
  ].map(([t, d, ic], k) => `<div class="card reveal" data-d="${k % 4}"><span class="card__ic">${icons[ic]}</span><h3>${t}</h3><p class="mb0">${d}</p></div>`).join("");

  const faqs = [
    ["Is ELOANSS a bank?", `No. ${site.name} is a loan and insurance facilitator. We do not lend money ourselves — we help you compare and apply to banks and NBFCs, who make all lending decisions.`],
    ["Which lender is best for me?", "It depends on your credit score, income, employment type and the product you need. A bank is usually cheapest if you qualify; an NBFC is often faster and more flexible if you don't."],
    ["Do you work with every bank in India?", `We work with ${site.partners} lending partners across banks and NBFCs, covering all the major loan categories. If a lender outside our network suits you better, we'll tell you.`],
    ["Does applying through you cost more?", "No. You get the lender's standard rates and charges. Our commission is paid by the lender, not added to your loan."],
    ["Can I apply to more than one lender?", "Yes, but too many hard enquiries in a short window can dent your score. We shortlist the best two or three rather than shot-gunning your application."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Banks & NBFCs"]])}
    <h1>Our Banking &amp; Lending Network</h1>
    <p>We partner with India's leading banks and NBFCs so you can compare real offers side by side — and apply to the one most likely to say yes.</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="/contact.html">Compare Offers ${icons.arrowRight}</a></div>
    <div class="phero__stats">
      <div class="phero__stat"><b>${site.partners}</b><span>Lending partners</span></div>
      <div class="phero__stat"><b>${site.disbursed}</b><span>Loans facilitated</span></div>
      <div class="phero__stat"><b>1</b><span>Application form</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1"><img style="border-radius:var(--r-lg)" src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=560&h=420&fit=crop" alt="Bank building" loading="lazy"></div>
</div></div></section>

<section class="section"><div class="container">
  <div class="lender__head reveal">
    <div><h2>Our lending partners</h2><p>Filter by the product you're shopping for.</p></div>
    <div class="lender__tools"><div class="fpills">${pills}</div></div>
  </div>
  <div class="lender__wall reveal" data-lenderwall>${wall}</div>
  <p class="lender__note">${icons.info} All partner logos and trademarks are the property of their respective owners.</p>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Know the difference</span><h2>Bank or NBFC — which should you pick?</h2><p>Neither is universally better. The right answer depends on your profile and how quickly you need the money.</p></div>
  <div class="grid g-2">${compare}</div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Why go through us</span><h2>What ELOANSS adds</h2><p>You could approach each lender yourself. Here's what you get by not doing that.</p></div>
  <div class="grid g-4">${why}</div>
</div></section>

${C.faqSection(faqs, "Questions about our lending network")}
${ctaBand("See which lenders will approve you", "Tell us what you need and we'll come back with the shortlist — free, and with no hard credit enquiry.", "Check My Options")}`;

  return layout({ title: "Banks & NBFCs — Our Lending Partner Network", description: `Compare loan offers from ${site.partners} partner banks and NBFCs with ELOANSS. Understand the difference between banks and NBFCs and find the lender most likely to approve you.`, path: "banks.html" }, "banks", body);
}

/* ============================================================= CREDIT CARDS */
function creditCardsPage() {
  const cats = [
    ["Rewards Cards", "gift", "Earn points on everyday spending and redeem them for vouchers, merchandise or statement credit."],
    ["Cashback Cards", "rupee", "Get a flat or category-based percentage of your spend back, credited straight to your bill."],
    ["Travel Cards", "plane", "Air miles, lounge access, low forex mark-up and travel insurance for frequent flyers."],
    ["Fuel Cards", "fuel", "Surcharge waivers and accelerated points at petrol pumps — useful if you drive daily."],
    ["Shopping Cards", "shoppingBag", "Boosted rewards with specific online and offline retail partners."],
    ["Lifetime Free Cards", "checkCircle", "No joining fee and no annual fee, for as long as you hold the card."],
    ["Business Cards", "briefcase", "Higher limits, expense tracking and GST-friendly statements for your company spend."],
    ["Secured Cards", "lock", "Issued against a fixed deposit — the practical way to build credit from scratch."],
  ].map(([t, ic, d], k) => `<div class="card reveal" data-d="${k % 4}"><span class="card__ic">${icons[ic]}</span><h3>${t}</h3><p class="mb0">${d}</p></div>`).join("");

  const rewardIcons = cardRewards.map(([n, ic]) => `<div class="rew"><span>${icons[ic]}</span><small>${n}</small></div>`).join("");

  const eligibility = ["Aged 21–60 years (18+ for add-on cards)", "Salaried or self-employed with a steady, documented income", "Credit score of 750+ for most premium cards", "Minimum income as specified by the issuing bank", "Indian resident with valid KYC documents"];
  const documents = ["PAN card", "Aadhaar or other address proof", "Latest 3 months' salary slips or 2 years' ITR", "Last 3–6 months' bank statements", "Passport-size photograph"];

  const faqs = [
    ["How many credit cards should I have?", "Two or three well-chosen cards covering your biggest spend categories is plenty. More cards means more annual fees and more due dates to miss."],
    ["Will applying hurt my credit score?", "Each formal application adds a hard enquiry, which can cost a few points. Comparing options through ELOANSS first does not — we only submit where you're likely to be approved."],
    ["What credit score do I need?", "Most mainstream cards want 750+. Between 650 and 750 your options narrow. Below that, a secured card against a fixed deposit is the realistic route."],
    ["Is a lifetime-free card actually free?", "The card carries no joining or annual fee, but interest, late-payment charges, forex mark-up and cash-advance fees all still apply if you trigger them."],
    ["Can I get a card without an income proof?", "Usually only as a secured card against a fixed deposit, or as an add-on card on a family member's account."],
    ["How fast will I get the card?", "Approval typically takes 3–7 working days for a complete application, with physical delivery a few days after that."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Credit Cards"]])}
    <h1>Find the Credit Card That Fits</h1>
    <p>Compare cards across rewards, cashback, travel and fuel — filtered by what you actually spend on and what you'll actually qualify for.</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="#compare">Compare Cards ${icons.arrowRight}</a></div>
    <div class="phero__stats">
      <div class="phero__stat"><b>8</b><span>Card categories</span></div>
      <div class="phero__stat"><b>Free</b><span>To compare &amp; apply</span></div>
      <div class="phero__stat"><b>Soft</b><span>Eligibility check</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1">
    <div class="ccard">
      <div class="ccard__top"><span class="ccard__brand">ELOAN<b>SS</b></span><span class="ccard__chip"></span></div>
      <p class="ccard__tag">Better Rewards<br>Brighter Tomorrows</p>
      <span class="ccard__num">•••• •••• •••• 5678</span>
    </div>
  </div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Card types</span><h2>Pick the category that matches your spending</h2><p>The best card is the one aligned to where your money already goes — not the one with the longest feature list.</p></div>
  <div class="grid g-4">${cats}</div>
</div></section>

<section class="section section--soft" id="compare"><div class="container">
  <div class="section-head section-head--left reveal"><h2>Compare cards for your profile</h2><p>Three fields, and we'll shortlist what you're likely to be approved for.</p></div>
  <div class="cards__grid">
    <div class="card cards__form reveal">
      <form class="cards__row" data-simpleform>
        <div class="field"><label>Card Type</label><select class="select" name="cardType"><option value="">Select Card Type</option>${cardTypes.map((c) => `<option>${c}</option>`).join("")}</select></div>
        <div class="field"><label>Annual Income</label><select class="select" name="income"><option value="">Select Income Range</option>${incomeBands.map((c) => `<option>${c}</option>`).join("")}</select></div>
        <div class="field"><label>Preferred Bank</label><select class="select" name="bank"><option value="">Select Bank</option>${lenders.slice(0, 12).map(([n]) => `<option>${n}</option>`).join("")}</select></div>
        <button class="btn btn--blue" type="submit">Compare Now ${icons.arrowRight}</button>
        <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} Matching cards — an advisor will call you.</span>
      </form>
    </div>
    <div class="cards__visual reveal" data-d="1">
      <div class="rewards"><b>Rewards That Match Your Lifestyle</b><div class="rewards__row">${rewardIcons}</div></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="grid g-2">
    <div class="card reveal"><span class="card__ic">${icons.checkCircle}</span><h3>Eligibility</h3>
      <ul class="ticks">${eligibility.map((e) => `<li>${icons.check}<span>${e}</span></li>`).join("")}</ul></div>
    <div class="card reveal" data-d="1"><span class="card__ic">${icons.fileText}</span><h3>Documents</h3>
      <ul class="ticks">${documents.map((e) => `<li>${icons.check}<span>${e}</span></li>`).join("")}</ul></div>
  </div>
  <div class="narrow reveal" style="margin-top:34px">${C.complianceNote()}</div>
</div></section>

${C.faqSection(faqs, "Credit card questions")}
${ctaBand("Not sure which card to apply for?", "Tell us your income and spending pattern and we'll shortlist the cards you're most likely to get.", "Get My Shortlist")}`;

  return layout({ title: "Credit Cards — Compare Rewards, Cashback, Travel & Fuel Cards", description: "Compare credit cards across rewards, cashback, travel, fuel and lifetime-free categories. Check eligibility with ELOANSS and apply to the card most likely to approve you.", path: "credit-cards.html" }, "cards", body);
}

/* ============================================================= CREDIT SCORE */
function creditScorePage() {
  const bands = [
    ["300 – 549", "Poor", "#B84040", "Most lenders will decline. A secured card or a small secured loan is the way back."],
    ["550 – 649", "Fair", "#C9A227", "Approvals are possible but rates are high and amounts are small."],
    ["650 – 749", "Good", "#7DA83F", "Most products are open to you, though not always at the headline rate."],
    ["750 – 900", "Excellent", "#16845B", "You qualify for the best rates, highest limits and pre-approved offers."],
  ].map(([r, l, c, d], k) => `<div class="band reveal" data-d="${k % 4}" style="--bc:${c}">
      <b>${r}</b><span class="band__lab">${l}</span><p>${d}</p>
    </div>`).join("");

  const factors = [
    ["Payment history", "35%", "Whether you pay on time, every time. The single biggest factor — one missed EMI hurts for months.", "calendar"],
    ["Credit utilisation", "30%", "How much of your available limit you use. Staying under 30% is the practical target.", "percent"],
    ["Age of credit", "15%", "How long your accounts have been open. Closing your oldest card shortens this and costs you points.", "clock"],
    ["Credit mix", "10%", "A healthy blend of secured and unsecured credit reads better than one type alone.", "layers"],
    ["New enquiries", "10%", "Each hard enquiry shaves a few points. Several in a short window looks like distress borrowing.", "search"],
  ].map(([t, w, d, ic], k) => `<div class="card reveal" data-d="${k % 3}">
      <span class="card__ic">${icons[ic]}</span>
      <div class="pill" style="margin-bottom:12px">${w} of your score</div>
      <h3>${t}</h3><p class="mb0">${d}</p>
    </div>`).join("");

  const tips = [
    "Set up auto-debit for every EMI and card bill — payment history is a third of your score.",
    "Keep card utilisation under 30% of your limit; ask for a limit increase rather than spending less if you need to.",
    "Don't close your oldest credit card — its age is working for you.",
    "Space out loan and card applications by at least three months.",
    "Check your report twice a year and dispute anything that isn't yours.",
    "Clear the full statement balance, not the minimum due — the minimum keeps you in interest indefinitely.",
  ].map((t) => `<li>${icons.checkCircle}<span>${t}</span></li>`).join("");

  const faqs = [
    ["Is checking my score really free?", "Yes. Checking your own score is a soft enquiry — it's free through ELOANSS and does not affect your score, no matter how often you do it."],
    ["Why is my CIBIL score different from my Experian score?", "Each bureau holds slightly different data and uses its own model. A gap of 20–40 points between bureaus is normal."],
    ["How long does it take to improve a score?", "Meaningful movement takes three to six months of clean repayment. There is no legitimate way to fix a score overnight."],
    ["Does checking my score lower it?", "No. Only hard enquiries — where a lender pulls your report because you formally applied — affect your score."],
    ["I have no credit history. What's my score?", "You'll show as NH or NA rather than a number. A secured credit card against a fixed deposit is the standard way to start building one."],
    ["Can a rejected application hurt my score?", "The rejection itself isn't recorded, but the hard enquiry that preceded it is. That's why we check your fit before submitting anything."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Credit Score"]])}
    <h1>Check Your Credit Score — Free</h1>
    <p>Know your CIBIL and Experian score before a lender does. Checking through ELOANSS is a soft enquiry, so it never costs you points.</p>
    <div class="phero__stats">
      <div class="phero__stat"><b>Free</b><span>Forever, unlimited</span></div>
      <div class="phero__stat"><b>Instant</b><span>Result on screen</span></div>
      <div class="phero__stat"><b>Zero</b><span>Impact on your score</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1">
    <div class="card score" style="margin:0">
      <h3>Get your free score</h3>
      <p class="score__sub">Enter your mobile number to begin.</p>
      <div class="score__body">
        <form class="score__form" data-simpleform>
          <input class="input" type="tel" name="mobile" required placeholder="Enter your mobile number" aria-label="Mobile number">
          <button class="btn btn--blue btn--block" type="submit">Get My Free Score ${icons.arrowRight}</button>
          <span class="form-ok form-ok--inline" hidden>${icons.checkCircle} We'll text your score shortly.</span>
        </form>
        <div class="gauge">
          <svg viewBox="0 0 200 118" aria-hidden="true">
            <defs><linearGradient id="gg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#B84040"/><stop offset="35%" stop-color="#C9A227"/>
              <stop offset="70%" stop-color="#7DA83F"/><stop offset="100%" stop-color="#16845B"/>
            </linearGradient></defs>
            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="11" stroke-linecap="round"/>
            <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="url(#gg2)" stroke-width="11" stroke-linecap="round" stroke-dasharray="251" stroke-dashoffset="50" data-gauge-arc/>
            <line x1="100" y1="110" x2="100" y2="62" stroke="#fff" stroke-width="3" stroke-linecap="round" data-gauge-needle transform="rotate(48 100 110)"/>
            <circle cx="100" cy="110" r="5" fill="#fff"/>
          </svg>
          <div class="gauge__val"><b data-gauge-num>780</b><span>Excellent</span></div>
          <div class="gauge__scale"><span>300</span><span>900</span></div>
        </div>
      </div>
      <div class="score__bureaus"><span>CIBIL</span><span>Experian</span><small>Powered by trusted partners</small></div>
    </div>
  </div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Score bands</span><h2>What your number actually means</h2><p>Scores run from 300 to 900. Where you sit decides which products are open to you and at what rate.</p></div>
  <div class="bands">${bands}</div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">The five factors</span><h2>What moves your score</h2><p>Bureaus weight these differently. Payment history and utilisation together account for nearly two thirds.</p></div>
  <div class="grid g-3">${factors}</div>
</div></section>

<section class="section"><div class="container">
  <div class="split">
    <div class="reveal">
      <span class="eyebrow">Practical steps</span>
      <h2>How to improve your score</h2>
      <p>None of this is quick, but all of it works. Start with the first two — they carry the most weight.</p>
      <ul class="ticks ticks--lg">${tips}</ul>
    </div>
    <div class="reveal" data-d="1"><img style="border-radius:var(--r-xl)" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=560&h=620&fit=crop" alt="Reviewing financial statements" loading="lazy"></div>
  </div>
</div></section>

${C.faqSection(faqs, "Credit score questions")}
${ctaBand("Know your score, then get the right offer", "Once you know where you stand, we'll show you the lenders that actually match your profile.", "Check My Score", "#top")}`;

  return layout({ title: "Free Credit Score Check — CIBIL & Experian", description: "Check your CIBIL and Experian credit score free with ELOANSS. Understand your score band, the five factors that move it, and practical steps to improve it.", path: "credit-score.html" }, "score", body);
}

/* ============================================================== CALCULATORS */
function calculatorsPage() {
  const others = [
    ["Home Loan EMI", "Long tenures and the lowest rates — see what a 20-year loan really costs.", "/loans/home-loan.html", "home"],
    ["Personal Loan EMI", "Unsecured, faster, and priced higher. Check the monthly hit before you commit.", "/loans/personal-loan.html", "user"],
    ["Business Loan EMI", "Match the instalment to your cash cycle before you borrow.", "/loans/business-loan.html", "briefcase"],
    ["Car Loan EMI", "New or used — work out the down payment that keeps the EMI comfortable.", "/loans/new-car-loan.html", "car"],
    ["Gold Loan", "Short tenure, secured against your jewellery, disbursed same day.", "/loans/gold-loan.html", "gold"],
    ["Balance Transfer", "Compare your current rate against a new lender's and see the lifetime saving.", "/loans/home-loan.html", "trendingUp"],
  ].map(([t, d, h, ic], k) => `<a class="card reveal" data-d="${k % 3}" href="${h}">
      <span class="card__ic">${icons[ic]}</span><h3>${t}</h3><p>${d}</p>
      <span class="card__link">Open calculator ${icons.arrowRight}</span>
    </a>`).join("");

  const faqs = [
    ["How is EMI calculated?", "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the principal, r the monthly interest rate and n the number of months. Our calculator applies exactly this formula."],
    ["Is the figure I get here final?", "No. It's an accurate calculation of the inputs you gave, but your actual EMI depends on the rate the lender approves you for, plus processing fees and any insurance you add."],
    ["Does the EMI include processing fees?", "No. Processing fees are usually deducted from the disbursed amount or charged upfront, so they don't form part of the monthly instalment."],
    ["What happens if I prepay?", "Prepayment reduces your principal. Most lenders let you either shorten the tenure or lower the EMI — shortening the tenure saves far more interest."],
    ["Why does a longer tenure cost more?", "A longer tenure lowers the monthly instalment but leaves the principal outstanding for longer, so total interest paid rises — often substantially."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Calculators"]])}
    <h1>Loan Calculators</h1>
    <p>Work out the monthly instalment, the total interest and what you can realistically borrow — before you talk to a single lender.</p>
    <div class="phero__stats">
      <div class="phero__stat"><b>Live</b><span>Updates as you slide</span></div>
      <div class="phero__stat"><b>No</b><span>Sign-up needed</span></div>
      <div class="phero__stat"><b>Exact</b><span>Standard EMI formula</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1"><img style="border-radius:var(--r-lg)" src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=560&h=420&fit=crop" alt="Calculator and financial documents" loading="lazy"></div>
</div></div></section>

<section class="section" id="emi"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">EMI calculator</span><h2>What will my instalment be?</h2><p>Move the sliders to see the monthly EMI, the total interest and the full amount payable.</p></div>
  <div class="reveal">${C.emiCalculator({ amount: [50000, 10000000, 1500000], rate: [8, 24, 11], tenure: [1, 30, 7] })}</div>
</div></section>

<section class="section section--soft" id="eligibility"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Eligibility</span><h2>How much can I borrow?</h2><p>Lenders size your loan against your income and existing obligations. Give us the basics and an advisor will come back with a realistic range.</p></div>
  <div class="narrow reveal">
    <form class="form-card" data-simpleform>
      <div class="field-row">
        <div class="field"><label>Monthly income (₹) <span class="req">*</span></label><input class="input" type="number" name="income" required placeholder="e.g. 60000"></div>
        <div class="field"><label>Existing EMIs (₹)</label><input class="input" type="number" name="obligations" placeholder="e.g. 12000"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Employment type <span class="req">*</span></label>
          <select class="select" name="employment" required><option value="">Select</option><option>Salaried</option><option>Self-employed</option><option>Business owner</option></select></div>
        <div class="field"><label>Loan type <span class="req">*</span></label>
          <select class="select" name="product" required><option value="">Select</option>${loans.map((l) => `<option>${l.name}</option>`).join("")}</select></div>
      </div>
      <div class="field"><label>Mobile number <span class="req">*</span></label><input class="input" type="tel" name="mobile" required placeholder="10-digit mobile"></div>
      <button class="btn btn--blue btn--block" type="submit">Check My Eligibility ${icons.arrowRight}</button>
      <div class="form-ok" hidden>
        <span class="ic">${icons.checkCircle}</span>
        <h4>Thanks — we have what we need.</h4>
        <p>An advisor will call you with an indicative eligibility range and the lenders that fit. This is a demo form — no data is sent.</p>
      </div>
    </form>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">By product</span><h2>Product-specific calculators</h2><p>Each loan page carries a calculator pre-set to that product's real rate and tenure ranges.</p></div>
  <div class="grid g-3">${others}</div>
</div></section>

<section class="section section--soft"><div class="container narrow reveal">${C.complianceNote()}</div></section>

${C.faqSection(faqs, "Calculator questions")}
${ctaBand("Know the number? Now get the offer.", "Send us your requirement and we'll come back with real rates from lenders who match your profile.", "Get My Best Offer")}`;

  return layout({ title: "EMI & Eligibility Calculators", description: "Free EMI calculator and loan eligibility calculator from ELOANSS. Work out your monthly instalment, total interest and how much you can borrow across every loan type.", path: "calculators.html" }, "calc", body);
}

/* ============================================================== INVESTMENTS */
function investmentsPage() {
  const products = [
    ["Mutual Funds & SIPs", "trendingUp", "Equity, debt and hybrid funds from leading AMCs. Start a SIP from ₹500 a month and let compounding do the work.", ["Equity, debt & hybrid funds", "SIP from ₹500/month", "ELSS options for 80C", "Goal-based fund selection"]],
    ["Fixed Deposits", "lock", "Bank and corporate FDs with assured returns and flexible payout options — the anchor of a conservative portfolio.", ["Assured, pre-known returns", "Monthly, quarterly or cumulative payout", "Senior-citizen rate benefits", "Loan against FD available"]],
    ["Digital Gold", "gold", "Buy, hold and sell 24K gold digitally from ₹100. Stored securely in insured vaults and redeemable any time.", ["From ₹100 per purchase", "99.9% pure 24K gold", "Insured vault storage", "Redeem as coins or cash"]],
    ["Bonds & G-Secs", "fileText", "Government securities, corporate bonds and 54EC capital-gain bonds for predictable, stable income.", ["Government & corporate bonds", "54EC capital-gain bonds", "Predictable coupon income", "Portfolio diversification"]],
  ].map(([t, ic, d, pts], k) => `<div class="card reveal" data-d="${k % 4}">
      <span class="card__ic">${icons[ic]}</span>
      <h3>${t}</h3><p>${d}</p>
      <ul class="ticks">${pts.map((p) => `<li>${icons.check}<span>${p}</span></li>`).join("")}</ul>
    </div>`).join("");

  const why = [
    ["Goal-first, product-second", "We start from what you're saving for and when you need it, then pick instruments — not the other way round.", "target"],
    ["SEBI-registered partners", "Every investment is executed through regulated partners. ELOANSS facilitates access; it does not hold your money.", "shield"],
    ["No advisory fee", "Our service is free to you. We're compensated by the product partner, and we'll tell you where that applies.", "handshake"],
    ["One view of everything", "Loans, insurance and investments handled by the same team, so your borrowing and saving don't work against each other.", "layers"],
  ].map(([t, d, ic], k) => `<div class="card reveal" data-d="${k % 4}"><span class="card__ic">${icons[ic]}</span><h3>${t}</h3><p class="mb0">${d}</p></div>`).join("");

  const faqs = [
    ["How much do I need to start?", "A SIP can start at ₹500 a month and digital gold at ₹100. Fixed deposits and bonds typically need larger minimums, which vary by issuer."],
    ["Are returns guaranteed?", "Only fixed deposits and bonds carry a contractually stated return, and even those carry issuer credit risk. Mutual funds and gold are market-linked — returns can be negative."],
    ["Does ELOANSS manage my money?", `No. ${site.name} facilitates access to SEBI-registered partners. Your investments are held with the AMC, bank or depository — never with us.`],
    ["Can I withdraw early?", "Mutual funds and digital gold are generally liquid within a few working days. Fixed deposits usually carry a premature-withdrawal penalty, and ELSS funds are locked for three years."],
    ["Which is better — SIP or lump sum?", "A SIP spreads your entry across market levels and suits regular income. A lump sum suits money you already hold, if the horizon is long enough to absorb volatility."],
    ["Do you give personalised investment advice?", "We help you compare and access products. We are not a registered investment adviser and don't give personalised advice — for that, consult a SEBI-registered adviser."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Investments"]])}
    <h1>Invest Today for a Brighter Tomorrow</h1>
    <p>Mutual funds, fixed deposits, digital gold and bonds — matched to your goals and your risk appetite, through SEBI-registered partners.</p>
    <div class="hero__cta" style="margin-top:24px"><a class="btn btn--gold btn--lg" href="/contact.html">Start Investing ${icons.arrowRight}</a></div>
    <div class="phero__stats">
      <div class="phero__stat"><b>₹500</b><span>Minimum SIP</span></div>
      <div class="phero__stat"><b>₹100</b><span>Minimum digital gold</span></div>
      <div class="phero__stat"><b>SEBI-reg</b><span>Partner platforms</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1"><img style="border-radius:var(--r-lg)" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=560&h=420&fit=crop" alt="Savings and investment growth" loading="lazy"></div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">What you can invest in</span><h2>Four ways to put your money to work</h2><p>From market-linked growth to assured income — usually you want some of each.</p></div>
  <div class="grid g-4">${products}</div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Why ELOANSS</span><h2>How we approach investing</h2><p>We're a facilitator, not a fund manager. That shapes how we work.</p></div>
  <div class="grid g-4">${why}</div>
</div></section>

<section class="section"><div class="container">
  <div class="banner reveal"><div class="banner__inner">
    <div>
      <span class="eyebrow">Also available</span>
      <h2>Trading &amp; demat accounts</h2>
      <p>Want to invest directly in stocks, ETFs and IPOs? Our Share Markets desk handles demat account opening and IPO applications.</p>
    </div>
    <a class="btn btn--gold btn--lg" href="/share-markets.html">Explore Share Markets ${icons.arrowRight}</a>
  </div></div>
</div></section>

<section class="section section--soft"><div class="container narrow reveal">
  <div class="note"><span class="ic">${icons.info}</span><div><b>Investments carry market risk.</b><p>${site.name} facilitates access to SEBI-registered partners and does not provide personalised investment advice or guarantee returns. Mutual fund and securities investments are subject to market risks; please read all scheme-related documents carefully before investing.</p></div></div>
</div></section>

${C.faqSection(faqs, "Investment questions")}
${ctaBand("Ready to start investing?", "Tell us what you're saving for and we'll help you pick the right mix — with no advisory fee.", "Talk to an Advisor")}`;

  return layout({ title: "Investments — Mutual Funds, FDs, Digital Gold & Bonds", description: "Invest in mutual funds, SIPs, fixed deposits, digital gold and bonds with ELOANSS through SEBI-registered partners. Goal-based investing with no advisory fee.", path: "investments.html" }, "invest", body);
}

/* ============================================================= LENDER PAGE */
function bankPage([name, cat, slug]) {
  const p = lenderProfiles[slug];
  const kind = LENDER_KIND[p.kind];
  const isGold = p.kind === "gold";
  const highlights = p.kind === "bank" ? BANK_HIGHLIGHTS : isGold ? GOLD_HIGHLIGHTS : NBFC_HIGHLIGHTS;
  const logo = lenderLogo(slug);

  const products = p.products.map((s) => loans.find((l) => l.slug === s)).filter(Boolean);

  const productCards = products.map((l, k) => `<a class="card reveal" data-d="${k % 3}" href="/loans/${l.slug}.html">
      <span class="card__ic">${icons[l.icon]}</span>
      <h3>${l.name.replace(" / Mortgage Loan", " / Mortgage")}</h3>
      <p>${l.tagline}</p>
      <div class="deflist" style="margin:14px 0;border-radius:12px">
        <div class="r" style="padding:10px 14px"><dt>Market rate</dt><dd>${l.rate} p.a.</dd></div>
        <div class="r" style="padding:10px 14px"><dt>Amount</dt><dd>${l.amount}</dd></div>
        <div class="r" style="padding:10px 14px"><dt>Tenure</dt><dd>${l.tenure}</dd></div>
      </div>
      <span class="card__link">See details ${icons.arrowRight}</span>
    </a>`).join("");

  const hl = highlights.map(([t, d], k) => `<div class="card reveal" data-d="${k % 4}">
      <span class="card__ic">${icons[["scale", "clock", "mapPin", "gift"][k] || "check"]}</span>
      <h3>${t}</h3><p class="mb0">${d}</p>
    </div>`).join("");

  const faqs = [
    [`Does ELOANSS work for ${name} or for me?`,
      `Neither exclusively. ${site.name} is an independent facilitator. We prepare and submit your application to ${name} and to any other lender that fits your profile, then show you what each comes back with. You choose.`],
    [`What interest rate will ${name} give me?`,
      `We can't quote another institution's pricing, and nobody honestly can before they assess you. The ranges on this page are indicative market ranges for each product. ${name} sets your actual rate based on your credit score, income, obligations and their current policy.`],
    [`Is applying through ELOANSS slower than going direct?`,
      `No. We submit the same application, but we check your fit first so you're less likely to collect a rejection and a hard credit enquiry for nothing.`],
    [`Does it cost more to apply through you?`,
      `No. You get ${name}'s standard rates and charges. Our commission is paid by the lender you choose, never added to your loan.`],
    [`What if ${name} declines my application?`,
      `We tell you why where we can, and put the same profile in front of the lenders most likely to approve it. A decline from one lender is not a decline from all of them.`],
  ];

  const others = lenders.filter(([, , s]) => s !== slug).slice(0, 8)
    .map(([n, c, s]) => `<a class="crosslender" href="/banks/${s}.html">${lenderLogo(s)
      ? `<img src="${lenderLogo(s)}" alt="${n}" loading="lazy">`
      : `<span>${n}</span>`}</a>`).join("");

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Banks & NBFCs", "/banks.html"], [name]])}
    <span class="pill" style="margin-bottom:14px">${icons.bank} ${kind.label}</span>
    <h1>${name} Loans</h1>
    <p>${p.intro}</p>
    <div class="hero__cta" style="margin-top:24px">
      <a class="btn btn--gold btn--lg" href="#enquire">Check My Eligibility ${icons.arrowRight}</a>
      <a class="btn btn--on-navy btn--lg" href="/banks.html">All partners</a>
    </div>
    <div class="phero__stats">
      <div class="phero__stat"><b>${products.length}</b><span>Product${products.length === 1 ? "" : "s"} we place here</span></div>
      <div class="phero__stat"><b>Free</b><span>To compare &amp; apply</span></div>
      <div class="phero__stat"><b>Soft</b><span>Eligibility check first</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1">
    <div class="bankcard">
      ${logo ? `<img class="bankcard__logo" src="${logo}" alt="${name}">` : `<span class="bankcard__name">${name}</span>`}
      <p class="bankcard__kind">${kind.note}</p>
    </div>
  </div>
</div></div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">What we place here</span><h2>${name} products via ELOANSS</h2><p>These are the products we most often match to ${name}. Rates shown are indicative market ranges for the product, not a ${name} quote.</p></div>
  <div class="grid g-3">${productCards}</div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">What to expect</span><h2>${kind.heading}</h2><p>How ${name} tends to differ from the alternatives.</p></div>
  <div class="grid g-4">${hl}</div>
  <div class="narrow reveal" style="margin-top:34px">
    <div class="note"><span class="ic">${icons.info}</span><div><b>Indicative information only.</b><p>${site.name} is an independent facilitator and is not owned by, affiliated with, or acting as an agent of ${name}. Interest rates, fees, eligibility and approval are determined solely by ${name} and may change without notice. Product availability varies by location and applicant profile. ${name}'s name and logo are its own property.</p></div></div>
  </div>
</div></section>

<section class="section" id="enquire"><div class="container">
  <div class="contact-grid">
    <div class="reveal">
      <span class="eyebrow">Free eligibility check</span>
      <h2>See if ${name} is your best option</h2>
      <p class="lead">Tell us what you need. We'll check your fit with ${name} and put the same profile in front of every other lender that suits it — then show you the offers side by side.</p>
      <ul class="ticks ticks--lg">
        <li>${icons.checkCircle}<span>No hard credit enquiry to check your options</span></li>
        <li>${icons.checkCircle}<span>Completely free — the lender pays our commission</span></li>
        <li>${icons.checkCircle}<span>We compare ${name} against ${site.partners} other lenders</span></li>
        <li>${icons.checkCircle}<span>No obligation to proceed with anyone</span></li>
      </ul>
    </div>
    <div class="reveal" data-d="1">${C.applicationForm()}</div>
  </div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Compare</span><h2>Other lenders in our network</h2><p>Don't settle on one before you've seen the rest.</p></div>
  <div class="crosslenders reveal">${others}</div>
  <div class="center mt-l reveal"><a class="btn btn--navy" href="/banks.html">View all ${lenders.length} partners ${icons.arrowRight}</a></div>
</div></section>

${C.faqSection(faqs, `${name} — frequently asked`)}
${ctaBand(`Get your ${name} offer — and everyone else's`, "One application, compared across our whole lending network. Free, and with no obligation.", "Check My Eligibility", "#enquire")}`;

  return layout({
    title: `${name} Loans — Compare & Apply`,
    description: `Compare ${name} loan products with ELOANSS. Check your eligibility free, see how ${name} stacks up against ${site.partners} other lenders, and apply with expert guidance.`,
    path: `banks/${slug}.html`,
  }, "banks", body);
}

/* ==================================================== BUSINESS FINANCE PAGE */
function businessFinancePage() {
  const B = businessFinance;
  const chips = (arr) => arr.map((t) => `<li>${icons.check}<span>${t}</span></li>`).join("");

  const elig = B.eligibility.map(([label, value, ic], k) => `<div class="eligcard reveal" data-d="${k % 4}">
      <span class="eligcard__ic">${icons[ic]}</span>
      <b>${value}</b><span>${label}</span>
    </div>`).join("");

  const why = B.why.map(([t, ic], k) => `<div class="whycard reveal" data-d="${k % 4}">
      <span class="whycard__ic">${icons[ic]}</span><span>${t}</span>
    </div>`).join("");

  const props = B.lapProperties.map(([t, ic], k) => `<div class="propcard reveal" data-d="${k % 4}">
      <span class="propcard__ic">${icons[ic]}</span><b>${t}</b>
    </div>`).join("");

  const faqs = [
    ["How much can my business borrow?",
      `Facilities run from ${B.rangeHeadline.replace("*", "")} depending on your profile. The size you qualify for is driven by turnover, banking conduct, GST filings, financials and — where the facility is secured — the property offered.`],
    ["What is the difference between CC/OD and a term loan?",
      "Cash Credit and Overdraft are revolving limits: you draw what you need, repay, and draw again, with interest only on the amount used. A term loan is a fixed sum repaid over a set schedule. Working capital cycles usually suit CC/OD; asset purchases usually suit a term loan."],
    ["What is CGTMSE funding?",
      "A credit guarantee scheme that lets eligible MSMEs borrow without conventional collateral, with the guarantee cover standing in its place. Eligibility and cover are set by the scheme and the lender, not by us."],
    ["Do you arrange Bank Guarantees and Letters of Credit?",
      "Yes — BG and LC are part of the trade and banking facilities we place, alongside GST-based and POS-based overdrafts and CC/OD enhancements."],
    ["Is the 8.0% p.a. rate guaranteed?",
      `No. That is an indicative starting point, marked with an asterisk throughout. ${B.eligibilityNote} ${site.name} is a facilitator — the rate, the limit and the approval are the lender's decision.`],
    ["Which businesses do you not fund?",
      "The specialised list carries its own carve-outs: bullion traders are excluded from jewellery-sector funding, and coal-linked industry funding excludes mining. Beyond that, eligibility depends on the lender's sector policy at the time of application."],
  ];

  const body = `
<section class="phero"><div class="container"><div class="phero__inner">
  <div>
    ${crumbs([["Home", "/index.html"], ["Loans", "/loans.html"], ["Business Finance"]])}
    <span class="pill" style="margin-bottom:14px">${icons.briefcase} ${B.kicker}</span>
    <h1>Working Capital &amp; Business Finance</h1>
    <p>${B.segments}</p>
    <div class="hero__cta" style="margin-top:24px">
      <a class="btn btn--gold btn--lg" href="#enquire">Check Eligibility ${icons.arrowRight}</a>
      <a class="btn btn--on-navy btn--lg" href="#facilities">View Facilities</a>
    </div>
    <div class="phero__stats">
      <div class="phero__stat"><b>${B.rangeHeadline}</b><span>Funding range</span></div>
      <div class="phero__stat"><b>Pan-India</b><span>Banking network</span></div>
      <div class="phero__stat"><b>MSME → Mid-Corporate</b><span>Segments served</span></div>
    </div>
  </div>
  <div class="phero__card reveal" data-d="1">
    <span class="eyebrow" style="color:var(--gold)">Funding range</span>
    <p class="bigrange">${B.rangeHeadline}</p>
    <p style="font-size:.9rem;color:#b9dbcd;margin:0">${B.rangeNote}</p>
  </div>
</div></div></section>

<section class="section" id="facilities"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Core facilities</span><h2>Working Capital &amp; Business Finance</h2><p>The full set of facilities we arrange for operating businesses.</p></div>
  <ul class="ticks ticks--cols reveal">${chips(B.workingCapital)}</ul>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Sector expertise</span><h2>Specialized business funding</h2><p>Sectors we place regularly, each with its own underwriting pattern.</p></div>
  <ul class="ticks ticks--cols reveal">${chips(B.specialized)}</ul>
</div></section>

<section class="section"><div class="container">
  <div class="split">
    <div class="reveal">
      <span class="eyebrow">Agriculture &amp; rural</span>
      <h2>Agriculture &amp; Rural Finance</h2>
      <p class="lead">Crop cycles, storage and processing carry their own cash-flow shape. These facilities are structured around it.</p>
      <ul class="ticks ticks--lg">${chips(B.agriculture)}</ul>
    </div>
    <div class="reveal" data-d="1"><img style="border-radius:var(--r-xl)" src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=560&h=620&fit=crop" alt="Agricultural land" loading="lazy"></div>
  </div>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Property-backed</span><h2>LAP &amp; Property-Backed Funding</h2><p>Property types we lend against, and the facilities available on them.</p></div>
  <div class="propgrid">${props}</div>
  <ul class="ticks ticks--cols reveal" style="margin-top:26px">${chips(B.lapFacilities)}</ul>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Trade &amp; banking</span><h2>Trade &amp; Banking Facilities</h2><p>Non-fund-based limits and enhancements alongside your working capital.</p></div>
  <ul class="ticks ticks--cols reveal">${chips(B.trade)}</ul>
</div></section>

<section class="section section--soft"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Eligibility indicators</span><h2>What lenders look for</h2><p>Indicative only — every figure below is subject to assessment.</p></div>
  <div class="eliggrid">${elig}</div>
  <div class="narrow reveal" style="margin-top:30px">
    <div class="note"><span class="ic">${icons.info}</span><div><b>Indicative figures.</b><p>${B.eligibilityNote}</p></div></div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head reveal"><span class="eyebrow">Why choose us</span><h2>How we work</h2><p>What you get by placing the mandate through ${site.name}.</p></div>
  <div class="whygrid">${why}</div>
</div></section>

<section class="section section--soft" id="enquire"><div class="container">
  <div class="contact-grid">
    <div class="reveal">
      <span class="eyebrow">Eligibility assessment</span>
      <h2>Connect for eligibility &amp; funding options</h2>
      <p class="lead">${B.summaryLine}</p>
      <ul class="ticks ticks--lg">
        <li>${icons.checkCircle}<span>One assessment, placed across our pan-India banking network</span></li>
        <li>${icons.checkCircle}<span>No cost to you — the lender pays our commission</span></li>
        <li>${icons.checkCircle}<span>End-to-end documentation assistance</span></li>
      </ul>
      <div class="mt reveal">
        <a class="btn btn--navy" href="tel:${site.phoneHref}">${icons.phone} ${site.phone}</a>
      </div>
    </div>
    <div class="reveal" data-d="1">${C.applicationForm()}</div>
  </div>
</div></section>

<section class="section"><div class="container narrow reveal">
  <div class="note"><span class="ic">${icons.info}</span><div><b>Important.</b><p>${B.disclaimer}</p></div></div>
</div></section>

${C.faqSection(faqs, "Business finance — frequently asked")}
${ctaBand("Ready to size your facility?", "Send us your turnover, banking and GST position and we will come back with the structures and lenders that fit.", "Check Eligibility", "#enquire")}`;

  return layout({
    title: "Working Capital & Business Finance — ₹10 Lakhs to ₹100 Crores",
    description: `${B.kicker}. CC, OD, working capital, term loans, LAP, machinery finance, CGTMSE, BG/LC and project finance for MSME, SME and mid-corporate businesses across India.`,
    path: "business-finance.html",
  }, "bizfin", body);
}

module.exports = {
  home, loansOverview, loanPage, insuranceOverview, insurancePage, shareMarkets,
  about, partner, howItWorks, blog, blogPost, contact, legalPage,
  banksPage, creditCardsPage, creditScorePage, calculatorsPage, investmentsPage, bankPage,
  businessFinancePage,
};
