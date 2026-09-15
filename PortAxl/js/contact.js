/* PortAxl — estado visual del botón de contacto.
   Actualmente simula el envío. Para enviar correos de verdad habrá que conectar un servicio. */
(function(){
  const form=document.getElementById('contactForm');if(!form)return;
  const btn=document.getElementById('sendBtn'),label=btn.querySelector('.label'),spinner=btn.querySelector('.spinner'),check=btn.querySelector('.check'),done=btn.querySelector('.done-label');
  form.addEventListener('submit',e=>{
    e.preventDefault();if(btn.classList.contains('loading')||btn.classList.contains('done'))return;
    label.classList.remove('show');btn.classList.add('loading');setTimeout(()=>spinner.classList.add('show'),250);
    setTimeout(()=>{spinner.classList.remove('show');check.classList.add('show');btn.classList.remove('loading');btn.classList.add('done');
      setTimeout(()=>{check.classList.remove('show');done.classList.add('show')},1500);
    },1800);
  });
})();
