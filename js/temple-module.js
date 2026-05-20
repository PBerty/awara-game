// =============================================
// AWARA -- Temple Module v2.0 (Phase 7 / E-013)
// ES6 Module -- постройка, улучшение, сбор пассивного света, экосистемы
// =============================================

import { loadState, updateState } from './state-module.js';

const BASE = new URL('..', import.meta.url).href;

let _upgradesCache = null;
let _ecosystemsCache = null;

// --- Загрузка JSON ---

async function loadJson(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (e) {
    console.error('[Temple] fetch error ' + path + ':', e);
    return null;
  }
}

async function loadUpgrades() {
  if (_upgradesCache) return _upgradesCache;
  const data = await loadJson(BASE + 'data/temple-upgrades.json');
  if (data) _upgradesCache = data;
  return data;
}

async function loadEcosystems() {
  if (_ecosystemsCache) return _ecosystemsCache;
  const data = await loadJson(BASE + 'data/temple-ecosystems.json');
  if (data) _ecosystemsCache = data;
  return data;
}

// --- Состояние храмов в state ---

function getTempleState() {
  const state = loadState();
  if (!state.temples) {
    state.temples = {};
    updateState({ temples: state.temples });
  }
  return state.temples;
}

function saveTempleState(temples) {
  updateState({ temples });
}

// --- Получение данных о храме игрока по matrixSlug ---

/**
 * Возвращает объект храма игрока для указанной матрицы.
 * Если храм не построен -- возвращает null.
 * @param {string} matrixSlug -- slug матрицы (vedic, egyptian, ...)
 * @returns {Object|null} { matrixSlug, builtAt, zones: { center: level, ... }, lastCollect }
 */
export function getTemple(matrixSlug) {
  const temples = getTempleState();
  return temples[matrixSlug] || null;
}

/**
 * Возвращает все построенные храмы игрока.
 * @returns {Object} { slug: templeData, ... }
 */
export function getAllTemples() {
  return getTempleState();
}

// --- Постройка храма ---

/**
 * Построить храм для указанной матрицы.
 * Стоимость постройки: базовая стоимость первого уровня центра (500 света).
 * @param {string} matrixSlug -- slug матрицы
 * @param {number} cost -- стоимость постройки (вычитается из totalLight)
 * @returns {{ success: boolean, error?: string, temple?: Object }}
 */
export async function buildTemple(matrixSlug) {
  if (!matrixSlug) return { success: false, error: 'matrixSlug required' };

  const temples = getTempleState();
  if (temples[matrixSlug]) return { success: false, error: 'temple_exists' };

  const upgrades = await loadUpgrades();
  if (!upgrades) return { success: false, error: 'data_load_failed' };

  const centerZone = upgrades.zones.find(z => z.id === 'center');
  if (!centerZone) return { success: false, error: 'no_center_zone' };
  const buildCost = centerZone.upgrades[0].cost;

  const state = loadState();
  const light = state.totalLight || 0;
  if (light < buildCost) {
    return { success: false, error: 'not_enough_light', required: buildCost, available: light };
  }

  const temple = {
    matrixSlug: matrixSlug,
    builtAt: Date.now(),
    zones: { center: 1 },
    lastCollect: Date.now()
  };

  temples[matrixSlug] = temple;
  updateState({
    temples: temples,
    totalLight: light - buildCost
  });

  return { success: true, temple, spent: buildCost };
}

// --- Улучшение зоны храма ---

/**
 * Улучшить зону храма на следующий уровень.
 * @param {string} matrixSlug -- slug матрицы
 * @param {string} zoneId -- id зоны (center, library, ...)
 * @returns {Promise<{ success: boolean, error?: string, newLevel?: number }>}
 */
export async function upgradeZone(matrixSlug, zoneId) {
  const temples = getTempleState();
  const temple = temples[matrixSlug];
  if (!temple) return { success: false, error: 'temple_not_found' };

  const upgrades = await loadUpgrades();
  if (!upgrades) return { success: false, error: 'data_load_failed' };

  const zoneDef = upgrades.zones.find(z => z.id === zoneId);
  if (!zoneDef) return { success: false, error: 'zone_not_found' };

  const currentLevel = temple.zones[zoneId] || 0;
  const maxLevel = upgrades.meta.max_level;
  if (currentLevel >= maxLevel) return { success: false, error: 'max_level' };

  const nextUpgrade = zoneDef.upgrades.find(u => u.level === currentLevel + 1);
  if (!nextUpgrade) return { success: false, error: 'no_upgrade_data' };

  const state = loadState();
  const light = state.totalLight || 0;
  if (light < nextUpgrade.cost) {
    return {
      success: false,
      error: 'not_enough_light',
      required: nextUpgrade.cost,
      available: light
    };
  }

  const materials = state.earth && state.earth.materials ? { ...state.earth.materials } : {};
  for (const [mat, qty] of Object.entries(nextUpgrade.materials || {})) {
    if ((materials[mat] || 0) < qty) {
      return {
        success: false,
        error: 'not_enough_materials',
        missing: mat,
        required: qty,
        available: materials[mat] || 0
      };
    }
  }

  for (const [mat, qty] of Object.entries(nextUpgrade.materials || {})) {
    materials[mat] = (materials[mat] || 0) - qty;
  }

  temple.zones[zoneId] = currentLevel + 1;
  temples[matrixSlug] = temple;

  const earthState = state.earth || {};
  earthState.materials = materials;

  updateState({
    temples: temples,
    totalLight: light - nextUpgrade.cost,
    earth: earthState
  });

  return {
    success: true,
    newLevel: currentLevel + 1,
    upgrade: nextUpgrade,
    spent: nextUpgrade.cost
  };
}

// --- Получение информации об апгрейде зоны ---

/**
 * Возвращает данные следующего улучшения для зоны.
 * @param {string} matrixSlug
 * @param {string} zoneId
 * @returns {Promise<Object|null>} { level, name_ru, cost, materials, effects, description } или null
 */
export async function getNextUpgrade(matrixSlug, zoneId) {
  const temple = getTemple(matrixSlug);
  if (!temple) return null;

  const upgrades = await loadUpgrades();
  if (!upgrades) return null;

  const zoneDef = upgrades.zones.find(z => z.id === zoneId);
  if (!zoneDef) return null;

  const currentLevel = temple.zones[zoneId] || 0;
  return zoneDef.upgrades.find(u => u.level === currentLevel + 1) || null;
}

/**
 * Возвращает полную информацию о зоне: определение + текущий уровень.
 * @param {string} matrixSlug
 * @param {string} zoneId
 * @returns {Promise<Object|null>}
 */
export async function getZoneInfo(matrixSlug, zoneId) {
  const temple = getTemple(matrixSlug);
  if (!temple) return null;

  const upgrades = await loadUpgrades();
  if (!upgrades) return null;

  const zoneDef = upgrades.zones.find(z => z.id === zoneId);
  if (!zoneDef) return null;

  const currentLevel = temple.zones[zoneId] || 0;
  const currentUpgrade = zoneDef.upgrades.find(u => u.level === currentLevel) || null;
  const nextUpgrade = zoneDef.upgrades.find(u => u.level === currentLevel + 1) || null;

  return {
    id: zoneDef.id,
    name_ru: zoneDef.name_ru,
    name_en: zoneDef.name_en,
    element: zoneDef.element,
    chakra: zoneDef.chakra,
    description: zoneDef.description,
    currentLevel: currentLevel,
    maxLevel: upgrades.meta.max_level,
    currentUpgrade: currentUpgrade,
    nextUpgrade: nextUpgrade
  };
}

// --- Список всех зон с уровнями ---

/**
 * Возвращает массив всех 11 зон храма с текущими уровнями.
 * @param {string} matrixSlug
 * @returns {Promise<Array|null>}
 */
export async function getAllZones(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return null;

  const upgrades = await loadUpgrades();
  if (!upgrades) return null;

  return upgrades.zones.map(z => ({
    id: z.id,
    name_ru: z.name_ru,
    element: z.element,
    chakra: z.chakra,
    currentLevel: temple.zones[z.id] || 0,
    maxLevel: upgrades.meta.max_level
  }));
}

// --- Пассивный свет ---

/**
 * Рассчитать пассивный свет храма за период (мс).
 * Суммирует passive_svet_bonus всех зон по текущему уровню + глобальные бонусы.
 * @param {string} matrixSlug
 * @returns {Promise<number>} пассивный свет в единицах/час
 */
export async function getPassiveSvetPerHour(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return 0;

  const upgrades = await loadUpgrades();
  if (!upgrades) return 0;

  let baseSvet = 0;
  for (const zoneDef of upgrades.zones) {
    const level = temple.zones[zoneDef.id] || 0;
    if (level > 0) {
      const upg = zoneDef.upgrades.find(u => u.level === level);
      if (upg) baseSvet += upg.effects.passive_svet_bonus;
    }
  }

  const ecosystems = await loadEcosystems();
  if (ecosystems) {
    const eco = ecosystems.find(e => e.matrixSlug === matrixSlug);
    if (eco) baseSvet += eco.basePassiveSvet;
  }

  const globalBonus = getGlobalBonusPercent(temple, upgrades);
  return Math.floor(baseSvet * (1 + globalBonus / 100));
}

/**
 * Рассчитать процент глобального бонуса за уровень всех зон.
 */
function getGlobalBonusPercent(temple, upgrades) {
  if (!upgrades.global_bonuses || upgrades.global_bonuses.length === 0) return 0;

  const zoneIds = upgrades.zones.map(z => z.id);

  let bestPercent = 0;
  for (const gb of upgrades.global_bonuses) {
    const requiredLevel = parseInt(gb.condition.replace('all_zones_level_', ''), 10);
    if (isNaN(requiredLevel)) continue;

    const allMet = zoneIds.every(id => (temple.zones[id] || 0) >= requiredLevel);
    if (allMet && gb.bonus.passive_svet_percent > bestPercent) {
      bestPercent = gb.bonus.passive_svet_percent;
    }
  }
  return bestPercent;
}

/**
 * Возвращает активные глобальные бонусы храма.
 * @param {string} matrixSlug
 * @returns {Promise<Array>}
 */
export async function getActiveGlobalBonuses(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return [];

  const upgrades = await loadUpgrades();
  if (!upgrades || !upgrades.global_bonuses) return [];

  const zoneIds = upgrades.zones.map(z => z.id);
  const active = [];

  for (const gb of upgrades.global_bonuses) {
    const requiredLevel = parseInt(gb.condition.replace('all_zones_level_', ''), 10);
    if (isNaN(requiredLevel)) continue;

    const allMet = zoneIds.every(id => (temple.zones[id] || 0) >= requiredLevel);
    if (allMet) active.push(gb);
  }

  return active;
}

// --- Сбор пассивного света ---

/**
 * Собрать накопленный пассивный свет с храма.
 * Свет накапливается с момента lastCollect.
 * Максимум 24 часа накопления.
 * @param {string} matrixSlug
 * @returns {Promise<{ success: boolean, collected: number, hoursElapsed: number }>}
 */
export async function collectPassiveLight(matrixSlug) {
  const temples = getTempleState();
  const temple = temples[matrixSlug];
  if (!temple) return { success: false, collected: 0, hoursElapsed: 0 };

  const now = Date.now();
  const elapsed = now - (temple.lastCollect || temple.builtAt);
  const hours = Math.min(elapsed / 3600000, 24);

  const perHour = await getPassiveSvetPerHour(matrixSlug);
  const collected = Math.floor(perHour * hours);

  if (collected <= 0) return { success: true, collected: 0, hoursElapsed: hours };

  temple.lastCollect = now;
  temples[matrixSlug] = temple;

  const state = loadState();
  updateState({
    temples: temples,
    totalLight: (state.totalLight || 0) + collected
  });

  return { success: true, collected, hoursElapsed: parseFloat(hours.toFixed(2)) };
}

// --- Экосистема храма ---

/**
 * Получить экосистему храма по матрице.
 * @param {string} matrixSlug
 * @returns {Promise<Object|null>} объект из temple-ecosystems.json
 */
export async function getTempleEcosystem(matrixSlug) {
  const ecosystems = await loadEcosystems();
  if (!ecosystems) return null;
  return ecosystems.find(e => e.matrixSlug === matrixSlug) || null;
}

/**
 * Получить общий множитель храма (произведение multiplier всех зон).
 * @param {string} matrixSlug
 * @returns {Promise<number>}
 */
export async function getTempleMultiplier(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return 1.0;

  const upgrades = await loadUpgrades();
  if (!upgrades) return 1.0;

  let totalMultiplier = 1.0;
  for (const zoneDef of upgrades.zones) {
    const level = temple.zones[zoneDef.id] || 0;
    if (level > 0) {
      const upg = zoneDef.upgrades.find(u => u.level === level);
      if (upg && upg.effects.multiplier > 1.0) {
        totalMultiplier *= upg.effects.multiplier;
      }
    }
  }
  return parseFloat(totalMultiplier.toFixed(4));
}

/**
 * Возвращает список разблокированных способностей храма.
 * @param {string} matrixSlug
 * @returns {Promise<Array<string>>}
 */
export async function getUnlockedAbilities(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return [];

  const upgrades = await loadUpgrades();
  if (!upgrades) return [];

  const abilities = [];
  for (const zoneDef of upgrades.zones) {
    const level = temple.zones[zoneDef.id] || 0;
    for (const upg of zoneDef.upgrades) {
      if (upg.level <= level && upg.effects.unlock) {
        abilities.push(upg.effects.unlock);
      }
    }
  }
  return abilities;
}

/**
 * Возвращает суммарную статистику храма для отображения.
 * @param {string} matrixSlug
 * @returns {Promise<Object|null>}
 */
export async function getTempleSummary(matrixSlug) {
  const temple = getTemple(matrixSlug);
  if (!temple) return null;

  const [perHour, multiplier, abilities, ecosystem, globalBonuses] = await Promise.all([
    getPassiveSvetPerHour(matrixSlug),
    getTempleMultiplier(matrixSlug),
    getUnlockedAbilities(matrixSlug),
    getTempleEcosystem(matrixSlug),
    getActiveGlobalBonuses(matrixSlug)
  ]);

  const zones = await getAllZones(matrixSlug);
  const totalLevels = zones ? zones.reduce((s, z) => s + z.currentLevel, 0) : 0;
  const maxTotalLevels = zones ? zones.length * 5 : 55;

  return {
    matrixSlug,
    builtAt: temple.builtAt,
    totalLevels,
    maxTotalLevels,
    passiveSvetPerHour: perHour,
    multiplier,
    abilitiesCount: abilities.length,
    abilities,
    globalBonuses: globalBonuses.map(g => g.name_ru),
    ecosystemName: ecosystem ? ecosystem.templeNameTemplate.replace('{matrixName}', ecosystem.matrixName) : null,
    universe: ecosystem ? ecosystem.universe : null
  };
}
