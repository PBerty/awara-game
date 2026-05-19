/**
 * temple-module.js — логика храмов AWARA.
 *
 * API:
 *   buildTemple(matrixId)          — построить храм для матрицы
 *   getTemples()                   — все построенные храмы
 *   getTempleByMatrix(matrixId)    — данные храма по ID матрицы
 *   collectPassiveSvet()           — собрать пассивный свет со всех храмов
 *
 * Использует Daimon stage (стадия духовного спутника)
 * и Milost multiplier (множитель милости/благодати).
 *
 * Хранение: localStorage ключ awara_temples_v258.
 * Данные экосистем: data/temple-ecosystems.json (загружается через fetch).
 */

const TEMPLE_KEY = 'awara_temples_v258';

// ── DAIMON STAGES ────────────────────────────────────────
// Стадия Даймона растёт с количеством построенных храмов.
// Каждая стадия увеличивает эффективность пассивного света.
const DAIMON_STAGES = [
  { stage: 1, name: 'Искра',          minTemples: 0,  multiplier: 1.0 },
  { stage: 2, name: 'Пробуждённый',   minTemples: 3,  multiplier: 1.2 },
  { stage: 3, name: 'Страж',          minTemples: 7,  multiplier: 1.5 },
  { stage: 4, name: 'Наставник',      minTemples: 12, multiplier: 1.8 },
  { stage: 5, name: 'Мудрец',         minTemples: 18, multiplier: 2.2 },
  { stage: 6, name: 'Архонт',         minTemples: 25, multiplier: 2.8 },
  { stage: 7, name: 'Логос',          minTemples: 33, multiplier: 3.5 },
];

// ── MILOST (МИЛОСТЬ) ────────────────────────────────────
// Множитель благодати зависит от totalLight игрока.
// Чем больше света накоплено — тем щедрее храмы отдают.
const MILOST_TIERS = [
  { minLight: 0,     multiplier: 1.0,  name: 'Обычная' },
  { minLight: 500,   multiplier: 1.15, name: 'Малая благодать' },
  { minLight: 1500,  multiplier: 1.3,  name: 'Благословение' },
  { minLight: 4000,  multiplier: 1.5,  name: 'Высшая милость' },
  { minLight: 10000, multiplier: 2.0,  name: 'Сияние Абсолюта' },
];

// ── КЭШ ЭКОСИСТЕМ ───────────────────────────────────────
let _ecosystemsCache = null;

async function loadEcosystems() {
  if (_ecosystemsCache) return _ecosystemsCache;
  try {
    const resp = await fetch('data/temple-ecosystems.json');
    _ecosystemsCache = await resp.json();
  } catch (e) {
    console.warn('temple-module: не удалось загрузить temple-ecosystems.json', e);
    _ecosystemsCache = [];
  }
  return _ecosystemsCache;
}

// ── ХРАНИЛИЩЕ ────────────────────────────────────────────
function loadTemples() {
  try {
    return JSON.parse(localStorage.getItem(TEMPLE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveTemples(data) {
  try {
    localStorage.setItem(TEMPLE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('temple-module: ошибка записи', e);
  }
}

// ── DAIMON ───────────────────────────────────────────────
/**
 * Определить текущую стадию Даймона по количеству храмов.
 */
export function getDaimonStage(templeCount) {
  let result = DAIMON_STAGES[0];
  for (const s of DAIMON_STAGES) {
    if (templeCount >= s.minTemples) result = s;
  }
  return result;
}

// ── MILOST ───────────────────────────────────────────────
/**
 * Определить множитель Милости по totalLight игрока.
 */
export function getMilostMultiplier(totalLight) {
  let result = MILOST_TIERS[0];
  for (const t of MILOST_TIERS) {
    if (totalLight >= t.minLight) result = t;
  }
  return result;
}

// ── ОСНОВНОЙ API ─────────────────────────────────────────

/**
 * Построить храм для указанной матрицы.
 * Возвращает объект храма или null если матрица не найдена / уже построен.
 */
export async function buildTemple(matrixId) {
  const ecosystems = await loadEcosystems();
  const eco = ecosystems.find(e => e.matrix_id === matrixId);
  if (!eco) return null;

  const data = loadTemples();
  const key = String(matrixId);

  if (data[key]) return data[key];

  data[key] = {
    matrix_id: eco.matrix_id,
    matrix_slug: eco.matrix_slug,
    templeName: eco.templeName,
    builtAt: Date.now(),
    lastCollected: Date.now(),
  };

  saveTemples(data);
  return data[key];
}

/**
 * Получить все построенные храмы (массив).
 */
export function getTemples() {
  const data = loadTemples();
  return Object.values(data);
}

/**
 * Получить данные храма по ID матрицы.
 * Возвращает объект {temple, ecosystem, daimonStage, milost} или null.
 */
export async function getTempleByMatrix(matrixId) {
  const data = loadTemples();
  const key = String(matrixId);
  const temple = data[key];
  if (!temple) return null;

  const ecosystems = await loadEcosystems();
  const eco = ecosystems.find(e => e.matrix_id === matrixId) || null;

  const temples = getTemples();
  const daimonStage = getDaimonStage(temples.length);

  const totalLight = _getTotalLight();
  const milost = getMilostMultiplier(totalLight);

  return { temple, ecosystem: eco, daimonStage, milost };
}

/**
 * Собрать пассивный свет со всех построенных храмов.
 * Учитывает: basePassiveSvet * daimonMultiplier * milostMultiplier * deltaMinutes.
 * Возвращает {collected, daimonStage, milost, perTemple[]}.
 */
export async function collectPassiveSvet() {
  const ecosystems = await loadEcosystems();
  const data = loadTemples();
  const temples = Object.values(data);
  if (temples.length === 0) return { collected: 0, daimonStage: DAIMON_STAGES[0], milost: MILOST_TIERS[0], perTemple: [] };

  const now = Date.now();
  const daimonStage = getDaimonStage(temples.length);
  const totalLight = _getTotalLight();
  const milost = getMilostMultiplier(totalLight);

  let totalCollected = 0;
  const perTemple = [];

  for (const t of temples) {
    const eco = ecosystems.find(e => e.matrix_id === t.matrix_id);
    if (!eco) continue;

    const lastCollected = t.lastCollected || t.builtAt || now;
    const deltaMin = Math.max(0, (now - lastCollected) / 60000);
    const raw = eco.basePassiveSvet * daimonStage.multiplier * milost.multiplier;
    const collected = Math.floor(raw * deltaMin);

    totalCollected += collected;
    perTemple.push({
      matrix_id: t.matrix_id,
      templeName: eco.templeName,
      baseRate: eco.basePassiveSvet,
      collected,
      deltaMin: Math.round(deltaMin * 10) / 10,
    });

    data[String(t.matrix_id)].lastCollected = now;
  }

  saveTemples(data);

  return {
    collected: totalCollected,
    daimonStage,
    milost,
    perTemple,
  };
}

// ── УТИЛИТЫ ──────────────────────────────────────────────
function _getTotalLight() {
  if (typeof window !== 'undefined' && typeof window.state !== 'undefined') {
    return window.state.totalLight || 0;
  }
  try {
    const raw = localStorage.getItem('awara_v258_state') || localStorage.getItem('awara_v255_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.totalLight || 0;
    }
  } catch (e) { /* игнорируем */ }
  return 0;
}
