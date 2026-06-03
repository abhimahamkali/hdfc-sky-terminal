/* HDFC SKY — Option Chain widget
   3-column CALL · STRIKE · PUT layout with PCR and Long-Buildup callout */
function OptionChain({ theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';

  // Sample strike ladder
  const strikes = [
    { call: '245.00', call2: '24.50 (1.34%)', strike: '18,250', pcr: '18.34', put: '245.00', put2: '24.50 (1.34%)' },
    { call: '245.00', call2: '24.50 (1.34%)', strike: '18,250', pcr: '18.34', put: '245.00', put2: '24.50 (1.34%)' },
    { call: '245.00', call2: '24.50 (1.34%)', strike: '18,250', pcr: '18.34', put: '245.00', put2: '24.50 (1.34%)' },
    { call: '245.00', call2: '24.50 (1.34%)', strike: '18,250', pcr: '18.34', put: '245.00', put2: '24.50 (1.34%)' },
    { call: '245.00', call2: '24.50 (1.34%)', strike: '18,250', pcr: '18.34', put: '245.00', put2: '24.50 (1.34%)' },
  ];

  const longBuildupAt = 2; // show callout below 3rd row

  return (
    <div data-name="OptionChain" style={{
      ...window.SKY.card(theme),
      display: 'flex', flexDirection: 'column',
      padding: 16, gap: 12, height: '100%', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={window.SKY.tabStyle(true, theme)}>Option Chain</span>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer',
          color: dark ? '#fff' : C.ink900 }}>
          <ExpandGlyph />
        </button>
      </div>

      {/* Two dropdown filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Dropdown label="Price" theme={theme} />
        <Dropdown label="06 Jan 2026" theme={theme} />
        <button style={{
          width: 36, height: 36, borderRadius: 6,
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          background: 'transparent', cursor: 'pointer',
          color: dark ? '#fff' : C.ink900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><FilterGlyph /></button>
        <button style={{
          width: 36, height: 36, borderRadius: 6,
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          background: 'transparent', cursor: 'pointer',
          color: dark ? '#fff' : C.ink900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><InfoGlyph /></button>
      </div>

      {/* Column header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        fontFamily: FN.data, fontSize: 11, fontWeight: 600,
        color: dark ? C.ink400 : C.ink600, textAlign: 'center',
      }}>
        <span><span style={{ marginRight: 4 }}>LTP</span><span style={{
          color: C.blue500, fontWeight: 700, fontSize: 12,
          fontFamily: FN.ui,
        }}>CALL</span></span>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <SearchGlyph color={dark ? C.ink400 : C.ink600} /><span style={{
            fontWeight: 700, fontSize: 12, fontFamily: FN.ui,
            color: dark ? '#fff' : C.ink900,
          }}>STRIKE</span>
        </span>
        <span><span style={{
          color: C.blue500, fontWeight: 700, fontSize: 12,
          fontFamily: FN.ui,
        }}>PUT</span><span style={{ marginLeft: 4 }}>LTP</span></span>
      </div>

      {/* Strike rows */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {strikes.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 4,
            }}>
              <Cell side="call" v1={s.call} v2={s.call2} theme={theme} />
              <Cell side="strike" v1={s.strike} v2={`PCR : ${s.pcr}`} theme={theme} />
              <Cell side="put" v1={s.put} v2={s.put2} theme={theme} />
            </div>
            {i === longBuildupAt && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '6px 0',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  color: C.profit500, fontFamily: FN.data, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: 0.4,
                }}>
                  <InfoCircleGlyph color={C.profit500} /> LONG BUILDUP
                </span>
                <span style={{
                  fontFamily: FN.num, fontSize: 12, color: dark ? '#fff' : C.ink900,
                }}>1,274.75</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Cell({ side, v1, v2, theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  let bg = 'transparent', border = 'transparent', color = dark ? '#fff' : C.ink900;
  if (side === 'call')   { bg = '#FFFAEB'; }
  if (side === 'strike') { bg = dark ? '#11144A' : C.blue50; }
  if (side === 'put')    { bg = '#ECFDF3'; }
  // dark adjustments
  if (dark && side === 'call') bg = 'rgba(240,68,56,0.08)';
  if (dark && side === 'put')  bg = 'rgba(3,152,85,0.10)';
  return (
    <div style={{
      background: bg, borderRadius: 4,
      padding: '6px 8px', textAlign: 'center',
      fontFamily: FN.num,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color }}>{v1}</div>
      <div style={{ fontSize: 10, color: dark ? C.ink400 : C.ink600 }}>{v2}</div>
    </div>
  );
}

function Dropdown({ label, theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  return (
    <button style={{
      flex: 1, height: 36, padding: '8px 12px',
      borderRadius: 6, border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
      background: 'transparent', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: FN.ui, fontSize: 12, color: dark ? '#fff' : C.ink900,
    }}>
      {label} <Chevron color={dark ? '#fff' : C.ink600} />
    </button>
  );
}

function FilterGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18 M6 12h12 M10 18h4"/></svg>;
}
function InfoGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01 M11 12h1v4"/></svg>;
}
function InfoCircleGlyph({ color }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01 M11 12h1v4" strokeLinecap="round"/></svg>;
}

Object.assign(window, { OptionChain, Cell, Dropdown, FilterGlyph, InfoGlyph, InfoCircleGlyph });
