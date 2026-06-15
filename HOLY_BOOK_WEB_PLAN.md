# Holy Book — Web edition · Working plan

Context handoff so future sessions can pick up where this one stopped.
The existing `Holy_Book_Web_v1.html` in this folder is a stale draft from May 8
and does not match the current mobile Holy Book canon — treat it as starting
material to throw away, not extend.

---

## Goal

A second Holy Book covering the **web** product (the Vercel example at
`https://web-app-v3-pink.vercel.app/`). Same editorial language as the mobile
book, but separate artifact with its own architecture and patterns.

The mobile Holy Book stays as it is. The two are sibling documents.

---

## Scope decisions (all confirmed)

1. **Toggle per-section (variant B).** Each pattern section has a local
   `<DeviceTabs>` switching between **Desktop** and **Mobile**. Local, not
   global. Default: Desktop. Optional third tab "Side by side" only where it
   actually helps comparison.
2. **New file.** Build to `Holy_Book_Web.html`, not extend `Holy_Book_Web_v1`.
3. **Isolated source.** New folder `src/web/` with its own `app / kit /
   part1 / part2 / part3` subtree. Separate manifest
   (`build/manifest_web.template.json`), separate shell
   (`build/shell_web.html`), separate build script (`scripts/build_web.py`).
   Mobile build is not touched.
4. **Frames.** `<WebFrame mode="desktop|mobile">`:
   - Desktop: chrome-like browser window (three dots + URL pill), inner width
     1440, scaled down via CSS transform to fit the doc column.
   - Mobile-web: 360 wide, scaled. Like the mobile app but in a browser
     context — bottom nav stays (web mobile is intentionally inline with the
     native app).
5. **Mobile-web ≈ native app.** Bottom nav, similar header rhythm — close to
   the mobile Holy Book's presentation.
6. **Patterns are reimagined, not copied 1:1.** Web is its own language.
7. **Flows rewritten.** Auth / Add a Car / Checkout are re-presented for web
   (not cross-references to mobile book).

---

## Part I — Architecture (7 short chapters)

The user explicitly excluded tokens / typography / colors / motion from
Foundation. The web architecture is **contextual, not spatial**: there is no
dark/white layer contract like mobile. The organizing principle is the active
vehicle as a global filter, the URL as state, and a small set of surfaces.
There is **no Corridor concept** on web — its role is filled by modal / side
drawer / full-page-commit page.

Chapter-boundary rule (kept explicit to avoid overlap):
**Ch02 = what surface it is · Ch04 = where it sits on the page (desktop) ·
Ch07 = how it transforms when narrowed.**

| Ch | Title | Core idea |
|---|---|---|
| 01 | **Vehicle is the spine** | The active vehicle is a **global context-filter** living in the header pill (desktop + mobile — confirmed by screens). Every list / price / recommendation is a projection of the catalog through the active car. Switching cars **re-renders content, never navigates** (URL: `?car=`, history *replace* — shareable but doesn't pile back-stack entries). Empty-garage cold start mirrors mobile. This contextual principle replaces mobile's dark/white layer contract. |
| 02 | **Surfaces** | Web building blocks. <br>**Shell** — persistent: top header (vehicle pill + search + region/lang + sign-in + cart) + collections nav strip + desktop footer + mobile bottom nav (Home / Catalog / Cart, app-like).<br>**Overlay surfaces** — *centered modal ⇄ bottom sheet* as one adaptive pair (desktop modal ≡ mobile sheet); *side drawer* (filters, cart preview, account menu); *inline expand* (accordion).<br>**Garage = destination panel**, not a layer: slide-over drawer on desktop / page on mobile, carrying the full mobile block stack (profile · My auto · orders · wishlist · rewards). Deep-linkable (`/garage`), opened from header profile. Vehicle pill = quick switch; `/garage` = full management.<br>**Full-page commit** (strong section) — Checkout only, single page, no shell. On mobile-web this is the **only** place bottom nav disappears. Browser-back → "Cancel checkout?" dialog (web analogue of the corridor discard sheet), never a silent drop. Carries corridor discipline: one primary CTA, one job. |
| 03 | **URL & navigation** | **NEW chapter.** Web analogue of mobile's "platform back semantics", but more fundamental — URL is state. What pushes history (page transitions) vs what does not (overlays, car switch via `?car=` replace). Browser back/forward must be predictable: back closes an open overlay before leaving the page; never a back-trap. Deep links restore the active vehicle. **Breadcrumbs = the visible manifestation of the URL path hierarchy** (`/catalog/category/product`); collapse to a back-arrow on mobile (detailed visual pattern lives in Part II). Scroll restoration on back-to-list. |
| 04 | **Layout** | Canonical desktop layouts only (transformation is Ch07). Desktop = header + main (often + sidebar) + footer; mobile-web = header + content + bottom nav. Header carries vehicle pill + region/lang + sign-in + cart, with the **collections** strip beneath and the mega-menu off "All Categories". Container widths, region structure, spacing scale (tokens copied from mobile shell). |
| 05 | **States** | empty / loading / error / optimistic. The six principles from mobile Ch06, cited verbatim where applicable. "Match the layer" is rewritten for web → **the state lives where the failing container lives** (inline / drawer / modal / full-page). |
| 06 | **Input & accessibility** | Web input is a **triple model**: mouse + hover + cursor (desktop only) · keyboard (tab order, esc, arrow-keys on dropdowns) · touch (mobile-web). Focus rings, logical tab order, esc-closes-overlay, ARIA basics (modal / drawer / menu roles, active-car announce). Min target 32px desktop / 44px mobile. Copy rules carried from mobile Ch07. |
| 07 | **Responsive — desktop ↔ mobile-web** | Breakpoints + transformation map. Two shell modes: **with bottom nav** (Home / Catalog / Cart, app-like, default) and **without** (Checkout / full-page commit only). Swaps: collections strip → horizontal scroll / drilled · "All Categories" mega-menu → drilled list · sidebar filters → drawer · wide product card → vertical · footer mass-links → accordion · breadcrumbs → back arrow. Many small frames showing each swap. |

---

## Part II — Pattern library

Group order mirrors mobile (Navigation / Surfaces / Controls / Actions /
Status / Product / Promotion).

### Ported from mobile (reimagined, not 1:1)

| Pattern | Desktop | Mobile-web |
|---|---|---|
| Top nav (≈ Tab Bar) | persistent top nav | bottom nav (matches app) |
| Search | search bar in header → overlay or inline results | full-screen overlay |
| List filtering | universal, inline above list | same |
| Modal Views | centered modal + side drawer | bottom sheet variant |
| Dialogs / Alerts | centered confirm + alerts | same |
| Snackbars / Toasts | bottom-left or bottom-center | bottom over nav |
| Infoblocks | universal | same |
| Loading | spinners + skeletons | same |
| Empty | universal | same |
| Errors | universal | same |
| Optimistic / Undo | universal | same |
| Action hierarchy (Buttons) | universal, sizes adjust (36 desktop / 44 mobile) | same |
| Dropdown | native select or custom popover | bottom sheet picker |
| Accordion | universal | same |
| Quantity Stepper | universal | same |
| Multi-step indicator | wide stepper | condensed |
| Filters | left sidebar | drawer / sheet — close to app corridor |
| Context menu | right-click + kebab | kebab + long-press |
| Product Card | wide horizontal | vertical |
| Reviews | universal | same |
| Gallery | large media + thumb strip | same |
| Final screens | universal | same |
| Widgets / Promo blocks | hero + grid | hero + stack |

### New (web only, taken from the Vercel example)

- **Breadcrumbs** — desktop primary, truncated on mobile (architecturally: the visible URL path — see Part I Ch03)
- **Footer mass-links** — desktop primary, collapsed accordion on mobile
- **Mega-menu** — desktop only (off "All Categories")
- **Region / language selector** — header dropdown
- **Collections** — the primary category navigation (Road trip ready, Off-road weekends, Show-off mode, …). Header strip on desktop; horizontal scroll / drilled on mobile. *Promoted from "deferred" — screens show it is the main catalog entry, not an optional extra.*

### Explicitly skipped (no web equivalent)

- Dynamic Island
- Swipe Actions
- WebView (web *is* web)
- Pull-to-refresh

### Explicitly deferred (analysed, not added now)

These were called out from the Vercel example as worthwhile but the user said
*"новые вещи я бы не добавлял пока что, да они полезны, но пока не нужны"*:

- Vehicle Health / "Needs attention" card
- Maintenance timeline
- Service prediction
- Recall notice
- Secondary services hub (Insurance, Garage booking, Parking)
- "Fits your [car]" fitment badge as standalone pattern
- Per-unit price calculation

Pick these up after the core set lands.

---

## Part III — Flows

Three, same as mobile, fully rewritten for web:

- **Authentication** — desktop centered modal (or dedicated route); mobile-web close to app's Auth corridor
- **Add a Car** — desktop modal carrying the same flow steps; mobile-web close to app's corridor entry
- **Checkout** — **single-page commit, no header / nav (full-page surface)**. Both desktop and mobile-web variants. Mobile-web has no bottom nav on Checkout — it's a full-page commit, same architectural reason as the mobile app's ✕ corridor.

Each flow uses `<DeviceTabs>` per Stage to switch presentation.

---

## Toggle component — `<DeviceTabs>`

- Lives at the top of each H3 / pattern section
- Two tabs: **Desktop** · **Mobile**
- Local React state; default Desktop; toggle re-renders just that section's frames
- Optional third tab "Side by side" where comparison adds value (Tab Bar, Filters)
- Architecture chapters also use it where presentation diverges
- Implementation: small wrapper that takes `<DeviceFrame device="desktop">…</DeviceFrame>` children, shows only the active one (or both for SbS)

---

## Build infrastructure

```
src/web/
  app/        main.jsx · toc.jsx
  kit/        WebFrame · BrowserChrome · DesktopShell · MobileWebShell ·
              DeviceTabs · base web components (Button / Modal / Drawer / Toast / …)
  part1/      ch01-vehicle · ch02-surfaces · ch03-url-nav · ch04-layout ·
              ch05-states · ch06-input-a11y · ch07-responsive
  part2/      p-… (no `wp-` prefix — folder is the namespace)
  part3/      p-auth · p-addcar · p-checkout
build/
  manifest_web.template.json    only references src/web/**
  shell_web.html                own CSS palette (copy --ink / --accent / typography
                                from mobile shell so design language stays unified)
scripts/
  build_web.py                  separate from build.py
```

Mobile build keeps using existing `build.py` + `manifest.template.json` +
`shell.html`. Zero shared paths.

---

## Open micro-decisions (defer to next session)

1. **File naming** inside `src/web/part2/` — go with `p-tabbar.jsx`,
   `p-modal.jsx` (no `wp-` prefix) since the folder already namespaces it.
2. **Shared CSS** — copy tokens (`--ink`, `--accent`, mono / sans stacks,
   spacing scale) from mobile `shell.html` into `shell_web.html`. Don't
   reinvent.
3. **Browser chrome detail** — include a fake URL bar (`autodoc.com/…`) so
   readers immediately register "this is a web scene". Three dots / traffic
   lights on the left.
4. **Button heights** — 36 desktop / 44 mobile-web. Border radius 10, weight
   600, fontSize 13.
5. **Web TOC style** — same boxed sidebar as mobile Holy Book.

---

## Execution order (when we restart)

1. Scaffold — `src/web/` tree + empty `build_web.py` + `shell_web.html` with
   minimal TOC + smoke build producing an empty `Holy_Book_Web.html`.
2. Kit — `WebFrame`, `DesktopShell`, `MobileWebShell`, `BrowserChrome`,
   `DeviceTabs`, base web components.
3. Part I skeleton — six chapters as stubs with one or two real frames each,
   shown to user for direction check.
4. **First sample pattern: Product Card** (Desktop wide + Mobile vertical) —
   the most visual; sets the language.
5. After user OK — push remaining patterns and flows in conveyor order.

---

## Notes carried over

- Part I grew from 6 to **7 chapters**: a dedicated **Ch03 URL & navigation**
  was added (URL is state — the web analogue of mobile's platform-back). Layout
  is now Ch04, States Ch05, Input/a11y Ch06, Responsive Ch07.
- Ch01 reframed around the **context-filter** principle (active vehicle as a
  global filter) — this replaces mobile's dark/white layer contract, which has
  no web equivalent.
- **Garage is not a layer on web** — it is a destination panel (slide-over
  drawer on desktop, page on mobile) carrying the mobile block stack; vehicle
  pill in the header is the quick switch. Confirmed from user screens.
- **Collections** were promoted from the deferred list to the primary category
  navigation (header strip + mega-menu). Confirmed from user screens.
- The mobile audit is clean (zero sheet-over-Curtain, configurator header
  variant documented in Ch05, three corridor header variants total). The web
  book starts from a clean reference book.
- All deferred patterns (Vehicle Health, Maintenance, etc.) live in section 7
  above so they aren't lost.
