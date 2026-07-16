/* Ambient swarm: teal agents drift with mild cohesion; amber shepherds nudge them.
   Quiet by design. Respects reduced motion and pauses when the tab is hidden. */
(function () {
  var canvas = document.getElementById('swarm');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, dpr, agents = [], shepherds = [], raf = null;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    var n = Math.max(28, Math.min(70, Math.floor(W / 22)));
    agents = [];
    for (var i = 0; i < n; i++) {
      agents.push({ x: rand(0, W), y: rand(0, H), vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25) });
    }
    shepherds = [
      { x: W * 0.28, y: H * 0.45, a: Math.random() * 6.28 },
      { x: W * 0.62, y: H * 0.62, a: Math.random() * 6.28 }
    ];
  }

  function step() {
    ctx.clearRect(0, 0, W, H);
    for (var s = 0; s < shepherds.length; s++) {
      var sh = shepherds[s];
      sh.a += 0.0016 + s * 0.0006;
      sh.x += Math.cos(sh.a) * 0.35;
      sh.y += Math.sin(sh.a * 1.3) * 0.28;
      if (sh.x < 0) sh.x = W; if (sh.x > W) sh.x = 0;
      if (sh.y < 0) sh.y = H; if (sh.y > H) sh.y = 0;
    }
    for (var i = 0; i < agents.length; i++) {
      var p = agents[i], best = shepherds[0], bd = 1e9;
      for (var s2 = 0; s2 < shepherds.length; s2++) {
        var dx0 = shepherds[s2].x - p.x, dy0 = shepherds[s2].y - p.y;
        var d0 = dx0 * dx0 + dy0 * dy0;
        if (d0 < bd) { bd = d0; best = shepherds[s2]; }
      }
      p.vx += (best.x - p.x) * 0.00018 + rand(-0.03, 0.03);
      p.vy += (best.y - p.y) * 0.00018 + rand(-0.03, 0.03);
      var sp = Math.hypot(p.vx, p.vy), max = 0.55;
      if (sp > max) { p.vx *= max / sp; p.vy *= max / sp; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
    }
    ctx.lineWidth = 1;
    for (var a = 0; a < agents.length; a++) {
      for (var b = a + 1; b < agents.length; b++) {
        var dx = agents[a].x - agents[b].x, dy = agents[a].y - agents[b].y;
        var d = Math.hypot(dx, dy);
        if (d < 96) {
          ctx.strokeStyle = 'rgba(110,200,215,' + (0.10 * (1 - d / 96)).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(agents[a].x, agents[a].y); ctx.lineTo(agents[b].x, agents[b].y); ctx.stroke();
        }
      }
    }
    for (var k = 0; k < agents.length; k++) {
      ctx.fillStyle = 'rgba(120,205,220,0.85)';
      ctx.beginPath(); ctx.arc(agents[k].x, agents[k].y, 2.1, 0, 6.2832); ctx.fill();
    }
    for (var m = 0; m < shepherds.length; m++) {
      var g = shepherds[m];
      ctx.fillStyle = 'rgba(224,153,47,0.18)';
      ctx.beginPath(); ctx.arc(g.x, g.y, 13, 0, 6.2832); ctx.fill();
      ctx.fillStyle = 'rgba(232,166,68,0.95)';
      ctx.beginPath(); ctx.arc(g.x, g.y, 3.4, 0, 6.2832); ctx.fill();
    }
    raf = requestAnimationFrame(step);
  }

  function start() { if (!raf) raf = requestAnimationFrame(step); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  function init() {
    resize(); seed();
    if (reduce) { step(); stop(); return; }
    start();
  }
  window.addEventListener('resize', function () { resize(); seed(); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : (reduce ? null : start()); });
  init();
})();
