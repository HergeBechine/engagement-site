/* ============================================================
   订婚喜宴邀请站 · 交互脚本
   ★ 修改姓名 / 日期：只需改下面的 CONFIG 即可，全站自动更新
   ============================================================ */

const CONFIG = {
  groom: "待定",              // ← 新郎姓名
  bride: "待定",              // ← 新娘姓名
  dateLabel: "喜宴日期 · 待定", // ← 公历日期（封面 + 吉日卡片）
  dateLunar: "农历待定",       // ← 农历日期（盟书 + 吉日卡片）
  coupleLine: "待定 & 待定"    // ← 页脚显示的名字
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

/* ---------- 祝福留言（保存在本机 localStorage） ---------- */
const wishForm = document.getElementById("wishForm");
const wishName = document.getElementById("wishName");
const wishText = document.getElementById("wishText");
const wishList = document.getElementById("wishList");
const STORE_KEY = "engagement_wishes_v1";

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function renderWish(w) {
  const li = document.createElement("li");
  li.className = "wish-item";
  const who = escapeHtml(w.name || "匿名");
  const txt = escapeHtml(w.text);
  const time = escapeHtml(w.time || "");
  li.innerHTML = `<span class="wish-time">${time}</span><span class="wish-who">${who}：</span>${txt}`;
  return li;
}

function loadWishes() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { list = []; }
  wishList.innerHTML = "";
  if (!list.length) {
    const li = document.createElement("li");
    li.className = "wish-empty";
    li.textContent = "还没有祝福，来写下第一条吧～";
    wishList.appendChild(li);
    return;
  }
  list.forEach(w => wishList.appendChild(renderWish(w)));
}

wishForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = wishName.value.trim();
  const text = wishText.value.trim();
  if (!text) return;
  let list = [];
  try { list = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (err) { list = []; }
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  list.unshift({
    name,
    text,
    time: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
  });
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, 50))); } catch (err) {}
  wishForm.reset();
  loadWishes();
  burstHearts(wishForm);
});

/* 送出祝福时的心形迸发 */
function burstHearts(anchor) {
  const r = anchor.getBoundingClientRect();
  const glyphs = ["♥", "♡", "❤"];
  for (let i = 0; i < 10; i++) {
    const h = document.createElement("span");
    h.textContent = glyphs[i % 3];
    h.style.cssText =
      `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;` +
      `font-size:${12 + Math.random() * 14}px;color:#c9412f;pointer-events:none;z-index:999;` +
      `transform:translate(-50%,-50%);opacity:1;` +
      `transition:all ${(1 + Math.random() * 0.8).toFixed(2)}s cubic-bezier(.22,.61,.36,1);`;
    document.body.appendChild(h);
    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${(Math.random() * 160 - 80).toFixed(0)}px, ${(-60 - Math.random() * 120).toFixed(0)}px) ` +
        `rotate(${(Math.random() * 180 - 90).toFixed(0)}deg)`;
      h.style.opacity = "0";
    });
    setTimeout(() => h.remove(), 2400);
  }
}

loadWishes();
