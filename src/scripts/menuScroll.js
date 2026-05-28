(() =>
{
  const header    = document.querySelector('.cont_menu_navigation');
  const title     = document.querySelector('.siteTitle');       // puede ser null (removido)
  const menuIcon  = document.querySelector('#menuSwap');
  const menuPanel = document.querySelector('#menu-panel');
  const menuLink  = document.querySelector('.menuLink');
  const panelPlus = document.querySelector('#panelPlus');
  const panelNav  = document.querySelector('#panelNav');
  const canvaCont = document.querySelector('#particleCanvas');  // puede ser null

  if (!header) return;

  const COMPACT_ENTER   = 120;   // px para compactar en desktop
  const HIDE_THRESHOLD  = 80;    // px antes de empezar a ocultar en mobile
  const mq = window.matchMedia('(min-width: 768px)');

  let compact  = false;
  let ticking  = false;
  let lastY    = 0;

  menuIcon.addEventListener('click', () =>
  {
    menuPanel.classList.toggle('menuMoved');
  });

  function isMenuOpen()
  {
    return menuPanel.classList.contains('menuMoved');
  }

  function setCompact(next)
  {
    if (next === compact) return;
    compact = next;
    header.classList.toggle('is-compact', compact);
    if (title)     title.classList.toggle('siteTitle-compact', compact);
    if (menuLink)  menuLink.classList.toggle('menu-link-org', compact);
    if (panelPlus) panelPlus.classList.toggle('panelPlus-compact', compact);
    if (panelNav)  panelNav.classList.toggle('panelNav-compact', compact);
    if (canvaCont) canvaCont.classList.toggle('panelNav-compact', compact);
  }

  function applyByScroll(y)
  {
    if (mq.matches)
    {
      // Desktop: compact al hacer scroll
      header.classList.remove('header-hidden');
      setCompact(y > 0 && y > COMPACT_ENTER);
    }
    else
    {
      // Mobile: ocultar al bajar, mostrar al subir; nunca ocultar con menú abierto
      setCompact(false);

      if (y <= HIDE_THRESHOLD || isMenuOpen())
      {
        header.classList.remove('header-hidden');
      }
      else if (y > lastY)
      {
        header.classList.add('header-hidden');
      }
      else
      {
        header.classList.remove('header-hidden');
      }
    }
  }

  function onScroll()
  {
    const y = Math.max(0, window.scrollY || document.documentElement.scrollTop);
    applyByScroll(y);
    lastY   = y;
    ticking = false;
  }

  function schedule()
  {
    if (!ticking)
    {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  mq.addEventListener ? mq.addEventListener('change', schedule) : mq.addListener(schedule);

  schedule();
})();

(() =>
{
  const btn = document.getElementById('menuSwap');
  const a = btn.querySelector('.icon-a');
  const b = btn.querySelector('.icon-b');
  if (!btn || !a || !b) return;

  let alt = false;
  const set = (next) =>
  {
    alt = next;
    btn.setAttribute('aria-pressed', String(alt));
    a.classList.toggle('opacity-0', alt);
    a.classList.toggle('scale-105', alt);
    b.classList.toggle('opacity-0', !alt);
    b.classList.toggle('scale-100', alt);
  };

  set(false);

  btn.addEventListener('click', () => set(!alt));
})();
