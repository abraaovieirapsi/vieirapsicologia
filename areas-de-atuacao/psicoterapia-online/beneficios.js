(()=>{
  const s=document.querySelector('.benefits');if(!s)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),touch=matchMedia('(hover: none)');
  // Entrada suave, executada uma única vez
  if('IntersectionObserver'in window&&!reduce.matches){
    s.classList.add('is-armed');
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){s.classList.add('is-in');io.disconnect()}},{threshold:.12});
    io.observe(s);
  }
  // Em telas de toque, o corpo de cada cartão abre e fecha por um botão no título (o primeiro começa aberto)
  const cards=[...s.querySelectorAll('.benefit')];
  function setup(on){
    s.classList.toggle('is-touch',on);
    cards.forEach((card,i)=>{
      const h=card.querySelector('h3');let b=h.querySelector('.benefit-toggle');
      if(on&&!b){
        b=document.createElement('button');b.type='button';b.className='benefit-toggle';
        b.setAttribute('aria-controls',card.querySelector('.benefit-body').id);
        while(h.firstChild)b.appendChild(h.firstChild);
        const m=document.createElement('span');m.className='benefit-mark';m.setAttribute('aria-hidden','true');b.appendChild(m);
        b.addEventListener('click',()=>{const o=!card.classList.contains('is-open');card.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o)});
        h.appendChild(b);
      }else if(!on&&b){b.querySelector('.benefit-mark').remove();while(b.firstChild)h.insertBefore(b.firstChild,b);b.remove()}
      const open=!on||i===0;card.classList.toggle('is-open',open);
      if(on)b.setAttribute('aria-expanded',open);
    });
  }
  setup(touch.matches);touch.addEventListener?.('change',e=>setup(e.matches));
})();
