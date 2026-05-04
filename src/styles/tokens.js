export const colors = {
  primary:     '#6C3CE1',
  primaryDeep: '#4B22A8',
  secondary:   '#FF6B35',
  accent:      '#FFD93D',
  success:     '#6BCB77',
  error:       '#FF6B6B',
  bg:          '#FAFAFA',
  ink:         '#1b1330',
  ink2:        '#2a1a55',

  // Mode zone colors
  modes: {
    explore:   { ring: '#6C3CE1', soft: '#F2EBFF', soft2: '#E8DCFF' },
    practice:  { ring: '#3B82F6', soft: '#E5EFFF', soft2: '#D6E5FF' },
    challenge: { ring: '#FF6B35', soft: '#FFEDE3', soft2: '#FFDFCC' },
    speed:     { ring: '#FFB300', soft: '#FFF5D6', soft2: '#FFE99B' },
  },

  // Muted / grey scale
  muted:    '#6b7280',
  muted2:   '#9ca3af',
  locked:   '#9CA3AF',
  lockedBg: '#E5E7EB',

  // Amber (Speed mode / star counts)
  amber: '#FFB300',

  // Blue (Practice mode)
  blue: '#3B82F6',

  // Supporting surface colors
  surface:  '#F4F1FB',
  surface2: '#EFE7FF',
  cardBorder: '#F1ECFA',
  cardBorderDash: '#E5DCFA',
};

export const fonts = {
  display: "'Fredoka One', cursive",
  body:    "'Nunito', system-ui, sans-serif",
};

export const shadows = {
  cardSoft:    '0 6px 22px rgba(75,34,168,0.06)',
  cardLifted:  '0 18px 40px rgba(75,34,168,0.10)',
  chipFloat:   '0 10px 28px rgba(75,34,168,0.18)',
  planetDrop:  'drop-shadow(0 18px 40px rgba(75,34,168,0.35))',
  goldRing:    '0 0 0 5px #FFD93D, 0 0 0 10px rgba(255,217,61,.35), 0 18px 40px rgba(255,170,30,.45)',
  // mode CTA: `0 18px 40px ${modeColor}55`
};

export const radius = {
  pill:   '9999px',
  chip:   '12px',
  card:   '20px',
  hero:   '28px',
  popup:  '32px',
  bubble: '22px',
};

export const motion = {
  btnPress:  'transform 140ms ease, box-shadow 140ms ease',
  popup:     '280ms cubic-bezier(.34,1.56,.64,1)',
  fade:      '280ms ease',
};

// XP thresholds per level
export const XP_THRESHOLDS = [0, 100, 200, 350, 500, 700, 1000];
// For level 7+ add 400 per level

export function xpForLevel(level) {
  if (level < XP_THRESHOLDS.length) return XP_THRESHOLDS[level];
  return XP_THRESHOLDS[XP_THRESHOLDS.length - 1] + (level - (XP_THRESHOLDS.length - 1)) * 400;
}
