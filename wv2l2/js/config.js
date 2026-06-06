/**
 * JoinTrix Domain Configuration
 * Detects current domain and maps checkout links to the correct payment processor.
 */
var JoinTrixConfig = (function () {
  'use strict';

  var host = window.location.hostname;

  // Checkout URLs keyed by domain
  var checkoutUrls = {
    'thejointrix.com': {
      '6pack': '#',
      '3pack': '#',
      '1pack': '#',
      processor: 'Buygoods'
    },
    'buyjointrix.com': {
      '6pack': '#',
      '3pack': '#',
      '1pack': '#',
      processor: 'ClickBank'
    },
    'usejointrix.com': {
      '6pack': '#',
      '3pack': '#',
      '1pack': '#',
      processor: 'PagAmerican'
    }
  };

  // Fall back to thejointrix.com for local/staging environments
  var current = checkoutUrls[host] || checkoutUrls['thejointrix.com'];

  return {
    /**
     * Returns the checkout URL for a given pack size.
     * @param {string} pack - "6pack", "3pack", or "1pack"
     */
    getCheckoutUrl: function (pack) {
      return current[pack] || '#';
    },

    /**
     * Returns the active payment processor name.
     */
    getProcessor: function () {
      return current.processor || 'Buygoods';
    },

    /**
     * Scans the DOM for elements with [data-checkout] and sets their href
     * to the appropriate checkout URL for the current domain.
     */
    initLinks: function () {
      var links = document.querySelectorAll('[data-checkout]');
      for (var i = 0; i < links.length; i++) {
        var pack = links[i].getAttribute('data-checkout');
        links[i].href = current[pack] || '#';
      }
    }
  };
})();

// Initialize checkout links once the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  JoinTrixConfig.initLinks();
});
