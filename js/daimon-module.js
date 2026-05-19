// =============================================
// AWARA — Daimon Module (Phase 6 / T-077)
// ES6 Module — генерация и управление Даймоном-хранителем
// =============================================

import { STAGES } from './core-module.js';
import { loadState, updateState } from './state-module.js';

// === Базовый путь к корню проекта ===
const BASE = new URL('..', import.meta.url).href;

// === Кэш загруженных форм ===
let formsCache = null;

// === Универсальный загрузчик JSON ===
async function loadJson(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      console.error(`[Daimon] Не удалось загрузить ${path}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error(`[Daimon] Ошибка загрузки ${path}:`, e);
    return null;
  }
}

// === Стихии: русские названия ===
const ELEMENT_NAMES = {
  fire: 'Огненный',
  water: 'Водный',
  earth: 'Земной',
  air: 'Воздушный',
  ether: 'Эфирный'
};

// === Доши и их стихийные связи ===
const DOSHA_ELEMENTS = {
  vata: ['air', 'ether'],
  pitta: ['fire', 'water'],
  kapha: ['water', 'earth']
};

// === Планеты и их стихийные связи ===
const PLANET_ELEMENTS = {
  'Солнце': 'fire',
  'Луна': 'water',
  'Марс': 'fire',
  'Меркурий': 'air',
  'Юпитер': 'ether',
  'Венера': 'earth',
  'Сатурн': 'earth',
  'Раху': 'air',
  'Кету': 'fire'
};

// === Пороги опыта для чакрового уровня Даймона ===
const CHAKRA_THRESHOLDS = [
  { chakra: 1, name: 'Муладхара', experience: 0 },
  { chakra: 2, name: 'Свадхистхана', experience: 500 },
  { chakra: 3, name: 'Манипура', experience: 2000 },
  { chakra: 4, name: 'Анахата', experience: 5000 },
  { chakra: 5, name: 'Вишуддха', experience: 12000 },
  { chakra: 6, name: 'Аджна', experience: 25000 },
  { chakra: 7, name: 'Сахасрара', experience: 50000 },
  { chakra: 8, name: 'Монада', experience: 100000 },
  { chakra: 9, name: 'Абсолют', experience: 250000 }
];

// === Загрузка форм Даймонов (27 накшатр) ===
export async function loadDaimonForms() {
  if (formsCache) return formsCache;

  const data = await loadJson(BASE + 'data/daimon-forms.json');
  if (!data) return null;

  const forms = Array.isArray(data) ? data : Object.values(data);
  console.log(`[Daimon] Загружено ${forms.length} форм накшатр`);

  formsCache = forms;
  return forms;
}

// === Найти форму по slug накшатры ===
export async function getDaimonFormByNakshatra(slug) {
  const forms = await loadDaimonForms();
  if (!forms) return null;

  const normalized = String(slug || '').trim().toLowerCase().replace(/\s+/g, '-');
  return forms.find(f => f.slug === normalized) || null;
}

// === Найти форму по id ===
export async function getDaimonFormById(id) {
  const forms = await loadDaimonForms();
  if (!forms) return null;
  return forms.find(f => f.id === id) || null;
}

// === Определить stage игрока по totalLight ===
function computeStage(totalLight) {
  let stageIndex = 0;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (totalLight >= STAGES[i].threshold) {
      stageIndex = i;
      break;
    }
  }
  return {
    id: STAGES[stageIndex].id,
    name: STAGES[stageIndex].name
  };
}

// === Определить чакру Даймона по опыту ===
function computeChakra(experience) {
  let chakraLevel = CHAKRA_THRESHOLDS[0];
  for (let i = CHAKRA_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= CHAKRA_THRESHOLDS[i].experience) {
      chakraLevel = CHAKRA_THRESHOLDS[i];
      break;
    }
  }
  return chakraLevel;
}

// === Сгенерировать имя Даймона ===
function generateName(form, element) {
  const prefix = ELEMENT_NAMES[element] || 'Космический';
  return `${prefix} ${form.form_name}`;
}

// === Генерация Даймона из натальных данных ===
export async function generateDaimon(natalData = {}) {
  const {
    nakshatra = null,
    dosha = null,
    strongestPlanet = null
  } = natalData;

  // Определяем форму по накшатре
  let form = null;
  if (nakshatra) {
    form = await getDaimonFormByNakshatra(nakshatra);
  }

  // Если накшатра не указана или не найдена — случайная форма
  if (!form) {
    const forms = await loadDaimonForms();
    if (!forms || forms.length === 0) {
      console.error('[Daimon] Нет доступных форм');
      return null;
    }
    const randomIndex = Math.floor(Math.random() * forms.length);
    form = forms[randomIndex];
    console.warn(`[Daimon] Накшатра "${nakshatra}" не найдена, выбрана случайная: ${form.slug}`);
  }

  // Базовый элемент из формы
  let element = form.element;

  // Корректировка элемента по доше (если совпадает с основным)
  if (dosha && DOSHA_ELEMENTS[dosha]) {
    const doshaElems = DOSHA_ELEMENTS[dosha];
    if (!doshaElems.includes(element)) {
      // Доша добавляет вторичный элемент (не заменяет)
      // Запоминаем как secondaryElement
    }
  }

  // Вторичный элемент от сильнейшей планеты
  let secondaryElement = null;
  if (strongestPlanet && PLANET_ELEMENTS[strongestPlanet]) {
    const planetElem = PLANET_ELEMENTS[strongestPlanet];
    if (planetElem !== element) {
      secondaryElement = planetElem;
    }
  }

  // Состояние игрока для stage
  const state = loadState();
  const totalLight = state.totalLight || 0;
  const stage = computeStage(totalLight);

  // Начальный опыт Даймона
  const experience = state.daimon?.experience || 0;
  const chakraLevel = computeChakra(experience);

  const daimon = {
    nakshatra: form.slug,
    nakshatraName: form.name,
    sanskrit: form.sanskrit,
    ruler: form.ruler,

    form: form.form,
    formName: form.form_name,
    element: element,
    secondaryElement: secondaryElement,
    archetype: form.archetype,
    resonanceBonus: form.resonanceBonus,
    description: form.description,

    dosha: dosha || null,
    strongestPlanet: strongestPlanet || null,

    name: generateName(form, element),
    stage: stage,
    chakra: chakraLevel.chakra,
    chakraName: chakraLevel.name,
    experience: experience,

    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  // Сохраняем в state
  updateState({ daimon });
  console.log(`[Daimon] Создан: ${daimon.name} (${daimon.archetype}, ${daimon.element})`);

  return daimon;
}

// === Получить текущего Даймона из state ===
export function getDaimon() {
  const state = loadState();
  return state.daimon || null;
}

// === Сохранить Даймона в state ===
export function saveDaimon(daimon) {
  if (!daimon) return false;
  daimon.updatedAt = Date.now();
  updateState({ daimon });
  return true;
}

// === Рассчитать resonance bonus (совпадение стихии дня и элемента Даймона) ===
export function getResonanceBonus(daimon, dayElement) {
  if (!daimon || !dayElement) return 0;

  let bonus = 0;

  // Прямое совпадение элемента
  if (daimon.element === dayElement) {
    bonus = daimon.resonanceBonus || 0.05;
  }

  // Частичное совпадение по вторичному элементу
  if (daimon.secondaryElement === dayElement && bonus === 0) {
    bonus = (daimon.resonanceBonus || 0.05) * 0.5;
  }

  return Math.round(bonus * 1000) / 1000;
}

// === Добавить опыт Даймону ===
export function addDaimonExperience(amount) {
  if (typeof amount !== 'number' || amount <= 0) return null;

  const daimon = getDaimon();
  if (!daimon) return null;

  daimon.experience = (daimon.experience || 0) + amount;

  // Пересчитываем чакру
  const chakraLevel = computeChakra(daimon.experience);
  const evolved = daimon.chakra < chakraLevel.chakra;
  daimon.chakra = chakraLevel.chakra;
  daimon.chakraName = chakraLevel.name;

  // Пересчитываем stage по свету игрока
  const state = loadState();
  const stage = computeStage(state.totalLight || 0);
  daimon.stage = stage;

  saveDaimon(daimon);

  if (evolved) {
    console.log(`[Daimon] Эволюция! ${daimon.name} достиг чакры ${daimon.chakraName} (${daimon.chakra})`);
  }

  return { daimon, evolved, newChakra: chakraLevel };
}

// === Получить информацию о прогрессе до следующей чакры ===
export function getDaimonProgress() {
  const daimon = getDaimon();
  if (!daimon) return null;

  const currentExp = daimon.experience || 0;
  const currentChakraIdx = CHAKRA_THRESHOLDS.findIndex(c => c.chakra === daimon.chakra);
  const nextChakraIdx = currentChakraIdx + 1;

  if (nextChakraIdx >= CHAKRA_THRESHOLDS.length) {
    return {
      currentChakra: CHAKRA_THRESHOLDS[currentChakraIdx],
      nextChakra: null,
      progress: 1.0,
      experienceToNext: 0,
      isMaxLevel: true
    };
  }

  const currentThreshold = CHAKRA_THRESHOLDS[currentChakraIdx].experience;
  const nextThreshold = CHAKRA_THRESHOLDS[nextChakraIdx].experience;
  const range = nextThreshold - currentThreshold;
  const gained = currentExp - currentThreshold;
  const progress = range > 0 ? Math.min(gained / range, 1.0) : 0;

  return {
    currentChakra: CHAKRA_THRESHOLDS[currentChakraIdx],
    nextChakra: CHAKRA_THRESHOLDS[nextChakraIdx],
    progress: Math.round(progress * 100) / 100,
    experienceToNext: nextThreshold - currentExp,
    isMaxLevel: false
  };
}

// === Получить стадию Даймона (stage) по свету игрока ===
export function getDaimonStage() {
  const state = loadState();
  return computeStage(state.totalLight || 0);
}

// === Получить все пороги чакр ===
export function getChakraThresholds() {
  return [...CHAKRA_THRESHOLDS];
}

// === Сбросить Даймона ===
export function resetDaimon() {
  updateState({ daimon: null });
  console.log('[Daimon] Даймон сброшен');
}
