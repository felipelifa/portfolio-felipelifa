document.addEventListener('DOMContentLoaded', () => {
  // Garante que o carrossel existe e que o Splide foi carregado
  if (typeof Splide === 'undefined') return;
  const root = document.querySelector('.portfolio-splide');
  if (!root) return;

  // 1) Projetos (exemplo + modelo para duplicar)
  const projects = [
    {
      title: 'Site de Consultoria',
      desc: 'Landing page focada em conversão, com CTA claro e prova social.',
      tags: ['HTML', 'CSS', 'UX'],
      demo: 'https://exemplo.com/demo-consultoria',
      code: 'https://github.com/seuusuario/site-consultoria',
    },
    // { title: 'Outro Projeto', desc: 'Descrição curta.',
    //   tags: ['HTML','JS'], demo: 'https://...', code: 'https://...' },
  ];

  // 2) Elementos do painel
  const elTitle = document.getElementById('pd-title');
  const elDesc  = document.getElementById('pd-desc');
  const elTags  = document.getElementById('pd-tags');
  const elDemo  = document.getElementById('pd-demo');
  const elCode  = document.getElementById('pd-code');

  // 3) Renderização do painel
  function renderDetails(index) {
    const p = projects[index] || projects[0];
    if (!p) return;

    elTitle && (elTitle.textContent = p.title || '');
    elDesc  && (elDesc.textContent  = p.desc  || '');

    if (elTags) {
      elTags.innerHTML = '';
      (p.tags || []).forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        elTags.appendChild(li);
      });
    }

    if (elDemo) elDemo.href = p.demo || '#';
    if (elCode) elCode.href = p.code || '#';
  }

  // 4) Splide
  const splide = new Splide('.portfolio-splide', {
    direction: 'ttb',  // vertical
    height: '26rem',
    wheel: true,
    pagination: true,
    arrows: true,
    gap: '10px',
    type: 'loop',
    speed: 600,
    easing: 'cubic-bezier(.25,.8,.25,1)',
    keyboard: 'global',
  });

  splide.on('mounted', () => renderDetails(splide.index));
  splide.on('move', (newIndex) => renderDetails(newIndex));

  splide.mount();
});
