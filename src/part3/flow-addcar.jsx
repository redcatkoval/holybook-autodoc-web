// Part III · Flow — Add a car to the garage. Establishes the vehicle spine
// that the whole catalogue hangs off. Composes the slide-over/garage surface,
// a multi-step picker, the car carousel, and a fitment confirmation.

function VehicleStep({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", border: "1px solid #d8d8d8", borderRadius: 8, fontFamily: "-apple-system, sans-serif", marginBottom: 8 }}>
      <span style={{ fontSize: 10, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: value ? "#111" : "#d8d8d8" }}>{value || "—"}</span>
    </div>
  );
}

function FlowAddCar() {
  return (
    <Section id="f-addcar">
      <PatternHead category="Not ready" title="Add a car to the garage"
        lede="The flow that builds the spine. Every fitment chip elsewhere in the product depends on a vehicle existing here. It combines a multi-step picker (or a one-shot reg-plate lookup), the garage slide-over, and the car carousel — and ends by making the new car the active filter." />

      <H3>Two ways in — picker or plate</H3>
      <p>The user either drills a <b>make → model → engine</b> picker, or pastes a <b>registration plate / VIN</b> and lets the lookup resolve it. Both converge on the same confirmed vehicle.</p>
      <FrameRow>
        <FrameCell caption="<b>1 · Picker.</b> Make → model → engine, narrowing each step.">
          <Browser url="autodoc.ex/garage/add" h={300}>
            <HeaderSpine />
            <div style={{ padding: 16 }}>
              <StepProgress steps={["Make", "Model", "Engine", "Done"]} active={2} />
              <div style={{ height: 14 }} />
              <VehicleStep label="Make" value="BMW" />
              <VehicleStep label="Model" value="3 Series (F30)" />
              <VehicleStep label="Engine" value="320d · 184 hp" />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>1-alt · Plate.</b> A reg-plate lookup resolves the same vehicle in one shot.">
          <Browser url="autodoc.ex/garage/add" h={300}>
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <FieldRow label="Registration plate" value="B · MW 320 D" />
              <Btn tone="accent" block>Look up vehicle</Btn>
              <div style={{ marginTop: 6 }}><Region label="Resolved: BMW 320d (F30)" sub="confirm to add" h={70} /></div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>2 · Added.</b> The car joins the garage carousel and becomes active.">
          <Browser url="autodoc.ex/garage" h={300}>
            <HeaderSpine />
            <div style={{ padding: 16 }}>
              <div style={{ fontFamily: "-apple-system, sans-serif", fontSize: 9, fontWeight: 700, color: "#9a9a9a", textTransform: "uppercase", marginBottom: 8 }}>My auto</div>
              <CarCarousel n={3} active={2} />
            </div>
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>Mobile-web — picker as a page, garage as a slide-over</H3>
      <p>On mobile-web the add-car picker is a <b>full page</b> off the garage, not a sheet — it&apos;s a short flow of its own, and the step header carries the sense of place since the bottom nav is hidden during the commit. The <b>garage</b> itself, which on desktop is a side drawer, has no room to sit beside the page on a phone, so it opens as a <b>full-cover slide-over</b> with its own × close.</p>
      <FrameRow>
        <FrameCell caption="<b>Picker.</b> One choice per screen; step header up top.">
          <MobileWeb url="autodoc.ex/garage/add" nav={false} header={false}>
            <div style={{ padding: 12, borderBottom: "1px solid #ececec" }}><StepProgress steps={["Make", "Model", "Engine"]} active={1} /></div>
            <div style={{ padding: 10, fontFamily: "-apple-system, sans-serif" }}>
              {["3 Series (F30)", "3 Series (E90)", "1 Series", "5 Series"].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderTop: i ? "1px solid #ececec" : "none", fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#111" : "#6b6b6b" }}>
                  {m}{i === 0 && <span style={{ color: "#ff5a1f" }}>✓</span>}
                </div>
              ))}
            </div>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Active.</b> The garage opens as a full-cover slide-over with its own × close; the new car leads the carousel.">
          <MobileWeb url="autodoc.ex/garage" navActive="Home" overlay={<GarageOverlay active={0} footer={<div style={{ marginTop: 6 }}><Toast tone="good">BMW 320d is now active</Toast></div>} />}>
            <div style={{ padding: 10 }}><Region label="Catalog behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Callout label="The active car is a global filter">
        Adding a car isn&apos;t a profile chore — it rewires the whole catalogue. The active vehicle drives every fitment chip, the &quot;Fits your…&quot; copy, and the default filters. That&apos;s why this flow earns first-class surfaces.
      </Callout>

      <DoDont
        doItem="Offer both the picker and the plate lookup, and make the newly added car active immediately so fitment lights up across the catalogue."
        dontItem="Don't add a car silently with no confirmation, and don't make the user re-select it on the next page — the active vehicle persists."
      />

    </Section>
  );
}
window.FlowAddCar = FlowAddCar;
