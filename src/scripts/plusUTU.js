
(function () 
{
  const texts = ["+innovación", "+comunidad","+UTU"];
  const el = document.getElementById("plus-rotator");
  if (!el) return;

  // Velocidades (ms)
  const TYPING = 120;       // escribir
  const DELETING = 40;     // borrar
  const HOLD_AFTER_TYPE = 1300;  // pausa al terminar de escribir
  const HOLD_AFTER_DELETE = 350; // pausa al terminar de borrar

  let textIdx = 0;


  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  async function type(text) {
    for (let i = 1; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await wait(TYPING);
    }
  }

  async function erase(text) {
    for (let i = text.length; i >= 0; i--) {
      el.textContent = text.slice(0, i);
      await wait(DELETING);
    }
  }

  async function loop() {
    while (true) {
      const current = texts[textIdx];

      // Escribir
      await type(current);
      await wait(HOLD_AFTER_TYPE);

      // Borrar
      await erase(current);
      await wait(HOLD_AFTER_DELETE);

      // Siguiente texto
      textIdx = (textIdx + 1) % texts.length;
    }
  }

  loop();
})();

