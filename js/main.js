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
