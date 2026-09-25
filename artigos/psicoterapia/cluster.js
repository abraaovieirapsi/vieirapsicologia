(() => {
  const hero = document.querySelector('.cluster-hero');
  const entries = document.querySelectorAll('.cluster-entry');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    entries.forEach(entry => entry.classList.add('is-visible'));
    return;
  }

  if (hero) {
    let ticking = false;

    const updateHero = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty('--hero-shift', `${progress * 22}px`);
      ticking = false;
    };

    const requestHeroUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHero);
        ticking = true;
      }
    };

    updateHero();
    window.addEventListener('scroll', requestHeroUpdate, { passive: true });
    window.addEventListener('resize', requestHeroUpdate);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((observed, io) => {
      observed.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add('is-visible');
          io.unobserve(item.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px'
    });

    entries.forEach(entry => observer.observe(entry));
  } else {
    entries.forEach(entry => entry.classList.add('is-visible'));
  }
})();

// Facilita o teste local: em file://, links para pastas passam a abrir seu index.html.
if (window.location.protocol === "file:") {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('/') && !href.startsWith('http')) {
      link.setAttribute('href', href + 'index.html');
    }
  });
}
