// Part II · Promotion — mirrors the app book's "Promotion" group. One
// Section: Widgets. The promotional rails (deals carousel, shop-by-brand)
// that ride along inside the mega-menu and on landings, treated as a pattern
// in their own right — clearly lateral, never primary navigation.

function PromoDealCard() {
  return (
    <div style={{ flexShrink: 0, width: 130, border: "1px solid #ececec", borderRadius: 10, padding: 10, fontFamily: "-apple-system, sans-serif", background: "#fff" }}>
      <div style={{ position: "relative" }}>
        <Thumb h={56} />
        <span style={{ position: "absolute", top: 4, left: 4, fontSize: 8, fontWeight: 700, color: "#c62828", background: "rgba(198,40,40,0.12)", borderRadius: 6, padding: "1px 5px" }}>−27%</span>
      </div>
      <div style={{ marginTop: 6 }}><Skel w="80%" h={7} /></div>
      <div style={{ marginTop: 6 }}><span style={{ fontSize: 11, fontWeight: 800 }}>€188</span> <span style={{ fontSize: 9, color: "#9a9a9a", textDecoration: "line-through" }}>€258</span></div>
    </div>
  );
}

function PatWidgets() {
  return (
    <Section id="p-promo">
      <PatternHead category="Not ready" title="Widgets"
        lede="The promotional rails — a deals carousel and the shop-by-brand chips. They're curated, horizontal, and deliberately set apart from navigation: a lateral route the merchandiser controls, not a category tree. They appear inside the mega-menu and on landings, always clearly a promotion." />

      <Callout label="Autodoc reading">
        In the app these are promotional widgets — carousels and chip rails dropped into a feed. On the web they ride inside the mega-menu (the DEALS and SHOP BY BRAND rows) and on landing pages, but the rule is the same: a widget is clearly a promotion, visually distinct from the catalogue tree, and it never stands in for category navigation. The 'Promo' tag and the discount colours come straight from the app palette.</Callout>

      <H3>Deals carousel &amp; shop-by-brand</H3>
      <p>Promotion lives in horizontal rails: a scrollable deals carousel with discount badges, and the shop-by-brand chips as a fast lateral filter. Both are labelled as what they are and never masquerade as the primary nav.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A labelled deals carousel over the shop-by-brand chip row.">
          <Browser url="autodoc.ex" h={300}>
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11, fontWeight: 800 }}>Top deals</span>
                  <Pill tone="dark">Promo</Pill>
                </div>
                <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
                  {[0, 1, 2, 3].map((i) => <PromoDealCard key={i} />)}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Shop by brand</div>
                <BrandChips />
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same rails stack, still scrollable, still labelled.">
          <MobileWeb url="autodoc.ex" navActive="Home">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11, fontWeight: 800 }}>Top deals</span>
                  <Pill tone="dark">Promo</Pill>
                </div>
                <div style={{ display: "flex", gap: 8, overflow: "hidden" }}><PromoDealCard /><PromoDealCard /></div>
              </div>
              <div>
                <div style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Shop by brand</div>
                <BrandChips />
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Clearly a promotion.</b> Label it and tag it 'Promo'; never let it read as the category tree.",
        "<b>Lateral, not primary.</b> Widgets are a merchandised side-route alongside navigation, not instead of it.",
        "<b>Palette discounts.</b> Red bad-tint for the saving badge, accent for any CTA — no bespoke promo colours.",
        "<b>Scrollable, bounded.</b> A rail of a few curated items, not an endless wall.",
      ]}/>

      <DoDont
        doItem="Keep promo as clearly-labelled horizontal rails that sit alongside navigation, using the app's discount colours."
        dontItem="Don't let a promo rail masquerade as primary category navigation, and don't invent a promo accent."
      />

    </Section>
  );
}
window.PatWidgets = PatWidgets;
