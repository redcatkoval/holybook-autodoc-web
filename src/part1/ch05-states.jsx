function Ch05States() {
  return (
    <Section id="states">
      <ChapterHead num="04" title="States"
        lede="States are content, not afterthoughts — an empty cart, a loading list, an outage card are designed views, not gaps to apologise for. The canon here is the same as the mobile book." />

      <H3>Content states — six principles</H3>
      <Rules items={[
        "<b>States are content.</b> An empty cart, a loading list, an outage card — each is a designed view with copy, an icon, and one CTA. Not an absence; a piece of product.",
        "<b>Never silent.</b> Every failure or wait produces a visible state — toast, inline message, or full container. The user always knows what is happening and what to do next.",
        "<b>Always offer the next step.</b> Empty states have one CTA; errors have one Retry; loading offers a path to keep using what is already on screen. A state without an exit is a wall.",
        "<b>Don't blame the user.</b> No &quot;Invalid input&quot;, no &quot;Something went wrong&quot;. Say what was expected, what failed, and what to try.",
        "<b>Network errors get a clear answer.</b> Pick the surface by where the failure invalidates the screen — inline at the field for validation, a non-blocking toast when content is still usable, a modal with Retry / Cancel when the user must answer, a hard container error when the container can't render. Loaded lists keep rendering until the user opts to reload.",
        "<b>Match the surface to the failing container.</b> On mobile this rule said &quot;match the layer&quot;. On web there are no layers — instead the state lives <i>where the failing container lives</i>: inline in the flow, inside the drawer or modal, or as a full-page error when the whole page can't render.",
      ]}/>

      <DoDont
        doItem="Treat each state as a designed view with copy, restraint, and one clear next step, and put each state where the failure actually is — inline in the flow, inside the drawer or modal, or as a full-page error only when the whole page can't render."
        dontItem="Don't show bare spinners, blank panels, or &quot;No data found&quot;, and don't escalate every failure to a full-page error when a toast or an inline message would do."
      />
    </Section>
  );
}
window.Ch05States = Ch05States;
