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
    const mapContainer = qs('.india-map-container');
    if (!mapContainer) return;

    // State data – ASPIRE India's operational presence
    const stateData = {
      odisha: {
        name: 'Odisha',
        info: 'Education Signature Program across Keonjhar, Sundargarh, Jajpur & Dhenkanal districts. Foundational Literacy & Numeracy, Anganwadi support, and Community Education Resource Centres.',
      },
      jharkhand: {
        name: 'Jharkhand',
        info: 'Working in West Singhbhum district including Noamundi, Jagannathpur & Hatgamharia blocks. Saranda Girls\u2019 Residential Bridge Course and government school & Anganwadi support.',
      },
      'west-bengal': {
        name: 'West Bengal',
        info: 'Community-based education programmes, adolescent empowerment, and teacher capacity-building initiatives in underserved districts.',
      },
      chhattisgarh: {
        name: 'Chhattisgarh',
        info: 'Education interventions in tribal-dominated regions, strengthening public schooling systems and foundational learning.',
      },
      delhi: {
        name: 'Delhi',
        info: 'Urban education initiatives, policy advocacy, and programme coordination. ASPIRE\u2019s national office and strategic partnerships hub.',
      },
    };

    // Check if SVG map already exists in HTML (server-rendered)
    const existingSvg = qs('svg.india-map', mapContainer);
    if (existingSvg) {
      attachMapInteractions(existingSvg, stateData);
      return;
    }

    // Build a simplified SVG India outline map
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 600 700');
    svg.setAttribute('class', 'india-map');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Map of India highlighting ASPIRE operational states: Odisha, Jharkhand, West Bengal, Chhattisgarh, and Delhi');
    svg.setAttribute('xmlns', svgNS);

    // Simplified India outline
    const indiaOutline = document.createElementNS(svgNS, 'path');
    indiaOutline.setAttribute('class', 'india-outline');
    indiaOutline.setAttribute(
      'd',
      'M265,30 L290,25 L310,35 L340,30 L360,40 L385,35 L400,50 L420,55 ' +
      'L445,50 L460,60 L470,80 L480,100 L490,120 L485,140 L475,155 ' +
      'L490,170 L500,190 L495,210 L505,230 L510,250 L500,270 L490,290 ' +
      'L480,310 L470,330 L465,350 L475,370 L480,390 L470,410 L460,430 ' +
      'L445,445 L430,460 L415,470 L400,480 L385,500 L370,515 L355,530 ' +
      'L340,550 L325,565 L310,575 L295,590 L280,600 L265,610 L255,625 ' +
      'L245,640 L238,650 L232,645 L228,630 L220,615 L210,600 L195,585 ' +
      'L180,575 L165,560 L155,545 L145,525 L135,505 L130,490 L125,470 ' +
      'L120,450 L115,430 L110,410 L105,390 L108,370 L115,350 L120,330 ' +
      'L110,310 L100,295 L95,275 L100,255 L110,240 L120,225 L115,205 ' +
      'L110,185 L105,165 L110,145 L120,130 L135,120 L150,110 L165,95 ' +
      'L180,80 L195,65 L210,55 L225,45 L240,35 Z'
    );
    indiaOutline.setAttribute('fill', '#e8e8e8');
    indiaOutline.setAttribute('stroke', '#ccc');
    indiaOutline.setAttribute('stroke-width', '1.5');
    svg.appendChild(indiaOutline);

    // State regions (simplified polygons representing approximate positions)
    const stateShapes = [
      {
        id: 'delhi',
        d: 'M275,170 L285,165 L295,170 L295,180 L285,185 L275,180 Z',
        cx: 285,
        cy: 175,
      },
      {
        id: 'chhattisgarh',
        d: 'M330,320 L360,305 L385,315 L395,340 L390,365 L375,380 L355,385 L335,375 L320,355 L325,335 Z',
        cx: 358,
        cy: 345,
      },
      {
        id: 'jharkhand',
        d: 'M370,260 L400,250 L420,260 L425,280 L415,300 L395,310 L375,305 L365,285 Z',
        cx: 395,
        cy: 280,
      },
      {
        id: 'west-bengal',
        d: 'M415,230 L440,225 L455,240 L460,265 L455,290 L445,310 L430,320 L415,310 L410,290 L405,265 L410,245 Z',
        cx: 435,
        cy: 270,
      },
      {
        id: 'odisha',
        d: 'M380,310 L410,305 L435,320 L445,345 L440,370 L425,385 L405,390 L385,380 L370,360 L370,335 Z',
        cx: 410,
        cy: 350,
      },
    ];

    stateShapes.forEach((state) => {
      const group = document.createElementNS(svgNS, 'g');
      group.setAttribute('class', 'map-state');
      group.setAttribute('data-state', state.id);
      group.setAttribute('tabindex', '0');
      group.setAttribute('role', 'button');
      group.setAttribute(
        'aria-label',
        stateData[state.id].name + ': ' + stateData[state.id].info
      );

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', state.d);
      path.setAttribute('class', 'map-state-path');

      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', state.cx.toString());
      label.setAttribute('y', state.cy.toString());
      label.setAttribute('class', 'map-state-label');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dominant-baseline', 'central');
      label.setAttribute('aria-hidden', 'true');
      label.textContent = stateData[state.id].name;

      group.appendChild(path);
      group.appendChild(label);
      svg.appendChild(group);
    });

    mapContainer.insertBefore(svg, mapContainer.firstChild);
    attachMapInteractions(svg, stateData);
  }

  function attachMapInteractions(svg, stateData) {
    const tooltip = qs('.map-tooltip');
    const states = qsa('.map-state', svg);
    let activeState = null;

    function showTooltip(stateId, anchorElement) {
      if (!tooltip || !stateData[stateId]) return;

      const data = stateData[stateId];
      const titleEl = qs('.map-tooltip-title', tooltip);
      const infoEl = qs('.map-tooltip-info', tooltip);

      if (titleEl) titleEl.textContent = data.name;
      if (infoEl) infoEl.textContent = data.info;

      tooltip.classList.add('is-visible');
      tooltip.setAttribute('aria-hidden', 'false');

      // Position tooltip near the state
      if (anchorElement) {
        const rect = anchorElement.getBoundingClientRect();
        const containerRect = svg.closest('.india-map-container').getBoundingClientRect();

        const left = rect.left - containerRect.left + rect.width / 2;
        const top = rect.top - containerRect.top - 10;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.transform = 'translate(-50%, -100%)';
      }
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }

    states.forEach((stateGroup) => {
      const stateId = stateGroup.getAttribute('data-state');

      // Hover interactions
      stateGroup.addEventListener('mouseenter', () => {
        stateGroup.classList.add('is-hovered');
        showTooltip(stateId, stateGroup);
      });

      stateGroup.addEventListener('mouseleave', () => {
        stateGroup.classList.remove('is-hovered');
        if (activeState !== stateId) {
          hideTooltip();
        }
      });

      // Click/keyboard interactions
      stateGroup.addEventListener('click', () => {
        if (activeState === stateId) {
          activeState = null;
          stateGroup.classList.remove('is-active');
          hideTooltip();
        } else {
          // Deactivate previous
          states.forEach((s) => s.classList.remove('is-active'));
          activeState = stateId;
          stateGroup.classList.add('is-active');
          showTooltip(stateId, stateGroup);
          trackEvent('pillar_view', 'map_state_click', stateData[stateId].name);
        }
      });

      stateGroup.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          stateGroup.click();
        }
      });

      // Focus interactions
      stateGroup.addEventListener('focus', () => {
        showTooltip(stateId, stateGroup);
      });

      stateGroup.addEventListener('blur', () => {
        if (activeState !== stateId) {
          hideTooltip();
        }
      });
    });

    // Close tooltip on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeState) {
        states.forEach((s) => s.classList.remove('is-active'));
        activeState = null;
        hideTooltip();
      }
    });
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
        location: 'Joyful Learning Spaces • Keonjhar, Odisha',
        caption: 'Transforming public schools into joyful hubs of learning where children discover their potential.'
      },
      {
        location: 'Foundational Learning (FLN) • Classroom Transformation',
        caption: 'Empowering teachers with activity-based toolkits so every child builds solid reading & numeracy foundations.'
      },
      {
        location: 'Universal Access • 80,000+ Children Mainstreamed',
        caption: 'Ensuring children from tribal and mining habitations enroll, stay in school, and complete secondary education.'
      },
      {
        location: 'Empowering Child Agency • Democratic Public Education',
        caption: 'Cultivating leadership, curiosity, and confidence so children become changemakers in their communities.'
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
    }

    startTimer();
  }

  function initDirectoryTabs() {
    const tabBtns = qsa('.dir-tab-btn');
    if (!tabBtns.length) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const category = btn.getAttribute('data-tab');
        const cards = qsa('.profile-card[data-category]');

        cards.forEach((card) => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
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
  initImpactCounters();
  initTestimonialCarousel();
  initGeographicMap();

  // Page-specific (safe to call on any page — they guard with DOM checks)
  initDonationForm();
  initPartnershipForm();
  initDirectoryTabs();

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
