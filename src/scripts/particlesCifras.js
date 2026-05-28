(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const canvases = Array.from(document.querySelectorAll(".kpi-tech-canvas"));
  if (!canvases.length) return;

  const BLUE = "rgba(25, 151, 240, 0.45)";
  const WHITE = "rgba(255, 255, 255, 0.30)";

  function setupCanvas(canvas) {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return null;

    // Ajuste a tamaño real + DPR
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: rect.width, h: rect.height };
    }

    let size = resize();

    // Partículas discretas (pocas) para que sea sutil
    const baseCount = Math.round((size.w * size.h) / 45000); // densidad baja
    const count = Math.max(10, Math.min(26, baseCount));

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * size.w,
      y: Math.random() * size.h,
      r: 1.2 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: 0.35 + Math.random() * 0.35
    }));

    let running = true;
    let raf = null;

    // Para que no siga animando si no está visible
    const io = new IntersectionObserver((entries) => {
      running = entries.some(e => e.isIntersecting);
      if (running && !raf) loop();
      if (!running && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }, { threshold: 0.1 });

    io.observe(canvas);

    // ResizeObserver para adaptarse al contenedor
    const ro = new ResizeObserver(() => {
      size = resize();
    });
    ro.observe(canvas);

    function drawBackgroundGrid() {
      // Grilla muy fina (tech) casi imperceptible
      const step = 42;
      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.strokeStyle = "rgba(255,255,255,0.20)";
      ctx.lineWidth = 1;

      for (let x = 0; x <= size.w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, size.h);
        ctx.stroke();
      }
      for (let y = 0; y <= size.h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(size.w, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, size.w, size.h);

      drawBackgroundGrid();

      // Conexiones suaves (pocas)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          const max = 140 * 140;

          if (d2 < max) {
            const t = 1 - (d2 / max);
            ctx.save();
            ctx.globalAlpha = 0.10 * t;
            ctx.strokeStyle = (i % 3 === 0) ? BLUE : WHITE;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Partículas (círculos)
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = (Math.random() < 0.06) ? BLUE : "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // rebote suave
        if (p.x < 0) p.x = size.w;
        if (p.x > size.w) p.x = 0;
        if (p.y < 0) p.y = size.h;
        if (p.y > size.h) p.y = 0;
      }
    }

    function loop() {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    // arrancar
    loop();

    return () => {
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }

  // Inicializar todos los canvas
  const cleanups = canvases.map(setupCanvas).filter(Boolean);

  // Limpieza básica si se recarga navegación parcial
  window.addEventListener("beforeunload", () => {
    cleanups.forEach(fn => fn && fn());
  });
})();