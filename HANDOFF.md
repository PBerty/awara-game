# AWARA — HANDOFF (журнал смен)

**Цель документа:** в любой момент любая Devin-сессия знает, на каком кадре остановилась прошлая.

**Правило:** перед `block_on_user=true` сессия ОБЯЗАНА обновить блок «Текущая смена» (заменив на свою) и записать в «Лог смен» строку о завершении.

---

## Постоянные ссылки

| Что | URL |
|---|---|
| Репо (источник правды) | https://github.com/victorianpieraverdi-dev/awara-game |
| Live deploy (master, через GitHub Pages) | https://victorianpieraverdi-dev.github.io/awara-game/ |
| Pavel | victorianpieraverdi@gmail.com / burdinovpaveld@gmail.com |
| Devin org (текущая) | org-08568f5ec4344212a563538f58b0cb86 |

---

## Текущая смена

| Поле | Значение |
|---|---|
| Аккаунт | victorianpieraverdi-dev |
| Сессия | https://app.devin.ai/sessions/05aaba6831eb4070ab7145c501bb67d3 |
| Модель | Fast Mode / Sonnet |
| Дата | 2026-05-10 (UTC) |
| Закрытые задачи | E-006 |
| Следующая задача | E-007 -- js/daimon-module.js v2.0 |
| Состояние master | master `8c9f481` (E-005 смерджен); текущая ветка закрывает E-006 |
| Pages | включён, master/root |

---

## Лог смен (новые записи СВЕРХУ)

### 2026-05-10 · victorianpieraverdi-dev · E-006
- Закрыто: E-006 -- data/daimon-stages.json: 5 стадий эволюции Даймона.
- Создан `data/daimon-stages.json` -- 5 объектов: Пашу (x1.0, 2 ДНК), Вира (x1.5, 4 ДНК), Садхака (x2.0, 7 ДНК), Дживанмукта (x3.0, 10 ДНК), Парамукти (x4.0, 12 ДНК).
- Поля: stage, name_ru, name_en, description, dna_strands, multiplier, unlock_condition, granthi, chakra_range, abilities.
- Следующая задача: E-007 -- js/daimon-module.js v2.0.

### 2026-05-10 · victorianpieraverdi-dev · E-005
- Закрыто: E-005 -- интеграция Милости в лобби.
- Виджет "МИЛОСТЬ" в лобби между STREAK и нижним рядом: название источника, множитель, клик открывает milost.html.
- Импорт milost-module.js, данные по Лучу игрока (ray из playerState).
- Milost v2.0 блок завершён (E-001..E-005). Следующий блок: Daimon v2.0 (E-006..E-011).

### 2026-05-10 · victorianpieraverdi-dev · E-004
- Закрыто: E-004 -- интеграция Милости в Тигель.
- `initTigelMilost()` обновлена на API v2.0 (getCurrentSource, getSourceMultiplier, checkVeilBreach, getMacrocosmMessage).
- Множитель Милости теперь берётся из источника по Лучу игрока (playerState.ray).
- Добавлена панель "Завеса Забвения" в табе "Баланс": прогресс-бар, остаток очков, macrocosm_message при пробое.
- Следующая задача: E-005 -- интеграция Милости в лобби.

### 2026-05-10 · victorianpieraverdi-dev · E-003
- Закрыто: E-003 -- milost.html: экран Милости.
- Создан `milost.html` -- 7 карточек источников по Лучам с прогресс-барами до veil_threshold.
- При пробое Завесы показывается macrocosm_message.
- Статусы: Активен / Неактивен / Завеса пробита. Импорт из milost-module.js.
- Следующая задача: E-004 -- интеграция Милости в Тигель.

### 2026-05-10 · victorianpieraverdi-dev · E-002
- Закрыто: E-002 -- js/milost-module.js: движок Милости v2.0.
- Создан `js/milost-module.js` -- ES-модуль с 4 экспортными функциями: getCurrentSource, getSourceMultiplier, checkVeilBreach, getMacrocosmMessage.
- fetch с кэшем в модульной переменной, fallback на ray=4 (Кали-юга), обработка ошибок.
- Следующая задача: E-003 -- milost.html.

### 2026-05-10 · victorianpieraverdi-dev · E-001
- Закрыто: E-001 -- data/milost-sources.json: 7 источников Милости по 7 Лучам.
- Создан `data/milost-sources.json` с 7 объектами (id, ray, name_ru, description, veil_threshold, macrocosm_message, multiplier).
- Создана заглушка `docs/phase7/README.md`.
- В TASKS.md добавлена секция Phase 7 (E-001..E-017), T-082/T-083/T-084 помечены superseded.
- Следующая задача: E-002 -- js/milost-module.js.

### 2026-05-19 · Devin · T-081
- Закрыто: T-081 — data/temple-ecosystems.json: экосистемы 33 храмов.
- Создан `data/temple-ecosystems.json` с 33 объектами по всем матрицам из `data/matrices.json`.
- Каждый объект содержит `matrixId`, `matrixSlug`, `matrixName`, `templeNameTemplate`, `universe`, `flora`, `minerals`, `creatures`, `ambient`, `basePassiveSvet`.
- JSON валиден; проверены 33 объекта, уникальные `matrixId`, совпадение slug/name с каноном 33 матриц.
- Следующая задача: T-082 — js/temple-module.js.

### 2026-05-19 · Devin · T-080
- Закрыто: T-080 — passport.html: иконка Даймона.
- В `passport.html` после идентификации добавлена компактная карточка Даймона.
- Карточка читает текущего Даймона через `getDaimon()` из `js/daimon-module.js`.
- Показаны имя, форма/архетип, стихия, чакра, стадия и резонансный бонус при наличии Даймона.
- Карточка остаётся ссылкой на `daimon.html`; пустое состояние ведёт на экран Хранителя.
- UI-задача: нужен mobile-pass 320/375/768 перед финальным отчётом.
- Следующая задача: T-081 — data/temple-ecosystems.json.

### 2026-05-19 · Devin · T-079
- Закрыто: T-079 — tigel.html: resonance bonus от Даймона.
- `tigel.html` загружает `getDaimon()` и `getResonanceBonus()` из `js/daimon-module.js`.
- Доминантная стихия дня переводится в элемент Даймона; совпадение применяет `resonanceBonus` к свету до Milost.
- В `ИТОГИ ДНЯ` показаны источник резонанса, множитель и свет после Даймона.
- Сгенерированный ключ сохраняет `daimon_resonance` и buff `Резонанс Даймона`.
- UI-задача: нужен mobile-pass 320/375/768 перед финальным отчётом.
- Следующая задача: T-080 — passport.html: иконка Даймона.

### 2026-05-19 · Devin · T-076
- Закрыто: T-076 — data/daimon-forms.json (27 накшатр → форма Даймона)
- Создан `data/daimon-forms.json` с 27 объектами накшатр.
- Поля: id, slug, name, sanskrit, ruler, element, form, form_name, archetype, resonanceBonus, description.
- 18 уникальных форм хранителя (stag, phoenix, swan, dolphin, naga, lion, tiger, bear, raven, unicorn, owl, dragon, kirin, eagle, garuda, wolf, deer, elephant).
- 5 стихий: fire, water, earth, air, ether.
- JSON валиден, lookup по slug работает.
- Следующая задача: T-077 — js/daimon-module.js.

### 2026-05-19 · Devin · T-075
- Закрыто: T-075 — tigel.html: применить множитель Милости.
- `tigel.html` загружает `getMilostToday()` / `refreshMilost()` из `js/milost-module.js` и держит дневной multiplier в памяти экрана.
- В блоке `ИТОГИ ДНЯ` теперь видны база света, строка `Милость ×N (+X% света)` и итоговый свет после множителя.
- Перед записью результата в playerState свет Тигля умножается на Milost, а базовое значение сохраняется как `lightBeforeMilost`.
- UI-задача: нужен mobile-pass 320/375/768 перед финальным отчётом.
- Следующая задача: T-076 — data/daimon-forms.json.

### 2026-05-19 · Devin · T-074
- Закрыто: T-074 — passport.html: панель «Милость Дня».
- В `passport.html` после блока 7-day streak добавлена золотая панель Milost.
- Панель показывает дату, score 0–1.5, 4 источника (♃, ✦, ☽, AI) и multiplier.
- При первом заходе дня вызывает `refreshMilost()`, при наличии кэша читает `getMilostToday()`.
- UI-задача: нужен mobile-pass 320/375/768 перед финальным отчётом.
- Следующая задача: T-075 — tigel.html: применить множитель Милости.

### 2026-05-19 · Devin · T-073
- Закрыто: T-073 — js/milost-module.js (расчёт Милости дня)
- Добавлен ES6-модуль `js/milost-module.js` с `computeMilost()`, `getMilostToday()`, `refreshMilost()`.
- Источники: Юпитер в благоприятном знаке, накшатра дня, родная накшатра активна, чистота намерения (placeholder = 0).
- Результат сохраняется как `state.milostToday` через `js/state-module.js`; прямой ключ localStorage не дублируется.
- Ветка `feature/phase6-companion-grace` создана от чистого T-072 commit 59d3e67; v260/universe не тронуты.
- UI не тронут; mobile-pass не требуется для T-073.
- Следующая задача: T-074 — passport.html: панель «Милость Дня».

### 2026-05-17 · Devin · T-072 (РЕФАКТОРИНГ ЗАВЕРШЕН)
- Закрыто: T-072 -- финальная документация и smoke test
- docs/architecture.md создан
- README.md обновлен
- Smoke test: 8 страниц пройдены на 375px
  - index.html: HTTP 200 (POST 501 -- норма для python http.server)
  - tigel.html: HTTP 200, 0 JS errors, lobby link OK
  - dashboard.html: HTTP 200, 0 JS errors, lobby link OK
  - universe.html: HTTP 200, 0 JS errors, lobby link OK
  - matrix.html: HTTP 200, 0 JS errors, lobby link OK
  - cards.html: HTTP 200, 0 JS errors, lobby link OK
  - oracle.html: HTTP 200, 0 JS errors, lobby link OK
  - passport.html: HTTP 200, 0 JS errors, lobby link OK
- ИТОГ РЕФАКТОРИНГА AWARA (T-049 -- T-072):
  - 24 задачи выполнены
  - 8 экранов, 7 JS-модулей, 4 CSS-модуля
  - Канон полный: 21/33/14/9/63/693
  - Legacy удален в T-069
- ПРОЕКТ ГОТОВ К НОВЫМ ФИЧАМ.
- Следующие фазы (после рефакторинга):
  - Земля игрока (Васту 3D на Three.js)
  - Оракул AI (OpenRouter)
  - Сообщество (Firebase)
  - Монетизация
- PR: #63

### 2026-05-17 · Devin · T-066 (ФАЗА 4 ЗАВЕРШЕНА)
- Закрыто: T-066 — cards.html (Колода 63 карты)
- Подход: новый файл собран по аналогии с universe.html/matrix.html
- Старый cards.html (PR #60, 417 строк) переименован в cards-legacy.html
- Генерация: 21 агентов x 3 матрицы = 63 карты
- Канон: 21/33/63 валиден
- Использует: canon-module (loadAgents, loadMatrices, loadAgentMatrixMap), ui-module (showModal), state-module
- Фильтр: Все + 3 матрицы (Ведическая, Египетская, Каббалистическая)
- Модалка: showModal из ui-module, детали агента + cultural_name из agent_matrix_map
- Mobile-test: 375px пройден (2 колонки)
- ФАЗА 4 (разбивка экранов) ЗАВЕРШЕНА: 7/7 экранов готовы
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/62
- Следующая задача: T-072 (финальная документация)

### 2026-05-16 · Devin · T-062
- Закрыто: T-062 — tigel.html (Вечерний Тигель)
- Подход: новый файл собран по аналогии с universe.html/matrix.html
- Старый legacy tigel.html переименован в tigel-legacy.html
- Использует: state-module (addTigelEntry, getTigelEntries), ui-module (showToast)
- Функционал: textarea записи дня, выбор эмоции (5), выбор стихии У-Син (5), сохранение в localStorage, список последних 10 записей
- Mobile-test: 375px пройден
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/61
- Следующая задача: T-066 (cards.html)

### 2026-05-18 · Devin · T-066
- Закрыто: T-066 — cards.html (Колода Карт)
- Импортирует: loadAgents/loadMatrices/loadLocas из canon-module.js,
  loadState/saveState из state-module.js
- Карт: 63 (21 агент x 3 матрицы)
- Фильтры: ВСЕ / ВЕДИЧЕСКИЕ / СЛАВЯНСКИЕ / КАББАЛА / СОБРАНЫ
- Попап: детали карты, статус собрана/не найдена
- Тест: js/test-cards-screen.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/60
- Следующая задача: T-067 (oracle.html — Оракул)

### 2026-05-18 · Devin · T-065
- Закрыто: T-065 — matrix.html (Матрица Восприятия)
- Импортирует: loadAgents/loadMatrices/getMatrixById из canon-module.js,
  renderSwitcher/getActivePerception/setActivePerception/PERCEPTIONS из matrixSwitcher.js,
  loadState/updateState из state-module.js,
  showToast из ui-module.js
- Экран: 21 агент + 33 матрицы, переключатель 3 восприятий (Ведическая/Славянская/Каббала)
- Сетка: 2/4/6 колонок (mobile-first)
- Анимация: matrixPulse при переключении, matrixFadeIn при загрузке
- Тест: js/test-matrix-screen.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/59
- Следующая задача: T-066 (cards.html — Колода Карт)
### 2026-05-17 · Devin · T-064
- Закрыто: T-064 — universe.html (Вселенная)
- Импортирует: initUniverse/stopUniverseAnimation/selectAgent/getUniverseState/resetUniverse из universe-module.js,
  UNIVERSE_LEVELS/getUniverseProgress/getUnlockedUniverseLevels/getUniverseLevelByLight/
  getGenerationLayers/createUniverseSnapshot из universe/universeProgression.js,
  loadState из state-module.js, formatBigNumber из ui-module.js
- Технология: Canvas 2D (21 агент на 3 орбитах, Солнце РА с пульсацией, ~200 звёзд)
- Панели: агент (стихия/гуна/планета/зона/луч), прогрессия (6 уровней с прогресс-баром)
- Тест: js/test-universe-screen.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/58
- Следующая задача: T-065 (matrix.html — Матрица Восприятия)

### 2026-05-16 · Devin · T-062
- Закрыто: T-062 — js/tigel-module.js (логика Вечернего Тигеля)
- Технология: ES6 module, У-Син теггинг, Тороидальный баланс, Генерация ключей
- Импортирует: CANON/COLORS/TIMINGS из core-module.js,
  loadState/updateState из state-module.js,
  showToast/showModal из ui-module.js,
  loadAgents/getAgentById из canon-module.js
- Экспорты (20): initTigel, getAgentName, autoTagWuXing, adjustWuXing,
  getWuXing, computeToroid, getRecommendations, saveToroidSnapshot,
  loadToroidHistory, generateKey, saveKeyToInventory, loadKeyInventory,
  synthesizeDay, gatherExperienceFromSpheres, startBgAnimation,
  stopBgAnimation, switchTab, getDaySummary, getTigelState, resetTigelState
- Функциональность: У-Син (5 стихий), Тороид (Ида/Пингала/Сушумна),
  генерация Ключей, сбор опыта из Сфер, фоновая анимация частиц
- Тест: js/test-tigel-module.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/56
- Следующая задача: T-063 (dashboard.html)
- index.html: НЕ ТРОНУТ, legacy не тронуты, tigel.html не изменён

### 2026-05-16 · Devin · T-061 (ФИНАЛ JS-ФАЗЫ!)
- Закрыто: T-061 — js/universe-module.js (космическая визуализация)
- Технология: Canvas 2D (без Three.js, для скорости и мобильных)
- Импортирует: CANON/COLORS/TIMINGS, loadState, loadAgents
- Экспорты (6): initUniverse, stopUniverseAnimation,
  selectAgent, getUniverseState, resetUniverse
- Канон: 21 агент на 3 орбитах вокруг Солнца РА
- Визуализация: пульсирующее Солнце, ~200 звёзд,
  вращающиеся агенты на орбитах, клик-выбор
- Тест: js/test-universe-module.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/55
- JS-ФАЗА ЗАВЕРШЕНА: 7/7 модулей готовы!
- Следующая фаза: разбивка экранов T-062 (tigel.html)

### 2026-05-16 · Devin · T-060
- Закрыто: T-060 — js/game-module.js (логика 4 пространств)
- Импортирует: CANON/TIMINGS/COLORS из core-module.js,
  loadState/updateState/addLight из state-module.js,
  showToast/showModal из ui-module.js,
  loadAgents/loadMatrices/loadLocas из canon-module.js
- SPACES константа: 4 пространства (spaces/earth/universe/creation)
- Экспорты (8): initGame, showGameMenu, openSpace,
  getCurrentSpace, getAllSpaces, getGameState, resetGameState
- Слушает: awara:section (от lobby-module)
- Эмитит: awara:space:enter
- Тест: js/test-game-module.html — 4 пространства, 4 модалки
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/54
- Следующая задача: T-061 (js/universe-module.js — космическая визуализация)

### 2026-05-17 · Devin · T-059
- Закрыто: T-059 — js/lobby-module.js (логика главной страницы)
- Импортирует: STAGES/CANON/COLORS/TIMINGS из core-module.js,
  loadState/addLight/updateState из state-module.js,
  formatLight/showToast/showModal из ui-module.js,
  preloadCanon/getAgentById из canon-module.js
- Экспорты (10): initLobby, updateLightCounter, updateLevelDisplay,
  updateAgentDisplay, addLightAnimated, showPassport,
  stopSunBreathing, resetLobbyState, getLobbyState
- Тест: js/test-lobby-module.html — солнце дышит, разделы кликаются
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/53
- Следующая задача: T-060 (js/game-module.js — логика разделов)
- index.html: НЕ ТРОНУТ, legacy не тронуты

### 2026-05-16 · Devin · T-058
- Закрыто: T-058 — js/canon-module.js (загрузка данных канона)
- Импортирует: CANON, validateCanon из core-module.js
- Загружает: data/agents.json, matrices.json, agent_matrix_map.json + опц.
- Экспорты (12): loadAgents, loadMatrices, loadAgentMatrixMap,
  loadLocas, loadChakras, loadCards, getAgentById, getMatrixById,
  getAgentMatrixEntry, preloadCanon, clearCanonCache
- Канон проверка: 21/33/14/9/63/693 — валидация в каждом loader
- Тест: js/test-canon-module.html
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/52
- Следующая задача: T-059 (js/lobby-module.js — логика главной)

Замечания:
- data/locas.json — присутствует (14 лок)
- data/chakras.json — присутствует (9 чакр)
- data/cards.json — отсутствует (warning в консоли, не критично)
- В T-071 недостающие файлы будут созданы

### 2026-05-16 · Devin · T-057
- Закрыто: T-057 — js/ui-module.js (UI helpers)
- Импортирует: BREAKPOINTS, TIMINGS, COLORS из core-module.js
- Экспорты (12): formatLight, formatPercent, formatBigNumber, showModal, showToast, fadeIn, fadeOut, vibrate, getCurrentBreakpoint, isMobile, debounce, throttle
- Тест: js/test-ui-module.html — все функции работают
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/51
- Следующая задача: T-058 (js/canon-module.js — загрузка agents/matrices)

### 2026-05-16 · Devin · T-056
- Закрыто: T-056 — js/state-module.js (localStorage management)
- Подход: ES6 module, не конфликтует с legacy js/core.js
- Импортирует: STORAGE_KEYS из core-module.js
- Экспорты: loadState, saveState, updateState, resetState, getLight, addLight, addTigelEntry, getTigelEntries
- Тест: js/test-state-module.html — все функции работают
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/50
- Следующая задача: T-057 (js/ui-module.js — UI helpers)

### 2026-05-16 · Devin · T-055 (handoff)
- Закрыто: T-055 — js/core-module.js (константы, STAGES, CANON, COLORS, validateCanon)
- Источник: handoff от сессии ff4918c77114413f95fe84389e9f3f76
- Тест: js/test-core.html — канон валиден (21/33/14/9/693)
- Замечание: экспорты вынесены в отдельный js/core-module.js (ES6 module), js/core.js НЕ ТРОНУТ (export ломает <script> в index.html)
- index.html: НЕ ТРОНУТ, сайт работает как после T-054b
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/49
- Следующая задача: T-056 (js/state.js — localStorage)

### 2026-05-16 · Devin · T-054b (правильная версия)

- Закрыто: T-054b — main.css модульный + legacy.css сохранен
- Замечание: НИЧЕГО НЕ УДАЛЕНО, только переименовано + новый main.css
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/48
- Следующая задача: T-055 (js/core.js — начало JS-фазы)
- Mobile-test: пройден на 8 экранах (скриншоты в PR)
- Урок: всегда сохранять legacy при модульной разбивке

### 2026-05-16 · Devin · Hotfix revert T-054

- Откачен: PR #46 (T-054) — критичная регрессия визуала
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/47
- Причина: старый main.css (2400+ строк) был заменен модульным (114 строк), потеряны все стили

### 2026-05-16 · Devin · T-053

- Закрыто: T-053 — компоненты в css/components.css
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/45
- Следующая задача: T-054 (main.css с импортами)
- Mobile-test: пройден на 375px и 320px
- Примечание: legacy !important все ещё активен (норма до T-069)

### 2026-05-16 · Devin · T-052

- Закрыто: T-052 — типографика в css/typography.css
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/44
- Следующая задача: T-053 (components.css)
- Mobile-test: пройден на 375x667

### 2026-05-16 · Devin · T-051 (handoff)

- Закрыто: T-051 — CSS-переменные в css/variables.css
- Источник: handoff от сессии f7e199e58b5e4337ad536c020b6c78fd
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/43
- Следующая задача: T-052 (typography.css)
- Состояние master: ожидает ревью Pavel'а

### 2026-05-16 · Devin · T-032

- Закрыто: T-032 — Конституция (Панча-Бхута) из натальной карты.
- Добавлен `js/dosha.js`: расчёт 5 стихий с весами Лагна/Солнце/Луна = 3, грахи = 2, Раху/Кету → Эфир = 1.
- `natal.html` отображает блок «Конституция (Панча-Бхута)» после Лагны и сохраняет результат в `localStorage` `awara_dosha`.
- `TASKS.md`: T-032 отмечена как закрытая.

### 2026-05-16 · Devin · T-049

- Проведена вторая проверка наличия правок по большому игровому пространству.
- Подтверждены: `UniverseProgression`, mobile experience layer, кнопка `ОПЫТ`, панель скрытой глубины, эволюционные уровни игрока и принцип `everything is stored / not everything is displayed`.
- Создан `game-space-changes.md` — единый документ замен: что уже есть, что заменено, что остаётся будущей архитектурой.
- `TASKS.md`: T-049 добавлена и отмечена как закрытая.

### 2026-05-11 · dadyup08-debug · T-031..T-036

- T-031: oracle.html + js/oracle.js запушены в remote (были cherry-picked локально, но не запушены)
- Кнопка ОРАКУЛ добавлена в лобби index.html
- T-034: 4 контекста Оракула (толкование дня / наставник матрицы / зеркало выбора / архивариус)
- js/oracle.js: ORACLE_CONTEXTS массив, CONTEXT_PROMPTS с уникальными system prompts, getContext/setContext
- oracle.html: панель выбора контекста (4 кнопки), переключение очищает чат
- T-035: SAFETY_PROMPT — запрет медицинских/финансовых/опасных советов во всех режимах
- T-036: CSS-анимации перехода при смене матрицы (matrixPulse, matrixFadeOut/In, colorSweep)
- js/matrixSwitcher.js: анимация кнопок (scale) при переключении
- TASKS.md: T-031..T-036 помечены [x]

### 2026-05-11 · brarianwindahl · T-028

- Закрыто: T-028 — переключатель матрицы восприятия (UI reskin)
- js/matrixSwitcher.js: ES-модуль с PERCEPTIONS (3 матрицы), getActivePerception(), setActivePerception(), renderSwitcher()
- index.html: виджет быстрого переключения (Ведическая/Славянская/Каббала) в лобби
- Интеграция с существующей темой applyMatrixTheme() — UI адаптируется при переключении

### 2026-05-11 · paharaduga-beep · T-029 + T-030

- Закрыто: T-029 — natal.html форма ввода натальных данных (UI)
- Закрыто: T-030 — подключить Swiss Ephemeris (JS-порт для браузера)
- natal.html: форма (дата/время/город) + расчёт 9 планет (Навграхи), 12 домов (Бхавы), Лагна
- @swisseph/browser WASM (lib/swisseph/, ~500KB) — пропатчен для работы в браузере
- Сидерический зодиак (Lahiri аянамша), Whole Sign дома, 27 накшатр
- Геокодирование города через Nominatim OpenStreetMap API
- localStorage: awara_natal_data (форма), awara_natal_chart (расчёт)
- Кнопка «НАТАЛЬНАЯ КАРТА» в лобби (index.html)
- Phase 3 (T-029..T-031) добавлена в TASKS.md
### 2026-05-10 · victorianpieraverdi-dev · T-010

- Закрыто: T-010 — подключить playerState.js в tigel.html (рефакторинг)
- Импорт getState/saveState из js/playerState.js через module script
- sphereData читается из playerState с фоллбэком на awara_sphere_entries
- Поведение не меняется, только источник данных централизован

### 2026-05-11 · victorianpieraverdi-dev · T-027

- Закрыто: T-027 — эффекты карт на Тигель/Землю
- js/cardEffects.js: getCardEffects() — подсчёт бонусов по матрицам (Ведическая +свет, Славянская +ключ%, Каббалистическая +ключи streak 7)
- applyStreakBonus() — начисление ключей при streak 7 (раз в день)
- tigel.html: блок «БОНУСЫ КАРТ» в табе Баланс
- earth-player.html: блок «БОНУСЫ КАРТ» + автоначисление streak-ключей

### 2026-05-10 · victorianpieraverdi-dev · T-026

- Закрыто: T-026 — получение карты из daily reward (~5% шанс)
- js/dailyReward.js: checkDailyReward() — один ролл в день, 5% дроп случайной несобранной карты
- index.html: попап "КАРТА НАЙДЕНА" с агентом, матрицей, стихией, зоной
- Бейдж колоды обновляется после дропа
- Добавлены T-026/T-027/T-028 в TASKS.md (Phase 2)

### 2026-05-10 · PBerty · T-025

- Закрыто: T-025 — cards.html колода 63 карт
- 21 агент × 3 матрицы, фильтр, попап, collected/locked
- Кнопка в лобби с бейджем 0/63

### 2026-05-10 · PBerty · T-024

- Закрыто: T-024 — 9 базовых построек
- 9 строений (1/зону): свет + ключи, zone field привязка

### 2026-05-10 · PBerty · T-023

- Закрыто: T-023 — 9 Васту-зон кликабельные
- Клик по canvas → определение зоны → попап: название, направление, стихия, планета, качество, строения
- Данные из zones.json подтягиваются по slug

### 2026-05-10 · PBerty · T-022

- Закрыто: T-022 — паспорт души v0
- passport.html: ID, агент, матрица, светимость, стихия, дух (5 значений), streak
- Кнопка "ПАСПОРТ ДУШИ" добавлена в лобби

### 2026-05-10 · PBerty · T-021

- Закрыто: T-021 — Тигель 7 параметров
- Блок "ИТОГИ ДНЯ" в табе Баланс: стихия, Пингала, Ида, Сушумна, майнинг, свет, рекомендация
- Появляется автоматически после расчёта тороида

### 2026-05-10 · PBerty · T-020

- Закрыто: T-020 — 7-day streak в лобби
- js/streak.js: recordVisit() + getStreak(), localStorage awara_streak_days
- Виджет: 7 точек (Пн..Вс), золотые при визите, счётчик серии

### 2026-05-10 · PBerty · T-019

- Закрыто: T-019 — карточка "Ключ Дня" в лобби
- Плитка между "Игра" и "Смысл Дня": агент дня, матрица, стихия, вопрос
- Данные из getDailyKey() (js/dailyKey.js)

### 2026-05-10 · PBerty · T-018

- Закрыто: T-018 — js/dailyKey.js
- getDailyKey(date?) → {date, agent, matrix, element, question}
- FNV-1a hash(date+playerId), playerId в localStorage

### 2026-05-10 · PBerty · T-017

- Закрыто: T-017 — добавлен docs/screen-status.md
- Таблица статусов 6 экранов: 5 ready, 1 wip (earth-player)

### 2026-05-10 · PBerty · T-016

- Закрыто: T-016 — обновлён README.md
- Расширено описание AWARA (3-4 строки)
- Добавлен zones.json в таблицу Канон, убраны TBD для locas/chakras

### 2026-05-10 · PBerty · T-015

- Закрыто: T-015 — mobile-audit earth-player.html (320/375/768)
- 14 фиксов: realm-era 6→8px, el-lbl 5→8px, zone-dir 6→8px, si-lbl/bt/bld-name/bld-cost 7→9px
- back-lbl/top-coins/realm-level/realm-time 7-8→9px
- Touch targets: .bt min-height 44px, #build-btn min-height 44px

### 2026-05-10 · PBerty · T-014

- Закрыто: T-014 — mobile-audit matrices.html (320/375/768)
- 6 фиксов: matrix-visual 8→9px, matrix-badge 7→9px, agent-meta 8→9px
- @media(max-width:375px): matrix-visual/agent-meta 7→9px
- back кнопка: min-height 44px

### 2026-05-10 · PBerty · T-013

- Закрыто: T-013 — mobile-audit tigel.html (320/375/768)
- 15 фиксов: hint-text 7→9px, wuxing-name 7→9px, light-cell-label 7→9px, rec-priority 6→8px, key-stat-label 7→9px и др.
- Touch targets: back-btn 44×44px, tab-btn min-height 44px
- Нет горизонтального скролла на всех 3 viewport’ах

### 2026-05-10 · PBerty · T-012

- Закрыто: T-012 — mobile-audit dashboard.html (320/375/768)
- Увеличены размеры шрифтов: card-eyebrow 9→10px, section-h 11→12px, desc 8→9px, note 9→10px
- min-height кнопки назад 40→44px
- Нет горизонтального скролла на всех 3 viewport’ах

### 2026-05-10 · PBerty · T-011

- Закрыто: T-011 — mobile-audit index.html (320/375/768)
- Увеличены размеры шрифтов на кнопках лобби (заголовки 12-15px, подзаголовки 9-10px, бейджи 10px)
- Увеличены размеры шрифтов в модальном окне ИГРОВЫЕ ПРОСТРАНСТВА
- Нет горизонтального скролла на всех 3 viewport’ах

### 2026-05-10 · PBerty · T-009

- Закрыто: T-009 — dashboard.html теперь использует `import { getState } from './js/playerState.js'`
- Удалено прямое чтение `localStorage.getItem('awara_v255_state')`
- Поведение пользователя не меняется

### 2026-05-10 · PBerty · T-008

- Закрыто: T-008 — js/playerState.js (минимальный API)
- Функции: getState(), saveState(state), migrate()
- Ключ: awara_v258_state (новый), миграция с awara_v255_state
- Поля: totalLight, sphereData, spirit, elements, activeSystem, journey

### 2026-05-10 · PBerty · T-007

- Закрыто: T-007 — data/chakras.json (9 чакр-мер)
- Источник: AWARA_Structured_Omnibus_V3.txt (§8 «Девятимерная система») + AWARA_Zodiac_and_Chakra_Prompts_Expansion.txt
- Парсер: `tools/build_chakras.py`
- 7 классических чакр (Муладхара → Сахасрара) + Монада (8) + Абсолют (9)

### 2026-05-10 · PBerty · T-006

- Закрыто: T-006 — data/locas.json (14 лок плотностей)
- Источник: AWARA_Vedic_Cosmogenesis_Ultimate.txt, Часть 5 «14 ЛОК»
- Парсер: `tools/build_locas.py`
- 7 верхних миров (Урдхва-Локи, density 1..7) + 7 нижних (Паталы, density -1..-7)

### 2026-05-10 · PBerty · T-005

- Закрыто: T-005 — data/zones.json (9 Васту-зон)
- Парсер: `tools/build_zones.py` (генерирует JSON из канонических данных Васту-Шастры)
- Поля: id, slug, name, direction, element, planet, quality
- Согласовано с agents.json (vastu_zone)

### 2026-05-10 · paharaduga-beep · T-004

- Закрыто: T-004 — активный агент игрока в hero-блоке dashboard.html
- Читает `localStorage('awara_active_agent')`, default `svet_ra`
- Lookup из `data/agents.json` (имя) + `data/agent_matrix_map.json` (культурное соответствие в активной матрице)
- CSS: `.hero-agent` блок с золотой рамкой, Cinzel + Cormorant Garamond

### 2026-05-10 · paharaduga-beep · T-003

- Закрыто: T-003 — 33 матрицы в matrices.html из data/matrices.json (замена хардкода)
- Карточка: name + conflict + visual_code, активная матрица выделяется, клик меняет активную
- Mobile-first CSS Grid (2/4/6 колонок)
- Удалены хардкод-тиры (I-V) и объект M={}

### 2026-05-10 · paharaduga-beep · T-001

- Закрыто: T-001 — секция "21 АГЕНТОВ" в matrices.html из data/agents.json
- PR: https://github.com/paharaduga-beep/awara-game/pull/1
- Коммит: `a334866` (https://github.com/paharaduga-beep/awara-game/commit/a334866)
- 21 карточка агента (name, domain, guna, vastu_zone, planet, element, ray) грузится через fetch, mobile-first CSS Grid (2/4/7 колонок)
- Merge: `f9d9894` в master fork

### 2026-05-10 · victorianpieraverdi-dev · T-002

- Закрыто: T-002 — подгрузить data/agents.json в tigel.html (замена хардкод-имён агентов)
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/2
- Коммит: `f602e55` (https://github.com/victorianpieraverdi-dev/awara-game/commit/f602e55)
- Найдено 3 хардкод-имени (Искра x2, Према x1) — заменены на динамическое чтение из agents.json через getAgentName(slug)
- Pages обновится после merge

### 2026-05-10 · victorianpieraverdi-dev · setup

- Создан публичный репо `victorianpieraverdi-dev/awara-game`
- Запушен orphan-коммит (clean history без OpenRouter ключа в past commits)
- Включён GitHub Pages: master / root → live на https://victorianpieraverdi-dev.github.io/awara-game/
- Pavel отозвал утекший OpenRouter ключ (`sk-or-v1-0e6b973b...`)
- В `tigel.html`: hardcoded ключ заменён на паттерн `localStorage + prompt()` — пользователь вводит свой ключ один раз, он хранится в его браузере
- В `AWARA_RULES.md` добавлен §6.5 «Секреты — НИКОГДА не в коде»
- Создано: `START_PROMPT.md`, `AWARA_RULES.md`, `HANDOFF.md`, `TASKS.md` (17 микро-задач Phase 0)
- Скопированы в репо: `lore/` (50 .txt + 39 .docx + 6 personal), `docs/` (6 манифестов: handoff/vision/synthesis/roadmap/PHILOSOPHY/WORKSPACE)
- 147 файлов в репо
- **Следующая смена должна взять T-001 из TASKS.md**

### 2026-05-10 · victorianpieraverdi-dev · Phase 0.4

- Закрыто: dashboard.html (личный Светкоин-баланс, шкала эволюции, top-placeholder)
- Локальный коммит: `c5b4485` (старая history, не в публичном репо)
- Старый Devinapps-deploy (до GitHub Pages): https://awara-v258-modular-psbugcjy.devinapps.com/dashboard.html
- *Эта работа уже включена в orphan-коммит current master*

### 2026-05-10 · victorianpieraverdi-dev · Phase 0.5+0.6+0.7

- Закрыто: канон → JSON
  - `data/agents.json` (21)
  - `data/matrices.json` (33)
  - `data/agent_matrix_map.json` (693 = 21×33)
- Парсер: `tools/build_canon_json.py` (TODO: положить в репо отдельной задачей; пока локально на `/tmp/`)

---

## Решения по ASK (вопросы и ответы)

*(Сюда попадают ответы Pavel'а на блокирующие вопросы. Формат: ASK → Pavel → закрыто.)*

— Пусто пока.

---

## Известные проблемы / технический долг

- `tools/build_canon_json.py` находится локально (`/tmp/build_canon_json.py`), не в репо. Создать задачу T-XXX «положить парсер в `tools/` репо для воспроизводимости».
- Pre-commit hooks не настроены — добавить в Phase 0+ когда понадобится автолинт.
- README.md в корне репо обновлён под protocol, но всё ещё краткий — расширить отдельной T-задачей.
- `awara_v255_state` ключ — рудимент от v255. После T-008 (playerState.js) — миграция на `awara_v258_state`.

---

## Шаблон новой записи (для следующей сессии)

При закрытии задачи добавить НАВЕРХ «Лог смен»:

```
### YYYY-MM-DD · <account_name> · T-XXX

- Закрыто: T-XXX — <описание>
- PR: https://github.com/victorianpieraverdi-dev/awara-game/pull/N
- Коммит: `<sha>` (https://github.com/victorianpieraverdi-dev/awara-game/commit/<sha>)
- Pages обновится в течение 1-2 мин
- Заметки: <если есть>
```

И обновить блок «Текущая смена» сверху:
- `Аккаунт`, `Сессия` — на свои
- `Дата` — текущая дата UTC
- `Закрытая задача` — T-XXX
- `Следующая задача` — следующая `[ ]` из TASKS.md
- `Состояние master` — последний sha master после merge PR
