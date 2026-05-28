(function () {
  const root = document.getElementById("gallery-min");
  if (!root) return;

  const main = document.getElementById("gallery-min-main");
  const thumbs = Array.from(root.querySelectorAll(".gallery-thumb"));

  const BLUE = "rgb(25 151 240)";
  const INTERVAL = 4500; // ms
  const FADE_MS = 180;   // fade rápido y limpio (más “fluido”)

  let idx = 0;
  let timer = null;

  function setActiveBorder(activeSrc) {
    thumbs.forEach((t) => {
      // borde normal
      t.style.borderColor = "";
      t.style.boxShadow = "";

      if (t.dataset.src === activeSrc) {
        // borde activo minimal (azul UTU)
        t.style.borderColor = BLUE;
        t.style.boxShadow = `0 0 0 2px ${BLUE}`;
      }
    });
  }

  function show(i) {
    idx = (i + thumbs.length) % thumbs.length;
    const src = thumbs[idx].dataset.src;

    // fade out -> cambio src -> fade in
    main.style.opacity = "0";
    window.setTimeout(() => {
      main.src = src;
      main.style.opacity = "1";
    }, FADE_MS);

    setActiveBorder(src);
  }

  function start() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => show(idx + 1), INTERVAL);
  }

  // Precarga (reduce tirones)
  thumbs.forEach((t) => {
    const img = new Image();
    img.src = t.dataset.src;
  });

  // init
  show(0);
  start();
})();
