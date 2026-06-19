// Reviews & ratings and Image gallery — both currently in the "Not ready"
// part. (The Product card is a finished Part II pattern in sec-notready.jsx;
// the flows live in src/part3/.)

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Reviews & ratings
// ════════════════════════════════════════════════════════════════════════
function PatReviews() {
  return (
    <Section id="p-reviews">
      <PatternHead category="Not ready" title="Reviews &amp; ratings"
        lede="Social proof, structured. The review block pairs an aggregate score with a distribution and the individual reviews beneath it. It's a read surface, not a form — writing a review is its own flow — and it sits below the buy decision, supporting it rather than competing with it." />

      <Callout label="Autodoc reading">
        The app shows an aggregate rating, a breakdown by star, and a scrollable list of reviews; the web keeps that structure on a wider canvas. Stars use the app's accent for the filled portion, the muted line for the rest. The block summarises first (score + count) so a glance is enough, then offers the detail for those who want it.</Callout>

      <H3>Aggregate, distribution, individual</H3>
      <p>The header states the score and count; a distribution shows how ratings spread; individual reviews follow. The same structure serves both breakpoints, single-column on mobile.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Aggregate and distribution, with reviews listed below.">
          <Browser url="autodoc.ex/product" h={320}>
            <HeaderSpine />
            <div style={{ padding: 16, display: "flex", gap: 18, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ width: 150, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: "#111" }}>4.6</span>
                  <div><Stars n={5} of={5} /><div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 2 }}>312 reviews</div></div>
                </div>
                {[5, 4, 3, 2, 1].map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 8, color: "#9a9a9a", width: 8 }}>{s}</span>
                    <div style={{ flex: 1, height: 5, borderRadius: 3, background: "#ececec", overflow: "hidden" }}><div style={{ width: [80, 55, 18, 6, 4][i] + "%", height: "100%", background: "#ff5a1f" }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid #ececec" : "none" }}>
                    <Stars n={5 - (i % 2)} of={5} size={9} /><div style={{ height: 4 }} /><Skel w="90%" h={7} /><div style={{ height: 3 }} /><Skel w="70%" h={7} />
                  </div>
                ))}
              </div>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> Score on top, reviews stacked below.">
          <MobileWeb url="autodoc.ex/product" navActive="Catalog">
            <div style={{ padding: 12, fontFamily: "-apple-system, sans-serif" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#111" }}>4.6</span>
                <div><Stars n={5} of={5} /><div style={{ fontSize: 9, color: "#6b6b6b", marginTop: 2 }}>312 reviews</div></div>
              </div>
              {[0, 1].map((i) => (
                <div key={i} style={{ padding: "8px 0", borderTop: "1px solid #ececec" }}>
                  <Stars n={5 - i} of={5} size={9} /><div style={{ height: 4 }} /><Skel w="90%" h={7} /><div style={{ height: 3 }} /><Skel w="70%" h={7} />
                </div>
              ))}
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>Summarise first.</b> Score and count up top; a glance should be enough.",
        "<b>Show the distribution,</b> so a high average with a long tail reads honestly.",
        "<b>Read, don't write, here.</b> Composing a review is a separate flow, not inline.",
        "<b>Stars use the accent</b> for the filled portion, muted line for the rest — no gold.",
      ]}/>

      <DoDont
        doItem="Lead with the aggregate and distribution, then list individual reviews, keeping the block below the buy decision."
        dontItem="Don't bury the score, and don't merge the review-writing form into the read block."
      />

    </Section>
  );
}
window.PatReviews = PatReviews;

// ════════════════════════════════════════════════════════════════════════
// PATTERN · Image gallery
// ════════════════════════════════════════════════════════════════════════
function PatGallery() {
  return (
    <Section id="p-gallery">
      <PatternHead category="Product" title="Image gallery"
        lede="One gallery carries everything a part shows — photos, an installation video, a 360° view, a fitment diagram — behind a single viewer. On the product page it lives inline as the main media; clicking it opens a larger view. On desktop that view is a modal lightbox with prev/next and a thumb rail; on mobile-web it is the app's dark full-screen viewer. Elsewhere — cart, lists — the gallery collapses to one thumbnail." />

      <Callout label="Autodoc reading">
        A part has more than one kind of image: product shots, an install video, a 360° spin, a fitment diagram. The app puts them all in one gallery with one viewer — tap, swipe, close, every media type the same. The web keeps that: on desktop the main image opens a <b>modal lightbox</b>; on mobile-web it keeps the app's <b>dark full-screen viewer</b>. The active thumb and the position dots are marked in <b>ink</b>, not colour; the viewer commits nothing — close returns you to the page where you left.</Callout>

      <H3>Inline on the product page</H3>
      <p>Desktop has room for the thumb rail under the main image; mobile-web shows the main image with position dots and keeps the thumbnails inside the viewer. A small badge marks the media type (360°, video, fitment) on the main image itself.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop.</b> Click the square main image to open; the thumb rail sits beneath it, title · subtitle placeholders to the right. The 360° spin is the first thumb.">
          <Browser url="autodoc.ex/product/ref-11009">
            <HeaderSpine />
            <GalleryDesktop />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web.</b> The main image leads, position dots beneath; the thumbnails live in the viewer, as in the app.">
          <MobileWeb url="autodoc.ex/product/ref-11009" navActive="Catalog">
            <GalleryMobile />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>Opened — lightbox on desktop, full-screen viewer on mobile</H3>
      <p>Clicking the main image opens the larger view. On desktop it is a modal lightbox over the dimmed page — title and item number, prev/next arrows, the thumb rail. On mobile-web it is the app's dark corridor — the shell goes away, a ✕ returns immediately, the thumb strip sits at the bottom.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop — lightbox.</b> A modal over the dimmed page: title · item no. (placeholders), big image with prev/next, thumb rail. Close with the plain ✕, Esc or the backdrop.">
          <Browser url="autodoc.ex/product/ref-11009">
            <HeaderSpine />
            <GalleryDesktop />
            <GalleryLightbox />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — full-screen viewer.</b> The app's dark surface: title · subtitle placeholders and a ✕ on top, the big media, a dark thumb strip below. Commits nothing.">
          <MobileWeb url="autodoc.ex/product/ref-11009" navActive="Catalog" overlay={<GalleryViewer />}>
            <GalleryMobile />
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <H3>One viewer, every media type</H3>
      <p>Four kinds of media pass through the same component and the same viewer — a photo, an install video (with a play affordance), a 360° spin, a fitment diagram. A badge in the corner of the main media tells the user what opening it will do.</p>
      <FrameRow>
        <FrameCell caption="<b>Media types.</b> One component, four kinds — photo, video, 360°, fitment — each with its corner badge. No separate screens per media.">
          <div style={{ padding: 4 }}><GalMediaSpecimens /></div>
        </FrameCell>
      </FrameRow>

      <H3>Collapsed outside the product page</H3>
      <p>In the cart, lists and the checkout the user is reviewing, not browsing — so the gallery collapses to a single primary thumbnail. No carousel, no viewer, no media badges; the thumbnail just signals what the item is.</p>
      <FrameRow>
        <FrameCell caption="<b>Cart / list row.</b> A single primary thumbnail per line — same on both breakpoints. To see the full gallery the user returns to the product page.">
          <div style={{ padding: 4 }}><GalCollapsed /></div>
        </FrameCell>
      </FrameRow>

      <H3>Loading and error</H3>
      <p>The gallery fetches media, so it always carries the two states. Loading: a square skeleton in the media slot and the thumb rail while images stream in — no spinner, the container itself is the wait, with only the title and subtitle placeholders beside it. Error: a broken-media tile with the retry carried by a toast, not a button on the image; the rest of the page keeps rendering.</p>
      <FrameRow>
        <FrameCell caption="<b>Desktop — loading.</b> A square skeleton in the media slot, skeleton thumb rail, and title · subtitle placeholders to the side — no price or buttons yet.">
          <Browser url="autodoc.ex/product/ref-11009">
            <HeaderSpine />
            <GalleryLoading />
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — loading.</b> Square skeleton media + dots; no spinner.">
          <MobileWeb url="autodoc.ex/product/ref-11009" navActive="Catalog">
            <GalleryLoading mobile />
          </MobileWeb>
        </FrameCell>
      </FrameRow>
      <FrameRow>
        <FrameCell caption="<b>Desktop — error.</b> A broken-media tile beside title · subtitle placeholders. The failure is a toast with Retry — never a button on the image; the rest of the page keeps rendering.">
          <Browser url="autodoc.ex/product/ref-11009">
            <HeaderSpine />
            <GalleryError />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, display: "flex", justifyContent: "center" }}>
              <Toast tone="dark" action="Retry">Couldn't load images</Toast>
            </div>
          </Browser>
        </FrameCell>
        <FrameCell caption="<b>Mobile-web — error.</b> The same broken-media tile; the retry lives in a toast, and the page below keeps rendering.">
          <MobileWeb url="autodoc.ex/product/ref-11009" navActive="Catalog">
            <GalleryError mobile />
            <div style={{ position: "absolute", left: 10, right: 10, bottom: 70, display: "flex", justifyContent: "center", zIndex: 10 }}>
              <Toast tone="dark" action="Retry">Couldn't load images</Toast>
            </div>
          </MobileWeb>
        </FrameCell>
      </FrameRow>

      <Rules items={[
        "<b>One gallery, many media.</b> Photo, video, 360° and fitment pass through one component and one viewer — no separate screens per media type.",
        "<b>Click or tap the main image to open.</b> A modal lightbox on desktop, the dark full-screen viewer on mobile-web — both dismiss with ✕ / Esc / backdrop and commit nothing.",
        "<b>Thumbs inline on desktop, in the viewer on mobile.</b> Desktop shows the rail under the main image; mobile shows dots and keeps the thumbnails inside the viewer.",
        "<b>Mark the active thumb and dot in ink,</b> not colour — a media-type badge sits in the corner of the main image.",
        "<b>Always loading and error.</b> Skeletons while media streams; on failure a broken-media tile and an error toast with Retry — never a Retry button on the image — and the rest of the page keeps rendering.",
        "<b>Elsewhere the gallery collapses</b> to a single thumbnail — cart lines and list rows show one image, no carousel.",
      ]}/>

      <DoDont
        doItem="Keep one viewer for every media type, open it from the main image, and mark position in ink; collapse to a single thumbnail outside the product page."
        dontItem="Don't build separate viewers per media type, don't require zoom to judge the part, and don't carry a full carousel into the cart."
      />

    </Section>
  );
}
window.PatGallery = PatGallery;
