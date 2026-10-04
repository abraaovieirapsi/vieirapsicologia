/* ==========================================
   ANIMAÇÃO DA SEÇÃO PSICOTERAPIA
========================================== */

const therapySection = document.getElementById("psicoterapia");
const therapySteps = document.querySelectorAll(".therapy-step");
const therapyLineProgress = document.getElementById("therapyLineProgress");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (therapySection && therapySteps.length && therapyLineProgress) {

  if (reduceMotion) {
    therapySteps.forEach(step => step.classList.add("is-visible"));
    therapyLineProgress.style.height = "100%";
  } else {
    const stepObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    therapySteps.forEach(step => stepObserver.observe(step));

    function atualizarLinhaPsicoterapia() {
      const rect = therapySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.72;
      const end = -rect.height * 0.12;

      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));

      therapyLineProgress.style.height = `${clamped * 100}%`;
    }

    atualizarLinhaPsicoterapia();

    window.addEventListener("scroll", atualizarLinhaPsicoterapia, { passive: true });
    window.addEventListener("resize", atualizarLinhaPsicoterapia);
  }
}


/* ==========================================
   ACORDEÃO DA SEÇÃO ATENDIMENTO
========================================== */

const careItems = document.querySelectorAll(".care-item");

careItems.forEach(item => {
  const trigger = item.querySelector(".care-trigger");

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    careItems.forEach(otherItem => {
      otherItem.classList.remove("is-open");
      const otherTrigger = otherItem.querySelector(".care-trigger");
      otherTrigger.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});


/* ==========================================
   ENTRADA LEVE DA SEÇÃO AGENDAMENTOS
========================================== */

const contactReveal = document.querySelector(".contact-reveal");

if (contactReveal) {
  if (reduceMotion) {
    contactReveal.classList.add("is-visible");
  } else {
    const contactObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    contactObserver.observe(contactReveal);
  }
}






/* ==========================================
   TESTE LOCAL — RESOLVER PASTAS PARA INDEX.HTML
   Em servidor (GitHub Pages/domínio), URLs limpas continuam intactas.
========================================== */
if (window.location.protocol === "file:") {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (
      href.endsWith('/') &&
      !href.startsWith('http://') &&
      !href.startsWith('https://') &&
      !href.startsWith('//')
    ) {
      link.setAttribute('href', href + 'index.html');
    }
  });
}


/* Cabeçalho fixo compartilhado */
const siteHeader = document.getElementById("editorialHeader");
if (siteHeader) {
  const button = document.getElementById("editorialMenuToggle");
  const nav = document.getElementById("editorialNavigation");
  const submenuItems = Array.from(nav.querySelectorAll(".menu-item-has-submenu"));
  const desktop = matchMedia("(min-width: 1024px)");
  function toggleOf(item) {
    return item.querySelector(".submenu-toggle");
  }
  function closeSubmenus(except) {
    submenuItems.forEach(item => {
      if (item === except) return;
      item.classList.remove("is-open");
      toggleOf(item).setAttribute("aria-expanded", "false");
    });
  }
  function closeMenu() {
    siteHeader.classList.remove("is-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
    closeSubmenus();
  }
  button.addEventListener("click", () => {
    const open = siteHeader.classList.toggle("is-menu-open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (!open) closeSubmenus();
  });
  submenuItems.forEach(item => {
    const toggle = toggleOf(item);
    toggle.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      if (open) closeSubmenus(item); // só um submenu aberto por vez
    });
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("click", event => { if (!siteHeader.contains(event.target)) closeMenu(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const wasOpen = siteHeader.classList.contains("is-menu-open");
      const focusedItem = submenuItems.find(item => item.contains(document.activeElement));
      closeMenu();
      if (wasOpen && !desktop.matches) button.focus();
      else if (focusedItem) toggleOf(focusedItem).focus();
    }
  });
  siteHeader.addEventListener("focusout", () => {
    setTimeout(() => { if (!siteHeader.contains(document.activeElement)) closeMenu(); }, 0);
  });
  desktop.addEventListener("change", closeMenu);
}
