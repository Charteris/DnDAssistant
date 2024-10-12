import monsters from '../../res/core/srd_5e_monsters.json';

import aberration from "../../res/images/aberration-icon.jpg";
import beast from "../../res/images/beast-icon.jpg";
import celestial from "../../res/images/celestial-icon.jpg";
import construct from "../../res/images/construct-icon.jpg";
import dragon from "../../res/images/dragon-icon.jpg";
import elemental from "../../res/images/elemental-icon.jpg";
import fey from "../../res/images/fey-icon.jpg";
import fiend from "../../res/images/fiend-icon.jpg";
import giant from "../../res/images/giant-icon.jpg";
import humanoid from "../../res/images/humanoid-icon.jpg";
import monstrosity from "../../res/images/monstrosity-icon.jpg";
import ooze from "../../res/images/ooze-icon.jpg";
import plant from "../../res/images/plant-icon.jpg";
import undead from "../../res/images/undead-icon.jpg";

export const PLACEHOLDER_IMAGES: { [key: string]: string } = {
  aberration, beast, celestial, construct, dragon, elemental, fey, fiend, giant, humanoid, monstrosity, ooze, plant, undead
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
