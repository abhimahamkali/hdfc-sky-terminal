/* HDFC SKY — Positions table
   Tabs Positions/Orders/GTT/Alerts/Holiday Calender/Economic Calender */
function PositionsTable({ theme, activeTab, onTabChange }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const tabs = ['Positions', 'Orders', 'GTT', 'Alerts', 'Holiday Calender', 'Economic Calender'];

  const rows = [
    { name: 'TCS',       qty: '1,00,000', avg: '5000', ltp: '5000', cur: '10,000,00', inv: '10,000,00', pl: '14,34,535.75',  pct: '15.54%',  profit: true },
    { name: 'MAHABANK',  qty: '6',        avg: '5000', ltp: '5000', cur: '12,980.32', inv: '2,315.32',  pl: '-14,34,535.75', pct: '15.54%',  profit: false },
    { name: 'TATAPOWER', qty: '6',        avg: '5000', ltp: '5000', cur: '12,980.32', inv: '2,315.32',  pl: '14,34,535.75',  pct: '15.54%',  profit: true },
    { name: 'RELIANCE',  qty: '8',        avg: '7000', ltp: '7100', cur: '56,800.00', inv: '56,000.00', pl: '800.00',        pct: '1.43%',   profit: true },
    { name: 'INFOSYS',   qty: '7',        avg: '4500', ltp: '4400', cur: '30,800.00', inv: '31,500.00', pl: '-700.00',       pct: '-2.22%',  profit: false },
  ];

  const cols = ['Scrip Name', 'Qty', 'Avg', 'LTP', 'Current', 'Invested', 'Total P/L', 'P&L%'];

  return (
    <div data-name="PositionsTable" style={{
      ...window.SKY.card(theme),
      display: 'flex', flexDirection: 'column',
      padding: 16, gap: 12, height: '100%', overflow: 'hidden',
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 32,
        borderBottom: `1px solid ${dark ? C.darkBorder : C.blue100}`,
      }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => onTabChange?.(t)}
            style={{
              padding: '6px 0', background: 'transparent', border: 'none',
              cursor: 'pointer', whiteSpace: 'nowrap',
              ...window.SKY.tabStyle(activeTab === t, theme),
            }}
          >{t}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse',
          fontFamily: FN.data, fontSize: 13,
        }}>
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c} style={{
                  textAlign: 'left', padding: '10px 12px',
                  background: dark ? C.darkCard : '#F8F8FA',
                  borderTop: `1px solid ${dark ? C.darkBorder : C.blue100}`,
                  borderBottom: `1px solid ${dark ? C.darkBorder : C.blue100}`,
                  color: dark ? C.ink400 : C.ink600, fontWeight: 500, fontSize: 12,
                  whiteSpace: 'nowrap',
                }}>{c} <SortGlyph color={dark ? C.ink400 : C.ink400} /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${dark ? C.darkBorder : '#E3E4E6'}` }}>
                <td style={cellSty(dark, true)}>{r.name}</td>
                <td style={cellSty(dark)}>{r.qty}</td>
                <td style={cellSty(dark)}>{r.avg}</td>
                <td style={cellSty(dark)}>{r.ltp}</td>
                <td style={cellSty(dark)}>{r.cur}</td>
                <td style={cellSty(dark)}>{r.inv}</td>
                <td style={{ ...cellSty(dark), color: r.profit ? C.profit500 : C.loss500, fontWeight: 600 }}>{r.pl}</td>
                <td style={{ ...cellSty(dark), color: r.profit ? C.profit500 : C.loss500, fontWeight: 600 }}>{r.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellSty = (dark, name) => ({
  padding: '12px',
  color: dark ? (name ? '#fff' : window.SKY.colors.ink400) : (name ? window.SKY.colors.ink900 : window.SKY.colors.ink600),
  fontWeight: name ? 600 : 400,
  fontFamily: name ? window.SKY.font.ui : window.SKY.font.num,
  whiteSpace: 'nowrap',
});
function SortGlyph({ color }) {
  return <svg width="10" height="10" viewBox="0 0 12 12" style={{ marginLeft: 4 }}><path d="M3 5l3-3 3 3 M3 7l3 3 3-3" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

Object.assign(window, { PositionsTable, SortGlyph });
