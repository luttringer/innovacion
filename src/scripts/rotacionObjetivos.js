  (function () {
    const cards = Array.from(document.querySelectorAll("#objetivos-rotativos [data-obj]"));
    if (!cards.length) return;

    let idx = 0;
    const INTERVAL_MS = 2500;

    function applySelected(i) {
      cards.forEach((card, k) => {
        const title = card.querySelector(".objetivo-titulo");
        const desc = card.querySelector(".objetivo-desc");

        const selected = k === i;

        if (selected) {
          // Seleccionado: blanco completo
          card.classList.remove("bg-[#003A66]/35", "border-white/25");
          card.classList.add("bg-white", "border-white");
          title.classList.remove("text-white");
          title.classList.add("text-[#003A66]");
          desc.classList.remove("text-white/80");
          desc.classList.add("text-slate-700");
        } else {
          // Normal: azul institucional sobre cyan
          card.classList.remove("bg-white", "border-white");
          card.classList.add("bg-[#003A66]/35", "border-white/25");
          title.classList.remove("text-[#003A66]");
          title.classList.add("text-white");
          desc.classList.remove("text-slate-700");
          desc.classList.add("text-white/80");
        }
      });
    }

    applySelected(idx);
    setInterval(() => {
      idx = (idx + 1) % cards.length;
      applySelected(idx);
    }, INTERVAL_MS);
  })();