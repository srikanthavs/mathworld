import { useState, useEffect, useRef, useCallback } from 'react';
import Stage from '../components/ui/Stage.jsx';
import Archie from '../components/Archie/Archie.jsx';
import { generateQuestion } from '../engine/questionGenerator.js';
import { addSession, awardXP, awardStars, updateStreak } from '../services/storageService.js';

const RING_R = 76;
const RING_C = 2 * Math.PI * RING_R; // ≈ 477.5

const SKILL_LABEL = {
  addition_single_digit:    'Single-Digit Addition',
  subtraction_single_digit: 'Single-Digit Subtraction',
  addition_two_digit:       'Two-Digit Addition',
};

// ─── Duration picker ─────────────────────────────────────────────────────────
function PickPhase({ skill, onPick, onBack }) {
  return (
    <Stage width={1200} height={800}>
      <div
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-10"
        style={{
          background: `
            radial-gradient(900px 700px at 50% 45%, #FFF5D6 0%, #FFE99B 35%, #FAFAFA 80%),
            #FAFAFA`,
        }}
      >
        <div className="stars absolute inset-0" />

        {/* Back */}
        <button
          onClick={onBack}
          className="btn-bounce absolute top-6 left-7 flex items-center gap-2 bg-white rounded-full pl-3 pr-5 py-2 shadow-md border-2 border-white"
        >
          <span className="grid place-items-center rounded-full font-display"
                style={{ width: 32, height: 32, background: '#FFF5D6', color: '#FFB300' }}>←</span>
          <span className="font-display text-[16px]" style={{ color: '#2a1a55' }}>Map</span>
        </button>

        {/* Archie + bubble */}
        <div className="flex items-end gap-6 z-10">
          <Archie size={160} level={1} mood="cheer" />
          <div className="bubble mb-8" style={{ borderColor: '#FFB300', maxWidth: 300 }}>
            <div className="font-display text-[20px]" style={{ color: '#2a1a55' }}>Speed round! ⚡</div>
            <div className="font-bold text-[15px]" style={{ color: '#3a2a6e' }}>
              How long do you want to play,<br />Advaith?
            </div>
          </div>
        </div>

        {/* Skill chip */}
        <div className="rounded-full px-5 py-2 font-bold text-[15px] uppercase tracking-wider z-10"
             style={{ background: '#FFD93D33', color: '#8B6000' }}>
          ⚡ {SKILL_LABEL[skill.id] ?? skill.name}
        </div>

        {/* Duration picks */}
        <div className="flex gap-6 z-10">
          {[60, 90].map(dur => (
            <button
              key={dur}
              onClick={() => onPick(dur)}
              className="btn-bounce rounded-3xl flex flex-col items-center justify-center gap-1"
              style={{
                width: 200, height: 160,
                background: 'white',
                border: '3px solid #FFD93D',
                boxShadow: '0 18px 40px rgba(255,179,0,0.30)',
              }}
            >
              <span className="font-display text-[64px] leading-none" style={{ color: '#FFB300' }}>{dur}</span>
              <span className="font-bold text-[16px] uppercase tracking-wide" style={{ color: '#6b7280' }}>seconds</span>
            </button>
          ))}
        </div>
      </div>
    </Stage>
  );
}

// ─── End screen ───────────────────────────────────────────────────────────────
function DonePhase({ correct, total, accuracy, starsEarned, xpEarned, skillLabel, onAgain, onBack }) {
  const mood = accuracy >= 80 ? 'celebrate' : accuracy >= 50 ? 'cheer' : 'wave';
  const msg  = accuracy >= 90 ? "You're on fire! Incredible round! 🔥"
             : accuracy >= 70 ? "Brilliant work, Advaith! Keep it up! ✨"
             : accuracy >= 50 ? "Good effort! Let's try again!"
             : "Keep practising — you'll get faster! 💪";

  return (
    <Stage width={1200} height={800}>
      <div
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-8"
        style={{
          background: `
            radial-gradient(900px 700px at 50% 45%, #FFF5D6 0%, #FFE99B 35%, #FAFAFA 80%),
            #FAFAFA`,
        }}
      >
        <div className="stars absolute inset-0" />

        {/* Archie */}
        <Archie size={180} level={1} mood={mood} className="z-10" />

        {/* Score card */}
        <div
          className="bg-white rounded-[32px] px-12 py-8 flex flex-col items-center gap-4 z-10 pop-in"
          style={{ boxShadow: '0 24px 60px rgba(75,34,168,0.14)', border: '3px solid #FFF5D6', minWidth: 500 }}
        >
          {/* Skill label */}
          <div className="rounded-full px-4 py-1 font-bold text-[13px] uppercase tracking-wider"
               style={{ background: '#FFF5D6', color: '#8B6000' }}>
            ⚡ Speed — {skillLabel}
          </div>

          {/* Big score */}
          <div className="font-display text-[72px] leading-none" style={{ color: '#2a1a55' }}>
            {correct} <span className="text-[36px]" style={{ color: '#9ca3af' }}>/ {total}</span>
          </div>
          <div className="font-bold text-[18px]" style={{ color: '#6b7280' }}>correct answers</div>

          {/* Accuracy + stars row */}
          <div className="flex items-center gap-6 mt-1">
            <div className="text-center">
              <div className="font-display text-[40px]" style={{
                color: accuracy >= 80 ? '#6BCB77' : accuracy >= 60 ? '#FFB300' : '#FF6B6B'
              }}>{accuracy}%</div>
              <div className="text-[12px] font-bold uppercase" style={{ color: '#9ca3af' }}>accuracy</div>
            </div>
            <div className="w-px h-14" style={{ background: '#EFE7FF' }} />
            <div className="text-center">
              <div className="font-display text-[40px]" style={{ color: '#FFB300' }}>
                {Array.from({ length: starsEarned }, () => '★').join('') || '—'}
              </div>
              <div className="text-[12px] font-bold uppercase" style={{ color: '#9ca3af' }}>
                {starsEarned > 0 ? `+${starsEarned} stars` : 'no stars'}
              </div>
            </div>
            {xpEarned > 0 && (
              <>
                <div className="w-px h-14" style={{ background: '#EFE7FF' }} />
                <div className="text-center">
                  <div className="font-display text-[40px]" style={{ color: '#6C3CE1' }}>+{xpEarned}</div>
                  <div className="text-[12px] font-bold uppercase" style={{ color: '#9ca3af' }}>XP earned</div>
                </div>
              </>
            )}
          </div>

          {/* Archie message */}
          <div className="font-bold text-[17px] text-center mt-1" style={{ color: '#3a2a6e' }}>{msg}</div>
        </div>

        {/* CTAs */}
        <div className="flex gap-5 z-10">
          <button
            onClick={onAgain}
            className="btn-bounce rounded-2xl px-10 py-4 font-display text-[22px] text-white"
            style={{ background: '#FFB300', boxShadow: '0 12px 30px rgba(255,179,0,0.40)', minHeight: 70 }}
          >
            ⚡ Run again
          </button>
          <button
            onClick={onBack}
            className="btn-bounce rounded-2xl px-10 py-4 font-display text-[22px]"
            style={{ background: 'white', color: '#6C3CE1', border: '3px solid #EFE7FF', minHeight: 70 }}
          >
            ← Back to Map
          </button>
        </div>
      </div>
    </Stage>
  );
}

// ─── Main Speed Mode ──────────────────────────────────────────────────────────
export default function SpeedMode({ skill, onBack }) {
  const [phase,    setPhase]    = useState('pick');
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type:'correct'|'wrong', chosen, correct }
  const [correct,  setCorrect]  = useState(0);
  const [total,    setTotal]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [savedResult, setSavedResult] = useState(null);

  const timerRef   = useRef(null);
  const feedbackTimer = useRef(null);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(skill.id));
    setFeedback(null);
  }, [skill.id]);

  const startGame = (dur) => {
    setDuration(dur);
    setTimeLeft(dur);
    setCorrect(0);
    setTotal(0);
    setStreak(0);
    setFeedback(null);
    setSavedResult(null);
    setQuestion(generateQuestion(skill.id));
    setPhase('playing');
  };

  // Countdown
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // Detect time-up
  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      clearInterval(timerRef.current);
      clearTimeout(feedbackTimer.current);
      setPhase('done');
    }
  }, [timeLeft, phase]);

  // Save once when entering done phase
  useEffect(() => {
    if (phase !== 'done' || savedResult) return;
    const acc      = total > 0 ? Math.round((correct / total) * 100) : 0;
    const xpEarned = correct;
    const stars    = acc >= 90 ? 2 : acc >= 70 ? 1 : 0;
    awardXP(xpEarned);
    if (stars > 0) awardStars(stars);
    updateStreak();
    addSession({ skillId: skill.id, mode: 'speed', accuracy: acc, duration, xpEarned, errors: [] });
    setSavedResult({ acc, xpEarned, stars });
  }, [phase]);

  // Cleanup
  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(feedbackTimer.current);
  }, []);

  const handleAnswer = (option) => {
    if (feedback || phase !== 'playing') return;
    const isCorrect = option === question.answer;
    setFeedback({ type: isCorrect ? 'correct' : 'wrong', chosen: option, correct: question.answer });
    setTotal(t => t + 1);
    if (isCorrect) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    feedbackTimer.current = setTimeout(nextQuestion, isCorrect ? 550 : 850);
  };

  // ── Pick phase ──
  if (phase === 'pick') return <PickPhase skill={skill} onPick={startGame} onBack={onBack} />;

  // ── Done phase ──
  if (phase === 'done') {
    const acc   = total > 0 ? Math.round((correct / total) * 100) : 0;
    const stars = savedResult?.stars ?? (acc >= 90 ? 2 : acc >= 70 ? 1 : 0);
    const xp    = savedResult?.xpEarned ?? correct;
    return (
      <DonePhase
        correct={correct} total={total} accuracy={acc}
        starsEarned={stars} xpEarned={xp}
        skillLabel={SKILL_LABEL[skill.id] ?? skill.name}
        onAgain={() => startGame(duration)}
        onBack={onBack}
      />
    );
  }

  // ── Playing phase ──
  const ringOffset  = RING_C * (1 - timeLeft / duration);
  const isLow       = timeLeft <= 10;
  const archieSpeed = streak >= 5 ? 'cheer' : 'run';
  const archieMood  = feedback?.type === 'correct' ? 'celebrate' : archieSpeed;

  return (
    <Stage width={1200} height={800}>
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: `
            radial-gradient(1200px 800px at 50% 40%, #FFF5D6 0%, #FFE99B 30%, #FAFAFA 80%),
            #FAFAFA`,
        }}
      >
        <div className="stars absolute inset-0" />

        {/* ── Top bar ── */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">

          {/* Back + skill label */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="btn-bounce flex items-center gap-2 bg-white rounded-full pl-3 pr-5 py-2 shadow-md border-2 border-white"
            >
              <span className="grid place-items-center rounded-full font-display"
                    style={{ width: 32, height: 32, background: '#FFF5D6', color: '#FFB300' }}>←</span>
              <span className="font-display text-[16px]" style={{ color: '#2a1a55' }}>Map</span>
            </button>
            <div className="rounded-full px-4 py-2 font-bold text-[13px] uppercase tracking-wider"
                 style={{ background: 'white', color: '#8B6000', border: '2px solid #FFD93D' }}>
              ⚡ {SKILL_LABEL[skill.id]}
            </div>
          </div>

          {/* Countdown ring */}
          <svg width={RING_R * 2 + 20} height={RING_R * 2 + 20}>
            {/* Track */}
            <circle cx={RING_R + 10} cy={RING_R + 10} r={RING_R}
                    fill="none" stroke="#FFE99B" strokeWidth="11" />
            {/* Fill */}
            <circle cx={RING_R + 10} cy={RING_R + 10} r={RING_R}
                    fill="none"
                    stroke={isLow ? '#FF6B6B' : '#FFB300'}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                    transform={`rotate(-90 ${RING_R + 10} ${RING_R + 10})`}
                    style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }} />
            {/* Number */}
            <text
              x={RING_R + 10} y={RING_R + 10}
              textAnchor="middle" dominantBaseline="central"
              fontFamily="Fredoka One" fontSize="42"
              fill={isLow ? '#FF6B6B' : '#2a1a55'}
            >
              {timeLeft}
            </text>
          </svg>

          {/* Score + streak */}
          <div className="flex items-center gap-3">
            <div className="bg-white/90 backdrop-blur rounded-2xl px-5 py-3 text-center shadow-md border-2 border-white">
              <div className="font-display text-[30px] leading-none" style={{ color: '#6BCB77' }}>{correct}</div>
              <div className="text-[11px] font-bold uppercase mt-0.5" style={{ color: '#6b7280' }}>correct</div>
            </div>
            {streak >= 2 && (
              <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-3 text-center shadow-md border-2 border-white slide-up">
                <div className="font-display text-[24px] leading-none" style={{ color: '#FF6B35' }}>🔥 {streak}</div>
                <div className="text-[11px] font-bold uppercase mt-0.5" style={{ color: '#6b7280' }}>streak</div>
              </div>
            )}
          </div>
        </div>

        {/* ── Question ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8" style={{ paddingTop: 60 }}>
          <div
            className="font-display leading-none select-none"
            style={{
              fontSize: skill.id === 'addition_two_digit' ? 88 : 108,
              color: '#2a1a55',
              textShadow: '0 4px 20px rgba(75,34,168,0.10)',
            }}
          >
            {question?.text} = ?
          </div>

          {/* ── Answer grid 2×2 ── */}
          <div className="grid grid-cols-2 gap-5" style={{ width: 640 }}>
            {question?.options.map((opt, i) => {
              let bg        = 'white';
              let borderCol = '#F1ECFA';
              let txtColor  = '#2a1a55';
              let shadow    = '0 8px 24px rgba(75,34,168,0.10)';

              if (feedback) {
                if (opt === feedback.correct) {
                  bg = '#EAFBEE'; borderCol = '#6BCB77'; txtColor = '#1f7a3b'; shadow = 'none';
                } else if (opt === feedback.chosen && feedback.type === 'wrong') {
                  bg = '#FFE9E9'; borderCol = '#FF6B6B'; txtColor = '#b91c1c'; shadow = 'none';
                } else {
                  bg = '#FAFAFA'; shadow = 'none';
                }
              }

              return (
                <button
                  key={`${question?.text}-${i}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className="btn-bounce rounded-3xl font-display flex items-center justify-center"
                  style={{
                    height: 110,
                    fontSize: 56,
                    background: bg,
                    border: `3px solid ${borderCol}`,
                    color: txtColor,
                    boxShadow: shadow,
                    cursor: feedback ? 'default' : 'pointer',
                    transition: 'background 180ms ease, border-color 180ms ease, color 180ms ease',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Archie bottom-left ── */}
        <div className="absolute bottom-6 left-6 z-10">
          <Archie size={140} level={1} mood={archieMood} />
        </div>

        {/* ── Subtle full-screen flash on answer ── */}
        {feedback && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: feedback.type === 'correct'
                ? 'rgba(107,203,119,0.09)'
                : 'rgba(255,107,107,0.09)',
              transition: 'background 150ms ease',
            }}
          />
        )}
      </div>
    </Stage>
  );
}
