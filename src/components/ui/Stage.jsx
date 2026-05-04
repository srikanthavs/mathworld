import { useState, useEffect, useRef } from 'react';

/**
 * Auto-scales a fixed-size design canvas to fill the viewport.
 * width/height = the design's reference dimensions.
 */
export default function Stage({ width = 1200, height = 800, children }) {
  const [scale, setScale] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    const calc = () => {
      const s = Math.min(window.innerWidth / width, window.innerHeight / height);
      setScale(s);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [width, height]);

  return (
    <div className="w-full h-full grid place-items-center" style={{ background: '#FAFAFA' }}>
      <div
        ref={ref}
        style={{
          width, height,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(75,34,168,0.18)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
