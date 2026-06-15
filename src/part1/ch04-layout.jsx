function Ch04Layout() {
  // Minimal checkout bar: wordmark + secure-purchase lock. LIGHT, matching the
  // commit surface in the Surfaces chapter — never a dark bar that stands out.
  const CheckoutBar = () => (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 16px", background: PAL.card, borderBottom: `1px solid ${PAL.line2}`, fontFamily: UI,
    }}>
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, color: PAL.ink }}>AUTODOC</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: PAL.muted2 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke={PAL.muted2} strokeWidth="2"/><path d="M8 11V8a4 4 0 018 0v3" stroke={PAL.muted2} strokeWidth="2"/></svg>
        Secure checkout
      </span>
    </div>
  );

  return (
    <Section id="layout">
      <ChapterHead num="02" title="Layout"
        lede="Where things go on the page. The web is built mobile-first — it extends the app (its spine, components, and rhythm), scaled to the wider canvas so the two read as one language. Every web screen is one of a small set of region skeletons; this chapter names them at the desktop size and shows how each reflows to mobile-web — about where regions sit, not what kind of surface they are or the detail inside them." />

      <H3>Three page archetypes</H3>
      <p>Almost every screen is one of three skeletons. The first two carry the full <b>header</b>; the third — checkout — drops it for a minimal secure bar so nothing competes with the commit. Each archetype is shown desktop and mobile-web: the regions reflow, but the archetype is the same. The blocks below are deliberately plain — this chapter is about <b>where regions sit</b>, not what fills them.</p>

      <H4>1 · Header + content</H4>
      <p>The default page: header, then a single content area. Home, an article, a product detail, the garage.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Full header, then one content area below it.">
          <Browser url="autodoc.ex/part/brake-disc-front">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6, height: "100%" }}>
              <Region label="Header" sub="logo · vehicle · search · cart" h={40} />
              <Region label="Content" sub="single area" style={{ flex: 1, width: "auto" }} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Compact header, content, bottom nav.">
          <MobileWeb url="autodoc.ex/part/brake-disc-front" header={false} nav={false}>
            <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6, height: "100%" }}>
              <Region label="Header" sub="compact spine" h={40} />
              <Region label="Content" sub="single column" style={{ flex: 1, width: "auto" }} />
              <Region label="Bottom nav" h={28} />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H4>2 · Header + sidebar + content</H4>
      <p>The list page: a left sidebar (filters / sub-navigation) beside the main grid. On mobile-web the sidebar has nowhere to stand, so it collapses into a filter bar that opens a drawer.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Header, then a left sidebar beside the main content.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6, height: "100%" }}>
              <Region label="Header" sub="logo · vehicle · search · cart" h={40} />
              <div style={{ display: "flex", gap: 8, flex: 1 }}>
                <Region label="Sidebar" sub="filters / sub-nav" w={150} style={{ height: "auto" }} />
                <Region label="Content" sub="product grid" style={{ flex: 1, width: "auto", height: "auto" }} />
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Sidebar collapses to a filter bar; tapping it opens a drawer.">
          <MobileWeb url="autodoc.ex/catalog/roof-racks" header={false} nav={false}>
            <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6, height: "100%" }}>
              <Region label="Header" sub="compact spine" h={40} />
              <Region label="Filter bar →" sub="opens drawer" h={26} />
              <Region label="Content" sub="single column" style={{ flex: 1, width: "auto" }} />
              <Region label="Bottom nav" h={28} />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H4>3 · Checkout — minimal header</H4>
      <p>The commit. There is no full header, no nav, no sidebar — only a slim bar with the logo and the secure-purchase lock, so the page is a single corridor to the order. We aim for a one-page checkout, not a multi-step wizard.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Minimal bar (logo · secure), then the checkout content. No nav, no sidebar.">
          <Browser url="autodoc.ex/checkout">
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CheckoutBar />
              <div style={{ padding: 10, flex: 1, display: "flex" }}>
                <Region label="Checkout content" sub="address · payment · summary" style={{ flex: 1, width: "auto", height: "auto" }} />
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Same minimal bar, single column. Bottom nav is gone too — nothing leaves the corridor.">
          <MobileWeb url="autodoc.ex/checkout" header={false} nav={false}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CheckoutBar />
              <div style={{ padding: 8, flex: 1, display: "flex" }}>
                <Region label="Checkout content" sub="single column" style={{ flex: 1, width: "auto", height: "auto" }} />
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>The header carries the spine</H3>
      <p>The header is the most load-bearing region. On desktop, left to right it holds: logo, the <b>active vehicle pill</b>, search, the mobile-app prompt, region / language, sign-in, and the cart — with the <b>collections</b> nav strip directly beneath. On mobile-web the same spine compresses into the small header, and the collections move <b>inside the Catalog tab</b>: tapping Catalog in the bottom nav opens a tabbed screen where each tab is a collection and the content sits below — exactly like the app. Either way the collections are <b>first-class navigation, not a promo</b>. As the user scrolls down, the primary header stays <b>sticky</b> while the collections strip <b>condenses away</b> — fewer competing routes and a calmer read — and returns on scroll-up; only the secondary nav hides, never the load-bearing header.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> The loaded header: logo · vehicle pill · search · region/language · sign-in · cart, with the collections strip beneath. The page is left as a block.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 10 }}>
              <Region label="Page" sub="list / detail / cart / …" h={330} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Catalog is a tab in the bottom nav; opening it shows the collections as tabs with content beneath.">
          <MobileWeb url="autodoc.ex/catalog" navActive="Catalog">
            <CatalogTabsContent />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Folding to mobile-web</H3>
      <p>The desktop layout is the canonical one; mobile-web is the same system folded down. The rule is that <b>every desktop region has a defined mobile-web destination — nothing simply disappears when the viewport narrows; it relocates.</b> The exact breakpoint between the two presentations is a UI detail; what matters at the architecture level is that each region knows where it goes.</p>
      <table className="spec">
        <thead><tr><th>Desktop</th><th>Mobile-web</th></tr></thead>
        <tbody>
          <tr><td className="k">Collections strip</td><td>Catalog tabs / horizontal scroll</td></tr>
          <tr><td className="k">&quot;Catalog&quot; mega-menu</td><td>Drilled, full-screen list</td></tr>
          <tr><td className="k">Left sidebar filters</td><td>Drawer / bottom sheet</td></tr>
          <tr><td className="k">Wide horizontal product card</td><td>Vertical card</td></tr>
          <tr><td className="k">Footer mass-links</td><td>Collapsed accordion</td></tr>
          <tr><td className="k">Breadcrumb trail</td><td>Single back-arrow</td></tr>
          <tr><td className="k">Top nav links</td><td>Bottom nav (Home / Catalog / Cart)</td></tr>
        </tbody>
      </table>

      <DoDont
        doItem="Keep the header constant and bound the main column. Put filters and sub-navigation in the desktop sidebar so they have a clear mobile-web destination (the drawer), and give every desktop region an explicit mobile-web form. Strip the header down to logo + secure lock on checkout."
        dontItem="Don't run content edge-to-edge on wide screens, don't invent a second navigation system parallel to the collections, don't keep the full header or bottom nav on the checkout corridor, and don't ship a mobile layout that is just the desktop one shrunk."
      />
    </Section>
  );
}
window.Ch04Layout = Ch04Layout;
