const floatingMenu = document.getElementById("floatingMenu");
const floatingMenuHandle = document.getElementById("floatingMenuHandle");
const floatingMenuPanel = document.getElementById("floatingMenuPanel");
const floatingMenuBackdrop = document.getElementById("floatingMenuBackdrop");

if (floatingMenu && floatingMenuHandle && floatingMenuPanel) {
  const EDGE_GAP = 12;
  const DRAG_THRESHOLD = 6;
  let pointerId = null;
  let startPointerX = 0;
  let startPointerY = 0;
  let startLeft = 0;
  let startTop = 0;
  let moved = false;
  let suppressNextClick = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setPosition(left, top) {
    floatingMenu.style.left = `${left}px`;
    floatingMenu.style.right = "auto";
    floatingMenu.style.top = `${top}px`;
  }

  function viewportBounds() {
    const rect = floatingMenu.getBoundingClientRect();
    return {
      maxLeft: Math.max(EDGE_GAP, window.innerWidth - rect.width - EDGE_GAP),
      maxTop: Math.max(EDGE_GAP, window.innerHeight - rect.height - EDGE_GAP)
    };
  }

  function snapToNearestVerticalEdge() {
    const rect = floatingMenu.getBoundingClientRect();
    const bounds = viewportBounds();
    const centerX = rect.left + rect.width / 2;
    const side = centerX < window.innerWidth / 2 ? "left" : "right";
    const left = side === "left" ? EDGE_GAP : bounds.maxLeft;
    const top = clamp(rect.top, EDGE_GAP, bounds.maxTop);

    floatingMenu.dataset.side = side;
    floatingMenu.style.transition = "left .28s cubic-bezier(.22,.61,.36,1), top .18s ease";
    setPosition(left, top);
    window.setTimeout(() => { floatingMenu.style.transition = ""; }, 300);
  }

  function fitOpenMenuToViewport() {
    const rect = floatingMenu.getBoundingClientRect();
    const panelWidth = Math.min(window.innerWidth <= 480 ? 286 : 310, window.innerWidth - EDGE_GAP * 2);
    const panelHeight = Math.min(window.innerWidth <= 480 ? 425 : 455, window.innerHeight - EDGE_GAP * 2);
    const side = floatingMenu.dataset.side || "left";
    // O contêiner continua tendo o tamanho da bolinha (42 px).
    // À direita, o painel usa right: 0 e cresce para a esquerda; por isso
    // a referência correta é a posição da própria bolinha, não a largura do painel.
    const bubbleWidth = floatingMenu.offsetWidth || 42;
    const left = side === "left"
      ? EDGE_GAP
      : window.innerWidth - bubbleWidth - EDGE_GAP;
    const top = clamp(rect.top, EDGE_GAP, window.innerHeight - panelHeight - EDGE_GAP);
    setPosition(left, top);
  }

  function openMenu() {
    fitOpenMenuToViewport();
    floatingMenu.classList.add("is-open");
    floatingMenuBackdrop?.classList.add("is-open");
    floatingMenuHandle.setAttribute("aria-expanded", "true");
    floatingMenuHandle.setAttribute("aria-label", "Fechar menu");
    floatingMenuPanel.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    floatingMenu.classList.remove("is-open");
    floatingMenuBackdrop?.classList.remove("is-open");
    floatingMenuHandle.setAttribute("aria-expanded", "false");
    floatingMenuHandle.setAttribute("aria-label", "Abrir menu");
    floatingMenuPanel.setAttribute("aria-hidden", "true");
    const rect = floatingMenu.getBoundingClientRect();
    const side = floatingMenu.dataset.side || "left";
    const bubbleLeft = side === "left" ? EDGE_GAP : window.innerWidth - 42 - EDGE_GAP;
    const bubbleTop = clamp(rect.top, EDGE_GAP, window.innerHeight - 42 - EDGE_GAP);
    setPosition(bubbleLeft, bubbleTop);
  }

  floatingMenuHandle.addEventListener("pointerdown", event => {
    if (floatingMenu.classList.contains("is-open")) return;
    pointerId = event.pointerId;
    moved = false;
    startPointerX = event.clientX;
    startPointerY = event.clientY;
    const rect = floatingMenu.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    floatingMenuHandle.setPointerCapture(pointerId);
    floatingMenu.classList.add("is-dragging");
  });

  floatingMenuHandle.addEventListener("pointermove", event => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startPointerX;
    const dy = event.clientY - startPointerY;
    if (!moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) moved = true;
    if (!moved) return;

    const bounds = viewportBounds();
    setPosition(
      clamp(startLeft + dx, EDGE_GAP, bounds.maxLeft),
      clamp(startTop + dy, EDGE_GAP, bounds.maxTop)
    );
  });

  function finishPointer(event) {
    if (event.pointerId !== pointerId) return;
    floatingMenu.classList.remove("is-dragging");
    try { floatingMenuHandle.releasePointerCapture(pointerId); } catch (_) {}
    pointerId = null;

    if (moved) {
      suppressNextClick = true;
      snapToNearestVerticalEdge();
      window.setTimeout(() => { suppressNextClick = false; }, 80);
    }
  }

  floatingMenuHandle.addEventListener("pointerup", finishPointer);
  floatingMenuHandle.addEventListener("pointercancel", finishPointer);

  floatingMenuHandle.addEventListener("click", event => {
    if (suppressNextClick || moved) {
      event.preventDefault();
      moved = false;
      return;
    }
    openMenu();
  });

  floatingMenuBackdrop?.addEventListener("click", closeMenu);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && floatingMenu.classList.contains("is-open")) closeMenu();
  });

  document.querySelectorAll(".floating-menu .menu-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (floatingMenu.classList.contains("is-open")) fitOpenMenuToViewport();
    else snapToNearestVerticalEdge();
  });
}

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
   SUBMENU — ARTIGOS (menu flutuante)
   ========================================== */
const articlesMenuItem = document.querySelector(".floating-menu .menu-item-has-submenu");
const articlesSubmenuToggle = document.querySelector(".floating-menu .submenu-toggle");

if (articlesMenuItem && articlesSubmenuToggle) {
  articlesSubmenuToggle.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = articlesMenuItem.classList.toggle("is-open");
    articlesSubmenuToggle.setAttribute("aria-expanded", String(isOpen));
    articlesSubmenuToggle.setAttribute("aria-label", isOpen ? "Fechar temas de artigos" : "Abrir temas de artigos");
  });
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
