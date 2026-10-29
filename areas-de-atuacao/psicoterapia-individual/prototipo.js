(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),wide=matchMedia('(min-width:1000px)');
  // --- Seção 3: percurso (uma única vez) ---
  const track=document.querySelector('.proc-track');
  if(track){
    const cards=[...track.querySelectorAll('.proc-card')],dot=track.querySelector('.proc-dot'),fill=track.querySelector('.proc-fill');
    let done=false;
    const cx=i=>cards[i].offsetLeft+26.5;                      // centro do marcador da etapa i
    const place=(i,anim)=>{const t=anim?'':'none';dot.style.transition=t;fill.style.transition=t;dot.style.transform=`translateX(${cx(i)-5.5}px)`;fill.style.width=cx(i)+'px'};
    function run(){
      if(reduce.matches){cards.forEach(c=>c.classList.add('reached'));fill.style.width='100%';done=true;return}
      if(wide.matches){            // desktop: a bolinha percorre a linha, etapa por etapa
        dot.classList.add('on');place(0,false);dot.offsetWidth;cards[0].classList.add('reached');
        [1,2,3].forEach((i,k)=>setTimeout(()=>{place(i,true);setTimeout(()=>{cards[i].classList.add('reached');if(i===3)done=true},950)},1300*(k+1)));
      }else{                       // celular: destaque sequencial, ~2,5 s por etapa, um ciclo
        cards.forEach((c,i)=>setTimeout(()=>{cards.forEach(k=>k.classList.remove('is-hl'));c.classList.add('is-hl')},i*2500));
        setTimeout(()=>cards.forEach(k=>k.classList.remove('is-hl')),cards.length*2500);
      }
    }
    if('IntersectionObserver'in window){
      const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect();run()}},{threshold:.45});io.observe(track);
    }else cards.forEach(c=>c.classList.add('reached'));
    addEventListener('resize',()=>{if(done&&wide.matches&&!reduce.matches)place(3,false)});
  }
  // --- Seção 6: FAQ ---
  document.querySelectorAll('.faq-q').forEach(b=>{
    const p=document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);p.classList.toggle('open',o)});
  });
  // --- Botão flutuante some enquanto processo, informações práticas e FAQ estão na tela ---
  const fab=document.querySelector('.wa-fab');
  if(fab&&'IntersectionObserver'in window){
    const on=new Set(),obs=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?on.add(e.target):on.delete(e.target));fab.classList.toggle('fab-hidden',on.size>0)});
    document.querySelectorAll('.sec-process,.sec-info,.faq-sec').forEach(s=>obs.observe(s));
  }
})();
