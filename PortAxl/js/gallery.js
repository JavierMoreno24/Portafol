/* PortAxl — galería horizontal tipo cilindro. No necesitas editar este archivo para cambiar proyectos:
   las tarjetas y sus enlaces están en index.html. */
(function(){
  const track=document.getElementById('galleryTrack'),viewport=document.getElementById('galleryViewport'),pin=document.getElementById('galleryPin');
  if(!track||!viewport||!pin)return;
  const originals=[...track.querySelectorAll('.g-card')];
  const REPEATS=3;/* esto es la cantidad de repeticiones */
  for(let r=1;r<REPEATS;r++) originals.forEach(card=>track.appendChild(card.cloneNode(true)));
  const allCards=[...track.querySelectorAll('.g-card')];
  const gap=28; let setWidth=0,manualOffset=0,rafDrag=null;
  function measure(){const first=allCards[0];if(first)setWidth=(first.getBoundingClientRect().width+gap)*originals.length;}
  measure();window.addEventListener('resize',measure);
  function progress(){const rect=pin.getBoundingClientRect(),total=pin.offsetHeight-window.innerHeight;return total>0?Math.max(0,Math.min(1,-rect.top/total)):0;}
  function render(){
    if(setWidth<=0){requestAnimationFrame(render);return;}
    let x=(progress()*setWidth*(REPEATS-2)+manualOffset)%setWidth;if(x<0)x+=setWidth;
    track.style.transform=`translateX(${-x}px)`;
    const center=window.innerWidth/2;let active=null,min=Infinity;
    allCards.forEach(card=>{const r=card.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-center);if(d<min){min=d;active=card;}});
    allCards.forEach(c=>c.classList.toggle('active',c===active));
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  let dragging=false,lastX=0,lastT=0,vel=0;
  function xOf(e){return e.touches?e.touches[0].clientX:e.clientX;}
  function down(e){dragging=true;cancelAnimationFrame(rafDrag);lastX=xOf(e);lastT=performance.now();vel=0;}
  function move(e){if(!dragging)return;const x=xOf(e),now=performance.now(),dx=x-lastX,dt=Math.max(1,now-lastT);vel=(dx/dt)*16;manualOffset-=dx;lastX=x;lastT=now;}
  function up(){if(!dragging)return;dragging=false;let v=-vel;function inertia(){if(Math.abs(v)<.05)return;manualOffset+=v;v*=.95;rafDrag=requestAnimationFrame(inertia);}inertia();}
  viewport.addEventListener('mousedown',down);window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);
  viewport.addEventListener('touchstart',down,{passive:true});viewport.addEventListener('touchmove',move,{passive:true});viewport.addEventListener('touchend',up);
})();
