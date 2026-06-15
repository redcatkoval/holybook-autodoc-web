function Ch06InputA11y() {
  return (
    <Section id="input-a11y">
      <ChapterHead num="05" title="Accessibility"
        lede="Accessibility on the web is wider than on mobile: mouse, keyboard, and touch coexist, so every essential action must work in all three — nothing mode-exclusive. Visible focus, keyboard operability, adequate targets, and contrast are the non-negotiables; how each control styles its hover, focus, and active states is left to the components." />

      <H3>The non-negotiables</H3>
      <ul className="rules">
        <li><b>Input parity.</b> Every essential action works by mouse, keyboard, and touch — nothing is hover-only or right-click-only. The keyboard reaches and operates everything: <code>Esc</code> closes the top overlay, arrow keys move within menus, <code>Enter</code> / <code>Space</code> activate. (How a control draws its hover, focus, and active states is a component detail, not an architecture one.)</li>
        <li><b>Visible focus.</b> Every interactive element shows a clear focus ring when reached by keyboard. Focus is never invisible.</li>
        <li><b>Logical tab order.</b> Tab follows reading order; opening a modal or drawer moves focus into it and traps focus until it closes, then returns focus to the trigger.</li>
        <li><b>Target size.</b> Minimum 32px on desktop, 44px on mobile-web — the floor below which a control is unreliable.</li>
        <li><b>ARIA basics.</b> Modals, drawers, and menus carry their roles and labels; the active vehicle is announced so screen-reader users know the current lens.</li>
      </ul>

      <H3>Contrast & copy</H3>
      <Rules items={[
        "<b>WCAG AA at minimum.</b> Body text 4.5:1; large text 3:1; UI elements 3:1.",
        "<b>Don't rely on colour or position alone.</b> Fitment status uses a glyph and colour; active nav uses weight and colour.",
        "<b>State the result, not the action.</b> Buttons name the outcome — <i>Save changes</i> beats <i>OK</i>.",
        "<b>Speak to the owner.</b> &quot;Your BMW&quot;, not &quot;the vehicle&quot;. Localise units, currency, and plate formats per region.",
      ]}/>

      <DoDont
        doItem="Make every control reachable by mouse, keyboard, and touch; show a visible focus ring; trap and restore focus around overlays; keep targets at 32 / 44px."
        dontItem="Don't hide essential actions behind hover or right-click only, and don't ship a control the keyboard can't reach."
      />
    </Section>
  );
}
window.Ch06InputA11y = Ch06InputA11y;
