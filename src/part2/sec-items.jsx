// Part II · Actions on items — mirrors the app book's "Actions on items"
// group. The app's long-press context menu and swipe actions have one web
// equivalent: the kebab (⋮) menu plus hover row-actions. Swipe has no web
// form and is dropped. One Section: Context menus.

function RowActionsHover() {
  return (
    <div style={{ border: "1px solid #ececec", borderRadius: 8, overflow: "hidden", fontFamily: "-apple-system, sans-serif" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderTop: i ? "1px solid #ececec" : "none", background: i === 1 ? "#f7f6f4" : "#fff" }}>
          <Thumb w={32} h={32} />
          <div style={{ flex: 1 }}><Skel w="60%" h={8} /></div>
          {i === 1 ? (
            <div style={{ display: "flex", gap: 6 }}>
              <Btn tone="secondary" size="sm">Edit</Btn>
              <Btn tone="secondary" size="sm" style={{ color: "#c62828" }}>Remove</Btn>
            </div>
          ) : (
            <span style={{ fontSize: 16, color: "#9a9a9a", letterSpacing: "1px" }}>⋮</span>
          )}
        </div>
      ))}
    </div>
  );
}

function PatContext() {
  return (
    <Section id="p-context">
      <PatternHead category="Actions on items" title="Context menus"
        lede="Quick access to an object's secondary actions — edit, duplicate, remove — without interrupting the flow. On the web a context menu is opened by a ⋮ (kebab) button or a right-click, never a long-press. Where the ⋮ sits tells the user what it operates on: a ⋮ in the header acts on the whole screen, a ⋮ on a row acts on that row." />

      <Callout label="Autodoc reading">
        The app reveals these by <b>long-press</b> and <b>swipe</b>; the web has neither reliably, so the <b>⋮</b> (and right-click) carry them. Placement is the canon: a ⋮ in the header opens whole-screen actions as a <b>dropdown</b>; a ⋮ on a row opens that row's actions as a <b>popover</b> attached to it. On mobile-web both fold to a <b>bottom sheet</b> — the standard mobile form of a menu. A context menu is quiet, so it's never the only path to anything that destroys or commits.</Callout>

      <H3>Two scopes — placement signals what it operates on</H3>
      <p>Same idea — a short list of actions — placed by what the actions apply to. The position is the canon: a header ⋮ is the whole screen; a row ⋮ is that one item.</p>
      <FrameRow>
        <FrameCell caption="<b>Screen-level (desktop).</b> A ⋮ in the page toolbar opens a dropdown of whole-screen actions (refresh, manage, settings). It applies to the page as a whole.">
          <Browser url="autodoc.ex/orders">
            <HeaderSpine />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #ececec", fontFamily: "-apple-system, sans-serif" }}>
              <Skel w={90} h={10} />
              <span style={{ fontSize: 16, color: "#111", letterSpacing: "1px" }}>⋮</span>
            </div>
            <div style={{ padding: 16 }}><Region label="Screen body" h={150} /></div>
            <div style={{ position: "absolute", right: 14, top: 100 }}><KebabMenu items={["Refresh", "Manage", "Settings"]} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same header ⋮ opens a bottom sheet — the mobile form of the dropdown.">
          <MobileWeb url="autodoc.ex/orders" navActive="Catalog">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #ececec", fontFamily: "-apple-system, sans-serif" }}>
              <Skel w={70} h={9} />
              <span style={{ fontSize: 16, color: "#111", letterSpacing: "1px" }}>⋮</span>
            </div>
            <div style={{ padding: 10 }}><Region label="Screen body" h={150} /></div>
            <MobileDrawer title="Actions" height="40%">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {["Refresh", "Manage", "Settings"].map((l, i) => (
                  <div key={l} style={{ padding: "12px 2px", fontFamily: "-apple-system, sans-serif", fontSize: 13, color: "#2a2a2a", borderBottom: i < 2 ? "1px solid #ececec" : "none" }}>{l}</div>
                ))}
              </div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Item-level (desktop).</b> A ⋮ on a row opens a popover attached to that row (edit, duplicate, remove). The rest of the list stays visible; destructive sits last, in red.">
          <Browser url="autodoc.ex/garage">
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "1px solid #ececec", borderRadius: 8, background: i === 1 ? "#f7f6f4" : "#fff" }}>
                  <Thumb w={30} h={30} />
                  <div style={{ flex: 1 }}><Skel w="45%" h={8} /></div>
                  <span style={{ fontSize: 15, color: "#9a9a9a", letterSpacing: "1px" }}>⋮</span>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", right: 18, top: 112 }}><KebabMenu items={["Edit", "Duplicate", "Remove"]} /></div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The row ⋮ opens a bottom sheet of that row's actions; destructive last, in red.">
          <MobileWeb url="autodoc.ex/garage" navActive="Catalog">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "1px solid #ececec", borderRadius: 8, background: i === 1 ? "#f7f6f4" : "#fff" }}>
                  <Thumb w={28} h={28} />
                  <div style={{ flex: 1 }}><Skel w="55%" h={8} /></div>
                  <span style={{ fontSize: 15, color: "#9a9a9a", letterSpacing: "1px" }}>⋮</span>
                </div>
              ))}
            </div>
            <MobileDrawer title="Item" height="42%">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[["Edit", false], ["Duplicate", false], ["Remove", true]].map(([l, red], i) => (
                  <div key={l} style={{ padding: "12px 2px", fontFamily: "-apple-system, sans-serif", fontSize: 13, color: red ? "#c62828" : "#2a2a2a", borderBottom: i < 2 ? "1px solid #ececec" : "none" }}>{l}</div>
                ))}
              </div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Placement signals scope.</b> A ⋮ in the header = the whole screen; a ⋮ on a row = that one row. On desktop the menu is a dropdown / popover; on mobile-web it folds to a bottom sheet. Position is the canon — don't break it.",
        "<b>Opened by ⋮ or right-click — never long-press.</b> The web has no reliable long-press or swipe; the kebab and the context-click carry them.",
        "<b>Never the only path to a critical action.</b> Context menus are quiet — most users won't find them; anything that destroys or commits is also reachable from visible UI. The menu is a shortcut, not a hiding place.",
        "<b>Destructive last, and confirmed.</b> Remove / Delete sits at the end in the red variant, and if irreversible it routes through a confirm dialog rather than firing on one click.",
      ]}/>

      <DoDont
        doItem="Expose an object's secondary actions through a ⋮ (or right-click): the header ⋮ for whole-screen actions, a row ⋮ for that row; on mobile-web the menu is a bottom sheet. Keep destructive last and confirm the irreversible ones."
        dontItem="Don't make a destructive action reachable only through the menu — surface it in visible UI too. And don't rely on long-press or swipe the web can't guarantee."
      />

    </Section>
  );
}
window.PatContext = PatContext;
