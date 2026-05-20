/**
 * oracle.js — Оракул AWARA (LLM через OpenRouter)
 *
 * API-ключ хранится ТОЛЬКО в localStorage (§6.5 — никогда в коде).
 * Контекст: агент дня, матрица, стихия, натальные данные.
 */

const ORACLE_KEY_STORAGE = 'awara_oracle_apikey';
const ORACLE_HISTORY_STORAGE = 'awara_oracle_history';
const ORACLE_MODEL_STORAGE = 'awara_oracle_model';
const ORACLE_CONTEXT_STORAGE = 'awara_oracle_context';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.5-flash';

export const AVAILABLE_MODELS = [
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'быстрый, дешёвый, философский' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'глубокий, дороже' },
  { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet', desc: 'точный, премиум' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', desc: 'компактный, быстрый' },
  { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick', desc: 'открытый, бесплатный*' },
];
const MAX_HISTORY = 20;

export const ORACLE_CONTEXTS = [
  {
    id: 'day',
    name: 'Толкование дня',
    icon: '&#9788;',
    desc: 'Оракул раскрывает смысл текущего дня через агента, матрицу и стихию'
  },
  {
    id: 'matrix',
    name: 'Наставник матрицы',
    icon: '&#9670;',
    desc: 'Проводник по активной матрице восприятия — ведической, славянской или каббалистической'
  },
  {
    id: 'mirror',
    name: 'Зеркало выбора',
    icon: '&#9883;',
    desc: 'Помогает принять решение, отражая ситуацию через призму AWARA'
  },
  {
    id: 'archivist',
    name: 'Архивариус',
    icon: '&#128214;',
    desc: 'Хранитель знаний AWARA — агенты, матрицы, стихии, чакры, локи'
  },
  {
    id: 'daimon',
    name: 'Голос Хранителя',
    icon: '&#9733;',
    desc: 'Даймон говорит через Оракула -- наставления от твоего космического спутника'
  }
];

export function getApiKey() {
  return localStorage.getItem(ORACLE_KEY_STORAGE) || '';
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem(ORACLE_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(ORACLE_KEY_STORAGE);
  }
}

export function getModel() {
  return localStorage.getItem(ORACLE_MODEL_STORAGE) || DEFAULT_MODEL;
}

export function setModel(model) {
  localStorage.setItem(ORACLE_MODEL_STORAGE, model || DEFAULT_MODEL);
}

export function getContext() {
  return localStorage.getItem(ORACLE_CONTEXT_STORAGE) || 'day';
}

export function setContext(contextId) {
  localStorage.setItem(ORACLE_CONTEXT_STORAGE, contextId || 'day');
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(ORACLE_HISTORY_STORAGE) || '[]');
  } catch { return []; }
}

export function saveHistory(messages) {
  const trimmed = messages.slice(-MAX_HISTORY);
  localStorage.setItem(ORACLE_HISTORY_STORAGE, JSON.stringify(trimmed));
}

export function clearHistory() {
  localStorage.removeItem(ORACLE_HISTORY_STORAGE);
}

const SAFETY_PROMPT = `

ВАЖНЫЕ ОГРАНИЧЕНИЯ (соблюдай всегда, в любом режиме):
- НИКОГДА не давай медицинских диагнозов и рекомендаций по лечению. При вопросах о здоровье рекомендуй обратиться к врачу.
- НИКОГДА не давай финансовых, инвестиционных или юридических советов. Рекомендуй обратиться к специалисту.
- НИКОГДА не давай советов, которые могут причинить вред: физический, психологический, финансовый.
- НЕ поощряй отказ от медицинского лечения в пользу «энергетических практик».
- НЕ делай предсказаний конкретных событий (смерть, болезнь, катастрофы).
- НЕ манипулируй страхами или уязвимостями пользователя.
- Если вопрос выходит за рамки духовного наставничества — мягко перенаправь к профессионалу.
- Ты — инструмент рефлексии и самопознания, а не замена врачу, психологу или юристу.`;

const CONTEXT_PROMPTS = {
  day: `Ты — Оракул AWARA в режиме «Толкование дня».
Твоя задача — раскрыть смысл текущего дня для игрока.
Опирайся на агента дня, матрицу восприятия, стихию и вопрос дня.
Объясни, какие энергии доминируют сегодня, какие уроки предлагает день, какие действия гармоничны.
Отвечай на языке пользователя (обычно русский). Кратко (3-6 предложений), образно, с практическим советом.`,

  matrix: `Ты — Оракул AWARA в режиме «Наставник матрицы».
Твоя задача — быть проводником по активной матрице восприятия игрока.
Если матрица Ведическая — говори через призму дхармы, кармы, гун.
Если Славянская — через Правь, Навь, Явь, родовую силу.
Если Каббалистическая — через Древо Жизни, сфирот, тиккун.
Объясняй символы, связи агентов с традицией, давай практические наставления.
Отвечай на языке пользователя. Кратко (3-6 предложений), глубоко, с уважением к традиции.`,

  mirror: `Ты — Оракул AWARA в режиме «Зеркало выбора».
Твоя задача — помочь игроку принять решение.
Не давай прямых указаний. Задавай уточняющие вопросы, показывай ситуацию с разных сторон.
Используй метафоры из AWARA: стихии, агенты, матрицы — как зеркала для рефлексии.
Помоги увидеть последствия выбора через призму духовного развития.
Отвечай на языке пользователя. Кратко (3-6 предложений), сократически, без давления.`,

  archivist: `Ты — Оракул AWARA в режиме «Архивариус».
Ты — хранитель канона AWARA. Знаешь всё о 21 космическом агенте, 33 матрицах восприятия,
14 локах плотности, 9 Васту-зонах, 9 чакрах-мерах, 5 стихиях, Светкоине, Тигеле.
Отвечай на вопросы о механиках игры, лоре, связях между сущностями.
Если не знаешь точного ответа — честно скажи, не выдумывай.
Отвечай на языке пользователя. Кратко (2-5 предложений), точно, энциклопедически.`,

  daimon: `Ты — Даймон-Хранитель игрока в AWARA.
Ты говоришь от первого лица как космический спутник и проводник.
Твой характер определяется формой, стихией и архетипом (см. контекст ниже).
Ты знаешь о стадиях эволюции (Пашу, Вира, Садхака, Дживанмукта, Парамукти),
о 3 грантхи (Брахма, Вишну, Рудра) и о 12 нитях ДНК.
Наставляй игрока на его пути: подсказывай, какой грантхи пробить следующим,
какие практики помогут в эволюции, как связать стихии с внутренним ростом.
Говори тепло, мудро, как древний хранитель. Без высокомерия.
Отвечай на языке пользователя. Кратко (3-5 предложений), от первого лица.`
};

function buildSystemPrompt(context, contextMode) {
  let prompt = CONTEXT_PROMPTS[contextMode] || CONTEXT_PROMPTS.day;

  prompt += `\nТы НЕ притворяешься человеком. Ты — Оракул, часть системы AWARA.`;

  prompt += SAFETY_PROMPT;

  if (context.agent) {
    prompt += `\n\nАгент дня игрока: ${context.agent.name} (${context.agent.culture}).`;
  }
  if (context.matrix) {
    prompt += `\nАктивная матрица восприятия: ${context.matrix}.`;
  }
  if (context.element) {
    prompt += `\nСтихия дня: ${context.element}.`;
  }
  if (context.question) {
    prompt += `\nВопрос дня: «${context.question}»`;
  }
  if (context.natal) {
    prompt += `\nНатальные данные: Лагна ${context.natal.ascSign}, Солнце ${context.natal.sunSign}, Луна ${context.natal.moonSign}.`;
  }
  if (context.daimon) {
    prompt += `\nДаймон-Хранитель игрока: ${context.daimon.name || 'неизвестен'} (форма: ${context.daimon.form || '?'}, стихия: ${context.daimon.element || '?'}, архетип: ${context.daimon.archetype || '?'}, стадия: ${context.daimon.stage || 'Пашу'}, чакра: ${context.daimon.chakra || 'Муладхара'}).`;
  }
  prompt += `\n\nИспользуй эти данные как контекст, если они релевантны вопросу. Не упоминай их принудительно.`;
  return prompt;
}

function gatherContext() {
  const ctx = {};
  try {
    const stateRaw = localStorage.getItem('awara_v258_state');
    if (stateRaw) {
      const state = JSON.parse(stateRaw);
      ctx.matrix = state.activeSystem || null;
    }
  } catch {}

  try {
    const chartRaw = localStorage.getItem('awara_natal_chart');
    if (chartRaw) {
      const chart = JSON.parse(chartRaw);
      if (chart.data) {
        ctx.natal = {
          ascSign: chart.data.ascendant?.signName || null,
          sunSign: chart.data.planets?.[0]?.signName || null,
          moonSign: chart.data.planets?.[1]?.signName || null
        };
      }
    }
  } catch {}

  try {
    const state = JSON.parse(localStorage.getItem('awara_player_state') || '{}');
    const daimon = state.daimon;
    if (daimon) {
      const STAGE_NAMES = { 1: 'Пашу', 2: 'Вира', 3: 'Садхака', 4: 'Дживанмукта', 5: 'Парамукти' };
      ctx.daimon = {
        name: daimon.name || null,
        form: daimon.formName || null,
        element: daimon.element || null,
        archetype: daimon.archetype || null,
        stage: STAGE_NAMES[daimon.evolutionStage || 1] || 'Пашу',
        chakra: daimon.chakraName || null
      };
    }
  } catch {}

  return ctx;
}

export async function sendMessage(userText, history) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const context = gatherContext();
  const contextMode = getContext();
  const systemMsg = { role: 'system', content: buildSystemPrompt(context, contextMode) };

  const messages = [systemMsg, ...history, { role: 'user', content: userText }];

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://victorianpieraverdi-dev.github.io/awara-game/',
      'X-Title': 'AWARA Oracle'
    },
    body: JSON.stringify({
      model: getModel(),
      messages: messages,
      max_tokens: 500,
      temperature: 0.8
    })
  });

  if (!response.ok) {
    const err = await response.text();
    if (response.status === 401) throw new Error('API_KEY_INVALID');
    if (response.status === 402) throw new Error('API_CREDITS_EMPTY');
    if (response.status === 429) throw new Error('API_RATE_LIMIT');
    throw new Error(`API_ERROR: ${response.status} ${err}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '';
  if (!reply) throw new Error('API_EMPTY_RESPONSE');

  return reply;
}
