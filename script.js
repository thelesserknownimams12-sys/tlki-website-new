(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }
  function closeMenu() {
    if (!hamburger) return;
    hamburger.classList.remove('active');
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', closeMenu); });
  }

  var navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    var nav = document.querySelector('.nav');
    var navH = nav ? nav.offsetHeight : 60;
    var scrollPos = window.scrollY + navH + 20;
    document.querySelectorAll('section[id]').forEach(function (sec) {
      var top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + h) {
        navLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + id); });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  var navbar = document.querySelector('.nav');
  function updateNavBg() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateNavBg, { passive: true });
  updateNavBg();

  var fadeEls = document.querySelectorAll('.about, .imams, .campaigns, .hub, .events, .verse, .saqalain, .about-card, .campaign-card, .event-row, .hub-card, .imam-pill, .contribute-card, .hadith-card-sec, .imam-section, .imam-page-title, .imam-page-subtitle, .contact-form, .imam-quote, .imam-arabic, .majalis-card, .majalis-detail');
  fadeEls.forEach(function (el) { el.classList.add('fade-in'); });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(function (el) { obs.observe(el); });

  setTimeout(function () {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
  }, 3000);

  document.querySelectorAll('.progress-fill').forEach(function (bar) {
    var w = bar.style.width; bar.style.width = '0';
    var bObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = w; }); }); bObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    bObs.observe(bar);
  });

  var rTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () { if (window.innerWidth > 768) closeMenu(); }, 150);
  });
})();