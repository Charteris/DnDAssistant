import gear from '../../res/core/srd_5e_gear.json';
import custom_gear from '../../res/core/custom_gear.json';

import weapons from '../../res/core/srd_5e_weapons.json';
import magic_weapons from '../../res/core/srd_5e_magic_weapons.json';
import custom_weapons from '../../res/core/custom_weapons.json';

import armour from '../../res/core/srd_5e_armour.json';
import magic_armour from '../../res/core/srd_5e_magic_armour.json';
import custom_armour from '../../res/core/custom_armour.json';

export type Gear = {
  name: string,
  cost: string,
  weight: string,
  type: string,
  description?: string
};

type BaseWeapon = {
  name: string,
  cost: string,
  damage: string,
  weight: string,
  properties: string,
  type: string,
  description?: string
};

export type Weapon = BaseWeapon & {
  rarity?: string,
  attunement?: string,
  bonus?: string,
  advantage?: string,
  immunity?: string,
  sense?: string,
  proficiency?: string,
  cursed?: boolean,
  notes?: string
};

type BaseArmour = {
  name: string,
  cost: string,
  AC: string,
  strength?: string,
  stealth?: string,
  weight: string,
  type: string,
  description?: string
};

export type Armour = BaseArmour & {
  rarity?: string,
  attunement?: string
};

// DATA

export const allGear: Gear[] = [
  ...gear,
  ...custom_gear
];

export const allWeapons: Weapon[] = [
  ...weapons,
  ...magic_weapons,
  ...custom_weapons
];

export const allArmour: Armour[] = [
  ...armour,
  ...magic_armour,
  ...custom_armour
];

export const defaultGear: Gear = {
  name: "",
  cost: "1 cp",
  weight: "1 lb.",
  type: "",
  description: ""
};

export const defaultWeapon: Weapon = {
  name: "",
  cost: "1 cp",
  damage: "1d4 bludgeoning",
  weight: "1 lb.",
  properties: "",
  type: "",
  description: ""
};

export const defaultArmour: Armour = {
  name: "",
  cost: "1 cp",
  AC: "10 + Dex modifier",
  strength: "",
  stealth: "",
  weight: "1 lb.",
  type: "Light",
  description: ""
};
