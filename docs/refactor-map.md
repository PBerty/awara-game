# T-050 — карта рефакторинга AWARA

Аудит выполнен по `master` после merge commit `e28210f` от 2026-05-16. Документ только фиксирует текущее состояние и порядок будущих работ; runtime-код не изменялся.

## Краткий вывод

- `index.html` остаётся основным монолитом: 1 047 940 байт / 1023.4 KB / 16 328 строк.
- В корне уже есть 10 рабочих HTML-экранов плюс `index.html`; отдельного `universe.html` нет.
- CSS пока не модульный: существует только `css/main.css`, и он начинается с HTML-тега `<style>`.
- JS частично вынесен: есть 18 файлов в `js/`, но крупнейший legacy-файл `js/core.js` всё ещё 302.1 KB.
- Канон 21/33/693/14/9 сохранён; `data/cards.json` отсутствует, поэтому вопрос канонических 63 карт остаётся открытым.

## Структура файлов

### HTML в корне

| Файл | Размер |
|---|---:|
| `cards.html` | 34.0 KB |
| `dashboard.html` | 29.6 KB |
| `earth-player.html` | 31.7 KB |
| `index.html` | 1023.4 KB |
| `initiation-space.html` | 395.0 KB |
| `matrices.html` | 5.7 KB |
| `natal.html` | 22.1 KB |
| `oracle.html` | 22.3 KB |
| `passport.html` | 8.6 KB |
| `tigel.html` | 82.5 KB |

Вывод: большинство экранов уже вынесены в отдельные HTML-файлы, но `initiation-space.html` и `index.html` остаются крупными legacy-монолитами.

### CSS

| Файл | Размер | Статус |
|---|---:|---|
| `css/main.css` | 105.8 KB | Единственный CSS-файл; строка 1 содержит `<style>`, что делает файл не чистым CSS. |

Отсутствуют ожидаемые модули: `css/variables.css`, `css/typography.css`, `css/components.css`.

### JS

| Файл | Размер | Роль по текущему состоянию |
|---|---:|---|
| `js/awara-ai.js` | 6.6 KB | AI/OpenRouter helper |
| `js/cardEffects.js` | 2.7 KB | Эффекты карт |
| `js/cauldronEngine.js` | 6.8 KB | Тигель / cauldron engine |
| `js/core.js` | 302.1 KB | Крупный legacy core/global слой |
| `js/dailyKey.js` | 3.0 KB | Ключ дня |
| `js/dailyReward.js` | 2.7 KB | Daily reward |
| `js/dosha.js` | 2.4 KB | Конституция Панча-Бхута / доша |
| `js/init.js` | 21.2 KB | Инициализация |
| `js/matrixSwitcher.js` | 5.9 KB | Переключатель матриц |
| `js/mechanics.js` | 25.7 KB | Игровые механики |
| `js/oracle.js` | 10.6 KB | Оракул |
| `js/oraclePromptBuilder.js` | 7.1 KB | Сборка prompt-контекста Оракула |
| `js/playerState.js` | 3.8 KB | Player state / localStorage |
| `js/shambhala-calendar.js` | 5.1 KB | Календарная логика |
| `js/spheres.js` | 4.7 KB | Сферы |
| `js/streak.js` | 2.2 KB | Streak |
| `js/ui.js` | 32.9 KB | Legacy/global UI-слой |
| `js/universe/universeProgression.js` | 6.4 KB | Прогрессия вселенной |

Вывод: JS уже частично модульный, но `core.js`, `ui.js`, `init.js`, `mechanics.js` и inline-скрипты в `index.html` всё ещё требуют безопасного дробления.

### Data

| Файл | Размер | Количество элементов |
|---|---:|---:|
| `data/agent_matrix_map.json` | 166.7 KB | array: 693 |
| `data/agents.json` | 5.3 KB | array: 21 |
| `data/breath_path_layers.json` | 9.6 KB | object: 6 ключей; `progression`: 13 |
| `data/card_prompts.json` | 967.6 KB | array: 693 |
| `data/cauldron_rules.json` | 9.0 KB | object: 10 ключей |
| `data/chakras.json` | 2.3 KB | array: 9 |
| `data/default_player_state.json` | 3.8 KB | object: 16 ключей |
| `data/domain_cards.json` | 47.8 KB | array: 21 |
| `data/extra_beings.json` | 545.8 KB | array: 330 |
| `data/extra_card_prompts.json` | 1804.4 KB | array: 792 |
| `data/iconography.json` | 26.6 KB | object: 135 ключей |
| `data/locas.json` | 2.3 KB | array: 14 |
| `data/matrices.json` | 9.2 KB | array: 33 |
| `data/monad_path_cards.json` | 54.3 KB | array: 16 |
| `data/mythic_branches.json` | 45.8 KB | array: 33 |
| `data/mythic_locations.json` | 279.9 KB | array: 231 |
| `data/mythic_quest_lines.json` | 603.0 KB | array: 261 |
| `data/mythic_relationships.json` | 260.4 KB | array: 330 |
| `data/mythic_relics.json` | 275.7 KB | array: 231 |
| `data/reality_scale_maps.json` | 7.2 KB | object: 5 ключей; `scales`: 12 |
| `data/sensory_ritual_layers.json` | 5.6 KB | object: 6 ключей; `daily_ritual_flow`: 6 |
| `data/vedic_loka_being_cards.json` | 129.1 KB | array: 42 |
| `data/vedic_loka_cards.json` | 47.1 KB | array: 14 |
| `data/zones.json` | 2.0 KB | array: 9 |

Отдельного `data/cards.json` нет.

### Assets

| Файл | Размер |
|---|---:|
| `assets/starfield.svg` | 20.4 KB |

### Docs

| Файл | Размер |
|---|---:|
| `docs/PHILOSOPHY.md` | 220.8 KB |
| `docs/REFACTOR_TASKS.md` | 33.0 KB |
| `docs/REFACTOR_TASKS_ACTIVE.md` | 15.5 KB |
| `docs/WORKSPACE.md` | 4.0 KB |
| `docs/awara-living-game-architecture.md` | 26.3 KB |
| `docs/handoff-manifest.md` | 62.4 KB |
| `docs/mythic-expansion-architecture.md` | 5.8 KB |
| `docs/refactor-map.md` | 16.9 KB |
| `docs/refactor-status.md` | 8.5 KB |
| `docs/roadmap.md` | 14.8 KB |
| `docs/screen-status.md` | 1.6 KB |
| `docs/synthesis.md` | 27.6 KB |
| `docs/universe-refactor-plan.md` | 1.7 KB |
| `docs/vision.md` | 10.2 KB |

## Анализ `index.html`

### Размер и подключения

| Метрика | Значение |
|---|---:|
| Размер | 1 047 940 байт / 1023.4 KB |
| Строк | 16 328 |
| Всего `<script>` | 29 |
| Inline `<script>` | 22 |
| Внешние `<script src>` | 7 |
| Inline `<style>` | 7 |
| Внешние CSS-подключения | 2 |

Внешние CSS-подключения:

- `https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit&family=Noto+Sans+Devanagari:wght@400;500&display=swap`
- `css/main.css`

Внешние JS-подключения:

- `js/core.js?v=32`
- `js/ui.js`
- `js/spheres.js`
- `js/init.js`
- `js/shambhala-calendar.js`
- `js/mechanics.js`
- `js/awara-ai.js`

### Inline CSS-блоки в `index.html`

| Тип | Строки | Комментарий |
|---|---:|---|
| `<style>` | 11-195 | Базовые стили страницы / shell |
| `<style>` | 6922-6928 | Малый локальный CSS-блок |
| `<style>` | 14031-14063 | Локальный UI CSS |
| `<style>` | 14332-14745 | Крупный UI CSS-блок |
| `<style id="awara-ui-canon">` | 15198-15500 | Canon/UI CSS |
| `<style>` | 15871-15901 | Локальный CSS |
| `<style>` | 15996-16001 | Малый локальный CSS-блок |

Первый безопасный CSS-шаг: не удалять стили из `index.html`, а сначала создать `css/variables.css` и подключить его через `css/main.css`; затем отдельно нормализовать `css/main.css`, убрав HTML-обёртку `<style>`.

### Script-блоки в `index.html`

| Тип | Строки | Комментарий |
|---|---:|---|
| inline | 252-286 | Early runtime/guard logic |
| inline | 289-393 | Alpha gate / creator mode |
| inline | 461-480 | UI helper for phone shell |
| inline | 502 | iOS-time updater |
| inline | 503 | SVG star generator |
| inline | 1232-1311 | Lobby/UI helper |
| inline | 1313-1366 | Daily/lobby helper |
| inline | 1496-1505 | Small runtime bridge |
| inline | 2091-3945 | Large lobby/game inline block |
| inline | 4795-12494 | Largest legacy inline block: game space / universe / systems |
| inline | 12570-12642 | Runtime bridge before external modules |
| external | 12857 | `js/core.js?v=32` |
| external | 12858 | `js/ui.js` |
| external | 12859 | `js/spheres.js` |
| external | 12860 | `js/init.js` |
| external | 12861 | `js/shambhala-calendar.js` |
| inline | 12862-14016 | Legacy runtime after initial modules |
| external | 14017 | `js/mechanics.js` |
| inline | 14020 | `window.AWARA_AI_AUTOLOAD = false` |
| external | 14021 | `js/awara-ai.js` |
| inline | 14022-14028 | AI/runtime bridge |
| inline | 14182-14330 | UI behavior block |
| inline | 14769-15119 | UI/canon behavior block |
| inline | 15171-15195 | Small UI behavior block |
| inline | 15504-15817 | UI/canon behavior block |
| inline | 16002-16016 | Small behavior block |
| inline | 16017-16175 | Late runtime behavior block |
| inline module | 16176-16247 | `type="module"` late module block |
| inline | 16251-16325 | Final late runtime block |

Приоритет для JS-карты: сначала описывать зависимости блоков 2091-3945, 4795-12494 и 12862-14016. Это самые рискованные зоны для будущего выноса.

### Логические блоки внутри `index.html`

По комментариям и DOM-идентификаторам внутри монолита остаются следующие области:

1. Alpha gate / creator mode.
2. Player state bridge и ранняя runtime-инициализация.
3. AWARA v258 DOM shell: фон, veil, HUD, pathbar, mantra.
4. Экран 1: Хираньягарбха.
5. Лобби: выбор пути, daily key, streak, reward, language/exchange controls.
6. Навигационные карточки лобби: Игра, Смысл дня, Тигель, Дашборд, Паспорт, Колода, Оракул, Матрицы, Накопления.
7. Игровое пространство: Хаос / Танматры, Пуруша / Пракрити, Гуны, Познание, Васту, Фэн-шуй, 14 лок, Джьотиш.
8. Полярность, тонкий план, marketplace, portal fallback.
9. Universe/player cosmos: player universe topbar, cosmos SVG, players chat, zodiac rings, guild resonance, seasonal labor.
10. Knowledge/data blocks: tanmatra channels, Wu Xing elements, Hercules labors, seven rays.
11. Sphere systems: 4 стартовые сферы, управление сферами, modal tabs, личные сферы / дневник опыта.
12. Metrics / creator tools / late UI bridges.

Вывод: `index.html` уже не должен быть местом для всех экранов. Его безопасная будущая роль — lobby/shell плюс подключения к модульным экранам и игровому пространству.

## Канон-проверка

| Проверка | Фактическое состояние | Ожидание | Статус |
|---|---:|---:|---|
| `data/agents.json` | 21 | 21 | OK |
| `data/matrices.json` | 33 | 33 | OK |
| `data/agent_matrix_map.json` | 693 | 21 × 33 = 693 | OK |
| `data/locas.json` | 14 | 14 | OK |
| `data/chakras.json` | 9 | 9 | OK |
| `data/cards.json` | файл отсутствует | 63 | Требует решения в T-064 |

Канон 21/33/14/9 сохранён. Отдельный канон 63 карт пока не оформлен в `data/cards.json`; карточные данные распределены по существующим `card_prompts`, `extra_card_prompts`, `domain_cards`, `monad_path_cards`, `vedic_loka_cards` и `vedic_loka_being_cards`.

## Что уже модульно

### Уже вынесенные экраны

| Экран | Файл | Статус |
|---|---|---|
| Тигель | `tigel.html` | Вынесен |
| Дашборд | `dashboard.html` | Вынесен |
| Колода | `cards.html` | Вынесена |
| Оракул | `oracle.html` | Вынесен |
| Паспорт души | `passport.html` | Вынесен |
| Матрицы | `matrices.html` | Вынесены |
| Натальная карта | `natal.html` | Вынесена |
| Земля игрока | `earth-player.html` | Вынесена |
| Пространство инициации / universe view | `initiation-space.html` | Вынесено, но файл крупный |

### Уже извлечённый CSS

- Есть `css/main.css`.
- Нет отдельных модулей `variables.css`, `typography.css`, `components.css`.
- `css/main.css` нужно нормализовать: убрать `<style>` на строке 1 после безопасного подключения CSS-модулей.

### Уже извлечённый JS

Уже существуют отдельные JS-файлы для player state, daily loop, reward/streak, matrix switcher, card effects, oracle, cauldron, dosha, AI helper, mechanics, UI/init/core и universe progression.

Остаётся проблема: часть вынесенных файлов всё ещё legacy/global, а `index.html` содержит 22 inline script-блока. Поэтому следующий JS-этап должен быть не удалением, а созданием безопасных модульных слоёв рядом с legacy-кодом.

## Что осталось сделать

Актуальные задачи после этого аудита:

| Задача | Актуальность | Почему остаётся |
|---|---|---|
| T-051 — извлечь CSS-переменные | Высокая | Нет `css/variables.css`; palette/tokens размазаны по CSS и inline-стилям. |
| T-052 — извлечь типографику | Высокая | Нет `css/typography.css`; шрифты и размеры повторяются inline. |
| T-053 — извлечь CSS-компоненты | Высокая | Кнопки, карточки, модалки и progress UI повторяются. |
| T-054 — нормализовать `css/main.css` | Критичная | `main.css` содержит HTML-тег `<style>` и должен стать чистым CSS entrypoint. |
| T-055 — извлечь константы из legacy `core.js` | Высокая | `core.js` 302.1 KB и содержит global legacy-логику. |
| T-056 — извлечь общие UI-помощники | Средняя | `ui.js` 32.9 KB остаётся legacy/global слоем. |
| T-057 — создать canon-loader | Высокая | Канон есть в data, но нет единого loader/validator слоя. |
| T-058 — извлечь логику лобби | Высокая | Лобби остаётся в `index.html` и inline scripts. |
| T-059 — извлечь логику игрового раздела | Высокая | Игровые разделы всё ещё сидят в крупных inline-блоках. |
| T-060 — извлечь legacy-логику Вселенной | Средняя | Есть `universeProgression.js`, но DOM/cosmos logic остаётся в монолите. |
| T-061 — решить судьбу `universe.html` | Средняя | Отдельного `universe.html` нет; universe живёт в `index.html` / `initiation-space.html`. |
| T-062 — очистить `index.html` после выноса | Критичная | Цель ≤150 KB недостижима без финального удаления проверенных legacy-блоков. |
| T-063 — mobile-pass после рефакторинга | Критичная | Все экраны нужно проверить на 320/375/768 после выноса. |
| T-064 — решить `data/cards.json` | Высокая | Ожидаемый файл на 63 карты отсутствует. |
| T-065 — финальный smoke test и документация | Критичная | Нужна финальная фиксация состояния после рефакторинга. |

## Рекомендуемый следующий шаг

Следующий PR после T-050: T-051 — создать `css/variables.css` и подключить его безопасно через существующий CSS entrypoint, не удаляя legacy-стили.

Почему именно так:

1. Это минимальный риск: можно добавить tokens без удаления старого CSS.
2. Это готовит T-052 и T-053.
3. Это снижает хаос перед T-054, где `css/main.css` нужно сделать чистым CSS-файлом.
4. Это не трогает канон и не меняет игровые данные.

Не рекомендую начинать с JS-выноса: текущий `index.html` содержит несколько крупных runtime-блоков, и без стабилизации CSS/entrypoint риск регрессий выше.
