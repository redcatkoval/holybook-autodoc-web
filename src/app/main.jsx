function PartDivider({ num, title, lede }) {
  return (
    <div style={{ marginTop: 100, marginBottom: 40, paddingTop: 60, borderTop: "2px solid var(--ink)" }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.18em",
        marginBottom: 12,
      }}>{num}</div>
      <h1 className="title" style={{ fontSize: 48 }}>{title}</h1>
      {lede && <p className="lede" style={{ maxWidth: "60ch", marginTop: 16 }}>{lede}</p>}
    </div>
  );
}

function GroupLabel({ children }) {
  return (
    <div style={{
      marginTop: 64, marginBottom: 8,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
      color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.18em",
      borderTop: "1px solid var(--line)", paddingTop: 20,
    }}>{children}</div>
  );
}

function App() {
  return (
    <div className="layout">
      <TOC />
      <main>
        <Cover />
        <hr className="rule"/>
        <Ch01Vehicle />
        <hr className="rule"/>
        <Ch04Layout />
        <hr className="rule"/>
        <Ch02Surfaces />
        <hr className="rule"/>
        <Ch05States />
        <hr className="rule"/>
        <Ch06InputA11y />

        <PartDivider num="Part II" title="Pattern Library"
          lede="The reusable web patterns, taken from the mobile book and split exactly as the app book splits them — one pattern per section — but described under the web's principles. Each shows its desktop and mobile-web form side by side." />

        <GroupLabel>Navigation &amp; search</GroupLabel>
        <PatMegaMenu />
        <hr className="rule"/>
        <PatSearch />
        <hr className="rule"/>
        <PatListFilter />
        <hr className="rule"/>
        <PatBreadcrumb />

        <GroupLabel>Surfaces</GroupLabel>
        <PatModal />
        <hr className="rule"/>
        <PatDialogs />
        <hr className="rule"/>
        <PatSnackbar />
        <hr className="rule"/>
        <PatInfoblock />
        <hr className="rule"/>
        <PatFinal />

        <GroupLabel>Controls</GroupLabel>
        <PatButtons />
        <hr className="rule"/>
        <PatDropdown />
        <hr className="rule"/>
        <PatAccordion />
        <hr className="rule"/>
        <PatSteps />

        <GroupLabel>Actions on items</GroupLabel>
        <PatContext />

        <GroupLabel>Status</GroupLabel>
        <PatLoading />
        <hr className="rule"/>
        <PatEmpty />
        <hr className="rule"/>
        <PatErrors />
        <hr className="rule"/>
        <PatUndo />

        <PartDivider num="Not ready" title="Open questions"
          lede="Patterns and flows whose web form isn't settled yet — documented as questions, not decisions, so the gaps are visible." />
        <PatFilters />
        <hr className="rule"/>
        <PatStepper />
        <hr className="rule"/>
        <PatReviews />
        <hr className="rule"/>
        <PatGallery />
        <hr className="rule"/>
        <PatWidgets />
        <hr className="rule"/>
        <PatProductCard />
        <hr className="rule"/>
        <FlowAuth />
        <hr className="rule"/>
        <FlowAddCar />
        <hr className="rule"/>
        <FlowHelpMeChoose />
        <hr className="rule"/>
        <FlowCheckout />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
