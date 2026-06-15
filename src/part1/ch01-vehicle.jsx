function Ch01Vehicle() {
  return (
    <Section id="vehicle">
      <ChapterHead num="01" title="Vehicle is the spine"
        lede={<>The web product has no dark/white layer contract like the mobile app. Its organizing principle is <span className="hl">contextual, not spatial</span>: the <b>active vehicle is a global filter</b> that lives in the header on every page. Every list, price, and recommendation is a projection of the catalog through the active car.</>} />

      <Callout label="The mental model">
        Where mobile leans on two layers, the web has neither — the <b>car in the header is a lens</b>. Change the lens and the page re-renders around the same place; you never travel anywhere, and you never ask &quot;parts for which car?&quot;.
      </Callout>

      <H3>Where the car lives</H3>
      <p>The active vehicle is a persistent <b>pill in the header</b> — on desktop next to the logo, on mobile-web on its own row under it. The pill is only the quick switcher; the full <b>garage</b> (cars, orders, wishlist, rewards) is a separate destination.</p>

      <H3>Three principles</H3>
      <Rules items={[
        "<b>Context over navigation.</b> The active car is the anchor. The user never loses their place because the lens, not the location, is what changes most often.",
        "<b>Vehicle is sovereign.</b> When a car is active, fitment, recommendations, and compatibility are all scoped to it — the catalog is seen through the car, not in the abstract.",
        "<b>Switching re-renders, never navigates.</b> Changing the active car re-renders the current page in place. In URL terms the car is a parameter (<code>?car=</code>) written with history <i>replace</i> — the link is shareable, but switching does not pile up back-stack entries.",
      ]}/>

      <H3>Cold start — no car yet</H3>
      <p>With no car selected the catalog is <b>not</b> emptied — browsing is never blocked. Instead a <b>banner sits above the listing</b> (mirroring the app's search) saying no vehicle is chosen and inviting the user to add one; the header pill carries the same &quot;Add a car&quot; invite. Fitment and &quot;fits your car&quot; badges stay dormant until a car is picked, but the products are still there to see.</p>

      <DoDont
        doItem="Scope every price, list, and recommendation through the active car, and keep the car visible in the header on every page. Treat a car switch as a content re-render of the same page."
        dontItem="Don't present fitment or compatibility &quot;in general&quot;, and don't turn a car switch into a navigation that loses the user's place or floods the browser back stack. Don't empty the catalog at cold start — show it with an add-a-car banner instead."
      />
    </Section>
  );
}
window.Ch01Vehicle = Ch01Vehicle;
