// ══════════════════════════════════════════════════════
// AWARA Core Module — ES6 константы и канон (T-055)
// Импортируется через <script type="module">
// Не подключён к index.html (будет в T-058)
// ══════════════════════════════════════════════════════

export const AWARA_VERSION = '2.5.5';

// === Ранги Державы РА ===
export const STAGES = [
  { id: 0, name: 'ИНИЦИАТ', threshold: 0 },
  { id: 1, name: 'ВОИН СВЕТА', threshold: 3000 },
  { id: 2, name: 'МУДРЕЦ', threshold: 7000 },
  { id: 3, name: 'ЦАРЬ', threshold: 10000 },
  { id: 4, name: 'БУДДА', threshold: 25000 },
  { id: 5, name: 'ПЛАНЕТАРНЫЙ ЛОГОС', threshold: 50000 }
];

export const CANON = {
  AGENTS_COUNT: 21,
  MATRICES_COUNT: 33,
  LOCAS_COUNT: 14,
  CHAKRAS_COUNT: 9,
  CARDS_COUNT: 1578,
  AGENT_MATRIX_PAIRS: 693
};

export const COLORS = {
  GOLD_PRIMARY: '#c9a84c',
  GOLD_BRIGHT: '#ffd700',
  GOLD_LIGHT: '#fff8d6',
  GOLD_SOFT: '#ffe080',
  BG_BLACK: '#000',
  BG_DARK: '#0a0a14',
  BG_COSMIC: '#1a1430'
};

export const STORAGE_KEYS = {
  STATE: 'awara_v255_state',
  PASSPORT: 'awara_passport',
  EARTH: 'awara_earth_v1',
  ORACLE: 'awara_oracle_sessions',
  TIGEL: 'awara_tigel_entries'
};

export const BREAKPOINTS = {
  MOBILE_XS: 320,
  MOBILE: 375,
  TABLET: 768,
  DESKTOP: 1024
};

export const TIMINGS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 600,
  BREATH: 3000
};

export function validateCanon() {
  const errors = [];
  if (CANON.AGENTS_COUNT !== 21) errors.push('AGENTS_COUNT не равен 21');
  if (CANON.MATRICES_COUNT !== 33) errors.push('MATRICES_COUNT не равен 33');
  if (CANON.LOCAS_COUNT !== 14) errors.push('LOCAS_COUNT не равен 14');
  if (CANON.CHAKRAS_COUNT !== 9) errors.push('CHAKRAS_COUNT не равен 9');
  if (CANON.AGENT_MATRIX_PAIRS !== 21 * 33) errors.push('AGENT_MATRIX_PAIRS не равен 693');

  if (errors.length > 0) {
    console.error('[AWARA] КАНОН НАРУШЕН:', errors);
    return false;
  }
  console.log('[AWARA] Канон валиден: 21/33/14/9/693');
  return true;
}
