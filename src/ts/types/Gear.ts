export type Gear = {
  name: string,
  cost: string,
  weight: string,
  type: string,
  description?: string
};
export const defaultGear: Gear = {
  name: "",
  cost: "1 cp",
  weight: "1 lb.",
  type: "",
  description: ""
};

type BaseWeapon = {
  name: string,
  cost: string,
  damage: string,
  weight: string,
  properties: string,
  type: string,
  description?: string
}
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
export const defaultWeapon = {
  name: "",
  cost: "1 cp",
  damage: "1d4 bludgeoning",
  weight: "1 lb.",
  properties: "",
  type: "",
  description: ""
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
}
export const defaultArmour = {
  name: "",
  cost: "1 cp",
  AC: "10 + Dex modifier",
  strength: "",
  stealth: "",
  weight: "1 lb.",
  type: "Light",
  description: ""
};
