document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. MENU RESPONSIVO (Mobile)
     ========================================= */
  // Seleciona o botão de menu (hambúrguer) e o container de links de navegação
  const mobileMenuBtn = document.querySelector('button.lg\\:hidden');
  const navLinksContainer = document.querySelector('.hidden.lg\\:flex.items-center.gap-8');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      // Alterna as classes para exibir/ocultar o menu em telas menores
      navLinksContainer.classList.toggle('hidden');
      navLinksContainer.classList.toggle('flex');
      navLinksContainer.classList.toggle('flex-col');
      navLinksContainer.classList.toggle('absolute');
      navLinksContainer.classList.toggle('top-full');
      navLinksContainer.classList.toggle('left-0');
      navLinksContainer.classList.toggle('w-full');
      navLinksContainer.classList.toggle('bg-white');
      navLinksContainer.classList.toggle('p-4');
      navLinksContainer.classList.toggle('shadow-lg');
    });
  }

  /* =========================================
     2. ANIMAÇÕES DE ROLAGEM (Intersection Observer)
     ========================================= */
  // Adiciona a classe de animação aos blocos principais (Planos, Benefícios, FAQ, etc)
  const sectionsToAnimate = document.querySelectorAll('section > div > div, .grid > div');
  
  sectionsToAnimate.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    // Adiciona um pequeno delay baseado na ordem para criar efeito cascata
    if (index % 5 !== 0) el.classList.add(`delay-${(index % 5)}`);
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara quando 15% do elemento estiver visível
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  sectionsToAnimate.forEach(section => {
    scrollObserver.observe(section);
  });

  /* =========================================
     3. FUNCIONAMENTO DO FAQ (Perguntas Frequentes)
     ========================================= */
  // Seleciona todos os botões do accordion do FAQ
  const faqButtons = document.querySelectorAll('button[aria-controls^="radix-"]');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const contentId = button.getAttribute('aria-controls');
      const contentDiv = document.getElementById(contentId);
      const icon = button.querySelector('svg');

      // Fecha todos os outros FAQs abertos
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.setAttribute('data-state', 'closed');
          const otherContent = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherContent) {
            otherContent.setAttribute('data-state', 'closed');
            otherContent.hidden = true;
          }
          const otherIcon = otherBtn.querySelector('svg');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Alterna o estado do FAQ clicado
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('data-state', 'closed');
        if (contentDiv) {
          contentDiv.setAttribute('data-state', 'closed');
          contentDiv.hidden = true;
        }
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('data-state', 'open');
        if (contentDiv) {
          contentDiv.setAttribute('data-state', 'open');
          contentDiv.hidden = false;
        }
        if (icon) icon.style.transform = 'rotate(180deg)'; // Gira a setinha
      }
    });
  });
});