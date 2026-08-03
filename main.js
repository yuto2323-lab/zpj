/* ============================================================
   Portfolio — Shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile drawer menu ---------- */
  function initMenu() {
    var menu = document.querySelector('[data-menu]');
    if (!menu) return;
    var openBtn = document.querySelector('[data-menu-open]');
    var closeBtn = menu.querySelector('[data-menu-close]');
    var backdrop = menu.querySelector('[data-menu-backdrop]');

    function open() {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    function onScroll() {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  /* ---------- Header shadow on scroll ---------- */
  function initHeaderShadow() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var triggers = document.querySelectorAll('[data-lightbox]');
    if (!triggers.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<button class="lightbox-close" aria-label="关闭" type="button">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<img class="lightbox-img" alt="">';
    document.body.appendChild(box);
    var img = box.querySelector('.lightbox-img');
    var closeBtn = box.querySelector('.lightbox-close');

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('open');
      document.body.style.overflow = '';
    }
    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var src = t.getAttribute('data-full') || t.src || t.getAttribute('src');
        open(src, t.alt);
      });
    });
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('open')) close();
    });
  }

  /* ---------- Popular pills (visual filter) ---------- */
  function initPills() {
    var pills = document.querySelectorAll('[data-pill]');
    if (!pills.length) return;
    pills.forEach(function (p) {
      p.addEventListener('click', function () {
        pills.forEach(function (x) { x.classList.remove('tc-popular-pill-active'); });
        p.classList.add('tc-popular-pill-active');
      });
    });
  }

  /* ---------- Init on DOM ready ---------- */
  function init() {
    initMenu();
    initReveal();
    initBackToTop();
    initHeaderShadow();
    initLightbox();
    initPills();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
