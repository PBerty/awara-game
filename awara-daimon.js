(function(root) {
  'use strict';

  var api = Object.freeze({});

  if (root) root.AWARA_DAIMON = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
