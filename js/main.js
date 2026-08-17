/* ============================================================
   订婚喜宴邀请站 · 交互脚本
   ★ 修改姓名 / 日期：只需改下面的 CONFIG 即可，全站自动更新
   ============================================================ */

const CONFIG = {
  groom: "彭锦豪",            // ← 新郎姓名
  bride: "张鑫雨",            // ← 新娘姓名
  dateLabel: "阳历九月十二日", // ← 公历日期（封面 + 吉日卡片）
  dateLunar: "农历八月初二",   // ← 农历日期（盟书 + 吉日卡片）
  coupleLine: "彭锦豪 & 张鑫雨" // ← 页脚显示的名字
};

/* ---------- 填充占位文字 ---------- */
document.querySelectorAll("[data-field]").forEach(el => {
  const key = el.dataset.field;
  if (CONFIG[key] != null) el.textContent = CONFIG[key];
});

/* ---------- 预加载 ---------- */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("done"), 700);
});
setTimeout(() => document.getElementById("preloader").classList.add("done"), 3800); // 兜底

/* ---------- 导航栏 / 返回顶部 / 当前区块高亮 ---------- */
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 600);
  let current = sections[0];
  sections.forEach(s => { if (y >= s.offsetTop - 180) current = s; });
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));
}, { passive: true });

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 滚动显现动画 ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

/* ---------- 标题逐字动画 ---------- */
document.querySelectorAll(".split").forEach(el => {
  const text = el.textContent.trim();
  el.textContent = "";
  [...text].forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "ch";
    s.style.setProperty("--i", i);
    s.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(s);
  });
});

/* ---------- 封面飘落花瓣 ---------- */
(function petals() {
  const hero = document.getElementById("hero");
  const count = window.innerWidth < 720 ? 12 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = (Math.random() * 100).toFixed(2) + "%";
    p.style.setProperty("--size", (7 + Math.random() * 9).toFixed(1) + "px");
    p.style.setProperty("--dur", (10 + Math.random() * 10).toFixed(1) + "s");
    p.style.setProperty("--delay", (-Math.random() * 20).toFixed(1) + "s");
    p.style.setProperty("--drift", (Math.random() * 160 - 80).toFixed(0) + "px");
    p.style.setProperty("--rot", (300 + Math.random() * 500).toFixed(0) + "deg");
    p.style.setProperty("--o", (0.25 + Math.random() * 0.4).toFixed(2));
    hero.appendChild(p);
  }
})();
