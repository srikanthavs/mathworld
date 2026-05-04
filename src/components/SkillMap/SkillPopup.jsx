import { shade } from '../../utils/colorUtils.js';

const LAYERS = ['Concrete', 'Pictorial', 'Abstract'];

const MODE_CTАС = [
  { id: 'explore',   label: 'Explore',   color: '#6C3CE1', icon: '🔮', desc: 'Play & discover' },
  { id: 'practice',  label: 'Practice',  color: '#3B82F6', icon: '🧩', desc: 'Step by step' },
  { id: 'challenge', label: 'Challenge', color: '#FF6B35', icon: '🎩', desc: 'Real puzzles' },
  { id: 'speed',     label: 'Speed',     color: '#FFB300', icon: '⚡', desc: '60s drill' },
];

export default function SkillPopup({ skill, onClose, onLaunch }) {
  if (!skill) return null;

  const locked   = skill.status === 'locked';
  const mastered = skill.status === 'mastered';

  // Derive mastery fractions per layer from status
  const mastery = mastered
    ? [1, 1, 1]
    : skill.status === 'practising'
      ? [1, 0.5, 0.1]
      : skill.status === 'exploring'
        ? [0.3, 0, 0]
        : [0, 0, 0];

  return (
    /* Backdrop */
    <div
      className="absolute inset-0 z-40 grid place-items-center fade-in"
      style={{ background: 'rgba(75,34,168,0.35)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="bg-white rounded-[32px] shadow-2xl p-7 relative pop-in"
        style={{
          maxWidth: 520, width: '90%',
          border: '4px solid white',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="btn-bounce absolute -top-4 -right-4 w-12 h-12 rounded-full grid place-items-center text-white shadow-lg"
          style={{ background: '#6C3CE1' }}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-full grid place-items-center font-display text-white text-2xl shrink-0"
            style={{
              background: locked
                ? 'radial-gradient(circle at 35% 30%, #d1d5db, #9ca3af)'
                : `radial-gradient(circle at 35% 30%, #ffffff, ${skill.color} 55%, ${shade(skill.color, -25)})`,
              boxShadow: mastered
                ? '0 0 0 4px #FFD93D, 0 12px 30px rgba(255,170,30,0.35)'
                : '0 12px 30px rgba(75,34,168,0.2)',
            }}
          >
            {locked ? '🔒' : skill.icon}
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>
              Level {skill.level} · Planet
            </div>
            <div className="font-display text-[28px] leading-tight" style={{ color: '#2a1a55' }}>{skill.name}</div>
            <div className="font-bold text-[16px]" style={{ color: shade(skill.color, -25) }}>{skill.sub}</div>
          </div>
        </div>

        {/* Layer progress */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {LAYERS.map((label, i) => (
            <div key={label} className="bg-[#F4F1FB] rounded-2xl p-3 text-center">
              <div className="text-[12px] font-bold" style={{ color: '#6b7280' }}>{label}</div>
              <div className="h-2 rounded-full mt-2 bg-white overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${mastery[i] * 100}%`, background: '#6C3CE1' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Archie tagline */}
        <div className="mt-5 bubble" style={{ borderColor: locked ? '#9CA3AF' : skill.color }}>
          <div className="font-bold" style={{ color: '#2a1a55' }}>
            {locked
              ? 'Master a few more planets and I\'ll teleport us here together! ✨'
              : mastered
                ? `You're a master of this planet, Advaith! Want to fly back and explore more?`
                : 'Ready to land on this planet? Pick a way to play!'}
          </div>
        </div>

        {/* Mode CTAs */}
        {!locked && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {MODE_CTАС.map(m => (
              <button
                key={m.id}
                onClick={() => onLaunch(skill, m.id)}
                className="btn-bounce rounded-2xl p-3 text-left text-white flex items-center gap-3"
                style={{ background: m.color, minHeight: 64, boxShadow: `0 8px 18px ${m.color}55` }}
              >
                <span style={{ fontSize: 26 }}>{m.icon}</span>
                <span className="leading-tight">
                  <span className="block font-display text-[18px]">{m.label}</span>
                  <span className="block text-[12px] font-bold opacity-90">{m.desc}</span>
                </span>
              </button>
            ))}
          </div>
        )}
        {locked && (
          <button
            onClick={onClose}
            className="btn-bounce mt-5 w-full rounded-2xl py-3 text-white font-display text-[18px]"
            style={{ background: '#9CA3AF', minHeight: 60 }}
          >
            Back to the map
          </button>
        )}
      </div>
    </div>
  );
}
