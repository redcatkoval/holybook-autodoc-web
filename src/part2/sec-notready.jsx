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
    <Section id="p-card">
      <PatternHead category="Product" title="Product card"
        lede="The listing atom — the card the user scans dozens of times a session. It's built from three blocks: product (image · badges · wishlist & compare), description (name · specs · rating), and sale (price · delivery · the buy button). The same three blocks take three shapes — vertical, compact horizontal, wide horizontal — picked by container, not platform." />

      <Callout label="Autodoc reading">
        Autodoc is parts e-commerce — the card is what the user looks at fifty times a session, a single unit of trust. The three blocks are fixed; the <b>buy button is the one place the reserved orange accent appears</b>, everything else is monochrome. The card stays <b>fitment-free</b>: compatibility is carried by a dedicated marker elsewhere, not repeated on every card.
      </Callout>

      <H3>Three blocks — product · description · sale</H3>
      <p><b>Product</b> — the image, the badges that frame it (a neutral one like «Best Budget», a positive one like «Free shipping»), and the quiet wishlist &amp; compare actions. <b>Description</b> — the name (truncated, never shrunk), the spec line, the rating. <b>Sale</b> — the price and its unit, the delivery estimate, and the orange buy button (a discount, once there is one, sits here above the price). The blocks never reorder; only the axis changes.</p>
      <p>The same three blocks take three shapes — pick by container, not by platform. Each is shown on its own below, without a device frame.</p>
      <FrameRow>
        <FrameCell caption="<b>Vertical.</b> Image on top, the three blocks stacked, the buy button full-width at the foot. For grids — catalog, search, recommendation strips.">
          <div style={{ width: 220 }}><MiniCard layout="vertical" /></div>
        </FrameCell>
        <FrameCell caption="<b>Horizontal — compact (mobile / tight lists).</b> Image left, description + sale stacked, the wishlist &amp; compare actions in the corner. For cart, wishlist, narrow columns.">
          <div style={{ width: 320 }}><MiniCard layout="horizontal" /></div>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Horizontal — wide (desktop).</b> The three blocks become three columns: product · description · sale (delivery, price, the buy button, with the wishlist &amp; compare actions). For desktop lists with room.">
          <div style={{ width: 640 }}><MiniCard layout="horizontal" wide /></div>
        </FrameCell>
      </FrameRow>

      <H3>Out of stock</H3>
      <p>When a part is out of stock the card changes shape, not just a disabled button: the <b>badges</b>, the <b>delivery</b> line and the <b>wishlist &amp; compare</b> actions all drop away, the delivery line is replaced by <b>«Out of stock»</b>, and the buy button becomes a <b>secondary «Notify me»</b> — a different recovery path.</p>
      <FrameRow>
        <FrameCell caption="<b>Out of stock — vertical.</b> No badges, no actions, no delivery; «Out of stock» and a secondary «Notify me».">
          <div style={{ width: 220 }}><MiniCard layout="vertical" oos /></div>
        </FrameCell>
        <FrameCell caption="<b>Out of stock — horizontal.</b> The same stripped-down card in the list form.">
          <div style={{ width: 320 }}><MiniCard layout="horizontal" oos /></div>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Three blocks, always.</b> Product · description · sale — the same anatomy in every shape; the blocks never reorder.",
        "<b>One orange, the buy button.</b> The reserved accent appears once, on the buy action; the rest of the card is monochrome.",
        "<b>The body navigates; only the buy button acts.</b> Clicking the card opens the detail page; only the buy button adds to cart — never two destinations in the body.",
        "<b>Truncate, don't shrink.</b> Long names truncate to two lines with an ellipsis; never reduce the font to fit more text.",
        "<b>Pick the shape by container.</b> Vertical for grids, horizontal for lists — not by platform.",
        "<b>No per-card fitment.</b> A dedicated compatibility marker carries «does it fit my car?» — the card stays fitment-free.",
        "<b>In cart → a quantity stepper.</b> Once added, the buy action becomes a − N + quantity stepper for inline edits; the card doesn't grow a second control.",
        "<b>Out of stock is a state, not a dead button.</b> The buy turns into a secondary «Notify me», «Out of stock» replaces the delivery line, and the badges & wishlist/compare actions drop.",
      ]}/>

    </Section>
  );
}
window.PatProductCard = PatProductCard;
