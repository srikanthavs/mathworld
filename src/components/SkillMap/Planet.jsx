import { shade } from '../../utils/colorUtils.js';

export default function Planet({ skill, cx, cy, onTap }) {
  const size     = skill.level === 1 ? 96 : skill.level === 2 ? 80 : 70;
  const isLocked   = skill.status === 'locked';
  const isMastered = skill.status === 'mastered';
  const isUnlocked = skill.status === 'unlocked' || skill.status === 'exploring' || skill.status === 'practising';

  const pulseClass = isUnlocked
    ? (skill.color === '#FF6B35' ? 'pulse-orange' : 'pulse-purple')
    : '';

  return (
    <button
      onClick={() => onTap(skill)}
      className="absolute btn-bounce"
      style={{
        left: cx, top: cy,
        width: size, height: size,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: isLocked
          ? 'radial-gradient(circle at 35% 30%, #d1d5db, #9ca3af 70%)'
          : `radial-gradient(circle at 35% 30%, #ffffff, ${skill.color} 55%, ${shade(skill.color, -25)} 100%)`,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        opacity: isLocked ? 0.55 : 1,
        padding: 0,
      }}
    >
      <div
        className={`relative w-full h-full rounded-full planet-shadow ${pulseClass}`}
      >
        {/* Highlight */}
        <div className="absolute rounded-full" style={{
          left: '18%', top: '15%', width: '32%', height: '22%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85), transparent 70%)',
          filter: 'blur(2px)',
        }} />

        {/* Surface texture spots */}
        {!isLocked && <>
          <div className="absolute rounded-full" style={{ left: '55%', top: '30%', width: '14%', height: '14%', background: 'rgba(0,0,0,0.10)' }} />
          <div className="absolute rounded-full" style={{ left: '30%', top: '60%', width: '18%', height: '12%', background: 'rgba(0,0,0,0.10)' }} />
          <div className="absolute rounded-full" style={{ left: '65%', top: '62%', width: '10%', height: '10%', background: 'rgba(0,0,0,0.10)' }} />
        </>}

        {/* Mastered gold ring */}
        {isMastered && <div className="absolute inset-0 rounded-full gold-ring" />}

        {/* Locked padlock */}
        {isLocked && (
          <div className="absolute inset-0 grid place-items-center">
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
              <rect x="3" y="13" width="22" height="16" rx="3" fill="#4b5563" />
              <path d="M8 13 V9 a6 6 0 0 1 12 0 v4" stroke="#4b5563" strokeWidth="3" fill="none" />
              <circle cx="14" cy="21" r="2.5" fill="#FFD93D" />
            </svg>
          </div>
        )}

        {/* Icon glyph */}
        {!isLocked && (
          <div
            className="absolute inset-0 grid place-items-center font-display"
            style={{ color: 'white', fontSize: skill.level === 1 ? 26 : 22, textShadow: '0 2px 4px rgba(0,0,0,0.25)' }}
          >
            {skill.icon}
          </div>
        )}

        {/* Mastered crown star */}
        {isMastered && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M12 2 L14.6 9 L22 9.5 L16 14 L18.5 21 L12 17 L5.5 21 L8 14 L2 9.5 L9.4 9 Z"
                    fill="#FFD93D" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
        )}
      </div>

      {/* Label below planet */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-center" style={{ top: '100%' }}>
        <div className="font-display text-[15px]" style={{ color: '#2a1a55' }}>{skill.name}</div>
        <div className="text-[12px] font-semibold" style={{ color: isLocked ? '#6b7280' : shade(skill.color, -30) }}>{skill.sub}</div>
      </div>
    </button>
  );
}
