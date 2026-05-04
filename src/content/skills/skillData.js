/**
 * Display metadata for all 23 skill nodes.
 * id matches the storageService SKILL_IDS keys exactly.
 * color = the skill's theme colour when unlocked/mastered.
 * modes = which learning mode tabs this planet appears on.
 */
export const SKILL_DATA = [
  // ── Level 1 ────────────────────────────────────────────────────────────────
  {
    id: 'number_sense_1_to_100',
    name: 'Number Sense', sub: '1 → 100',
    level: 1, color: '#6BCB77', icon: '123',
    modes: ['explore', 'speed'],
  },
  {
    id: 'place_value_tens_ones',
    name: 'Place Value', sub: 'Tens & Ones',
    level: 1, color: '#FFD93D', icon: 'T·O',
    modes: ['explore', 'practice', 'speed'],
  },
  {
    id: 'addition_single_digit',
    name: 'Addition', sub: 'Single digit',
    level: 1, color: '#FF6B35', icon: '+',
    modes: ['explore', 'practice', 'speed'],
  },
  {
    id: 'addition_two_digit',
    name: 'Addition', sub: 'Two digit',
    level: 1, color: '#FF6B35', icon: '+',
    modes: ['explore', 'practice', 'challenge'],
  },
  {
    id: 'subtraction_single_digit',
    name: 'Subtraction', sub: 'Single digit',
    level: 1, color: '#6C3CE1', icon: '−',
    modes: ['explore', 'practice'],
  },
  {
    id: 'subtraction_two_digit',
    name: 'Subtraction', sub: 'Two digit',
    level: 1, color: '#6C3CE1', icon: '−',
    modes: ['practice', 'challenge'],
  },
  {
    id: 'patterns_simple',
    name: 'Patterns', sub: 'Repeat & grow',
    level: 1, color: '#6BCB77', icon: '◆◇◆',
    modes: ['explore', 'practice'],
  },
  {
    id: 'shapes_basic',
    name: 'Basic Shapes', sub: '2D shapes',
    level: 1, color: '#FF6B35', icon: '△',
    modes: ['explore', 'practice'],
  },
  {
    id: 'measurement_length',
    name: 'Measurement', sub: 'Length & weight',
    level: 1, color: '#3B82F6', icon: '📏',
    modes: ['explore', 'practice'],
  },
  {
    id: 'money_coins_notes',
    name: 'Money', sub: 'Indian ₹',
    level: 1, color: '#FFD93D', icon: '₹',
    modes: ['explore', 'practice', 'challenge'],
  },

  // ── Level 2 ────────────────────────────────────────────────────────────────
  {
    id: 'number_sense_1_to_1000',
    name: 'Number Sense', sub: '1 → 1000',
    level: 2, color: '#6BCB77', icon: '999',
    modes: ['explore', 'practice'],
  },
  {
    id: 'place_value_hundreds',
    name: 'Place Value', sub: 'Hundreds',
    level: 2, color: '#FFD93D', icon: 'H·T·O',
    modes: ['explore', 'practice'],
  },
  {
    id: 'addition_with_carrying',
    name: 'Add w/ Carrying', sub: 'Two digit',
    level: 2, color: '#FF6B35', icon: '+¹',
    modes: ['practice', 'challenge'],
  },
  {
    id: 'subtraction_with_borrowing',
    name: 'Sub w/ Borrowing', sub: 'Two digit',
    level: 2, color: '#6C3CE1', icon: '−¹',
    modes: ['practice', 'challenge'],
  },
  {
    id: 'multiplication_as_repeated_addition',
    name: 'Multiplication', sub: 'Repeated add',
    level: 2, color: '#FF6B35', icon: '×',
    modes: ['explore', 'practice'],
  },
  {
    id: 'division_as_sharing',
    name: 'Division', sub: 'As sharing',
    level: 2, color: '#6BCB77', icon: '÷',
    modes: ['explore', 'practice'],
  },
  {
    id: 'fractions_half_quarter',
    name: 'Fractions', sub: '½ and ¼',
    level: 2, color: '#6C3CE1', icon: '½',
    modes: ['explore', 'practice'],
  },
  {
    id: 'time_clock_reading',
    name: 'Clock Reading', sub: 'Hours & half',
    level: 2, color: '#3B82F6', icon: '◷',
    modes: ['explore', 'practice'],
  },

  // ── Level 3 ────────────────────────────────────────────────────────────────
  {
    id: 'multiplication_tables_2_to_10',
    name: 'Times Tables', sub: '2 → 10',
    level: 3, color: '#FFD93D', icon: '×ⁿ',
    modes: ['practice', 'speed'],
  },
  {
    id: 'word_problems_single_step',
    name: 'Word Problems', sub: 'Single step',
    level: 3, color: '#FF6B35', icon: '?',
    modes: ['challenge'],
  },
  {
    id: 'word_problems_multi_step',
    name: 'Word Problems', sub: 'Multi step',
    level: 3, color: '#FF6B35', icon: '??',
    modes: ['challenge'],
  },
  {
    id: 'patterns_number_sequences',
    name: 'Sequences', sub: 'Find next',
    level: 3, color: '#6BCB77', icon: '→',
    modes: ['practice', 'challenge'],
  },
  {
    id: 'early_division_facts',
    name: 'Division Facts', sub: 'Early',
    level: 3, color: '#6C3CE1', icon: '÷',
    modes: ['practice', 'speed'],
  },
];

export const SKILL_MAP = Object.fromEntries(SKILL_DATA.map(s => [s.id, s]));

export const MODE_ZONE = {
  explore:   { ring: '#6C3CE1', soft: '#F2EBFF', soft2: '#E8DCFF', label: 'Explore Mode',   blurb: 'Tap a planet to discover and play with manipulatives. No score, just curiosity.' },
  practice:  { ring: '#3B82F6', soft: '#E5EFFF', soft2: '#D6E5FF', label: 'Practice Mode',  blurb: 'Build skills layer by layer — concrete, pictorial, abstract.' },
  challenge: { ring: '#FF6B35', soft: '#FFEDE3', soft2: '#FFDFCC', label: 'Challenge Mode', blurb: 'Real-world puzzles that need deep thinking. Archie wears his thinking cap!' },
  speed:     { ring: '#FFB300', soft: '#FFF5D6', soft2: '#FFE99B', label: 'Speed Mode',     blurb: 'Quick-fire facts. Pick 60 or 90 seconds and zoom!' },
};
