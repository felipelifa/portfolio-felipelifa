document.addEventListener('DOMContentLoaded', () => {
  if (typeof Splide === 'undefined') return;

  const root = document.querySelector('.portfolio-splide');
  if (!root) return;

  const splide = new Splide(root, {
    // Vertical no desktop
    direction: 'ttb',
    height: '26rem',      // importante para aparecer no modo vertical
    type: 'loop',
    gap: '10px',
    arrows: true,
    pagination: true,
    wheel: true,
    speed: 600,
    easing: 'cubic-bezier(.25,.8,.25,1)',
    keyboard: 'global',
    // Horizontal no mobile (opcional)
    breakpoints: {
      768: {
        direction: 'ltr',
        height: 'auto',
      },
    },
  });

  splide.mount();

  // Clique no slide:
  // 1) Se houver <a href>, o navegador segue o link normalmente.
  // 2) Sem <a>, use data-href no <li class="splide__slide" data-href="https://...">
  root.addEventListener('click', (e) => {
    const slide = e.target.closest('.splide__slide');
    if (!slide) return;

    // Se já tem <a>, não interfere
    const anchor = slide.querySelector('a[href]');
    if (anchor) return;

    // Se tiver data-href, abre em nova aba
    const href = slide.dataset.href;
    if (href) window.open(href, '_blank', 'noopener');
  });
});
