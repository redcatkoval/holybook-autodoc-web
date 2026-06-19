// Part II · Controls — six separate patterns, mirroring the app book's
// "Controls" group: Action hierarchy, Dropdowns, Filters, Accordion,
// Quantity stepper, Step indicators. Each is its own Section. Generic
// content only — a dropdown is a dropdown, not "the cart".

// ── shared bits ───────────────────────────────────────────────────────────
// `open` accepts an index (single-open) or an array (multiple-open).
// `trigger`: "chevron" (default) or "text" (Show more / Show less).
function Accordion({ rows = ["Section one", "Section two", "Section three"], open = 0, trigger = "chevron" }) {
  const openSet = Array.isArray(open) ? open : [open];
  const isOpen = (i) => openSet.includes(i);
  return (
    <div style={{ border: "1px solid #ececec", borderRadius: 8, overflow: "hidden", fontFamily: "-apple-system, sans-serif" }}>
      {rows.map((r, i) => (
        <div key={r} style={{ borderTop: i ? "1px solid #ececec" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: isOpen(i) ? "#f7f6f4" : "#fff" }}>
            <Skel w={[110, 80, 130][i % 3]} h={8} />
            {trigger === "text"
              ? <span style={{ fontSize: 10, fontWeight: 600, color: "#6b6b6b" }}>{isOpen(i) ? "Show less ‹" : "Show more ›"}</span>
              : <span style={{ fontSize: 13, color: "#9a9a9a", display: "inline-block", transform: isOpen(i) ? "rotate(180deg)" : "none" }}>⌄</span>}
          </div>
          {isOpen(i) && <div style={{ padding: "0 12px 12px" }}><Skel w="90%" h={7} /><div style={{ height: 5 }} /><Skel w="75%" h={7} /></div>}
        </div>
      ))}
    </div>
  );
}

// Anchored choice menu. As a card (desktop popover) or `flat` (rows only, for
// the mobile action sheet — no nested card). Current choice marked in ink.
// `multi` swaps the right-side tick for left checkboxes; `confirm` adds a
// primary Confirm at the foot (multi-select applies nothing until it's tapped).
function MenuDropdown({ items = ["Sort: Relevance", "Sort: Price ↑", "Sort: Price ↓", "Sort: Rating"], active = 0, flat = false, multi = false, selected = [0, 2], confirm = false }) {
  const on = (i) => (multi ? selected.includes(i) : i === active);
  return (
    <div style={{ width: flat ? "100%" : 200, background: flat ? "transparent" : "#fff", border: flat ? "none" : "1px solid #d8d8d8", borderRadius: flat ? 0 : 10, boxShadow: flat ? "none" : "0 14px 34px rgba(0,0,0,0.14)", padding: flat ? 0 : 4, fontFamily: "-apple-system, sans-serif", zIndex: 5 }}>
      {items.map((it, i) => (
        <div key={it} style={{ display: "flex", alignItems: "center", gap: 9, padding: flat ? "13px 2px" : "8px 10px", borderRadius: flat ? 0 : 6, fontSize: flat ? 13 : 10.5, color: "#111", fontWeight: on(i) ? 700 : 500, background: on(i) && !multi && !flat ? "#f7f6f4" : "transparent", borderBottom: flat && i < items.length - 1 ? "1px solid #ececec" : "none" }}>
          {multi && <span style={{ width: 15, height: 15, borderRadius: 4, border: "1.5px solid " + (on(i) ? "#111" : "#9a9a9a"), background: on(i) ? "#111" : "transparent", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{on(i) && "✓"}</span>}
          <span style={{ flex: 1 }}>{it}</span>
          {!multi && on(i) && <span style={{ color: "#111" }}>✓</span>}
        </div>
      ))}
      {confirm && <div style={{ padding: flat ? "12px 2px 2px" : "8px 6px 2px" }}><Btn tone="primary" block size={flat ? "md" : "sm"}>Confirm</Btn></div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Action hierarchy  (one primary per surface)
// ════════════════════════════════════════════════════════════════════════
function PatButtons() {
  return (
    <Section id="p-buttons">
      <PatternHead category="Controls" title="Action hierarchy"
        lede="Every surface is built around a single verb — the one action that closes the flow — and every other clickable thing exists in service of that verb, never in competition with it. A small set of roles covers everything the user can click or tap." />

      <Callout label="Autodoc reading">
        The app orders actions by <b>weight, not colour</b> — one strong primary, quieter alternatives, the quietest text, links kept apart — and the web keeps that hierarchy exactly: the same buttons, the same UI font, one primary per surface. The orange accent isn't a level in the hierarchy; it's <b>reserved for the single buy/commit verb</b> (Add to cart, Checkout). Promoting a second button to make it 'pop' is how a surface loses its point.</Callout>

      <H3>Four roles</H3>
      <p>One hierarchy, four roles — like the toast strip, each is the same component dressed for its job.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "16px 0 8px" }}>
        {[
          [<Btn tone="primary">Continue</Btn>, "Primary — the verb of the surface; exactly one, the reason it exists."],
          [<Btn tone="secondary">Compare</Btn>, "Secondary — a bordered alternative; lives inside a block that owns its task, not beside the primary."],
          [<Btn tone="ghost" style={{ color: "#6b6b6b" }}>Cancel</Btn>, "Tertiary — a plain-text button: the quiet way out beneath the primary."],
          [<span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 13, color: "#111", textDecoration: "underline", textUnderlineOffset: 2 }}>Terms &amp; privacy</span>, "Link — not an action; it opens content. Styled apart from a button so it reads 'goes somewhere'."],
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 150, flexShrink: 0 }}>{row[0]}</div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5, color: "#6b6b6b", lineHeight: 1.4 }}>{row[1]}</span>
          </div>
        ))}
      </div>

      <Rules items={[
        "<b>Primary — the verb.</b> One per surface, the reason it exists; while it's anchored, nothing of equal weight stands next to it.",
        "<b>Secondary — inside its own block.</b> A reasonable alternative that lives in a block carrying its own task (a card, a section); never beside the primary in one action area, where it reads as a second main verb.",
        "<b>Tertiary — one quiet way out.</b> A subordinate path beneath the primary: a button by role, the quietest by look. Use it when the surface offers one main verb and one quiet exit.",
        "<b>A link is not an action.</b> Links open content (Terms, Privacy, Help) and stay distinct from buttons, so the user reads 'goes somewhere', not 'does something'.",
      ]}/>

      <H3>How not to do it</H3>
      <p>Three ways the hierarchy collapses: pairing the primary with a heavy second button in the same action area, stacking too many weights together, and shipping two equal-weight verbs on one surface.</p>
      <div className="frames-row" style={{ flexWrap: "nowrap" }}>
        <FrameCell caption="<b>Heavy secondary beside the primary.</b> A second strong button reads as a rival verb. Demote it to a tertiary text button, or move it into the header.">
          <MobileWeb url="autodoc.ex/surface" header={false} nav={false}>
            <div style={{ padding: 10 }}><Region label="Surface" h={440} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "12px 14px", borderTop: "1px solid #ececec", background: "#fff", display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}><Btn tone="primary" block>Save</Btn></div>
              <div style={{ flex: 1 }}><Btn tone="secondary" block>Cancel</Btn></div>
            </div>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", pointerEvents: "none" }} />
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Three weights in one place.</b> Primary + secondary + tertiary together loads the action area with decisions and dilutes the verb. Cut to two.">
          <MobileWeb url="autodoc.ex/surface" header={false} nav={false}>
            <div style={{ padding: 10 }}><Region label="Surface" h={380} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "12px 14px", borderTop: "1px solid #ececec", background: "#fff", display: "flex", flexDirection: "column", gap: 8 }}>
              <Btn tone="primary" block>Confirm</Btn>
              <Btn tone="secondary" block>Edit</Btn>
              <div style={{ textAlign: "center" }}><Btn tone="ghost" style={{ color: "#6b6b6b" }}>Cancel</Btn></div>
            </div>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", pointerEvents: "none" }} />
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Two competing primaries.</b> Two equal-weight verbs split attention; neither reads as primary. Pick one verb, demote the other.">
          <MobileWeb url="autodoc.ex/surface" header={false} nav={false}>
            <div style={{ padding: 10 }}><Region label="Surface" h={440} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "12px 14px", borderTop: "1px solid #ececec", background: "#fff", display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}><Btn tone="primary" block>Save</Btn></div>
              <div style={{ flex: 1 }}><Btn tone="primary" block>Publish</Btn></div>
            </div>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #c62828", pointerEvents: "none" }} />
          </MobileWeb>
        </FrameCell>
      </div>

      <DoDont
        doItem="Pick one verb per surface, anchor it as the primary, and offer at most one quiet tertiary beside it. Keep alternatives inside their own block."
        dontItem="Don't pair the primary with a heavy secondary in one action area, don't stack three weights together, don't ship two equal-weight primaries on a surface, and don't promote a block-level action to primary when the surface already carries one."
      />

    </Section>
  );
}
window.PatButtons = PatButtons;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Dropdowns  (anchored menu of choices — generic, not "the cart")
// ════════════════════════════════════════════════════════════════════════
function PatDropdown() {
  return (
    <Section id="p-dropdown">
      <PatternHead category="Controls" title="Dropdowns"
        lede="A lightweight menu that hangs off the control that opened it and closes on outside-click. It's the web's pop-up button: a compact list of choices or actions, anchored to its trigger, dismissed by clicking away. A single choice applies and closes; a multi-select carries one Confirm at the foot; a long list gains a search field at its top. On mobile-web the same set of choices becomes an action sheet." />

      <Callout label="Autodoc reading">
        The app's pop-up buttons open a short menu in place. On the web the dropdown does the same — and crucially it's a generic control, not a feature. A sort menu, a row's actions, an account menu and a basket preview all use the one dropdown pattern; none of them <i>is</i> the pattern. Not every dropdown is a bottom-nav destination, and we never describe the control as 'the cart' or 'the garage'.</Callout>

      <H3>Anchored menu, outside-click to close</H3>
      <p>The dropdown opens directly beneath its trigger, shows a tight list of choices or actions, and marks the current selection where one exists. It dismisses on outside-click — it never blocks the page.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A menu anchored under its trigger; the current choice is marked.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ padding: 14, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #d8d8d8", borderRadius: 8, padding: "6px 10px", fontFamily: "-apple-system, sans-serif", fontSize: 10.5, fontWeight: 700, color: "#111" }}>Sort: Relevance <span style={{ color: "#9a9a9a" }}>▾</span></span>
              </div>
              <div style={{ position: "absolute", right: 14, top: 44 }}><MenuDropdown /></div>
              <Region label="List behind" h={340} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> A single choice arrives as an action sheet and applies on tap.">
          <MobileWeb url="autodoc.ex/list" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="List behind" h={360} /></div>
            <MobileDrawer title="Sort by" height="48%" hideClose>
              <MenuDropdown flat />
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Anchored, not blocking.</b> A dropdown hangs off its trigger and closes on outside-click.",
        "<b>Generic control.</b> Sort, row actions, account, a basket preview — all one pattern; none is 'the' dropdown.",
        "<b>Mark the current choice</b> in ink when the menu represents a selection.",
        "<b>Single applies, multi confirms.</b> A single choice applies on click and closes; a checkbox multi-select keeps one primary Confirm at the foot, and dismissing without it applies nothing.",
        "<b>Long lists get a search field.</b> Past ~20 options add a search field at the top of the menu so the user filters instead of scrolling a long list.",
        "<b>Mobile fallback is the action sheet,</b> the same choices raised from the bottom.",
      ]}/>

      <DoDont
        doItem="Use a dropdown for a compact, anchored list of choices or actions, mark the current selection in ink, give a multi-select one Confirm, and fall back to an action sheet on mobile."
        dontItem="Don't treat any one dropdown as a bottom-nav destination, don't apply a multi-select before Confirm, and don't pour a long list into a tiny menu when an in-menu search belongs."
      />

    </Section>
  );
}
window.PatDropdown = PatDropdown;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Filters  (sidebar on desktop ↔ sheet on mobile)
// ════════════════════════════════════════════════════════════════════════
function PatFilters() {
  return (
    <Section id="p-filters">
      <PatternHead category="Controls" title="Filters"
        lede="The controls that narrow a result set. On desktop they sit in a persistent left sidebar beside a toolbar — title, result count, sort and view — over the results. On mobile-web they collapse into a full-screen sheet opened from a filters icon; sort becomes its own icon, and the «fits my car» toggle lifts out under the title. Filter values are schematic placeholders here, as in the app." />

      <Callout label="Autodoc reading">
        The app puts filtering in a full-screen corridor; the web keeps that on mobile as a <b>full-screen sheet</b> — it covers the shell, dismisses with back, and commits nothing until «Show results» applies and closes. On desktop the sidebar is persistent, no overlay. Fitment-aware sections carry a quiet «For your car» hint that is informational, not enforced — any value stays pickable. «Show results» is filled black; the orange accent stays reserved for buying.</Callout>

      <H3>Desktop — sidebar · toolbar · results</H3>
      <p>A persistent left sidebar holds the filter sections. Above the results a toolbar carries the category title and result count on the left, and sort + a small view selector on the right — both dropdowns, not icons. The «fits my car» toggle rides above the sidebar.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Left: the filter sidebar with the «fits my car» toggle on top. Right: toolbar (title · results · sort · view) over the results area — product cards aren't shown here.">
          <Browser url="autodoc.ex/catalog/brake-discs">
            <HeaderSpine />
            <CollectionsStrip />
            <FiltersDesktop />
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>Mobile — a full-screen filter sheet</H3>
      <p>The catalog bar keeps the title, result count, a <b>sort icon</b> and a <b>filters icon</b>, with the green «fits my car» toggle lifted out under them. The filters icon opens a full-screen sheet — header (‹ · Filters · Clear all), the active-filter chips, the sections, and a sticky «Show results (N)». Tapping sort opens its own bottom sheet.</p>
      <FrameRow>
        <FrameCell caption="<b>Mobile-web — the catalog bar.</b> Title · results, a sort icon and a filters icon; the «fits my car» toggle sits under them.">
          <MobileWeb url="autodoc.ex/catalog/brake-discs" navActive="Catalog">
            <FiltersMobileBar />
            <div style={{ padding: "0 12px" }}><Region label="Results area" sub="no cards shown" h={300} /></div>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — the filter sheet.</b> Full-screen: header, active chips, sections (a «For your car» hint where it applies), and a sticky «Show results».">
          <MobileWeb url="autodoc.ex/catalog/brake-discs" navActive="Catalog" overlay={<FilterSheet />}>
            <div style={{ padding: 12 }}><Region label="Catalog behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Desktop sidebar, mobile sheet.</b> A persistent left sidebar on desktop; a full-screen sheet on mobile-web that covers the shell, dismisses with back, and commits nothing until applied.",
        "<b>Sort &amp; view are dropdowns on desktop.</b> Small selectors, never grid/list icons; on mobile sort becomes an icon that opens a bottom sheet.",
        "<b>The «fits my car» toggle is a scope, not a filter section.</b> It rides above the sidebar on desktop and under the title on mobile.",
        "<b>Fitment is a hint, not a lock.</b> A «For your car» chip marks the matching value; any value stays pickable.",
        "<b>«Show results» is black, not orange.</b> Applying filters is navigation, not a buy — the accent stays reserved.",
      ]}/>

    </Section>
  );
}
window.PatFilters = PatFilters;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Accordion  (progressive disclosure)
// ════════════════════════════════════════════════════════════════════════
function PatAccordion() {
  return (
    <Section id="p-accordion">
      <PatternHead category="Controls" title="Accordion"
        lede="A row that expands to show its content when clicked and collapses when clicked again. Used for grouped secondary content where any single item is worth reading but showing all at once would overwhelm — specs, compatibility, warranty, settings, FAQ. Two modes and two trigger styles, picked by the content." />

      <Callout label="Autodoc reading">
        The app uses disclosure rows to keep dense detail tidy; the web accordion is the same control on a wider canvas. It's for <b>secondary</b> content the user may want — never primary navigation or a required step. Open sections reveal inline; the page reflows, it never jumps to a new place to show a fold.</Callout>

      <H3>Two modes</H3>
      <p>Same row shape, different toggle behaviour — pick by whether the user wants to compare sections side by side or focus on one at a time. The two trigger styles (a <b>chevron</b> or a «Show more» <b>text button</b>) ride either mode; one of each is shown below. The control is identical on both breakpoints, full-width on the smaller screen.</p>
      <FrameRow>
        <FrameCell caption="<b>Multiple-open (default) · chevron.</b> Each row is independent — opening one doesn't collapse another. For complementary sections (specs, warranty, fitment) the user might compare with each other open. The chevron is the compact trigger.">
          <Browser url="autodoc.ex/detail">
            <HeaderSpine />
            <div style={{ padding: 16 }}><Accordion open={[0, 1]} rows={["a", "b", "c"]} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The identical multiple-open accordion, full-width.">
          <MobileWeb url="autodoc.ex/detail" navActive="Catalog">
            <div style={{ padding: 10 }}><Accordion open={[0, 1]} rows={["a", "b", "c"]} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Single-open · text button.</b> Only one row open at a time — opening another collapses the previous. For FAQ-style lists where sections compete. Here the trigger is a «Show more / Show less» text button, for rows whose body is long-form copy.">
          <Browser url="autodoc.ex/faq">
            <HeaderSpine />
            <div style={{ padding: 16 }}><Accordion open={1} trigger="text" rows={["a", "b", "c"]} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same single-open, text-button accordion, full-width.">
          <MobileWeb url="autodoc.ex/faq" navActive="Catalog">
            <div style={{ padding: 10 }}><Accordion open={1} trigger="text" rows={["a", "b", "c"]} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Whole row is the click target.</b> Not just the trigger on the right — the full header row, edge to edge.",
        "<b>Smooth expand and collapse.</b> Content slides in, never jumps; the page reflows and rows below move down.",
        "<b>Multiple-open by default.</b> Single-open is opt-in — pick it only when rows compete for attention (FAQ).",
        "<b>Two trigger styles, pick by content.</b> Chevron for compact toggle-of-section rows; a text button for rows whose body is long-form copy the user has to decide whether to read.",
        "<b>No deep nesting.</b> An accordion inside an accordion is almost always wrong — two levels at most, and only with good reason.",
        "<b>Scroll position survives the toggle.</b> Expanding a row above the fold doesn't shove other content out of view.",
      ]}/>

      <DoDont
        doItem="Fold optional depth — warranty, returns, compatibility — into an accordion that opens in place. The user scrolls past when uninterested and opens one with a single click when they care."
        dontItem="Don't hide essential information — price, fitment status, the primary CTA — inside a fold; if the user needs it to decide, inline it. And don't nest accordions deep."
      />

    </Section>
  );
}
window.PatAccordion = PatAccordion;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Quantity stepper
// ════════════════════════════════════════════════════════════════════════
// A product line — thumbnail + title/price placeholders + a stepper, with
// optional overflow ⋮ (checkout delete affordance).
function StepperRow({ qty = 1, trash = false, minusDisabled = false, plusDisabled = false, overflow = false, top = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: top ? "1px solid #ececec" : "none", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ width: 46, height: 46, borderRadius: 8, background: "#ececec", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#b8b8b8", fontSize: 18 }}>▱</div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <Skel w="72%" h={8} /><Skel w="32%" h={9} />
      </div>
      <QtyStepper n={qty} trash={trash} minusDisabled={minusDisabled} plusDisabled={plusDisabled} />
      {overflow && <span style={{ fontSize: 16, color: "#9a9a9a", padding: "0 2px", letterSpacing: "0.5px" }}>⋮</span>}
    </div>
  );
}

function PatStepper() {
  return (
    <Section id="p-stepper">
      <PatternHead category="Not ready" title="Quantity stepper"
        lede="One small control — minus · number · plus — with three behaviours at the lower boundary, picked by where it sits. The shape stays the same everywhere; on the product page Add to cart swaps into it on first add, the cart row deletes through a trash variant at quantity 1, and the checkout row only disables the minus — there deletion is a separate, confirmed action. Mobile-web mirrors the app; desktop keeps the same control in its surfaces." />

      <Callout label="Autodoc reading">
        The app reuses one stepper across PLP, PDP, Cart and Checkout, changing only what happens at quantity 1. The web keeps that. The shape is a bordered minus · number · plus; the number is editable directly (type on desktop, a numeric keyboard on mobile). The first add raises a single «Item added to cart» toast — later plus / minus taps update silently and the cart badge tracks the total. Cart removal stays reversible (an Undo toast, no confirm dialog); checkout removal is deliberately gated, because the cost of a wrong delete there is the whole session.</Callout>

      <H3>One control, four boundaries</H3>
      <p>The same minus · number · plus appears everywhere; only the quantity-1 boundary changes — default, disabled at the floor, a trash on the cart row, and a disabled plus at the stock limit.</p>
      <FrameRow>
        <FrameCell caption="<b>The control and its boundaries.</b> Default · floor (minus disabled) · cart (minus → trash at 1) · stock limit (plus disabled).">
          <div style={{ padding: 6, display: "flex", gap: 22, alignItems: "center", flexWrap: "nowrap" }}>
            {[
              { label: "Default", p: { n: 2 } },
              { label: "At floor", p: { n: 1 } },
              { label: "Cart · qty 1", p: { n: 1, trash: true } },
              { label: "Stock limit", p: { n: 5, plusDisabled: true } },
            ].map(({ label, p }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <QtyStepper {...p} />
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: "#6b6b6b" }}>{label}</span>
              </div>
            ))}
          </div>
        </FrameCell>
      </FrameRow>

      <H3>Product page — Add to cart becomes the stepper</H3>
      <p>The product page carries a single primary, <b>Add to cart</b>. The first click commits one unit and the button itself swaps into a full-width stepper in the same slot, with a one-time «Item added to cart» toast. On desktop it lives in the buy-box; on mobile-web in the sticky bottom bar.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> The buy-box Add to cart has swapped into a full-width stepper at qty 1; the first-add toast acknowledges once.">
          <Browser url="autodoc.ex/product/ref-11009">
            <HeaderSpine />
            <div style={{ padding: 18, display: "flex", gap: 24, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ width: 240, flexShrink: 0 }}><div style={{ width: 240, height: 240, borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8b8b8", fontSize: 40 }}>▱</div></div>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                <Skel w="62%" h={14} /><Skel w="40%" h={10} />
                <div style={{ height: 8 }} />
                <span style={{ fontSize: 21, fontWeight: 800, color: "#111" }}>18.99&nbsp;€</span>
                <div style={{ height: 4 }} />
                <QtyStepper n={1} block />
              </div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, display: "flex", justifyContent: "center" }}>
              <Toast tone="dark">Item added to cart</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The sticky bottom Add to cart has swapped into a full-width stepper; same one-time toast.">
          <MobileWeb url="autodoc.ex/product/ref-11009" navActive="Catalog">
            <div style={{ padding: 12, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ aspectRatio: "1", borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8b8b8", fontSize: 40 }}>▱</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}><Skel w="78%" h={11} /><Skel w="48%" h={8} /></div>
            </div>
            <div style={{ position: "absolute", left: 10, right: 10, bottom: 74, display: "flex", justifyContent: "center", zIndex: 10 }}>
              <Toast tone="dark">Item added to cart</Toast>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "10px 12px", background: "#fff", borderTop: "1px solid #ececec" }}>
              <QtyStepper n={1} block />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Cart — inline stepper, quantity 1 removes</H3>
      <p>The cart is where editing happens: a stepper on each row. At quantity 1 the minus becomes a trash; tapping it removes the row <b>optimistically</b> with an Undo toast — reversible, so no confirm dialog. At the stock limit the plus is disabled and a toast explains why.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop — cart slide-over.</b> Row 1 at qty 2, row 2 at qty 1 (trash), row 3 at the stock limit (plus disabled). Removing a row floats an Undo toast.">
          <Browser url="autodoc.ex/cart">
            <HeaderSpine />
            <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.4)" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 300, background: "#fff", padding: "16px 18px", fontFamily: "-apple-system, sans-serif", boxShadow: "-12px 0 32px rgba(0,0,0,0.18)" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 4 }}>Cart</div>
              <StepperRow qty={2} top={false} />
              <StepperRow qty={1} trash />
              <StepperRow qty={5} plusDisabled />
            </div>
            <div style={{ position: "absolute", left: 18, bottom: 18, display: "flex" }}>
              <Toast tone="dark" action="Undo">Item removed</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — cart page.</b> The same rows; tapping the disabled plus surfaces «Only 5 left in stock».">
          <MobileWeb url="autodoc.ex/cart" navActive="Cart">
            <div style={{ padding: 12, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 4 }}>Cart</div>
              <StepperRow qty={2} top={false} />
              <StepperRow qty={1} trash />
              <StepperRow qty={5} plusDisabled />
            </div>
            <div style={{ position: "absolute", left: 10, right: 10, bottom: 74, display: "flex", justifyContent: "center", zIndex: 10 }}>
              <Toast tone="dark">Only 5 left in stock</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Checkout — the delete is protected</H3>
      <p>In checkout the cost of a wrong delete is the whole session — address, delivery, payment. So at quantity 1 the minus is just <b>disabled</b>, never a trash; deletion is a separate, confirmed action through the row's overflow ⋮.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop — checkout line items.</b> Steppers on each row; at qty 1 the minus is disabled, and the overflow ⋮ carries the (confirmed) delete.">
          <Browser url="autodoc.ex/checkout" h={300}>
            <HeaderSpine />
            <div style={{ padding: "16px 18px", fontFamily: "-apple-system, sans-serif", maxWidth: 460 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 4 }}>Your items</div>
              <StepperRow qty={2} overflow top={false} />
              <StepperRow qty={1} minusDisabled overflow />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — checkout.</b> Same protection: minus disabled at 1, delete only through the row's ⋮.">
          <MobileWeb url="autodoc.ex/checkout" header={false} nav={false}>
            <div style={{ height: "100%", background: "#fff" }}>
              <CommitHead titleW={80} />
              <div style={{ padding: 12, fontFamily: "-apple-system, sans-serif" }}>
                <StepperRow qty={2} overflow top={false} />
                <StepperRow qty={1} minusDisabled overflow />
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One control, four surfaces.</b> The same minus · number · plus on the catalogue, product page, cart and checkout — only the quantity-1 boundary changes.",
        "<b>Add to cart becomes the stepper.</b> The first add commits one unit and the primary button swaps into a full-width stepper in the same slot.",
        "<b>First-add toast only.</b> «Item added to cart» appears once, on the swap; later plus / minus taps update silently and the cart badge tracks the total.",
        "<b>Cart removal is optimistic + Undo.</b> At quantity 1 the minus becomes a trash; tapping removes the row at once with an Undo toast — reversible, so no confirm dialog.",
        "<b>Checkout removal is gated.</b> The minus disables at 1; deletion is a separate, confirmed action through the row's overflow ⋮ — the path is deliberately longer than in the cart.",
        "<b>Stock limit: plus disabled, a toast explains.</b> Tapping the disabled plus surfaces «Only N left in stock»; no inline hint on the row.",
        "<b>The number is editable.</b> Type directly on desktop, a numeric keyboard on mobile; empty reverts to 1, input above stock clamps to the maximum.",
        "<b>Reflect changes immediately,</b> updating dependent totals optimistically.",
      ]}/>

    </Section>
  );
}
window.PatStepper = PatStepper;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Step indicators  (multi-step progress)
// ════════════════════════════════════════════════════════════════════════
// Minimal commit-page header: a back-arrow + the step's identity (and optional
// right-side counter). The full-page commit drops the shell, so this carries
// orientation the nav usually would.
function CommitHead({ titleW = 90 }) {
  return (
    <div style={{ padding: "13px 14px", borderBottom: "1px solid #ececec", display: "flex", alignItems: "center", gap: 10, fontFamily: "-apple-system, sans-serif" }}>
      <span style={{ fontSize: 18, lineHeight: 1, color: "#111" }}>‹</span>
      <Skel w={titleW} h={10} />
    </div>
  );
}
function Dots({ n = 4, active = 0 }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i === active ? "#111" : "#d8d8d8" }} />
      ))}
    </div>
  );
}
function RadioRow({ on = false, w = 80 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", border: "1px solid " + (on ? "#111" : "#ececec"), borderRadius: 8 }}>
      <span style={{ width: 15, height: 15, borderRadius: "50%", border: "1.5px solid " + (on ? "#111" : "#9a9a9a"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{on && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#111" }} />}</span>
      <Skel w={w} h={8} />
    </div>
  );
}

function PatSteps() {
  return (
    <Section id="p-steps">
      <PatternHead category="Controls" title="Step indicators"
        lede="A step indicator shows where the user is in a multi-step task. Four shapes — a step name in the header, a segmented stepper under it, a thin progress bar, and pagination dots for onboarding sequences. The shape is picked by the host surface and the seriousness of the task; the rules around it (back is non-destructive, one question per step, advance via click or Continue) are the same across all four." />

      <Callout label="Autodoc reading">
        The app marks multi-step flows with a step indicator; the web leans on it harder. The web's one shell-less surface is the <b>full-page commit</b>, so the step indicator carries the orientation the nav usually provides — which step, how many, how far. It lives on that commit surface; routine pages don't get one.</Callout>

      <H3>Three indicator shapes</H3>
      <p>Same shell-less commit, different progress signal — pick by how loudly the step count should speak.</p>
      <FrameRow>
        <FrameCell caption="<b>Step name in the header.</b> The title carries the step's identity — «Address», «Payment». Quietest. Good when each step has a memorable name and the user already knows they're inside a flow.">
          <Browser url="autodoc.ex/checkout">
            <CommitHead />
            <div style={{ padding: 16 }}><Region label="Step body" h={370} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Same step name, shell-less.">
          <MobileWeb url="autodoc.ex/checkout" header={false} nav={false}>
            <CommitHead />
            <div style={{ padding: 12 }}><Region label="Step body" h={420} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Segmented stepper.</b> A short stepper pinned under the header makes the journey explicit — «step 2 of 3». Honest about how much is left.">
          <Browser url="autodoc.ex/add-car">
            <div style={{ padding: "10px 16px 12px", borderBottom: "1px solid #ececec" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontFamily: "-apple-system, sans-serif" }}><span style={{ fontSize: 18, color: "#111" }}>‹</span><Skel w={70} h={10} /></div>
              <StepProgress steps={["Brand", "Model", "Mod"]} active={1} />
            </div>
            <div style={{ padding: 16 }}><Region label="Step body" h={330} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same segmented stepper, full-width.">
          <MobileWeb url="autodoc.ex/add-car" header={false} nav={false}>
            <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid #ececec" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontFamily: "-apple-system, sans-serif" }}><span style={{ fontSize: 18, color: "#111" }}>‹</span><Skel w={70} h={10} /></div>
              <StepProgress steps={["Brand", "Model", "Mod"]} active={1} />
            </div>
            <div style={{ padding: 12 }}><Region label="Step body" h={380} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Thin progress bar.</b> A loader-style line flush under the header, filling as the user advances. Shows direction without exposing the number of steps — for counts that are uneven, unknown, or not worth showing.">
          <Browser url="autodoc.ex/checkout">
            <div style={{ borderBottom: "1px solid #ececec" }}>
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, fontFamily: "-apple-system, sans-serif" }}><span style={{ fontSize: 18, color: "#111" }}>‹</span><Skel w={90} h={10} /></div>
              <div style={{ height: 3, background: "#ececec" }}><div style={{ width: "55%", height: "100%", background: "#111" }} /></div>
            </div>
            <div style={{ padding: 16 }}><Region label="Step body" h={360} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same progress bar under the header.">
          <MobileWeb url="autodoc.ex/checkout" header={false} nav={false}>
            <div style={{ borderBottom: "1px solid #ececec" }}>
              <div style={{ padding: "12px 12px", display: "flex", alignItems: "center", gap: 10, fontFamily: "-apple-system, sans-serif" }}><span style={{ fontSize: 18, color: "#111" }}>‹</span><Skel w={90} h={10} /></div>
              <div style={{ height: 3, background: "#ececec" }}><div style={{ width: "55%", height: "100%", background: "#111" }} /></div>
            </div>
            <div style={{ padding: 12 }}><Region label="Step body" h={410} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Onboarding — pagination dots</H3>
      <p>A different beast — onboarding cards, intro tours, first-run tutorials are <i>reading sequences</i>, not goal-directed work. Showing «3 of 7» would count down the moment the user is allowed to leave; pagination <b>dots</b> mark position softly. Each screen carries its own content, a primary Continue, and a Skip text button as a clear way out.</p>
      <FrameRow>
        <FrameCell caption="<b>Onboarding (desktop).</b> Image, heading, body, a row of dots (one filled), primary Continue, Skip text button beneath.">
          <Browser url="autodoc.ex/welcome">
            <div style={{ padding: "26px 22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: 480, boxSizing: "border-box", fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ width: 150, height: 110, background: "#ececec", borderRadius: 10, marginTop: 24 }} />
              <span style={{ fontSize: 16, fontWeight: 800, color: "#111", marginTop: 18 }}>Find parts that fit</span>
              <div style={{ marginTop: 8 }}><Skel w={220} h={7} /><div style={{ height: 5 }} /><Skel w={170} h={7} /></div>
              <div style={{ marginTop: 16 }}><Dots n={4} active={0} /></div>
              <div style={{ flex: 1 }} />
              <div style={{ width: 280 }}><Btn tone="primary" block>Continue</Btn></div>
              <span style={{ marginTop: 10, fontSize: 11, color: "#6b6b6b" }}>Skip</span>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same onboarding card, CTA full-width.">
          <MobileWeb url="autodoc.ex/welcome" header={false} nav={false}>
            <div style={{ padding: "22px 18px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%", boxSizing: "border-box", fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ width: 120, height: 90, background: "#ececec", borderRadius: 10, marginTop: 20 }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#111", marginTop: 16 }}>Find parts that fit</span>
              <div style={{ marginTop: 8 }}><Skel w={190} h={7} /><div style={{ height: 5 }} /><Skel w={140} h={7} /></div>
              <div style={{ marginTop: 14 }}><Dots n={4} active={0} /></div>
              <div style={{ flex: 1 }} />
              <Btn tone="primary" block>Continue</Btn>
              <span style={{ marginTop: 10, fontSize: 11, color: "#6b6b6b" }}>Skip</span>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>How a step advances</H3>
      <p>Inside a step, the selector controls follow the canonical patterns. The multi-step flow adds one rule — when does the step commit?</p>
      <FrameRow>
        <FrameCell caption="<b>Click to advance.</b> Single-click selections — radio rows, single image cards — commit on click and move to the next step. No footer CTA. For low-stakes single choices where a Continue click would be friction.">
          <Browser url="autodoc.ex/add-car">
            <CommitHead />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <RadioRow on w={70} />
              <RadioRow w={95} />
              <RadioRow w={120} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same single-click radio rows.">
          <MobileWeb url="autodoc.ex/add-car" header={false} nav={false}>
            <CommitHead />
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <RadioRow on w={70} />
              <RadioRow w={95} />
              <RadioRow w={120} />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Continue button.</b> Multi-input steps (forms), multi-select choices, or commits that cost time. The user assembles the step, then clicks Continue; a Skip-style alternative, if needed, is a text button beneath.">
          <Browser url="autodoc.ex/checkout">
            <CommitHead />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", height: 410, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Skel w="100%" h={30} bg="#ececec" /><Skel w="100%" h={30} bg="#ececec" /><Skel w="60%" h={30} bg="#ececec" />
              </div>
              <div style={{ flex: 1 }} />
              <Btn tone="primary" block>Continue</Btn>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same multi-input step, Continue at the foot.">
          <MobileWeb url="autodoc.ex/checkout" header={false} nav={false}>
            <CommitHead />
            <div style={{ padding: 12, display: "flex", flexDirection: "column", height: 470, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Skel w="100%" h={30} bg="#ececec" /><Skel w="100%" h={30} bg="#ececec" /><Skel w="60%" h={30} bg="#ececec" />
              </div>
              <div style={{ flex: 1 }} />
              <Btn tone="primary" block>Continue</Btn>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One question per step.</b> If a step asks for two unrelated things, it is two steps — the indicator only makes sense over a stack of single-question screens.",
        "<b>Pick one shape — never mix.</b> Step name, segmented stepper, progress bar, or dots; two indicators on one surface compete and confuse.",
        "<b>Three or fewer steps for the named and segmented shapes.</b> More than three is a form with sections, not a stepper — the progress bar can carry more because it doesn't count them out loud.",
        "<b>Back is non-destructive; exit is deliberate.</b> ‹ on every intermediate step preserves later input; leaving with unsaved input raises the «Cancel checkout?» confirm. The result step swaps ‹ for a close — the flow is complete, there's nothing to revise.",
        "<b>Click for single choices, Continue for multi-input.</b> Forcing a Continue on a one-click decision is friction; committing a form silently on every change is reckless.",
      ]}/>

      <DoDont
        doItem="Give Add-a-Car's manual selector a 3-step segmented stepper: Brand → Model → Modification. Each step is one decision, back is non-destructive, the final click lands on a confirmation."
        dontItem="Don't add a step indicator to a single-screen task just to look thorough — one screen has no steps, and the indicator is decoration."
      />

    </Section>
  );
}
window.PatSteps = PatSteps;
