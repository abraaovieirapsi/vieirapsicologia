
(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const running=new Set();
  const finishMotion=()=>{if(preference.matches)running.forEach(a=>a.finish())};
  preference.addEventListener?.('change',finishMotion);
  function reveal(el,duration,distance){
    if(preference.matches||!el.animate)return;
    const a=el.animate([{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],{duration,easing:'cubic-bezier(.22,.61,.36,1)'});
    running.add(a);a.onfinish=a.oncancel=()=>running.delete(a);
  }
  // The CTA is outside this group and remains usable from first paint.
  const hero=document.querySelector('.hero-text');
  if(hero)reveal(hero,950,8);
  const groups=document.querySelectorAll('.recognition .split,.process-intro,.step,.about .portrait,.about .portrait+div,.care-faq-inner>.facts,.care-faq-inner>h2,.faq-continuation,.closing-inner');
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      observer.unobserve(entry.target);
      reveal(entry.target,entry.target.classList.contains('step')?750:850,10);
    }),{threshold:.08});
    groups.forEach(el=>observer.observe(el));
  }
  document.querySelectorAll('details').forEach(details=>{
    const summary=details.querySelector('summary');
    if(!details.animate)return; // Retain native details behavior.
    let animation=null,target=details.open;
    function settle(){
      details.open=target;
      details.style.height='';details.style.overflow='';
      summary.setAttribute('aria-expanded',String(target));
      details.dataset.expanded=String(target);
    }
    summary.setAttribute('aria-expanded',String(target));
    summary.addEventListener('click',event=>{
      event.preventDefault();
      const from=details.getBoundingClientRect().height;
      target=!target;
      if(animation){const old=animation;animation=null;old.onfinish=old.oncancel=null;running.delete(old);old.cancel()}
      summary.setAttribute('aria-expanded',String(target));
      details.dataset.expanded=String(target);
      if(preference.matches){settle();return}
      details.open=true;details.style.height='';details.style.overflow='hidden';
      const border=parseFloat(getComputedStyle(details).borderBottomWidth)||0;
      const to=target?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+border;
      details.style.height=from+'px';
      try{
        const a=details.animate([{height:from+'px'},{height:to+'px'}],{duration:550,easing:'cubic-bezier(.25,.1,.25,1)'});
        animation=a;running.add(a);
        a.onfinish=()=>{if(animation!==a)return;animation=null;running.delete(a);settle()};
        a.oncancel=()=>{running.delete(a)};
      }catch(error){settle()}
    });
    // Release fixed height if the viewport changes during a transition.
    addEventListener('resize',()=>{if(animation)animation.finish()});
  });
})();
