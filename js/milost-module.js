// =============================================
// AWARA — Милость дня (Phase 6 / T-073)
// ES6 Module — используется через import
// =============================================

import { SwissEphemeris } from '../lib/swisseph/swisseph-browser.js';
import { loadState, updateState } from './state-module.js';

const SOURCE_SCORE = 0.3;
const SWE_PLANET = { Moon: 1, Jupiter: 5 };
const SWE_FLAGS = { MoshierSpeed: 260 };
const FAVORABLE_JUPITER_SIGNS = new Set([3, 8, 11]);
const BLESSED_DAY_NAKSHATRAS = new Set(['pushya', 'magha', 'rohini']);

const SIGNS = [
  'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева',
  'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
];

const NAKSHATRAS = [
  'Ашвини', 'Бхарани', 'Криттика', 'Рохини', 'Мригашира',
  'Ардра', 'Пунарвасу', 'Пушья', 'Ашлеша', 'Магха',
  'Пурва Пхалгуни', 'Уттара Пхалгуни', 'Хаста', 'Читра', 'Свати',
  'Вишакха', 'Анурадха', 'Джьештха', 'Мула', 'Пурва Ашадха',
  'Уттара Ашадха', 'Шравана', 'Дханишта', 'Шатабхиша',
  'Пурва Бхадрапада', 'Уттара Бхадрапада', 'Ревати'
];

let sweInstance = null;

function roundMilost(value) {
  return Math.round(value * 1000) / 1000;
}

function formatDateKey(date = new Date()) {
  if (typeof date === 'string') return date.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function normalizeToken(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я]+/g, '');
}

function signIndex(value) {
  if (typeof value === 'number') return ((Math.floor(value) % 12) + 12) % 12;
  const token = normalizeToken(value);
  const idx = SIGNS.findIndex(sign => normalizeToken(sign) === token);
  if (idx >= 0) return idx;
  const en = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  return en.indexOf(token);
}

function nakshatraName(value) {
  if (typeof value === 'number') return NAKSHATRAS[((Math.floor(value) % 27) + 27) % 27];
  return String(value || '').trim();
}

function nakshatraToken(value) {
  const token = normalizeToken(nakshatraName(value));
  const aliases = {
    пушья: 'pushya',
    pushya: 'pushya',
    магха: 'magha',
    magha: 'magha',
    рохини: 'rohini',
    rohini: 'rohini'
  };
  return aliases[token] || token;
}

function lahiriAyanamsha(jd) {
  const t = (jd - 2451545.0) / 36525.0;
  return 23.853056 + t * 1.3972222;
}

function toSidereal(tropicalLon, jd) {
  let sid = tropicalLon - lahiriAyanamsha(jd);
  while (sid < 0) sid += 360;
  while (sid >= 360) sid -= 360;
  return sid;
}

function getNakshatraFromLongitude(lon) {
  const idx = Math.floor(lon / (360 / 27));
  return NAKSHATRAS[((idx % 27) + 27) % 27];
}

function findPlanet(chart, names) {
  const planets = Array.isArray(chart?.planets) ? chart.planets : [];
  return planets.find(planet => {
    const fields = [planet.id, planet.name, planet.alt, planet.graha, planet.body];
    return fields.some(field => names.includes(normalizeToken(field)));
  }) || null;
}

function unwrapNatalChart(natalChart) {
  if (!natalChart) return {};
  return natalChart.data || natalChart.chart || natalChart;
}

function loadSavedNatalChart() {
  const state = loadState();
  if (state.natalChart) return unwrapNatalChart(state.natalChart);

  try {
    const raw = localStorage.getItem('awara_natal_chart');
    if (!raw) return null;
    return unwrapNatalChart(JSON.parse(raw));
  } catch (e) {
    console.warn('[AWARA Milost] Natal chart load error:', e);
    return null;
  }
}

function getBirthNakshatra(chart) {
  const source = unwrapNatalChart(chart);
  if (source.nakshatra) return nakshatraName(source.nakshatra);
  if (source.birthNakshatra) return nakshatraName(source.birthNakshatra);
  if (source.moonNakshatra) return nakshatraName(source.moonNakshatra);

  const moon = findPlanet(source, ['moon', 'луна', 'чандра']);
  return moon?.nakshatra ? nakshatraName(moon.nakshatra) : '';
}

function getTransitSource(chart, date) {
  const source = unwrapNatalChart(chart);
  const transits = source.currentTransits || source.transits || source.today || null;
  if (transits) return transits;
  return estimateDailyTransits(date);
}

function getJupiterSign(transits) {
  if (transits.jupiterSign !== undefined) return signIndex(transits.jupiterSign);
  if (transits.jupiter?.sign !== undefined) return signIndex(transits.jupiter.sign);
  if (transits.jupiterLongitude !== undefined) return signIndex(transits.jupiterLongitude / 30);

  const jupiter = findPlanet(transits, ['jupiter', 'юпитер', 'гуру']);
  if (jupiter?.sign !== undefined) return signIndex(jupiter.sign);
  if (jupiter?.longitude !== undefined) return signIndex(jupiter.longitude / 30);
  return -1;
}

function getDayNakshatra(transits) {
  if (transits.dayNakshatra) return nakshatraName(transits.dayNakshatra);
  if (transits.moonNakshatra) return nakshatraName(transits.moonNakshatra);
  if (transits.moon?.nakshatra) return nakshatraName(transits.moon.nakshatra);
  if (transits.moonLongitude !== undefined) return getNakshatraFromLongitude(transits.moonLongitude);

  const moon = findPlanet(transits, ['moon', 'луна', 'чандра']);
  if (moon?.nakshatra) return nakshatraName(moon.nakshatra);
  if (moon?.longitude !== undefined) return getNakshatraFromLongitude(moon.longitude);
  return '';
}

function sourceResult(active, label, details = '') {
  return {
    score: active ? SOURCE_SCORE : 0,
    active,
    label,
    details
  };
}

function estimateDailyTransits(date = new Date()) {
  const day = Math.floor(new Date(formatDateKey(date) + 'T12:00:00Z').getTime() / 86400000);
  const moonLon = ((day * 13.176358) + 218.316) % 360;
  const jupiterLon = ((day * 0.083092) + 34.35) % 360;
  return {
    moonLongitude: moonLon,
    dayNakshatra: getNakshatraFromLongitude(moonLon),
    jupiterLongitude: jupiterLon,
    jupiterSign: signIndex(jupiterLon / 30),
    method: 'approximation'
  };
}

async function getSwissEphemeris() {
  if (!sweInstance) {
    sweInstance = new SwissEphemeris();
    await sweInstance.init();
  }
  return sweInstance;
}

async function buildDailyTransits(date = new Date()) {
  const swe = await getSwissEphemeris();
  const value = new Date(formatDateKey(date) + 'T12:00:00Z');
  const jd = swe.julianDay(
    value.getUTCFullYear(),
    value.getUTCMonth() + 1,
    value.getUTCDate(),
    12
  );

  const jupiter = swe.calculatePosition(jd, SWE_PLANET.Jupiter, SWE_FLAGS.MoshierSpeed);
  const moon = swe.calculatePosition(jd, SWE_PLANET.Moon, SWE_FLAGS.MoshierSpeed);
  const jupiterSidereal = toSidereal(jupiter.longitude, jd);
  const moonSidereal = toSidereal(moon.longitude, jd);

  return {
    jupiterLongitude: jupiterSidereal,
    jupiterSign: signIndex(jupiterSidereal / 30),
    moonLongitude: moonSidereal,
    moonNakshatra: getNakshatraFromLongitude(moonSidereal),
    dayNakshatra: getNakshatraFromLongitude(moonSidereal),
    method: 'swisseph'
  };
}

export function computeMilost(natalChart = null, date = new Date()) {
  const chart = unwrapNatalChart(natalChart);
  const transits = getTransitSource(chart, date);
  const jupiterSign = getJupiterSign(transits);
  const dayNakshatra = getDayNakshatra(transits);
  const birthNakshatra = getBirthNakshatra(chart);
  const jupiterActive = FAVORABLE_JUPITER_SIGNS.has(jupiterSign);
  const dayActive = BLESSED_DAY_NAKSHATRAS.has(nakshatraToken(dayNakshatra));
  const birthActive = Boolean(birthNakshatra) && nakshatraToken(dayNakshatra) === nakshatraToken(birthNakshatra);

  const sources = {
    jupiter: sourceResult(
      jupiterActive,
      'Юпитер в благоприятном знаке',
      jupiterSign >= 0 ? SIGNS[jupiterSign] : 'не рассчитан'
    ),
    dayNakshatra: sourceResult(
      dayActive,
      'Накшатра дня Pushya/Magha/Rohini',
      dayNakshatra || 'не рассчитана'
    ),
    birthNakshatra: sourceResult(
      birthActive,
      'Луна в родной накшатре игрока',
      birthNakshatra ? `${dayNakshatra || 'не рассчитана'} / ${birthNakshatra}` : 'нет натальной карты'
    ),
    intentionPurity: sourceResult(
      false,
      'Чистота намерения',
      'placeholder Phase 7'
    )
  };

  const score = roundMilost(Object.values(sources).reduce((sum, source) => sum + source.score, 0));
  return {
    score,
    sources,
    multiplier: roundMilost(1 + score)
  };
}

export function getMilostToday() {
  const state = loadState();
  return state.milostToday || null;
}

export async function refreshMilost(date = new Date()) {
  const dateKey = formatDateKey(date);
  const current = getMilostToday();
  if (current?.date === dateKey) return current;

  const natalChart = loadSavedNatalChart();
  let currentTransits;
  try {
    currentTransits = await buildDailyTransits(date);
  } catch (e) {
    console.warn('[AWARA Milost] Swiss Ephemeris unavailable, fallback used:', e);
    currentTransits = estimateDailyTransits(date);
  }

  const calculated = computeMilost({ ...(natalChart || {}), currentTransits }, date);
  const milostToday = {
    date: dateKey,
    ...calculated
  };
  updateState({ milostToday });
  return milostToday;
}
