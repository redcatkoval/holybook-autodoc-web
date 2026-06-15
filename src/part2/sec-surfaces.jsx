// Part II · Surfaces — five separate patterns, mirroring the app book's
// "Surfaces" group: Modal views, Dialogs & alerts, Snackbars, Infoblocks,
// Final screens. Each is its own Section. No personalisation — generic
// content, app palette and app buttons only.

// ── shared bits ───────────────────────────────────────────────────────────
function AlertDialog({ title = "Delete this item?", body = "This action can't be undone.", confirm = "Delete" }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
      <div style={{ width: 260, background: "#fff", borderRadius: 12, padding: 18, fontFamily: "-apple-system, sans-serif", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 10.5, color: "#6b6b6b", lineHeight: 1.5, marginBottom: 16 }}>{body}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn tone="ghost" size="sm" style={{ color: "#6b6b6b" }}>Cancel</Btn>
          <Btn tone="danger" size="sm">{confirm}</Btn>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Modal views  (centred modal on desktop ↔ bottom sheet on mobile)
// ════════════════════════════════════════════════════════════════════════
function PatModal() {
  return (
    <Section id="p-modal">
      <PatternHead category="Surfaces" title="Modal views"
        lede="A focused task lifted out of the page without leaving it. On desktop it is a centred modal over a dimmed page; on mobile-web the very same task arrives as a bottom sheet — one adaptive surface, never shown at once. It holds a single goal: usually one step (edit a value, pick a variant, confirm), but it may run a short wizard of a few steps when the goal needs them — as long as nothing commits and the user can still leave." />

      <Callout label="Autodoc reading">
        The app presents a focused task as a sheet that rises from the bottom. The web keeps that on small screens but, on desktop, the same task is a centred card — there is room to overlay rather than slide. The rule that carries across: a modal view is for <b>one contained goal</b> — one step or a short guided sequence — it dims what's behind it, <b>commits nothing</b>, and returns the user exactly where they were. Anything irreversible or sprawling belongs in the full-page commit instead.
      </Callout>

      <H3>Centred modal ↔ bottom sheet</H3>
      <p>The desktop modal and the mobile sheet carry identical content and the same single primary. The page behind stays — dimmed, scrollable-locked — so the task reads as a layer, not a new place.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A centred modal over the dimmed page; one primary action.">
          <Browser url="autodoc.ex/account">
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={400} /></div>
            <Modal title="Title" w={300}>
              <Skel w="90%" h={9} /><Skel w="65%" h={8} bg="#d8d8d8" style={{ marginTop: 8 }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}><Btn tone="primary" size="sm">Action</Btn></div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The identical task arrives as a bottom sheet.">
          <MobileWeb url="autodoc.ex/account" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page behind" h={360} /></div>
            <MobileDrawer title="Title" height="48%">
              <Skel w="90%" h={9} /><Skel w="60%" h={8} bg="#d8d8d8" style={{ marginTop: 8 }} />
              <div style={{ marginTop: "auto" }}><Btn tone="primary" block>Action</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>One goal, a few steps — a short wizard</H3>
      <p>When the goal needs them, the same surface runs a <b>short wizard</b>: one question per step, a <b>back arrow by the title</b> to step back, and Continue to advance. It is still <b>one goal</b> and it <b>commits nothing</b>. On mobile-web the wizard takes the <b>full screen</b>. A long or committing process is the full-page commit, not this.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A short wizard inside the modal: a back arrow by the title, one question, Continue to advance.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={400} /></div>
            <Modal title="Guided picker" w={300} back>
              <Skel w="60%" h={9} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 8, border: i === 0 ? "1px solid #111" : "1px solid #d8d8d8", background: i === 0 ? "#f1f0ed" : "#fff" }}>
                    <Skel w={90 + i * 14} h={7} bg={i === 0 ? "#111" : "#d8d8d8"} />
                    {i === 0 && <span style={{ color: "#111", fontSize: 11 }}>✓</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <Btn tone="primary" size="sm">Continue</Btn>
              </div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same wizard as a full-screen modal: back arrow by the title, one question, Continue at the foot.">
          <MobileWeb url="autodoc.ex/list" header={false} nav={false}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #ececec", flexShrink: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, lineHeight: 1, color: "#111" }}>‹</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Guided picker</span>
                </span>
                <span style={{ fontSize: 16, lineHeight: 1, color: "#9a9a9a" }}>×</span>
              </div>
              <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column" }}>
                <Skel w="60%" h={9} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 8, border: i === 0 ? "1px solid #111" : "1px solid #d8d8d8", background: i === 0 ? "#f1f0ed" : "#fff" }}>
                      <Skel w={90 + i * 14} h={7} bg={i === 0 ? "#111" : "#d8d8d8"} />
                      {i === 0 && <span style={{ color: "#111", fontSize: 11 }}>✓</span>}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "auto" }}><Btn tone="primary" block>Continue</Btn></div>
              </div>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One goal per modal.</b> A modal holds a single contained goal — usually one step, but it may run a short guided wizard of a few steps when the goal needs it.",
        "<b>It commits nothing and stays dismissible.</b> If the task is irreversible or sprawls into many screens, it belongs in the full-page commit, not an overlay.",
        "<b>Desktop centres, mobile rises.</b> Same content, same primary; only the placement adapts.",
        "<b>The page stays behind.</b> Dim it and lock its scroll; the modal is a layer, not a destination.",
      ]}/>

      <DoDont
        doItem="Use one adaptive surface — centred modal on desktop, bottom sheet on mobile — for a single goal: one step or a short wizard, with a clear primary and a way back."
        dontItem="Don't stack modals, don't pour a long or committing flow into an overlay (that is the full-page commit), and don't show a modal and a sheet as if they were different patterns."
      />

    </Section>
  );
}
window.PatModal = PatModal;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Dialogs & alerts  (blocking confirm, alert, action sheet)
// ════════════════════════════════════════════════════════════════════════
function PatDialogs() {
  return (
    <Section id="p-dialogs">
      <PatternHead category="Surfaces" title="Dialogs &amp; alerts"
        lede="The blocking layer — a dialog interrupts on purpose to demand a decision. On web we pick its form by STAKES, not by surface: a destructive or irreversible choice is a centred modal at every size; a soft, reversible confirm adapts to a sheet on mobile; and a cheap, cleanly-reversible action skips the dialog entirely — do it and offer Undo." />

      <Callout label="Autodoc reading">
        The app splits dialogs by <i>surface</i> — because the app itself is a sheet, only a centred system alert can rise over it; sheet-shaped forms stay inside fullscreen flows. The web has <b>no sheet-surface</b>, so that constraint is gone and we split by <b>stakes</b> instead: high → a centred modal on every size; low → a sheet, or no dialog at all. The destructive action carries the app's red; Cancel is the safe default.
      </Callout>

      <H3>Destructive → a centred modal, at every size</H3>
      <p>A destructive or irreversible choice gets a small, centred, <b>blocking</b> card — the same weight on desktop and mobile, <b>not</b> a dismissible sheet. Tap-outside does <b>not</b> close it; <b>Cancel is the safe default</b> and the destructive action is red. Same surface on both, so the &ldquo;this is serious&rdquo; signal never softens.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A centred confirm: quiet Cancel + red destructive action; tap-outside disabled.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={400} /></div>
            <AlertDialog />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The very same centred modal — not a bottom sheet. A destructive choice keeps its weight on the phone.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog" overlay={<AlertDialog />}>
            <div style={{ padding: 8 }}><Region label="Page behind" h={300} /></div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Soft confirm → modal ↔ sheet</H3>
      <p>A low-stakes, reversible decision is lighter: a centred modal on desktop, a <b>bottom sheet</b> on mobile-web — the modal↔sheet pair. It is dismissible (click-away / swipe-down), and its primary is <b>not</b> red.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A soft confirm as a centred modal; Cancel + a non-red primary.">
          <Browser url="autodoc.ex/account">
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={400} /></div>
            <Modal title="Title" w={280}>
              <Skel w="90%" h={9} /><Skel w="60%" h={8} bg="#d8d8d8" style={{ marginTop: 8 }} />
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
                <Btn tone="ghost" size="sm">Cancel</Btn><Btn tone="primary" size="sm">Confirm</Btn>
              </div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same soft confirm as a bottom sheet; dismissible by swipe or ×.">
          <MobileWeb url="autodoc.ex/account" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page behind" h={360} /></div>
            <MobileDrawer title="Title" height="46%">
              <Skel w="90%" h={9} /><Skel w="60%" h={8} bg="#d8d8d8" style={{ marginTop: 8 }} />
              <div style={{ marginTop: "auto" }}><Btn tone="primary" block>Confirm</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Destructive → a centred modal, at every size.</b> Blocking, dismissed only by an explicit choice — the same weight on desktop and mobile.",
        "<b>Soft confirms adapt.</b> A low-stakes, reversible decision is a centred modal on desktop and a bottom sheet on mobile; dismissible, primary not red.",
        "<b>Cleanly reversible &amp; cheap → no dialog.</b> Do it and offer Undo in a toast; reserve the modal for real loss or unguaranteed undo.",
        "<b>Don't gate trivia.</b> A qty change or a toggle isn't destructive — never wrap it in a dialog.",
      ]}/>

      <DoDont
        doItem="Default a destructive choice to a centred confirm modal at every size — red action, safe Cancel, tap-outside disabled — and use Undo instead only when the action is cleanly reversible."
        dontItem="Don't soften a destructive confirm into a dismissible sheet on mobile, and don't interrupt trivial or routine actions a toast could carry."
      />

    </Section>
  );
}
window.PatDialogs = PatDialogs;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Snackbars  (non-blocking transient notice)
// ════════════════════════════════════════════════════════════════════════
function PatSnackbar() {
  return (
    <Section id="p-snackbar">
      <PatternHead category="Surfaces" title="Toast (snackbar)"
        lede="The non-blocking notice. A toast (the app's snackbar) reports the result of a background action without stealing focus or the cursor — it carries at most one action and retires on its own. It is the everyday face of one rule: the system is never silent. It is centred at the bottom on every size, clear of the bottom nav on mobile-web." />

      <Callout label="Autodoc reading">
        The app calls this a <b>snackbar</b>; on the web the established term is <b>toast</b> — we lead with Toast and keep snackbar in parentheses, the concept shared and the word following each platform. It is <i>not</i> a &ldquo;notification&rdquo;: on the web that means a persistent or push notification (a notification centre, a browser push), a different surface. A toast is transient, inline, and fades on its own; its single action makes optimistic deletes safe. Above all it serves one rule — <b>the system is never silent</b>: every meaningful background action gets a visible answer, and a toast is the minimum; a save, a send, a remove, a failed sync never succeed or fail silently.
      </Callout>

      <H3>Four variants</H3>
      <p>Same strip, four jobs — matching the app: a plain confirmation, one with an action, a persistent one with an explicit close, and one with a visible countdown when the Undo window matters.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "16px 0 8px" }}>
        {[
          ["Plain — no action; auto-dismisses. Confirmations the user needn't act on (Saved, Sent, Done).", <Toast>Saved</Toast>],
          ["With action — a single Undo / Retry / View; auto-dismisses unless tapped.", <Toast action="Undo">Item removed</Toast>],
          ["Persistent — action + × ; stays until acted on, closed, or swiped. For events the app mustn't lose to auto-dismiss (resume a flow).", <Toast action="Resume" close>Draft saved</Toast>],
          ["Countdown — a ring shows the remaining seconds of the Undo window; an × replaces it when it ends.", <Toast action="Undo" timer={3}>Item removed</Toast>],
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 210, flexShrink: 0 }}>{row[1]}</div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5, color: "#6b6b6b", lineHeight: 1.4 }}>{row[0]}</span>
          </div>
        ))}
      </div>

      <H3>Placement — centred at the bottom</H3>
      <p>Both desktop and mobile-web centre it at the bottom of the viewport; on mobile-web it sits above the bottom nav so it never hides behind the nav or under a thumb.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Centred at the bottom with a single Undo action.">
          <Browser url="autodoc.ex/list">
            <HeaderSpine />
            <div style={{ padding: 10 }}><Region label="Page" h={400} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" }}>
              <Toast action="Undo">Item removed</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Centred above the bottom nav, clear of thumbs.">
          <MobileWeb url="autodoc.ex/list" navActive="Catalog">
            <div style={{ padding: 10 }}><Region label="Page" h={300} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
              <Toast action="Undo">Saved for later</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>The system is never silent.</b> Every background action gets a visible answer; a plain toast is the floor.",
        "<b>Non-blocking, transient.</b> It never takes focus and auto-dismisses; if it must be acknowledged, it needs a blocking surface instead.",
        "<b>At most one action.</b> Usually Undo — never two competing buttons.",
        "<b>Centred at the bottom.</b> Both sizes centre it; on mobile-web above the bottom nav, never under it.",
        "<b>× or countdown only when the window matters.</b> Add a close or a timer when losing the action to auto-dismiss would cost the user; otherwise keep it plain.",
      ]}/>

      <DoDont
        doItem="Confirm every background action with at least a plain toast; add a single Undo, an × , or a countdown only when the action window matters; centre it at the bottom, clear of the bottom nav."
        dontItem="Don't call it a notification, don't confirm something critical with a toast that fades before it's read, and don't pile multiple toasts on screen."
      />

    </Section>
  );
}
window.PatSnackbar = PatSnackbar;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Infoblocks  (inline, in-page contextual notice)
// ════════════════════════════════════════════════════════════════════════
// Inline infoblock — a MONOCHROME plate (white + dark border) in the page flow.
// The icon carries the meaning: ⓘ Info / ⚠ Warning — no colour-coded backgrounds.
// Optional action: a tertiary text button on the trailing edge (`action`) OR a
// dotted-underline link woven inline into the body — one or the other.
function InfoBlock({ kind = "info", title, body, action }) {
  const icon = kind === "warning"
    ? <span style={{ width: 16, height: 16, fontSize: 13, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#111", marginTop: 1 }}>⚠</span>
    : <span style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #111", color: "#111", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11, fontWeight: 700, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>i</span>;
  return (
    <div style={{ display: "flex", gap: 10, padding: "12px", background: "#fff", border: "1px solid #2a2a2a", borderRadius: 10, fontFamily: "-apple-system, sans-serif", alignItems: "center" }}>
      {icon}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        <Skel w="90%" h={7} /><Skel w="64%" h={7} bg="#d8d8d8" />
      </div>
      {action && <span style={{ color: "#111", fontSize: 10.5, fontWeight: 600, flexShrink: 0 }}>{action}</span>}
    </div>
  );
}

// The ⓘ trigger glyph — the one affordance that opens a sheet infoblock.
function InfoI() {
  return <span style={{ color: "#ff5a1f", fontSize: 11, fontWeight: 700 }}>ⓘ</span>;
}

// Schematic list of WHERE the ⓘ trigger can live — generic, not bound to any
// one screen (mirrors the toast-variants list).
function InfoTriggerList() {
  const row = { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#2a2a2a", fontFamily: "-apple-system, sans-serif" };
  const dim = { color: "#9a9a9a" };
  const specimens = [
    [<span style={{ fontFamily: "-apple-system, sans-serif", fontSize: 11 }}>Label <InfoI /></span>, "Next to a section label — clarifies a whole group."],
    [<div style={row}><span>Title <InfoI /></span><span style={dim}>Value</span></div>, "On a row, after the title."],
    [<div style={row}><span>Title</span><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dim}>Value</span><InfoI /></span></div>, "On a row, after the value."],
    [<div style={row}><span>Title</span><InfoI /></div>, "A standalone row."],
    [<div style={{ border: "1px solid #d8d8d8", borderRadius: 8, padding: "8px 10px" }}><div style={{ ...row, marginBottom: 6 }}><span style={{ fontWeight: 600 }}>Widget</span><InfoI /></div><div style={{ height: 24, background: "#ececec", borderRadius: 4 }} /></div>, "In a block or widget header."],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "16px 0 8px" }}>
      {specimens.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 220, flexShrink: 0 }}>{s[0]}</div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5, color: "#6b6b6b" }}>{s[1]}</span>
        </div>
      ))}
    </div>
  );
}

// The displayed answer (shared desktop modal + mobile sheet): optional image,
// formatted text (scrolls when long), then a CTA + an action link. The title
// stays pinned by the modal/sheet header.
function InfoSheetContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>
        <Thumb h={64} />
        <Skel w="96%" h={7} /><Skel w="100%" h={7} /><Skel w="88%" h={7} /><Skel w="94%" h={7} />
        <span style={{ fontSize: 10, lineHeight: 1.5 }}><span style={{ color: "#111", textDecoration: "underline" }}>Action link</span></span>
      </div>
      <div style={{ marginTop: 10, flexShrink: 0 }}><Btn tone="primary" block>CTA</Btn></div>
    </div>
  );
}

function PatInfoblock() {
  return (
    <Section id="p-infoblock">
      <PatternHead category="Surfaces" title="Infoblocks"
        lede="Contextual help, in two shapes. A sheet infoblock opens when the user taps an ⓘ next to something they might not understand — it explains the term in place, as a centred modal on desktop and a bottom sheet on mobile-web. An inline infoblock sits in the content flow as a monochrome banner — ⓘ Info or ⚠ Warning — flagging a state the user should be aware of right now. Both keep the explanation where it's relevant; neither blocks." />

      <Callout label="Autodoc reading">
        The app uses infoblocks to explain without interrupting. Some things are too detailed to inline and too important to bury in an FAQ — fitment rules, tax breakdowns, warranty terms. The <b>ⓘ icon is the trigger; the panel is the answer; the page never moves.</b> Contextual education replaces a manual — onboarding happens in place, one tap at a time. If information must be <i>acknowledged</i> it needs a blocking surface; if it's just useful, it's an infoblock.
      </Callout>

      <H3>The ⓘ trigger — where it lives</H3>
      <p>The trigger is always the same glyph — <b>ⓘ</b> — placed next to the term it explains, so the user learns it once and recognises it everywhere. It goes wherever a question might arise — next to a label, a value, a title, a widget — independent of any particular screen.</p>
      <InfoTriggerList />

      <H3>The answer — desktop modal ↔ mobile sheet</H3>
      <p>Tapping the ⓘ opens the explanation: a <b>centred modal on desktop</b>, a <b>bottom sheet on mobile-web</b>. It holds a title, optional image, formatted text, and an optional CTA or action link. For long content it grows to a maximum height and scrolls internally, the <b>title pinned</b> at the top; it's dismissed by the close, click-away, or swipe-down — the page beneath never moves.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A centred modal: pinned title, image, text, then a CTA and an action link.">
          <Browser url="autodoc.ex/product">
            <HeaderSpine />
            <div style={{ opacity: 0.3, padding: 10 }}><Region label="Page behind" h={400} /></div>
            <Modal title="Title" w={300}>
              <div style={{ height: 200 }}><InfoSheetContent /></div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same answer as a bottom sheet; long content scrolls with the title pinned.">
          <MobileWeb url="autodoc.ex/product" nav={false}>
            <div style={{ padding: 10, opacity: 0.3 }}><Region label="Page behind" h={360} /></div>
            <MobileDrawer title="Title" height="66%">
              <InfoSheetContent />
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Inline infoblock — a monochrome banner in the flow</H3>
      <p>When the explanation belongs <b>on the page</b> rather than one tap away, an inline infoblock sits in the content flow on a <b>monochrome plate</b> — the icon carries the meaning, not a coloured background. Two flavours: <b>Info</b> (ⓘ) and <b>Warning</b> (⚠). An optional action is either a <b>tertiary text button</b> on the trailing edge or a <b>dotted-underline link</b> woven inline — one or the other, never both. It carries no dismiss; it clears when the underlying state changes.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Info (ⓘ) and Warning (⚠) on one monochrome plate; an optional trailing text button or an inline dotted link.">
          <Browser url="autodoc.ex/product">
            <HeaderSpine />
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <InfoBlock kind="info" />
              <InfoBlock kind="warning" action="Action" />
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same plates, full-width; the Warning carries a trailing text button.">
          <MobileWeb url="autodoc.ex/product" navActive="Catalog">
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <InfoBlock kind="info" />
              <InfoBlock kind="warning" action="Action" />
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One trigger glyph.</b> The ⓘ icon opens the sheet infoblock; it sits next to the term it explains, the same everywhere.",
        "<b>The page never moves.</b> The sheet form is read-only and dismissible (close / click-away / swipe); long content scrolls with the title pinned.",
        "<b>Modal on desktop, sheet on mobile.</b> Same answer, the modal↔sheet pair.",
        "<b>Inline when it belongs on the page.</b> A toned banner (neutral / good / bad from the palette) for a state to be aware of now; no bespoke colours.",
        "<b>Inform, don't ask.</b> An infoblock only informs; anything that must be acknowledged or confirmed needs a different, blocking surface.",
      ]}/>

      <DoDont
        doItem="Put an ⓘ next to anything that needs explaining and open it as a modal (desktop) or sheet (mobile) with the title pinned; use an inline toned banner when the note belongs on the page."
        dontItem="Don't inline long explanations that drown the content, don't bury them in an FAQ, and don't use an infoblock for something that must be acknowledged — that needs a blocking surface, not a passive note."
      />

    </Section>
  );
}
window.PatInfoblock = PatInfoblock;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Final screens  (full-page flow outcomes)
// ════════════════════════════════════════════════════════════════════════
// Final screen — monochrome outcome mark + title + message, an optional
// marketing slot, then the primary CTA (full-width on mobile, sized to its
// label on desktop) and a secondary text link. No coloured icons.
function FinalScreen({ glyph = "✓", title, message, cta, secondary, mobile = false, marketing = true }) {
  return (
    <div style={{ height: mobile ? "100%" : 380, display: "flex", flexDirection: "column", fontFamily: "-apple-system, sans-serif", padding: mobile ? "18px 18px 16px" : "22px 28px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8, marginTop: mobile ? 26 : 18 }}>
        <span style={{ width: 56, height: 50, borderRadius: 12, background: "#ececec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#111", marginBottom: 6 }}>{glyph}</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>{title}</span>
        <span style={{ fontSize: 11, color: "#6b6b6b" }}>{message}</span>
      </div>
      {marketing && (
        <div style={{ marginTop: 18 }}>
          <Skel w={120} h={8} style={{ marginBottom: 8 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ background: "#f7f6f4", borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                <Skel w="80%" h={7} /><Skel w="55%" h={6} bg="#d8d8d8" />
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {mobile ? <Btn tone="primary" block>{cta}</Btn> : <Btn tone="primary">{cta}</Btn>}
        {secondary && <span style={{ fontSize: 11, color: "#6b6b6b" }}>{secondary}</span>}
      </div>
    </div>
  );
}

function PatFinal() {
  return (
    <Section id="p-final">
      <PatternHead category="Surfaces" title="Result screens"
        lede="A result screen answers &quot;what happened — and what now?&quot;. It pairs an outcome with a continuation: the outcome may be a completed flow, an error (a 404, a failed payment), or a produced set of results, and the container may be a full page — with or without the shell — or even a modal. What's invariant is the pair: a clear result, and a way to carry on." />

      <Callout label="Autodoc reading">
        The app ends journeys on dedicated result screens and treats empty and error views as part of the same <b>result family</b>. The web keeps that: a placed order, a &quot;page not found&quot;, an empty filter, a produced grid — each is a result with a continuation. The mark is <b>monochrome</b> — a grey plate with a glyph, no coloured icon — and the words carry the outcome. How an error <i>phrases</i> itself — wording, retry, the colour — is a separate concern; here we describe the full-screen <b>shape</b> an outcome takes and the rule it never breaks — there is always a way on.</Callout>

      <H3>One skeleton, any result</H3>
      <p>The skeleton never changes: a monochrome mark, the outcome in words, an optional content slot (a marketing rail, a set of result cards), then the primary CTA and a secondary link. On mobile the CTA is <b>full-width</b>; on desktop it is sized to its label. Only the fill changes — read the same skeleton as a placed order, a 404, or an empty filter. The <b>shell is a separate choice</b>: keep it when the user still needs to navigate (a 404 or an empty list), drop it when the flow owned the screen — a post-checkout <i>thank-you</i> lands on the shell-less commit page. How an error <i>phrases</i> itself — wording, retry, the colour — is a separate concern; this is only its full-screen shape.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A post-checkout thank-you on the shell-less commit page: monochrome mark, a marketing slot, a CTA sized to its label + a secondary link.">
          <Browser url="autodoc.ex/checkout/done">
            <FinalScreen glyph="✓" title="Order placed" message="Your order is on its way." cta="Go to My Orders" secondary="Continue shopping" />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same shell-less result; the CTA goes full-width above the secondary link.">
          <MobileWeb url="autodoc.ex/checkout/done" header={false} nav={false}>
            <FinalScreen glyph="✓" title="Order placed" message="Your order is on its way." cta="Go to My Orders" secondary="Continue shopping" mobile />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>…or inside a modal / sheet</H3>
      <p>The container is independent of the result. A <b>produced set</b> — &quot;here is what we found&quot; — can answer inside a <b>modal</b> on desktop and a <b>bottom sheet</b> on mobile-web: a heading states the result, a content slot holds the produced cards, and one CTA carries on. The container changed; the two invariants didn't.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> A produced-set result inside a modal — heading · the cards · one continuation.">
          <Browser url="autodoc.ex/found">
            <HeaderSpine />
            <div style={{ padding: 10 }}><Region label="Page" h={300} /></div>
            <Modal title="12 matches found" w={300}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <SchematicGrid cols={2} n={4} h={44} />
                <Btn tone="primary" block>View all results</Btn>
              </div>
            </Modal>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The same produced-set result as a bottom sheet; the CTA stays pinned and full-width.">
          <MobileWeb url="autodoc.ex/found">
            <div style={{ padding: 8, opacity: 0.3 }}><Region label="Page (dimmed)" h={320} style={{ width: "auto" }} /></div>
            <MobileDrawer title="12 matches found" height="54%">
              <SchematicGrid cols={2} n={2} h={44} />
              <div style={{ marginTop: "auto" }}><Btn tone="primary" block>View all results</Btn></div>
            </MobileDrawer>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Always a result + a continuation.</b> Every result screen states an outcome — a success, an error, or a produced set — and offers the next move; never a result with no way on.",
        "<b>Any container.</b> Full-page with the shell, full-page without it, or inside a modal — the container is a separate choice from the result.",
        "<b>Any result, one skeleton.</b> A placed order, a 404 or failure, or a grid of produced cards share the same skeleton; the fill changes, the two invariants don't.",
        "<b>Monochrome mark.</b> A grey plate with a glyph; the words carry the outcome — no coloured icons.",
        "<b>The CTA is the way out.</b> Full-width on mobile, sized to its label on desktop; never a bare close, never a dead end.",
        "<b>The space below can market.</b> Recommendations or an offer may sit between the outcome and the CTA — as long as the CTA stays the boss; skip it on a failure.",
      ]}/>

      <DoDont
        doItem="Treat every whole-screen outcome — success, error, or produced set — as a result screen: a monochrome mark, the outcome in words, and a clear continuation, in whatever container fits (page with or without the shell, or a modal)."
        dontItem="Don't leave a result with no way on, don't colour the mark, and don't restate error-state rules here — wording, retry, and colour are a separate concern."
      />

    </Section>
  );
}
window.PatFinal = PatFinal;
