/* HDFC SKY — Add Widgets modal
   Two variants: grid (with chart preview tiles) and list (icon + label) */
function AddWidgetsModal({ theme, open, view, onView, onClose }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  if (!open) return null;

  const onBgClick = (e) => { if (e.target === e.currentTarget) onClose?.(); };

  return (
    <div
      onClick={onBgClick}
      style={{
        position: 'absolute', inset: 0, background: 'rgba(3,5,40,0.18)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
        padding: 80, zIndex: 50,
      }}
    >
      <div style={{
        width: 720, background: dark ? C.darkCard : C.surface0,
        border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
        borderRadius: 12, boxShadow: '0 8px 24px rgba(40,80,231,0.10)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{
            fontFamily: FN.display, fontWeight: 700, fontSize: 18,
            color: dark ? '#fff' : C.ink900,
          }}>Add Widgets</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: FN.ui, fontSize: 13,
              color: dark ? '#fff' : C.ink900, fontWeight: 500 }}>Tickers</span>
            <Toggle on theme={theme} />
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 6,
              border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
              minWidth: 220,
            }}>
              <SearchGlyph color={dark ? C.ink400 : C.ink600} />
              <input placeholder="Search widgets" style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: FN.ui, fontSize: 13,
                color: dark ? '#fff' : C.ink900, flex: 1,
              }} />
            </div>
            <ViewToggle view={view} onView={onView} theme={theme} />
          </div>
        </div>

        {view === 'grid' ? <GridView theme={theme} /> : <ListView theme={theme} />}
      </div>
    </div>
  );
}

function GridView({ theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const tiles = [
    { label: 'CHART',         img: '../../assets/images/chart-preview-1.png' },
    { label: 'OPTION CHAIN',  img: '../../assets/images/chart-preview-2.png' },
    { label: 'SCALPER',       img: '../../assets/images/chart-preview-1.png' },
    { label: 'OPEN INTEREST', img: '../../assets/images/chart-preview-2.png' },
    { label: 'STRADDLE',      img: '../../assets/images/chart-preview-1.png' },
    { label: 'DEPTH',         img: '../../assets/images/chart-preview-2.png' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
    }}>
      {tiles.map(t => (
        <div key={t.label} style={{
          border: `1px solid ${dark ? C.darkBorder : C.blue100}`, borderRadius: 8,
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          background: dark ? '#0E1144' : C.surface0,
          cursor: 'pointer',
        }}>
          <div style={{ aspectRatio: '4/3', background: dark ? C.darkBg : '#FAFAFB',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={t.img} alt={t.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }} />
          </div>
          <div style={{
            padding: 10, textAlign: 'center',
            fontFamily: FN.ui, fontSize: 11, fontWeight: 600, letterSpacing: 0.6,
            color: dark ? '#fff' : C.ink900,
          }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

function ListView({ theme }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const groups = [
    { title: 'TRADING', items: [
      { label: 'Chart',         icon: '../../assets/icons/chart.svg' },
      { label: 'Option Chain',  icon: '../../assets/icons/option-chain.svg' },
      { label: 'Scalper',       icon: '../../assets/icons/scales.svg', selected: true },
      { label: 'Open Interest', icon: '../../assets/icons/open-interest.svg' },
      { label: 'Straddle',      icon: '../../assets/icons/straddle.svg' },
      { label: 'Depth',         icon: '../../assets/icons/depth.svg' },
    ]},
    { title: 'TRACKING', items: [
      { label: 'Positions',  icon: '../../assets/icons/option-chain.svg' },
      { label: 'Orders',     icon: '../../assets/icons/filter.svg' },
      { label: 'Watchlist',  icon: '../../assets/icons/depth.svg' },
    ]},
    { title: 'UTILITIES', items: [
      { label: 'AI Bot',     icon: '../../assets/icons/scales.svg' },
      { label: 'Pomodoro',   icon: '../../assets/icons/clock.svg' },
      { label: 'Calculator', icon: '../../assets/icons/calculator.svg' },
      { label: 'Youtube',    icon: '../../assets/icons/youtube.svg' },
    ]},
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 240px', gap: 24 }}>
      {groups.map(g => (
        <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            fontFamily: FN.data, fontWeight: 700, fontSize: 11, letterSpacing: 0.4,
            color: dark ? C.ink400 : C.ink600, textTransform: 'uppercase',
          }}>{g.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.items.map(it => (
              <button key={it.label} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 6,
                border: it.selected ? `1.5px solid ${C.blue500}` : `1px solid ${dark ? C.darkBorder : C.blue100}`,
                background: it.selected ? (dark ? '#11144A' : C.blue50) : 'transparent',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: FN.ui, fontSize: 14,
                color: dark ? '#fff' : C.ink900, fontWeight: 500,
              }}>
                <img src={it.icon} alt="" width={20} height={20}
                  style={{ filter: dark ? 'invert(1) opacity(0.9)' : 'none' }} />
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {/* Selected widget preview */}
      <div style={{
        border: `1px solid ${dark ? C.darkBorder : C.blue100}`, borderRadius: 8,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          aspectRatio: '4/3', background: dark ? C.darkBg : '#FAFAFB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <img src="../../assets/images/chart-preview-1.png" alt="Scalper preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{
          padding: 12, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: FN.ui, fontWeight: 700, fontSize: 12, letterSpacing: 0.6,
          color: dark ? '#fff' : C.ink900,
        }}>
          <img src="../../assets/icons/scales.svg" alt="" width={16} height={16}
            style={{ filter: dark ? 'invert(1)' : 'none' }} />
          SCALPER
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, theme }) {
  const C = window.SKY.colors;
  return (
    <div style={{
      width: 36, height: 20, borderRadius: 999,
      background: on ? C.blue500 : '#CDD0E0',
      position: 'relative', cursor: 'pointer', transition: 'background 120ms ease',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: 999, background: '#fff',
        transition: 'left 120ms ease',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function ViewToggle({ view, onView, theme }) {
  const C = window.SKY.colors;
  const dark = theme === 'dark';
  const btn = (active) => ({
    width: 32, height: 32, borderRadius: 4, cursor: 'pointer',
    border: 'none', background: active ? C.blue500 : 'transparent',
    color: active ? '#fff' : (dark ? '#fff' : C.ink600),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  });
  return (
    <div style={{
      display: 'flex', gap: 2, padding: 2,
      border: `1px solid ${dark ? C.darkBorder : C.blue100}`, borderRadius: 6,
    }}>
      <button onClick={() => onView?.('grid')} style={btn(view === 'grid')}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
          <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
        </svg>
      </button>
      <button onClick={() => onView?.('list')} style={btn(view === 'list')}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01"/>
        </svg>
      </button>
    </div>
  );
}

Object.assign(window, { AddWidgetsModal, Toggle, ViewToggle, GridView, ListView });
