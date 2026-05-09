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
        link.classList.add('text-navy', 'font-semibold');
      }
    });
  }

  // ==========================================
  // 3. HEADER SCROLL EFFECT
  // ==========================================
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md', 'bg-white/95');
        header.classList.remove('bg-white/0');
      } else {
        header.classList.remove('shadow-md', 'bg-white/95');
        header.classList.add('bg-white/0');
      }
    });
  }

  // ==========================================
  // 4. FORM HANDLING & VALIDATION
  // ==========================================
  function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const originalClasses = submitBtn.className;

        // Basic Validation
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

        // Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

        try {
          // Simulate network request (replace with actual API endpoint when ready)
          await new Promise(function (resolve) {
            setTimeout(resolve, 1500);
          });

          // Success State
          submitBtn.textContent = 'Mensagem enviada com sucesso!';
          submitBtn.classList.remove('bg-navy', 'opacity-75', 'cursor-not-allowed');
          submitBtn.classList.add('bg-green-600');
          form.reset();

          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.className = originalClasses;
          }, 3000);

        } catch (error) {
          console.error('Form submission error:', error);
          submitBtn.textContent = 'Erro ao enviar. Tente novamente.';
          submitBtn.classList.remove('bg-navy', 'opacity-75');
          submitBtn.classList.add('bg-red-600');

          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.className = originalClasses;
          }, 3000);
        }
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