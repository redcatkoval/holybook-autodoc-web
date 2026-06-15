function TOC() {
  const partI = [
    ["01", "Vehicle is the spine", "vehicle"],
    ["02", "Layout", "layout"],
    ["03", "Surfaces", "surfaces"],
    ["04", "States", "states"],
    ["05", "Accessibility", "input-a11y"],
  ];

  const partII = [
    ["Navigation & search", [
      ["", "Mega-menu", "p-megamenu"],
      ["", "Search", "p-search"],
      ["", "List filtering", "p-listfilter"],
      ["", "Breadcrumb", "p-breadcrumb"],
    ]],
    ["Surfaces", [
      ["", "Modal views", "p-modal"],
      ["", "Dialogs & alerts", "p-dialogs"],
      ["", "Toast", "p-snackbar"],
      ["", "Infoblocks", "p-infoblock"],
      ["", "Result screens", "p-final"],
    ]],
    ["Controls", [
      ["", "Action hierarchy", "p-buttons"],
      ["", "Dropdowns", "p-dropdown"],
      ["", "Accordion", "p-accordion"],
      ["", "Step indicators", "p-steps"],
    ]],
    ["Actions on items", [
      ["", "Context menus", "p-context"],
    ]],
    ["Status", [
      ["", "Loading", "p-loading"],
      ["", "Empty states", "p-empty"],
      ["", "Errors", "p-errors"],
      ["", "Optimistic & undo", "p-undo"],
    ]],
  ];

  const notReady = [
    ["", "Filters", "p-filters"],
    ["", "Quantity stepper", "p-stepper"],
    ["", "Reviews & ratings", "p-reviews"],
    ["", "Image gallery", "p-gallery"],
    ["", "Widgets", "p-promo"],
    ["", "Product card", "nr-card"],
    ["", "Sign in & register", "f-auth"],
    ["", "Add a car", "f-addcar"],
    ["", "Help me choose", "f-help"],
    ["", "Cart → order", "f-checkout"],
  ];

  const allIds = [
    ...partI,
    ...partII.flatMap(g => g[1]),
    ...notReady,
  ].map(x => x[2]);

  const [active, setActive] = useState(partI[0][2]);
  useEffect(() => {
    const onScroll = () => {
      let cur = partI[0][2];
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderItem = ([num, label, id]) => (
    <li key={id}>
      <a href={"#"+id} data-num={num} className={active === id ? "active" : ""}>{label}</a>
    </li>
  );

  const partLabel = (mt) => ({
    marginTop: mt, marginBottom: 8,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: "0.16em",
  });
  const groupLabel = {
    marginTop: 16, marginBottom: 4, paddingLeft: 2,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em",
  };

  return (
    <nav className="toc">
      <div className="toc-brand">Holy Book</div>
      <div className="toc-brand-sub mono">Autodoc · Web</div>

      <div style={partLabel(28)}>Part I — Architecture</div>
      <ul className="toc-list">{partI.map(renderItem)}</ul>

      <div style={partLabel(28)}>Part II — Pattern Library</div>
      {partII.map(([g, items]) => (
        <div key={g}>
          <div style={groupLabel}>{g}</div>
          <ul className="toc-list">{items.map(renderItem)}</ul>
        </div>
      ))}

      <div style={partLabel(28)}>Not ready</div>
      <ul className="toc-list">{notReady.map(renderItem)}</ul>
    </nav>
  );
}
window.TOC = TOC;
