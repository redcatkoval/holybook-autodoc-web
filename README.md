# Holy Book — Autodoc Web Design System

Свод правил проектирования **веб-продукта** Autodoc: фундамент, паттерны, обоснование за каждым решением. Сиблинг мобильной книги ([holybook-autodoc-app](https://github.com/redcatkoval/holybook-autodoc-app)) — тот же канон Autodoc, переложенный на широкий канвас и mobile-web. Документ собирается из JSX-исходников в один офлайн HTML-бандл, который любой член команды открывает в браузере.

Этот README — **единая точка истины** по структуре, канону и процессу веб-книги. Если он расходится с тем, что в `src/`, исправь README.

---

## Что это

Holy Book Web — это **документация, а не библиотека компонентов**. В продукт код не уходит. Документ описывает **как веб-продукт себя ведёт** — для чего каждая поверхность, когда её доставать, почему. Визуалы — схематичные wireframes; обязывающим каноном служит проза вокруг них.

Два отличия от мобильной книги, заданные с самого начала:

- **Веб строится mobile-first и расширяет app** — тот же spine, те же компоненты и ритм, отмасштабированные на широкий экран, чтобы две книги читались как один язык.
- **Каждый паттерн показан в двух формах рядом** — **desktop** (фрейм-браузер) и **mobile-web** (фрейм-телефон). Палитра — только из app (`PAL`), кнопки — app'а, заглушки — схематичные.

---

## Структура книги

### Part I — Architecture (`src/part1/`)

Пять глав фундамента. Всё ниже наследует от этих правил.

1. **Vehicle is the spine** (`ch01-vehicle.jsx`) — организующий принцип веба: **контекст, а не пространство**. Активная машина — глобальный фильтр-«линза» в шапке; смена машины **ре-рендерит страницу на месте, а не навигирует** (`?car=` пишется через history *replace*).
2. **Layout** (`ch04-layout.jsx`) — где что лежит на странице: три архетипа, шапка-spine, сворачивание в mobile-web (у каждого десктоп-региона есть явный мобильный адрес).
3. **Surfaces** (`ch02-surfaces.jsx`) — какого рода поверхность вещь: shell, семейство overlay'ев, full-page commit. Навигация и URL — свойство поверхности.
4. **States** (`ch05-states.jsx`) — состояния это контент. Шесть принципов; на вебе **нет слоёв** — состояние живёт *там, где сломался контейнер*.
5. **Accessibility** (`ch06-input-a11y.jsx`) — мышь + клавиатура + тач сосуществуют; видимый фокус, операбельность с клавиатуры, размеры целей, контраст.

### Part II — Pattern Library (`src/part2/`)

Утверждённый набор веб-паттернов. TOC группирует их по интенту; каждая группа — один файл `sec-*.jsx`. Каждый паттерн **самодостаточен** (без перекрёстных ссылок на другие паттерны/Part I) и показан **desktop ↔ mobile-web**.

- **Navigation & search** (`sec-navigation.jsx`) — Mega-menu, Search, List filtering, Breadcrumb
- **Surfaces** (`sec-surfaces.jsx`) — Modal views, Dialogs & alerts, Toast (snackbar), Infoblocks, Result screens
- **Controls** (`sec-controls.jsx`) — Action hierarchy, Dropdowns, Accordion, Step indicators
- **Actions on items** (`sec-items.jsx`) — Context menus
- **Status** (`sec-status.jsx`) — Loading, Empty states, Errors, Optimistic & undo

### Not ready (`src/part2/sec-notready.jsx` + `src/part2/sec-product.jsx`, `sec-promo.jsx`, `src/part3/`)

В самом конце книги — раздел «Not ready / Open questions»: паттерны и флоу, чья веб-форма ещё не устоялась. Структура может сдвинуться; промоут в Part II по мере созревания. Сейчас здесь живут:

- **Паттерны:** Filters, Quantity stepper, Reviews & ratings (`sec-product.jsx`), Image gallery (`sec-product.jsx`), Widgets (`sec-promo.jsx`), Product card (`sec-notready.jsx`).
- **Флоу** (`src/part3/`): Sign in & register (`flow-auth.jsx`), Add a car (`flow-addcar.jsx`), Help me choose (`flow-helpmechoose.jsx`), Cart → order (`flow-checkout.jsx`).

Все они помечены чипом `Not ready` в `PatternHead` и рендерятся под разделителем «Not ready» после Part II.

---

## Канон — краткая сводка

Подробное обоснование — в соответствующей главе Part I. Здесь — quick-reference.

### Vehicle is the spine (Ch01)

У веба **нет** layer-контракта (dark/white), как в app. Организующий принцип — **контекстный**: активная машина — глобальная линза в шапке. Каждый список, цена, рекомендация — проекция каталога через активную машину. Смена машины **ре-рендерит**, не навигирует; в URL машина — параметр `?car=`, записанный через *replace* (ссылка шарится, но back-стек не пухнет). Cold start: каталог не пустеет — баннер «добавь машину» над листингом.

### Surfaces (Ch03) — три рода поверхностей

- **Shell** — постоянный каркас: десктоп — шапка-spine + collections-strip + футер; mobile-web — компактная шапка + bottom-nav. Shell-страницы владеют URL'ом (bookmark / share / reload); переходы пушат **реальную историю** со scroll-restoration.
- **Overlay-поверхности** — не трогают историю (back сначала закрывает overlay):
  - **modal ↔ bottom sheet** — одна адаптивная пара (десктоп — центр-модал, мобайл — ботомшит).
  - **full-screen sheet** — тяжёлый конец той же пары; на весь маленький экран (поиск, большой пикер), коммитит ничего, **covers** shell (не removes).
  - **dropdown** — поповер у хедер-кнопки (профиль, сортировка, регион/язык); на мобайле → ботомшит.
  - **slide-over** — контентная панель сбоку, в которой работаешь.
  - **inline expand** — раскрытие в потоке страницы (аккордеон).
- **Full-page commit** — замена корридора: страница без shell (checkout). На mobile-web это единственное место, где bottom-nav реально **удаляется**. Выход **гейтится** диалогом «Cancel checkout?».

**На вебе нет sheet-поверхности** (в отличие от app) — поэтому диалоги/поверхности делятся по **ставкам**, а не по типу sheet'а.

### Cart, Garage, Profile

- **Корзина** — это панель, в которой *работают* (количества, фитмент, сабтотал, Checkout): **правый slide-over** на десктопе, полная **страница Cart** на мобайле. Лёгкое «добавлено ✓» — это **тост**, а не корзина.
- **Гараж** — destination, **не слой**. Открывается из **vehicle-pill** (пилл подсвечивается). Построен на **табах** (таб = выбор машины сразу) + панель выбранной машины + остальная инфа. Две презентации, без дефолта: **(1)** тёмный slide-over (слева; на мобайле full-cover); **(2)** **inline-блок**, раскрывающийся под рядом с пиллом, пушит контент вниз (не оверлей).
- **Профиль** — короткое меню ссылок: **dropdown** на десктопе ↔ **bottom sheet** на мобайле. Язык живёт здесь.

### Кнопочная таксономия (Part II · Action hierarchy)

Иерархия — по **весу, а не по цвету**. Одна роль на «один глагол поверхности».

- **Primary** — залитый **чёрный** (`#111`). Один на поверхность, причина её существования.
- **Accent** — оранжевый, **зарезервирован только под buy/commit** (Add to cart, Checkout). Не «уровень» иерархии и не способ «выделить» вторую кнопку.
- **Secondary** — **в рамке** (bordered), внутри блока со своей задачей.
- **Tertiary** — простой текст, тихий выход.
- **Link** — подчёркнутый текст; **не действие** (открывает контент).

### Pick a surface — practical cheat-sheet

| Что нужно | Выбор |
|---|---|
| Подтверждение / маленькая форма | **modal** (desktop) / **bottom sheet** (mobile) |
| Меню ссылок или выбора у хедер-кнопки (профиль, сортировка, регион/язык) | **dropdown** → bottom sheet на мобайле |
| Контентная панель, в которой работаешь (корзина справа, гараж слева) | **slide-over** → full page на мобайле |
| Тяжёлый фокус на весь маленький экран (поиск, большой пикер) | **full-screen sheet** |
| Деталь в потоке чтения | **inline expand** |
| Однократный коммит на весь экран (checkout) | **full-page commit** (выход через «Cancel checkout?») |

### Errors — четыре вида по поверхности (Part II · Errors)

Выбор по тому, **должен ли пользователь ответить**:

- **Toast** — non-blocking фоновый сбой; тихий Retry, поток не блокируется.
- **Inline** — ошибка поля; красное сообщение под инпутом, primary disabled до фикса. Никаких модалок для ошибки ввода.
- **System alert** — must-answer; центр-модал с двумя текст-кнопками (Cancel слева, действие справа красным), tap-outside не закрывает.
- **Hard container** — мёртвый контейнер заменяется целиком (форма Result-screen), shell вокруг остаётся.

### Dialogs — по ставкам (Part II · Dialogs & alerts)

- **Destructive / необратимое** → **центр-модал на каждом размере**. Cancel — **текстовая кнопка** (не bordered), действие — красное; tap-outside выключен.
- **Мягкий confirm** → modal ↔ sheet, primary не красный.
- **Дёшево-обратимое** → без диалога: сделать + Undo в тосте.

### Context menus (Part II · Context menus)

Открываются **⋮ или правым кликом — никогда long-press**. **Placement = scope**: ⋮ в шапке = весь экран (dropdown), ⋮ на строке = эта строка (popover). На **mobile-web** — bottom sheet. Destructive последним, в красном; необратимое — через confirm. Менюшка тихая — никогда не единственный путь к действию.

### Toast / never silent (Part II · Toast)

Система **никогда не молчит** — каждый фоновый экшен получает видимый ответ; плоский тост — пол. Не-блокирующий, авто-дизмис, ≤ одного действия (обычно Undo). По центру снизу, на мобайле — над bottom-nav.

### States — без слоёв (Ch04 + Part II · Status)

На вебе **слоёв нет**. Состояние (пусто / загрузка / ошибка) живёт **в своём контейнере** — inline у поля, в секции, или на всю область, когда не рендерится страница. Empty: иконка + человеческий заголовок + 2 строки + **одна** CTA. Loading: skeleton (экран) / button-preloader (кнопка) / in-place spinner (строка). Optimistic: применить сразу + Undo-тост; ошибка сервера — авто-откат + Retry.

### Self-contained patterns

Паттерны **самодостаточны**: никаких «see X» / «→ Pattern» / отсылок на Part I в прозе. Если правило нужно в двух местах — формулируем кратко по сути, не ссылаемся.

---

## Структура репозитория

```
Holy_Book_Web.html           # текущая собранная книга (открыть в браузере)

src/
  app/
    main.jsx                  # тело документа: порядок секций, разделители Part II / Not ready
    toc.jsx                   # sidebar nav, группы Part II, список Not ready
    cover.jsx                 # обложка
  kit/                        # общие примитивы
    web-primitives.jsx        # Browser, MobileWeb, HeaderSpine, MobileHeader, Modal, MobileDrawer,
                              # SideDrawer, CartDrawer, GarageTabs/GarageInline (+ интерактивные демо),
                              # AccountMenu, Btn, Skel, Region, Toast, StepProgress, EmptyState, …
    text-helpers.jsx          # Section, PatternHead, Callout, FrameRow, FrameCell, Rules, DoDont, H3/H4
  part1/                      # 5 глав Part I — Architecture
  part2/                      # группы Part II (sec-*.jsx) + Not-ready паттерны (sec-product/promo/notready)
  part3/                      # флоу (рендерятся под Not ready): auth / addcar / helpmechoose / checkout
  vendor/                     # React, ReactDOM, Babel (не редактируем)

build/
  shell.html                 # внешний HTML-шелл (loader + global CSS)
  template.html              # CSS-шаблон документа (типографика, .frames-row и т.д.)
  manifest.template.json     # маппинг частей → src-файлы (порядок конкатенации в один text/babel)

scripts/
  build.py                   # src/ + build/ → Holy_Book_Web.html (контент gzip+base64, plaintext grep = 0)

README.md                    # этот файл
```

---

## Сборка

```bash
python3 scripts/build.py
```

Конкатенирует `src/**/*.jsx` по `build/manifest.template.json`, оборачивает в `build/shell.html` + `build/template.html`, и пишет один self-contained файл `Holy_Book_Web.html` в корне (см. `--out` в `scripts/build.py`). Сервер не нужен — открыть HTML в любом браузере.

Если нужен HTTP (например, для браузерного MCP / превью):

```bash
python3 -m http.server 8765 --bind 127.0.0.1
# открыть http://127.0.0.1:8765/Holy_Book_Web.html
```

---

## Как добавить или изменить паттерн

1. Найди / создай файл группы:
   - Part I: `src/part1/chXX-name.jsx`
   - Part II: добавь паттерн-функцию в соответствующий `src/part2/sec-*.jsx`
   - Not ready: `sec-notready.jsx` (или `sec-product`/`sec-promo`), флоу — `src/part3/flow-*.jsx`
2. Зарегистрируй (если новая секция/функция):
   - `build/manifest.template.json` — путь к файлу в порядке конкатенации.
   - `src/app/toc.jsx` — TOC-запись в нужной группе (`partII` / `notReady`).
   - `src/app/main.jsx` — JSX-тег в нужной позиции, с `<hr className="rule"/>` между секциями.
3. Следуй формату: `Section + PatternHead + Callout + H3 + FrameRow(FrameCell desktop + FrameCell mobile) + Rules + DoDont`.
4. Держи канон: **desktop ↔ mobile-web рядом**, только палитра `PAL`, кнопки app'а, схематичные заглушки, **никаких отсылок** на другие паттерны/Part I в прозе и **никаких UI-чисел** (hex / px) в правилах.
5. `python3 scripts/build.py`, открой HTML, проверь.

---

## Как изменить правило фундамента

Правила фундамента живут в Part I. Изменение распространяется на каждый паттерн, который его трогает. Процесс:

1. Открой нужную главу (например `src/part1/ch02-surfaces.jsx` для модели поверхностей).
2. Измени правило и обоснование.
3. Пройди Part II и найди места, которые должны соответствовать новому правилу.
4. Обнови сводку канона в этом README, если правило туда попадало.

---

## UX-аудит — что проверять при ревью

- ✅ **Desktop + mobile-web** — каждый вариант показан в паре, рядом.
- ✅ **Surfaces** — корзина = правый slide-over (не dropdown); гараж = slide-over **или** inline-блок (не постоянный слой); профиль = dropdown ↔ sheet.
- ✅ **Кнопки** — primary `#111`, оранжевый только на buy/commit; secondary bordered; tertiary текст; иерархия по весу.
- ✅ **Dialogs** — destructive = центр-модал на каждом размере, Cancel **текстовый**; context menu = ⋮/right-click, мобайл = bottom sheet.
- ✅ **States** — никаких «слоёв»; состояние в своём контейнере; never silent; всегда путь восстановления.
- ✅ **Self-contained** — нет «see X» / отсылок на Part I; нет hex/px в правилах.
- ✅ **Build** — `python3 scripts/build.py` проходит без ошибок; grep по plaintext контента = 0 (gzip).

---

## Статус

Holy Book Web — живой документ. Part I (Architecture) и Part II (Pattern Library) устоялись; всё несформированное аккуратно лежит в **Not ready** (Filters, Quantity stepper, Reviews, Image gallery, Widgets, Product card + четыре флоу) и промоутится наверх по мере созревания. Канон Part I эволюционирует медленно и осознанно.
