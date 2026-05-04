import { useState } from 'react';

const CORRECT_PIN = '1234';

export default function ParentGate({ open, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState(false);

  if (!open) return null;

  const press = (k) => {
    if (k === '⌫') { setPin(p => p.slice(0, -1)); setErr(false); return; }
    if (pin.length >= 4) return;
    const next = pin + k;
    setErr(false);
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === CORRECT_PIN) { setPin(''); onSuccess(); }
        else { setErr(true); setTimeout(() => setPin(''), 500); }
      }, 180);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 grid place-items-center fade-in"
      style={{ background: 'rgba(20,12,50,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[28px] p-7 shadow-2xl border-4 border-white pop-in"
        style={{ width: 420 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="font-display text-[24px]" style={{ color: '#2a1a55' }}>Grown-up Zone</div>
        <div className="text-[15px] mt-1" style={{ color: '#6b7280' }}>
          Enter the 4-digit parent PIN to view Advaith's progress.
        </div>

        {/* PIN dots */}
        <div className="grid grid-cols-4 gap-2 mt-5">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="h-16 rounded-2xl grid place-items-center font-display text-2xl"
              style={{
                background: err ? '#FFE4E6' : pin[i] ? '#EFE7FF' : '#F4F1FB',
                border: err ? '2px solid #FF6B6B' : '2px solid transparent',
                color: err ? '#FF6B6B' : '#6C3CE1',
                transition: 'background 200ms ease, border 200ms ease',
              }}
            >
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>
        {err && (
          <div className="text-center mt-2 font-bold text-[13px]" style={{ color: '#FF6B6B' }}>
            That's not quite right. Try again.
          </div>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
            <button
              key={i}
              disabled={k === ''}
              onClick={() => k && press(k)}
              className="btn-bounce rounded-2xl py-3 font-display text-[20px]"
              style={{
                background: k === '' ? 'transparent' : '#FAFAFA',
                color: '#2a1a55',
                visibility: k === '' ? 'hidden' : 'visible',
                minHeight: 60,
                border: '1px solid #F1ECFA',
              }}
            >
              {k}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-bounce mt-3 w-full rounded-2xl py-3 font-display text-[18px]"
          style={{ background: '#EFE7FF', color: '#6C3CE1', minHeight: 48 }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
