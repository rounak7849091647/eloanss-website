(function () {
"use strict";
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const header = $(".header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
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
const mnav = $(".mnav");
const openMnav = () => { if (mnav) { mnav.classList.add("is-open"); document.body.style.overflow = "hidden"; } };
const closeMnav = () => { if (mnav) { mnav.classList.remove("is-open"); document.body.style.overflow = ""; } };
$(".nav__toggle") && $(".nav__toggle").addEventListener("click", openMnav);
$(".mnav__close") && $(".mnav__close").addEventListener("click", closeMnav);
$(".mnav__scrim") && $(".mnav__scrim").addEventListener("click", closeMnav);
$$(".mnav__gbtn").forEach((b) => b.addEventListener("click", () => b.closest(".mnav__group").classList.toggle("is-open")));
$$(".faq__q").forEach((q) => q.addEventListener("click", () => {
const item = q.closest(".faq__item");
const a = $(".faq__a", item);
const open = item.classList.toggle("is-open");
a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
}));
const io = "IntersectionObserver" in window
? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 })
: null;
$$(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
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
$$("[data-simpleform]").forEach((form) => {
form.addEventListener("submit", (e) => {
e.preventDefault();
const ok = $(".form-ok", form);
if (ok) { $$(".field, .field-row, [data-formbody]", form).forEach((n) => n.hidden = true); const btn = $("button[type=submit]", form); if (btn) btn.hidden = true; ok.hidden = false; }
});
});
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
$$("[data-ctab]").forEach((btn) => btn.addEventListener("click", () => {
$$("[data-ctab]").forEach((b) => b.classList.toggle("is-active", b === btn));
}));
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
$$("[data-filter]").forEach((btn) => btn.addEventListener("click", () => {
const f = btn.getAttribute("data-filter");
$$("[data-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
$$("[data-lenderwall] .lender").forEach((tile) => {
tile.classList.toggle("is-dim", f !== "all" && tile.getAttribute("data-cat") !== f);
});
}));
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
if (window.matchMedia) {
var mq = window.matchMedia("(prefers-color-scheme: dark)");
var onChange = function () {
var stored = null;
try { stored = localStorage.getItem(KEY); } catch (e) {}
if (THEMES.indexOf(stored) === -1) document.documentElement.removeAttribute("data-theme");
};
mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
}
/* ---- Cookie consent (DPDP) ----------------------------------------------
The site sets no analytics or advertising cookies today, so this records
the visitor's choice rather than gating anything that currently exists.
Accept and Reject are given equal prominence; no option is pre-selected. */
var CK = "eloanss-cookie-consent";
var bar = $("[data-cookiebar]");
if (bar) {
var stored = null;
try { stored = localStorage.getItem(CK); } catch (e) {}
if (stored !== "accepted" && stored !== "rejected") {
setTimeout(function () { bar.hidden = false; bar.classList.add("is-in"); }, 900);
}
document.addEventListener("keydown", function (e) {
if (e.key === "Escape" && !bar.hidden) { try { localStorage.setItem(CK, "rejected"); } catch (e2) {}
bar.classList.remove("is-in"); setTimeout(function () { bar.hidden = true; }, 260); }
});
$$("[data-cookie]", bar).forEach(function (b) {
b.addEventListener("click", function () {
try { localStorage.setItem(CK, b.getAttribute("data-cookie") === "accept" ? "accepted" : "rejected"); } catch (e) {}
bar.classList.remove("is-in");
setTimeout(function () { bar.hidden = true; }, 260);
});
});
}
/* ---- Keyboard support for the desktop mega-menus -------------------------
They opened on hover and on click, which left them unreachable by keyboard
and impossible to dismiss without a mouse. */
$$(".pnav__item--has-menu").forEach(function (item) {
var link = $(".pnav__link", item);
var open = function () { item.classList.add("is-open"); if (link) link.setAttribute("aria-expanded", "true"); };
var shut = function () { item.classList.remove("is-open"); if (link) link.setAttribute("aria-expanded", "false"); };
if (link) {
link.setAttribute("aria-expanded", "false");
link.setAttribute("aria-haspopup", "true");
link.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.classList.contains("is-open") ? shut() : open(); }
});
}
item.addEventListener("focusin", open);
item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) shut(); });
item.addEventListener("keydown", function (e) {
if (e.key === "Escape") { shut(); if (link) link.focus(); }
});
});
document.addEventListener("keydown", function (e) {
if (e.key !== "Escape") return;
var m = $(".mnav");
if (m && m.classList.contains("is-open")) { m.classList.remove("is-open"); document.body.style.overflow = ""; }
});
document.addEventListener("pointerdown", function (e) {
var b = e.target.closest(".btn");
if (!b || b.classList.contains("no-ripple")) return;
var r = b.getBoundingClientRect();
var s = document.createElement("span");
s.className = "ripple";
var size = Math.max(r.width, r.height);
s.style.width = s.style.height = size + "px";
s.style.left = (e.clientX - r.left - size / 2) + "px";
s.style.top = (e.clientY - r.top - size / 2) + "px";
b.appendChild(s);
setTimeout(function () { s.remove(); }, 600);
});
/* ---- EMI fee breakdown ---------------------------------------------------
Indicative only, and labelled as such: processing fee and GST are the
lender's, not ours, and foreclosure terms vary by lender. */
$$("[data-fees]").forEach(function (box) {
var root = box.closest("[data-emi]") || document;
var amt = $("[data-emi-amount]", root);
var out = $("[data-fee-list]", box);
if (!amt || !out) return;
var render = function () {
var P = +amt.value;
var pf = Math.round(P * 0.01);          // 1% typical processing fee
var gst = Math.round(pf * 0.18);        // 18% GST on the fee
out.innerHTML =
'<div class="r"><span>Processing fee (approx. 1%)</span><b>' + inr(pf) + "</b></div>" +
'<div class="r"><span>GST on fee (18%)</span><b>' + inr(gst) + "</b></div>" +
'<div class="r"><span>Upfront cost (approx.)</span><b>' + inr(pf + gst) + "</b></div>" +
'<div class="r"><span>Foreclosure charge</span><b>Varies by lender</b></div>';
};
amt.addEventListener("input", render);
render();
var t = $("[data-fee-toggle]", box);
if (t) t.addEventListener("click", function () {
var open = box.classList.toggle("is-open");
t.setAttribute("aria-expanded", open ? "true" : "false");
});
});
/* ---- Exit intent --------------------------------------------------------
Fires once per visitor, on genuine exit intent only, and never on touch
devices where the pointer never leaves the viewport. */
var EX = "eloanss-exit-shown";
var exit = $("[data-exitmodal]");
if (exit && !window.matchMedia("(pointer: coarse)").matches) {
var seen = false;
try { seen = localStorage.getItem(EX) === "1"; } catch (e) {}
var showExit = function (e) {
if (seen || e.clientY > 0) return;
seen = true;
try { localStorage.setItem(EX, "1"); } catch (e2) {}
exit.hidden = false;
requestAnimationFrame(function () { exit.classList.add("is-in"); });
var f = exit.querySelector("button, a, input");
if (f) f.focus();
};
document.addEventListener("mouseout", function (e) { if (!e.relatedTarget) showExit(e); });
var closeExit = function () { exit.classList.remove("is-in"); setTimeout(function () { exit.hidden = true; }, 260); };
$$("[data-exit-close]", exit).forEach(function (b) { b.addEventListener("click", closeExit); });
exit.addEventListener("click", function (e) { if (e.target === exit) closeExit(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !exit.hidden) closeExit(); });
}
/* ---- Loan Matcher --------------------------------------------------------
Scores every product profile against the answers. Purpose, amount and
security each count 2; speed counts 1 as a tie-breaker. */
var MATCH_PROFILES = window.__ELOANSS_MATCH || null;
$$("[data-matcher]").forEach(function (root) {
var steps = $$(".mq", root);
var bar = $("[data-mq-progress]", root);
var result = $("[data-mq-result]", root);
var cards = $("[data-mq-cards]", root);
var back = $("[data-mq-back]", root);
var answers = {};
var i = 0;
function show(n) {
i = n;
steps.forEach(function (s, k) { s.classList.toggle("is-active", k === n); });
if (bar) bar.style.width = ((n + 1) / steps.length) * 100 + "%";
if (back) back.hidden = n === 0;
result.hidden = true;
$(".matcher__steps", root).hidden = false;
}
function finish() {
var profiles = MATCH_PROFILES || {};
var scored = Object.keys(profiles).map(function (slug) {
var p = profiles[slug], s = 0;
if (p.purpose.indexOf(answers.purpose) > -1) s += 2;
if (p.amount.indexOf(answers.amount) > -1) s += 2;
if (p.security.indexOf(answers.security) > -1) s += 2;
if (p.speed.indexOf(answers.speed) > -1) s += 1;
return { slug: slug, score: s, meta: p };
}).sort(function (a, b) { return b.score - a.score; });
var top = scored.slice(0, 3).filter(function (x) { return x.score > 0; });
if (!top.length) top = scored.slice(0, 3);
cards.innerHTML = top.map(function (x, k) {
var m = (window.__ELOANSS_LOANS || {})[x.slug] || {};
return '<a class="mcard" href="/loans/' + x.slug + '.html">' +
'<span class="mcard__rank">' + (k + 1) + "</span>" +
"<div><b>" + (m.name || x.slug) + "</b>" +
'<span class="mcard__meta">' + (m.rate || "") + (m.amount ? " · " + m.amount : "") + "</span></div>" +
'<span class="mcard__go">View</span></a>';
}).join("");
$(".matcher__steps", root).hidden = true;
if (bar) bar.style.width = "100%";
if (back) back.hidden = true;
result.hidden = false;
result.focus && result.focus();
}
$$(".mopt", root).forEach(function (btn) {
btn.addEventListener("click", function () {
answers[btn.getAttribute("data-mq-key")] = btn.getAttribute("data-mq-val");
$$(".mopt", steps[i]).forEach(function (b) { b.classList.toggle("is-on", b === btn); });
setTimeout(function () { i < steps.length - 1 ? show(i + 1) : finish(); }, 160);
});
});
if (back) back.addEventListener("click", function () { if (i > 0) show(i - 1); });
var again = $("[data-mq-restart]", root);
if (again) again.addEventListener("click", function () { answers = {}; $$(".mopt", root).forEach(function (b) { b.classList.remove("is-on"); }); show(0); });
});
(function () {
var tray = $("[data-cmptray]");
if (!tray) return;
var modal = $("[data-cmpmodal]");
var chips = $("[data-cmp-chips]");
var count = $("[data-cmp-count]");
var MAX = 3;
var picked = [];
function itemOf(slug) { return $('[data-cmp-item="' + slug + '"]'); }
function render() {
count.textContent = picked.length;
chips.innerHTML = picked.map(function (s) {
var el = itemOf(s);
return '<span class="cmpchip">' + el.getAttribute("data-cmp-name") +
'<button type="button" data-cmp-drop="' + s + '" aria-label="Remove">&times;</button></span>';
}).join("");
tray.hidden = picked.length === 0;
tray.classList.toggle("is-in", picked.length > 0);
$$("[data-cmp-toggle]").forEach(function (cb) {
var slug = cb.closest("[data-cmp-item]").getAttribute("data-cmp-item");
cb.disabled = picked.length >= MAX && picked.indexOf(slug) === -1;
});
$$("[data-cmp-drop]", chips).forEach(function (b) {
b.addEventListener("click", function () { toggle(b.getAttribute("data-cmp-drop"), false); });
});
}
function toggle(slug, on) {
var k = picked.indexOf(slug);
if (on && k === -1) { if (picked.length >= MAX) return; picked.push(slug); }
if (!on && k > -1) picked.splice(k, 1);
var cb = $("[data-cmp-toggle]", itemOf(slug));
if (cb) cb.checked = on;
render();
}
$$("[data-cmp-toggle]").forEach(function (cb) {
cb.addEventListener("change", function () {
toggle(cb.closest("[data-cmp-item]").getAttribute("data-cmp-item"), cb.checked);
});
});
var clear = $("[data-cmp-clear]");
if (clear) clear.addEventListener("click", function () { picked.slice().forEach(function (s) { toggle(s, false); }); });
var open = $("[data-cmp-open]");
if (open) open.addEventListener("click", function () {
var rows = [["", "Interest rate", "Loan amount", "Tenure"]];
var head = '<tr><th scope="col">Product</th>' + picked.map(function (s) {
return "<th scope=\"col\">" + itemOf(s).getAttribute("data-cmp-name") + "</th>";
}).join("") + "</tr>";
var body = [["Interest rate", "rate"], ["Loan amount", "amount"], ["Tenure", "tenure"]].map(function (r) {
return "<tr><th scope=\"row\">" + r[0] + "</th>" + picked.map(function (s) {
return "<td>" + itemOf(s).getAttribute("data-cmp-" + r[1]) + "</td>";
}).join("") + "</tr>";
}).join("");
var links = "<tr><th scope=\"row\"></th>" + picked.map(function (s) {
return '<td><a class="btn btn--blue btn--sm" href="/loans/' + s + '.html">Details</a></td>';
}).join("") + "</tr>";
$("[data-cmp-table]").innerHTML = "<table class=\"cmptable\"><thead>" + head + "</thead><tbody>" + body + links + "</tbody></table>";
modal.hidden = false;
requestAnimationFrame(function () { modal.classList.add("is-in"); });
});
function shut() { modal.classList.remove("is-in"); setTimeout(function () { modal.hidden = true; }, 240); }
$$("[data-cmp-close]").forEach(function (b) { b.addEventListener("click", shut); });
if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) shut(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal && !modal.hidden) shut(); });
render();
})();
$$("[data-trackform]").forEach(function (form) {
form.addEventListener("submit", function (e) {
e.preventDefault();
var ref = form.querySelector("input").value.trim().toUpperCase();
var panel = $("[data-trk]");
var empty = $("[data-trk-empty]");
if (!/^ELN-\d{4}-\d{4,6}$/.test(ref)) {
form.querySelector("input").setCustomValidity("Use the format ELN-YYYY-NNNNNN");
form.querySelector("input").reportValidity();
return;
}
form.querySelector("input").setCustomValidity("");
/* deterministic sample stage from the reference, so the same input always
shows the same thing rather than a different answer each time */
var n = ref.split("-")[2].split("").reduce(function (a, c) { return a + +c; }, 0);
var stage = n % 5;
$("[data-trk-ref]").textContent = ref;
var labels = ["Received", "Under review", "With lender", "Sanctioned", "Disbursed"];
$("[data-trk-status]").textContent = labels[stage];
$$("[data-trk-step]").forEach(function (s, k) {
s.classList.toggle("is-done", k < stage);
s.classList.toggle("is-now", k === stage);
});
panel.hidden = false;
if (empty) empty.hidden = true;
panel.scrollIntoView({ behavior: "smooth", block: "center" });
});
});
/* ---- Trust ticker --------------------------------------------------------
Rotates published aggregate figures. Deliberately not individual
"someone just got approved" claims. */
(function () {
var t = $("[data-ticker]");
if (!t) return;
var line = $("[data-ticker-text]", t);
var msgs = window.__ELOANSS_TRUST || [];
if (!msgs.length) return;
var k = 0, dismissed = false;
$("[data-ticker-close]", t).addEventListener("click", function () {
dismissed = true; t.classList.remove("is-in"); setTimeout(function () { t.hidden = true; }, 260);
});
function cycle() {
if (dismissed) return;
line.textContent = msgs[k % msgs.length];
k++;
t.hidden = false;
requestAnimationFrame(function () { t.classList.add("is-in"); });
setTimeout(function () {
if (dismissed) return;
t.classList.remove("is-in");
setTimeout(cycle, 700);
}, 5200);
}
setTimeout(cycle, 4200);
})();
/* ---- Skeletons -----------------------------------------------------------
Applied where there is genuine latency: remote images and the map iframe.
Not applied to the EMI calculator, which is instant local arithmetic. */
$$("img[loading='lazy']").forEach(function (img) {
if (img.complete && img.naturalWidth > 0) return;
img.classList.add("is-loading");
var done = function () { img.classList.remove("is-loading"); };
img.addEventListener("load", done);
img.addEventListener("error", done);
});
$$("iframe.map").forEach(function (f) {
var w = document.createElement("div");
w.className = "mapwrap is-loading";
f.parentNode.insertBefore(w, f);
w.appendChild(f);
f.addEventListener("load", function () { w.classList.remove("is-loading"); });
});
$$("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());
})();