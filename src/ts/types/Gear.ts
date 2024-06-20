import gear from '../../res/resources/srd_5e_gear.json';
import weapon from '../../res/resources/srd_5e_weapons.json';
import armour from '../../res/resources/srd_5e_armour.json';

export type Gear = typeof gear[0] & { description: string };
export const defaultGear: Gear = {
  name: "",
  cost: "1 cp",
  weight: "1 lb.",
  type: "",
  description: ""
};

export type Weapon = typeof weapon[0] & { description: string };
export const defaultWeapon = {
  name: "",
  cost: "1 cp",
  damage: "1d4 bludgeoning",
  weight: "1 lb.",
  properties: "",
  type: "",
  description: ""
};

export type Armour = typeof armour[0] & { description: string };
export const defaultArmour = {
  name: "",
  cost: "1 cp",
  AC: "10 + Dex modifier",
  strength: "",
  stealth: "",
  weight: "1 lb.",
  type: "",
  description: ""
};
