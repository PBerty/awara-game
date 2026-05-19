(function(root) {
  'use strict';

  var api = Object.freeze({});

  if (root) root.AWARA_MILOST = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
