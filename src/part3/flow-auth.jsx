// Part III · Flow — Sign in / register. A composed walkthrough that wires
// the Part II patterns together: modal↔sheet surface, field rows, the
// action hierarchy, and a result toast. Shown as an ordered strip of frames.

function FlowAuth() {
  return (
    <Section id="f-auth">
      <PatternHead category="Not ready" title="Sign in & register"
        lede="The lightest of the three flows. Auth never takes its own page on the web product — it rides the modal↔sheet pair so the user keeps their place in the catalogue. Here the surface, field rows, and action hierarchy from Part II combine into one short sequence." />

      <H3>The desktop sequence</H3>
      <p>Sign-in opens as a <b>modal</b> over wherever the user was. Email first, then password; an unknown email rolls forward into register rather than dead-ending. Success closes the modal and confirms with a <b>toast</b> — the page underneath never changed, so there&apos;s nowhere new to land.</p>
      <FrameRow>
        <FrameCell caption="<b>1 · Open.</b> Sign-in modal over the dimmed page.">
          <Browser url="autodoc.ex/catalog" h={300}>
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={200} /></div>
            <Modal title="Sign in" w={280}>
              <FieldRow label="Email" value="hans@web.de" />
              <div style={{ height: 8 }} />
              <FieldRow label="Password" value="••••••••" />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 9, color: "#6b6b6b", textDecoration: "underline" }}>Forgot?</span>
                <Btn tone="accent" size="sm">Sign in</Btn>
              </div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>2 · Unknown email.</b> Rolls forward into register, same surface.">
          <Browser url="autodoc.ex/catalog" h={300}>
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={200} /></div>
            <Modal title="Create account" w={280}>
              <FieldRow label="Email" value="new@web.de" />
              <div style={{ height: 8 }} />
              <FieldRow label="Password" value="" />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}><Btn tone="accent" size="sm">Create account</Btn></div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>3 · Done.</b> Modal closes; a toast confirms; the page is unchanged.">
          <Browser url="autodoc.ex/catalog" h={300}>
            <HeaderSpine />
            <div style={{ padding: 10 }}><Region label="Page — now signed in" h={200} /></div>
            <div style={{ position: "absolute", left: 12, bottom: 12 }}><Toast tone="good" action="Garage">Signed in as Hans</Toast></div>
          </Browser>
        </FrameCell>
      </FrameRow>

      <H3>The same flow on mobile-web</H3>
      <p>Identical steps, folded to the <b>bottom sheet</b>. The keyboard pins the action to the visible area; the validation error surfaces inline on the field, never as an alert.</p>
      <FrameRow>
        <FrameCell caption="<b>1 · Sheet.</b> The sign-in sheet rises over the page.">
          <MobileWeb url="autodoc.ex/catalog" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page behind" h={360} /></div>
            <MobileDrawer title="Sign in" height="56%">
              <FieldRow label="Email" value="hans@web.de" />
              <div style={{ height: 8 }} />
              <FieldRow label="Password" value="••••••••" />
              <div style={{ marginTop: 12 }}><Btn tone="accent" block>Sign in</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>2 · Inline error.</b> A wrong password shows on the field, not in an alert.">
          <MobileWeb url="autodoc.ex/catalog" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page behind" h={360} /></div>
            <MobileDrawer title="Sign in" height="56%">
              <FieldRow label="Email" value="hans@web.de" />
              <div style={{ height: 8 }} />
              <FieldRow label="Password" value="••••" error="Incorrect password" />
              <div style={{ marginTop: 12 }}><Btn tone="accent" block>Sign in</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>3 · Done.</b> Sheet dismisses; toast confirms above the nav.">
          <MobileWeb url="autodoc.ex/catalog" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="Page — signed in" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}><Toast tone="good">Signed in as Hans</Toast></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Callout label="Auth keeps your place">
        Because sign-in is a surface and not a page, the user returns to exactly where they were — the same product, the same scroll position. Never route auth through a full-page redirect that loses context.
      </Callout>

    </Section>
  );
}
window.FlowAuth = FlowAuth;
