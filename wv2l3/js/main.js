/**
 * Nervecell Main Interactions
 * Mobile menu, FAQ accordion, smooth scroll, sticky header.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  1. Mobile Menu Toggle                                              */
  /* ------------------------------------------------------------------ */
  var hamburger = document.getElementById('hamburger-menu');
  var menuList = document.querySelector('.menu-list');

  if (hamburger && menuList) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      menuList.classList.toggle('active');
      document.body.classList.toggle('overflow-hidden');
    });

    // Close menu when any navigation link inside it is clicked
    var menuLinks = menuList.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        hamburger.classList.remove('open');
        menuList.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      });
    }
  }

  /** Helper: close mobile menu if it is currently open */
  function closeMobileMenu() {
    if (hamburger && menuList) {
      hamburger.classList.remove('open');
      menuList.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  }

  /* ------------------------------------------------------------------ */
  /*  2. FAQ Accordion (single-open)                                     */
  /* ------------------------------------------------------------------ */
  var headers = document.querySelectorAll('.faq-question');

  for (var h = 0; h < headers.length; h++) {
    headers[h].addEventListener('click', (function (clickedHeader) {
      return function () {
        var content = clickedHeader.nextElementSibling;
        var isOpen = clickedHeader.classList.contains('active');

        // Close every other open item first
        for (var j = 0; j < headers.length; j++) {
          if (headers[j] !== clickedHeader) {
            headers[j].classList.remove('active');
            var otherContent = headers[j].nextElementSibling;
            if (otherContent && otherContent.classList.contains('faq-answer')) {
              otherContent.classList.remove('open');
              otherContent.style.maxHeight = '0';
            }
          }
        }

        // Toggle the clicked item
        if (isOpen) {
          clickedHeader.classList.remove('active');
          if (content) {
            content.classList.remove('open');
            content.style.maxHeight = '0';
          }
        } else {
          clickedHeader.classList.add('active');
          if (content) {
            content.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }
      };
    })(headers[h]));
  }

  // Open the first FAQ item by default
  if (headers.length > 0) {
    headers[0].classList.add('active');
    var firstContent = headers[0].nextElementSibling;
    if (firstContent && firstContent.classList.contains('faq-answer')) {
      firstContent.classList.add('open');
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }

  /* ------------------------------------------------------------------ */
  /*  3. Smooth Scroll with Header Offset                                */
  /* ------------------------------------------------------------------ */
  var HEADER_OFFSET = 60; // px reserved for the sticky header

  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchorLinks.length; a++) {
    anchorLinks[a].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      closeMobileMenu();

      // Scroll to target with offset
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  4. Sticky Header Shadow                                            */
  /* ------------------------------------------------------------------ */
  var header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
});
