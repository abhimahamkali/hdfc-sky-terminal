/* HDFC SKY — WatchList card
   Numbered tabs · search · scrip rows with price & % change */
function WatchList({ theme, scrips, activeTab, onTabChange, query, onQuery }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';

  const tabs = [1, 2, 3, 4, 5];

  return (
    <div data-name="WatchList" style={{
      ...window.SKY.card(theme),
      display: 'flex', flexDirection: 'column',
      padding: 16, gap: 12, height: '100%', overflow: 'hidden',
    }}>
      {/* Header tab + expand */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DragDots theme={theme} />
          <span style={window.SKY.tabStyle(true, theme)}>WatchList</span>
          <button style={iconBtn(theme)}><PlusGlyph /></button>
        </div>
        <button style={iconBtn(theme)}><ExpandGlyph /></button>
      </div>

      {/* Sub-tabs Explore | 1 2 3 4 5 + | code */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: FN.ui, fontSize: 13, fontWeight: 500,
          color: dark ? '#fff' : C.ink900, padding: '4px 8px',
        }}>Explore</button>
        {tabs.map(n => (
          <button
            key={n}
            onClick={() => onTabChange?.(n)}
            style={{
              width: 28, height: 28, borderRadius: 6,
              border: activeTab === n
                ? `1.5px solid ${C.blue500}`
                : `1px solid ${dark ? C.darkBorder : C.blue100}`,
              background: activeTab === n ? (dark ? C.darkCard : C.blue50) : 'transparent',
              fontFamily: FN.ui, fontSize: 12, fontWeight: 600,
              color: activeTab === n ? C.blue500 : (dark ? '#fff' : C.ink900),
              cursor: 'pointer',
            }}
          >{n}</button>
        ))}
        <button style={{
          width: 28, height: 28, borderRadius: 6,
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          background: 'transparent', cursor: 'pointer',
          color: dark ? '#fff' : C.ink900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><PlusGlyph /></button>
        <button style={{
          width: 28, height: 28, marginLeft: 'auto', borderRadius: 6,
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
          background: 'transparent', cursor: 'pointer',
          color: dark ? '#fff' : C.ink900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><CodeGlyph /></button>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 6,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
        }}>
          <SearchGlyph color={dark ? C.ink400 : C.ink600} />
          <input
            value={query || ''}
            onChange={e => onQuery?.(e.target.value)}
            placeholder="Search symbol"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontFamily: FN.ui, fontSize: 13, color: dark ? '#fff' : C.ink900,
              flex: 1,
            }}
          />
        </div>
        <button style={iconBtnBox(theme)}><MoreGlyph /></button>
      </div>

      {/* Scrips */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {scrips.map((s, i) => (
          <ScripRow key={i} {...s} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function ScripRow({ name, exch, vol, ltp, pnl, dir, theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const profit = dir === 'up';
  const color = profit ? C.profit500 : C.loss500;
  return (
    <div style={{
      padding: '12px 4px',
      borderBottom: `1px solid ${dark ? C.darkBorder : '#E3E4E6'}`,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: FN.ui, fontSize: 14, fontWeight: 600,
          color: dark ? '#fff' : C.ink900,
        }}>{name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: FN.num, fontSize: 13, fontWeight: 600,
            color: dark ? '#fff' : C.ink900 }}>{ltp}</span>
          <Arrow dir={dir} color={color} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FN.data, fontSize: 11, color: dark ? C.ink400 : C.ink600 }}>
          {exch} | VOL {vol}
        </span>
        <span style={{ fontFamily: FN.num, fontSize: 11, color }}>{pnl}</span>
      </div>
    </div>
  );
}

// — tiny glyphs ————————————————————
const iconBtn = (theme) => ({
  width: 24, height: 24, padding: 0, background: 'transparent',
  border: 'none', borderRadius: 4, cursor: 'pointer',
  color: theme === 'dark' ? '#fff' : window.SKY.colors.ink900,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});
const iconBtnBox = (theme) => ({
  width: 36, height: 36, padding: 0, background: 'transparent',
  border: `1px solid ${theme === 'dark' ? window.SKY.colors.darkBorder : window.SKY.colors.blue100}`,
  borderRadius: 6, cursor: 'pointer',
  color: theme === 'dark' ? '#fff' : window.SKY.colors.ink900,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});
function DragDots({ theme }) {
  const c = theme === 'dark' ? '#fff' : window.SKY.colors.ink400;
  return (
    <svg width="10" height="14" viewBox="0 0 10 14">
      {[2,7,12].map(y =>
        <React.Fragment key={y}>
          <circle cx="2" cy={y} r="1" fill={c} />
          <circle cx="8" cy={y} r="1" fill={c} />
        </React.Fragment>
      )}
    </svg>
  );
}
function PlusGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>;
}
function ExpandGlyph() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"/></svg>;
}
function SearchGlyph({ color }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
}
function CodeGlyph() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6 M8 6l-6 6 6 6"/></svg>;
}
function MoreGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>;
}

Object.assign(window, { WatchList, ScripRow, DragDots, PlusGlyph, ExpandGlyph, SearchGlyph, CodeGlyph, MoreGlyph });
