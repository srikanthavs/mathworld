/**
 * storageService.js
 *
 * Single point of contact for all localStorage I/O.
 * No component reads or writes localStorage directly.
 * To migrate to Supabase, replace the implementations here.
 */

const KEYS = {
  version:  'mathworld_version',
  child:    'mathworld_child',
  skills:   'mathworld_skills',
  sessions: 'mathworld_sessions',
};

const SCHEMA_VERSION = 1;
const MAX_SESSIONS   = 50;

// ─── Skill node IDs in unlock order ───────────────────────────────────────────

export const SKILL_IDS = [
  // Level 1
  'number_sense_1_to_100',
  'place_value_tens_ones',
  'addition_single_digit',
  'addition_two_digit',
  'subtraction_single_digit',
  'subtraction_two_digit',
  'patterns_simple',
  'shapes_basic',
  'measurement_length',
  'money_coins_notes',
  // Level 2
  'number_sense_1_to_1000',
  'place_value_hundreds',
  'addition_with_carrying',
  'subtraction_with_borrowing',
  'multiplication_as_repeated_addition',
  'division_as_sharing',
  'fractions_half_quarter',
  'time_clock_reading',
  // Level 3
  'multiplication_tables_2_to_10',
  'word_problems_single_step',
  'word_problems_multi_step',
  'patterns_number_sequences',
  'early_division_facts',
];

export const SKILL_LEVELS = {
  number_sense_1_to_100:                 1,
  place_value_tens_ones:                 1,
  addition_single_digit:                 1,
  addition_two_digit:                    1,
  subtraction_single_digit:              1,
  subtraction_two_digit:                 1,
  patterns_simple:                       1,
  shapes_basic:                          1,
  measurement_length:                    1,
  money_coins_notes:                     1,
  number_sense_1_to_1000:               2,
  place_value_hundreds:                  2,
  addition_with_carrying:               2,
  subtraction_with_borrowing:           2,
  multiplication_as_repeated_addition:  2,
  division_as_sharing:                  2,
  fractions_half_quarter:               2,
  time_clock_reading:                   2,
  multiplication_tables_2_to_10:        3,
  word_problems_single_step:            3,
  word_problems_multi_step:             3,
  patterns_number_sequences:            3,
  early_division_facts:                 3,
};

// ─── Default records ───────────────────────────────────────────────────────────

function defaultChild() {
  return {
    name:            'Advaith',
    level:           1,
    xp:              0,
    xpToNextLevel:   100,
    stars:           0,
    streak:          0,
    lastSessionDate: null,
    createdAt:       new Date().toISOString(),
  };
}

function defaultSkillRecord(isFirst = false) {
  return {
    status:         isFirst ? 'exploring' : 'locked',
    accuracy:       0,
    recentAccuracy: [],   // last 3 session accuracies
    errorLog:       [],   // { type, count, sessionId }
    sessionsCount:  0,
    masteredAt:     null,
  };
}

function defaultSkills() {
  const skills = {};
  SKILL_IDS.forEach((id, i) => {
    skills[id] = defaultSkillRecord(i === 0);
  });
  return skills;
}

// ─── Init / schema check ───────────────────────────────────────────────────────

export function initStorage() {
  const version = read(KEYS.version);
  if (!version) {
    write(KEYS.version,  { schema: SCHEMA_VERSION, createdAt: new Date().toISOString() });
    write(KEYS.child,    defaultChild());
    write(KEYS.skills,   defaultSkills());
    write(KEYS.sessions, []);
    return { fresh: true };
  }
  // Future: handle version.schema < SCHEMA_VERSION migrations here
  return { fresh: false };
}

// ─── Low-level helpers ─────────────────────────────────────────────────────────

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ─── Child ────────────────────────────────────────────────────────────────────

export function getChild() {
  return read(KEYS.child) ?? defaultChild();
}

export function updateChild(patch) {
  const child = getChild();
  write(KEYS.child, { ...child, ...patch });
}

/**
 * Award XP. Auto-levels up if threshold crossed.
 * Returns { newXp, newLevel, leveledUp }
 */
export function awardXP(amount) {
  const child = getChild();
  let { xp, level, xpToNextLevel } = child;
  xp += amount;
  let leveledUp = false;

  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel;
    level += 1;
    leveledUp = true;
    xpToNextLevel = nextLevelThreshold(level);
  }

  updateChild({ xp, level, xpToNextLevel });
  return { newXp: xp, newLevel: level, leveledUp };
}

function nextLevelThreshold(level) {
  const thresholds = [100, 200, 350, 500, 700, 1000];
  if (level <= thresholds.length) return thresholds[level - 1];
  return 1000 + (level - thresholds.length) * 400;
}

export function awardStars(amount) {
  const child = getChild();
  const stars = Math.max(0, (child.stars || 0) + amount);
  updateChild({ stars });
  return stars;
}

/**
 * Update streak based on today's date.
 * Call at the end of any completed session.
 */
export function updateStreak() {
  const child = getChild();
  const today = new Date().toDateString();
  const last  = child.lastSessionDate ? new Date(child.lastSessionDate).toDateString() : null;

  if (last === today) return child.streak; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isConsecutive = last === yesterday.toDateString();

  const streak = isConsecutive ? child.streak + 1 : 1;
  updateChild({ streak, lastSessionDate: new Date().toISOString() });

  // 7-day streak bonus
  if (streak > 0 && streak % 7 === 0) {
    awardStars(10);
  }

  return streak;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export function getSkills() {
  return read(KEYS.skills) ?? defaultSkills();
}

export function getSkill(skillId) {
  const skills = getSkills();
  return skills[skillId] ?? defaultSkillRecord();
}

export function updateSkill(skillId, patch) {
  const skills = getSkills();
  skills[skillId] = { ...(skills[skillId] ?? defaultSkillRecord()), ...patch };
  write(KEYS.skills, skills);
}

/**
 * Record a completed session's accuracy into the skill's rolling average.
 * Keeps only the last 3 session accuracies.
 * Recalculates overall accuracy from those 3.
 */
export function recordSkillAccuracy(skillId, sessionAccuracy) {
  const skill = getSkill(skillId);
  const recent = [...(skill.recentAccuracy || []), sessionAccuracy].slice(-3);
  const accuracy = Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
  const sessionsCount = (skill.sessionsCount || 0) + 1;
  updateSkill(skillId, { accuracy, recentAccuracy: recent, sessionsCount });
  return { accuracy, sessionsCount };
}

/**
 * Log an error type for a skill.
 * If same error type appears 3 sessions in a row it is flagged as a weak area.
 */
export function logSkillError(skillId, errorType, sessionId) {
  const skill = getSkill(skillId);
  const errorLog = [...(skill.errorLog || []), { type: errorType, sessionId, ts: Date.now() }];
  // Keep last 9 to detect 3-session runs
  updateSkill(skillId, { errorLog: errorLog.slice(-9) });
}

/**
 * Check if a skill is a weak area (same error type 3 sessions in a row).
 */
export function isWeakArea(skillId) {
  const skill = getSkill(skillId);
  const log = skill.errorLog || [];
  if (log.length < 3) return false;
  const last3 = log.slice(-3);
  return last3.every(e => e.type === last3[0].type);
}

/**
 * Progress skill status forward.
 * locked → exploring → practising → mastered
 * Also unlocks the next skill node when mastered.
 */
export function progressSkillStatus(skillId, newStatus) {
  updateSkill(skillId, {
    status:     newStatus,
    masteredAt: newStatus === 'mastered' ? new Date().toISOString() : getSkill(skillId).masteredAt,
  });

  if (newStatus === 'mastered') {
    awardXP(50);
    awardStars(5);
    unlockNextSkill(skillId);
  }
}

function unlockNextSkill(masteredId) {
  const idx = SKILL_IDS.indexOf(masteredId);
  if (idx === -1 || idx >= SKILL_IDS.length - 1) return;
  const nextId = SKILL_IDS[idx + 1];
  const next = getSkill(nextId);
  if (next.status === 'locked') {
    updateSkill(nextId, { status: 'exploring' });
  }
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export function getSessions() {
  return read(KEYS.sessions) ?? [];
}

export function addSession(session) {
  const sessions = getSessions();
  const newSession = {
    id:       Date.now().toString(),
    date:     new Date().toISOString(),
    ...session,
  };
  const updated = [...sessions, newSession].slice(-MAX_SESSIONS);
  write(KEYS.sessions, updated);
  return newSession;
}

export function getRecentSessions(count = 7) {
  const sessions = getSessions();
  return sessions.slice(-count).reverse();
}

// ─── Weak areas (for Parent Dashboard) ────────────────────────────────────────

export function getWeakAreas() {
  const skills = getSkills();
  return SKILL_IDS
    .filter(id => isWeakArea(id))
    .map(id => {
      const skill = skills[id];
      const log   = skill.errorLog || [];
      const last3 = log.slice(-3);
      return {
        skillId:   id,
        errorType: last3[0]?.type ?? 'unknown',
        attempts:  skill.sessionsCount,
      };
    });
}

// ─── Debug helpers ─────────────────────────────────────────────────────────────

export function resetStorage() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  initStorage();
}

export function dumpStorage() {
  return {
    version:  read(KEYS.version),
    child:    read(KEYS.child),
    skills:   read(KEYS.skills),
    sessions: read(KEYS.sessions),
  };
}
