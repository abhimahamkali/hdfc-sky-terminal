/* HDFC SKY — Chart panel
   Tabs Charts/Notes/Margin · OHLC · timeframe · placeholder candlestick */
function ChartPanel({ theme, activeTab, onTabChange }) {
  const C = window.SKY.colors;
  const FN = window.SKY.font;
  const dark = theme === 'dark';
  const tabs = ['Charts', 'Notes', 'Margin'];
  const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y'];

  return (
    <div data-name="ChartPanel" style={{
      ...window.SKY.card(theme),
      display: 'flex', flexDirection: 'column',
      padding: 16, gap: 12, height: '100%', overflow: 'hidden',
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24,
        borderBottom: `1px solid ${dark ? C.darkBorder : C.blue100}` }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => onTabChange?.(t)}
            style={{
              padding: '6px 0', background: 'transparent', border: 'none',
              cursor: 'pointer', ...window.SKY.tabStyle(activeTab === t, theme),
              fontWeight: activeTab === t ? 600 : 500,
            }}
          >{t}</button>
        ))}
      </div>

      {/* OHLC row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: FN.ui, fontSize: 13, fontWeight: 600,
            color: dark ? '#fff' : C.ink900, letterSpacing: 0.2 }}>NIFTY 50 · INDICES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: FN.data, fontSize: 12, color: dark ? C.ink400 : C.ink600 }}>1D</span>
          <span style={{ fontFamily: FN.num, fontSize: 12, color: dark ? '#fff' : C.ink900 }}>ƒ×</span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: 6, border: `1px solid ${dark ? C.darkBorder : C.blue100}`,
            background: 'transparent', cursor: 'pointer',
            fontFamily: FN.ui, fontSize: 12, fontWeight: 500,
            color: dark ? '#fff' : C.ink900,
          }}>
            <Arrow dir="up" color={C.profit500} /> Advanced
          </button>
        </div>
      </div>

      {/* O H L C values */}
      <div style={{ display: 'flex', gap: 16, fontFamily: FN.num, fontSize: 12 }}>
        <Quote label="O" value="23,880.35" theme={theme} />
        <Quote label="H" value="23,976.40" theme={theme} />
        <Quote label="L" value="23,868.50" theme={theme} />
        <Quote label="C" value="23,965.95" theme={theme} />
        <span style={{ color: C.profit500, fontWeight: 600, marginLeft: 8 }}>+52.25 (+0.22%)</span>
      </div>

      {/* Chart area (placeholder canvas — SVG candlesticks) */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <Candles theme={theme} />
      </div>

      {/* Timeframe row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        {timeframes.map(tf => (
          <button key={tf} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: FN.ui, fontSize: 12, fontWeight: 500,
            color: dark ? C.ink400 : C.ink600, padding: '4px 6px',
          }}>{tf}</button>
        ))}
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: dark ? C.ink400 : C.ink600,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z M3 12l4-4 M3 12l4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Quote({ label, value, theme }) {
  const C = window.SKY.colors;
  return (
    <span>
      <span style={{ color: theme === 'dark' ? C.ink400 : C.ink600 }}>{label} </span>
      <span style={{ color: theme === 'dark' ? '#fff' : C.ink900, fontWeight: 500 }}>{value}</span>
    </span>
  );
}

/* Synthetic candlestick chart — purely cosmetic.
   Deterministic seeded values so it doesn't flicker on every render. */
function Candles({ theme }) {
  const C = window.SKY.colors;
  const dark = theme === 'dark';
  const w = 800, h = 320, n = 80;
  // seeded pseudo-random
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const candles = [];
  let prev = h * 0.45;
  for (let i = 0; i < n; i++) {
    const drift = (rand() - 0.5) * 18;
    const open = prev;
    const close = Math.max(60, Math.min(h - 60, prev + drift));
    const high = Math.min(open, close) - rand() * 12 - 2;
    const low  = Math.max(open, close) + rand() * 12 + 2;
    candles.push({ open, close, high, low });
    prev = close;
  }
  const cw = w / n - 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none"
      style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Faint horizontal gridlines */}
      {[0.2, 0.4, 0.6, 0.8].map(y => (
        <line key={y} x1={0} x2={w} y1={h*y} y2={h*y}
          stroke={dark ? C.darkBorder : '#F0F0F0'} strokeWidth="1" />
      ))}
      {candles.map((c, i) => {
        const up = c.close <= c.open;
        const color = up ? C.profit500 : C.loss500;
        const x = i * (w / n) + 1;
        const top = Math.min(c.open, c.close);
        const bot = Math.max(c.open, c.close);
        return (
          <g key={i}>
            <line x1={x + cw/2} x2={x + cw/2} y1={c.high} y2={c.low}
              stroke={color} strokeWidth="1" />
            <rect x={x} y={top} width={cw} height={Math.max(1, bot - top)}
              fill={color} />
          </g>
        );
      })}
      {/* Last-price horizontal */}
      <line x1={0} x2={w} y1={candles[candles.length-1].close} y2={candles[candles.length-1].close}
        stroke={C.profit500} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <rect x={w - 60} y={candles[candles.length-1].close - 10} width="60" height="20" fill={C.profit500} />
      <text x={w - 30} y={candles[candles.length-1].close + 4} fill="white" fontSize="11"
        textAnchor="middle" fontFamily="Inter">23965.95</text>
    </svg>
  );
}

Object.assign(window, { ChartPanel, Quote, Candles });
