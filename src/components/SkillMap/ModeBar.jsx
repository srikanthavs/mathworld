const MODES = [
  { id: 'explore',   label: 'Explore',   tag: 'Discover',     color: '#6C3CE1', icon: '🔮' },
  { id: 'practice',  label: 'Practice',  tag: 'Build it up',  color: '#3B82F6', icon: '🧩' },
  { id: 'challenge', label: 'Challenge', tag: 'Big thinking', color: '#FF6B35', icon: '🎩' },
  { id: 'speed',     label: 'Speed',     tag: 'Quick facts',  color: '#FFB300', icon: '⚡' },
];

export default function ModeBar({ mode, setMode }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div
        className="bg-white rounded-[28px] px-3 py-3 flex gap-2"
        style={{ boxShadow: '0 24px 60px rgba(75,34,168,0.25)', border: '4px solid white' }}
      >
        {MODES.map(m => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className="btn-bounce relative px-5 py-3 rounded-2xl flex items-center gap-3 transition-all"
              style={{
                background: active ? m.color : '#F4F1FB',
                color: active ? 'white' : '#2a1a55',
                minHeight: 60,
                minWidth: 168,
                boxShadow: active ? `0 8px 22px ${m.color}66` : 'none',
              }}
            >
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <span className="leading-tight text-left">
                <span className="block font-display text-[18px]">{m.label}</span>
                <span className="block text-[12px] font-bold opacity-90">{m.tag}</span>
              </span>
              {active && (
                <span
                  className="absolute -top-2 -right-2 rounded-full bg-white grid place-items-center"
                  style={{ width: 24, height: 24, boxShadow: `0 4px 10px ${m.color}99` }}
                >
                  <span style={{ color: m.color, fontSize: 14 }}>★</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center mt-3">
        <span className="bg-white/80 rounded-full px-4 py-1 text-[13px] font-bold" style={{ color: '#6b7280' }}>
          Tap a planet to begin in{' '}
          <b style={{ color: '#2a1a55' }}>
            {MODES.find(m => m.id === mode)?.label} mode
          </b>
        </span>
      </div>
    </div>
  );
}
