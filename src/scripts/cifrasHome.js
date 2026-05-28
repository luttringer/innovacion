(() =>
{
  const els = document.querySelectorAll(".kpi");
  if (!els.length) { return; }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce)
  {
    els.forEach(el => el.textContent = el.dataset.to || "0");
    return;
  }

  function animate(el)
  {
    const to = Number(el.dataset.to || "0");
    const dur = 900;
    const t0 = performance.now();

    function frame(t)
    {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.floor(eased * to));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((entries) =>
  {
    entries.forEach(e =>
    {
      if (e.isIntersecting)
      {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  els.forEach(el => io.observe(el));
})();