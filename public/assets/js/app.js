/* ELOANSS — front-end interactions */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  /* ---- Header shadow on scroll ---- */
  const header = $(".header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Desktop dropdown / mega menu (hover + click, keyboard-friendly) ---- */
  $$(".nav__item--has-menu").forEach((item) => {
    const link = $(".nav__link", item);
    let t;
    const open = () => { clearTimeout(t); closeAll(item); item.classList.add("is-open"); };
    const close = () => { t = setTimeout(() => item.classList.remove("is-open"), 120); };
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    if (link) link.addEventListener("click", (e) => { e.preventDefault(); item.classList.toggle("is-open"); });
  });
  function closeAll(except) { $$(".nav__item--has-menu").forEach((i) => { if (i !== except) i.classList.remove("is-open"); }); }
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav__item--has-menu")) closeAll(null); });

  /* ---- Mobile nav ---- */
  const mnav = $(".mnav");
  const openMnav = () => { if (mnav) { mnav.classList.add("is-open"); document.body.style.overflow = "hidden"; } };
  const closeMnav = () => { if (mnav) { mnav.classList.remove("is-open"); document.body.style.overflow = ""; } };
  $(".nav__toggle") && $(".nav__toggle").addEventListener("click", openMnav);
  $(".mnav__close") && $(".mnav__close").addEventListener("click", closeMnav);
  $(".mnav__scrim") && $(".mnav__scrim").addEventListener("click", closeMnav);
  $$(".mnav__gbtn").forEach((b) => b.addEventListener("click", () => b.closest(".mnav__group").classList.toggle("is-open")));

  /* ---- FAQ accordion ---- */
  $$(".faq__q").forEach((q) => q.addEventListener("click", () => {
    const item = q.closest(".faq__item");
    const a = $(".faq__a", item);
    const open = item.classList.toggle("is-open");
    a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
  }));

  /* ---- Reveal on scroll ---- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 })
    : null;
  $$(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("in"));

  /* ---- EMI Calculator ---- */
  $$("[data-emi]").forEach((root) => {
    const amt = $("[data-emi-amount]", root);
    const rate = $("[data-emi-rate]", root);
    const tenure = $("[data-emi-tenure]", root);
    const outAmt = $("[data-out-amount]", root);
    const outRate = $("[data-out-rate]", root);
    const outTenure = $("[data-out-tenure]", root);
    const emiOut = $("[data-out-emi]", root);
    const prinOut = $("[data-out-principal]", root);
    const intOut = $("[data-out-interest]", root);
    const totOut = $("[data-out-total]", root);
    const donut = $("[data-emi-donut]", root);

    function calc() {
      const P = +amt.value;
      const R = +rate.value / 12 / 100;
      const N = +tenure.value * 12;
      const emi = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const total = emi * N;
      const interest = total - P;
      if (outAmt) outAmt.textContent = inr(P);
      if (outRate) outRate.textContent = (+rate.value).toFixed(2) + "%";
      if (outTenure) outTenure.textContent = tenure.value + " yr";
      if (emiOut) emiOut.textContent = inr(emi);
      if (prinOut) prinOut.textContent = inr(P);
      if (intOut) intOut.textContent = inr(interest);
      if (totOut) totOut.textContent = inr(total);
      if (donut) {
        const pPct = (P / total) * 100;
        donut.style.background = `conic-gradient(var(--gold) 0 ${pPct}%, #3f6088 ${pPct}% 100%)`;
      }
    }
    [amt, rate, tenure].forEach((el) => el && el.addEventListener("input", calc));
    calc();
  });

  /* ---- Multi-step forms ---- */
  $$("[data-msform]").forEach((form) => {
    const steps = $$(".fstep", form);
    const bars = $$(".sb", form);
    const done = $(".form-ok", form);
    let i = 0;
    const show = () => {
      steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
      bars.forEach((b, k) => { b.classList.toggle("is-active", k === i); b.classList.toggle("is-done", k < i); });
    };
    const valid = () => {
      let ok = true;
      $$("input[required], select[required]", steps[i]).forEach((f) => {
        if (!f.value.trim()) { f.style.borderColor = "var(--danger)"; ok = false; }
        else f.style.borderColor = "";
      });
      return ok;
    };
    form.addEventListener("click", (e) => {
      if (e.target.closest("[data-next]")) { if (valid() && i < steps.length - 1) { i++; show(); } }
      if (e.target.closest("[data-prev]")) { if (i > 0) { i--; show(); } }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid()) return;
      if (done) { steps.forEach((s) => s.classList.remove("is-active")); $(".steps-bar", form) && ($(".steps-bar", form).style.display = "none"); $(".form-nav", form) && ($(".form-nav", form).style.display = "none"); done.hidden = false; }
    });
    show();
  });

  /* ---- Simple (single-step) form handling ---- */
  $$("[data-simpleform]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = $(".form-ok", form);
      if (ok) { $$(".field, .field-row, [data-formbody]", form).forEach((n) => n.hidden = true); const btn = $("button[type=submit]", form); if (btn) btn.hidden = true; ok.hidden = false; }
    });
  });


/* ---- v2: generic tab groups (loan universe, investments, credit cards) ---- */
  function tabGroup(btnAttr, panelAttr) {
    $$("[" + btnAttr + "]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const scope = btn.closest("section") || document;
        const key = btn.getAttribute(btnAttr);
        $$("[" + btnAttr + "]", scope).forEach((b) => b.classList.toggle("is-active", b === btn));
        $$("[" + panelAttr + "]", scope).forEach((p) => p.classList.toggle("is-active", p.getAttribute(panelAttr) === key));
      });
    });
  }
  tabGroup("data-utab", "data-upanel");
  tabGroup("data-itab", "data-ipanel");

  /* credit-card tabs have no panels yet — just track the active state */
  $$("[data-ctab]").forEach((btn) => btn.addEventListener("click", () => {
    $$("[data-ctab]").forEach((b) => b.classList.toggle("is-active", b === btn));
  }));

  /* ---- v2: EMI product tabs re-range the shared calculator ---- */
  const EMI_PRESETS = {
    home:     { amount: [500000, 50000000, 5000000], rate: [8.35, 11.5, 8.5],  tenure: [5, 30, 20] },
    personal: { amount: [50000, 4000000, 800000],    rate: [10.25, 24, 13],    tenure: [1, 5, 4] },
    car:      { amount: [100000, 5000000, 800000],   rate: [8.75, 15, 9.5],    tenure: [1, 7, 5] },
    business: { amount: [100000, 20000000, 2500000], rate: [11, 26, 15],       tenure: [1, 5, 4] },
  };
  const fmtScale = (n) => n >= 10000000 ? (n / 10000000) + " Cr" : n >= 100000 ? (n / 100000) + " L" : (n / 1000) + "K";

  $$("[data-etab]").forEach((btn) => btn.addEventListener("click", () => {
    const card = btn.closest(".emicard");
    if (!card) return;
    const p = EMI_PRESETS[btn.getAttribute("data-etab")];
    if (!p) return;
    $$("[data-etab]", card).forEach((b) => b.classList.toggle("is-active", b === btn));

    const apply = (sel, cfg, step) => {
      const el = $(sel, card);
      if (!el) return;
      el.min = cfg[0]; el.max = cfg[1]; el.step = step; el.value = cfg[2];
      const scale = el.parentElement.querySelector(".emi__scale");
      if (scale) {
        const isAmt = sel.indexOf("amount") > -1, isRate = sel.indexOf("rate") > -1;
        scale.children[0].textContent = isAmt ? "₹" + fmtScale(cfg[0]) : isRate ? cfg[0] + "%" : cfg[0] + " yr";
        scale.children[1].textContent = isAmt ? "₹" + fmtScale(cfg[1]) : isRate ? cfg[1] + "%" : cfg[1] + " yr";
      }
    };
    apply("[data-emi-amount]", p.amount, Math.max(1000, Math.round((p.amount[1] - p.amount[0]) / 200 / 1000) * 1000));
    apply("[data-emi-rate]", p.rate, 0.05);
    apply("[data-emi-tenure]", p.tenure, 1);
    $("[data-emi-amount]", card).dispatchEvent(new Event("input", { bubbles: true }));
  }));

  /* ---- v2: lender wall filter ---- */
  $$("[data-filter]").forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.getAttribute("data-filter");
    $$("[data-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
    $$("[data-lenderwall] .lender").forEach((tile) => {
      tile.classList.toggle("is-dim", f !== "all" && tile.getAttribute("data-cat") !== f);
    });
  }));

  /* ---- v2: testimonial carousel ---- */
  $$(".tslides").forEach((wrap) => {
    const box = wrap.closest(".qbox") || document;
    const slides = $$(".tslide", wrap);
    const dots = $$("[data-tdot]", box);
    if (slides.length < 2) return;
    let i = 0;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
    const prev = $("[data-tprev]", box), next = $("[data-tnext]", box);
    prev && prev.addEventListener("click", () => show(i - 1));
    next && next.addEventListener("click", () => show(i + 1));
    let timer = setInterval(() => show(i + 1), 6000);
    box.addEventListener("mouseenter", () => clearInterval(timer));
    box.addEventListener("mouseleave", () => { timer = setInterval(() => show(i + 1), 6000); });
  });

  /* ---- v2: credit-score gauge counts up when it scrolls into view ---- */
  $$("[data-gauge-num]").forEach((num) => {
    const target = +num.textContent || 780;
    const card = num.closest(".card") || document;
    const needle = $("[data-gauge-needle]", card);
    const arc = $("[data-gauge-arc]", card);
    const run = () => {
      const t0 = performance.now(), dur = 1400, from = 300;
      if (arc) arc.setAttribute("stroke-dashoffset", "251");
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (target - from) * eased);
        num.textContent = val;
        var frac = (val - 300) / 600;
        if (needle) needle.setAttribute("transform", "rotate(" + (-90 + frac * 180) + " 100 110)");
        if (arc) arc.setAttribute("stroke-dashoffset", String(Math.round(251 - 251 * frac)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    };
    if ("IntersectionObserver" in window) {
      const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(); o.disconnect(); } }), { threshold: 0.4 });
      o.observe(num);
    } else run();
  });

  /* ---- v2: header search + "all products" jump ---- */
  $$("[data-simplesearch]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = (f.querySelector("input").value || "").trim().toLowerCase();
    if (!q) return;
    const hit = $$(".upanel__grid a, .mega__col a, .footer__links a")
      .find((a) => a.textContent.toLowerCase().indexOf(q) > -1);
    window.location.href = hit ? hit.getAttribute("href") : "/loans.html";
  }));
  $$("[data-jump]").forEach((b) => b.addEventListener("click", () => {
    const sel = b.getAttribute("data-jump");
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.href = "/" + sel;
  }));

  /* ---- Theme toggle -------------------------------------------------------
     Order of precedence: explicit choice (localStorage) > system preference.
     The <head> script has already applied any stored choice before paint. */
  var KEY = "eloanss-theme";
  /* Light and Dark follow the OS when no explicit choice is stored.
     Navy is opt-in only: the OS never selects it. */
  var THEMES = ["light", "dark", "navy"];
  var LABEL = { light: "Light", dark: "Dark", navy: "Dark Navy" };
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function currentTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (THEMES.indexOf(set) > -1) return set;
    return systemPrefersDark() ? "dark" : "light";
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    var next = THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
    $$("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", "Theme: " + LABEL[t] + ". Switch to " + LABEL[next] + ".");
      b.setAttribute("title", LABEL[t] + " theme \u2014 tap for " + LABEL[next]);
      if (b.classList.contains("mnav__single")) b.textContent = "Theme: " + LABEL[t];
    });
  }
  $$("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = THEMES.indexOf(currentTheme());
      applyTheme(THEMES[(i + 1) % THEMES.length]);
    });
  });
  /* reflect the starting state in the labels */
  (function () {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (THEMES.indexOf(stored) > -1) applyTheme(stored);
    else {
      var t = currentTheme(), next = THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
      $$("[data-theme-toggle]").forEach(function (b) {
        b.setAttribute("aria-label", "Theme: " + LABEL[t] + ". Switch to " + LABEL[next] + ".");
        if (b.classList.contains("mnav__single")) b.textContent = "Theme: " + LABEL[t];
      });
    }
  })();
  /* keep following the OS while no explicit choice is stored */
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () {
      var stored = null;
      try { stored = localStorage.getItem(KEY); } catch (e) {}
      if (THEMES.indexOf(stored) === -1) document.documentElement.removeAttribute("data-theme");
    };
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
  }

  /* ---- Footer year ---- */
  $$("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());
})();
