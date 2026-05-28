 /* ===== SCROLL REVEAL — bidireccional ===== */
    (function initReveal()
    {
      const observer = new IntersectionObserver((entries) =>
      {
        entries.forEach(entry =>
        {
          if (entry.isIntersecting)
          {
            entry.target.classList.add('visible');
          }
          else
          {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    })();

    /* ===== SMOOTH SCROLL PARA NAVEGACIÓN INTERNA ===== */
    document.querySelectorAll('.page-nav__link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Actualizar estado activo
            document.querySelectorAll('.page-nav__link').forEach(l => l.classList.remove('page-nav__link--active'));
            link.classList.add('page-nav__link--active');
          }
        }
      });
    });

    /* ===== ACTUALIZAR NAV EN SCROLL ===== */
    (function updateNavOnScroll() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.page-nav__link');

      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 200;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('page-nav__link--active');
          if (link.getAttribute('href') === '#' + current) {
            link.classList.add('page-nav__link--active');
          }
        });
      });
    })();