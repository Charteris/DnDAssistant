const MONSTER_TYPES = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Element',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
];
const ALIGNMENTS = [
  'Lawful',
  'Neutral',
  'Chaotic',
  'Good',
  'Evil',
  'Unaligned',
  'Any',
];
const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Deadly'];
const EXPERIENCE_THRESHOLDS = [
  [25, 50, 75, 100], // 1st level
  [50, 100, 150, 200], // 2nd level
  [75, 150, 225, 400], // 3rd level
  [125, 250, 375, 500], // 4th level
  [250, 500, 750, 1100], // 5th level
  [300, 600, 900, 1400], // 6th level
  [350, 750, 1100, 1700], // 7th level
  [450, 900, 1400, 2100], // 8th level
  [550, 1100, 1600, 2400], // 9th level
  [600, 1200, 1900, 2800], // 10th level
  [800, 1600, 2400, 3600], // 11th level
  [1000, 2000, 3000, 4500], // 12th level
  [1100, 2200, 3400, 5100], // 13th level
  [1250, 2500, 3800, 5700], // 14th level
  [1400, 2800, 4300, 6400], // 15th level
  [1600, 3200, 4800, 7200], // 16th level
  [2000, 3900, 5900, 8800], // 17th level
  [2100, 4200, 6300, 9500], // 18th level
  [2400, 4900, 7300, 10900], // 19th level
  [2800, 5700, 8500, 12700], // 20th level
];
const ENCOUNTER_MULTIPLIERS = [
  { numberOfMonsters: 1, multiplier: 1 },
  { numberOfMonsters: 2, multiplier: 1.5 },
  { numberOfMonsters: 3, multiplier: 2 },
  { numberOfMonsters: 7, multiplier: 2.5 },
  { numberOfMonsters: 11, multiplier: 3 },
  { numberOfMonsters: 15, multiplier: 4 },
];

export {
  MONSTER_TYPES,
  ALIGNMENTS,
  SIZES,
  DIFFICULTIES,
  EXPERIENCE_THRESHOLDS,
  ENCOUNTER_MULTIPLIERS,
};
