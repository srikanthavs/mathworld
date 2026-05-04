/**
 * ArchieIcon — compact bust of Archie for the Parent Dashboard header.
 * Static, no drift animation, viewBox cropped to head + hat.
 */
export default function ArchieIcon({ size = 44, level = 1 }) {
  return (
    <div style={{ width: size, height: size, filter: 'drop-shadow(0 4px 10px rgba(75,34,168,.25))' }}>
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {/* Face */}
        <circle cx="100" cy="115" r="40" fill="#F8D6AB" />
        <circle cx="86"  cy="113" r="4.5" fill="#1b1330" />
        <circle cx="114" cy="113" r="4.5" fill="#1b1330" />
        <path d="M86 130 Q100 140 114 130" stroke="#1b1330" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="78"  cy="123" r="5" fill="#FF9AA2" opacity=".7" />
        <circle cx="122" cy="123" r="5" fill="#FF9AA2" opacity=".7" />
        {/* Hat */}
        <path d="M60 90 Q100 10 140 90 Z" fill="#6C3CE1" />
        <ellipse cx="100" cy="90" rx="48" ry="8" fill="#4B22A8" />
        <rect x="62" y="86" width="76" height="10" rx="3" fill="#FFD93D" />
        <text x="100" y="95" textAnchor="middle" fontFamily="Fredoka One" fontSize="10" fill="#6C3CE1">
          ★ LV {level}
        </text>
        <path d="M100 38 L103 50 L115 52 L106 60 L109 72 L100 66 L91 72 L94 60 L85 52 L97 50 Z"
              fill="#FFD93D" />
        {/* Robe peek */}
        <path d="M65 175 Q100 150 135 175 L140 195 Q100 205 60 195 Z" fill="#6C3CE1" />
        <path d="M60 195 Q100 205 140 195" stroke="#FFD93D" strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
}
