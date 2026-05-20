// milost-module.js -- логика 7 источников Милости (Благодати) по 7 Лучам
// ES-модуль. Чистая логика, без DOM.

const DATA_PATH = 'data/milost-sources.json';
const DEFAULT_RAY = 4;

let _sourcesCache = null;

async function _loadSources() {
  if (_sourcesCache) return _sourcesCache;
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    _sourcesCache = await res.json();
    return _sourcesCache;
  } catch (err) {
    console.error('[milost-module] fetch failed:', err);
    return null;
  }
}

/**
 * Возвращает объект-источник Милости для заданного Луча игрока.
 * @param {number} playerRay - Луч игрока (1..7)
 * @returns {Promise<Object|null>} объект из milost-sources.json или null при ошибке
 */
export async function getCurrentSource(playerRay) {
  const sources = await _loadSources();
  if (!sources) return null;
  const ray = (Number.isInteger(playerRay) && playerRay >= 1 && playerRay <= 7)
    ? playerRay
    : DEFAULT_RAY;
  return sources.find(s => s.ray === ray) || null;
}

/**
 * Возвращает множитель Милости для заданного Луча.
 * @param {number} playerRay - Луч игрока (1..7)
 * @returns {Promise<number|null>} multiplier или null при ошибке
 */
export async function getSourceMultiplier(playerRay) {
  const source = await getCurrentSource(playerRay);
  return source ? source.multiplier : null;
}

/**
 * Проверяет, пробита ли Завеса (Veil) для данного Луча.
 * @param {number} playerRay - Луч игрока (1..7)
 * @param {number} resonancePoints - текущий счёт резонанса игрока
 * @returns {Promise<boolean>} true если resonancePoints >= veil_threshold
 */
export async function checkVeilBreach(playerRay, resonancePoints) {
  const source = await getCurrentSource(playerRay);
  if (!source) return false;
  return resonancePoints >= source.veil_threshold;
}

/**
 * Возвращает послание макрокосма при пробое Завесы.
 * @param {number} playerRay - Луч игрока (1..7)
 * @returns {Promise<string|null>} macrocosm_message или null если источник не найден
 */
export async function getMacrocosmMessage(playerRay) {
  const source = await getCurrentSource(playerRay);
  return source ? source.macrocosm_message : null;
}

/**
 * Пример использования:
 *
 *   import { getCurrentSource, getSourceMultiplier, checkVeilBreach, getMacrocosmMessage } from './milost-module.js';
 *
 *   const source = await getCurrentSource(1);
 *   // => { id: 1, ray: 1, name_ru: "Сатья-юга (Золотой Век)", ... }
 *
 *   const mult = await getSourceMultiplier(1);
 *   // => 2.0
 *
 *   const breached = await checkVeilBreach(1, 1500);
 *   // => true (1500 >= 1000)
 *
 *   const msg = await getMacrocosmMessage(1);
 *   // => "Восстанавливается Закон. Внутри тебя поднимается воля Творца. Действуй из центра."
 */
