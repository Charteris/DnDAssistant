import spells from '../../res/core/srd_5e_spells.json';

export type SpellComponent = {
  material: boolean,
  materials_needed: string[],
  raw: string,
  somatic: boolean,
  verbal: boolean
}
export const defaultComponent = {
  material: false,
  materials_needed: [],
  raw: "",
  somatic: false,
  verbal: false,
};

export type Spell = {
  casting_time: string,
  classes: string[],
  components: SpellComponent,
  description: string,
  duration: string,
  higher_levels: string,
  level: string,
  name: string,
  range: string,
  ritual: boolean,
  school: string,
  tags: string[],
  type: string
};

export const defaultSpell: Spell = {
  casting_time: "1 action",
  classes: [
    "wizard"
  ],
  components: defaultComponent,
  description: "",
  duration: "Instantaneous",
  higher_levels: "",
  level: "cantrip",
  name: "",
  range: "Touch",
  ritual: false,
  school: "abjuration",
  tags: [
    "wizard",
    "cantrip"
  ],
  type: "abjuration cantrip"
}


export const LEVELS = ['cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const CLASSES = ['druid', 'sorcerer', 'wizard', 'ranger', 'bard', 'warlock', 'cleric', 'paladin'];
export const SCHOOLS = [
  'conjuration',
  'abjuration',
  'enchantment',
  'evocation',
  'necromancy',
  'illusion',
  'divination',
  'transmutation'
];
