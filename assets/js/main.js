/**
 * HotelsBook - Main JavaScript Module
 * Handles navigation, UI interactions, form validation, and dynamic content.
 * Vanilla ES6+, no external dependencies.
 */
(function () {
  'use strict';

  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));

      navMenu.classList.toggle('hidden');
      navMenu.classList.toggle('flex');
      navMenu.classList.toggle('flex-col');
      navMenu.classList.toggle('absolute');
      navMenu.classList.toggle('top-full');
      navMenu.classList.toggle('left-0');
      navMenu.classList.toggle('w-full');
      navMenu.classList.toggle('bg-white');
      navMenu.classList.toggle('shadow-lg');
      navMenu.classList.toggle('p-4');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'shadow-lg', 'p-4');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 2. ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================
  function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (currentPath === linkPath) {
        // Adiciona estilo de ativo: cor e negrito para TODOS
        link.classList.add('text-navy', 'font-semibold');
        
        // ✅ Adiciona barra azul APENAS se NÃO for o botão "Contato"
        if (!link.classList.contains('btn-contato')) {
          link.classList.add('border-b-2', 'border-blue');
        }
      }
    });
  }

  // ==========================================
  // 3. HEADER SCROLL EFFECT - CORRIGIDO
  // ==========================================
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = window.pageYOffset || 0;
    let ticking = false;

    // Estado inicial: navbar visível com fundo branco
    header.style.transform = 'translateY(0)';
    header.classList.add('bg-white', 'shadow-sm');

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const currentScroll = window.pageYOffset || 0;

          if (currentScroll <= 10) {
            // No topo (0-10px): navbar visível, sombra leve
            header.style.transform = 'translateY(0)';
            header.classList.remove('shadow-md');
            header.classList.add('shadow-sm');
          } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Descendo E passou de 100px: esconde navbar suavemente
            header.style.transform = 'translateY(-100%)';
          } else {
            // Subindo: mostra navbar com sombra mais forte
            header.style.transform = 'translateY(0)';
            header.classList.remove('shadow-sm');
            header.classList.add('shadow-md');
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==========================================
  // 4. FORM HANDLING & VALIDATION (REAL SEND TO FORMSPREE)
  // ==========================================
  function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Impede reload da página

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const originalClasses = submitBtn.className;

        // Validação básica
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
          } else {
            field.classList.remove('border-red-500');
          }
        });

        if (!isValid) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }

        // Estado de carregamento
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

        try {
          // Prepara os dados para envio real ao Formspree
          const formData = new FormData(form);

          // Envia via fetch para o endpoint do Formspree
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            // ✅ SUCESSO: Formulário enviado ao Formspree
            submitBtn.textContent = 'Enviado com sucesso!';
            submitBtn.classList.remove('bg-navy', 'opacity-75', 'cursor-not-allowed');
            submitBtn.classList.add('bg-green-600', 'border-green-600');
            form.reset();
          } else {
            // ❌ Erro retornado pelo Formspree
            const data = await response.json();
            alert('Erro: ' + (data.errors ? data.errors[0].message : 'Tente novamente.'));
            submitBtn.textContent = originalText;
          }

        } catch (error) {
          // ❌ Erro de rede ou conexão
          console.error('Form submission error:', error);
          alert('Erro ao conectar com o servidor. Verifique sua internet.');
          submitBtn.textContent = originalText;
        }

        // Reseta o botão após 3 segundos
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.className = originalClasses;
        }, 3000);
      });
    });
  }

  // ==========================================
  // 5. DYNAMIC COPYRIGHT YEAR
  // ==========================================
  function initDynamicYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    initMobileMenu();
    initActiveNavLink();
    initHeaderScroll();
    initForms();
    initDynamicYear();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();