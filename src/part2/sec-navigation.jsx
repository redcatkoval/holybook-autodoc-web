// Part II · Navigation — four separate patterns, mirroring the app book's
// "Navigation and search" group: Mega-menu, Search, List filtering, Breadcrumb.
// Each is its own Section. Colours/buttons are the app palette; no
// personalisation of a specific feature.

// ── shared bits ───────────────────────────────────────────────────────────
// Schematic — the point is the STRUCTURE of the catalogue tree, not the copy,
// so category names, tile labels and deal copy are shown as placeholder bars.
function CatRail({ active = 0, n = 9 }) {
  return (
    <div style={{ width: 170, borderRight: "1px solid #ececec", padding: "8px 0", flexShrink: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const on = i === active;
        return (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "9px 12px",
            background: on ? "#fff" : "transparent",
            border: on ? "1px solid #ececec" : "1px solid transparent",
            borderRight: on ? "none" : "1px solid transparent",
            borderRadius: on ? "8px 0 0 8px" : 0,
          }}>
            <Skel w={on ? 88 : 60 + (i % 3) * 12} h={7} bg={on ? "#111" : "#d8d8d8"} />
            <span style={{ color: on ? "#111" : "#9a9a9a", fontSize: 11 }}>›</span>
          </div>
        );
      })}
    </div>
  );
}

function TileGrid({ cols = 4, n = 8 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: "100%", background: "#f7f6f4", borderRadius: 8, padding: 6 }}><Thumb h={40} /></div>
          <Skel w="72%" h={6} bg="#d8d8d8" />
        </div>
      ))}
    </div>
  );
}

function DealCard() {
  return (
    <div style={{ flexShrink: 0, width: 200, border: "1px solid #ececec", borderRadius: 10, padding: 10, background: "#fff" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Thumb w={48} h={48} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          <Skel w={46} h={6} bg="#d8d8d8" />
          <Skel w="82%" h={7} />
          <Skel w="46%" h={6} bg="#d8d8d8" />
        </div>
      </div>
      <div style={{ marginTop: 8 }}><Btn tone="primary" block size="sm">Add to cart</Btn></div>
    </div>
  );
}

// Slider nav — ‹ › arrows for horizontal rails. Black by default.
function SliderNav({ color = "#111" }) {
  return (
    <span style={{ display: "inline-flex", gap: 14, color }}>
      {["‹", "›"].map((c, i) => (
        <span key={i} style={{ fontSize: 17, lineHeight: 1, color }}>{c}</span>
      ))}
    </span>
  );
}

// Real "fits your car" chip — kept as real copy (NOT a placeholder), shown
// next to the category title on both desktop and mobile.
function FitsChip({ small = false }) {
  return <Pill tone="good" style={small ? { fontSize: 8 } : undefined}>✓ Fits your BMW 320d</Pill>;
}

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Mega-menu  (web incarnation of the app's tab-bar + catalog nav)
// ════════════════════════════════════════════════════════════════════════
// The mega-menu is a DROPDOWN anchored under the black 'Catalog' button in the
// collections strip — the same popover idiom as the cart dropdown under the
// basket, not a full-width bar.
function MegaMenu() {
  return (
    <div style={{
      position: "absolute", top: 38, left: 10, width: 560, background: "#fff",
      border: "1px solid #d8d8d8", borderRadius: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
      zIndex: 5, overflow: "hidden",
    }}>
      <div style={{ display: "flex" }}>
        <CatRail active={0} />
        <div style={{ flex: 1, padding: 12, minWidth: 0 }}>
          {/* category title (placeholder) + REAL fits chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Skel w={96} h={8} /><FitsChip />
          </div>
          <TileGrid cols={4} n={8} />
          <div style={{ borderTop: "1px solid #ececec", margin: "12px 0 10px" }} />
          {/* deal rail — placeholder label + black slider nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <Skel w={50} h={7} /><SliderNav />
          </div>
          <div style={{ display: "flex", gap: 10, overflow: "hidden", marginBottom: 12 }}>
            <DealCard /><DealCard />
          </div>
          {/* brand rail */}
          <Skel w={70} h={7} style={{ marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{ flexShrink: 0, padding: "11px 20px", borderRadius: 8, background: "#fff", border: "1px solid #d8d8d8" }}>
                <Skel w={36} h={7} bg="#d8d8d8" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile catalog — the content inside the Catalog tab, taken from the app's
// Catalog Home (CNCatalogProposed): category TABS, a 2×2 tile grid, then a
// recommendations carousel. Schematic — structure, not copy.
function MobileCatalogTabs() {
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* category tabs — active underline BLACK (no orange) */}
      <div style={{ display: "flex", gap: 16, overflow: "hidden", borderBottom: "1px solid #ececec", padding: "8px 12px 0" }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const on = i === 0;
          return (
            <div key={i} style={{ flexShrink: 0, paddingBottom: 8 }}>
              <Skel w={on ? 58 : 44} h={7} bg={on ? "#111" : "#d8d8d8"} />
            </div>
          );
        })}
      </div>
      <div style={{ padding: 10, flex: 1, overflow: "hidden" }}>
        {/* category title placeholder + REAL fits chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Skel w={64} h={6} bg="#9a9a9a" /><FitsChip small />
        </div>
        {/* 2×2 tile grid — SAME component as desktop */}
        <TileGrid cols={2} n={4} />
        {/* recommendations carousel — SAME DealCard component + black slider nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 10px" }}>
          <Skel w={80} h={8} bg="#b8b8b8" /><SliderNav />
        </div>
        <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
          <DealCard /><DealCard />
        </div>
      </div>
    </div>
  );
}

function PatMegaMenu() {
  return (
    <Section id="p-megamenu">
      <PatternHead category="Navigation" title="Mega-menu"
        lede="The catalogue's primary spine. The black 'Catalog' button opens a dropdown: a category rail on the left, a vehicle-scoped tile grid in the middle, and curated DEALS and SHOP-BY-BRAND rails beneath. This is the desktop incarnation of the app's tab-bar-plus-catalog navigation — the same category tree, given the room a wide screen affords." />

      <Callout label="Autodoc reading">
        The app reaches the catalogue through a bottom tab bar and a stack of drilled category screens. The web has no tab bar, so the same tree lives in one place: the mega-menu under &quot;Catalog&quot;. Desktop shows the whole tree at once; the small screen falls back to <b>category tabs</b>, exactly like the app Catalog — categories that are a side rail on desktop become a horizontal tab strip on mobile-web.
      </Callout>

      <H3>Desktop — the dropdown</H3>
      <p>The dropdown opens under the black <b>Catalog</b> button and over the page, the same popover idiom as the cart. Hovering a category lights its tile grid; the grid is already <b>filtered to the active vehicle</b>, so every tile leads to fitting parts. Two promotional rails — DEALS and SHOP BY BRAND — ride the bottom of the same dropdown as lateral routes, not separate pages.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A dropdown anchored under the black 'Catalog' button — category rail · vehicle-scoped tile grid · DEALS · SHOP BY BRAND — opening over the page, the same popover idiom as the cart dropdown.">
          <Browser url="autodoc.ex/catalog" h={560}>
            <HeaderSpine />
            <div style={{ position: "relative" }}>
              <CollectionsStrip />
              <div style={{ padding: 10 }}><Region label="Page" h={460} /></div>
              <MegaMenu />
            </div>
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>Mobile-web — category tabs</H3>
      <p>The side rail can&apos;t fit, so the categories become a <b>horizontal tab strip</b> with a tile grid beneath — the same shape as the native Catalog. Switching a tab swaps the grid in place; it does not push a new screen. The promo rails reappear as their own stacked sections lower down.</p>
      <FrameRow>
        <FrameCell caption="<b>Mobile-web.</b> Categories as a scrollable tab strip + a 2-up tile grid, mirroring the app Catalog.">
          <MobileWeb url="autodoc.ex/catalog" navActive="Catalog">
            <MobileCatalogTabs />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One entry, not a parallel nav.</b> The mega-menu and the collections strip are the only two routes into the catalogue; don't invent a third.",
        "<b>The grid is vehicle-scoped.</b> Tiles read 'for your BMW 320d' and show only fitting categories — the active car reaches into navigation.",
        "<b>Side rail (desktop) becomes tabs (mobile-web),</b> not a drilled list. Switching swaps the grid in place.",
        "<b>Promo rails ride along,</b> they never replace the category tree.",
      ]}/>

      <DoDont
        doItem="Open the whole tree from 'Catalog' on desktop and fall back to category tabs on mobile-web, scoping the grid to the active vehicle."
        dontItem="Don't bury categories behind a drilled list on mobile, and don't let DEALS or SHOP BY BRAND stand in for the category tree."
      />

    </Section>
  );
}
window.PatMegaMenu = PatMegaMenu;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Search  (the header field expands; there is NO second input)
// ════════════════════════════════════════════════════════════════════════
// ── Search content atoms (shared desktop dropdown + mobile overlay) ─────────
function HLQuery({ text, n = 3 }) {
  return <span><b style={{ background: "#ffe9df", color: "#111", fontWeight: 700 }}>{text.slice(0, n)}</b>{text.slice(n)}</span>;
}

// "Search 'x' — matched to your selected car" escape-hatch row (orange magnifier).
function SearchInRow({ value = "dis" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f7f6f4", borderRadius: 10, padding: "10px 12px", fontFamily: "-apple-system, sans-serif" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="#ff5a1f" strokeWidth="2"/><path d="M16 16l5 5" stroke="#ff5a1f" strokeWidth="2" strokeLinecap="round"/></svg>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>Search &ldquo;{value}&rdquo; — matched to your selected car</span>
    </div>
  );
}

// One grouped result row: leading icon (thumb / grid / cart) · highlighted label · tag.
function SearchResultRow({ kind = "part", label, tag }) {
  const lead = kind === "kit"
    ? (<span style={{ width: 30, height: 30, borderRadius: 7, background: "#f1f0ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>{[0, 1, 2, 3].map((i) => <span key={i} style={{ width: 4, height: 4, background: "#111", borderRadius: 1 }} />)}</span>
      </span>)
    : kind === "bundle"
    ? (<span style={{ width: 30, height: 30, borderRadius: 7, background: "#f1f0ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.4 12h10l1.6-8H6" stroke="#9a9a9a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.3" fill="#9a9a9a"/><circle cx="17" cy="20" r="1.3" fill="#9a9a9a"/></svg>
      </span>)
    : <Thumb w={30} h={30} />;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 2px", fontFamily: "-apple-system, sans-serif" }}>
      {lead}
      <span style={{ flex: 1, fontSize: 11, color: "#2a2a2a", minWidth: 0 }}><HLQuery text={label} /></span>
      <Pill tone="line">{tag}</Pill>
    </div>
  );
}

// Typed state content (shared) — escape-hatch row + Parts / Kits / Bundles.
function SearchTypedContent() {
  const Group = ({ title, children }) => (
    <div>
      <div style={{ fontSize: 8.5, fontWeight: 700, color: "#9a9a9a", letterSpacing: "0.1em", padding: "10px 2px 2px", fontFamily: "-apple-system, sans-serif" }}>{title}</div>
      {children}
    </div>
  );
  return (
    <div>
      <SearchInRow value="dis" />
      <Group title="PARTS"><SearchResultRow kind="part" label="Disc Brake Pads" tag="Brakes" /></Group>
      <Group title="KITS"><SearchResultRow kind="kit" label="Disc Brake Pads service kit" tag="Kit" /></Group>
      <Group title="BUNDLES"><SearchResultRow kind="bundle" label="Disc Brake Pads + fitting bundle" tag="Bundle" /></Group>
    </div>
  );
}

// Search history chips + Clear all (shared).
function SearchHistory() {
  const items = ["brake pads", "5W-30 oil", "bosch wiper blade", "cabin air filter", "ngk spark plug", "led headlight", "shock absorber", "timing belt kit"];
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>Search history</span>
        <span style={{ fontSize: 9.5, color: "#ff5a1f", fontWeight: 700 }}>Clear all</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {items.map((s) => (
          <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 999, background: "#f7f6f4", border: "1px solid #ececec", fontSize: 9.5, color: "#2a2a2a" }}>
            {s}<span style={{ color: "#9a9a9a" }}>×</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Recommended tile grid with ‹ › slider nav (shared).
function RecommendedRail({ cols = 5, rows = 2 }) {
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>Recommended</span>
        <SliderNav />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div style={{ width: "100%", background: "#f7f6f4", borderRadius: 8, padding: 6 }}><Thumb h={36} /></div>
            <Skel w="72%" h={6} bg="#d8d8d8" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Desktop dropdown panels (popover under the expanded header field).
function SearchEmptyPanel() {
  return (
    <div style={{ background: "#fff", border: "1px solid #d8d8d8", borderRadius: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.14)", padding: 14 }}>
      <SearchHistory />
      <div style={{ borderTop: "1px solid #ececec", margin: "12px 0" }} />
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ width: 120, flexShrink: 0, fontFamily: "-apple-system, sans-serif" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#111", marginBottom: 6 }}>Discover more</div>
          {["Brake discs", "Oil filter", "Wiper blades", "Spark plugs", "Shock absorbers", "Car battery", "Headlight bulbs"].map((d) => (
            <div key={d} style={{ padding: "5px 0", fontSize: 10, color: "#6b6b6b" }}>{d}</div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}><RecommendedRail cols={5} rows={2} /></div>
      </div>
    </div>
  );
}

function SearchTypingPanel() {
  return (
    <div style={{ background: "#fff", border: "1px solid #d8d8d8", borderRadius: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.14)", padding: 14 }}>
      <SearchTypedContent />
    </div>
  );
}

function PatSearch() {
  return (
    <Section id="p-search">
      <PatternHead category="Navigation" title="Search"
        lede="Search is the main tool through a large catalogue. On desktop, focusing the header field grows it over the utility icons up to the basket and drops a panel beneath it; on mobile-web it opens as a full-screen sheet with a Cancel — the heavy, full-focus end of the modal-to-sheet surface, dismissible and committing nothing. Empty shows history, Discover more, and a recommended rail; from the first character it switches to live grouped suggestions, fitment-scoped to the active car." />

      <Callout label="Autodoc reading">
        On the app, search is a full-screen corridor. The web has no corridor, so search is an <b>overlay</b>: on desktop the header field grows over the utility icons up to the basket and drops a dropdown over the dimmed page; on mobile-web it opens as a <b>full-screen sheet</b> — the heavy, full-focus end of the modal-to-sheet surface — with a Cancel. The sheet <b>covers</b> the bottom nav (it never removes the shell), the field is never duplicated, and search is read-only — closing it preserves scroll.
      </Callout>

      <H3>Empty &amp; focused — history + discovery</H3>
      <p>Before a keystroke the panel offers <b>search history</b> chips (each removable, with <i>Clear all</i>), a <b>Discover more</b> quick-link list, and a <b>Recommended</b> rail. There is never a blank panel and a blinking cursor.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> The header field grows over the utility icons up to the basket and drops a panel: history · Discover more · Recommended.">
          <Browser url="autodoc.ex" h={430}>
            <HeaderSpine searchFocused />
            <div style={{ position: "relative" }}>
              <div style={{ padding: 10 }}><Region label="Page (dimmed)" h={370} /></div>
              <div style={{ position: "absolute", left: 130, right: 110, top: 6 }}><SearchEmptyPanel /></div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> A full-screen sheet that covers the whole shell (header + nav), with a clear × and Cancel — dismissible. History · Recommended below.">
          <MobileWeb url="autodoc.ex/search" navActive="Catalog" overlay={
            <SearchOverlay>
              <div style={{ padding: 12, overflow: "hidden" }}>
                <SearchHistory />
                <div style={{ borderTop: "1px solid #ececec", margin: "12px 0" }} />
                <RecommendedRail cols={3} rows={2} />
              </div>
            </SearchOverlay>
          }>
            <div style={{ padding: 8 }}><Region label="Page behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Typing — grouped suggestions</H3>
      <p>From the first character the panel becomes <b>live grouped suggestions</b>: matched text highlighted, results split into <b>Parts</b> (with a category tag), <b>Kits</b>, and <b>Bundles</b>, with a pinned &quot;Search &lsquo;…&rsquo; — matched to your selected car&quot; row on top as the escape hatch to the full result list.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> The expanded field's dropdown now shows grouped Parts / Kits / Bundles with highlighted matches.">
          <Browser url="autodoc.ex/search?q=dis" h={430}>
            <HeaderSpine searchFocused searchValue="dis" />
            <div style={{ position: "relative" }}>
              <div style={{ padding: 10 }}><Region label="Page (dimmed)" h={370} /></div>
              <div style={{ position: "absolute", left: 130, right: 110, top: 6 }}><SearchTypingPanel /></div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same full-screen sheet; grouped results with the escape-hatch row pinned on top.">
          <MobileWeb url="autodoc.ex/search?q=dis" navActive="Catalog" overlay={
            <SearchOverlay value="dis">
              <div style={{ padding: 12, overflow: "hidden" }}><SearchTypedContent /></div>
            </SearchOverlay>
          }>
            <div style={{ padding: 8 }}><Region label="Page behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One field only.</b> The header search expands on focus — never render a second input inside the panel.",
        "<b>Never blank.</b> Empty → history, Discover more, Recommended. Typing → grouped suggestions with category tags.",
        "<b>Fitment-scoped.</b> The commit row reads 'matched to your selected car'; results respect the active vehicle.",
        "<b>Read-only.</b> Nothing commits inside search; click-away closes it and the page keeps its scroll.",
      ]}/>

      <DoDont
        doItem="Expand the existing header field and seed the panel with history, discovery, and recommendations; switch to grouped suggestions on the first character."
        dontItem="Don't spawn a separate search input, and don't drop the user onto a raw result page before they've typed."
      />

    </Section>
  );
}
window.PatSearch = PatSearch;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · List filtering  (in-place narrowing, not a destination)
// ════════════════════════════════════════════════════════════════════════
// Searchable large-list content (shared desktop panel + mobile full-screen):
// a search field + a scrollable list. Schematic and generic — it shows the
// filtering capability, not what is being filtered. Mirrors the app's List
// Filtering.
function ListFilterContent() {
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f7f6f4", borderRadius: 8, padding: "8px 10px", border: "1px solid #ececec", flexShrink: 0, marginBottom: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="#9a9a9a" strokeWidth="2"/><path d="M16 16l4 4" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round"/></svg>
        <span style={{ flex: 1 }}><Skel w={46} h={7} bg="#9a9a9a" /></span>
        <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#9a9a9a", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</span>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ padding: "10px 2px", borderBottom: "1px solid #f1f0ed" }}>
            <Skel w={62 + (i % 3) * 18} h={7} bg="#d8d8d8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PatListFilter() {
  return (
    <Section id="p-listfilter">
      <PatternHead category="Navigation" title="List filtering"
        lede="Narrowing a large flat list down to one choice — a brand, a category, an address among hundreds. A search field sits above a scrollable list and filters it live, the matched text highlighted. On desktop it is a side panel beside the results; on mobile-web it is a full-screen list, the app's form." />

      <Callout label="Autodoc reading">
        This is neither global <b>Search</b> (which queries the whole catalogue and leaves the page) nor the faceted <b>Filters</b> (checkboxes and attributes). It is the in-list search for one item among a long, flat set — the app's List-Filtering screen. The web keeps it on a desktop right-side panel where there is room, and falls back to the app's full-screen list on mobile-web.
      </Callout>

      <H3>Search field over a scrollable list</H3>
      <p>The field filters the list live; matching rows stay with the typed text <b>highlighted</b>, the rest collapse away, and a count shows how many remain of the full set. Picking a row commits the choice. On desktop the panel sits <b>beside</b> the results; on mobile-web it takes the whole screen with a back affordance.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A side panel beside the results: search field + scrollable list, matches highlighted, live count.">
          <Browser url="autodoc.ex/catalog/roof-racks" h={380}>
            <HeaderSpine />
            <div style={{ padding: 12, display: "flex", gap: 12 }}>
              <div style={{ width: 180, flexShrink: 0, border: "1px solid #d8d8d8", borderRadius: 10, padding: 12, background: "#fff", height: 300, display: "flex", flexDirection: "column" }}>
                <ListFilterContent />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}><Region label="Results" sub="narrowed by the picked value" h={300} /></div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The full-screen list — the app's form — with a back affordance, search field, and the highlighted matches.">
          <MobileWeb url="autodoc.ex/select" header={false} nav={false}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "-apple-system, sans-serif", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: "1px solid #ececec", flexShrink: 0 }}>
                <span style={{ fontSize: 18, lineHeight: 1, color: "#111" }}>‹</span>
                <Skel w={90} h={9} />
              </div>
              <div style={{ flex: 1, padding: 12, overflow: "hidden" }}><ListFilterContent /></div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One large flat list.</b> Brands, categories, addresses, garage cars — a long set you pick one from, not a faceted attribute filter.",
        "<b>Search narrows live.</b> Rows filter as the user types, with the matched text highlighted and a count of how many remain.",
        "<b>Side panel ↔ full screen.</b> Desktop keeps it in a panel beside the results; mobile-web gives it the whole screen, the app's form.",
        "<b>Picking commits.</b> Selecting a row applies the choice and returns; a no-match shows a small inline line, never a full empty screen.",
      ]}/>

      <DoDont
        doItem="Use it to pick one item from a long flat list, filtering live with the match highlighted; keep it a side panel on desktop and a full screen on mobile-web."
        dontItem="Don't confuse it with global Search or the faceted Filters, and don't use it for short lists that need no search at all."
      />

    </Section>
  );
}
window.PatListFilter = PatListFilter;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Breadcrumb & back
// ════════════════════════════════════════════════════════════════════════
function PatBreadcrumb() {
  return (
    <Section id="p-breadcrumb">
      <PatternHead category="Navigation" title="Breadcrumb"
        lede="Deep pages need a trail home. On desktop the full breadcrumb shows every level as a link so any of them is one click away; on mobile-web it folds to a single back-arrow and the current page — one big, familiar tap target, one level up. It mirrors the address-bar path — the trail and the URL tell the same story." />

      <Callout label="Autodoc reading">
        The app keeps its place with a bottom tab bar and a navigation stack; <b>‹</b> walks back through the stack. The web keeps its place with the URL and a breadcrumb that mirrors the path taken through the mega-menu or search. On a small screen there's no room for the whole trail — and a row of tiny links is impossible to thumb — so it folds to the familiar mobile move: a single <b>‹</b> up one level plus the current page title.
      </Callout>

      <H3>Full trail ↔ back-arrow</H3>
      <p>On desktop every level is a link, separated, with the <b>current page muted and non-clickable</b> at the end; it sits under the header and reflects the exact path taken. On mobile-web it folds to a <b>back-arrow plus the current page title</b> — a single big tap target that climbs <b>one level</b> to the parent. Deeper jumps are the desktop trail's job (and the browser back button's); a phone doesn't try to spell out the whole path.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> The full breadcrumb under the header: Home · Link 1–4 · current page, every level a link.">
          <Browser url="autodoc.ex/catalog/link-4/current">
            <HeaderSpine />
            <div style={{ padding: 12 }}>
              <div style={{ marginBottom: 12 }}><Breadcrumb /></div>
              <Region label="Web content" h={300} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The trail folds to a back-arrow and the current page — one big tap target, one level up.">
          <MobileWeb url="autodoc.ex/catalog/link-4/current" navActive="Catalog">
            <div style={{ padding: 10 }}>
              <div style={{ marginBottom: 10 }}><Breadcrumb back /></div>
              <Region label="Web content" h={340} />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Full trail on desktop.</b> Every level is a link, separated; the current page is muted and non-clickable.",
        "<b>Folds to a back-arrow on mobile-web.</b> A single ‹ to the parent plus the current page title — one big, familiar tap target, not a row of tiny links.",
        "<b>Up one level; browser-back for the rest.</b> The arrow climbs one level; deeper or arbitrary jumps are the desktop trail's job.",
        "<b>Mirrors the URL path.</b> The trail reflects the route actually taken (<code>/catalog/category/product</code>) — the same story as the address bar.",
      ]}/>

      <DoDont
        doItem="Show the full trail on desktop; on mobile-web fold it to a back-arrow plus the current page, climbing one level. Keep the current page muted and non-clickable on desktop."
        dontItem="Don't strand the user deep in the tree with no way up, don't render a row of tiny breadcrumb links on a phone, and don't render a trail that doesn't match the path actually taken."
      />

    </Section>
  );
}
window.PatBreadcrumb = PatBreadcrumb;
