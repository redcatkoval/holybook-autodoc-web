// Web wireframe primitives — schematic placeholders for the web Holy Book.
// All inline-styled (decoupled from template.html), mirroring the mobile kit.
// PALETTE DISCIPLINE: only the tokens below — the same set as the mobile book.
// No other colours. These frames are about architecture and behaviour, not
// pixel-level visuals, so detail collapses to grey labelled blocks (Region)
// whenever real fidelity would overflow the frame.

const PAL = {
  ink: "#111",
  ink2: "#2a2a2a",
  muted: "#6b6b6b",
  muted2: "#9a9a9a",
  line: "#d8d8d8",
  line2: "#ececec",
  paper: "#f7f6f4",
  card: "#ffffff",
  accent: "#ff5a1f",
  accentSoft: "#ffe9df",
  good: "#2e7d32",
  bad: "#c62828",
};
const GOOD_TINT = "rgba(46,125,50,0.10)"; // tint of --good, used for the fitment banner
const MONO = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
const UI = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

// ---------- atoms ----------
function Skel({ w = "100%", h = 12, r = 4, bg = PAL.line2, style = {} }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: bg, flexShrink: 0, ...style }} />;
}
// grey "image" placeholder
function Thumb({ w = "100%", h = 48, r = 6, dark = false, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, background: dark ? "rgba(255,255,255,0.10)" : PAL.line,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...style,
    }}>
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" style={{ maxWidth: 22, maxHeight: 22 }}>
        <path d="M3 17l5-5 4 4 3-3 6 6M3 7h18" stroke={dark ? "rgba(255,255,255,0.40)" : PAL.muted2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
// Labelled grey block — stands in for a region whose internal detail is not
// the point of the frame. The escape hatch for "show the context, not the px".
function Region({ label, sub, w = "100%", h = 120, dark = false, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 8, background: dark ? "rgba(255,255,255,0.05)" : PAL.paper,
      border: `1px dashed ${dark ? "rgba(255,255,255,0.18)" : PAL.line}`, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 3, textAlign: "center",
      padding: 8, flexShrink: 0, ...style,
    }}>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.72)" : PAL.muted }}>{label}</span>
      {sub && <span style={{ fontFamily: MONO, fontSize: 8, color: dark ? "rgba(255,255,255,0.45)" : PAL.muted2 }}>{sub}</span>}
    </div>
  );
}
function Pill({ children, tone = "line", style = {} }) {
  const tones = {
    line: { border: `1px solid ${PAL.line}`, color: PAL.ink2, background: PAL.card },
    dark: { background: PAL.ink, color: "#fff" },
    soft: { background: PAL.paper, color: PAL.muted, border: `1px solid ${PAL.line}` },
    accent: { background: PAL.accent, color: "#fff" },
    good: { background: "transparent", color: PAL.good, border: `1px solid ${PAL.good}` },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontFamily: MONO, fontSize: 9, padding: "3px 8px", borderRadius: 20,
      whiteSpace: "nowrap", ...tones[tone], ...style,
    }}>{children}</span>
  );
}

// App-style action button — rounded RECTANGLE (not a pill), UI font.
// Mirrors the mobile book's DialogModal/LoadingButton buttons.
//   primary   solid ink fill, white text          (the default CTA)
//   accent    solid accent fill, white text        (the buy / commit CTA)
//   secondary grey fill (#ececec), ink text         (cancel / back)
//   danger    solid red fill, white text            (destructive confirm)
//   ghost     transparent, ink text                 (low-emphasis text action)
// `block` makes it full-width and centred (for stacked mobile CTAs).
function Btn({ children, tone = "primary", block = false, size = "md", style = {} }) {
  const tones = {
    primary: { background: PAL.ink, color: "#fff", border: "1px solid " + PAL.ink },
    accent: { background: PAL.accent, color: "#fff", border: "1px solid " + PAL.accent },
    secondary: { background: PAL.card, color: PAL.ink, border: "1.5px solid " + PAL.ink },
    danger: { background: PAL.bad, color: "#fff", border: "1px solid " + PAL.bad },
    ghost: { background: "transparent", color: PAL.ink, border: "1px solid transparent" },
  };
  const sizes = {
    sm: { fontSize: 10, padding: "6px 12px", borderRadius: 8 },
    md: { fontSize: 11.5, padding: "9px 16px", borderRadius: 9 },
  };
  return (
    <span style={{
      display: block ? "flex" : "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      fontFamily: UI, fontWeight: 600, whiteSpace: "nowrap", cursor: "default",
      width: block ? "100%" : "auto", ...sizes[size], ...tones[tone], ...style,
    }}>{children}</span>
  );
}

// ---------- shells ----------
// STANDARD PREVIEW SIZES (fixed, like the app's phones):
//   mobile-web  280 × 580  (+ status bar, notch, home indicator, address bar)
//   desktop     760 × 480  (landscape viewport — ~2× the mobile, content below
//                           the fold clips, same as a real above-the-fold view)
const DESKTOP_W = 760, DESKTOP_H = 480;
const MOBILE_W = 280, MOBILE_H = 580;

// Desktop browser window. The URL bar is not decoration — it carries the
// "URL is state" principle: every frame shows where it lives. The body
// is a fixed-height viewport: content below the fold is clipped, not scaled.
function Browser({ url = "autodoc.ex", w = DESKTOP_W, h = DESKTOP_H, children, label }) {
  return (
    <div style={{ width: w, flexShrink: 0 }}>
      <div style={{
        border: `1px solid ${PAL.line}`, borderRadius: 10, overflow: "hidden",
        background: PAL.paper, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
          background: PAL.line2, borderBottom: `1px solid ${PAL.line}`,
        }}>
          <span style={{ display: "flex", gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: PAL.muted2 }} />
            ))}
          </span>
          <div style={{
            flex: 1, height: 20, borderRadius: 5, background: PAL.card,
            border: `1px solid ${PAL.line}`, display: "flex", alignItems: "center",
            gap: 6, padding: "0 8px", fontFamily: MONO, fontSize: 10, color: PAL.muted,
            overflow: "hidden", whiteSpace: "nowrap",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke={PAL.muted2} strokeWidth="2"/><path d="M8 11V8a4 4 0 018 0v3" stroke={PAL.muted2} strokeWidth="2"/></svg>
            {url}
          </div>
        </div>
        <div style={{ height: h, overflow: "hidden", position: "relative" }}>{children}</div>
      </div>
      {label && <div style={{ fontFamily: MONO, fontSize: 10, color: PAL.muted, marginTop: 6 }}>{label}</div>}
    </div>
  );
}

// Slim web address bar — used by both the framed phone and its frameless twin
// so the surface always reads as *web*, not the native app.
function MobileAddressBar({ url }) {
  return (
    <div style={{
      height: 22, borderRadius: 11, background: PAL.card, border: `1px solid ${PAL.line}`,
      display: "flex", alignItems: "center", gap: 5, padding: "0 10px",
      fontFamily: MONO, fontSize: 9, color: PAL.muted, overflow: "hidden", whiteSpace: "nowrap",
    }}>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke={PAL.muted2} strokeWidth="2"/><path d="M8 11V8a4 4 0 018 0v3" stroke={PAL.muted2} strokeWidth="2"/></svg>
      {url}
    </div>
  );
}

// Mobile-web frame — fixed device size like the app phones, with status bar,
// notch and home indicator, PLUS a slim address bar so it reads as *web*, not
// the native app. Body clips below the fold. Optional bottom nav.
//
// By default it renders the device-framed phone AND a frameless twin side by
// side (`bare` — the raw responsive page, no bezel), because the web book's
// point is that the *page* is the artefact and the phone is just one viewport.
// Set bare={false} to show the phone alone. `overlay` paints a node over the
// whole device (above status/address bars) — used for full-cover slide-overs.
function MobileWeb({ url = "autodoc.ex", w = MOBILE_W, h = MOBILE_H, children, nav = true, navActive = "Catalog", label, bare = false, overlay, header = true, headerSearch = true }) {
  const headerEl = header && <MobileHeader search={headerSearch} />;
  const framed = (
    <div style={{ width: w, flexShrink: 0 }}>
      <div style={{
        width: w, height: h, border: `1.5px solid ${PAL.ink}`, borderRadius: 34,
        background: PAL.paper, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* notch */}
        <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 84, height: 20, background: PAL.ink, borderRadius: 11, zIndex: 10 }} />
        {/* status bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 22px 3px", fontFamily: UI, fontSize: 10, fontWeight: 600, color: PAL.ink, flexShrink: 0,
        }}>
          <span>9:41</span>
          <span style={{ fontFamily: MONO, letterSpacing: 1, color: PAL.ink2 }}>●●●● ◴ ▮▮</span>
        </div>
        {/* address bar (this is web) */}
        <div style={{ padding: "0 10px 7px", flexShrink: 0 }}><MobileAddressBar url={url} /></div>
        {/* persistent header (the small-screen spine) */}
        {headerEl}
        {/* page viewport */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{children}</div>
        {nav && <BottomNav active={navActive} />}
        {/* home indicator */}
        <div style={{ flexShrink: 0, display: "flex", justifyContent: "center", padding: "6px 0 8px", background: PAL.card }}>
          <span style={{ width: 104, height: 4, borderRadius: 2, background: PAL.ink, opacity: 0.85 }} />
        </div>
        {/* full-cover overlay (slide-over that hides the chrome) */}
        {overlay && <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>{overlay}</div>}
      </div>
      {label && <div style={{ fontFamily: MONO, fontSize: 10, color: PAL.muted, marginTop: 6 }}>{label}</div>}
    </div>
  );

  if (!bare) return framed;

  // Frameless twin — the same responsive page without the device bezel.
  const flat = (
    <div style={{ width: w, flexShrink: 0 }}>
      <div style={{
        width: w, height: h, border: `1px solid ${PAL.line}`, borderRadius: 10,
        background: PAL.paper, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}>
        <div style={{ padding: "8px 10px 7px", flexShrink: 0 }}><MobileAddressBar url={url} /></div>
        {headerEl}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{children}</div>
        {nav && <BottomNav active={navActive} />}
        {overlay && <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>{overlay}</div>}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 10, color: PAL.muted, marginTop: 6 }}>{label || "no device frame"}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      {framed}
      {flat}
    </div>
  );
}

// ---------- desktop regions ----------
// The spine header: logo · vehicle pill · search · region · sign-in · cart.
// Two-line label used by the vehicle pill and the basket (the slots kept as
// real text). `sm` shrinks it for the active-vehicle pill.
function SpineStack({ top, bottom, chevron, sm, light = false }) {
  const topColor = light ? PAL.muted : "rgba(255,255,255,0.55)";
  const bottomColor = light ? PAL.ink : "#fff";
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span style={{ fontSize: sm ? 7 : 7.5, color: topColor }}>{top}</span>
        <span style={{ fontSize: sm ? 8.5 : 9.5, fontWeight: 700, color: bottomColor }}>{bottom}</span>
      </span>
      {chevron && <span style={{ fontSize: 7, color: topColor }}>▾</span>}
    </span>
  );
}

// Schematic stand-in for the utility-cluster labels — two stacked bars instead
// of real text, so the spine reads as structure, not copy.
function SpineSkel({ chevron }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
      <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ width: 18, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.22)" }} />
        <span style={{ width: 30, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.4)" }} />
      </span>
      {chevron && <span style={{ fontSize: 7, color: "rgba(255,255,255,0.45)" }}>▾</span>}
    </span>
  );
}

// Grey person glyph — the account icon for both desktop and mobile spines.
function PersonIcon({ size = 16, color = PAL.muted2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke={color} strokeWidth="2" />
      <path d="M5.5 19.5a6.5 6.5 0 0113 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Wordmark — no symbol, all caps, shared by desktop + mobile.
function Wordmark({ size = 14, color = "#fff" }) {
  return <span style={{ fontSize: size, fontWeight: 800, letterSpacing: 1.2, color }}>AUTODOC</span>;
}

function HeaderSpine({ searchFocused = false, searchValue = "", pillActive = false, onPillClick }) {
  return (
    <div style={{
      background: PAL.ink, color: "#fff", padding: "9px 14px",
      display: "flex", alignItems: "center", gap: 12, fontFamily: UI,
    }}>
      {/* Logo — wordmark only, no symbol */}
      <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Wordmark />
      </span>

      {/* Active-vehicle pill (opens the garage; highlighted + chevron flips while open) */}
      <span onClick={onPillClick} style={{
        display: "flex", alignItems: "center", gap: 8, padding: "5px 10px",
        border: `1px solid ${pillActive ? PAL.accent : "rgba(255,255,255,0.18)"}`, borderRadius: 10, flexShrink: 0,
        cursor: onPillClick ? "pointer" : "default",
        background: pillActive ? "rgba(255,90,31,0.12)" : "rgba(255,255,255,0.04)",
      }}>
        <span style={{ width: 18, height: 18, borderRadius: "50%", background: PAL.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 13l1.5-4.5A2 2 0 017.4 7h9.2a2 2 0 011.9 1.5L20 13M5 13h14v4H5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <SpineStack sm top="Your vehicle" bottom="BMW 320d (2019)" />
        <span style={{ fontSize: 7, color: pillActive ? PAL.accent : "rgba(255,255,255,0.55)" }}>{pillActive ? "▴" : "▾"}</span>
      </span>

      {searchFocused ? (
        /* Focused search — the field grows to fill the space up to the basket,
           covering the utility icons, with an accent focus ring + magnifier button. */
        <span style={{ flex: 1, display: "flex", alignItems: "center", height: 34, minWidth: 90, borderRadius: 8, background: PAL.card, border: `2px solid ${PAL.accent}`, overflow: "hidden" }}>
          <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 12px", minWidth: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="6" stroke={PAL.muted2} strokeWidth="2"/><path d="M16 16l4 4" stroke={PAL.muted2} strokeWidth="2" strokeLinecap="round"/></svg>
            <span style={{ flex: 1, fontSize: 10.5, color: searchValue ? PAL.ink : PAL.muted2, whiteSpace: "nowrap", overflow: "hidden" }}>{searchValue || "Search OEM number, brand, or part name…"}</span>
            {searchValue && <span style={{ width: 15, height: 15, borderRadius: "50%", background: PAL.muted2, color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</span>}
          </span>
          <span style={{ width: 40, alignSelf: "stretch", background: PAL.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2"/><path d="M16 16l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </span>
      ) : (
        <>
          {/* Search bar — wide, with a leading magnifier (no button) */}
          <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 90, height: 32, borderRadius: 8, padding: "0 12px", background: PAL.card }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="6" stroke={PAL.muted2} strokeWidth="2"/><path d="M16 16l4 4" stroke={PAL.muted2} strokeWidth="2" strokeLinecap="round"/></svg>
            <span style={{ flex: 1, fontSize: 10.5, color: PAL.muted2, whiteSpace: "nowrap", overflow: "hidden" }}>
              Search OEM number, brand, or part name…
            </span>
          </span>

          {/* Utility cluster — Mobile App as a garage-style chip; deliver & account
              as bare icons; basket kept as real text */}
          <span style={{
            display: "flex", alignItems: "center", gap: 7, padding: "5px 10px",
            border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, flexShrink: 0,
            background: "rgba(255,255,255,0.04)",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/></svg>
            <SpineSkel />
          </span>
          {/* language + profile — same icon-buttons as mobile */}
          <MobIconBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="#fff" strokeWidth="1.6"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" stroke="#fff" strokeWidth="1.4"/></svg>
          </MobIconBtn>
          <MobIconBtn><PersonIcon size={15} color="rgba(255,255,255,0.7)" /></MobIconBtn>
        </>
      )}

      {/* Basket */}
      <span style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <span style={{ position: "relative", display: "inline-flex" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.4 12h10l1.6-8H6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.4" fill="#fff"/><circle cx="17" cy="20" r="1.4" fill="#fff"/></svg>
          <span style={{ position: "absolute", top: -5, right: -6, minWidth: 13, height: 13, padding: "0 3px", borderRadius: 7, background: PAL.accent, color: "#fff", fontSize: 7.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>4</span>
        </span>
        <SpineStack top="Cart" bottom="269,19 €" />
      </span>
    </div>
  );
}

// The garage chip — same as the desktop vehicle pill (car icon + "Your
// vehicle" / "BMW 320d (2019)"), so the mobile spine reads identically.
function MobileGarage({ active = false, onClick }) {
  return (
    <span onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 7, padding: "4px 9px",
      border: `1px solid ${active ? PAL.accent : "rgba(255,255,255,0.18)"}`, borderRadius: 10,
      cursor: onClick ? "pointer" : "default",
      background: active ? "rgba(255,90,31,0.12)" : "rgba(255,255,255,0.05)", flexShrink: 0,
    }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: PAL.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 13l1.5-4.5A2 2 0 017.4 7h9.2a2 2 0 011.9 1.5L20 13M5 13h14v4H5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <SpineStack sm top="Your vehicle" bottom="BMW 320d (2019)" />
      <span style={{ fontSize: 7, color: active ? PAL.accent : "rgba(255,255,255,0.55)" }}>{active ? "▴" : "▾"}</span>
    </span>
  );
}

const MOB_ICON_BG = "rgba(255,255,255,0.12)";
function MobIconBtn({ children, light = false }) {
  return (
    <span style={{ width: 26, height: 26, borderRadius: 8, background: light ? PAL.line2 : MOB_ICON_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{children}</span>
  );
}

// Mobile header — the single small-screen spine. Two levels:
//   1) wordmark (left) · Download-app chip + language + profile icons (right)
//   2) garage chip (same as desktop pill) + search icon
// Cart and Catalog live in the bottom-nav shell, like the app.
function MobileHeader({ search = true, between, garageOpen = false, onGarageToggle }) {
  return (
    <div style={{ background: PAL.ink, color: "#fff", fontFamily: UI, flexShrink: 0 }}>
      {/* level 1 — centred logo (language moves into the profile) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px 6px" }}>
        <Wordmark size={13} />
      </div>
      {/* a panel (e.g. the inline garage) can expand between the two levels */}
      {between}
      {/* level 2 — vehicle pill · search · profile */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 7, padding: "0 12px 9px" }}>
        <MobileGarage active={garageOpen} onClick={onGarageToggle} />
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {search && (
            <MobIconBtn>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2"/><path d="M16 16l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </MobIconBtn>
          )}
          {/* profile (carries language inside it now) */}
          <MobIconBtn><PersonIcon size={14} color="rgba(255,255,255,0.7)" /></MobIconBtn>
        </span>
      </div>
    </div>
  );
}

// Collections strip — All Categories + curated collection links.
// drilled=true gives the mobile horizontal-scroll form (clipped).
function CollectionsStrip({ drilled = false }) {
  const items = ["Road trip ready", "Off-road weekends", "Show-off mode", "Comfort upgrade", "Detail day", "Winter ready"];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "8px 12px",
      background: drilled ? PAL.card : PAL.line2, borderBottom: `1px solid ${PAL.line}`,
      overflow: "hidden", fontFamily: UI,
    }}>
      <Pill tone="dark" style={{ fontSize: 9, padding: "4px 9px" }}>
        <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          {[0, 1, 2, 3].map((i) => <span key={i} style={{ width: 4, height: 4, background: "#fff", borderRadius: 1 }} />)}
        </span>
        Catalog
      </Pill>
      {items.map((t, i) => (
        <span key={t} style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? PAL.ink : PAL.ink2, whiteSpace: "nowrap", flexShrink: 0, paddingBottom: 2 }}>{t}</span>
      ))}
    </div>
  );
}

// Left sidebar filters with the "Filtered for your car" toggle.
// headless=true drops its own "Filters" card (use inside a drawer that already
// carries that title) to avoid a duplicate heading.
function SidebarFilters({ w = 150, headless = false }) {
  const Check = ({ on, label, count }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", fontFamily: UI }}>
      <span style={{ width: 12, height: 12, borderRadius: 3, flexShrink: 0,
        background: on ? PAL.accent : PAL.card, border: `1px solid ${on ? PAL.accent : PAL.line}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {on && <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span style={{ flex: 1, fontSize: 9.5, color: PAL.ink2 }}>{label}</span>
      <span style={{ fontSize: 9, color: PAL.muted2, fontFamily: MONO }}>{count}</span>
    </div>
  );
  return (
    <div style={{ width: w, flexShrink: 0, fontFamily: UI }}>
      {!headless && (
        <div style={{ background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>Filters</span>
            <span style={{ fontSize: 9, color: PAL.accent }}>Clear all</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Universal accessories", "Roof Cargo Baskets"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9, color: PAL.ink2,
                background: PAL.paper, border: `1px solid ${PAL.line}`, borderRadius: 12, padding: "3px 8px", alignSelf: "flex-start" }}>
                {t} <span style={{ color: PAL.muted2 }}>×</span>
              </span>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: GOOD_TINT, borderLeft: `3px solid ${PAL.good}`, borderRadius: 6, padding: "8px 10px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, background: PAL.good, flexShrink: 0 }} />
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontFamily: MONO, fontSize: 8, color: PAL.good, textTransform: "uppercase", letterSpacing: "0.06em" }}>Filtered for your car</div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: PAL.ink }}>BMW 320d · 2019</div>
          </div>
          <span style={{ width: 26, height: 15, borderRadius: 8, background: PAL.good, position: "relative", flexShrink: 0 }}>
            <span style={{ position: "absolute", top: 2, right: 2, width: 11, height: 11, borderRadius: "50%", background: "#fff" }} />
          </span>
        </div>
      </div>
      <div style={{ background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Category</div>
        <Check on label="Base Rack Systems" count={19} />
        <Check on label="Roof Cargo Baskets" count={13} />
        <Check label="Phone Mounts" count={20} />
        <Check label="All-Weather Mats" count={13} />
      </div>
    </div>
  );
}

// Product card — wide (desktop) or vertical (mobile).
function ProductCard({ wide = false }) {
  if (wide) {
    return (
      <div style={{ display: "flex", gap: 12, background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: 12, fontFamily: UI }}>
        <Thumb w={72} h={72} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          <Skel w="70%" h={9} />
          <Skel w="45%" h={8} bg={PAL.line} />
          <Pill tone="good">✓ Fits</Pill>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: PAL.ink }}>€142</span>
            <Btn tone="accent" size="sm">Add to cart</Btn>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: 8, fontFamily: UI, display: "flex", flexDirection: "column", gap: 6 }}>
      <Thumb h={64} />
      <Skel w="90%" h={8} />
      <Skel w="60%" h={7} bg={PAL.line} />
      <Pill tone="good" style={{ alignSelf: "flex-start", fontSize: 8 }}>✓ Fits</Pill>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 700 }}>€142</span>
        <Btn tone="accent" size="sm" style={{ fontSize: 10, padding: "5px 11px" }}>Add</Btn>
      </div>
    </div>
  );
}

function ProductGrid({ wide = false, cols = 3, n = 6 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, flex: 1, minWidth: 0 }}>
      {Array.from({ length: n }).map((_, i) => <ProductCard key={i} wide={wide} />)}
    </div>
  );
}

// Monochrome card placeholder — no price/badge/button. Use in architecture
// frames where the *grid* is the point, not the card's contents.
function SchematicCard({ h = 56 }) {
  return (
    <div style={{ background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      <Thumb h={h} />
      <Skel w="80%" h={8} />
      <Skel w="55%" h={7} bg={PAL.line} />
    </div>
  );
}
function SchematicGrid({ cols = 3, n = 6, h = 56 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, flex: 1, minWidth: 0 }}>
      {Array.from({ length: n }).map((_, i) => <SchematicCard key={i} h={h} />)}
    </div>
  );
}

// Result toolbar: "N products · Curated order"
function ResultBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontFamily: UI }}>
      <span style={{ fontSize: 10 }}><b>32</b> <span style={{ color: PAL.muted }}>products</span></span>
      <Pill tone="line" style={{ fontFamily: UI, fontSize: 9 }}>Curated order ▾</Pill>
    </div>
  );
}

// Mobile bottom nav — Home / Catalog / Cart.
function BottomNav({ active = "Catalog" }) {
  const tabs = [
    { k: "Home", icon: <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/> },
    { k: "Catalog", icon: <g><rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/></g> },
    { k: "Cart", badge: 4, icon: <g><path d="M3 4h2l2.4 12h10l1.6-8H6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/></g> },
  ];
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", justifyContent: "space-around",
      padding: "7px 10px 9px", background: PAL.card, borderTop: `1px solid ${PAL.line}`, fontFamily: UI,
    }}>
      {tabs.map((t) => {
        const on = t.k === active;
        const col = on ? PAL.ink : PAL.muted2;
        return (
          <span key={t.k} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: col,
          }}>
            <span style={{ position: "relative", display: "inline-flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ color: col }}>{t.icon}</svg>
              {t.badge && (
                <span style={{
                  position: "absolute", top: -5, right: -7, minWidth: 12, height: 12, padding: "0 3px",
                  borderRadius: 6, background: PAL.accent, color: "#fff", fontSize: 7, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                }}>{t.badge}</span>
              )}
            </span>
            <span style={{ fontSize: 8.5, fontWeight: on ? 700 : 500 }}>{t.k}</span>
          </span>
        );
      })}
    </div>
  );
}

// Mobile garage — a DARK full-cover slide-over that hides the whole shell
// (header + bottom nav), carrying its own × close, mirroring the dark desktop
// garage side-drawer. Pass it to MobileWeb's `overlay` prop.
function GarageOverlay({ active = 0, footer }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: PAL.ink, color: "#fff", fontFamily: UI, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <span style={{ fontSize: 13, fontWeight: 800 }}>My garage</span>
        <span style={{ fontSize: 18, lineHeight: 1, color: "rgba(255,255,255,0.75)" }}>×</span>
      </div>
      <div style={{ padding: 12, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>
        <GarageTabs active={1} />
        {footer}
      </div>
    </div>
  );
}

// Mobile search — a FULL-SCREEN SHEET (the heavy end of the modal↔sheet
// surface) that takes over the whole screen: it covers the header AND the
// bottom nav (covers the shell, never removes it). Light, with the field, a
// clear ×, and a Cancel up top; dismissible, commits nothing. Pass it to
// MobileWeb's `overlay` prop, opened from the header search icon.
function SearchOverlay({ value = "", children }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: PAL.card, color: PAL.ink, fontFamily: UI, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "30px 12px 10px", borderBottom: `1px solid ${PAL.line2}`, flexShrink: 0 }}>
        <span style={{ flex: 1, height: 32, background: PAL.paper, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "0 10px", border: `1.5px solid ${PAL.accent}`, minWidth: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke={PAL.muted2} strokeWidth="2"/><path d="M16 16l4 4" stroke={PAL.muted2} strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ flex: 1, fontSize: 10.5, color: value ? PAL.ink : PAL.muted2, whiteSpace: "nowrap", overflow: "hidden" }}>{value || "Search OEM, brand, or part…"}</span>
          {value && <span style={{ width: 15, height: 15, borderRadius: "50%", background: PAL.muted2, color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</span>}
        </span>
        <span style={{ fontSize: 12, color: PAL.ink, fontWeight: 600 }}>Cancel</span>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// A bottom-sheet / drawer panel inside a mobile frame (e.g. filters).
function MobileDrawer({ title = "Filters", children, height = "70%", hideClose = false }) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 2 }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height,
        background: PAL.card, borderRadius: "16px 16px 0 0", zIndex: 3,
        boxShadow: "0 -6px 20px rgba(0,0,0,0.2)", padding: "12px 14px", fontFamily: UI,
        display: "flex", flexDirection: "column", gap: 8, overflow: "hidden",
      }}>
        <div style={{ width: 34, height: 4, borderRadius: 2, background: PAL.line, alignSelf: "center" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: `1px solid ${PAL.line2}` }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{title}</span>
          {!hideClose && <span style={{ fontSize: 16, lineHeight: 1, color: PAL.muted }}>×</span>}
        </div>
        {children}
      </div>
    </>
  );
}

// Desktop centered modal over a dimmed page. Renders as the last child of a
// Browser body (position:relative), so the page shows through the scrim.
// The mobile-web equivalent of this surface is MobileDrawer (a bottom sheet).
function Modal({ title, children, w = 300, back = false }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 5, background: "rgba(17,17,17,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", fontFamily: UI,
    }}>
      <div style={{
        width: w, background: PAL.card, borderRadius: 12, border: `1px solid ${PAL.line}`,
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${PAL.line2}` }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {back && <span style={{ fontSize: 16, lineHeight: 1, color: PAL.ink, flexShrink: 0 }}>‹</span>}
            <span style={{ fontSize: 12, fontWeight: 700, color: PAL.ink, lineHeight: 1 }}>{title}</span>
          </span>
          <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, lineHeight: 1, color: PAL.muted2 }}>×</span>
        </div>
        <div style={{ padding: 14 }}>{children}</div>
      </div>
    </div>
  );
}

// Desktop side drawer (slide-over) over a dimmed page. Holds filters, cart
// preview, account menu, the garage. Renders as last child of a Browser body.
function SideDrawer({ title, children, w = 240, side = "right", dark = false }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 5, background: "rgba(17,17,17,0.40)",
      display: "flex", justifyContent: side === "right" ? "flex-end" : "flex-start", fontFamily: UI,
    }}>
      <div style={{
        width: w, height: "100%", background: dark ? PAL.ink : PAL.card,
        borderLeft: side === "right" ? `1px solid ${dark ? "rgba(255,255,255,0.12)" : PAL.line}` : "none",
        borderRight: side === "left" ? `1px solid ${dark ? "rgba(255,255,255,0.12)" : PAL.line}` : "none",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.12)" : PAL.line2}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: dark ? "#fff" : PAL.ink }}>{title}</span>
          <span style={{ fontSize: 16, lineHeight: 1, color: dark ? "rgba(255,255,255,0.7)" : PAL.muted2 }}>×</span>
        </div>
        <div style={{ padding: 12, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
      </div>
    </div>
  );
}

// Horizontal car carousel — the garage's "My auto" affordance. Schematic car
// cards scroll sideways; the active car is accent-bordered. Plus an Add card.
function CarCarousel({ n = 3, active = 0, dark = false }) {
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "hidden", fontFamily: UI }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{
          width: 116, flexShrink: 0, borderRadius: 10, padding: 8,
          background: dark ? "rgba(255,255,255,0.05)" : PAL.card,
          border: `1.5px solid ${i === active ? PAL.accent : (dark ? "rgba(255,255,255,0.16)" : PAL.line)}`,
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <Thumb h={44} dark={dark} />
          <Skel w="85%" h={8} bg={dark ? "rgba(255,255,255,0.20)" : PAL.line2} />
          <Skel w="55%" h={7} bg={dark ? "rgba(255,255,255,0.12)" : PAL.line} />
          {i === active && <Pill tone="accent" style={{ alignSelf: "flex-start", fontSize: 8 }}>Active</Pill>}
        </div>
      ))}
      <div style={{
        width: 92, flexShrink: 0, borderRadius: 10,
        border: `1px dashed ${dark ? "rgba(255,255,255,0.22)" : PAL.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: dark ? "rgba(255,255,255,0.55)" : PAL.muted2, fontFamily: MONO, fontSize: 9, textAlign: "center",
      }}>+ Add<br/>car</div>
    </div>
  );
}

const CART_ROWS = [
  { name: "Brake Disc Front", sub: "Brembo · 09.A532.11", price: "169,80 €", qty: 2 },
  { name: "Brake Pads Set", sub: "Textar · 2519601", price: "56,40 €", qty: 1 },
  { name: "Engine Oil 5W-30", sub: "Castrol Edge · 5L", price: "42,99 €", qty: 1 },
];

// A schematic cart line — name · price, sub, qty stepper, Remove.
function CartLine({ r, i }) {
  const dim = PAL.muted2;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, borderTop: i ? `1px solid ${PAL.line2}` : "none", paddingTop: i ? 8 : 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600 }}>{r.name}</span>
        <span style={{ fontSize: 10, fontWeight: 700 }}>{r.price}</span>
      </div>
      <span style={{ fontSize: 8, color: dim }}>{r.sub}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${PAL.line}`, borderRadius: 6, overflow: "hidden" }}>
          <span style={{ padding: "1px 7px", fontSize: 11 }}>−</span>
          <span style={{ padding: "1px 8px", fontSize: 9, borderLeft: `1px solid ${PAL.line}`, borderRight: `1px solid ${PAL.line}` }}>{r.qty}</span>
          <span style={{ padding: "1px 7px", fontSize: 11 }}>+</span>
        </span>
        <span style={{ fontSize: 8, color: dim }}>Remove</span>
      </div>
    </div>
  );
}

// Cart slide-over (RIGHT) over a dimmed page — the web cart surface. Same line
// items, qty steppers, subtotal, Checkout, View basket, with room to breathe.
// Mobile-web form is a full Cart page.
function CartDrawer({ items = 4, total = "269,19 €" }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 6, background: "rgba(17,17,17,0.40)", display: "flex", justifyContent: "flex-end", fontFamily: UI }}>
      <div style={{ width: 300, height: "100%", background: PAL.card, borderLeft: `1px solid ${PAL.line}`, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${PAL.line2}` }}>
          <span style={{ fontSize: 12, fontWeight: 800 }}>Cart · {items} items</span>
          <span style={{ fontSize: 16, lineHeight: 1, color: PAL.muted2 }}>×</span>
        </div>
        <div style={{ padding: "10px 14px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 9 }}>
          {CART_ROWS.map((r, i) => <CartLine key={i} r={r} i={i} />)}
        </div>
        <div style={{ borderTop: `1px solid ${PAL.line2}`, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: PAL.muted }}>Subtotal</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{total}</span>
          </div>
          <Btn tone="primary" block>Checkout</Btn>
          <div style={{ textAlign: "center", fontSize: 9, color: PAL.muted }}>View basket</div>
        </div>
      </div>
    </div>
  );
}

// Account / profile menu — a small dropdown anchored under the profile icon.
// Mobile-web form is a bottom sheet (MobileDrawer) with the same links.
function AccountMenu() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 6, fontFamily: UI }}>
      <div style={{ position: "absolute", top: 44, right: 44, width: 170, background: PAL.card, color: PAL.ink, borderRadius: 12, border: `1px solid ${PAL.line}`, boxShadow: "0 12px 32px rgba(0,0,0,0.18)", overflow: "hidden", padding: 4 }}>
        {[72, 56, 64, 100, 60, 52].map((w, i) => (
          <div key={i} style={{ padding: "10px 10px", borderTop: i ? `1px solid ${PAL.line2}` : "none" }}><Skel w={w} h={8} bg={i === 5 ? PAL.line : undefined} /></div>
        ))}
      </div>
    </div>
  );
}

// Garage content — a compact rail of car TABS (selecting a tab selects that car
// at once), the selected car's detail, AND the rest of the garage (needs
// attention / orders / wishlist / rewards). `wide` = rail + a detail column;
// narrow = a tab strip above stacked detail. All schematic placeholders.
function GarageTabs({ wide = false, active = 1, onSelect }) {
  const tab = (i) => {
    const on = i === active;
    return (
      <div key={i} onClick={() => onSelect && onSelect(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: 6, width: wide ? "100%" : 58, flexShrink: 0, borderRadius: 9, boxSizing: "border-box", cursor: onSelect ? "pointer" : "default", background: on ? "rgba(255,255,255,0.08)" : "transparent", border: `1.5px solid ${on ? PAL.accent : "transparent"}` }}>
        <Thumb h={22} dark />
        <Skel w={22} h={5} bg="rgba(255,255,255,0.18)" />
        <Skel w={28} h={7} bg={on ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.26)"} />
      </div>
    );
  };
  const add = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, padding: 6, width: wide ? "100%" : 58, flexShrink: 0, borderRadius: 9, boxSizing: "border-box", border: "1px dashed rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.55)", fontFamily: MONO, fontSize: 8 }}>
      <span style={{ fontSize: 13, lineHeight: 1 }}>+</span> Add
    </div>
  );
  const rail = (
    <div style={{ display: "flex", flexDirection: wide ? "column" : "row", gap: 6, flexShrink: 0, width: wide ? 54 : "auto", overflow: "hidden" }}>
      {[0, 1, 2].map(tab)}
      {add}
    </div>
  );
  // Selected-car panel — compact, stacked (image, name, specs, mileage, Manage).
  const detail = (
    <div style={{ flex: 1, minWidth: 0, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: 11, display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: PAL.accent }} /> SELECTED
        </span>
        <Skel w={42} h={6} bg="rgba(255,255,255,0.16)" />
      </div>
      <Thumb w="100%" h={60} dark />
      <Skel w="70%" h={12} bg="rgba(255,255,255,0.32)" />
      <Skel w="92%" h={6} bg="rgba(255,255,255,0.18)" />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", borderRadius: 20, background: "rgba(255,255,255,0.06)" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6"/><path d="M12 13l3-2.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <Skel w={40} h={6} bg="rgba(255,255,255,0.26)" />
        </span>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 7 }}><Skel w="80%" h={6} bg="rgba(255,255,255,0.14)" /></div>
    </div>
  );
  // The rest of the garage — other information about the selected car.
  const otherInfo = (
    <div style={{ height: "100%", boxSizing: "border-box", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: 12, display: "flex", flexDirection: "column", gap: 9 }}>
      <Skel w={84} h={7} bg="rgba(255,255,255,0.2)" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {i === 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: PAL.accent }} />}
              <Skel w={i === 0 ? 50 : 40} h={6} bg="rgba(255,255,255,0.16)" />
            </div>
            <Skel w="80%" h={8} bg="rgba(255,255,255,0.28)" />
            <Skel w="55%" h={6} bg="rgba(255,255,255,0.14)" />
          </div>
        ))}
      </div>
    </div>
  );
  if (wide) {
    // 1/3 — cars + selected;  2/3 — other info about the car.
    return (
      <div style={{ display: "flex", gap: 12, fontFamily: UI, alignItems: "stretch" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 8 }}>{rail}{detail}</div>
        <div style={{ flex: 2, minWidth: 0 }}>{otherInfo}</div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, fontFamily: UI }}>
      {rail}
      {detail}
      {otherInfo}
    </div>
  );
}

// Garage as an inline collapsible block — opened from the vehicle pill (which
// highlights and flips its chevron), it expands directly under the row that
// holds the pill, pushing content down (no overlay). No own title bar; the
// pill carries the collapse affordance. Carries GarageTabs.
function GarageInline({ wide = false, active = 1, onSelect }) {
  return (
    <div style={{ background: PAL.ink, color: "#fff", fontFamily: UI, borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: wide ? "12px 16px 14px" : "10px 12px 12px" }}>
      <GarageTabs wide={wide} active={active} onSelect={onSelect} />
    </div>
  );
}

// Interactive prototypes of the inline garage — click the vehicle pill to
// expand / collapse, click a car tab to switch the active car.
function GarageInlineDesktopDemo() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(1);
  return (
    <Browser url="autodoc.ex/catalog/roof-racks">
      <HeaderSpine pillActive={open} onPillClick={() => setOpen((o) => !o)} />
      {open && <GarageInline wide active={active} onSelect={setActive} />}
      <CollectionsStrip />
      <div style={{ padding: 10 }}><Region label="Page (pushed down)" h={170} /></div>
    </Browser>
  );
}
function GarageInlineMobileDemo() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(1);
  return (
    <MobileWeb url="autodoc.ex/catalog/roof-racks" header={false} navActive="Catalog">
      <MobileHeader garageOpen={open} onGarageToggle={() => setOpen((o) => !o)} />
      {open && <GarageInline active={active} onSelect={setActive} />}
      <div style={{ padding: 8 }}><Region label="Content (pushed down, still visible)" h={130} /></div>
    </MobileWeb>
  );
}

// Cart DROPDOWN — kept for reference only; the cart surface is now CartDrawer.
function CartDropdown({ items = 4, total = "269,19 €" }) {
  const rows = CART_ROWS;
  const dim = PAL.muted2;
  const hair = `1px solid ${PAL.line2}`;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 6, fontFamily: UI }}>
      <div style={{
        position: "absolute", top: 44, right: 10, width: 244, background: PAL.card, color: PAL.ink,
        borderRadius: 12, border: `1px solid ${PAL.line}`, boxShadow: "0 12px 32px rgba(0,0,0,0.18)", overflow: "hidden",
        padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Cart</div>
          <div style={{ fontSize: 9, color: dim }}>{items} items</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4, borderTop: i ? hair : "none", paddingTop: i ? 8 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 600 }}>{r.name}</span>
              <span style={{ fontSize: 10, fontWeight: 700 }}>{r.price}</span>
            </div>
            <span style={{ fontSize: 8, color: dim }}>{r.sub}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${PAL.line}`, borderRadius: 6, overflow: "hidden" }}>
                <span style={{ padding: "1px 7px", fontSize: 11 }}>−</span>
                <span style={{ padding: "1px 8px", fontSize: 9, borderLeft: `1px solid ${PAL.line}`, borderRight: `1px solid ${PAL.line}` }}>{r.qty}</span>
                <span style={{ padding: "1px 7px", fontSize: 11 }}>+</span>
              </span>
              <span style={{ fontSize: 8, color: dim }}>Remove</span>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: hair, paddingTop: 8 }}>
          <span style={{ fontSize: 10, color: PAL.muted }}>Subtotal</span>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{total}</span>
        </div>
        <Btn tone="primary" block>Checkout</Btn>
        <div style={{ textAlign: "center", fontSize: 9, color: PAL.muted }}>View basket</div>
      </div>
    </div>
  );
}

// ---------- Part II / III reusable atoms ----------

// Breadcrumb trail (desktop). The web analogue of the mobile back-arrow.
// Breadcrumb. Full trail on desktop (collapsed=false): Home | Link… | current,
// vertical-bar separators, current page muted + non-clickable. On mobile
// (collapsed=true) it folds to Home | … | <last> ⌄ | current, where the ⌄ opens
// a page-select dropdown (open=true) listing the intermediate levels.
function Breadcrumb({ collapsed = false, open = false, back = false, links = ["Link 1", "Link 2", "Link 3", "Link 4"], current = "current page" }) {
  const linkS = { fontSize: 10.5, color: PAL.ink2, whiteSpace: "nowrap" };
  const curS = { fontSize: 10.5, color: PAL.muted2, whiteSpace: "nowrap" };
  const Sep = () => <span style={{ width: 1, height: 11, background: PAL.line, flexShrink: 0 }} />;
  // Mobile-web fold: a single back-arrow (up one level) + the current page.
  if (back) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: UI }}>
        <span style={{ fontSize: 18, lineHeight: 1, color: PAL.ink, flexShrink: 0 }}>‹</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: PAL.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{current}</span>
      </div>
    );
  }
  if (!collapsed) {
    const all = ["Home", ...links];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: UI, flexWrap: "wrap" }}>
        {all.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={linkS}>{c}</span><Sep />
          </span>
        ))}
        <span style={curS}>{current}</span>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", fontFamily: UI }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={linkS}>Home</span><Sep />
        <span style={{ ...linkS, color: PAL.muted }}>…</span><Sep />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, ...linkS, fontWeight: 600 }}>
          {links[links.length - 1]}<span style={{ fontSize: 8, color: PAL.muted }}>▾</span>
        </span><Sep />
        <span style={curS}>{current}</span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: 26, left: 36, width: 168, background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, boxShadow: "0 10px 28px rgba(0,0,0,0.16)", overflow: "hidden", zIndex: 6 }}>
          {links.map((l, i) => (
            <div key={i} style={{ padding: "9px 12px", fontSize: 10, color: PAL.ink2, background: i === 2 ? PAL.paper : PAL.card, borderBottom: i < links.length - 1 ? `1px solid ${PAL.line2}` : "none" }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// Toast / snackbar — non-blocking notice, optional action. Web puts it
// bottom-centre (or bottom-left). tone: dark (default) / good / bad.
// `close` adds a × (persistent variant); `timer` (seconds, of 5) draws a
// countdown ring next to the action (the visible Undo-window variant).
function Toast({ children, action, tone = "dark", close = false, timer = null }) {
  const bg = tone === "good" ? PAL.good : tone === "bad" ? PAL.bad : PAL.ink;
  const C = 2 * Math.PI * 7;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12, background: bg, color: "#fff",
      borderRadius: 8, padding: "8px 12px", fontFamily: UI, fontSize: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    }}>
      <span>{children}</span>
      {action && <span style={{ color: "#fff", fontWeight: 700 }}>{action}</span>}
      {timer != null && (
        <svg width="16" height="16" viewBox="0 0 18 18" style={{ display: "block", flexShrink: 0 }}>
          <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="7" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - timer / 5)} transform="rotate(-90 9 9)" />
          <text x="9" y="11.6" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">{timer}</text>
        </svg>
      )}
      {close && <span style={{ fontSize: 13, lineHeight: 1, color: "#fff", opacity: 0.8, flexShrink: 0 }}>×</span>}
    </div>
  );
}

// Quantity stepper — − N + in a bordered pill.
function QtyStepper({ n = 1, dark = false }) {
  const bd = dark ? "rgba(255,255,255,0.3)" : PAL.line;
  const col = dark ? "#fff" : PAL.ink;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${bd}`, borderRadius: 7, overflow: "hidden", fontFamily: UI, color: col }}>
      <span style={{ padding: "2px 8px", fontSize: 12, opacity: n <= 1 ? 0.4 : 1 }}>−</span>
      <span style={{ padding: "2px 10px", fontSize: 10, borderLeft: `1px solid ${bd}`, borderRight: `1px solid ${bd}` }}>{n}</span>
      <span style={{ padding: "2px 8px", fontSize: 12 }}>+</span>
    </span>
  );
}

// Step progress header — a row of numbered steps for multi-step flows.
function StepProgress({ steps = ["Cart", "Address", "Payment", "Done"], active = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: UI }}>
      {steps.map((s, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 16, height: 16, borderRadius: "50%", fontSize: 8, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: i <= active ? PAL.accent : PAL.line2, color: i <= active ? "#fff" : PAL.muted2,
          }}>{i + 1}</span>
          <span style={{ fontSize: 9, color: i === active ? PAL.ink : PAL.muted, fontWeight: i === active ? 700 : 500 }}>{s}</span>
          {i < steps.length - 1 && <span style={{ width: 14, height: 1, background: PAL.line, margin: "0 2px" }} />}
        </span>
      ))}
    </div>
  );
}

// Star rating row.
function Stars({ n = 5, of = 5, size = 11 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: of }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? PAL.accent : PAL.line}>
          <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.8 5.4 21l1.4-6.9L1.6 9.3l7-.8z"/>
        </svg>
      ))}
    </span>
  );
}

// Empty state — icon, title, line, CTA.
function EmptyState({ title = "Nothing here yet", line = "", cta }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", padding: 16, fontFamily: UI, height: "100%" }}>
      <span style={{ width: 40, height: 40, borderRadius: "50%", background: PAL.line2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={PAL.muted2} strokeWidth="1.6"/><path d="M16 16l5 5" stroke={PAL.muted2} strokeWidth="1.6" strokeLinecap="round"/></svg>
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: PAL.ink }}>{title}</span>
      {line && <span style={{ fontSize: 10, color: PAL.muted, maxWidth: 200 }}>{line}</span>}
      {cta && <Btn tone="primary" size="sm" style={{ marginTop: 4 }}>{cta}</Btn>}
    </div>
  );
}

// Form field row with floating label and optional inline error.
function FieldRow({ label = "Email", value = "", error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: UI }}>
      <div style={{
        border: `1px solid ${error ? PAL.bad : PAL.line}`, borderRadius: 8, padding: "7px 10px",
        background: PAL.card, display: "flex", flexDirection: "column", gap: 2,
      }}>
        <span style={{ fontSize: 7.5, color: error ? PAL.bad : PAL.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
        {value
          ? <span style={{ fontSize: 10, color: PAL.ink }}>{value}</span>
          : <Skel w="60%" h={7} />}
      </div>
      {error && <span style={{ fontSize: 8.5, color: PAL.bad }}>{error}</span>}
    </div>
  );
}

// Kebab (⋮) menu — the web analogue of long-press / swipe actions on a row.
function KebabMenu({ items = ["Edit", "Duplicate", "Delete"] }) {
  return (
    <div style={{ display: "inline-block", background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.14)", overflow: "hidden", fontFamily: UI }}>
      {items.map((it, i) => (
        <div key={i} style={{ padding: "6px 14px", fontSize: 10, color: (it === "Delete" || it === "Remove") ? PAL.bad : PAL.ink2, borderTop: i ? `1px solid ${PAL.line2}` : "none", whiteSpace: "nowrap" }}>{it}</div>
      ))}
    </div>
  );
}

// "Shop by brand" chips.
function BrandChips({ brands = ["BOSCH", "BREMBO", "MANN", "SACHS", "VALEO", "HELLA"] }) {
  return (
    <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
      {brands.map((b) => (
        <span key={b} style={{
          flexShrink: 0, padding: "10px 16px", borderRadius: 8, background: PAL.card, border: `1px solid ${PAL.line}`,
          fontFamily: UI, fontSize: 10, fontWeight: 800, color: PAL.ink2, letterSpacing: "0.02em",
        }}>{b}</span>
      ))}
    </div>
  );
}

// Catalog tab screen — the curated collections as tabs with content beneath,
// mirroring the app's Catalog tab. Pass footer to append the page footer
// (the same schematic Footer block used on desktop).
function CatalogTabsContent({ footer = false, collections = ["Road trip ready", "Off-road weekends", "Show-off mode", "Comfort upgrade", "Detail day"] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", gap: 12, padding: "8px 10px", borderBottom: `1px solid ${PAL.line}`, background: PAL.card, overflow: "hidden", fontFamily: UI, flexShrink: 0 }}>
        {collections.map((c, i) => (
          <span key={c} style={{
            fontSize: 9.5, fontWeight: i === 0 ? 700 : 500, whiteSpace: "nowrap", flexShrink: 0,
            color: i === 0 ? PAL.ink : PAL.muted, paddingBottom: 4,
          }}>{c}</span>
        ))}
      </div>
      <div style={{ padding: 8, flex: 1, minHeight: 0, display: "flex" }}>
        <Region label="Tab content" sub="categories · products" style={{ flex: 1, width: "auto", height: "auto" }} />
      </div>
      {footer && (
        <div style={{ padding: "0 8px 8px" }}>
          <Region label="Footer" sub="mass links" h={40} style={{ width: "auto" }} />
        </div>
      )}
    </div>
  );
}

// ── Mini product card (listing atom) ──────────────────────────────────────
// Three blocks: product (image · badges · wishlist/compare), description (name ·
// specs · rating), sale (price · delivery · the orange buy button). Two
// layouts: vertical (grid) and horizontal (list). All schematic placeholders.
function MiniBadges() {
  return (
    <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5 }}>
      <Pill tone="dark">Best Budget</Pill>
      <Pill tone="good">Free shipping</Pill>
    </span>
  );
}
function MiniActions({ row = false }) {
  return (
    <span style={{ display: "flex", flexDirection: row ? "row" : "column", gap: row ? 10 : 9 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.4-9.2-8.3C1 8.4 3.4 5 7 6.2 9.2 7 12 9.6 12 9.6s2.8-2.6 5-3.4c3.6-1.2 6 2.2 4.2 5.5C19 15.6 12 20 12 20z" stroke="#9a9a9a" strokeWidth="1.6" strokeLinejoin="round"/></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M6 7h12M6 7l-2.5 5.5h5L6 7zM18 7l-2.5 5.5h5L18 7z" stroke="#9a9a9a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}
function MiniDesc() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: PAL.ink, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>RIDEX PLUS Active Defense</span>
      <span style={{ fontSize: 10, color: PAL.muted }}>10W-40 · 1L · Longlife-98 MB</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Stars n={5} of={1} size={12} />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: PAL.ink }}>4.8</span>
        <span style={{ fontSize: 9.5, color: PAL.muted2 }}>(127 reviews)</span>
      </span>
    </div>
  );
}
function MiniSale({ withActions = false, oos = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {withActions && !oos && <div style={{ display: "flex", justifyContent: "flex-end" }}><MiniActions row /></div>}
      <span style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: PAL.ink, whiteSpace: "nowrap" }}>18.99&nbsp;€</span>
        <span style={{ fontSize: 9.5, color: PAL.muted2, whiteSpace: "nowrap" }}>/ per piece</span>
      </span>
      {oos
        ? <span style={{ fontSize: 10.5, fontWeight: 700, color: PAL.muted }}>Out of stock</span>
        : <span style={{ fontSize: 9.5, color: PAL.muted }}>Delivery <b style={{ color: PAL.ink2, whiteSpace: "nowrap" }}>Mon, 19 May</b></span>}
      {oos
        ? <Btn tone="secondary" block>Notify me</Btn>
        : (
          <Btn tone="accent" block>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.4 12.3a1 1 0 001 .7h8.7a1 1 0 001-.8L21 8H6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.3" fill="#fff"/><circle cx="18" cy="20" r="1.3" fill="#fff"/></svg>
              Add to cart
            </span>
          </Btn>
        )}
    </div>
  );
}
// `oos` (out of stock) drops the badges, the wishlist/compare actions and the
// delivery line, turns the buy button into a secondary «Notify me», and shows
// «Out of stock» where the delivery line was.
function MiniCard({ layout = "vertical", w = "100%", wide = false, oos = false }) {
  if (layout === "horizontal" && wide) {
    // Desktop: three columns — product · description · sale.
    return (
      <div style={{ border: `1px solid ${PAL.line2}`, borderRadius: 12, background: PAL.card, padding: 14, display: "flex", gap: 16, alignItems: "stretch", fontFamily: UI }}>
        <div style={{ width: 132, flexShrink: 0, position: "relative" }}>
          <Thumb h={122} r={8} />
          {!oos && <div style={{ position: "absolute", top: 6, left: 6 }}><MiniBadges /></div>}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}><MiniDesc /></div>
        <div style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column" }}><MiniSale withActions oos={oos} /></div>
      </div>
    );
  }
  if (layout === "horizontal") {
    // Narrow (mobile-web): image left, description + sale stacked on the right.
    return (
      <div style={{ border: `1px solid ${PAL.line2}`, borderRadius: 12, background: PAL.card, padding: 11, display: "flex", gap: 11, fontFamily: UI }}>
        <div style={{ position: "relative", width: 96, flexShrink: 0 }}>
          <Thumb h={110} r={8} />
          {!oos && <div style={{ position: "absolute", top: 5, left: 5 }}><MiniBadges /></div>}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}><MiniDesc /></div>
            {!oos && <MiniActions />}
          </div>
          <MiniSale oos={oos} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: w, border: `1px solid ${PAL.line2}`, borderRadius: 12, background: PAL.card, overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: UI, flexShrink: 0, boxSizing: "border-box" }}>
      <div style={{ position: "relative" }}>
        <Thumb h={128} r={0} />
        {!oos && <div style={{ position: "absolute", top: 8, left: 8 }}><MiniBadges /></div>}
        {!oos && <div style={{ position: "absolute", top: 8, right: 8 }}><MiniActions /></div>}
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <MiniDesc />
        <MiniSale oos={oos} />
      </div>
    </div>
  );
}

// ── Filters ────────────────────────────────────────────────────────────────
// Filter value option — white card; ink outline when selected. No text.
function FilterTile({ selected = false }) {
  return (
    <div style={{ borderRadius: 9, background: PAL.card, border: `1.5px solid ${selected ? PAL.ink : PAL.line2}`, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
      <Skel w="58%" h={7} bg={selected ? "#b0b0b0" : "#d8d8d8"} />
      <Skel w={16} h={6} bg="#e8e8e8" />
    </div>
  );
}
// Fitment hint chip — real mono text, informational not enforced.
function FitChip() {
  return <span style={{ display: "inline-flex", alignSelf: "flex-start", fontFamily: MONO, fontSize: 10, color: PAL.muted, border: `1px solid ${PAL.line}`, borderRadius: 20, padding: "4px 10px", background: PAL.card }}>For your car · 4.2L</span>;
}
// «Fits my car» green toggle — a scope, not a filter section.
function FitToggle() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "9px 12px", borderRadius: 10, background: "rgba(46,125,50,0.07)", border: `1px solid ${PAL.good}`, fontFamily: UI }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "#1f5d23", lineHeight: 1.3 }}>Only parts that fit my car</span>
      <span style={{ width: 30, height: 18, borderRadius: 20, background: PAL.good, position: "relative", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
      </span>
    </div>
  );
}
// Desktop sidebar header — «Filters» title with «Clear all» opposite.
function FiltersSidebarHead() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: UI }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: PAL.ink }}>Filters</span>
      <span style={{ fontSize: 11, color: PAL.muted, textDecoration: "underline" }}>Clear all</span>
    </div>
  );
}
// Selected-filter chips under the desktop header — bordered, removable.
function SidebarChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontFamily: UI }}>
      {[42, 66, 52].map((w, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAL.card, border: `1px solid ${PAL.line}`, borderRadius: 20, padding: "4px 6px 4px 10px" }}>
          <Skel w={w} h={6} bg="#cfcfcf" />
          <span style={{ width: 13, height: 13, borderRadius: "50%", background: PAL.line2, color: PAL.muted, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>×</span>
        </span>
      ))}
    </div>
  );
}
// Active-filter chips — dark, removable (×). No text.
function FilterChips({ n = 4 }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PAL.ink, borderRadius: 20, padding: "6px 6px 6px 12px" }}>
          <Skel w={[40, 70, 56, 80][i % 4]} h={6} bg="rgba(255,255,255,0.45)" />
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.18)", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>×</span>
        </span>
      ))}
    </div>
  );
}
// Small dropdown selector — desktop sort / view, etc.
function SelectBox({ label }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${PAL.line}`, borderRadius: 8, padding: "6px 10px", fontFamily: UI, fontSize: 11, color: PAL.ink, background: PAL.card, whiteSpace: "nowrap" }}>{label}<span style={{ fontSize: 8, color: PAL.muted2 }}>▾</span></span>;
}
function MobFilterIcon({ children }) {
  return <span style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${PAL.line}`, background: PAL.card, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{children}</span>;
}
// Sidebar filter section (desktop) — title · optional fitment chip · checkbox rows.
function SidebarSection({ n = 4, fitment = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <Skel w={96} h={8} bg="#cfcfcf" />
      {fitment && <FitChip />}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${i === 0 ? PAL.ink : PAL.line}`, background: i === 0 ? PAL.ink : "transparent", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i === 0 && "✓"}</span>
            <Skel w={`${52 + (i % 3) * 12}%`} h={7} bg="#d8d8d8" />
          </div>
        ))}
      </div>
    </div>
  );
}
// Mobile-sheet filter section — title · optional fitment chip · 2-col tiles.
function SheetSection({ n = 4, fitment = false, sel = 0 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <Skel w={110} h={8} bg="#cfcfcf" />
      {fitment && <FitChip />}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {Array.from({ length: n }).map((_, i) => <FilterTile key={i} selected={i === sel} />)}
      </div>
    </div>
  );
}
// Desktop filters — sidebar (with the fits-my-car toggle on top) · toolbar
// (title · results · sort · view) · an empty results area (no product cards).
function FiltersDesktop() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 14, height: 420, boxSizing: "border-box", fontFamily: UI }}>
      <div style={{ width: 186, flexShrink: 0, borderRight: `1px solid ${PAL.line2}`, paddingRight: 14, display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
        <FiltersSidebarHead />
        <SidebarChips />
        <FitToggle />
        <SidebarSection n={4} />
        <SidebarSection n={3} fitment />
        <SidebarSection n={3} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${PAL.line2}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: PAL.ink }}>Brake discs</span>
            <span style={{ fontSize: 10, color: PAL.muted }}>2,345 results</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <SelectBox label="Sort: Best Price" />
            <SelectBox label="View: Grid" />
          </div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, paddingTop: 14, alignContent: "start", overflow: "hidden" }}>
          {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 92, borderRadius: 10, border: `1px dashed ${PAL.line}`, background: PAL.paper }} />)}
        </div>
      </div>
    </div>
  );
}
// Mobile catalog bar — title · results · sort icon · filters icon, then the
// green fits-my-car toggle lifted out under them.
function FiltersMobileBar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 12px", fontFamily: UI }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: PAL.ink }}>Brake discs</span>
          <span style={{ fontSize: 9, color: PAL.muted }}>2,345 results</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <MobFilterIcon><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 4v15M7 4L4 7.5M7 4l3 3.5M17 20V5M17 20l-3-3.5M17 20l3-3.5" stroke={PAL.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></MobFilterIcon>
          <span style={{ position: "relative", display: "inline-flex" }}>
            <MobFilterIcon><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 7h8M16 7h4M4 17h4M12 17h8" stroke={PAL.ink} strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="7" r="2.2" stroke={PAL.ink} strokeWidth="1.8"/><circle cx="10" cy="17" r="2.2" stroke={PAL.ink} strokeWidth="1.8"/></svg></MobFilterIcon>
            <span style={{ position: "absolute", top: -5, right: -5, minWidth: 15, height: 15, padding: "0 3px", boxSizing: "border-box", borderRadius: 8, background: PAL.bad, color: "#fff", fontSize: 9, fontWeight: 700, fontFamily: UI, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #fff" }}>3</span>
          </span>
        </div>
      </div>
      <FitToggle />
    </div>
  );
}
// Mobile full-screen filter sheet — the app-like filter screen (an overlay).
function FilterSheet() {
  return (
    <div style={{ position: "absolute", inset: 0, background: PAL.card, fontFamily: UI, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 14px 12px", borderBottom: `1px solid ${PAL.line2}`, flexShrink: 0 }}>
        <span style={{ fontSize: 18, lineHeight: 1, color: PAL.ink }}>‹</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: PAL.ink }}>Filters</span>
        <span style={{ fontSize: 11, color: PAL.muted }}>Clear all</span>
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: 14, display: "flex", flexDirection: "column", gap: 16 }}>
        <FilterChips n={4} />
        <SheetSection n={2} sel={0} />
        <SheetSection fitment n={4} sel={0} />
      </div>
      <div style={{ padding: "10px 14px 20px", borderTop: `1px solid ${PAL.line2}`, flexShrink: 0 }}>
        <Btn tone="primary" block>Show results (120)</Btn>
      </div>
    </div>
  );
}

Object.assign(window, {
  MiniCard, FiltersDesktop, FiltersMobileBar, FilterSheet,
  Skel, Thumb, Region, Pill, Btn, Browser, MobileWeb, MobileAddressBar, HeaderSpine, MobileHeader,
  CollectionsStrip, SidebarFilters, ProductCard, ProductGrid, SchematicCard,
  SchematicGrid, ResultBar, BottomNav, MobileDrawer, Modal, SideDrawer, GarageOverlay, CarCarousel,
  CartDropdown, CartDrawer, AccountMenu, GarageInline, GarageTabs, GarageInlineDesktopDemo, GarageInlineMobileDemo, Breadcrumb, Toast, QtyStepper, StepProgress, Stars, EmptyState,
  FieldRow, KebabMenu, BrandChips, CatalogTabsContent, SearchOverlay,
});
