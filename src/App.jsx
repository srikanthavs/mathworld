import { useState } from 'react';
import SkillWorldMap from './screens/SkillWorldMap.jsx';
import SpeedMode from './screens/SpeedMode.jsx';
import { getChild, getSkills } from './services/storageService.js';

const SPEED_SKILLS = new Set([
  'addition_single_digit',
  'subtraction_single_digit',
  'addition_two_digit',
]);

export default function App() {
  const [child,  setChild]  = useState(() => getChild());
  const [skills, setSkills] = useState(() => getSkills());
  const [screen, setScreen] = useState('home');   // 'home' | 'speed'
  const [activeSkill, setActiveSkill] = useState(null);

  const refreshState = () => {
    setChild(getChild());
    setSkills(getSkills());
  };

  const handleLaunchMode = (skill, mode) => {
    if (mode === 'speed' && SPEED_SKILLS.has(skill.id)) {
      setActiveSkill(skill);
      setScreen('speed');
    }
    // Other modes queued for next session
  };

  const handleBackToMap = () => {
    refreshState();   // pick up any XP / stars saved during the session
    setActiveSkill(null);
    setScreen('home');
  };

  if (screen === 'speed' && activeSkill) {
    return <SpeedMode skill={activeSkill} onBack={handleBackToMap} />;
  }

  return (
    <SkillWorldMap
      child={child}
      skills={skills}
      onLaunchMode={handleLaunchMode}
      onParent={() => {}}
    />
  );
}
