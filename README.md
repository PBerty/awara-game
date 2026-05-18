# AWARA -- Дань Благоденствия

Сакральная операционная система. Путь от Кали Юги к Сатья Юге.

## Запуск локально

```bash
git clone https://github.com/victorianpieraverdi-dev/awara-game.git
cd awara-game
python3 -m http.server 8765
```

Откройте http://localhost:8765

## Live

https://victorianpieraverdi-dev.github.io/awara-game/ (auto-deploy с `master` через GitHub Pages)

## Экраны

| Файл | Назначение |
|---|---|
| `index.html` | Лобби (центральное солнце РА) |
| `tigel.html` | Вечерний Тигель (алхимия дня) |
| `dashboard.html` | Дашборд (свет, ранги Державы РА) |
| `universe.html` | Вселенная (21 агент на орбитах, Canvas 2D) |
| `matrix.html` | 33 Матрицы Восприятия |
| `cards.html` | Колода MVP (63 карты = 21 агент × 3 базовые матрицы) |
| `oracle.html` | Оракул |
| `passport.html` | Паспорт Души |

## Архитектура

См. [docs/architecture.md](docs/architecture.md)

## Канон AWARA (инвариант)

| Сущность | Кол-во |
|---|---|
| Агенты | 21 |
| Матрицы | 33 |
| Локи | 14 |
| Чакры | 9 |
| Карты | 1578 полная колода (693 core + 885 доп.); 63 MVP |
| Соответствия | 21 × 33 = 693 |

## Технологии

- Pure HTML / CSS / ES6 JavaScript
- Mobile-first (375px)
- localStorage
- Canvas 2D
- Без фреймворков и бандлеров

## Дизайн

- Палитра: золото `#c9a84c` на черном `#000` / `#0a0a14`
- Шрифты: Cinzel (заголовки), Cormorant Garamond (текст), JetBrains Mono (данные)

## Документы

- [`docs/architecture.md`](docs/architecture.md) -- финальная архитектура
- [`docs/refactor-map.md`](docs/refactor-map.md) -- карта рефакторинга
- [`HANDOFF.md`](HANDOFF.md) -- журнал смен (24 задачи)
- [`AWARA_RULES.md`](AWARA_RULES.md) -- инварианты проекта

## Для AI-агентов (Devin / Claude / GPT)

- [`START_PROMPT.md`](START_PROMPT.md) -- bootstrap-промпт для новой сессии
- [`AWARA_RULES.md`](AWARA_RULES.md) -- инвариантные правила
- [`HANDOFF.md`](HANDOFF.md) -- журнал смен

## Лицензия

Не определена (private project, public visibility для синхронизации команды).
