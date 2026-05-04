export default function Sun() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative" style={{ width: 180, height: 180 }}>
        {/* Glow sphere */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #FFF6C8, #FFD93D 55%, #FF6B35 100%)',
            boxShadow: '0 0 60px rgba(255,217,61,0.55), 0 0 120px rgba(255,107,53,0.35)',
          }}
        />
        {/* Rays */}
        <div className="absolute inset-0 spin-slow">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 8, height: 34,
                marginLeft: -4, marginTop: -110,
                background: 'linear-gradient(to bottom, #FFD93D, transparent)',
                borderRadius: 6,
                transform: `rotate(${i * 30}deg) translateY(-10px)`,
                transformOrigin: 'center 100px',
                opacity: 0.65,
              }}
            />
          ))}
        </div>
        {/* Label */}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="font-display text-white" style={{ fontSize: 26, textShadow: '0 2px 6px rgba(180,80,0,0.5)' }}>Math</div>
            <div className="font-display text-white" style={{ fontSize: 26, marginTop: -6, textShadow: '0 2px 6px rgba(180,80,0,0.5)' }}>World</div>
          </div>
        </div>
      </div>
    </div>
  );
}
