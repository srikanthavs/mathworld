export default function HUD({ child, onParent }) {
  const { name = 'Advaith', level = 1, xp = 0, xpToNextLevel = 100, stars = 0, streak = 0 } = child;
  const xpPct = Math.min(100, Math.round((xp / xpToNextLevel) * 100));

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 py-5">
      {/* Greeting chip */}
      <div className="flex items-center gap-3 bg-white/85 backdrop-blur rounded-full pl-3 pr-6 py-2 shadow-lg border-2 border-white">
        <div
          className="w-12 h-12 rounded-full grid place-items-center font-display text-white text-xl"
          style={{ background: 'linear-gradient(135deg,#6C3CE1,#FF6B35)' }}
        >
          {name[0]}
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-bold uppercase tracking-wide" style={{ color: '#6b7280' }}>Welcome back</div>
          <div className="font-display text-[22px]" style={{ color: '#2a1a55' }}>{name}</div>
        </div>
      </div>

      {/* Right-side stats */}
      <div className="flex items-center gap-3">
        {/* Streak */}
        <div className="bg-white/85 backdrop-blur rounded-full px-4 py-2 shadow-lg border-2 border-white flex items-center gap-2">
          <span style={{ fontSize: 24 }}>🔥</span>
          <div className="leading-tight">
            <div className="font-display text-[20px]" style={{ color: '#FF6B35' }}>{streak}</div>
            <div className="text-[11px] font-bold uppercase" style={{ color: '#6b7280' }}>day streak</div>
          </div>
        </div>

        {/* Stars */}
        <div className="bg-white/85 backdrop-blur rounded-full px-4 py-2 shadow-lg border-2 border-white flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M12 2 L14.6 9 L22 9.5 L16 14 L18.5 21 L12 17 L5.5 21 L8 14 L2 9.5 L9.4 9 Z"
                  fill="#FFD93D" stroke="#FF6B35" strokeWidth="1" />
          </svg>
          <div className="leading-tight">
            <div className="font-display text-[20px]" style={{ color: '#FFB300' }}>{stars}</div>
            <div className="text-[11px] font-bold uppercase" style={{ color: '#6b7280' }}>stars</div>
          </div>
        </div>

        {/* Archie level + XP bar */}
        <div className="bg-white/85 backdrop-blur rounded-2xl px-4 py-2 shadow-lg border-2 border-white flex items-center gap-3 min-w-[260px]">
          <div
            className="w-12 h-12 rounded-full grid place-items-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#6C3CE1,#4B22A8)' }}
          >
            <span className="font-display text-white text-[18px]">L{level}</span>
          </div>
          <div className="flex-1 leading-tight min-w-0">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[14px]" style={{ color: '#2a1a55' }}>Archie</span>
              <span className="text-[12px] font-bold" style={{ color: '#6b7280' }}>{xp} / {xpToNextLevel} XP</span>
            </div>
            <div className="h-3 rounded-full mt-1 overflow-hidden" style={{ background: '#EFE7FF' }}>
              <div className="h-full rounded-full shimmer" style={{ width: `${xpPct}%` }} />
            </div>
            <div className="text-[11px] font-bold mt-0.5" style={{ color: '#6C3CE1' }}>
              {xpToNextLevel - xp} XP to level {level + 1} ✨
            </div>
          </div>
        </div>

        {/* Parent lock */}
        <button
          onClick={onParent}
          aria-label="Parent area"
          className="btn-bounce w-12 h-12 rounded-full grid place-items-center bg-white/70 backdrop-blur border-2 border-white shadow"
          title="Parent dashboard"
        >
          <svg width="20" height="22" viewBox="0 0 24 28" fill="none">
            <rect x="3" y="11" width="18" height="14" rx="3" fill="#9CA3AF" />
            <path d="M7 11 V7 a5 5 0 0 1 10 0 v4" stroke="#9CA3AF" strokeWidth="2.5" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
