export const MONSTER_TYPES = [
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
export const ALIGNMENTS = [
  'Lawful',
  'Neutral',
  'Chaotic',
  'Good',
  'Evil',
  'Unaligned',
  'Any',
];
export const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Deadly'];

export const EXPERIENCE_THRESHOLDS: { [key: number]: number[] } = {
  1: [25, 50, 75, 100], // 1st level
  2: [50, 100, 150, 200], // 2nd level
  3: [75, 150, 225, 400], // 3rd level
  4: [125, 250, 375, 500], // 4th level
  5: [250, 500, 750, 1100], // 5th level
  6: [300, 600, 900, 1400], // 6th level
  7: [350, 750, 1100, 1700], // 7th level
  8: [450, 900, 1400, 2100], // 8th level
  9: [550, 1100, 1600, 2400], // 9th level
  10: [600, 1200, 1900, 2800], // 10th level
  11: [800, 1600, 2400, 3600], // 11th level
  12: [1000, 2000, 3000, 4500], // 12th level
  13: [1100, 2200, 3400, 5100], // 13th level
  14: [1250, 2500, 3800, 5700], // 14th level
  15: [1400, 2800, 4300, 6400], // 15th level
  16: [1600, 3200, 4800, 7200], // 16th level
  17: [2000, 3900, 5900, 8800], // 17th level
  18: [2100, 4200, 6300, 9500], // 18th level
  19: [2400, 4900, 7300, 10900], // 19th level
  20: [2800, 5700, 8500, 12700], // 20th level
};

export const ENCOUNTER_MULTIPLIERS = [
  { numberOfMonsters: 1, multiplier: 1 },
  { numberOfMonsters: 2, multiplier: 1.5 },
  { numberOfMonsters: 3, multiplier: 2 },
  { numberOfMonsters: 7, multiplier: 2.5 },
  { numberOfMonsters: 11, multiplier: 3 },
  { numberOfMonsters: 15, multiplier: 4 },
];

export const MIN_EXPERIENCE = 10;
export const MAX_EXPERIENCE = 12700;

export enum CURRENCY {
  COPPER = 'cp',
  SILVER = 'sp',
  ELECTRUM = 'ep',
  GOLD = 'gp',
  PLATINUM = 'pp'
}
export const CURRENCY_CONVERSION_FACTOR = {
  [CURRENCY.COPPER]: {
    [CURRENCY.COPPER]: 1,
    [CURRENCY.SILVER]: 10,
    [CURRENCY.ELECTRUM]: 50,
    [CURRENCY.GOLD]: 100,
    [CURRENCY.PLATINUM]: 1000
  },
  [CURRENCY.SILVER]: {
    [CURRENCY.COPPER]: 0.1,
    [CURRENCY.SILVER]: 1,
    [CURRENCY.ELECTRUM]: 5,
    [CURRENCY.GOLD]: 10,
    [CURRENCY.PLATINUM]: 100
  },
  [CURRENCY.ELECTRUM]: {
    [CURRENCY.COPPER]: 0.02,
    [CURRENCY.SILVER]: 0.2,
    [CURRENCY.ELECTRUM]: 1,
    [CURRENCY.GOLD]: 2,
    [CURRENCY.PLATINUM]: 50
  },
  [CURRENCY.GOLD]: {
    [CURRENCY.COPPER]: 0.01,
    [CURRENCY.SILVER]: 0.1,
    [CURRENCY.ELECTRUM]: 0.5,
    [CURRENCY.GOLD]: 1,
    [CURRENCY.PLATINUM]: 10
  },
  [CURRENCY.PLATINUM]: {
    [CURRENCY.COPPER]: 0.001,
    [CURRENCY.SILVER]: 0.01,
    [CURRENCY.ELECTRUM]: 0.05,
    [CURRENCY.GOLD]: 0.1,
    [CURRENCY.PLATINUM]: 1
  }
}
