// HDFC SKY — Token export (JS mirror of colors_and_type.css)
// Use these in JSX components for consistent styling.
// Source of truth: ../../colors_and_type.css

window.SKY = (function () {
  const colors = {
    // Brand & action
    blue50:  '#F3F4FC',
    blue100: '#DDE0F1',
    blue200: '#617BED',
    blue500: '#2850E7',
    blue600: '#0486FF',
    blue700: '#43457D',
    blue900: '#27284B',
    cyan500: '#06C7FC',

    // Ink (foreground)
    ink1000: '#000000',
    ink900:  '#001B33',
    ink700:  '#647483',
    ink600:  '#68697E',
    ink500:  '#5D5E71',
    ink400:  '#9C9CAC',
    ink300:  '#E0E6EB',
    ink200:  '#E3E4E6',

    // Surfaces
    surface0: '#FFFFFF',
    surface1: '#F6F6F6',
    surface2: '#F3F4FC',
    darkBg:    '#030528',
    darkCard:  '#0A0C3A',
    darkBorder:'#27284B',

    // Semantic
    profit500: '#039855',
    profit600: '#068913',
    loss500:   '#F04438',
    loss600:   '#EC4242',
    lossBg:    '#FEF3F2',
    warnBg:    '#FFFAEB',
    warnText:  '#272113',
  };

  const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, '3xl': 48 };
  const radius = { xs: 2, sm: 4, md: 6, lg: 8, xl: 12, full: 9999 };

  const font = {
    display: '"Satoshi", -apple-system, BlinkMacSystemFont, sans-serif',
    ui:      '"Satoshi", -apple-system, BlinkMacSystemFont, sans-serif',
    num:     '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    data:    '"Manrope", "Inter", -apple-system, sans-serif',
  };

  // Convenience helpers ----------------------------------------------
  const card = (theme = 'light') => ({
    background:    theme === 'dark' ? colors.darkCard : colors.surface0,
    border:        `1px solid ${theme === 'dark' ? colors.darkBorder : colors.blue100}`,
    borderRadius:  radius.lg,
  });

  const tabStyle = (active, theme = 'light') => ({
    fontFamily: font.ui,
    fontSize: 14, fontWeight: 500, lineHeight: '20px',
    color: active
      ? colors.blue500
      : theme === 'dark' ? colors.ink400 : colors.ink600,
    borderBottom: active ? `2px solid ${colors.blue500}` : '2px solid transparent',
    paddingBottom: 4, cursor: 'pointer',
    transition: 'color 120ms ease',
  });

  return { colors, space, radius, font, card, tabStyle };
})();
