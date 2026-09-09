/* =============================================================
   陶文洋 · 个人求职网站 — 交互脚本 (main.js)
   功能：① 中/英 语言切换（记忆偏好） ② 移动端导航菜单 ③ 项目页筛选
   说明：本文件只负责交互，不影响内容编辑；要改文字请改各页面的 HTML。
   ============================================================= */

/* ---------- ① 中 / 英 语言切换 ---------- */
(function () {
  var toggle = document.getElementById('langToggle');
  var root = document.documentElement;

  // 读取上次偏好
  var saved = localStorage.getItem('site-lang');
  if (saved === 'en') { root.setAttribute('lang', 'en'); if (toggle) toggle.setAttribute('aria-pressed', 'true'); }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isEn = root.getAttribute('lang') === 'en';
      if (isEn) {
        root.setAttribute('lang', 'zh');
        toggle.setAttribute('aria-pressed', 'false');
        localStorage.setItem('site-lang', 'zh');
      } else {
        root.setAttribute('lang', 'en');
        toggle.setAttribute('aria-pressed', 'true');
        localStorage.setItem('site-lang', 'en');
      }
    });
  }
})();

/* ---------- ② 移动端导航菜单 ---------- */
(function () {
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // 点击链接后自动收起
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }
})();

/* ---------- ③ 项目页筛选 ---------- */
(function () {
  var tabs = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.project-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var cat = tab.getAttribute('data-filter');
      cards.forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-category') === cat;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();

/* ---------- ④ 点击涟漪 (ripple) ---------- */
(function () {
  var hosts = document.querySelectorAll('.btn, .nav-link, .lang-toggle, .filter-tab');
  hosts.forEach(function (el) {
    el.classList.add('ripple-host');
    el.addEventListener('pointerdown', function (e) {
      var rect = el.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      // 导航/语言键用珊瑚色涟漪，按钮用白色涟漪
      ripple.style.background = (el.classList.contains('nav-link') || el.classList.contains('lang-toggle'))
        ? 'rgba(238,130,102,0.35)' : 'rgba(255,255,255,0.6)';
      el.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });
})();

/* ---------- ⑤ Hero 形象：鼠标跟随倾斜（动态感） ---------- */
(function () {
  var portrait = document.querySelector('.hero-portrait');
  var tilt = document.querySelector('.hero-photo-tilt');
  if (!portrait || !tilt) return;
  portrait.addEventListener('mousemove', function (e) {
    var r = portrait.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
    var py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.setProperty('--ry', (px * 12).toFixed(2) + 'deg');
    tilt.style.setProperty('--rx', (-py * 12).toFixed(2) + 'deg');
  });
  portrait.addEventListener('mouseleave', function () {
    tilt.style.setProperty('--ry', '0deg');
    tilt.style.setProperty('--rx', '0deg');
  });
})();

/* ---------- ⑥ 生活页兴趣卡：悬停打招呼气泡 ---------- */
(function () {
  var cards = document.querySelectorAll('.hobby-card');
  if (!cards.length) return;
  var greetings = ['⚽ 一起踢球！', '🏀 投个三分！', '🎾 上场啦！', '🛹 冲就完事！'];
  cards.forEach(function (card, i) {
    var b = document.createElement('span');
    b.className = 'hobby-bubble';
    b.textContent = greetings[i % greetings.length];
    card.appendChild(b);
  });
})();

