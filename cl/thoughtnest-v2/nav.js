/**
 * nav.js — Smart shared header & footer for ThoughtNest
 * Works correctly when opened via file:// locally (no web server needed)
 * AND when served from a web server.
 * Detection: checks if the URL path OR the filename pattern indicates
 * we are inside the blog/ subfolder.
 */
(function () {
  // Detect whether we're inside the blog/ subfolder
  var loc = window.location.href;
  var inBlog = loc.indexOf('/blog/') !== -1 || loc.indexOf('%2Fblog%2F') !== -1 ||
               loc.indexOf('\\blog\\') !== -1;
  var prefix = inBlog ? '../' : '';

  // ── HEADER ─────────────────────────────────────────────────────
  var NAV =
    '<header>' +
    '<div class="container"><div class="header-inner">' +
    '<div class="logo"><a href="' + prefix + 'index.html">Thought<span>Nest</span></a></div>' +
    '<nav>' +
    '<a href="' + prefix + 'index.html">Home</a>' +
    '<a href="' + prefix + 'blog-index.html">Blog</a>' +
    '<a href="' + prefix + 'about.html">About Us</a>' +
    '<a href="' + prefix + 'contact.html">Contact</a>' +
    '<a href="' + prefix + 'newsletter.html" class="nav-cta">Subscribe</a>' +
    '</nav>' +
    '<div class="hamburger" onclick="document.getElementById(\'mobnav\').classList.toggle(\'open\')">' +
    '<span></span><span></span><span></span></div>' +
    '</div></div>' +
    '<div class="mobile-nav" id="mobnav">' +
    '<a href="' + prefix + 'index.html">🏠 Home</a>' +
    '<a href="' + prefix + 'blog-index.html">📝 Blog</a>' +
    '<a href="' + prefix + 'about.html">ℹ️ About Us</a>' +
    '<a href="' + prefix + 'contact.html">📧 Contact Us</a>' +
    '<a href="' + prefix + 'newsletter.html">📬 Subscribe</a>' +
    '<a href="' + prefix + 'privacy.html">🔒 Privacy Policy</a>' +
    '<a href="' + prefix + 'disclaimer.html">⚖️ Disclaimer</a>' +
    '<a href="' + prefix + 'terms.html">📄 Terms of Use</a>' +
    '</div>' +
    '</header>';

  // ── FOOTER ─────────────────────────────────────────────────────
  var FOOT =
    '<footer>' +
    '<div class="container">' +
    '<div class="footer-grid">' +

    '<div class="footer-brand">' +
    '<a class="footer-logo" href="' + prefix + 'index.html">Thought<span>Nest</span></a>' +
    '<p>Where ideas find a home. Expert guides on technology, health, travel, finance &amp; lifestyle.</p>' +
    '<div class="social-row">' +
    '<a class="soc" href="https://twitter.com" target="_blank" rel="noopener" title="Twitter">𝕏</a>' +
    '<a class="soc" href="https://instagram.com" target="_blank" rel="noopener" title="Instagram">📸</a>' +
    '<a class="soc" href="https://youtube.com" target="_blank" rel="noopener" title="YouTube">▶</a>' +
    '<a class="soc" href="mailto:weareforyou959@gmail.com" title="Email">✉</a>' +
    '</div></div>' +

    '<div class="footer-col"><h5>Categories</h5><ul>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=technology">💻 Technology</a></li>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=health">🌿 Health &amp; Wellness</a></li>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=travel">✈️ Travel</a></li>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=finance">💰 Personal Finance</a></li>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=lifestyle">🏡 Lifestyle</a></li>' +
    '<li><a href="' + prefix + 'blog-index.html?cat=digital">📱 Digital Marketing</a></li>' +
    '</ul></div>' +

    '<div class="footer-col"><h5>Company</h5><ul>' +
    '<li><a href="' + prefix + 'about.html">About Us</a></li>' +
    '<li><a href="' + prefix + 'contact.html">Contact Us</a></li>' +
    '<li><a href="' + prefix + 'newsletter.html">Newsletter</a></li>' +
    '<li><a href="' + prefix + 'write-for-us.html">Write for Us</a></li>' +
    '<li><a href="' + prefix + 'advertise.html">Advertise</a></li>' +
    '</ul></div>' +

    '<div class="footer-col"><h5>Legal</h5><ul>' +
    '<li><a href="' + prefix + 'privacy.html">Privacy Policy</a></li>' +
    '<li><a href="' + prefix + 'disclaimer.html">Disclaimer</a></li>' +
    '<li><a href="' + prefix + 'terms.html">Terms of Use</a></li>' +
    '<li><a href="' + prefix + 'cookie.html">Cookie Policy</a></li>' +
    '<li><a href="' + prefix + 'dmca.html">DMCA Policy</a></li>' +
    '</ul></div>' +

    '</div>' +
    '<div class="footer-bottom">' +
    '<p>© 2025 ThoughtNest. All rights reserved. | ' +
    '<a href="mailto:weareforyou959@gmail.com" style="color:var(--accent)">weareforyou959@gmail.com</a></p>' +
    '<div class="footer-links">' +
    '<a href="' + prefix + 'privacy.html">Privacy</a>' +
    '<a href="' + prefix + 'disclaimer.html">Disclaimer</a>' +
    '<a href="' + prefix + 'terms.html">Terms</a>' +
    '<a href="' + prefix + 'contact.html">Contact</a>' +
    '</div></div>' +
    '</div></footer>';

  // ── Inject ──────────────────────────────────────────────────────
  var navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV;
  var footEl = document.getElementById('footer-placeholder');
  if (footEl) footEl.outerHTML = FOOT;

  // ── Mark active nav link ────────────────────────────────────────
  setTimeout(function () {
    var file = loc.split('/').pop().split('\\').pop().split('?')[0] || 'index.html';
    document.querySelectorAll('header nav a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop().split('?')[0];
      if (href && href === file) a.classList.add('active');
    });
  }, 0);
})();

// ── Newsletter subscribe ─────────────────────────────────────────
function subscribe(inputId) {
  var el = document.getElementById(inputId);
  if (!el || !el.value.trim() || !el.value.includes('@')) {
    showToast('Please enter a valid email address.', '#c0392b');
    return;
  }
  showToast('✅ Subscribed! Welcome to ThoughtNest.', '#27ae60');
  el.value = '';
}

function showToast(msg, bg) {
  var t = document.getElementById('tn-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'tn-toast';
    t.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(120px);' +
      'padding:13px 28px;border-radius:30px;font-size:.9rem;font-weight:500;' +
      'transition:transform .35s;z-index:9999;color:#fff;white-space:nowrap;' +
      'box-shadow:0 4px 20px rgba(0,0,0,.3);font-family:sans-serif';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = bg || '#1a1714';
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(function () { t.style.transform = 'translateX(-50%) translateY(120px)'; }, 3500);
}

// ── Category filter ──────────────────────────────────────────────
function filterCards(cat, btn) {
  document.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.filterable').forEach(function (card) {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}
