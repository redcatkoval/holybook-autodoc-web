// Part "Not ready" — mirrors the app book's parking lot for patterns whose
// web form isn't settled. Rendered after Part III. For now: the Product card.
// These are documented as open questions, not as decided patterns.

function NotReadyCard({ children }) {
  return (
    <div style={{ border: "1px dashed #d8d8d8", borderRadius: 12, padding: 16, background: "#f7f6f4", fontFamily: "-apple-system, sans-serif" }}>
      {children}
    </div>
  );
}

function PatProductCard() {
  return (
    <Section id="nr-card">
      <PatternHead category="Not ready" title="Product card"
        lede="The product card is the catalogue's atom — and its web form isn't settled yet. The fitment proof is clearly the headline, but the layout (wide horizontal vs. vertical), how much spec to surface, and how it behaves across list, grid, and rail still need resolving. Documented here as an open question, not a decided pattern." />

      <Callout label="Why it's parked">
        We know the load-bearing element is fitment — an <i>OE matched</i> badge and a green <span className="hl">✓ Fits</span> chip tied to the active vehicle. What we don't yet know: whether desktop lists run wide horizontal cards or the same vertical card as everywhere else, how much spec belongs on the card vs. the detail page, and how the card should compress inside a promo rail. Until those are answered it would be premature to canonise it.
      </Callout>

      <H3>Current sketches — not final</H3>
      <p>Two candidate shapes, shown so the open questions are concrete. Neither is adopted: the wide card reads richly in a list but bloats a grid; the vertical card travels everywhere but has less room for the fitment proof.</p>
      <FrameRow>
        <FrameCell caption="<b>Candidate A.</b> Wide horizontal card for desktop lists — rich, but grid-hostile.">
          <Browser url="autodoc.ex/list" h={300}>
            <HeaderSpine />
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <ProductCard wide />
              <ProductCard wide />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Candidate B.</b> Vertical card that travels — less room for fitment proof.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ padding: 10 }}><ProductGrid cols={2} n={4} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Open questions</H3>
      <NotReadyCard>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, color: "#2a2a2a", lineHeight: 1.7 }}>
          <li>Does desktop use a distinct <b>wide</b> card in lists, or the same vertical card scaled up?</li>
          <li>How much <b>spec</b> belongs on the card before it competes with the detail page?</li>
          <li>How does the card <b>compress</b> inside a promo rail without losing the fitment chip?</li>
          <li>Where does the <b>secondary action</b> (save, compare) live — always visible, or on hover only?</li>
        </ul>
      </NotReadyCard>

    </Section>
  );
}
window.PatProductCard = PatProductCard;
