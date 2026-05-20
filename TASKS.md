# AWARA — TASKS (бэклог микро-задач)

**Контракт:** одна задача = 5-10 мин Devin-времени = 1 атомарный коммит = 1 деплой.

**Как пользоваться:**
- Берёшь ПЕРВУЮ неотмеченную `[ ]` сверху вниз.
- Делаешь по DoD буквально. Если не получается за 10 мин — разрезай (`T-XXXa` / `T-XXXb`).
- Ставишь `[x]` после коммита.
- Если что-то критично непонятно — ставишь `ASK:` в заголовке, не отмечаешь, идёшь к следующей.

**Поля задачи:**
- **DoD** — Definition of Done. Чёткий критерий, по которому проверяемо что задача закрыта.
- **Файлы** — какие файлы трогать.
- **Est** — ожидаемое Devin-время.
- **ASK** — пока не отвечено Pavel'ом, задачу не брать.

---

## Phase 0 — данные и фундамент (продолжение)

### Подключение канона в UI

- [x] **T-001 · подгрузить data/agents.json в matrices.html (заменить хардкод имён агентов)**
  DoD: открыть matrices.html — список 21 агента подгружается через `fetch('data/agents.json')`, отображается в той же UI-форме что и сейчас (только источник данных меняется). В DevTools нет ошибок.
  Файлы: `matrices.html`
  Est: 8 мин

- [x] **T-002 · подгрузить data/agents.json в tigel.html (заменить хардкод имён, если есть)**
  DoD: где в tigel.html встречаются хардкод имена агентов (Свет Ра, Брахма и т.д.) — заменены на чтение из JSON. Если таких хардкодов нет — задача закрыта пометкой «нет хардкода» в коммит-сообщении.
  Файлы: `tigel.html`
  Est: 6 мин

- [x] **T-003 · подгрузить data/matrices.json в matrices.html (заменить хардкод 33 матриц)**
  DoD: 33 матрицы рендерятся из JSON. Активная матрица (по `awara_active_matrix` slug) выделяется. Конфликт-описание из JSON показывается под названием.
  Файлы: `matrices.html`, опционально `data/matrices.json` (только чтение)
  Est: 10 мин

- [x] **T-004 · в dashboard.html: показать текущего агента игрока в hero-блоке**
  DoD: если в `state.activeSystem.agent_slug` (или эквиваленте) сохранено — рядом с балансом Светкоина дополнительно отрисовать имя агента + его культурное соответствие в активной матрице (lookup из `data/agent_matrix_map.json`).
  Файлы: `dashboard.html`
  Est: 9 мин
  ASK: какое поле в state хранит активного агента игрока? (если нет — какой по умолчанию Свет Ра?)

### Расширение канон-данных

- [x] **T-005 · сгенерировать data/zones.json (9 Васту-зон)**
  DoD: новый файл `data/zones.json`, массив из 9 объектов: `{id, slug, name, direction, element, planet, quality}`. Источник: лорбук «Vastu» в `lore/text/`. Парсер — Python, оставить в `tools/build_zones.py`.
  Файлы: `data/zones.json`, `tools/build_zones.py`
  Est: 10 мин

- [x] **T-006 · сгенерировать data/locas.json (14 лок плотностей)**
  DoD: новый файл `data/locas.json`, массив из 14 объектов: `{id, name, density, description}`. Источник: лор. Парсер либо ручная транскрипция (если в лоре нет машинно-читаемого формата) — в `tools/`.
  Файлы: `data/locas.json`, опц. `tools/build_locas.py`
  Est: 10 мин
  ASK: какие 14 лок (есть ли список в готовом виде в лоре, или нужен синтез)?

- [x] **T-007 · сгенерировать data/chakras.json (9 чакр-мер)**
  DoD: новый файл `data/chakras.json`, массив из 9 объектов: `{id, slug, name, sanskrit, position, color, element, mantra_seed}`. Источник: лор + `AWARA_Zodiac_and_Chakra_Prompts_Expansion.txt`.
  Файлы: `data/chakras.json`, опц. `tools/build_chakras.py`
  Est: 10 мин

### Игровое состояние (PlayerState)

- [x] **T-008 · создать js/playerState.js — минимальный API**
  DoD: новый модуль с функциями `getState()`, `saveState(state)`, `migrate(legacyState)`. Ключ — `awara_v258_state` (новый), миграция с `awara_v255_state` (если есть). Покрывает поля: `totalLight`, `sphereData`, `spirit`, `elements`, `activeSystem`, `journey`. Никакой логики игры — только I/O.
  Файлы: `js/playerState.js`
  Est: 10 мин

- [x] **T-009 · подключить js/playerState.js в dashboard.html (рефакторинг)**
  DoD: dashboard.html больше не читает `localStorage.getItem('awara_v255_state')` напрямую — вместо этого `import { getState } from './js/playerState.js'`. Поведение пользователя не меняется.
  Файлы: `dashboard.html`, `js/playerState.js`
  Est: 7 мин (зависит от T-008)

- [x] **T-010 · подключить js/playerState.js в tigel.html (рефакторинг)**
  DoD: аналогично T-009.
  Файлы: `tigel.html`, `js/playerState.js`
  Est: 7 мин (зависит от T-008)

### Mobile-аудит (по экранам)

- [x] **T-011 · mobile-audit index.html (320 / 375 / 768)**
  DoD: на 3 viewport'ах: нет горизонтального скролла, все интерактивные элементы ≥ 44×44 px, текст ≥ 14 px, кнопки не наезжают друг на друга. Скриншоты в комменте к коммиту. Если есть проблемы — фиксить ИХ ЖЕ в этой же задаче.
  Файлы: `index.html` (правки media-queries при необходимости)
  Est: 10 мин

- [x] **T-012 · mobile-audit dashboard.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `dashboard.html`
  Est: 8 мин

- [x] **T-013 · mobile-audit tigel.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `tigel.html`
  Est: 10 мин

- [x] **T-014 · mobile-audit matrices.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `matrices.html`
  Est: 10 мин

- [x] **T-015 · mobile-audit earth-player.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `earth-player.html`
  Est: 10 мин

### Документация и инфраструктура

- [x] **T-016 · обновить README.md в корне (для людей, не для Devin'а)**
  DoD: README.md содержит: краткое описание AWARA (3-4 строки), как запустить (`python3 -m http.server 8765`), ссылку на START_PROMPT.md и AWARA_RULES.md, список 6 экранов, ссылку на public deploy. Без эмодзи.
  Файлы: `README.md`
  Est: 6 мин

- [x] **T-017 · добавить docs/screen-status.md (статус каждого экрана)**
  DoD: новый файл `docs/screen-status.md`. Таблица: экран | назначение | статус (ready/wip/placeholder) | известные проблемы. По каждому из 6 экранов.
  Файлы: `docs/screen-status.md`
  Est: 8 мин

### Phase 1 — Daily Loop

- [x] **T-018 · js/dailyKey.js — генератор Ключа Дня**
  DoD: ES-модуль `js/dailyKey.js`. `getDailyKey(date?)` возвращает `{date, agent, matrix, element, question}`. Детерминированный hash(date+playerId) через FNV-1a. Подтягивает agents.json и matrices.json. playerId хранится в localStorage.
  Файлы: `js/dailyKey.js`
  Est: 10 мин

- [x] **T-019 · карточка дня в лобби (index.html)**
  DoD: Большая плитка "Ключ Дня" на index.html. Показывает: агент дня (имя + иконка), матрица дня, стихия, вопрос дня. Данные из `getDailyKey()`. Обновляется каждый день.
  Файлы: `index.html`
  Est: 15 мин

- [x] **T-020 · 7-day streak визуализация в лобби**
  DoD: `js/streak.js` — recordVisit() + getStreak(). Виджет в лобби: 7 точек (Пн..Вс), золотые если визит был, серые если нет. Счётчик текущей серии. localStorage `awara_streak_days`.
  Файлы: `js/streak.js`, `index.html`
  Est: 10 мин

- [x] **T-021 · Тигель — 7 параметров на выходе (текстом)**
  DoD: Блок "ИТОГИ ДНЯ" в табе Баланс после расчёта тороида. 7 параметров: доминантная стихия, Пингала%, Ида%, баланс Сушумны, множитель майнинга, свет за сессию, рекомендация.
  Файлы: `tigel.html`
  Est: 10 мин

- [x] **T-022 · паспорт души v0 (passport.html)**
  DoD: Новый экран passport.html. Показывает: player ID, активный агент, матрица, светимость, доминантная стихия, дух (5 параметров), streak 7 дней. Кнопка в лобби.
  Файлы: `passport.html`, `index.html`
  Est: 15 мин

- [x] **T-023 · 9 Васту-зон кликабельные (earth-player.html)**
  DoD: Клик по зоне на canvas-карте Васту открывает попап с инфо: название, направление, стихия, планета, качество, список строений. Данные из zones.json.
  Файлы: `earth-player.html`
  Est: 12 мин

- [x] **T-024 · 9 базовых построек (стоимость свет+ключи)**
  DoD: 9 строений (1 на Васту-зону) с двойной стоимостью: свет + ключи. UI показывает обе валюты. Проверка при покупке. Зона-строение привязка.
  Файлы: `earth-player.html`
  Est: 12 мин

- [x] **T-025 · cards.html — колода 63 карт (21 агент × 3 матрицы)**
  DoD: Страница cards.html с 63 картами (собранные/закрытые). Фильтр по матрице. Попап карты. Кнопка в лобби. Бейдж счётчика.
  Файлы: `cards.html`, `index.html`
  Est: 15 мин

### Phase 2 — Card Economy

- [x] **T-026 · получение карты из daily reward (~5% шанс при ежедневном визите)**
  DoD: `js/dailyReward.js` — модуль с `checkDailyReward()`. При первом заходе в лобби за день: 5% шанс получить случайную несобранную карту. Карта добавляется в `awara_cards` (localStorage). Попап с именем агента, матрицей, стихией, зоной. Бейдж колоды обновляется. Если все 63 собраны — не падает.
  Файлы: `js/dailyReward.js`, `index.html`
  Est: 10 мин

- [x] **T-027 · эффекты карт на Тигель/Землю**
  DoD: собранные карты дают бонусы: +1 свет/час (Ведическая), +5% шанс ключа (Славянская), +1 ключ при streak 7 (Каббалистическая). Эффекты отображаются в Тигеле и Земле.
  Файлы: `tigel.html`, `earth-player.html`, `js/cardEffects.js`
  Est: 15 мин

- [x] **T-028 · переключатель матрицы восприятия (UI reskin)**
  DoD: в лобби или настройках можно переключить активную матрицу (Ведическая/Славянская/Каббалистическая). UI-элементы (названия, иконки, цвета) адаптируются под выбранную матрицу.
  Файлы: `index.html`, `js/matrixSwitcher.js`
  Est: 15 мин

---

### Phase 3 — Натальная карта и Оракул

- [x] **T-029 · natal.html: форма ввода натальных данных (UI)**
  DoD: новый экран `natal.html` со стилем AWARA. Поля: дата рождения, время рождения, город (текст). Кнопка «Рассчитать» (пока placeholder). Кнопка «Натальная карта» в лобби. Данные сохраняются в `localStorage` (`awara_natal_data`).
  Файлы: `natal.html`, `index.html`
  Est: 10 мин

- [x] **T-030 · подключить Swiss Ephemeris (JS-порт для браузера)**
  DoD: по сохранённым натальным данным рассчитать: 9 планет (Навграхи), 12 домов (Бхавы, Whole Sign), Лагна (Асцендент), накшатры. Сидерический зодиак (Lahiri аянамша). Геокодирование города через Nominatim (OpenStreetMap). Результат отображается на `natal.html` и сохраняется в `localStorage` (`awara_natal_chart`).
  Файлы: `natal.html`, `lib/swisseph/`
  Est: 15 мин

- [x] **T-031 · Оракул v0 (LLM-интеграция)**
  DoD: экран оракула с чатом. Игрок задаёт вопрос — LLM отвечает в контексте AWARA (агент, матрица, стихия). API-ключ НЕ в коде (§6.5). Placeholder если ключ не задан.
  Файлы: `oracle.html`, `js/oracle.js`
  Est: 15 мин

### Phase 3b — Доработки натальной карты и Оракула

- [x] **T-032 · Конституция (доша) из натальной карты**
  DoD: после расчёта натальной карты отображается блок «Конституция (Панча-Бхута)» — 5 стихий (Огонь/Земля/Воздух/Вода/Эфир) с процентами и доминантной стихией. Весовые коэффициенты: Лагна/Солнце/Луна = 3, грахи = 2, Раху/Кету → Эфир = 1. Результат в localStorage `awara_dosha`.
  Файлы: `js/dosha.js`, `natal.html`
  Est: 10 мин

- [ ] **T-033 · Накшатра-агенты в Тигель**
  DoD: в Тигеле показывается текущий накшатра-агент из натальной карты, влияющий на дневной расчёт.
  Файлы: `tigel.html`
  Est: 10 мин

- [x] **T-034 · Контексты Оракула (4 режима)**
  DoD: Оракул поддерживает 4 контекста: толкование дня / наставник матрицы / зеркало выбора / архивариус. UI для выбора контекста.
  Файлы: `oracle.html`, `js/oracle.js`
  Est: 15 мин

- [x] **T-035 · Safety-prompt для Оракула**
  DoD: системный промпт Оракула запрещает медицинские/финансовые/опасные советы.
  Файлы: `js/oracle.js`
  Est: 5 мин

- [x] **T-036 · Анимации перехода между матрицами**
  DoD: плавные CSS-анимации при переключении матрицы восприятия. Fade-in/out элементов, цветовые переходы.
  Файлы: `js/matrixSwitcher.js`, `index.html`
  Est: 10 мин

---

### Phase 5 — Вселенная игрока и большое игровое пространство

- [x] **T-049 · единый документ замен для большого игрового пространства**
  DoD: создан единый документ проверки и замен `game-space-changes.md`: что уже есть в проекте, что заменено, что остаётся будущей архитектурой, какие следующие шаги безопасны для mobile universe.
  Файлы: `game-space-changes.md`
  Est: 10 мин

---

### Phase 6 — Companion & Grace

- [x] **T-073 · js/milost-module.js — расчёт Милости дня**
  DoD: новый ES6-модуль `js/milost-module.js`; экспортирует `computeMilost(natalChart, date)`, `getMilostToday()`, `refreshMilost()`; считает 4 источника милости, множитель `1.0 + score`, сохраняет `state.milostToday` через `state-module`.
  Файлы: `js/milost-module.js`, `TASKS.md`, `HANDOFF.md`
  Est: 10 мин

- [x] **T-074 · passport.html — панель «Милость Дня»**
  DoD: в паспорте показаны score, 4 источника, множитель и дата расчёта; использует `getMilostToday()`.
  Файлы: `passport.html`, `js/milost-module.js`
  Est: 10 мин

- [x] **T-075 · tigel.html — применить множитель Милости**
  DoD: итоговый свет Тигеля умножается на `milostToday.multiplier`, в итогах дня видно базу, множитель и результат.
  Файлы: `tigel.html`, `js/milost-module.js`
  Est: 8 мин

- [x] **T-076 · data/daimon-forms.json — 27 накшатр → форма Даймона**
  DoD: новый JSON с 27 объектами накшатр и формами хранителя, валиден и пригоден для lookup.
  Файлы: `data/daimon-forms.json`
  Est: 10 мин

- [x] **T-077 · js/daimon-module.js — генерация Даймона**
  DoD: новый ES6-модуль создаёт/читает Даймона из натальной карты, dosha, сильнейшей планеты, уровня и stage.
  Файлы: `js/daimon-module.js`, `data/daimon-forms.json`
  Est: 10 мин

- [x] **T-078 · daimon.html — экран Хранителя**
  DoD: новый экран показывает форму, элемент, архетип, имя, stage, уровень и resonanceBonus; mobile-pass 320/375/768.
  Файлы: `daimon.html`, `js/daimon-module.js`
  Est: 15 мин

- [x] **T-079 · tigel.html — resonance bonus от Даймона**
  DoD: при совпадении стихии дня и элемента Даймона применяется `resonanceBonus`; UI показывает источник бонуса.
  Файлы: `tigel.html`, `js/daimon-module.js`
  Est: 8 мин

- [x] **T-080 · passport.html — иконка Даймона**
  DoD: паспорт показывает компактную карточку/иконку Даймона и ссылку на `daimon.html`.
  Файлы: `passport.html`, `js/daimon-module.js`
  Est: 7 мин

- [x] **T-081 · data/temple-ecosystems.json — экосистемы 33 храмов**
  DoD: новый JSON из 33 объектов матриц с шаблоном имени храма, вселенной, flora, minerals, creatures, ambient, basePassiveSvet.
  Файлы: `data/temple-ecosystems.json`
  Est: 10 мин

- [ ] **T-082 · js/temple-module.js — логика храмов (superseded by Phase 7: см. E-013/E-014/E-016)**
  DoD: модуль умеет `buildTemple(matrixId)`, `getTemples()`, `collectPassiveSvet()`, `getTempleByMatrix(matrixId)` и использует Daimon stage + Milost multiplier.
  Файлы: `js/temple-module.js`, `data/temple-ecosystems.json`
  Est: 12 мин

- [ ] **T-083 · earth-player.html — маркеры храмов на Canvas (superseded by Phase 7: см. E-013/E-014/E-016)**
  DoD: построенные храмы отображаются золотыми точками, клик открывает попап экосистемы и сбор пассивного света; mobile-pass 320/375/768.
  Файлы: `earth-player.html`, `js/temple-module.js`
  Est: 15 мин

- [ ] **T-084 · matrix.html — кнопка «Воздвигнуть Храм» (superseded by Phase 7: см. E-013/E-014/E-016)**
  DoD: у матрицы появляется кнопка постройки за 10000 света, disabled при нехватке света, после постройки церемониальный попап.
  Файлы: `matrix.html`, `js/temple-module.js`
  Est: 10 мин

---

## Phase 7 -- Enhancement (E-001..E-017)

### Milost v2.0 (E-001..E-005)

- [x] **E-001 · data/milost-sources.json -- 7 источников Милости по 7 Лучам**
  DoD: JSON-массив из 7 объектов (id, ray, name_ru, description, veil_threshold, macrocosm_message, multiplier).
  Файлы: `data/milost-sources.json`
  Est: 10 мин

- [x] **E-002 · js/milost-module.js -- движок Милости v2.0**
  DoD: модуль загружает milost-sources.json, вычисляет текущий уровень благодати, множитель луча, пробой Завесы.
  Файлы: `js/milost-module.js`
  Est: 15 мин

- [x] **E-003 · milost.html -- экран Милости**
  DoD: новая страница отображает 7 источников, прогресс-бары до veil_threshold, послание макрокосма при пробое.
  Файлы: `milost.html`
  Est: 15 мин

- [x] **E-004 · интеграция Милости в Тигель**
  DoD: множитель Милости влияет на расчёт баланса в tigel.html.
  Файлы: `tigel.html`, `js/milost-module.js`
  Est: 10 мин

- [x] **E-005 · интеграция Милости в лобби**
  DoD: в лобби виджет текущего уровня благодати и активного Луча.
  Файлы: `index.html`, `js/milost-module.js`
  Est: 10 мин

### Daimon v2.0 (E-006..E-011)

- [x] **E-006 · расширение data/daimon-stages.json -- стадии роста Даймона**
  DoD: JSON с расширенными стадиями эволюции, порогами перехода, бонусами.
  Файлы: `data/daimon-stages.json`
  Est: 10 мин

- [x] **E-007 · js/daimon-module.js v2.0 -- расширенная логика Даймона**
  DoD: модуль поддерживает новые стадии, диалоги, влияние на Милость.
  Файлы: `js/daimon-module.js`
  Est: 15 мин

- [x] **E-008 · daimon.html v2.0 -- расширенный экран Даймона**
  DoD: экран показывает текущую стадию, прогресс, диалог с Даймоном.
  Файлы: `daimon.html`
  Est: 15 мин

- [x] **E-009 · диалоговая система Даймона**
  DoD: Даймон может давать подсказки на основе состояния игрока.
  Файлы: `js/daimon-module.js`, `daimon.html`
  Est: 15 мин

- [x] **E-010 · интеграция Даймона с Оракулом**
  DoD: Даймон влияет на контексты Оракула, добавляет свой голос.
  Файлы: `js/oracle.js`, `js/daimon-module.js`
  Est: 10 мин

- [x] **E-011 · интеграция Даймона в лобби**
  DoD: виджет состояния Даймона в лобби, индикатор стадии.
  Файлы: `index.html`, `js/daimon-module.js`
  Est: 10 мин

### Temple v2.0 (E-012..E-017)

- [x] **E-012 · data/temple-upgrades.json -- улучшения храмов**
  DoD: JSON с деревом улучшений для храмов, стоимостями, эффектами.
  Файлы: `data/temple-upgrades.json`
  Est: 10 мин

- [x] **E-013 · js/temple-module.js v2.0 -- расширенная логика храмов**
  DoD: модуль поддерживает постройку, улучшение, сбор пассивного света, экосистемы.
  Файлы: `js/temple-module.js`
  Est: 15 мин

- [x] **E-014 · earth-player.html v2.0 -- храмы на карте**
  DoD: маркеры храмов на Canvas, попап экосистемы, сбор света, mobile-pass.
  Файлы: `earth-player.html`, `js/temple-module.js`
  Est: 15 мин

- [x] **E-015 · temple.html -- экран управления храмом**
  DoD: отдельная страница для управления храмом, просмотра экосистемы, улучшений.
  Файлы: `temple.html`
  Est: 15 мин

- [x] **E-016 · matrix.html v2.0 -- кнопка постройки храма**
  DoD: кнопка постройки за свет, церемониальный попап, связь с temple-module.
  Файлы: `matrix.html`, `js/temple-module.js`
  Est: 10 мин

- [ ] **E-017 · интеграция Temple в лобби и паспорт**
  DoD: виджет храмов в лобби, секция храмов в паспорте.
  Файлы: `index.html`, `passport.html`, `js/temple-module.js`
  Est: 10 мин

---

## Done (закрытые)

*(Сюда не двигаем. Просто помечаем `[x]` в основном списке. Эта секция — placeholder для аналитики позже.)*

— Пусто.

---

## Backlog (Phase 1+, не для текущих смен)

Сюда складываем идеи и задачи Phase 1+ чтобы не потерять. Текущие смены берут ТОЛЬКО из верхнего списка Phase 0.

- daily key generator: `js/dailyKey.js` — детерминированный hash(date+playerId) → агент+матрица+стихия+вопрос
- карточка дня в лобби (большая, заметная)
- 7-day streak визуализация
- Тигель: 7 параметров на выходе (текстом)
- паспорт души v0
- 9 Васту-зон кликабельные на earth-player.html
- 9 базовых построек (стоимость свет+ключи)
- cards.html: колода 63 карт (21 × 3 матрицы Vedic/Slavic/Kabbalistic)
- получение карты из daily reward (~5%)
- эффекты карт на Тигель/Землю
- переключатель матрицы восприятия (UI reskin)
- натальная карта (Swiss Ephemeris)
- Оракул (LLM)
- генерация изображений / музыки

(см. также `docs/roadmap.md` — там полный план)
