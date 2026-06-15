function Cover() {
  return (
    <header className="cover">
      <div>
        <Eyebrow>Holy Book · Web</Eyebrow>
        <h1 className="title">The rules that make<br/>Autodoc on the web feel like Autodoc.</h1>
        <p className="lede" style={{maxWidth:"54ch", marginTop:24}}>
          A sibling to the mobile Holy Book, for the web product. Three parts: architecture,
          then patterns, then composed flows. Where things live on a page, how they relate,
          what they do in every state, and how desktop folds down to mobile-web. Not the
          colours, not the components — those live in the kit. This is the language.
        </p>
        <p className="lede" style={{maxWidth:"54ch", marginTop:18, fontStyle:"italic", color:"var(--ink-2)"}}>
          The web book is its own artifact. The metaphor is no longer spatial layers — it is
          <span className="hl"> the active vehicle as a global filter, the URL as state</span>,
          and a small set of surfaces. When in doubt, return to the car in the header.
        </p>
      </div>
      <div className="cover-foot">
        <div className="cover-meta">
          <div>Audience<span>Teams that build the product</span></div>
          <div>Format<span>Architecture &amp; patterns</span></div>
          <div>Scope<span>Web (desktop + mobile-web)</span></div>
        </div>
      </div>
    </header>
  );
}
window.Cover = Cover;
