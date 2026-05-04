import { useState } from 'react';
import SkillWorldMap from './screens/SkillWorldMap.jsx';
import { getChild, getSkills } from './services/storageService.js';

export default function App() {
  const [child,  setChild]  = useState(() => getChild());
  const [skills, setSkills] = useState(() => getSkills());
  const [screen, setScreen] = useState('home'); // 'home' | 'parent' | future mode screens

  const refresh = () => {
    setChild(getChild());
    setSkills(getSkills());
  };

  const handleLaunchMode = (skill, mode) => {
    // Placeholder — mode screens built in subsequent steps
    console.log('Launch', mode, 'for', skill.id);
  };

  const handleParent = () => {
    setScreen('parent');
  };

  // Parent dashboard will be wired in Step 2; for now route back home
  if (screen === 'parent') {
    return (
      <div className="w-full h-full grid place-items-center" style={{ background: '#FAFAFA' }}>
        <div className="text-center">
          <div className="font-display text-[28px]" style={{ color: '#2a1a55' }}>Parent Dashboard</div>
          <div className="text-[16px] mt-2" style={{ color: '#6b7280' }}>Coming in Step 2</div>
          <button
            className="btn-bounce mt-6 rounded-2xl px-8 py-3 font-display text-[18px] text-white"
            style={{ background: '#6C3CE1' }}
            onClick={() => setScreen('home')}
          >
            ← Back to MathWorld
          </button>
        </div>
      </div>
    );
  }

  return (
    <SkillWorldMap
      child={child}
      skills={skills}
      onLaunchMode={handleLaunchMode}
      onParent={handleParent}
    />
  );
}
