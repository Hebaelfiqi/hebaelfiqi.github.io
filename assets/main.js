(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Research page: swipeable paper carousel + sub-nav scrollspy (progressive enhancement) */
(function () {
  var track = document.getElementById('papers');
  var wrap = document.getElementById('papers-carousel');
  var tabBar = document.querySelector('.paper-tabs');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.paper-tab'));

  if (track && wrap && tabs.length) {
    var cards = Array.prototype.slice.call(track.querySelectorAll('.result-card'));
    var prev = wrap.querySelector('.car-arrow.prev');
    var next = wrap.querySelector('.car-arrow.next');

    /* dots */
    var dotWrap = document.createElement('div');
    dotWrap.className = 'car-dots';
    var dots = cards.map(function (c, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'car-dot';
      d.setAttribute('aria-label', 'Go to paper ' + (i + 1) + ' of ' + cards.length);
      d.addEventListener('click', function () { go(i, true); });
      dotWrap.appendChild(d);
      return d;
    });
    wrap.appendChild(dotWrap);

    var current = 0;
    function setActive(i, updateHash) {
      current = i;
      tabs.forEach(function (t, k) {
        t.setAttribute('aria-selected', k === i ? 'true' : 'false');
        t.setAttribute('tabindex', k === i ? '0' : '-1');
      });
      dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === cards.length - 1;
      if (updateHash && history.replaceState) {
        history.replaceState(null, '', '#' + cards[i].id);
      }
    }
    function go(i, updateHash) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cards[i].offsetLeft, behavior: 'smooth' });
      setActive(i, updateHash);
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { go(i, true); });
      t.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight') j = i + 1;
        if (e.key === 'ArrowLeft') j = i - 1;
        if (j !== null && j >= 0 && j < cards.length) {
          e.preventDefault();
          go(j, true);
          tabs[j].focus();
        }
      });
    });
    if (prev) prev.addEventListener('click', function () { go(current - 1, true); });
    if (next) next.addEventListener('click', function () { go(current + 1, true); });

    /* keep tabs/dots in sync while the user swipes or drags */
    var settle;
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var x = track.scrollLeft, best = 0, bd = Infinity;
        cards.forEach(function (c, i) {
          var d = Math.abs(c.offsetLeft - x);
          if (d < bd) { bd = d; best = i; }
        });
        if (best !== current) setActive(best, true);
      }, 90);
    }, { passive: true });

    function fromHash(smooth) {
      var id = location.hash.replace('#', '');
      var i = cards.findIndex(function (c) { return c.id === id; });
      if (i < 0) return false;
      track.scrollTo({ left: cards[i].offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
      setActive(i, false);
      return true;
    }

    tabBar.classList.add('ready');
    wrap.classList.add('ready');
    if (!fromHash(false)) setActive(0, false);
    window.addEventListener('hashchange', function () {
      if (fromHash(true)) {
        document.getElementById('selected-results')
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* Scrollspy for the on-page sub-nav */
  var subLinks = Array.prototype.slice.call(document.querySelectorAll('.subnav a'));
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var cur = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (cur) cur.classList.remove('active');
          cur = map[en.target.id];
          if (cur) cur.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
})();
