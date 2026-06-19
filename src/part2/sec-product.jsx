// Reviews & ratings and Image gallery — both currently in the "Not ready"
// part. (The Product card is a finished Part II pattern in sec-notready.jsx;
// the flows live in src/part3/.)

function Gallery() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 36, height: 36, borderRadius: 6, border: i === 0 ? "2px solid #ff5a1f" : "1px solid #d8d8d8", background: "#f7f6f4" }} />
        ))}
      </div>
      <div style={{ flex: 1 }}><Region label="Active image" sub="zoom on hover" h={180} /></div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Reviews & ratings
// ════════════════════════════════════════════════════════════════════════
function PatReviews() {
  return (
    <Section id="p-reviews">
      <PatternHead category="Not ready" title="Reviews &amp; ratings"
        lede="Social proof, structured. The review block pairs an aggregate score with a distribution and the individual reviews beneath it. It's a read surface, not a form — writing a review is its own flow — and it sits below the buy decision, supporting it rather than competing with it." />

      <Callout label="Autodoc reading">
        The app shows an aggregate rating, a breakdown by star, and a scrollable list of reviews; the web keeps that structure on a wider canvas. Stars use the app's accent for the filled portion, the muted line for the rest. The block summarises first (score + count) so a glance is enough, then offers the detail for those who want it.</Callout>

      <H3>Aggregate, distribution, individual</H3>
      <p>The header states the score and count; a distribution shows how ratings spread; individual reviews follow. The same structure serves both breakpoints, single-column on mobile.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Aggregate and distribution, with reviews listed below.">
          <Browser url="autodoc.ex/product" h={320}>
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", gap: 18, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ width: 150, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: "#111" }}>4.6</span>
                  <div><Stars n={5} of={5} /><div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 2 }}>312 reviews</div></div>
                </div>
                {[5, 4, 3, 2, 1].map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 8, color: "#9a9a9a", width: 8 }}>{s}</span>
                    <div style={{ flex: 1, height: 5, borderRadius: 3, background: "#ececec", overflow: "hidden" }}><div style={{ width: [80, 55, 18, 6, 4][i] + "%", height: "100%", background: "#ff5a1f" }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid #ececec" : "none" }}>
                    <Stars n={5 - (i % 2)} of={5} size={9} /><div style={{ height: 4 }} /><Skel w="90%" h={7} /><div style={{ height: 3 }} /><Skel w="70%" h={7} />
                  </div>
                ))}
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Score on top, reviews stacked below.">
          <MobileWeb url="autodoc.ex/product" navActive="Catalog">
            <div style={{ padding: 12, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#111" }}>4.6</span>
                <div><Stars n={5} of={5} /><div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 2 }}>312 reviews</div></div>
              </div>
              {[0, 1].map((i) => (
                <div key={i} style={{ padding: "8px 0", borderTop: "1px solid #ececec" }}>
                  <Stars n={5 - i} of={5} size={9} /><div style={{ height: 4 }} /><Skel w="90%" h={7} /><div style={{ height: 3 }} /><Skel w="70%" h={7} />
                </div>
              ))}
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Summarise first.</b> Score and count up top; a glance should be enough.",
        "<b>Show the distribution,</b> so a high average with a long tail reads honestly.",
        "<b>Read, don't write, here.</b> Composing a review is a separate flow, not inline.",
        "<b>Stars use the accent</b> for the filled portion, muted line for the rest — no gold.",
      ]}/>

      <DoDont
        doItem="Lead with the aggregate and distribution, then list individual reviews, keeping the block below the buy decision."
        dontItem="Don't bury the score, and don't merge the review-writing form into the read block."
      />

    </Section>
  );
}
window.PatReviews = PatReviews;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Image gallery
// ════════════════════════════════════════════════════════════════════════
function PatGallery() {
  return (
    <Section id="p-gallery">
      <PatternHead category="Not ready" title="Image gallery"
        lede="How a product's images are shown and explored. A thumb rail selects, a large active image shows, and a pointer can zoom. It's a focused viewer, paired with the buy-box on desktop and stacked above the detail on mobile — the visual half of the product page." />

      <Callout label="Autodoc reading">
        The app's gallery is a swipeable carousel with an active image and dots; the web keeps the active image but swaps swipe for a thumb rail and hover-zoom, the affordances a pointer affords. The selected thumb is marked with the app accent. On mobile-web it returns to a swipeable strip — the gesture is back where the screen is touch-first.</Callout>

      <H3>Thumb rail, active image, zoom</H3>
      <p>The rail selects; the active image fills; hovering zooms on desktop. On mobile-web the rail becomes a swipeable strip with dots, and the active image leads the page.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Thumb rail + active image with hover-zoom, beside the buy-box.">
          <Browser url="autodoc.ex/product" h={300}>
            <HeaderSpine />
            <div style={{ padding: 14, display: "flex", gap: 14 }}>
              <div style={{ flex: 1 }}><Gallery /></div>
              <div style={{ width: 150, display: "flex", flexDirection: "column", gap: 8 }}>
                <Skel w="80%" h={12} />
                <Skel w="50%" h={9} />
                <div style={{ height: 4 }} />
                <Btn tone="accent" block>Add to cart</Btn>
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> A swipeable image strip with dots leads the page.">
          <MobileWeb url="autodoc.ex/product" navActive="Catalog">
            <div style={{ padding: 10 }}>
              <Region label="Active image" sub="swipe · dots below" h={180} />
              <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 8 }}>
                {[0, 1, 2, 3].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#ff5a1f" : "#d8d8d8" }} />)}
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Rail selects on desktop,</b> swipe selects on mobile — the right affordance per device.",
        "<b>Mark the active thumb</b> with the app accent.",
        "<b>Zoom is an enhancement,</b> on hover for pointers; never the only way to see detail.",
        "<b>Keep the buy-box in view</b> beside the gallery on desktop; don't let images push it away.",
      ]}/>

      <DoDont
        doItem="Pair a thumb rail and active image with hover-zoom on desktop, and a swipeable strip with dots on mobile."
        dontItem="Don't require zoom to judge the product, and don't let a tall gallery shove the primary action off-screen."
      />

    </Section>
  );
}
window.PatGallery = PatGallery;
