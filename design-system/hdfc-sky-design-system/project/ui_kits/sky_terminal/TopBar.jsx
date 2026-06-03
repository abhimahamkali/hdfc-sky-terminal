/* HDFC SKY — Top utility bar
   Trade dropdown · 5 market tickers · Avlb margin · +Widgets · layout · help */
function TopBar({ theme, onToggleTheme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;

  const tickers = [
    { name: 'Nifty 50',      value: '25,829.55', delta: '-30.55 (-0.12%)',  dir: 'down', tag: 'EXPIRY TODAY' },
    { name: 'SENSEX',        value: '84,475.53', delta: '-204.33 (-0.24%)', dir: 'down' },
    { name: 'Nifty Bank',    value: '58,971.20', delta: '+186.05 (+0.31%)', dir: 'up' },
    { name: 'Fin Nifty',     value: '26,402.10', delta: '+52.10 (+0.20%)',  dir: 'up' },
    { name: 'Nifty Midcap',  value: '60,118.40', delta: '-14.92 (-0.02%)',  dir: 'down' },
  ];

  const dark = theme === 'dark';
  const fg1 = dark ? '#fff' : C.ink900;
  const fg2 = dark ? C.ink400 : C.ink600;

  return (
    <div
      data-name="TopBar"
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '12px 16px',
        background: dark ? C.darkCard : C.surface0,
        borderRadius: 8, border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
      }}
    >
      {/* Trade dropdown */}
      <button
        style={{
          height: 44, padding: '8px 14px', minWidth: 200,
          background: 'transparent',
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: FN.ui, fontWeight: 500, fontSize: 14, color: fg1,
        }}
      >
        Trade <Chevron color={fg2} />
      </button>

      {/* Ticker row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, overflow: 'hidden' }}>
        {tickers.map((t, i) => (
          <React.Fragment key={t.name}>
            <Ticker {...t} theme={theme} />
            {i < tickers.length - 1 && (
              <div style={{
                width: 1, height: 18, background: dark ? C.darkBorder : C.blue100,
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Avlb margin */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: FN.data, fontSize: 12, color: fg2 }}>Avlb Mar:</span>
        <span style={{ fontFamily: FN.num, fontSize: 12, fontWeight: 600, color: C.blue500 }}>₹1.2L</span>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: FN.ui, fontSize: 12, fontWeight: 500, color: C.blue500,
        }}>+ AddFunds</button>
      </div>

      <button style={{
        padding: '8px 12px', height: 36,
        border: `1px solid ${C.blue500}`, borderRadius: 8,
        background: 'transparent', color: C.blue500,
        fontFamily: FN.ui, fontSize: 13, fontWeight: 500, cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}>+ Widgets</button>

      {/* Layout switch (theme toggle) */}
      <button
        onClick={onToggleTheme}
        title="Toggle theme"
        style={{
          width: 36, height: 36, borderRadius: 8,
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: fg1,
        }}
      >
        <LayoutIcon />
      </button>
      <button style={{
        width: 36, height: 36, borderRadius: 8,
        border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
        background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg1,
      }}>
        <PanelIcon />
      </button>
      <button style={{
        width: 36, height: 36, borderRadius: 8,
        border: 'none', background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg1,
      }}>
        <HelpIcon />
      </button>
    </div>
  );
}

function Ticker({ name, value, delta, dir, tag, theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const color = dir === 'up' ? C.profit500 : C.loss500;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
      fontFamily: FN.data, fontSize: 12,
    }}>
      <span style={{ color: dark ? '#fff' : C.ink900, fontWeight: 500 }}>{name}</span>
      <span style={{ fontFamily: FN.num, color: dark ? '#fff' : C.ink900, fontWeight: 600 }}>{value}</span>
      <Arrow dir={dir} color={color} />
      <span style={{ fontFamily: FN.num, color }}>{delta}</span>
      {tag && (
        <span className="tag tag--loss" style={{
          background: C.lossBg, color: C.loss500,
          fontFamily: FN.data, fontWeight: 700, fontSize: 10,
          padding: '2px 4px', borderRadius: 4, textTransform: 'uppercase',
          letterSpacing: 0.2,
        }}>{tag}</span>
      )}
    </div>
  );
}

// — Small SVG bits (Lucide-style, 1.5 stroke) ————————
function Arrow({ dir, color }) {
  const path = dir === 'up'
    ? 'M12 19V5 M5 12l7-7 7 7'
    : 'M12 5v14 M19 12l-7 7-7-7';
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
function Chevron({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function LayoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18 M9 3v18" />
    </svg>
  );
}
function PanelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M15 3v18" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5 M12 17h.01" />
    </svg>
  );
}

Object.assign(window, { TopBar, Ticker, Arrow, Chevron, LayoutIcon, PanelIcon, HelpIcon });
