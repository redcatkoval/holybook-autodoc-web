// Part III · Flow — Cart to confirmed order. The longest flow and the one
// place the shell is stripped. Composes the cart dropdown, the full-page
// two-column commit, the step progress, field rows, and the result page.

function OrderSummary({ cta = "Place order" }) {
  return (
    <div style={{ border: "1px solid #d8d8d8", borderRadius: 10, padding: 14, fontFamily: "-apple-system, sans-serif", background: "#fff" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#111", marginBottom: 10 }}>Order summary</div>
      {["Brake Disc Front · Brembo", "Brake Pads · Textar", "Engine Oil 5W-30"].map((it, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: "#6b6b6b", padding: "4px 0" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 110 }}>{it}</span>
          <span>€{[89, 42, 38][i]}</span>
        </div>
      ))}
      <div style={{ borderTop: "1px solid #ececec", margin: "8px 0", paddingTop: 8, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "#111" }}>
        <span>Total</span><span>€269,19</span>
      </div>
      <div style={{ marginTop: 10 }}><Btn tone="accent" block>{cta}</Btn></div>
    </div>
  );
}

function FlowCheckout() {
  return (
    <Section id="f-checkout">
      <PatternHead category="Not ready" title="Cart → confirmed order"
        lede="The flagship flow, and the single exception to the persistent shell. It starts in the cart dropdown, expands to a full-page two-column commit (steps on the left, a sticky order summary on the right), and ends on a full-page confirmation. The bottom nav is hidden the whole way — a commit deserves the whole screen." />

      <H3>From dropdown to commit</H3>
      <p>The flow begins where the cart lives — the <b>dropdown</b> under the basket button. &quot;Checkout&quot; leaves the shell behind and opens the <b>two-column commit</b>: Contact / Shipping / Payment steps on the left, a sticky <b>order summary</b> on the right that never leaves the screen.</p>
      <FrameRow>
        <FrameCell caption="<b>1 · Cart dropdown.</b> Review and step off from the anchored popover.">
          <Browser url="autodoc.ex/catalog" h={320}>
            <HeaderSpine />
            <div style={{ position: "relative", padding: 10 }}>
              <Region label="Page behind" h={240} />
              <CartDropdown />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>2 · Commit.</b> Shell removed; steps left, sticky summary right.">
          <Browser url="autodoc.ex/checkout" h={320}>
            <div style={{ padding: 14, borderBottom: "1px solid #ececec" }}><StepProgress steps={["Contact", "Shipping", "Payment", "Done"]} active={1} /></div>
            <div style={{ padding: 14, display: "flex", gap: 14 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <FieldRow label="Address" value="Musterstraße 12, Berlin" />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}><Region label="Standard · €4,90" sub="3–5 days" h={48} /></div>
                  <div style={{ flex: 1 }}><Region label="Express · €9,90" sub="1–2 days" h={48} /></div>
                </div>
              </div>
              <div style={{ width: 170 }}><OrderSummary cta="Continue to payment" /></div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>3 · Confirmed.</b> A full-page result, not a toast.">
          <Browser url="autodoc.ex/order/confirmed" h={320}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, fontFamily: "-apple-system, sans-serif", gap: 8 }}>
              <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(46,125,50,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-10" stroke="#2e7d32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>Order confirmed</span>
              <span style={{ fontSize: 10, color: "#6b6b6b" }}>#AD-90432 · email sent · track in your garage</span>
              <Btn tone="secondary">View order</Btn>
            </div>
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>Mobile-web — columns stack, nav stays hidden</H3>
      <p>On mobile-web the two columns <b>stack</b>: the active step fills the screen and the order summary collapses to a sticky bottom bar with the total and the primary. The bottom nav stays hidden until the order is placed.</p>
      <FrameRow>
        <FrameCell caption="<b>Commit.</b> Single-column step with a sticky total bar; no bottom nav.">
          <MobileWeb url="autodoc.ex/checkout" nav={false} header={false}>
            <div style={{ padding: 12, borderBottom: "1px solid #ececec" }}><StepProgress steps={["Contact", "Pay", "Done"]} active={0} /></div>
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <FieldRow label="Email" value="hans@web.de" />
              <FieldRow label="Address" value="Musterstraße 12" />
              <FieldRow label="City" value="Berlin" />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, borderTop: "1px solid #ececec", background: "#fff", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>€269,19</span>
              <Btn tone="accent" style={{ flex: 1 }}>Continue to payment</Btn>
            </div>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Confirmed.</b> Full-page success; the bottom nav returns.">
          <MobileWeb url="autodoc.ex/order/confirmed" navActive="Home">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, gap: 8, fontFamily: "-apple-system, sans-serif", textAlign: "center", padding: 16 }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(46,125,50,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-10" stroke="#2e7d32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>Order confirmed</span>
              <span style={{ fontSize: 10, color: "#6b6b6b" }}>#AD-90432 · track in your garage</span>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Callout label="The one place the shell goes">
        Checkout is the sole surface that drops the persistent header/nav shell. The two-column-then-stacked layout and the step header carry orientation instead. Every other surface keeps the shell — this exception is what marks the commit as serious.
      </Callout>

      <DoDont
        doItem="Keep the order summary visible the whole way (sticky column on desktop, sticky bar on mobile), and land the outcome on a full result page."
        dontItem="Don't hide the running total behind a step, and don't confirm a placed order with a dismissible toast — a commit deserves a page."
      />

    </Section>
  );
}
window.FlowCheckout = FlowCheckout;
