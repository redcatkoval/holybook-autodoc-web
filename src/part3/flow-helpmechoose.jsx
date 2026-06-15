// Part III · Flow — Help me choose. A guided fitment flow that answers
// "will this fit?" by asking a couple of questions and narrowing to the
// confirmed part. Composes the entry banner, a short multi-step picker
// (modal on desktop, sheet on mobile), and a confirmed-fit result.

function ChooseBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#ffe9df", border: "1px solid #ff5a1f", borderRadius: 10, fontFamily: "-apple-system, sans-serif" }}>
      <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#ff5a1f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>?</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>Not sure which one fits?</div>
        <div style={{ fontSize: 9.5, color: "#6b6b6b" }}>Answer two questions and we&apos;ll match it to your selected car.</div>
      </div>
      <Btn tone="accent" size="sm">Help me choose</Btn>
    </div>
  );
}

function ChooseQuestion({ q, options, picked = 0 }) {
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#111", marginBottom: 10 }}>{q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o, i) => (
          <div key={o} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", border: i === picked ? "1px solid #ff5a1f" : "1px solid #d8d8d8", borderRadius: 8, background: i === picked ? "#ffe9df" : "#fff", fontSize: 11, fontWeight: i === picked ? 700 : 500, color: "#111" }}>
            {o}{i === picked && <span style={{ color: "#ff5a1f" }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowHelpMeChoose() {
  return (
    <Section id="f-help">
      <PatternHead category="Not ready" title="Help me choose"
        lede="A guided fitment flow for the categories where 'will this fit?' is genuinely hard. A banner above the list opens a short two-question picker — a modal on desktop, a sheet on mobile — that narrows the catalogue to the parts proven to fit the active vehicle, then drops the user back into a filtered list with the fit confirmed." />

      <H3>Banner → questions → confirmed fit</H3>
      <p>The flow begins with a <b>banner</b> on tricky categories. It opens a <b>short picker</b> — two or three questions about the variant (engine code, axle, side) — and ends by <b>narrowing the list</b> to confirmed-fit parts with a green proof chip. It never leaves the catalogue; it just makes the choice safe.</p>
      <FrameRow>
        <FrameCell caption="<b>1 · Banner.</b> A guided-fit entry above a fiddly category.">
          <Browser url="autodoc.ex/list" h={320}>
            <HeaderSpine />
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              <ChooseBanner />
              <SchematicGrid cols={2} n={4} h={56} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>2 · Questions.</b> A short picker as a modal; one question per step.">
          <Browser url="autodoc.ex/list" h={320}>
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="List behind" h={300} /></div>
            <Modal title="Help me choose" w={300}>
              <StepProgress steps={["Engine", "Axle", "Done"]} active={1} />
              <div style={{ height: 12 }} />
              <ChooseQuestion q="Which axle?" options={["Front axle", "Rear axle"]} picked={0} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}><Btn tone="accent" size="sm">Continue</Btn></div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>3 · Confirmed fit.</b> Back in the list, narrowed to proven-fit parts.">
          <Browser url="autodoc.ex/list?fit=1" h={320}>
            <HeaderSpine />
            <div style={{ padding: 12 }}>
              <div style={{ marginBottom: 10 }}><Pill tone="good">✓ Showing parts that fit your selected car</Pill></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ProductCard wide /><ProductCard wide />
              </div>
            </div>
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>Mobile-web — the picker is a sheet</H3>
      <p>On mobile-web the banner opens the same questions as a <b>bottom sheet</b>; the result is the same narrowed list with the green proof chip. The bottom nav stays, because this flow lives inside the catalogue rather than committing anything.</p>
      <FrameRow>
        <FrameCell caption="<b>Questions.</b> The picker rises as a sheet over the list.">
          <MobileWeb url="autodoc.ex/list" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="List behind" h={360} /></div>
            <MobileDrawer title="Help me choose" height="60%">
              <StepProgress steps={["Engine", "Axle", "Done"]} active={0} />
              <div style={{ height: 12 }} />
              <ChooseQuestion q="Which engine?" options={["320d · 184 hp", "320i · 184 hp", "318d · 150 hp"]} picked={0} />
              <div style={{ marginTop: 12 }}><Btn tone="accent" block>Continue</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Confirmed fit.</b> Narrowed list with the green proof chip; nav stays.">
          <MobileWeb url="autodoc.ex/list?fit=1" navActive="Catalog">
            <div style={{ padding: 10 }}>
              <div style={{ marginBottom: 10 }}><Pill tone="good">✓ Fits your selected car</Pill></div>
              <ProductGrid cols={2} n={4} />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Callout label="It narrows, it doesn't commit">
        Help me choose is a navigation aid, not a commit: it never adds to a basket or places anything. It asks the minimum needed to be sure of fit, then hands the user a trustworthy list. That's why the shell stays the whole way — unlike checkout, nothing here is irreversible.
      </Callout>

      <DoDont
        doItem="Offer guided fitment only where it's genuinely hard, ask the fewest questions needed, and end on a narrowed list with the fit proven against the active vehicle."
        dontItem="Don't make it a checkout step, don't ask questions the active vehicle already answers, and don't strip the shell — nothing here commits."
      />

    </Section>
  );
}
window.FlowHelpMeChoose = FlowHelpMeChoose;
