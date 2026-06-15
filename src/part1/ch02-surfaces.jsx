function Ch02Surfaces() {
  return (
    <Section id="surfaces">
      <ChapterHead num="03" title="Surfaces"
        lede="The web has three kinds of surface instead of the mobile layers: the persistent shell, a small family of overlay surfaces, and the full-page commit. This chapter is about what kind of surface a thing is — separate from where it sits on the page — and knowing which it belongs to is the first design decision. There is no Corridor on web — its role is filled by the full-page commit. Each surface also declares how it behaves with the back button and the URL — navigation is a property of the surface, not a separate system." />

      <H3>Shell — the persistent frame</H3>
      <p>The shell is always present. On desktop it is the top header (vehicle pill + search + region/language + sign-in + cart) with a collections nav strip beneath it, plus a footer. On mobile-web it is a compact header plus a bottom nav (Home / Catalog / Cart) — intentionally close to the native app. Everything else renders inside the shell, except the full-page commit, which removes it. Moving between shell pages pushes <b>real history</b>, so back returns to the previous page with its <b>scroll restored</b>; every page also opens directly from its URL — including the <b>active vehicle</b> it carries (<code>?car=</code> switches the car as a shareable <i>replace</i>, never flooding the back stack), so a deep link or a shared link lands on the exact view. What changes the URL is itself a surface decision: shell pages own a URL you can bookmark, share, and reload, overlays don't — get it wrong and the back button becomes a trap.</p>
      <FrameRow>
        <FrameCell caption="<b>The shell wraps everything.</b> Header + collections strip on top, footer at the bottom; every page renders in the bounded middle.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <Region label="Page renders here" sub="list / detail / cart / garage" h={300} />
              <Region label="Footer" sub="mass links" h={40} />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web shell.</b> Compact header + bottom nav (Home / Catalog / Cart), close to the native app. Catalog is active, so the page is the collections-as-tabs screen, ending in the footer. Only the full-page commit removes the shell.">
          <MobileWeb url="autodoc.ex/catalog" navActive="Catalog">
            <CatalogTabsContent footer />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Overlay surfaces</H3>
      <Rules items={[
        "<b>Centered modal &harr; bottom sheet</b> — one adaptive pair. <b>On desktop it is a centered modal; on mobile-web it is a bottom sheet.</b> Same content, same job, two presentations. Use it for confirmations, small forms, and focused pickers — most &quot;heavy&quot; transient work.",
        "<b>Full-screen sheet</b> — the heavy end of that spectrum. For focused-but-transient work that needs the whole small screen — <b>search</b>, a large picker — the bottom sheet grows to <b>full height</b>: a single-focus takeover that still <b>dismisses</b> with Cancel or back and commits nothing. It is the web's mobile analog of the app's corridor for transient focus — distinct from the full-page commit, which commits and removes the whole shell. Being an overlay, it simply <i>covers</i> the shell (header and nav), it never removes it.",
        "<b>Dropdown</b> — a popover anchored to a header control: the <b>account / profile menu</b>, a sort menu, the region/language picker — light, transient, tied to the button that opened it. A quick menu of choices or links; on mobile-web it folds to a bottom sheet.",
        "<b>Slide-over panel</b> — a full-height panel you work in, sliding in from a side edge. The two are the <b>garage</b> (from the <b>left</b>) and the <b>cart</b> (from the <b>right</b>). A slide-over is for content-rich panels (line items, the garage), not quick menus. On mobile-web it folds to a full page.",
        "<b>Inline expand</b> — disclosure in the flow of the page (accordion, expanding row). No overlay; the content grows in place.",
        "<b>Overlays don't touch history.</b> Opening a modal, sheet, dropdown, or slide-over pushes <i>no</i> history entry — the back button closes the open overlay first, then leaves the page. The full-page commit is the one exception: it is a real page, and its exit is gated by a confirm (below).",
      ]}/>
      <FrameRow>
        <FrameCell caption="<b>Centered modal (desktop).</b> A focused dialog over the dimmed page — confirmations, small forms, pickers.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 10 }}><Region label="Page (dimmed)" h={300} /></div>
            <Modal title="Title" w={280}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Skel w="90%" h={9} /><Skel w="65%" h={8} bg="#d8d8d8" />
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 4 }}>
                  <Btn tone="primary" size="sm">Action</Btn>
                </div>
              </div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Bottom sheet (mobile-web).</b> The same surface, the same job — slid up from the bottom edge instead of centered.">
          <MobileWeb url="autodoc.ex/catalog/roof-racks" nav={false}>
            <div style={{ padding: 8, opacity: 0.3 }}><Region label="Page (dimmed)" h={320} style={{ width: "auto" }} /></div>
            <MobileDrawer title="Title" height="48%">
              <Skel w="90%" h={9} /><Skel w="60%" h={8} bg="#d8d8d8" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto" }}>
                <Btn tone="primary" block>Action</Btn>
              </div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
        <FrameCell caption="<b>Full-screen sheet (mobile-web).</b> The heavy end of the same surface: for focused, transient work that needs the whole screen (search, a large picker) the sheet grows to full height, covering the shell. Dismissible by × or back; commits nothing.">
          <MobileWeb url="autodoc.ex" navActive="Catalog" overlay={
            <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: "-apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "30px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ececec", flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Title</span>
                <span style={{ fontSize: 16, lineHeight: 1, color: "#6b6b6b" }}>×</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 14 }}>
                <Skel w="90%" h={9} /><Skel w="60%" h={8} bg="#d8d8d8" style={{ marginTop: 8 }} />
                <div style={{ marginTop: "auto" }}><Btn tone="primary" block>Action</Btn></div>
              </div>
            </div>
          }>
            <div style={{ padding: 8 }}><Region label="Page behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Dropdown (desktop).</b> The account / profile menu — a popover anchored under the profile icon with a short list of links (orders, garage, region &amp; language, settings, sign out). Light, tied to its trigger.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 10 }}><Region label="Page" h={300} /></div>
            <AccountMenu />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same menu folds to a bottom sheet — the standard mobile form of a dropdown.">
          <MobileWeb url="autodoc.ex/catalog/roof-racks" navActive="Catalog">
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page (dimmed)" h={300} /></div>
            <MobileDrawer title="Profile" height="56%">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[110, 80, 96, 150, 90, 70].map((w, i) => (
                  <div key={i} style={{ padding: "13px 2px", borderBottom: i < 5 ? "1px solid #ececec" : "none" }}><Skel w={w} h={9} /></div>
                ))}
              </div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>The cart is a right slide-over</H3>
      <p>The cart isn't a quick menu — it's a panel you <i>work in</i>: edit quantities, read fitment, see the subtotal, and check out. So on desktop it is a <b>right slide-over</b> (opposite the garage on the left), not a dropdown; on mobile-web it is the full <b>Cart</b> page from the bottom nav. A light &ldquo;added ✓&rdquo; confirmation is a <b>toast</b>, not the cart surface.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A right slide-over over the dimmed page — line items with qty steppers, subtotal, Checkout, View basket.">
          <Browser url="autodoc.ex/catalog/roof-racks">
            <HeaderSpine />
            <CollectionsStrip />
            <div style={{ padding: 10 }}><Region label="Page (dimmed)" h={300} /></div>
            <CartDrawer items={4} total="269,19 €" />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The full Cart page from the bottom nav; subtotal + Checkout pinned above the shell.">
          <MobileWeb url="autodoc.ex/cart" navActive="Cart">
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 8, flex: 1, overflow: "hidden" }}>
                <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11, fontWeight: 700 }}>Cart · 4 items</span>
                <Region label="Line items" sub="qty steppers · remove" h={200} />
              </div>
              <div style={{ borderTop: "1px solid #ececec", background: "#fff", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 9, color: "#6b6b6b" }}>Subtotal</span>
                  <span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 12, fontWeight: 700 }}>269,19 €</span>
                </div>
                <Btn tone="primary" block>Checkout</Btn>
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Garage is a destination, not a layer</H3>
      <p>On mobile the garage is a whole persistent layer. On web it is <b>not a layer</b> — it is a destination, <b>opened from the vehicle pill</b> (which highlights while it's open) and deep-linkable at <code>/garage</code>. It is built as <b>tabs</b>: one side is a rail of the user's cars — <b>picking a tab selects that car at once</b> — and the other shows the selected car's detail (image, specs, mileage) and the note that the whole site is tuned to it, plus an Add slot. The web offers <b>two presentations</b> — neither is the default; pick by context.</p>

      <H4>1 · Slide-over panel</H4>
      <p>A dark panel from the side — the <b>full management</b> surface. On desktop it enters from the <b>left</b> (opposite the cart on the right); on mobile-web the same dark panel goes <b>full-cover</b> with its own × close.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Opened from the highlighted vehicle pill, the garage slides in from the left — car tabs on one side, the selected car's detail on the other.">
          <Browser url="autodoc.ex/garage">
            <HeaderSpine pillActive />
            <CollectionsStrip />
            <div style={{ padding: 10 }}><Region label="Page (dimmed)" h={300} /></div>
            <SideDrawer title="My garage" w={320} side="left" dark>
              <GarageTabs active={1} />
            </SideDrawer>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same dark garage covers the whole shell — header and bottom nav included — with its own × close.">
          <MobileWeb url="autodoc.ex/garage" navActive="Home" overlay={<GarageOverlay active={1} />}>
            <div style={{ padding: 8 }}><Region label="Catalog behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H4>2 · Inline collapsible block</H4>
      <p>The same garage can expand <b>in place, directly under the row that holds the vehicle pill</b> — under the header spine (above the collections strip) on desktop, under the vehicle-pill row on mobile-web. It <b>pushes content down</b> (no overlay); the header stays and part of the page shows below. The pill is highlighted while it's open, and it collapses back into the header — closest to the app's persistent feel, without becoming a layer.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop — interactive.</b> Click the vehicle pill to open / collapse the garage; click a car tab to switch the active car. It opens as a band under the header spine, above the collections strip, pushing the page down.">
          <GarageInlineDesktopDemo />
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — interactive.</b> Tap the vehicle pill to open / collapse; tap a tab to switch car. The block expands under the pill row — the header stays and part of the content shows below.">
          <GarageInlineMobileDemo />
        </FrameCell>
      </FrameRow>

      <H3>Full-page commit — the corridor's replacement</H3>
      <p>Some tasks need the whole canvas and no distraction. On web that is the <b>full-page commit</b>: a page with the shell removed — no header, no nav. Today this is Checkout, and it is a single page. On mobile-web this is the one place the bottom nav is truly <b>removed</b> — a full-screen sheet only <i>covers</i> it. It carries the discipline the mobile corridor had:</p>
      <Rules items={[
        "<b>One job, one primary CTA.</b> The page commits one thing; the primary action carries the verb that closes it.",
        "<b>Exit is never silent.</b> Browser-back (or an explicit close) on a full-page commit opens a &quot;Cancel checkout?&quot; dialog — the web analogue of the mobile discard sheet. User input is never dropped without consent.",
        "<b>Shell is removed, not covered.</b> The full-page commit replaces the shell for its duration, the way the corridor replaced the mobile stack; when it exits, the shell is restored where it was.",
      ]}/>
      <FrameRow>
        <FrameCell caption="<b>Desktop checkout.</b> The shell is gone — only a minimal secure bar remains. Steps on the left, a sticky order summary on the right, one primary CTA.">
          <Browser url="autodoc.ex/checkout">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #ececec", fontFamily: "-apple-system, sans-serif" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>AUTODOC</span>
                <span style={{ fontSize: 10, color: "#9a9a9a" }}>· Secure checkout</span>
              </span>
              <span style={{ fontSize: 11, color: "#9a9a9a" }}>✕ Cancel</span>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <Region label="1 · Contact & address" h={66} />
                  <Region label="2 · Delivery method" h={66} />
                  <Region label="3 · Payment" h={66} />
                </div>
                <div style={{ width: 200, flexShrink: 0, border: "1px solid #d8d8d8", borderRadius: 10, background: "#fff", padding: 12, display: "flex", flexDirection: "column", gap: 7, fontFamily: "-apple-system, sans-serif" }}>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>Order summary</span>
                  <Region label="3 items" h={54} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#6b6b6b" }}><span>Subtotal</span><span>269,19 €</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#6b6b6b" }}><span>Shipping</span><span>Free</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, borderTop: "1px solid #ececec", paddingTop: 6 }}><span>Total</span><span>269,19 €</span></div>
                  <Btn tone="primary" block>Place order</Btn>
                </div>
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web checkout.</b> The one place the shell — bottom nav included — is removed (a full-screen sheet only covers it). Summary collapses to the top; Place order sits at the bottom. Browser-back is gated behind a “Cancel checkout?” confirm.">
          <MobileWeb url="autodoc.ex/checkout" nav={false} header={false}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid #ececec", fontFamily: "-apple-system, sans-serif", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>Secure checkout</span>
                <span style={{ fontSize: 10, color: "#9a9a9a" }}>✕</span>
              </div>
              <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 7, flex: 1, overflow: "hidden" }}>
                <Region label="Order summary" sub="3 items · 269,19 €" h={34} />
                <Region label="1 · Contact & address" h={46} />
                <Region label="2 · Delivery method" h={42} />
                <Region label="3 · Payment" style={{ flex: 1, width: "auto" }} />
              </div>
              {/* CTA pinned above the home indicator, always visible */}
              <div style={{ borderTop: "1px solid #ececec", background: "#fff", padding: "10px 10px", flexShrink: 0 }}>
                <Btn tone="primary" block>Place order — 269,19 €</Btn>
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Picking a surface</H3>
      <Callout label="Decision rule">
        <b>(1)</b> Confirmation or a small form? — <b>modal (desktop) / bottom sheet (mobile)</b>. <b>(2)</b> A quick menu of links or choices tied to a header button (account, sort, language)? — <b>dropdown</b>. <b>(3)</b> A content-rich side panel you work in, like the <b>cart</b> (right) or the <b>garage</b> (left)? — <b>slide-over</b>. <b>(4)</b> Detail that belongs in the reading flow? — <b>inline expand</b>. <b>(5)</b> A single-shot commit that deserves the whole screen? — <b>full-page commit</b>.
      </Callout>

      <DoDont
        doItem="Pair every modal with its mobile bottom sheet — one surface, two forms. Make the cart a right slide-over and the garage a left slide-over (or its inline collapsible block). Reserve the full-page commit for true single-shot commits and always gate its exit behind a confirm."
        dontItem="Don't make the cart a dropdown or rebuild the garage as a permanent always-on layer, and don't stack a drawer over a modal — pick the lightest surface that fits."
      />
    </Section>
  );
}
window.Ch02Surfaces = Ch02Surfaces;
