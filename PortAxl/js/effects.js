/* PortAxl — efectos generales: animaciones al entrar, parallax, chips y barra de scroll. */
(function(){
  const els=document.querySelectorAll('.fade-in');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target);}});
  },{threshold:.2,rootMargin:'-10% 0px'});
  els.forEach(el=>io.observe(el));

  function staggerGroup(selector,delay){
    document.querySelectorAll(selector).forEach(sec=>{
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.querySelectorAll('.fade-in-s').forEach((item,i)=>setTimeout(()=>item.classList.add('in-view'),i*delay));
            observer.unobserve(entry.target);
          }
        });
      },{threshold:.3});
      observer.observe(sec);
    });
  }
  staggerGroup('#sobre-mi',80);
  staggerGroup('#contacto',80);

  const casoIO=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');casoIO.unobserve(entry.target);}});
  },{threshold:.25});
  document.querySelectorAll('.caso-card').forEach(c=>casoIO.observe(c));

  const footer=document.getElementById('footer');
  if(footer){
    const footerIO=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');footerIO.unobserve(entry.target);}});
    },{threshold:.5});
    footerIO.observe(footer);
  }
})();

(function(){
  const heroCopy=document.querySelector('.hero-copy');
  if(heroCopy) requestAnimationFrame(()=>heroCopy.classList.add('in-view'));
  const photo=document.getElementById('heroPhoto');
  if(!photo) return;
  let targetX=0,targetY=0,curX=0,curY=0;
  function throttle(fn,wait){let last=0;return function(...args){const now=Date.now();if(now-last>=wait){last=now;fn.apply(this,args);}}}
  window.addEventListener('mousemove',throttle(e=>{
    const r=photo.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    targetX=Math.max(-1,Math.min(1,(e.clientX-cx)/(window.innerWidth/2)))*22;
    targetY=Math.max(-1,Math.min(1,(e.clientY-cy)/(window.innerHeight/2)))*8;
  },16));
  function raf(){
    curX+=(targetX-curX)*.08;curY+=(targetY-curY)*.08;
    photo.style.transform=`rotateY(${curX}deg) rotateX(${-curY}deg)`;
    photo.style.boxShadow=`${curX*3}px ${(-curY*3)+40}px 60px -20px rgba(24,23,18,.35)`;
    requestAnimationFrame(raf);
  }
  raf();
})();

(function(){
  const chips=document.querySelectorAll('#chips .chip');
  chips.forEach((chip,i)=>{
    const inner=chip.querySelector('.chip-float');
    if(!inner) return;
    const dur=3000+Math.random()*2000,delay=Math.random()*-3000;
    const style=document.createElement('style');
    style.textContent=`@keyframes floatchip${i}{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-6px) rotate(1deg)}}`;
    document.head.appendChild(style);
    inner.style.animation=`floatchip${i} ${dur}ms ease-in-out ${delay}ms infinite`;
    chip.addEventListener('mouseenter',()=>{
      chips.forEach(c=>{if(c===chip){c.style.transition='transform 120ms var(--standard)';c.style.transform='scale(1.08)'}else c.style.opacity='.5'});
    });
    chip.addEventListener('mouseleave',()=>chips.forEach(c=>{c.style.transform='scale(1)';c.style.opacity='1'}));
  });
})();

(function(){
  const thumb=document.getElementById('scrollThumb'),track=document.querySelector('.scroll-track');
  if(!thumb||!track)return;
  function update(){
    const total=document.documentElement.scrollHeight-window.innerHeight;
    const progress=total>0?window.scrollY/total:0;
    const max=track.getBoundingClientRect().height-thumb.getBoundingClientRect().height;
    thumb.style.top=(progress*max)+'px';
  }
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
})();

