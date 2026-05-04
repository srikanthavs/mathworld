/**
 * Archie — the MathWorld wizard mascot.
 * Fully SVG-drawn, no external assets.
 *
 * Props:
 *   size    {number}  — controls width; height = size * 1.15
 *   level   {number}  — shown in hat band ("★ LV 4")
 *   mood    {string}  — wave | celebrate | think | cheer | point | run
 *   animate {boolean} — true = applies .drift bob animation (default true)
 *   className {string}
 */
export default function Archie({ size = 180, level = 1, mood = 'wave', animate = true, className = '' }) {
  const wandRot = mood === 'celebrate' || mood === 'cheer' ? -25
                : mood === 'point'                         ? -45
                : -10;

  const driftClass = animate ? 'archie-drift' : '';

  return (
    <div
      className={`archie-root ${driftClass} ${className}`}
      style={{ width: size, height: size * 1.15, position: 'relative', display: 'inline-block' }}
    >
      <svg viewBox="0 0 200 230" width={size} height={size * 1.15}>

        {/* ── Sparkle stars around wand ── */}
        <g className="archie-sparkle" style={{ transformOrigin: '30px 30px' }}>
          <path d="M30 12 L33 26 L47 30 L33 34 L30 48 L27 34 L13 30 L27 26 Z" fill="#FFD93D" />
        </g>
        <g className="archie-sparkle" style={{ transformOrigin: '170px 60px', animationDelay: '0.6s' }}>
          <path d="M170 46 L172 56 L182 60 L172 64 L170 74 L168 64 L158 60 L168 56 Z" fill="#FF6B35" />
        </g>

        {/* ── Thinking cap overlay (Challenge mode) ── */}
        {mood === 'think' && (
          <g>
            <path d="M48 82 Q100 -18 152 82 Z" fill="#FF6B35" opacity="0.9" />
            <ellipse cx="100" cy="82" rx="56" ry="10" fill="#CC4400" />
            <rect x="54" y="77" width="92" height="11" rx="3" fill="#FFD93D" />
            <path d="M100 20 L104 34 L118 36 L107 44 L111 58 L100 52 L89 58 L93 44 L82 36 L96 34 Z" fill="#FFD93D" />
          </g>
        )}

        {/* ── Robe ── */}
        <path d="M55 175 Q100 130 145 175 L160 215 Q100 230 40 215 Z" fill="#6C3CE1" />
        <path d="M55 175 Q100 130 145 175 L160 215 Q100 230 40 215 Z"
              fill="url(#robeShine)" opacity=".25" />
        {/* Robe trim */}
        <path d="M40 215 Q100 230 160 215" stroke="#FFD93D" strokeWidth="5" fill="none" />
        {/* Star on robe */}
        <path d="M100 185 L104 196 L116 198 L107 206 L110 218 L100 212 L90 218 L93 206 L84 198 L96 196 Z"
              fill="#FFD93D" />

        {/* ── Neck ── */}
        <rect x="88" y="118" width="24" height="20" rx="6" fill="#F2C99B" />

        {/* ── Face ── */}
        <circle cx="100" cy="100" r="40" fill="#F8D6AB" />
        {/* Cheeks */}
        <circle cx="78" cy="108" r="6" fill="#FF9AA2" opacity=".7" />
        <circle cx="122" cy="108" r="6" fill="#FF9AA2" opacity=".7" />

        {/* ── Eyes (expression changes by mood) ── */}
        {mood === 'celebrate' || mood === 'cheer' ? (
          /* Happy arc eyes */
          <>
            <path d="M82 97 Q86 92 90 97" stroke="#1b1330" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M110 97 Q114 92 118 97" stroke="#1b1330" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'think' ? (
          /* One raised eyebrow */
          <>
            <circle cx="86" cy="98" r="5" fill="#1b1330" />
            <circle cx="114" cy="98" r="5" fill="#1b1330" />
            <circle cx="87.5" cy="96.5" r="1.6" fill="white" />
            <circle cx="115.5" cy="96.5" r="1.6" fill="white" />
            <path d="M80 88 Q86 85 92 88" stroke="#1b1330" strokeWidth="2" fill="none" />
          </>
        ) : (
          /* Default round eyes */
          <>
            <circle cx="86" cy="98" r="5" fill="#1b1330" />
            <circle cx="114" cy="98" r="5" fill="#1b1330" />
            <circle cx="87.5" cy="96.5" r="1.6" fill="white" />
            <circle cx="115.5" cy="96.5" r="1.6" fill="white" />
          </>
        )}

        {/* ── Mouth ── */}
        {mood === 'celebrate' || mood === 'cheer' ? (
          <path d="M84 118 Q100 132 116 118" stroke="#1b1330" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : mood === 'think' ? (
          <path d="M88 118 Q100 122 112 118" stroke="#1b1330" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M86 116 Q100 128 114 116" stroke="#1b1330" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* ── Hair tuft ── */}
        <path d="M70 78 Q85 60 100 72 Q115 60 130 78 Q120 70 100 74 Q80 70 70 78 Z" fill="#3a2a6e" />

        {/* ── Wizard hat (hidden when thinking cap shown) ── */}
        {mood !== 'think' && (
          <>
            <path d="M55 78 Q100 -10 145 78 Z" fill="#6C3CE1" />
            <path d="M55 78 Q100 -10 145 78 Z" fill="url(#hatShine)" opacity=".25" />
            <ellipse cx="100" cy="78" rx="52" ry="9" fill="#4B22A8" />
            {/* Hat band */}
            <rect x="58" y="74" width="84" height="10" rx="3" fill="#FFD93D" />
            <text x="100" y="83" textAnchor="middle" fontFamily="Fredoka One" fontSize="10" fill="#6C3CE1">
              ★ LV {level}
            </text>
            {/* Hat tip star */}
            <path d="M100 28 L104 40 L116 42 L107 50 L110 62 L100 56 L90 62 L93 50 L84 42 L96 40 Z"
                  fill="#FFD93D" />
          </>
        )}

        {/* ── Wand arm ── */}
        <g transform={`rotate(${wandRot} 150 150)`}>
          <line x1="150" y1="170" x2="178" y2="118" stroke="#3a2a6e" strokeWidth="5" strokeLinecap="round" />
          <path d="M178 102 L182 116 L196 118 L183 124 L186 138 L176 130 L168 142 L170 128 L160 122 L173 118 Z"
                fill="#FFD93D" />
        </g>

        {/* ── Hands ── */}
        <circle cx="150" cy="170" r="8" fill="#F8D6AB" />
        <circle cx="58" cy="170" r="8" fill="#F8D6AB" />

        {/* ── Motion lines for run mood ── */}
        {mood === 'run' && (
          <g stroke="#6C3CE1" strokeWidth="2.5" strokeLinecap="round" opacity=".55">
            <line x1="10" y1="150" x2="28" y2="150" />
            <line x1="6"  y1="165" x2="22" y2="165" />
            <line x1="12" y1="178" x2="26" y2="178" />
          </g>
        )}

        {/* ── SVG defs ── */}
        <defs>
          <linearGradient id="hatShine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="robeShine" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
