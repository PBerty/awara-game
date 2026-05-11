/**
 * dailyKey.js — детерминированный генератор Ключа Дня
 * hash(YYYY-MM-DD + playerId) → агент + матрица + стихия + вопрос
 *
 * Использование:
 *   import { getDailyKey } from './js/dailyKey.js';
 *   const key = await getDailyKey();  // { date, agent, matrix, element, question }
 */

const ELEMENTS = ['water', 'wood', 'fire', 'earth', 'metal'];

const QUESTIONS = [
  'Что сегодня просит твоё тело?',
  'Какой страх ты готов отпустить?',
  'Что ты создаёшь прямо сейчас?',
  'Кому ты благодарен сегодня?',
  'Какая стихия зовёт тебя?',
  'Что ты откладываешь и почему?',
  'Где в теле живёт напряжение?',
  'Какое намерение ведёт этот день?',
  'Что хочет сказать тишина?',
  'Какой урок повторяется?',
  'Что значит "достаточно" сегодня?',
  'Какая практика нужна прямо сейчас?',
  'О чём мечтает твоё сердце?',
  'Что мешает потоку?',
  'Какой дар ты несёшь миру?',
  'Что питает твой огонь?',
  'Где граница между усилием и принятием?',
  'Какой голос внутри самый тихий?',
  'Что ты выбираешь: страх или любовь?',
  'Какая часть тебя просит внимания?',
  'Что означает свобода сегодня?',
];

/** Simple deterministic hash (FNV-1a 32-bit) */
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getPlayerId() {
  let id = localStorage.getItem('awara_player_id');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    localStorage.setItem('awara_player_id', id);
  }
  return id;
}

/**
 * @param {string} [date] — ISO-дата (по умолчанию сегодня)
 * @returns {Promise<{date,agent,matrix,element,question}>}
 */
export async function getDailyKey(date) {
  const d = date || todayISO();
  const pid = getPlayerId();
  const seed = fnv1a(d + ':' + pid);

  const [agents, matrices] = await Promise.all([
    fetch('data/agents.json').then(r => r.json()),
    fetch('data/matrices.json').then(r => r.json()),
  ]);

  const agent   = agents[seed % agents.length];
  const matrix  = matrices[(seed >>> 4) % matrices.length];
  const element = ELEMENTS[(seed >>> 8) % ELEMENTS.length];
  const question = QUESTIONS[(seed >>> 12) % QUESTIONS.length];

  return { date: d, agent, matrix, element, question };
}
