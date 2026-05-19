(function(root) {
  'use strict';

  var elementDefaultForms = Object.freeze({
    fire: 'phoenix',
    water: 'dolphin',
    earth: 'stag',
    air: 'owl',
    ether: 'swan'
  });

  var nakshatras = Object.freeze([
    { id: 'ashvini', name: 'Ashvini', form: 'stag' },
    { id: 'bharani', name: 'Bharani', form: 'elephant' },
    { id: 'krittika', name: 'Krittika', form: 'phoenix' },
    { id: 'rohini', name: 'Rohini', form: 'swan' },
    { id: 'mrigashira', name: 'Mrigashira', form: 'deer' },
    { id: 'ardra', name: 'Ardra', form: 'wolf' },
    { id: 'punarvasu', name: 'Punarvasu', form: 'swan' },
    { id: 'pushya', name: 'Pushya', form: 'dolphin' },
    { id: 'ashlesha', name: 'Ashlesha', form: 'naga' },
    { id: 'magha', name: 'Magha', form: 'lion' },
    { id: 'purva-phalguni', name: 'Purva Phalguni', form: 'tiger' },
    { id: 'uttara-phalguni', name: 'Uttara Phalguni', form: 'bear' },
    { id: 'hasta', name: 'Hasta', form: 'raven' },
    { id: 'chitra', name: 'Chitra', form: 'unicorn' },
    { id: 'swati', name: 'Swati', form: 'owl' },
    { id: 'vishakha', name: 'Vishakha', form: 'dragon' },
    { id: 'anuradha', name: 'Anuradha', form: 'kirin' },
    { id: 'jyeshtha', name: 'Jyeshtha', form: 'eagle' },
    { id: 'mula', name: 'Mula', form: 'garuda' },
    { id: 'purva-ashadha', name: 'Purva Ashadha', form: 'stag' },
    { id: 'uttara-ashadha', name: 'Uttara Ashadha', form: 'lion' },
    { id: 'shravana', name: 'Shravana', form: 'dolphin' },
    { id: 'dhanishta', name: 'Dhanishta', form: 'phoenix' },
    { id: 'shatabhisha', name: 'Shatabhisha', form: 'dragon' },
    { id: 'purva-bhadrapada', name: 'Purva Bhadrapada', form: 'naga' },
    { id: 'uttara-bhadrapada', name: 'Uttara Bhadrapada', form: 'swan' },
    { id: 'revati', name: 'Revati', form: 'dolphin' }
  ]);

  var lagnas = Object.freeze([
    { id: 'aries', name: 'Aries', element: 'fire' },
    { id: 'taurus', name: 'Taurus', element: 'earth' },
    { id: 'gemini', name: 'Gemini', element: 'air' },
    { id: 'cancer', name: 'Cancer', element: 'water' },
    { id: 'leo', name: 'Leo', element: 'fire' },
    { id: 'virgo', name: 'Virgo', element: 'earth' },
    { id: 'libra', name: 'Libra', element: 'air' },
    { id: 'scorpio', name: 'Scorpio', element: 'water' },
    { id: 'sagittarius', name: 'Sagittarius', element: 'fire' },
    { id: 'capricorn', name: 'Capricorn', element: 'earth' },
    { id: 'aquarius', name: 'Aquarius', element: 'air' },
    { id: 'pisces', name: 'Pisces', element: 'water' }
  ]);

  var nakshatraAliases = Object.freeze({
    'asvini': 'ashvini',
    'ashwini': 'ashvini',
    'kṛttikā': 'krittika',
    'krittika': 'krittika',
    'mrigasira': 'mrigashira',
    'mrigashirsha': 'mrigashira',
    'mrigashira': 'mrigashira',
    'ārdra': 'ardra',
    'purva-phalguni': 'purva-phalguni',
    'poorva-phalguni': 'purva-phalguni',
    'uttara-phalguni': 'uttara-phalguni',
    'vishaka': 'vishakha',
    'visakha': 'vishakha',
    'jyeshta': 'jyeshtha',
    'jyestha': 'jyeshtha',
    'moola': 'mula',
    'purva-ashadha': 'purva-ashadha',
    'poorva-ashadha': 'purva-ashadha',
    'uttara-ashadha': 'uttara-ashadha',
    'sravana': 'shravana',
    'shravishta': 'dhanishta',
    'satabhisha': 'shatabhisha',
    'shatabisha': 'shatabhisha',
    'purva-bhadrapada': 'purva-bhadrapada',
    'poorva-bhadrapada': 'purva-bhadrapada',
    'uttara-bhadrapada': 'uttara-bhadrapada'
  });

  function slug(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[ā]/g, 'a')
      .replace(/[ī]/g, 'i')
      .replace(/[ū]/g, 'u')
      .replace(/[ṛ]/g, 'r')
      .replace(/[śṣ]/g, 's')
      .replace(/[ñ]/g, 'n')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  function indexById(items) {
    var out = {};
    items.forEach(function(item) { out[item.id] = item; });
    return Object.freeze(out);
  }

  var nakshatraById = indexById(nakshatras);
  var lagnaById = indexById(lagnas);

  function resolveNakshatraId(value) {
    var id = slug(value);
    return nakshatraAliases[id] || id;
  }

  function resolveLagnaId(value) {
    return slug(value);
  }

  function makeKey(nakshatraId, lagnaId) {
    return nakshatraId + '__' + lagnaId;
  }

  function buildTable() {
    var out = {};
    nakshatras.forEach(function(nakshatra) {
      lagnas.forEach(function(lagna) {
        var defaultForm = elementDefaultForms[lagna.element] || elementDefaultForms.ether;
        var key = makeKey(nakshatra.id, lagna.id);
        out[key] = Object.freeze({
          key: key,
          nakshatra: nakshatra.id,
          nakshatraName: nakshatra.name,
          lagna: lagna.id,
          lagnaName: lagna.name,
          element: lagna.element,
          defaultForm: defaultForm,
          form: nakshatra.form || defaultForm
        });
      });
    });
    return Object.freeze(out);
  }

  var table = buildTable();

  function getEntry(nakshatra, lagna) {
    var nakshatraId = resolveNakshatraId(nakshatra);
    var lagnaId = resolveLagnaId(lagna);
    var entry = table[makeKey(nakshatraId, lagnaId)];
    if (entry) return entry;

    var lagnaMeta = lagnaById[lagnaId] || { id: lagnaId || 'ether', name: String(lagna || 'Ether'), element: 'ether' };
    var fallbackForm = elementDefaultForms[lagnaMeta.element] || elementDefaultForms.ether;
    return Object.freeze({
      key: makeKey(nakshatraId || 'unknown', lagnaMeta.id),
      nakshatra: nakshatraId || 'unknown',
      nakshatraName: String(nakshatra || 'Unknown'),
      lagna: lagnaMeta.id,
      lagnaName: lagnaMeta.name,
      element: lagnaMeta.element,
      defaultForm: fallbackForm,
      form: fallbackForm
    });
  }

  var api = Object.freeze({
    ELEMENT_DEFAULT_FORMS: elementDefaultForms,
    NAKSHATRAS: nakshatras,
    LAGNAS: lagnas,
    NAKSHATRA_BY_ID: nakshatraById,
    LAGNA_BY_ID: lagnaById,
    TABLE: table,
    count: Object.keys(table).length,
    getEntry: getEntry,
    getForm: function(nakshatra, lagna) { return getEntry(nakshatra, lagna).form; }
  });

  if (root) root.AWARA_DAIMON_FORM_TABLE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
