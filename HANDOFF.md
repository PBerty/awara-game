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
| Аккаунт | paharaduga-beep |
| Сессия | https://app.devin.ai/sessions/e84aad0cb623469da4d71a42da4d46ce |
| Модель | Agent |
| Дата | 2026-05-10 (UTC) |
| Закрытая задача | T-004 |
| Следующая задача | **T-005** (см. TASKS.md) |
| Состояние master | ожидает merge PR |
| Pages | включён, master/root |

---

## Лог смен (новые записи СВЕРХУ)

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
