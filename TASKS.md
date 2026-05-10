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

- [ ] **T-005 · сгенерировать data/zones.json (9 Васту-зон)**
  DoD: новый файл `data/zones.json`, массив из 9 объектов: `{id, slug, name, direction, element, planet, quality}`. Источник: лорбук «Vastu» в `lore/text/`. Парсер — Python, оставить в `tools/build_zones.py`.
  Файлы: `data/zones.json`, `tools/build_zones.py`
  Est: 10 мин

- [ ] **T-006 · сгенерировать data/locas.json (14 лок плотностей)**
  DoD: новый файл `data/locas.json`, массив из 14 объектов: `{id, name, density, description}`. Источник: лор. Парсер либо ручная транскрипция (если в лоре нет машинно-читаемого формата) — в `tools/`.
  Файлы: `data/locas.json`, опц. `tools/build_locas.py`
  Est: 10 мин
  ASK: какие 14 лок (есть ли список в готовом виде в лоре, или нужен синтез)?

- [ ] **T-007 · сгенерировать data/chakras.json (9 чакр-мер)**
  DoD: новый файл `data/chakras.json`, массив из 9 объектов: `{id, slug, name, sanskrit, position, color, element, mantra_seed}`. Источник: лор + `AWARA_Zodiac_and_Chakra_Prompts_Expansion.txt`.
  Файлы: `data/chakras.json`, опц. `tools/build_chakras.py`
  Est: 10 мин

### Игровое состояние (PlayerState)

- [ ] **T-008 · создать js/playerState.js — минимальный API**
  DoD: новый модуль с функциями `getState()`, `saveState(state)`, `migrate(legacyState)`. Ключ — `awara_v258_state` (новый), миграция с `awara_v255_state` (если есть). Покрывает поля: `totalLight`, `sphereData`, `spirit`, `elements`, `activeSystem`, `journey`. Никакой логики игры — только I/O.
  Файлы: `js/playerState.js`
  Est: 10 мин

- [ ] **T-009 · подключить js/playerState.js в dashboard.html (рефакторинг)**
  DoD: dashboard.html больше не читает `localStorage.getItem('awara_v255_state')` напрямую — вместо этого `import { getState } from './js/playerState.js'`. Поведение пользователя не меняется.
  Файлы: `dashboard.html`, `js/playerState.js`
  Est: 7 мин (зависит от T-008)

- [ ] **T-010 · подключить js/playerState.js в tigel.html (рефакторинг)**
  DoD: аналогично T-009.
  Файлы: `tigel.html`, `js/playerState.js`
  Est: 7 мин (зависит от T-008)

### Mobile-аудит (по экранам)

- [ ] **T-011 · mobile-audit index.html (320 / 375 / 768)**
  DoD: на 3 viewport'ах: нет горизонтального скролла, все интерактивные элементы ≥ 44×44 px, текст ≥ 14 px, кнопки не наезжают друг на друга. Скриншоты в комменте к коммиту. Если есть проблемы — фиксить ИХ ЖЕ в этой же задаче.
  Файлы: `index.html` (правки media-queries при необходимости)
  Est: 10 мин

- [ ] **T-012 · mobile-audit dashboard.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `dashboard.html`
  Est: 8 мин

- [ ] **T-013 · mobile-audit tigel.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `tigel.html`
  Est: 10 мин

- [ ] **T-014 · mobile-audit matrices.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `matrices.html`
  Est: 10 мин

- [ ] **T-015 · mobile-audit earth-player.html (320 / 375 / 768)**
  DoD: см. T-011.
  Файлы: `earth-player.html`
  Est: 10 мин

### Документация и инфраструктура

- [ ] **T-016 · обновить README.md в корне (для людей, не для Devin'а)**
  DoD: README.md содержит: краткое описание AWARA (3-4 строки), как запустить (`python3 -m http.server 8765`), ссылку на START_PROMPT.md и AWARA_RULES.md, список 6 экранов, ссылку на public deploy. Без эмодзи.
  Файлы: `README.md`
  Est: 6 мин

- [ ] **T-017 · добавить docs/screen-status.md (статус каждого экрана)**
  DoD: новый файл `docs/screen-status.md`. Таблица: экран | назначение | статус (ready/wip/placeholder) | известные проблемы. По каждому из 6 экранов.
  Файлы: `docs/screen-status.md`
  Est: 8 мин

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
