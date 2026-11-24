(() => {
  const input = document.getElementById('articleSearch');
  const form = document.getElementById('articleSearchForm');
  const cards = [...document.querySelectorAll('.library-card')];
  const filters = [...document.querySelectorAll('.library-filter')];
  const count = document.getElementById('articleCount');
  const empty = document.getElementById('noResults');
  const clear = document.getElementById('clearFilters');

  // Evita inicialização parcial caso a estrutura da página seja alterada no futuro.
  if (!input || !form || !cards.length || !filters.length || !count || !empty || !clear) return;

  let activeFilter = 'all';
  const normalize = value => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();

  function update() {
    const term = normalize(input.value);
    let visible = 0;

    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const textMatch = !term || normalize(card.dataset.search || card.textContent).includes(term);
      const show = categoryMatch && textMatch;
      card.hidden = !show;
      if (show) visible++;
    });

    count.textContent = `${visible} ${visible === 1 ? 'artigo' : 'artigos'}`;
    empty.hidden = visible !== 0;
  }

  // A busca continua dinâmica; Enter também confirma a consulta sem recarregar a página.
  input.addEventListener('input', update);
  form.addEventListener('submit', event => {
    event.preventDefault();
    update();
  });

  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    update();
  }));

  clear.addEventListener('click', () => {
    input.value = '';
    activeFilter = 'all';
    filters.forEach(button => {
      const selected = button.dataset.filter === 'all';
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    update();
    input.focus();
  });

  update();
})();
