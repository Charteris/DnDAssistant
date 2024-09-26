import monsters from '../../res/resources/srd_5e_monsters.json';

export const PLACEHOLDER_IMAGES = {
  humanoid: "https://media-waterdeep.cursecdn.com/attachments/2/656/humanoid.jpg",
  undead: "https://media-waterdeep.cursecdn.com/attachments/2/660/undead.jpg",
  beast: "https://media-waterdeep.cursecdn.com/attachments/2/648/beast.jpg",
  plant: "https://media-waterdeep.cursecdn.com/attachments/2/659/plant.jpg",
  ooze: "https://media-waterdeep.cursecdn.com/attachments/2/658/ooze.jpg"
};

export type Monster = {
  name: string,
  meta: string,
  AC: string,
  HP: string,
  Speed: string,
  STR: string,
  STR_mod: string,
  DEX: string,
  DEX_mod: string,
  CON: string,
  CON_mod: string,
  INT: string,
  INT_mod: string,
  WIS: string,
  WIS_mod: string,
  CHA: string,
  CHA_mod: string,
  Saving_Throws: string | undefined,
  Skills: string | undefined,
  Damage_Vulnerabilities: string | undefined,
  Damage_Resistances: string | undefined,
  Damage_Immunities: string | undefined,
  Condition_Immunities: string | undefined,
  Senses: string,
  Languages: string,
  Challenge: string,
  Traits: string | undefined,
  Actions: string,
  Reactions: string | undefined,
  Legendary_Actions: string | undefined,
  img_url: string,
};
export const defaultMonster = {
  name: "",
  meta: "Medium humanoid, any",
  AC: "12",
  HP: "10",
  Speed: "30ft.",
  STR: "10",
  STR_mod: "(+0)",
  DEX: "10",
  DEX_mod: "(+0)",
  CON: "10",
  CON_mod: "(+0)",
  INT: "10",
  INT_mod: "(+0)",
  WIS: "10",
  WIS_mod: "(+0)",
  CHA: "10",
  CHA_mod: "(+0)",
  Senses: "Passive Perception 10",
  Languages: "--",
  Challenge: "1/4 (50 XP)",
  Actions: "",
  img_url: PLACEHOLDER_IMAGES.humanoid,
}

export type baseMonster = typeof monsters[0];
