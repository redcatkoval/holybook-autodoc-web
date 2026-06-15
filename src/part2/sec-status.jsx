// Part II · Status — four separate patterns, mirroring the app book's
// "Status" group: Loading, Empty states, Errors, Optimistic & undo. Each is
// its own Section. (Context menus moved to the "Actions on items" group.)
// Desktop-only previews; the mobile-web form mirrors the app book.

// Compact dark header for narrow desktop frames — HeaderSpine needs the full
// 760 and clips when squeezed, so these page-level previews use this stub.
function MiniHeader() {
  return (
    <div style={{ height: 34, background: "#111", display: "flex", alignItems: "center", padding: "0 12px" }}>
      <span style={{ color: "#fff", fontWeight: 800, fontSize: 11, letterSpacing: "1px", fontFamily: "-apple-system, sans-serif" }}>AUTODOC</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Loading  (skeletons, not spinners)
// ════════════════════════════════════════════════════════════════════════
function PatLoading() {
  return (
    <Section id="p-loading">
      <PatternHead category="Status" title="Loading"
        lede="Every wait is a question the user didn't ask. Indeterminate indicators answer it — yes, something is happening; no, it isn't broken. Three families cover almost every wait: skeletons for first loads, button preloaders for clicks that talk to the server, and in-place spinners for activity inside an existing row." />

      <Callout label="Autodoc reading">
        The app prefers shaped, indeterminate loading over a spinning whole screen, and the web follows. A skeleton is a promise about the layout to come — same grid, same proportions — so the arrival is a fill, not a reflow. The spinner survives only inside a control that's working: a submitting button, an inline refresh. The page itself never spins — and when a load <i>fails</i>, it follows the error taxonomy (a non-blocking toast if content is still on screen, a hard container error if there's nothing to fall back on).</Callout>

      <H3>Three families</H3>
      <p>Each indicator lives at a different scope — the whole screen, the button that triggered the wait, or the row where the work is happening. Pick by where the activity is, not by how loud you want to be.</p>
      <FrameRow>
        <FrameCell caption="<b>Skeleton — whole screen.</b> A low-fidelity outline filled with grey placeholders during the first load, mirroring the real structure. First load only; refreshes use a spinner, never a flash of grey blocks.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ padding: 12, display: "flex", gap: 12 }}>
              <div style={{ width: 130 }}><Skel h={150} /></div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ border: "1px solid #ececec", borderRadius: 8, padding: 8 }}><Skel h={44} /><div style={{ height: 6 }} /><Skel w="70%" h={7} /><div style={{ height: 4 }} /><Skel w="40%" h={7} /></div>
                ))}
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Same skeletons, single column.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", gap: 10, border: "1px solid #ececec", borderRadius: 8, padding: 8 }}><Skel w={44} h={44} /><div style={{ flex: 1 }}><Skel w="70%" h={8} /><div style={{ height: 6 }} /><Skel w="40%" h={7} /></div></div>
              ))}
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Button preloader — inside the trigger.</b> The button that started the wait is the single point of feedback: a spinner replaces the label until it resolves. The rest of the screen stays interactive. For local commits (save, confirm, pay).">
          <Browser url="autodoc.ex/checkout">
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
              <Region label="Form" h={120} />
              <div style={{ height: 38, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", display: "inline-block" }} />
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same button preloader, full-width.">
          <MobileWeb url="autodoc.ex/checkout" navActive="Catalog">
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              <Region label="Form" h={120} />
              <div style={{ height: 38, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", display: "inline-block" }} />
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>In-place spinner — inside the row.</b> When the work belongs to one row, its chevron becomes a spinner while other rows stay alive; a checkmark replaces it on success.">
          <Browser url="autodoc.ex/garage">
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
              {[["spinner"], ["check"], ["chev"]].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #ececec", borderRadius: 8, fontFamily: "-apple-system, sans-serif" }}>
                  <div style={{ flex: 1 }}><Skel w="55%" h={8} /></div>
                  {s[0] === "spinner" && <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #d8d8d8", borderTopColor: "#111", display: "inline-block" }} />}
                  {s[0] === "check" && <span style={{ color: "#2e7d32", fontSize: 13, fontWeight: 800 }}>✓</span>}
                  {s[0] === "chev" && <span style={{ color: "#9a9a9a", fontSize: 13 }}>›</span>}
                </div>
              ))}
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same in-place spinner inside a row.">
          <MobileWeb url="autodoc.ex/garage" navActive="Catalog">
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {[["spinner"], ["check"], ["chev"]].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #ececec", borderRadius: 8, fontFamily: "-apple-system, sans-serif" }}>
                  <div style={{ flex: 1 }}><Skel w="55%" h={8} /></div>
                  {s[0] === "spinner" && <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #d8d8d8", borderTopColor: "#111", display: "inline-block" }} />}
                  {s[0] === "check" && <span style={{ color: "#2e7d32", fontSize: 13, fontWeight: 800 }}>✓</span>}
                  {s[0] === "chev" && <span style={{ color: "#9a9a9a", fontSize: 13 }}>›</span>}
                </div>
              ))}
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>When a load fails</H3>
      <p>Loading sometimes doesn't arrive. Two cases come up most: when previous content is still on screen, a non-blocking <b>toast</b> acknowledges the failure with a quiet Retry; when there's nothing to fall back on, a <b>hard container</b> error replaces the body with its own Retry. The page keeps its header either way — the user can always navigate away.</p>
      <FrameRow>
        <FrameCell caption="<b>Non-blocking failure.</b> Previous content is still on screen; a toast at the bottom announces the refresh failed with a quiet Retry. The user can tap it, ignore it, or reload.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ padding: 12 }}><Region label="Cached content (still usable)" h={330} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t refresh</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same toast, centred above the bottom nav.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="Cached content" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t refresh</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Hard container failure.</b> No content to fall back on. The skeleton is replaced by a centred error with a single Retry; the header stays so the user can navigate away.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 8, textAlign: "center", padding: 16, fontFamily: "-apple-system, sans-serif" }}>
              <span style={{ width: 46, height: 42, borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800 }}>!</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>Couldn&apos;t load this list</span>
              <span style={{ fontSize: 10, color: "#6b6b6b", maxWidth: 220 }}>Check your connection and try again.</span>
              <Btn tone="primary">Retry</Btn>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same hard error, header kept.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 340, gap: 8, textAlign: "center", padding: 16, fontFamily: "-apple-system, sans-serif" }}>
              <span style={{ width: 44, height: 40, borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800 }}>!</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>Couldn&apos;t load this list</span>
              <span style={{ fontSize: 10, color: "#6b6b6b", maxWidth: 200 }}>Check your connection and try again.</span>
              <Btn tone="primary">Retry</Btn>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Indeterminate by default.</b> A fake bar stuck at 90% is worse than an honest spinner; determinate progress only when the work has a measurable end (uploads, downloads).",
        "<b>The indicator lives where the work lives.</b> Whole screen → skeleton; the button clicked → button preloader; a single row → in-place spinner. Don't move the feedback away from the thing the user waits on.",
        "<b>One indicator per surface.</b> A screen full of spinners reads as broken — one skeleton or one bar, not five spinners stacked.",
        "<b>Failures don't strand the user.</b> A non-blocking load failure is a toast with a quiet Retry; a dead container is a hard error with its own Retry. The page keeps its header.",
      ]}/>

      <DoDont
        doItem="Show a skeleton while products load, keep the spinner inside the control that's working, and make a failed load loud-but-recoverable."
        dontItem="Don't spin the whole page over cached content, don't stack five spinners, and don't strand a failed load with no Retry."
      />

    </Section>
  );
}
window.PatLoading = PatLoading;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Empty states
// ════════════════════════════════════════════════════════════════════════
function PatEmpty() {
  return (
    <Section id="p-empty">
      <PatternHead category="Status" title="Empty states"
        lede="Every container has an empty case — empty cart, no garage yet, no search results, no saved addresses. Three triggers cover them all: first-time (never had anything), filtered (results don't match), after-action (the user just emptied it). An empty state isn't a blank screen — it's a deliberate composition: a quiet graphic, a human-language title, one line of context, and one primary CTA pointing at the most useful next action." />

      <Callout label="Autodoc reading">
        The app treats empty as content; the web keeps that. The empty state lives <b>in the container that's empty</b> — the cart panel, the results region, the page body — never a separate layer (the web has none). The <b>trigger</b> decides the copy and the CTA but never the structure: a genuinely empty collection invites a first action, a no-match result offers to relax the constraint, an after-action confirms softly. Always one button — never two, never none.</Callout>

      <H3>Three triggers — same skeleton, different reason</H3>
      <p>The trigger decides the copy and the CTA; the anatomy (graphic · title · one line · one CTA) never changes.</p>
      <FrameRow>
        <FrameCell caption="<b>First-time.</b> Never had anything here. Encouraging copy teaching what will live here once they act; the CTA invites the first action.">
          <Browser url="autodoc.ex/saved">
            <HeaderSpine />
            <EmptyState title="Nothing saved yet" line="Items you save show up here, tied to your active vehicle." cta="Browse catalog" />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same first-time empty, full-width.">
          <MobileWeb url="autodoc.ex/saved" navActive="Catalog">
            <EmptyState title="Nothing saved yet" line="Items you save show up here, tied to your active vehicle." cta="Browse catalog" />
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Filtered.</b> Empty because of a filter or query. The CTA removes the cause — never broaden the search silently; let the user choose.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <EmptyState title="No matches" line="No results for this filter on your selected car." cta="Clear filters" />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same no-match state, full-width.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <EmptyState title="No matches" line="No results for this filter on your selected car." cta="Clear filters" />
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>After-action.</b> The user just emptied it themselves. Soft confirmation in the copy; the CTA offers a useful follow-up.">
          <Browser url="autodoc.ex/cart">
            <HeaderSpine />
            <EmptyState title="Cart cleared" line="Your cart is empty. Keep browsing parts that fit your car." cta="Keep shopping" />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same after-action state, full-width.">
          <MobileWeb url="autodoc.ex/cart" navActive="Catalog">
            <EmptyState title="Cart cleared" line="Your cart is empty. Keep browsing parts that fit your car." cta="Keep shopping" />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Never blank.</b> Every container that can be empty has a designed empty state — graphic, title, copy, CTA. No silent screens.",
        "<b>Title in human language.</b> «No orders yet», not «No data found»; two plain lines on why and what changes it. Empty is a state, not an error.",
        "<b>One CTA, the most useful next action.</b> A secondary path, if needed, is a text button beneath. When the cause is a filter, the CTA removes that filter — never broaden the search silently.",
        "<b>Lives in its container.</b> The empty state fills the region that would have held content — the cart panel, the results area, the page body — not a separate screen and not a layer.",
      ]}/>

      <DoDont
        doItem="Treat each empty state as a designed view — quiet graphic, plain title, two-line context, one CTA — picking the icon and CTA per container while keeping the layout identical."
        dontItem="Don't show generic «No data found» blanks, don't stack two equal CTAs, and don't broaden a search silently."
      />

    </Section>
  );
}
window.PatEmpty = PatEmpty;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Errors
// ════════════════════════════════════════════════════════════════════════
function PatErrors() {
  return (
    <Section id="p-errors">
      <PatternHead category="Status" title="Errors"
        lede="Every screen has a happy path and at least three unhappy ones. Errors are designed states, not afterthoughts — and the surface that carries one is picked by severity and by where the user is. Four flavours cover almost every case: a non-blocking toast, an inline field error, a system alert, and a hard container replacement." />

      <Callout label="Autodoc reading">
        The app's errors are plain-language and actionable; the web matches. Each flavour carries the same three blocks — a <b>signal</b> the eye reads as «error», a <b>message</b> in plain language («Plate must be 6 characters», not «Invalid input»), and an <b>action</b> where the surface has room. Toast is the lightest, the hard container the heaviest; the colour is always the app's red, and there's always a next move.</Callout>

      <H3>Lighter — toast &amp; inline</H3>
      <p>Failures that don't block the flow. A background blip becomes a non-blocking toast; a bad input is corrected where it was typed — never a modal for an input error.</p>
      <FrameRow>
        <FrameCell caption="<b>Toast — non-blocking.</b> A background refresh or autosave failed. The user ignores it or taps a quiet Retry; the flow underneath isn't blocked, cached content keeps rendering.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ padding: 12 }}><Region label="Content (still usable)" h={330} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t save changes</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same toast, above the bottom nav.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="Content" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t save changes</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Inline — field level.</b> An outline on the offending field, one line of plain explanation under it, the primary disabled until fixed. For form validation — the fix lives where the typing happened.">
          <Browser url="autodoc.ex/form">
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, maxWidth: 360 }}>
              <FieldRow label="Email" value="hans@web" error="Enter a valid email address" />
              <FieldRow label="Postcode" value="10115" />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same inline field error, full-width.">
          <MobileWeb url="autodoc.ex/form" navActive="Catalog">
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <FieldRow label="Email" value="hans@web" error="Enter a valid email address" />
              <FieldRow label="Postcode" value="10115" />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Heavier — alert &amp; hard container</H3>
      <p>Failures the user must answer, or that take the whole region down. A must-answer failure is a centred system alert — the same weight on desktop and mobile; a dead container is replaced wholesale by the error, the shell around it intact.</p>
      <FrameRow>
        <FrameCell caption="<b>System alert — must answer.</b> A critical operation failed and the user must decide before continuing — payment declined, account locked. A centred card with two text buttons: Cancel left (safe default), the action right in error red. Tap-outside doesn't dismiss.">
          <Browser url="autodoc.ex/checkout">
            <HeaderSpine />
            <div style={{ padding: 10, opacity: 0.35 }}><Region label="Page" h={350} /></div>
            <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 280, background: "#fff", borderRadius: 12, padding: 18, fontFamily: "-apple-system, sans-serif", textAlign: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>Payment failed</span>
                <div style={{ fontSize: 11, color: "#6b6b6b", margin: "8px 0 14px", lineHeight: 1.4 }}>We couldn&apos;t charge your card. The order has not been placed.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn tone="ghost" block style={{ color: "#6b6b6b" }}>Cancel</Btn>
                  <Btn tone="danger" block>Try again</Btn>
                </div>
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same centred alert — destructive weight is identical at every size.">
          <MobileWeb url="autodoc.ex/checkout" navActive="Catalog">
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page" h={300} /></div>
            <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
              <div style={{ width: "100%", background: "#fff", borderRadius: 12, padding: 16, fontFamily: "-apple-system, sans-serif", textAlign: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>Payment failed</span>
                <div style={{ fontSize: 10.5, color: "#6b6b6b", margin: "8px 0 14px", lineHeight: 1.4 }}>We couldn&apos;t charge your card.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn tone="ghost" block style={{ color: "#6b6b6b" }}>Cancel</Btn>
                  <Btn tone="danger" block>Try again</Btn>
                </div>
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Hard container — full replacement.</b> A service is down, a page can't fetch its data. The body is replaced by the error composition; the shell around it stays — the user is still in the app, just this room is closed.">
          <Browser url="autodoc.ex/product">
            <HeaderSpine />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 8, textAlign: "center", padding: 16, fontFamily: "-apple-system, sans-serif" }}>
              <span style={{ width: 46, height: 42, borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800 }}>!</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>Couldn&apos;t load this page</span>
              <span style={{ fontSize: 10, color: "#6b6b6b", maxWidth: 220 }}>Something went wrong on our end. Try again in a moment.</span>
              <Btn tone="primary">Retry</Btn>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same hard container, shell kept.">
          <MobileWeb url="autodoc.ex/product" navActive="Catalog">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 340, gap: 8, textAlign: "center", padding: 16, fontFamily: "-apple-system, sans-serif" }}>
              <span style={{ width: 44, height: 40, borderRadius: 10, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800 }}>!</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>Couldn&apos;t load this page</span>
              <span style={{ fontSize: 10, color: "#6b6b6b", maxWidth: 200 }}>Something went wrong on our end.</span>
              <Btn tone="primary">Retry</Btn>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Never silent.</b> Every failure produces a visible state — toast, inline, alert, or full container. The user always knows what happened and what they can do.",
        "<b>Pick the surface by whether the user must respond.</b> Must answer to continue → a centred system alert. Non-blocking → a toast. Form input → inline. Container is dead → a full-region replacement.",
        "<b>Always a path forward.</b> Inline collapses into the field above; toasts offer an optional Retry; alerts and hard containers carry an explicit action.",
        "<b>Don't blame the user; plain language.</b> Say what's expected, what failed, what to try — «Plate must be 6 characters», not «Invalid input», and never «Error 503».",
      ]}/>

      <DoDont
        doItem="Pick the surface by whether the user must respond — toast for non-blocking, inline for input, a system alert for must-answer, hard only when the container is dead — and end every error that has room with a clear next step."
        dontItem="Don't escalate every failure to an alert, don't write «Something went wrong» with no next step, don't promote a form-validation error to a modal, and don't ship an error with no path forward."
      />

    </Section>
  );
}
window.PatErrors = PatErrors;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Optimistic & undo
// ════════════════════════════════════════════════════════════════════════
function PatUndo() {
  return (
    <Section id="p-undo">
      <PatternHead category="Status" title="Optimistic &amp; undo"
        lede="An optimistic action applies the change in the UI immediately — the row vanishes, the item is archived — and offers a short window to take it back via a toast with Undo. The user feels the speed of an action not yet confirmed by the server, and the safety of a reversal one click away. Reserved for reversible actions only — removing from a cart, a list, a wishlist." />

      <Callout label="Autodoc reading">
        The app applies reversible edits optimistically and offers undo through a snackbar; the web does the same with a <b>toast</b>. The pairing is the whole point: optimism without undo is just risk, a confirm dialog on every reversible action is just friction. This is about <b>removing things</b> from a list — not about leaving a flow: exiting checkout is a deliberate «Cancel checkout?» confirm, never an optimistic dismiss.</Callout>

      <H3>Two cycles</H3>
      <p>Same principle, two outcomes — the happy path, and the path the server rejects.</p>
      <FrameRow>
        <FrameCell caption="<b>Apply → Undo.</b> The row removes immediately and a toast appears with Undo. Tap Undo within the window and the row returns to its place; ignore it and the removal commits.">
          <Browser url="autodoc.ex/cart">
            <HeaderSpine />
            <div style={{ padding: 16 }}><Region label="List — item removed at once" h={330} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" }}>
              <Toast action="Undo">Item removed</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same optimistic remove, toast above the nav.">
          <MobileWeb url="autodoc.ex/cart" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="List — item removed" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
              <Toast action="Undo">Item removed</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Server failure → auto-rollback.</b> The row removed immediately; the server rejects. The row returns to its place on its own and the toast swaps to «Couldn't remove · Retry» — the recovery is Retry, not Undo (the change is already reversed).">
          <Browser url="autodoc.ex/cart">
            <HeaderSpine />
            <div style={{ padding: 16 }}><Region label="List — row restored" h={330} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t remove</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same rollback, toast swapped to Retry.">
          <MobileWeb url="autodoc.ex/cart" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="List — row restored" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
              <Toast action="Retry">Couldn&apos;t remove</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Apply visually first, sync second.</b> The change lands the moment the user clicks — no spinner between click and result; server confirmation happens in the background.",
        "<b>Every optimistic action carries an Undo window.</b> A short reversal window opens with the action and closes on its own; click Undo within it to reverse, ignore it and it commits.",
        "<b>Server failure auto-rolls back — never silently.</b> The UI reverts on its own; a toast explains what failed, and the recovery is Retry, not Undo (the change is already reversed).",
        "<b>One at a time.</b> A new optimistic action replaces the previous and resets the window; Undo always applies to the most recent action.",
        "<b>Reversible actions only.</b> Remove, archive, dismiss, mark-read — yes. Payment, account deletion, anything irreversible — no; that's a confirm dialog.",
      ]}/>

      <DoDont
        doItem="Use optimistic UI for «Remove from cart» — the row disappears the moment the user clicks ✕, a toast offers Undo for a few seconds. The cart feels fast and the safety net stays."
        dontItem="Don't apply optimistic UI to payment — «Paid» that needs undoing is a refund, not Undo. The shorter the path between click and irreversibility, the less optimistic it should be."
      />

    </Section>
  );
}
window.PatUndo = PatUndo;
