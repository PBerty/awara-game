# Статус рефакторинга AWARA

Источник аудита: текущий `master` после PR #40 и приложенный план `docs/REFACTOR_TASKS.md`.

Цель этого файла: зафиксировать, что уже есть в репозитории, что ещё не сделано, и не запускать рефакторинг кода без ревью Pavel'а.

## Короткий вывод

| Область | Статус | Комментарий |
|---|---|---|
| `index.html` | не сделано | Файл всё ещё монолитный: 1,047,940 байт, 7 inline `<style>`, 29 `<script>` |
| Базовые папки | сделано частично | `css/`, `js/`, `assets/`, `docs/`, `data/` существуют; `assets/icons/` и `assets/images/` не заведены отдельно |
| CSS-модули | не сделано | Есть только `css/main.css`; нет `variables.css`, `typography.css`, `components.css` |
| JS-модули | сделано частично | Есть ряд модулей, но `core.js` и `ui.js` остаются legacy/global, нет отдельных `canon.js`, `lobby.js`, `game.js`, `universe.js` |
| Экраны | сделано частично | Большинство экранов уже отдельные HTML; отдельного `universe.html` нет |
| Data-канон | сделано частично | `agents`, `matrices`, `locas`, `chakras` есть; `data/cards.json` отсутствует |
| План рефакторинга | сделано в этой ветке | Исходник сохранён как `docs/REFACTOR_TASKS.md`, активный остаток вынесен в `docs/REFACTOR_TASKS_ACTIVE.md` |

## HTML-файлы

| Файл | Статус | Комментарий |
|---|---|---|
| `index.html` | не сделано | Главный монолит; цель будущего рефакторинга — сократить до лобби |
| `tigel.html` | сделано | Отдельный экран уже есть; использует `js/playerState.js` |
| `dashboard.html` | сделано | Отдельный экран уже есть; использует `js/playerState.js` |
| `cards.html` | сделано | Отдельный экран колоды уже есть |
| `oracle.html` | сделано | Отдельный экран Оракула уже есть |
| `passport.html` | сделано | Отдельный экран паспорта уже есть |
| `matrices.html` | сделано | Отдельный экран матриц уже есть; в старом плане назывался `matrix.html` |
| `natal.html` | сделано | Отдельный экран натальной карты уже есть |
| `earth-player.html` | сделано | Отдельный экран земли игрока уже есть |
| `initiation-space.html` | сделано | Отдельный экран пространства инициации уже есть |
| `universe.html` | не сделано | Отдельного экрана вселенной нет; космос живёт в `index.html` / `initiation-space.html` |

## CSS

| Файл | Статус | Комментарий |
|---|---|---|
| `css/main.css` | сделано частично | Существует и подключён в `index.html`, но это не чистый aggregator: внутри есть `<style>` на первой строке и 2446 строк legacy-стилей |
| `css/variables.css` | не сделано | Нужно вынести design tokens |
| `css/typography.css` | не сделано | Нужно вынести типографику |
| `css/components.css` | не сделано | Нужно вынести кнопки, карточки, модалки, прогресс-бары |

## JS

| Файл | Статус | Комментарий |
|---|---|---|
| `js/core.js` | сделано частично | Существует, но это legacy global `window.AWARA_SYS`, не чистый ES-модуль констант |
| `js/playerState.js` | сделано | Есть `getState()`, `saveState(state)`, `migrate()` и ключ `awara_v258_state` |
| `js/ui.js` | сделано частично | Существует, но это legacy/global UI-логика, не набор чистых helper-функций |
| `js/universe/universeProgression.js` | сделано | Чистый модуль прогрессии вселенной уже есть |
| `js/dailyKey.js` | сделано | Модуль ключа дня уже есть |
| `js/dailyReward.js` | сделано | Модуль daily reward уже есть |
| `js/cardEffects.js` | сделано | Эффекты карт уже есть |
| `js/matrixSwitcher.js` | сделано | Переключатель матриц уже есть |
| `js/streak.js` | сделано | Streak-модуль уже есть |
| `js/oracle.js` | сделано | Логика Оракула уже есть |
| `js/oraclePromptBuilder.js` | сделано | Builder промптов Оракула уже есть |
| `js/cauldronEngine.js` | сделано | Движок Тигеля уже есть |
| `js/dosha.js` | сделано | Конституция Панча-Бхута уже есть |
| `js/canon.js` | не сделано | Нужен отдельный loader канона |
| `js/lobby.js` | не сделано | Логика лобби ещё внутри `index.html` |
| `js/game.js` | не сделано | Логика раздела игры ещё не вынесена отдельно |
| `js/universe.js` | не сделано | Legacy-рендер вселенной ещё не вынесен отдельно |
| `js/tigel.js` | не сделано | Отдельного модуля экрана Тигеля нет; логика остаётся в `tigel.html` |
| `js/dashboard.js` | не сделано | Отдельного модуля Дашборда нет |

## Data

| Файл | Кол-во | Статус |
|---|---:|---|
| `data/agents.json` | 21 | сделано |
| `data/matrices.json` | 33 | сделано |
| `data/agent_matrix_map.json` | 693 | сделано |
| `data/locas.json` | 14 | сделано |
| `data/chakras.json` | 9 | сделано |
| `data/card_prompts.json` | 693 | сделано |
| `data/extra_card_prompts.json` | 792 | сделано |
| `data/domain_cards.json` | 21 | сделано |
| `data/monad_path_cards.json` | 16 | сделано |
| `data/vedic_loka_cards.json` | 14 | сделано |
| `data/vedic_loka_being_cards.json` | 42 | сделано |
| `data/cards.json` | 0 | не сделано |

Прочие data-файлы уже присутствуют: `breath_path_layers.json`, `cauldron_rules.json`, `default_player_state.json`, `extra_beings.json`, `iconography.json`, `mythic_branches.json`, `mythic_locations.json`, `mythic_quest_lines.json`, `mythic_relationships.json`, `mythic_relics.json`, `reality_scale_maps.json`, `sensory_ritual_layers.json`, `zones.json`.

## Что удалить из исходного плана как уже сделанное

| Старый номер | Решение | Причина |
|---|---|---|
| T-049 | перенумеровать | Номер уже занят закрытой задачей `game-space-changes.md` |
| T-050 | удалить | Базовые папки `css/`, `js/`, `assets/`, `docs/` уже есть |
| T-056 | удалить | State-management уже закрыт через `js/playerState.js` |
| T-062 | удалить | `tigel.html` уже есть |
| T-063 | удалить | `dashboard.html` уже есть |
| T-065 | удалить | `matrices.html` уже есть как отдельный экран матриц |
| T-066 | удалить | `cards.html` уже есть |
| T-067 | удалить | `oracle.html` уже есть |
| T-068 | удалить | `passport.html` уже есть |

## Рекомендованный первый шаг

Начать не с переноса кода, а с новой T-050: создать `docs/refactor-map.md` — карту строк `index.html`, где перечислены CSS-блоки, JS-блоки и оставшиеся логические области. После ревью этой карты можно безопасно извлекать CSS по одному файлу.
