import { useState, useMemo } from 'react';
import Stage from '../components/ui/Stage.jsx';
import Sun from '../components/SkillMap/Sun.jsx';
import Planet from '../components/SkillMap/Planet.jsx';
import HUD from '../components/SkillMap/HUD.jsx';
import ModeBar from '../components/SkillMap/ModeBar.jsx';
import SkillPopup from '../components/SkillMap/SkillPopup.jsx';
import ParentGate from '../components/ui/ParentGate.jsx';
import Archie from '../components/Archie/Archie.jsx';
import { SKILL_DATA, MODE_ZONE } from '../content/skills/skillData.js';

const RING_SMALL = 230;
const RING_LARGE = 360;
const CENTER = { x: 600, y: 400 };

function Tag({ dot, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/80 rounded-full px-2.5 py-1">
      <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: dot }} />
      <span style={{ color: '#2a1a55' }}>{label}</span>
    </span>
  );
}

export default function SkillWorldMap({ child, skills, onLaunchMode, onParent }) {
  const [mode,       setMode]       = useState('explore');
  const [selected,   setSelected]   = useState(null);
  const [parentOpen, setParentOpen] = useState(false);

  const zone = MODE_ZONE[mode];

  // Merge static display data with live skill status from storageService
  const enrichedSkills = useMemo(() => {
    return SKILL_DATA.map(meta => ({
      ...meta,
      status: skills[meta.id]?.status ?? 'locked',
    }));
  }, [skills]);

  // Filter to planets visible in current mode
  const visibleSkills = useMemo(
    () => enrichedSkills.filter(s => s.modes.includes(mode)),
    [enrichedSkills, mode]
  );

  // Lay planets on 1 or 2 orbital rings
  const positions = useMemo(() => {
    if (visibleSkills.length <= 8) {
      const N = visibleSkills.length;
      return visibleSkills.map((s, i) => {
        const angle = (-90 + (360 / N) * i) * (Math.PI / 180);
        return { ...s, x: CENTER.x + RING_SMALL * Math.cos(angle), y: CENTER.y + RING_SMALL * Math.sin(angle), ring: RING_SMALL };
      });
    }
    const inner = visibleSkills.filter(s => s.level === 1);
    const outer = visibleSkills.filter(s => s.level !== 1);
    const place = (arr, R, offset = 0) => {
      const N = arr.length;
      return arr.map((s, i) => {
        const angle = (-90 + (360 / N) * i + offset) * (Math.PI / 180);
        return { ...s, x: CENTER.x + R * Math.cos(angle), y: CENTER.y + R * Math.sin(angle), ring: R };
      });
    };
    return [...place(inner, RING_SMALL), ...place(outer, RING_LARGE, 22)];
  }, [visibleSkills]);

  const showOuter = positions.some(p => p.ring === RING_LARGE);

  // Counts for the mode banner legend
  const counts = useMemo(() => {
    const list = enrichedSkills.filter(s => s.modes.includes(mode));
    return {
      mastered: list.filter(s => s.status === 'mastered').length,
      unlocked: list.filter(s => ['exploring', 'practising', 'unlocked'].includes(s.status)).length,
      locked:   list.filter(s => s.status === 'locked').length,
    };
  }, [enrichedSkills, mode]);

  // Dynamic background tinted by mode
  const bgStyle = {
    background: `
      radial-gradient(1200px 800px at 50% 55%, ${zone.soft} 0%, ${zone.soft2} 35%, #FAFAFA 80%),
      radial-gradient(700px 500px at 12% 18%, #FFF6E0 0%, transparent 60%),
      radial-gradient(700px 500px at 88% 90%, #E4F7E8 0%, transparent 60%),
      #FAFAFA`,
  };

  const archieMsg = {
    explore:   'Let\'s wander and discover something new today.',
    practice:  'Pick a planet and we\'ll build it up step by step!',
    challenge: 'Time for some big-thinking puzzles. Ready, captain?',
    speed:     'Quick-fire round! Pick a planet you\'ve already mastered.',
  }[mode];

  const handlePlanetTap = (skill) => setSelected(skill);

  const handleLaunch = (skill, launchMode) => {
    setSelected(null);
    onLaunchMode?.(skill, launchMode);
  };

  return (
    <Stage width={1200} height={800}>
      <div className="relative w-full h-full overflow-hidden" style={bgStyle}>
        <div className="stars absolute inset-0" />

        {/* HUD */}
        <HUD child={child} onParent={() => setParentOpen(true)} />

        {/* Mode banner — top left under HUD */}
        <div className="absolute left-7 z-20" style={{ top: 108 }}>
          <div className="bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg border-2 border-white max-w-[280px]">
            <div className="flex items-center gap-2">
              <span
                className="inline-block rounded-full"
                style={{ width: 14, height: 14, background: zone.ring, boxShadow: `0 0 0 4px ${zone.ring}33` }}
              />
              <div className="font-display text-[18px]" style={{ color: '#2a1a55' }}>{zone.label}</div>
            </div>
            <div className="text-[13px] font-semibold mt-1" style={{ color: '#6b7280', lineHeight: 1.35 }}>
              {zone.blurb}
            </div>
            <div className="mt-3 pt-3 border-t border-[#EFE7FF] flex flex-col gap-1.5 text-[12px] font-bold">
              <Tag dot="#FFD93D" label={`${counts.mastered} mastered`} />
              <Tag dot={zone.ring} label={`${counts.unlocked} ready to play`} />
              <Tag dot="#9CA3AF" label={`${counts.locked} locked`} />
            </div>
          </div>
        </div>

        {/* Orbital rings */}
        <div
          className="orbit-ring"
          style={{
            width: RING_SMALL * 2, height: RING_SMALL * 2,
            left: CENTER.x, top: CENTER.y,
            borderColor: `${zone.ring}30`,
          }}
        />
        {showOuter && (
          <div
            className="orbit-ring"
            style={{
              width: RING_LARGE * 2, height: RING_LARGE * 2,
              left: CENTER.x, top: CENTER.y,
              borderColor: `${zone.ring}1f`,
            }}
          />
        )}

        {/* Scene */}
        <div className="absolute inset-0">
          <Sun />
          {positions.map(s => (
            <Planet
              key={`${mode}-${s.id}`}
              skill={s}
              cx={s.x}
              cy={s.y}
              onTap={handlePlanetTap}
            />
          ))}
        </div>

        {/* Archie + speech bubble — bottom left */}
        <div className="absolute z-20 flex items-end gap-4" style={{ left: 24, bottom: 150 }}>
          <Archie size={160} level={child.level} mood="wave" />
          <div className="bubble max-w-[290px] mb-6" style={{ borderColor: zone.ring }}>
            <div className="font-display text-[18px]" style={{ color: '#2a1a55' }}>Hi {child.name}! ✨</div>
            <div className="font-bold text-[15px]" style={{ color: '#3a2a6e' }}>{archieMsg}</div>
          </div>
        </div>

        {/* Mode bar */}
        <ModeBar mode={mode} setMode={setMode} />

        {/* Skill popup */}
        {selected && (
          <SkillPopup
            skill={selected}
            mode={mode}
            onClose={() => setSelected(null)}
            onLaunch={handleLaunch}
          />
        )}

        {/* Parent gate */}
        <ParentGate
          open={parentOpen}
          onClose={() => setParentOpen(false)}
          onSuccess={() => { setParentOpen(false); onParent?.(); }}
        />
      </div>
    </Stage>
  );
}
