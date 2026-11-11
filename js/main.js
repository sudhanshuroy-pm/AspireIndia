/**
 * ASPIRE India — Main JavaScript
 * Society for Promotion of Inclusive and Relevant Education
 * https://aspire-india.org
 *
 * Vanilla ES6+ · No frameworks · WCAG 2.2 AA compliant
 * ----------------------------------------------------------
 * Table of Contents
 *  0. Utility Helpers
 *  1. Analytics Stub
 *  2. Reduced-Motion Detection
 *  3. Sticky Header
 *  4. Desktop Dropdown Navigation
 *  5. Mobile Navigation (Hamburger / Drawer)
 *  6. Smooth Scrolling
 *  7. Scroll Reveal Animations
 *  8. Impact Counter Animation
 *  9. Testimonial Carousel
 * 10. Donation Form
 * 11. Partnership Enquiry Form
 * 12. Active Navigation State
 * 13. Back-to-Top Button
 * 14. Skip-to-Content Link
 * 15. Image Lazy Loading Enhancement
 * 16. Geographic SVG Map (Homepage)
 * 17. Initialisation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* =================================================================
     0. UTILITY HELPERS
     ================================================================= */

  /**
   * Format a number with the Indian numbering system (lakh / crore).
   * e.g. 1500000 → "15,00,000"
   */
  function formatIndianNumber(num) {
    const str = Math.floor(num).toString();
    if (str.length <= 3) return str;

    let lastThree = str.slice(-3);
    const remaining = str.slice(0, -3);
    if (remaining.length > 0) {
      lastThree = ',' + lastThree;
    }
    const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return formatted;
  }

  /**
   * Easing function: easeOutQuart
   */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  /**
   * Safely query the DOM (returns null instead of throwing).
   */
  function qs(selector, root) {
    try {
      return (root || document).querySelector(selector);
    } catch (e) {
      return null;
    }
  }

  function qsa(selector, root) {
    try {
      return Array.from((root || document).querySelectorAll(selector));
    } catch (e) {
      return [];
    }
  }

  /**
   * Debounce utility for scroll / resize handlers.
   */
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /**
   * Throttle utility for high-frequency events.
   */
  function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  /* =================================================================
     1. ANALYTICS STUB
     ================================================================= */

  /**
   * Lightweight analytics tracker.
   * In prototype mode events are logged to the console.
   * In production, replace the body with your real analytics call.
   */
  function trackEvent(category, action, label) {
    if (typeof label === 'undefined') {
      label = '';
    }
    /* eslint-disable-next-line no-console */
    console.log(
      '%c[Analytics]%c %s → %s' + (label ? ' (%s)' : ''),
      'color:#0b7d3e;font-weight:bold',
      'color:inherit',
      category,
      action,
      label
    );
  }

  // Track initial page view
  trackEvent('page_view', window.location.pathname, document.title);

  /* =================================================================
     2. REDUCED-MOTION DETECTION
     ================================================================= */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function motionOk() {
    return !prefersReducedMotion.matches;
  }

  /* =================================================================
     3. STICKY HEADER
     ================================================================= */

  const siteHeader = qs('.site-header');

  function initStickyHeader() {
    if (!siteHeader) return;

    const SCROLL_THRESHOLD = 100;

    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', throttle(onScroll, 50), { passive: true });
    // Run once on load in case user refreshed mid-page
    onScroll();
  }

  /* =================================================================
     4. DESKTOP DROPDOWN NAVIGATION
     ================================================================= */

  function initDesktopDropdowns() {
    const dropdownToggles = qsa('.nav-dropdown-toggle');
    if (!dropdownToggles.length) return;

    function closeAllDropdowns(except) {
      dropdownToggles.forEach((toggle) => {
        if (toggle === except) return;
        toggle.setAttribute('aria-expanded', 'false');
        const menu = toggle.nextElementSibling;
        if (menu) {
          menu.setAttribute('aria-hidden', 'true');
          menu.classList.remove('is-open');
        }
      });
    }

    dropdownToggles.forEach((toggle) => {
      const menu = toggle.nextElementSibling;
      if (!menu) return;

      const navItem = toggle.closest('.nav-item');

      // Click to toggle
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns(toggle);

        if (isOpen) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          menu.classList.remove('is-open');
        } else {
          toggle.setAttribute('aria-expanded', 'true');
          menu.setAttribute('aria-hidden', 'false');
          menu.classList.add('is-open');
        }
      });

      // Desktop hover support
      if (navItem) {
        navItem.addEventListener('mouseenter', () => {
          toggle.setAttribute('aria-expanded', 'true');
          menu.setAttribute('aria-hidden', 'false');
          menu.classList.add('is-open');
        });

        navItem.addEventListener('mouseleave', () => {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          menu.classList.remove('is-open');
        });
      }

      // Keyboard navigation inside the dropdown
      menu.addEventListener('keydown', (e) => {
        const items = qsa('a, button', menu);
        if (!items.length) return;
        const current = items.indexOf(document.activeElement);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            items[(current + 1) % items.length].focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            items[(current - 1 + items.length) % items.length].focus();
            break;
          case 'Home':
            e.preventDefault();
            items[0].focus();
            break;
          case 'End':
            e.preventDefault();
            items[items.length - 1].focus();
            break;
          case 'Escape':
            e.preventDefault();
            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            menu.classList.remove('is-open');
            toggle.focus();
            break;
          default:
            break;
        }
      });

      // Close on Tab out of last item
      const lastItem = menu.querySelector(':scope > *:last-child a, :scope > *:last-child button');
      if (lastItem) {
        lastItem.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            menu.classList.remove('is-open');
          }
        });
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const insideDropdown = e.target.closest('.nav-item') || e.target.closest('.nav-dropdown-menu');
      if (!insideDropdown) {
        closeAllDropdowns();
      }
    });

    // Escape key global handler for dropdowns
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  }

  /* =================================================================
     5. MOBILE NAVIGATION (HAMBURGER / DRAWER)
     ================================================================= */

  function initMobileNav() {
    const hamburger = qs('.hamburger-btn');
    const drawer = qs('.mobile-drawer');
    const overlay = qs('.drawer-overlay');
    const closeBtn = qs('.drawer-close-btn');

    if (!hamburger || !drawer) return;

    let previouslyFocusedElement = null;

    function openDrawer() {
      previouslyFocusedElement = document.activeElement;

      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');

      if (overlay) {
        overlay.classList.add('is-visible');
      }

      document.body.classList.add('no-scroll');

      // Focus the close button or first focusable element
      const firstFocusable = closeBtn || drawer.querySelector('a, button, input, [tabindex]');
      if (firstFocusable) {
        requestAnimationFrame(() => firstFocusable.focus());
      }

      trackEvent('navigation', 'mobile_drawer_open');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');

      if (overlay) {
        overlay.classList.remove('is-visible');
      }

      document.body.classList.remove('no-scroll');

      // Restore focus
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    // Close on close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Close when a navigation link inside drawer is clicked
    const drawerLinks = qsa('a:not(.accordion-toggle)', drawer);
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Focus trap inside the drawer
    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = qsa(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        drawer
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Accordion sub-menus within the drawer
    const accordionToggles = qsa('.accordion-toggle', drawer);
    accordionToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        const submenu = toggle.nextElementSibling;

        // Close other open accordions
        accordionToggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) {
            otherToggle.setAttribute('aria-expanded', 'false');
            const otherMenu = otherToggle.nextElementSibling;
            if (otherMenu) {
              otherMenu.classList.remove('is-open');
              otherMenu.setAttribute('aria-hidden', 'true');
            }
          }
        });

        if (expanded) {
          toggle.setAttribute('aria-expanded', 'false');
          if (submenu) {
            submenu.classList.remove('is-open');
            submenu.setAttribute('aria-hidden', 'true');
          }
        } else {
          toggle.setAttribute('aria-expanded', 'true');
          if (submenu) {
            submenu.classList.add('is-open');
            submenu.setAttribute('aria-hidden', 'false');
          }
        }
      });
    });

    // Expose closeDrawer for use by other modules
    window.__aspireCloseDrawer = closeDrawer;
  }

  /* =================================================================
     6. SMOOTH SCROLLING
     ================================================================= */

  function initSmoothScroll() {
    const HEADER_OFFSET = 80;

    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#' || hash === '#!') return;

      const target = qs(hash);
      if (!target) return;

      e.preventDefault();

      // Close mobile drawer if open
      if (typeof window.__aspireCloseDrawer === 'function') {
        window.__aspireCloseDrawer();
      }

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      if (motionOk()) {
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        window.scrollTo({ top, behavior: 'auto' });
      }

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, '', hash);
      }

      // Move focus to the target for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  }

  /* =================================================================
     7. SCROLL REVEAL ANIMATIONS
     ================================================================= */

  function initScrollReveal() {
    // Immediately ensure all elements are visible and revealed
    qsa('.reveal').forEach((el) => el.classList.add('revealed'));
    qsa('.reveal-stagger').forEach((el) => {
      el.classList.add('revealed');
      qsa('> *', el).forEach((child) => child.classList.add('revealed'));
    });
  }

  /* =================================================================
     8. IMPACT COUNTER ANIMATION
     ================================================================= */

  function initImpactCounters() {
    const counters = qsa('[data-count-target]');
    if (!counters.length) return;

    if (!motionOk()) {
      // Show final values immediately
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count-target'), 10);
        const suffix = counter.getAttribute('data-count-suffix') || '';
        counter.textContent = formatIndianNumber(target) + suffix;
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count-target'), 10);
        const suffix = counter.getAttribute('data-count-suffix') || '';
        counter.textContent = formatIndianNumber(target) + suffix;
      });
      return;
    }

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count-target'), 10);
      const suffix = el.getAttribute('data-count-suffix') || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.floor(eased * target);

        el.textContent = formatIndianNumber(current) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = formatIndianNumber(target) + suffix;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  /* =================================================================
     9. TESTIMONIAL CAROUSEL
     ================================================================= */

  function initTestimonialCarousel() {
    const carousel = qs('.testimonial-carousel');
    if (!carousel) return;

    const track = qs('.carousel-track', carousel);
    const slides = qsa('.carousel-slide', carousel);
    const prevBtn = qs('.carousel-prev', carousel);
    const nextBtn = qs('.carousel-next', carousel);
    const dotsContainer = qs('.carousel-dots', carousel);
    const liveRegion = qs('.carousel-live-region', carousel);

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTO_ADVANCE_MS = 6000;

    // Touch state
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50;

    // Create dot indicators if container exists
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1) + ' of ' + slides.length);
        if (i === 0) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-current', 'true');
        }
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;

      // Update track position
      track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';

      // Update slides
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        slide.setAttribute('tabindex', i === currentIndex ? '0' : '-1');
      });

      // Update dots
      if (dotsContainer) {
        const dots = qsa('.carousel-dot', dotsContainer);
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === currentIndex);
          if (i === currentIndex) {
            dot.setAttribute('aria-current', 'true');
          } else {
            dot.removeAttribute('aria-current');
          }
        });
      }

      // Announce to screen readers
      if (liveRegion) {
        liveRegion.textContent = 'Testimonial ' + (currentIndex + 1) + ' of ' + slides.length;
      }
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Auto-advance
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, AUTO_ADVANCE_MS);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    // Button handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    // Pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', (e) => {
      if (!carousel.contains(e.relatedTarget)) {
        startAutoPlay();
      }
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          stopAutoPlay();
          startAutoPlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          stopAutoPlay();
          startAutoPlay();
          break;
        default:
          break;
      }
    });

    // Touch swipe support
    track.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
      },
      { passive: true }
    );

    track.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startAutoPlay();
      },
      { passive: true }
    );

    // Initialise
    goToSlide(0);
    startAutoPlay();
  }

  /* =================================================================
     10. DONATION FORM  (on /pages/donate.html)
     ================================================================= */

  function initDonationForm() {
    const form = qs('#donation-form');
    if (!form) return;

    /* -------- DOM References -------- */
    const amountBtns = qsa('.amount-preset-btn', form);
    const customAmountWrap = qs('.custom-amount-wrap', form);
    const customAmountInput = qs('#custom-amount', form);
    const amountDisplay = qs('.selected-amount-display', form);
    const donorName = qs('#donor-name', form);
    const donorEmail = qs('#donor-email', form);
    const donorPhone = qs('#donor-phone', form);
    const donorPan = qs('#donor-pan', form);
    const submitBtn = qs('.donate-submit-btn', form);
    const formSteps = qsa('.form-step', form);
    const successPanel = qs('.donation-success', form);
    const errorPanel = qs('.donation-error', form);
    const retryBtn = qs('.donation-retry-btn', form);
    const disclaimer = qs('.prototype-disclaimer');

    const MIN_AMOUNT = 100;
    const MAX_AMOUNT = 1000000; // ₹10,00,000

    let selectedAmount = 0;
    let isSubmitting = false;

    /* -------- Helpers -------- */

    function showError(input, msg) {
      const errEl = qs('.field-error', input.closest('.form-field'));
      if (errEl) {
        errEl.textContent = msg;
        errEl.setAttribute('aria-hidden', 'false');
      }
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
      const errEl = qs('.field-error', input.closest('.form-field'));
      if (errEl) {
        errEl.textContent = '';
        errEl.setAttribute('aria-hidden', 'true');
      }
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }

    function formatAmountDisplay(val) {
      return '₹' + formatIndianNumber(val);
    }

    function updateAmountDisplay() {
      if (amountDisplay) {
        amountDisplay.textContent = selectedAmount > 0 ? formatAmountDisplay(selectedAmount) : '';
      }
      updateMotivationVisualizer(selectedAmount);
    }

    function updateMotivationVisualizer(amount) {
      const childCountEl = qs('#impact-child-count');
      const childLabelEl = qs('#impact-child-label');
      const descEl = qs('#impact-description-text');
      const avatarsRow = qs('#school-avatars-row');
      const progressFill = qs('#impact-progress-fill');
      const daysEl = qs('#metric-school-days');
      const toolkitsEl = qs('#metric-toolkits');
      const taxBadge = qs('#tax-savings-badge');
      const submitBtn = qs('.donate-submit-btn', form);

      const amt = amount > 0 ? amount : 1000;
      const children = Math.max(1, Math.floor(amt / 500));

      if (childCountEl) childCountEl.textContent = children;
      if (childLabelEl) {
        childLabelEl.textContent = children === 1 ? 'Child Stepping Into School' : 'Children Stepping Into School This Year';
      }

      if (descEl) {
        if (amt < 1000) {
          descEl.textContent = `Your systemic contribution of ₹${formatIndianNumber(amt)} provides foundational literacy & numeracy (FLN) curriculum, bilingual readers, and continuous teacher support for ${children} child in a government primary school.`;
        } else if (amt < 2500) {
          descEl.textContent = `Your ₹${formatIndianNumber(amt)} gift rescues children from child labour: funding intensive residential bridge course care, nutrition, and mainstreaming into Class 6 for ${children} children.`;
        } else if (amt < 5000) {
          descEl.textContent = `Your ₹${formatIndianNumber(amt)} systemic investment revitalizes an entire government school: coaching public school teachers, providing learning labs, and activating parent School Management Committees for ${children} children.`;
        } else {
          descEl.textContent = `Your transformative contribution of ₹${formatIndianNumber(amt)} mobilizes an entire Gram Panchayat into a certified Child Labour Free Zone (CLFZ): saturating habitations and safeguarding ${children} children permanently.`;
        }
      }

      if (taxBadge) {
        taxBadge.textContent = `🛡️ 80G Tax Exemption: Saves ~₹${formatIndianNumber(Math.max(50, Math.floor(amt * 0.25)))} on Taxes`;
      }

      if (daysEl) {
        daysEl.textContent = `${children * 120} Days`;
      }

      if (toolkitsEl) {
        toolkitsEl.textContent = `${children} Systemic Kits`;
      }

      if (progressFill) {
        const pct = Math.min(100, Math.max(15, (amt / 5000) * 100));
        progressFill.style.width = pct + '%';
      }

      if (avatarsRow) {
        let pills = '';
        const displayCount = Math.min(children, 5);
        for (let i = 1; i <= displayCount; i++) {
          pills += `<span class="school-child-pill">🎒 Child ${i}: Rescued &amp; Enrolled in School</span> `;
        }
        if (children > 5) {
          pills += `<span class="school-child-pill bonus-pill">+${children - 5} More Children Protected</span>`;
        }
        avatarsRow.innerHTML = pills;
      }

      if (submitBtn) {
        submitBtn.textContent = `Proceed to Secure Payment • ₹${formatIndianNumber(amt)}`;
      }
    }

    function validateEmail(email) {
      return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    function validatePhone(phone) {
      return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''));
    }

    function validatePan(pan) {
      return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());
    }

    function goToStep(stepName) {
      formSteps.forEach((step) => {
        step.classList.toggle('is-active', step.dataset.step === stepName);
        step.setAttribute('aria-hidden', step.dataset.step !== stepName ? 'true' : 'false');
      });
    }

    /* -------- Amount Preset Buttons -------- */
    amountBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-amount');

        // De-select all
        amountBtns.forEach((b) => {
          b.classList.remove('is-selected');
          b.setAttribute('aria-pressed', 'false');
        });

        if (value === 'custom') {
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
          if (customAmountWrap) customAmountWrap.classList.add('is-visible');
          if (customAmountInput) {
            customAmountInput.focus();
            selectedAmount = parseInt(customAmountInput.value, 10) || 0;
          }
        } else {
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
          if (customAmountWrap) customAmountWrap.classList.remove('is-visible');
          selectedAmount = parseInt(value, 10);
          trackEvent('donation_amount_select', value);
        }

        updateAmountDisplay();
      });
    });

    /* -------- Custom Amount Input -------- */
    if (customAmountInput) {
      customAmountInput.addEventListener('input', () => {
        const raw = customAmountInput.value.replace(/[^\d]/g, '');
        customAmountInput.value = raw;
        selectedAmount = parseInt(raw, 10) || 0;
        updateAmountDisplay();

        if (selectedAmount > 0) {
          if (selectedAmount < MIN_AMOUNT) {
            showError(customAmountInput, 'Minimum donation amount is ₹100');
          } else if (selectedAmount > MAX_AMOUNT) {
            showError(customAmountInput, 'Maximum donation amount is ₹10,00,000');
          } else {
            clearError(customAmountInput);
          }
        } else {
          clearError(customAmountInput);
        }
      });
    }

    /* -------- Real-time Validation -------- */
    if (donorName) {
      donorName.addEventListener('blur', () => {
        if (donorName.value.trim().length < 2) {
          showError(donorName, 'Please enter your full name');
        } else {
          clearError(donorName);
        }
      });
    }

    if (donorEmail) {
      donorEmail.addEventListener('blur', () => {
        if (!validateEmail(donorEmail.value.trim())) {
          showError(donorEmail, 'Please enter a valid email address');
        } else {
          clearError(donorEmail);
        }
      });
    }

    if (donorPhone) {
      donorPhone.addEventListener('blur', () => {
        if (!validatePhone(donorPhone.value.trim())) {
          showError(donorPhone, 'Please enter a valid 10-digit Indian mobile number');
        } else {
          clearError(donorPhone);
        }
      });
      donorPhone.addEventListener('input', () => {
        donorPhone.value = donorPhone.value.replace(/[^\d]/g, '').slice(0, 10);
      });
    }

    if (donorPan) {
      donorPan.addEventListener('blur', () => {
        const val = donorPan.value.trim();
        if (val.length > 0 && !validatePan(val)) {
          showError(donorPan, 'PAN format: ABCDE1234F');
        } else {
          clearError(donorPan);
        }
      });
      donorPan.addEventListener('input', () => {
        donorPan.value = donorPan.value.toUpperCase().slice(0, 10);
      });
    }

    /* -------- Form Submit -------- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      // Validate amount
      if (selectedAmount < MIN_AMOUNT) {
        if (customAmountInput && customAmountWrap && customAmountWrap.classList.contains('is-visible')) {
          showError(customAmountInput, 'Minimum donation amount is ₹100');
          customAmountInput.focus();
        } else {
          // Show general error — try to find an amount error container
          const amountError = qs('.amount-error', form);
          if (amountError) {
            amountError.textContent = 'Please select or enter a donation amount (minimum ₹100)';
            amountError.setAttribute('aria-hidden', 'false');
          }
        }
        return;
      }

      if (selectedAmount > MAX_AMOUNT) {
        if (customAmountInput) {
          showError(customAmountInput, 'Maximum donation amount is ₹10,00,000');
          customAmountInput.focus();
        }
        return;
      }

      // Validate donor details
      let valid = true;

      if (donorName && donorName.value.trim().length < 2) {
        showError(donorName, 'Please enter your full name');
        if (valid) donorName.focus();
        valid = false;
      }

      if (donorEmail && !validateEmail(donorEmail.value.trim())) {
        showError(donorEmail, 'Please enter a valid email address');
        if (valid) donorEmail.focus();
        valid = false;
      }

      if (donorPhone && !validatePhone(donorPhone.value.trim())) {
        showError(donorPhone, 'Please enter a valid 10-digit Indian mobile number');
        if (valid) donorPhone.focus();
        valid = false;
      }

      if (donorPan && donorPan.value.trim().length > 0 && !validatePan(donorPan.value.trim())) {
        showError(donorPan, 'PAN format: ABCDE1234F');
        if (valid) donorPan.focus();
        valid = false;
      }

      if (!valid) return;

      // Begin processing
      isSubmitting = true;
      trackEvent('donation_start', formatAmountDisplay(selectedAmount));

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.setAttribute('aria-busy', 'true');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML =
          '<span class="spinner" aria-hidden="true"></span> Processing…';

        // Store original text for restoration
        submitBtn.dataset.originalText = originalText;
      }

      goToStep('processing');

      // Simulated payment flow (3-second delay)
      setTimeout(() => {
        // Simulate random success (90% chance) / failure
        const isSuccess = Math.random() < 0.9;

        if (isSuccess) {
          goToStep('success');
          if (successPanel) {
            successPanel.setAttribute('aria-hidden', 'false');
            // Confetti-like subtle celebration: add an animation class
            successPanel.classList.add('celebrate');
          }
          trackEvent('donation_start', 'payment_success', formatAmountDisplay(selectedAmount));

          /* eslint-disable-next-line no-console */
          console.info(
            '[ASPIRE Prototype] Donation simulated — Amount: %s, Name: %s, Email: %s',
            formatAmountDisplay(selectedAmount),
            donorName ? donorName.value : 'N/A',
            donorEmail ? donorEmail.value : 'N/A'
          );
        } else {
          goToStep('error');
          if (errorPanel) {
            errorPanel.setAttribute('aria-hidden', 'false');
          }
          trackEvent('donation_start', 'payment_failed', formatAmountDisplay(selectedAmount));
        }

        // Reset button
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = submitBtn.dataset.originalText || 'Donate Now';
        }
      }, 3000);
    });

    // Retry button
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        goToStep('details');
        if (errorPanel) errorPanel.setAttribute('aria-hidden', 'true');
      });
    }

    // Show disclaimer
    if (disclaimer) {
      disclaimer.setAttribute('aria-hidden', 'false');
      disclaimer.classList.add('is-visible');
    }

    // Initialise default amount and motivation visualizer
    selectedAmount = 1000;
    updateAmountDisplay();

    trackEvent('donate_cta_click', 'page_loaded');
  }

  /* =================================================================
     11. PARTNERSHIP ENQUIRY FORM  (on /pages/partnerships.html)
     ================================================================= */

  function initPartnershipForm() {
    const form = qs('#partnership-form');
    if (!form) return;

    const submitBtn = qs('.partnership-submit-btn', form);
    const successMsg = qs('.partnership-success', form);
    const errorMsg = qs('.partnership-error', form);
    let isSubmitting = false;

    function showFieldError(input, msg) {
      const errEl = qs('.field-error', input.closest('.form-field'));
      if (errEl) {
        errEl.textContent = msg;
        errEl.setAttribute('aria-hidden', 'false');
      }
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }

    function clearFieldError(input) {
      const errEl = qs('.field-error', input.closest('.form-field'));
      if (errEl) {
        errEl.textContent = '';
        errEl.setAttribute('aria-hidden', 'true');
      }
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }

    // Real-time validation for required fields
    const requiredFields = qsa('[required]', form);
    requiredFields.forEach((field) => {
      field.addEventListener('blur', () => {
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
        } else {
          clearFieldError(field);
        }
      });
    });

    // Email validation
    const emailField = qs('input[type="email"]', form);
    if (emailField) {
      emailField.addEventListener('blur', () => {
        const val = emailField.value.trim();
        if (val && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(val)) {
          showFieldError(emailField, 'Please enter a valid email address');
        } else if (val) {
          clearFieldError(emailField);
        }
      });
    }

    // Phone validation
    const phoneField = qs('input[type="tel"]', form);
    if (phoneField) {
      phoneField.addEventListener('blur', () => {
        const val = phoneField.value.trim().replace(/\s+/g, '');
        if (val && !/^[6-9]\d{9}$/.test(val)) {
          showFieldError(phoneField, 'Please enter a valid 10-digit Indian mobile number');
        } else if (val) {
          clearFieldError(phoneField);
        }
      });
      phoneField.addEventListener('input', () => {
        phoneField.value = phoneField.value.replace(/[^\d]/g, '').slice(0, 10);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      // Validate all required fields
      let valid = true;
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
          if (!firstInvalid) firstInvalid = field;
          valid = false;
        }
      });

      // Validate email
      if (emailField) {
        const val = emailField.value.trim();
        if (val && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(val)) {
          showFieldError(emailField, 'Please enter a valid email address');
          if (!firstInvalid) firstInvalid = emailField;
          valid = false;
        }
      }

      // Validate phone
      if (phoneField) {
        const val = phoneField.value.trim().replace(/\s+/g, '');
        if (val && !/^[6-9]\d{9}$/.test(val)) {
          showFieldError(phoneField, 'Please enter a valid 10-digit Indian mobile number');
          if (!firstInvalid) firstInvalid = phoneField;
          valid = false;
        }
      }

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Begin submission
      isSubmitting = true;
      trackEvent('partnership_form_submit', 'submitted');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.innerHTML =
          '<span class="spinner" aria-hidden="true"></span> Submitting…';
      }

      // Simulated submission (since there is no backend)
      setTimeout(() => {
        // Collect form data for console logging
        const formData = {};
        qsa('input, textarea, select', form).forEach((field) => {
          if (field.name) {
            formData[field.name] = field.value;
          }
        });

        /* eslint-disable-next-line no-console */
        console.info(
          '[ASPIRE Prototype] Partnership enquiry submitted (no backend):\n',
          formData
        );

        // Show success
        if (successMsg) {
          successMsg.classList.add('is-visible');
          successMsg.setAttribute('aria-hidden', 'false');
          successMsg.textContent =
            'Thank you for your interest in partnering with ASPIRE! This is a prototype — for actual partnership enquiries, please email partnerships@aspire-india.org or visit aspire-india.org.';
        }
        if (errorMsg) {
          errorMsg.classList.remove('is-visible');
          errorMsg.setAttribute('aria-hidden', 'true');
        }

        // Reset
        form.reset();
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = 'Submit Enquiry';
        }
      }, 2000);
    });

    trackEvent('partnership_form_start', 'page_loaded');
  }

  /* =================================================================
     12. ACTIVE NAVIGATION STATE
     ================================================================= */

  function initActiveNavState() {
    const navLinks = qsa('.nav-link, .mobile-nav-link');
    if (!navLinks.length) return;

    // Determine current page
    const currentPath = window.location.pathname.replace(/\/$/, '').replace(/\/index\.html$/, '');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalize href
      let linkPath = href;
      // Handle relative paths
      if (!linkPath.startsWith('/') && !linkPath.startsWith('http')) {
        try {
          linkPath = new URL(href, window.location.origin).pathname;
        } catch (e) {
          return;
        }
      }
      linkPath = linkPath.replace(/\/$/, '').replace(/\/index\.html$/, '');

      if (linkPath === currentPath || (currentPath === '' && (linkPath === '/' || linkPath === ''))) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // On homepage: highlight active section during scroll
    const isHomepage =
      currentPath === '' ||
      currentPath === '/' ||
      currentPath.endsWith('/index.html');

    if (isHomepage) {
      initHomepageSectionHighlight(navLinks);
    }
  }

  function initHomepageSectionHighlight(navLinks) {
    const sections = qsa('section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === '#' + sectionId) {
              link.classList.add('is-active');
              link.setAttribute('aria-current', 'true');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('is-active');
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* =================================================================
     13. BACK-TO-TOP BUTTON
     ================================================================= */

  function initBackToTop() {
    const btn = qs('.back-to-top');
    if (!btn) return;

    const SCROLL_THRESHOLD = 500;

    function toggleVisibility() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        btn.classList.add('is-visible');
        btn.setAttribute('aria-hidden', 'false');
      } else {
        btn.classList.remove('is-visible');
        btn.setAttribute('aria-hidden', 'true');
      }
    }

    btn.addEventListener('click', () => {
      if (motionOk()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      trackEvent('navigation', 'back_to_top');
    });

    window.addEventListener('scroll', throttle(toggleVisibility, 100), { passive: true });
    toggleVisibility();
  }

  /* =================================================================
     14. SKIP-TO-CONTENT LINK
     ================================================================= */

  function initSkipToContent() {
    const skipLink = qs('.skip-to-content');
    if (!skipLink) return;

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = skipLink.getAttribute('href');
      const target = qs(targetId);
      if (!target) return;

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });

      if (motionOk()) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }

      target.addEventListener(
        'blur',
        () => target.removeAttribute('tabindex'),
        { once: true }
      );
    });
  }

  /* =================================================================
     15. IMAGE LAZY LOADING ENHANCEMENT
     ================================================================= */

  function initLazyLoading() {
    // If native lazy loading is supported, let the browser handle it
    if ('loading' in HTMLImageElement.prototype) {
      // Ensure all images intended for lazy loading have the attribute
      qsa('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      });
      return;
    }

    // Fallback: IntersectionObserver-based lazy loading
    if (!('IntersectionObserver' in window)) {
      // Ultimate fallback: load all images immediately
      qsa('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
      return;
    }

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.classList.add('lazy-loaded');
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          lazyObserver.unobserve(img);
        });
      },
      { rootMargin: '200px 0px' }
    );

    qsa('img[data-src]').forEach((img) => lazyObserver.observe(img));
  }

  /* =================================================================
     16. GEOGRAPHIC SVG MAP (HOMEPAGE)
     ================================================================= */

  function initGeographicMap() {
    const mapContainer = qs('#india-map-container') || qs('.india-map-container');
    if (!mapContainer) return;

    const mapData = window.INDIA_MAP_DATA;
    if (!mapData || !Array.isArray(mapData.locations)) return;

    // Exact ASPIRE Operational Footprint by State ID (matching SVG state IDs)
    const activeStates = {
      or: {
        name: 'Odisha',
        shortLabel: 'Odisha',
        tag: 'Primary Saturation State',
        districts: 'Keonjhar, Sundargarh, Jajpur & Dhenkanal (4 Districts • 19 Blocks)',
        tooltipStat: '6,31,148 Children • 3,679 Govt. Schools',
        metrics: [
          { val: '6,31,148', lbl: 'Children (3–16 yrs)' },
          { val: '3,679', lbl: 'Government Schools' },
          { val: '4,600', lbl: 'Anganwadi Centres' },
          { val: '6,487', lbl: 'Habitations Covered' },
        ],
        summary: 'Flagship Education Signature Program spanning 415 Gram Panchayats & 5.63 lakh households with full Child Labour Free Zone saturation, Foundational Literacy & Numeracy (FLN), and CERCs.',
        labelOffset: { dx: 0, dy: 4, tx: 9, ty: 6, anchor: 'start' },
      },
      jh: {
        name: 'Jharkhand',
        shortLabel: 'Jharkhand',
        tag: 'Deep Tribal & Forest Belt',
        districts: 'West Singhbhum & Saranda Forest (18 Administrative Blocks)',
        tooltipStat: '92,439 Children • 2,084 Govt. Schools',
        metrics: [
          { val: '92,439', lbl: 'Children (3–16 yrs)' },
          { val: '2,084', lbl: 'Government Schools' },
          { val: '2,348', lbl: 'Anganwadi Centres' },
          { val: '6,519', lbl: 'Habitations Covered' },
        ],
        summary: 'Working across 217 Gram Panchayats & 2.99 lakh households in West Singhbhum, operating the Saranda Girls\u2019 Residential Bridge Course alongside government schools & Anganwadis.',
        labelOffset: { dx: -4, dy: 0, tx: -9, ty: 2, anchor: 'end' },
      },
      wb: {
        name: 'West Bengal',
        shortLabel: 'West Bengal',
        tag: 'Community Saturation Belt',
        districts: 'West Midnapore (Kharagpur-1), Purulia & Bankura',
        tooltipStat: '23,342+ Children • 473 Habitations',
        metrics: [
          { val: '23,342+', lbl: 'Children (3–16 yrs)' },
          { val: '473', lbl: 'Habitations Mobilized' },
          { val: '23,399+', lbl: 'Households Reached' },
          { val: '4', lbl: 'Core Anchals Saturated' },
        ],
        summary: 'Strengthening rural government primary schools across Arjuni, Kalaikunda, Borkola & Hariatara anchals along with adolescent empowerment and teacher circles in Purulia & Bankura.',
        labelOffset: { dx: 10, dy: 14, tx: 9, ty: 5, anchor: 'start' },
      },
      ct: {
        name: 'Chhattisgarh',
        shortLabel: 'Chhattisgarh',
        tag: 'Tribal Public School Belt',
        districts: 'Tribal-Dominated Aspirational Blocks',
        tooltipStat: 'Public School Strengthening • FLN & SMC Ownership',
        metrics: [
          { val: '100%', lbl: 'Govt. School Focus' },
          { val: 'FLN', lbl: 'Activity-Based Pedagogy' },
          { val: 'SMC', lbl: 'Parent Co-Governance' },
          { val: 'CLFZ', lbl: 'Child Protection Mobilization' },
        ],
        summary: 'Education interventions in tribal-dominated regions strengthening existing public primary schools, foundational reading fluency, and Gram Panchayat accountability.',
        labelOffset: { dx: -8, dy: 2, tx: -9, ty: 4, anchor: 'end' },
      },
      br: {
        name: 'Bihar',
        shortLabel: 'Bihar',
        tag: 'Foundational Learning Belt',
        districts: 'Gaya & Underserved Rural Clusters',
        tooltipStat: 'Community Monitoring & Foundational Learning',
        metrics: [
          { val: 'FLN', lbl: 'Foundational Literacy Kits' },
          { val: 'NRBC', lbl: 'Bridge Course Catch-Up' },
          { val: 'VEC', lbl: 'Village Education Committees' },
          { val: '99%', lbl: 'Transition Retention Target' },
        ],
        summary: 'Equipping rural primary teachers with bilingual teaching-learning tools and engaging Village Education Committees to keep every child learning in public classrooms.',
        labelOffset: { dx: 0, dy: -6, tx: 9, ty: -3, anchor: 'start' },
      },
      dl: {
        name: 'Delhi NCR',
        shortLabel: 'Delhi',
        tag: 'National Hub & Urban Education',
        districts: 'New Delhi (Sarvodaya Enclave HQ) & Urban Settlements',
        tooltipStat: 'National Secretariat • Policy & Urban Learning',
        metrics: [
          { val: 'HQ', lbl: 'National Secretariat' },
          { val: 'Urban', lbl: 'Delhi Education Project' },
          { val: '3,389', lbl: 'National Volunteer Network' },
          { val: '2,534', lbl: 'Team Nationwide' },
        ],
        summary: 'Houses ASPIRE\u2019s National Secretariat, research & monitoring cell, CSR institutional alliances, and urban education support programmes for vulnerable migrant families.',
        labelOffset: { dx: -4, dy: -6, tx: 9, ty: 3, anchor: 'start' },
      },
    };

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', mapData.viewBox || '0 0 612 696');
    svg.setAttribute('class', 'india-map-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Interactive Map of India highlighting ASPIRE operational states: Odisha, Jharkhand, West Bengal, Chhattisgarh, Bihar, and Delhi NCR');

    const baseGroup = document.createElementNS(svgNS, 'g');
    const activeGroup = document.createElementNS(svgNS, 'g');
    const pinGroup = document.createElementNS(svgNS, 'g');

    svg.appendChild(baseGroup);
    svg.appendChild(activeGroup);
    svg.appendChild(pinGroup);

    const stateNodes = {};
    const pinNodes = {};

    // First render all 36 Indian states & UTs cleanly
    mapData.locations.forEach((loc) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', loc.path);
      path.setAttribute('data-state-id', loc.id);
      path.setAttribute('aria-label', loc.name);

      if (activeStates[loc.id]) {
        path.setAttribute('class', 'map-state-shape map-state-active');
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', `${activeStates[loc.id].name}: ${activeStates[loc.id].tooltipStat}`);
        activeGroup.appendChild(path);
        stateNodes[loc.id] = path;
      } else {
        path.setAttribute('class', 'map-state-shape');
        baseGroup.appendChild(path);
      }
    });

    // Clear container except tooltip before appending SVG
    const tooltip = qs('#india-map-tooltip', mapContainer) || qs('.map-tooltip', mapContainer);
    mapContainer.insertBefore(svg, tooltip || mapContainer.firstChild);

    // Add interactive pulsing pin dots at true centroids of highlighted states
    Object.keys(activeStates).forEach((id) => {
      const path = stateNodes[id];
      if (!path) return;
      const bbox = path.getBBox();
      const offset = activeStates[id].labelOffset || { dx: 0, dy: 0 };
      const cx = bbox.x + bbox.width / 2 + offset.dx;
      const cy = bbox.y + bbox.height / 2 + offset.dy;

      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'map-pin-group');
      g.setAttribute('data-state-id', id);

      const pulseCircle = document.createElementNS(svgNS, 'circle');
      pulseCircle.setAttribute('cx', cx.toFixed(1));
      pulseCircle.setAttribute('cy', cy.toFixed(1));
      pulseCircle.setAttribute('r', '10');
      pulseCircle.setAttribute('class', 'map-pin-pulse');

      const dotCircle = document.createElementNS(svgNS, 'circle');
      dotCircle.setAttribute('cx', cx.toFixed(1));
      dotCircle.setAttribute('cy', cy.toFixed(1));
      dotCircle.setAttribute('r', '4.8');
      dotCircle.setAttribute('class', 'map-pin-dot');

      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', (cx + (offset.tx ?? 8)).toFixed(1));
      label.setAttribute('y', (cy + (offset.ty ?? 3)).toFixed(1));
      label.setAttribute('text-anchor', offset.anchor || 'start');
      label.setAttribute('class', 'map-pin-label');
      label.textContent = activeStates[id].shortLabel;

      g.appendChild(pulseCircle);
      g.appendChild(dotCircle);
      g.appendChild(label);
      pinGroup.appendChild(g);
      pinNodes[id] = g;
    });

    // Inspector UI elements
    const pills = qsa('#india-state-pills .state-pill-btn');
    const tagEl = qs('#state-detail-tag');
    const nameEl = qs('#state-detail-name');
    const distEl = qs('#state-detail-districts');
    const metricsEl = qs('#state-metrics-grid');
    const summaryEl = qs('#state-detail-summary');
    const tooltipTitle = qs('#map-tooltip-title');
    const tooltipInfo = qs('#map-tooltip-info');

    let selectedStateId = 'or';

    function selectState(stateId) {
      const info = activeStates[stateId];
      if (!info) return;
      selectedStateId = stateId;

      Object.keys(stateNodes).forEach((id) => {
        stateNodes[id].classList.toggle('is-selected', id === stateId);
        if (pinNodes[id]) pinNodes[id].classList.toggle('is-selected', id === stateId);
      });

      pills.forEach((btn) => {
        btn.classList.toggle('is-active', btn.getAttribute('data-state-id') === stateId);
      });

      if (tagEl) tagEl.textContent = info.tag;
      if (nameEl) nameEl.textContent = info.name;
      if (distEl) distEl.textContent = info.districts;
      if (summaryEl) summaryEl.textContent = info.summary;
      if (metricsEl) {
        metricsEl.innerHTML = info.metrics
          .map(
            (m) => `
              <div class="state-metric-box">
                <div class="state-metric-val">${m.val}</div>
                <div class="state-metric-lbl">${m.lbl}</div>
              </div>
            `
          )
          .join('');
      }
    }

    function showTooltip(stateId) {
      if (!tooltip || !activeStates[stateId]) return;
      const info = activeStates[stateId];
      const anchor = pinNodes[stateId] || stateNodes[stateId];
      if (tooltipTitle) tooltipTitle.textContent = info.name;
      if (tooltipInfo) tooltipInfo.textContent = info.tooltipStat;

      tooltip.classList.add('is-visible');
      tooltip.setAttribute('aria-hidden', 'false');

      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();
        const left = rect.left - containerRect.left + rect.width / 2;
        const top = rect.top - containerRect.top - 10;
        tooltip.style.left = Math.max(85, Math.min(containerRect.width - 85, left)) + 'px';
        tooltip.style.top = Math.max(48, top) + 'px';
        tooltip.style.transform = 'translate(-50%, -100%)';
      }
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }

    // Bind events on both SVG state shapes and pins
    Object.keys(activeStates).forEach((id) => {
      const targets = [stateNodes[id], pinNodes[id]].filter(Boolean);
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          stateNodes[id].classList.add('is-hovered');
          showTooltip(id);
          selectState(id);
        });
        el.addEventListener('mouseleave', () => {
          stateNodes[id].classList.remove('is-hovered');
          hideTooltip();
        });
        el.addEventListener('click', () => {
          selectState(id);
          showTooltip(id);
          trackEvent('map_state_click', 'clicked', activeStates[id].name);
        });
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectState(id);
            showTooltip(id);
          }
        });
      });
    });

    // Bind quick-select pill buttons
    pills.forEach((btn) => {
      const id = btn.getAttribute('data-state-id');
      btn.addEventListener('mouseenter', () => selectState(id));
      btn.addEventListener('click', () => {
        selectState(id);
        trackEvent('map_pill_click', 'clicked', activeStates[id] ? activeStates[id].name : id);
      });
    });

    // Default initial state
    selectState(selectedStateId);
  }

  /* =================================================================
     16B. HERO STORY SLIDESHOW & DIRECTORY TABS
     ================================================================= */
  function initHeroSlideshow() {
    const bgSlides = qsa('#hero-bg-slider .hero-bg-slide');
    if (!bgSlides.length) return;

    const dots = qsa('#hero-bg-dots .scene-dot, #hero-bg-dots .story-dot');
    const prevBtn = qs('#hero-prev-btn');
    const nextBtn = qs('#hero-next-btn');
    const locEl = qs('#hero-story-location');
    const capEl = qs('#hero-story-caption');

    const storyData = [
      {
        location: 'Joyful Classrooms • Odisha',
        caption: 'Turning village public schools into joyful learning hubs.'
      },
      {
        location: 'Foundational Learning • FLN',
        caption: 'Equipping public teachers with activity-based bilingual kits.'
      },
      {
        location: 'Universal Access • 80,000+ Children',
        caption: 'Bringing out-of-school children back into public schools.'
      },
      {
        location: 'Child Agency • 14,895 Habitations',
        caption: 'Building student confidence and community-led child safety.'
      }
    ];

    let currentIndex = 0;
    let timer = null;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = bgSlides.length - 1;
      } else if (index >= bgSlides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      bgSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });

      if (locEl && capEl && storyData[currentIndex]) {
        locEl.textContent = storyData[currentIndex].location;
        capEl.textContent = storyData[currentIndex].caption;
      }
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5500);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        startTimer();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide') || '0', 10);
        goToSlide(slideIdx);
        startTimer();
      });
    });

    const heroSection = qs('.hero-immersive-fullscreen');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopTimer);
      heroSection.addEventListener('mouseleave', startTimer);

      // Mobile touch swipe support for hero slideshow
      let touchStartX = 0;
      heroSection.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches.length) {
          touchStartX = e.changedTouches[0].screenX;
        }
      }, { passive: true });
      heroSection.addEventListener('touchend', (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 48) {
          goToSlide(diff < 0 ? currentIndex + 1 : currentIndex - 1);
          startTimer();
        }
      }, { passive: true });
    }

    startTimer();
  }

  /* =================================================================
     16D. INTERACTIVE ECOSYSTEM EXPLORER (SECTION 2)
     ================================================================= */
  function initEcosystemExplorer() {
    const nodes = qsa('#ecosystem-nodes .eco-node');
    const titleEl = qs('#eco-spotlight-title');
    const descEl = qs('#eco-spotlight-desc');

    if (nodes.length && titleEl && descEl) {
      function activateNode(node) {
        nodes.forEach((n) => n.classList.remove('is-active'));
        node.classList.add('is-active');
        titleEl.textContent = node.getAttribute('data-eco-title') || '';
        descEl.textContent = node.getAttribute('data-eco-desc') || '';
      }

      nodes.forEach((node) => {
        node.addEventListener('mouseenter', () => activateNode(node));
        node.addEventListener('click', () => activateNode(node));
        node.addEventListener('focus', () => activateNode(node));
      });
    }
  }

  /* =================================================================
     16E. PILLARS & CORE BELIEFS MODAL POPUP CONTROLLER (DESKTOP & MOBILE)
     ================================================================= */
  function initPillarPopups() {
    const cards = qsa('.pillar-showcase-card[data-pillar-id]');
    const modal = qs('#pillar-detail-modal');
    if (!cards.length || !modal) return;

    const closeBtn = qs('#pillar-modal-close', modal);
    const dismissBtn = qs('#pillar-modal-dismiss', modal);
    const imgEl = qs('#pillar-modal-img', modal);
    const badgeEl = qs('#pillar-modal-badge', modal);
    const titleEl = qs('#pillar-modal-title', modal);
    const subheadEl = qs('#pillar-modal-subhead', modal);
    const label1El = qs('#pillar-modal-label-1', modal);
    const label2El = qs('#pillar-modal-label-2', modal);
    const problemEl = qs('#pillar-modal-problem', modal);
    const solutionEl = qs('#pillar-modal-solution', modal);
    const impactEl = qs('#pillar-modal-impact', modal);
    const ctaEl = qs('#pillar-modal-cta', modal);

    function openPillarModal(card) {
      if (imgEl) imgEl.src = card.getAttribute('data-pillar-img') || '';
      if (badgeEl) badgeEl.textContent = card.getAttribute('data-pillar-badge') || '';
      if (titleEl) titleEl.textContent = card.getAttribute('data-pillar-title') || '';
      if (subheadEl) subheadEl.textContent = card.getAttribute('data-pillar-subhead') || '';
      if (label1El) label1El.textContent = card.getAttribute('data-label-1') || 'The Ground Reality';
      if (label2El) label2El.textContent = card.getAttribute('data-label-2') || 'How ASPIRE Solves It';
      if (problemEl) problemEl.textContent = card.getAttribute('data-pillar-problem') || '';
      if (solutionEl) solutionEl.textContent = card.getAttribute('data-pillar-solution') || '';
      if (impactEl) impactEl.textContent = card.getAttribute('data-pillar-impact') || '';
      if (ctaEl) {
        ctaEl.href = card.getAttribute('data-pillar-link') || 'pages/programmes.html';
        ctaEl.innerHTML = (card.getAttribute('data-pillar-cta') || 'Learn More') + ' &rarr;';
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    function closePillarModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => openPillarModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPillarModal(card);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closePillarModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closePillarModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePillarModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closePillarModal();
      }
    });
  }

  function initTeamPopups() {
    const cards = qsa('.profile-showcase-card[data-member-name]');
    const modal = qs('#team-detail-modal');
    if (!cards.length || !modal) return;

    const closeBtn = qs('#team-modal-close', modal);
    const dismissBtn = qs('#team-modal-dismiss', modal);
    const imgEl = qs('#team-modal-img', modal);
    const badgeEl = qs('#team-modal-badge', modal);
    const nameEl = qs('#team-modal-name', modal);
    const roleEl = qs('#team-modal-role', modal);
    const bioEl = qs('#team-modal-bio', modal);
    const focusEl = qs('#team-modal-focus', modal);

    function openTeamModal(card) {
      if (imgEl) {
        imgEl.src = card.getAttribute('data-member-img') || '../images/dayaram.jpg';
        imgEl.alt = card.getAttribute('data-member-name') || 'Team member';
      }
      if (badgeEl) badgeEl.textContent = card.getAttribute('data-member-badge') || '';
      if (nameEl) nameEl.textContent = card.getAttribute('data-member-name') || '';
      if (roleEl) roleEl.textContent = card.getAttribute('data-member-role') || '';
      if (bioEl) bioEl.textContent = card.getAttribute('data-member-bio') || '';
      if (focusEl) focusEl.textContent = card.getAttribute('data-member-focus') || '';

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    function closeTeamModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => openTeamModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openTeamModal(card);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeTeamModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeTeamModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTeamModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeTeamModal();
      }
    });
  }

  function initDirectoryTabs() {
    const tabBtns = qsa('.dir-tab-btn');
    if (!tabBtns.length) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const category = btn.getAttribute('data-tab');
        const cards = qsa('.profile-card[data-category], .profile-showcase-card[data-category]');

        cards.forEach((card) => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = card.classList.contains('profile-showcase-card') ? 'block' : 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* =================================================================
     16C. GLOBAL SEARCH MODAL CONTROLLER
     ================================================================= */
  function initGlobalSearch() {
    const triggerBtns = qsa('.search-btn-trigger');
    const modal = qs('#search-modal');
    if (!modal) return;

    const input = qs('#global-search-input', modal);
    const closeBtn = qs('.search-close-btn', modal);
    const resultsContainer = qs('#search-results', modal) || qs('#search-results-list', modal) || qs('.search-results-container', modal);
    const isSubpage = window.location.pathname.includes('/pages/');

    function getRelativeUrl(targetUrl) {
      if (!isSubpage) return targetUrl;
      if (targetUrl.startsWith('pages/')) {
        return targetUrl.replace('pages/', '');
      }
      return '../' + targetUrl;
    }

    const searchIndex = [
      { title: 'The Three Pillars of Change', desc: 'Access, Learning, and Community Governance framework', url: 'index.html#pillars' },
      { title: 'Our Core Beliefs', desc: '4 foundational principles guiding ASPIRE India', url: 'index.html#beliefs' },
      { title: 'Our Reach Across India', desc: '1.5M children, 6,459 schools across 8 tribal districts', url: 'index.html#reach' },
      { title: 'OUR PARTNERS & DONORS', desc: 'Tata Steel, HDFC Parivartan, EkStep, Hans Foundation & more', url: 'index.html#partners' },
      { title: 'Donate Now & 80G Tax Exemption', desc: 'Instant impact motivation calculator & 50% tax deductions', url: 'pages/donate.html' },
      { title: 'Education Signature Program (ESP)', desc: 'Multi-state saturation model across Odisha, Jharkhand & West Bengal', url: 'pages/programmes.html' },
      { title: 'Residential Bridge Courses', desc: 'Saranda Girls Bridge Course for out-of-school tribal dropouts', url: 'pages/programmes.html' },
      { title: 'Learning Enhancement Programme (LEP)', desc: 'Foundational literacy and bilingual learning kits for primary grades', url: 'pages/programmes.html' },
      { title: 'Community Education Resource Centres (CERCs)', desc: 'Solar-powered digital learning sanctuaries in remote villages', url: 'pages/programmes.html' },
      { title: 'Child Labour Free Zones (CLFZ)', desc: '14,895 habitations mobilized into verified child labor free zones', url: 'pages/execution-model.html' },
      { title: 'Our Team & Leadership', desc: 'Dayaram (Executive Director), state program heads & field coordinators', url: 'pages/team.html' },
      { title: 'Board & Advisors', desc: 'Dr. N.V. Varghese (Chairperson), Dr. Shantha Sinha & governing body', url: 'pages/board-advisors.html' },
      { title: 'Accountability & Statutory Audits', desc: 'FCRA registrations, 12A, 80G, and annual reports', url: 'pages/trust-accountability.html' },
      { title: 'Careers at ASPIRE', desc: 'Grassroots opportunities for educators, researchers & field coordinators', url: 'pages/careers.html' },
      { title: 'Contact Us', desc: 'National Secretariat in New Delhi & state program offices', url: 'pages/contact.html' }
    ];

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (input) {
        input.value = '';
        renderResults('');
        setTimeout(() => input.focus(), 100);
      }
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }

    function renderResults(query) {
      if (!resultsContainer) return;
      const q = query.trim().toLowerCase();
      const matches = q
        ? searchIndex.filter(item => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q))
        : searchIndex.slice(0, 6);

      if (!matches.length) {
        resultsContainer.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching pages or programmes found. Try searching for "Pillars", "ESP", "Team", or "Donate".</div>';
        return;
      }

      resultsContainer.innerHTML = matches.map(item => `
        <a href="${getRelativeUrl(item.url)}" class="search-result-item">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-desc">${item.desc}</div>
        </a>
      `).join('');
    }

    triggerBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (input) {
      input.addEventListener('input', () => renderResults(input.value));
    }

    // Keyboard shortcut Cmd+K / Ctrl+K & Escape
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('is-open')) {
          closeModal();
        } else {
          openModal();
        }
      }
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* =================================================================
     17. INITIALISATION
     ================================================================= */

  // Core (all pages)
  initStickyHeader();
  initDesktopDropdowns();
  initMobileNav();
  initGlobalSearch();
  initSmoothScroll();
  initScrollReveal();
  initActiveNavState();
  initBackToTop();
  initSkipToContent();
  initLazyLoading();

  // Homepage-specific
  initHeroSlideshow();
  initEcosystemExplorer();
  initPillarPopups();
  initImpactCounters();
  initTestimonialCarousel();
  initGeographicMap();

  // Page-specific (safe to call on any page — they guard with DOM checks)
  initDonationForm();
  initPartnershipForm();
  initDirectoryTabs();
  initTeamPopups();

  // Track CTA clicks
  qsa('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const parts = (el.getAttribute('data-track') || '').split(':');
      trackEvent(parts[0] || 'cta', parts[1] || 'click', parts[2] || '');
    });
  });

  // Specific tracked CTAs
  const heroExploreBtn = qs('.hero-explore-btn');
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
      trackEvent('hero_explore_click', 'clicked');
    });
  }

  const donateCtas = qsa('.donate-cta');
  donateCtas.forEach((cta) => {
    cta.addEventListener('click', () => {
      trackEvent('donate_cta_click', 'clicked', cta.textContent.trim());
    });
  });
});
