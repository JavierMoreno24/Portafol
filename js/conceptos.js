/* =========================================================
   CONCEPTOS — PortAxl
   Visor ampliado para las imágenes de "Un concepto por sección".
   - Clic/toque en un moodboard o ilustración: se abre grande.
   - Flechas del teclado ← →, Esc, clic fuera o deslizar el dedo.
   - Sin JavaScript (o navegador viejo) las imágenes abren en una
     pestaña nueva y todo lo demás funciona igual.
   Las animaciones de entrada (.fade-in) las maneja js/effects.js.
   ========================================================= */
(function () {
  'use strict';

  var links = Array.prototype.slice.call(document.querySelectorAll('.cps a[data-cps-zoom]'));
  var dlg = document.createElement('dialog');
  if (!links.length || typeof dlg.showModal !== 'function') return;

  dlg.className = 'cps-lb';
  dlg.setAttribute('aria-label', 'Vista ampliada de la imagen');
  dlg.innerHTML =
    '<div class="cps-lb__bar">' +
      '<span class="cps-lb__count" aria-live="polite"></span>' +
      '<button type="button" class="cps-lb__btn cps-lb__close" aria-label="Cerrar">&times;</button>' +
    '</div>' +
    '<div class="cps-lb__stage">' +
      '<button type="button" class="cps-lb__btn cps-lb__prev" aria-label="Imagen anterior">&#8249;</button>' +
      '<figure class="cps-lb__fig">' +
        '<img class="cps-lb__img" alt="">' +
        '<figcaption class="cps-lb__cap"><strong></strong><span></span></figcaption>' +
      '</figure>' +
      '<button type="button" class="cps-lb__btn cps-lb__next" aria-label="Imagen siguiente">&#8250;</button>' +
    '</div>';
  document.body.appendChild(dlg);

  var imgEl = dlg.querySelector('.cps-lb__img');
  var nameEl = dlg.querySelector('.cps-lb__cap strong');
  var kindEl = dlg.querySelector('.cps-lb__cap span');
  var countEl = dlg.querySelector('.cps-lb__count');
  var current = 0;
  var lastFocus = null;

  function textOf(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  function preload(i) {
    var n = links.length;
    var a = links[((i % n) + n) % n];
    if (a) { (new Image()).src = a.href; }
  }

  function render(i) {
    var n = links.length;
    current = ((i % n) + n) % n;
    var a = links[current];
    var thumb = a.querySelector('img');
    var item = a.closest('.cps-item');
    var fig = a.closest('figure');

    imgEl.src = a.href;
    imgEl.alt = thumb ? thumb.alt : '';
    nameEl.textContent = textOf(item && item.querySelector('.cps-num')) + ' · ' +
                         textOf(item && item.querySelector('.cps-name'));
    kindEl.textContent = textOf(fig && fig.querySelector('figcaption'));
    countEl.textContent = (current + 1) + ' / ' + n;

    preload(current + 1);
    preload(current - 1);
  }

  function open(i) {
    lastFocus = document.activeElement;
    render(i);
    dlg.showModal();
    document.documentElement.classList.add('cps-lb-open');
  }
  function close() { if (dlg.open) dlg.close(); }
  function go(delta) { render(current + delta); }

  // Clic normal abre el visor; Ctrl/Cmd/Shift/clic medio conservan el comportamiento del navegador
  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      open(i);
    });
  });

  dlg.querySelector('.cps-lb__close').addEventListener('click', close);
  dlg.querySelector('.cps-lb__prev').addEventListener('click', function () { go(-1); });
  dlg.querySelector('.cps-lb__next').addEventListener('click', function () { go(1); });

  // Clic en el fondo cierra
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.classList.contains('cps-lb__stage')) close();
  });

  // Teclado (Esc lo maneja el propio <dialog>)
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  // Deslizar el dedo en el celular
  var startX = null;
  dlg.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  dlg.addEventListener('close', function () {
    document.documentElement.classList.remove('cps-lb-open');
    imgEl.removeAttribute('src');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  });
})();
