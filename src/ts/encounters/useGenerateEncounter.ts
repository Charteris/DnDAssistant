import React, { useCallback } from 'react';
import monsters from '../../res/srd_5e_monsters.json';
import {
  DIFFICULTIES,
  ENCOUNTER_MULTIPLIERS,
  EXPERIENCE_THRESHOLDS,
} from '../constants';
import { Monster } from '../types/Monster';

export default function useGenerateEncounter() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [monsterTypes, setMonsterTypes] = React.useState<string[]>([]);
  const [alignments, setAlignments] = React.useState<string[]>([]);
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [playerLevel, setPlayerLevel] = React.useState<number>(1);
  const [partySize, setPartySize] = React.useState<number>(1);
  const [difficulty, setDifficulty] = React.useState<string>('Easy');
  const [monstersInCombat, setMonstersInCombat] = React.useState<Monster[]>([]);

  const filterMonsters = () => {
    console.log(searchQuery, monsterTypes, alignments, sizes);
    const monstersByCategory = monsters.filter(
      (monster) =>
        (monsterTypes.length === 0 ||
          monsterTypes.some((type) =>
            monster.meta.includes(type.toLowerCase())
          )) &&
        (alignments.length === 0 ||
          alignments.some((alignment) =>
            monster.meta.includes(alignment.toLowerCase())
          )) &&
        (sizes.length === 0 ||
          sizes.some((size) => monster.meta.includes(size)))
    );
    return monstersByCategory.filter((monster) =>
      searchQuery
        .split('+')
        .some((query) =>
          monster.name.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  const getMonsterXP = (monster: Monster) =>
    Number(monster.Challenge.split('(')[1].replace(/[^0-9.]/g, ''));

  const determineMonstersInEncounter = () => {
    const maxExperienceThreshold =
      EXPERIENCE_THRESHOLDS[playerLevel - 1][
        DIFFICULTIES.findIndex((diff) => diff === difficulty)
      ] * partySize;
    let potentialMonsters = filterMonsters().filter(
      (monster) => getMonsterXP(monster) <= maxExperienceThreshold
    );
    let experienceThreshold = maxExperienceThreshold;
    let multiplier = 1;

    console.log(maxExperienceThreshold, potentialMonsters);

    // Determine potential combatants
    const monstersInCombat: Monster[] = [];
    while (experienceThreshold > 0 && potentialMonsters.length > 0) {
      const monsterIndex = Math.floor(Math.random() * potentialMonsters.length);
      const monster = potentialMonsters[monsterIndex];
      monstersInCombat.push(monster);

      // Adjust experience threshold accounting for monster groups
      multiplier =
        ENCOUNTER_MULTIPLIERS.find(
          (encounterMultiplier) =>
            monstersInCombat.length + 1 <=
              encounterMultiplier.numberOfMonsters ||
            encounterMultiplier.numberOfMonsters === 15
        )?.multiplier ?? 1;
      const usedXPBudget = monstersInCombat.reduce(
        (accumulator, monster) => (accumulator += getMonsterXP(monster)),
        0
      );
      experienceThreshold = maxExperienceThreshold - usedXPBudget * multiplier;
      potentialMonsters = potentialMonsters.filter(
        (monster) => getMonsterXP(monster) <= experienceThreshold / multiplier
      );
    }
    setMonstersInCombat(monstersInCombat);
  };

  return {
    searchQuery,
    setSearchQuery,
    setMonsterTypes,
    setAlignments,
    setSizes,
    playerLevel,
    setPlayerLevel,
    partySize,
    setPartySize,
    difficulty,
    setDifficulty,
    determineMonstersInEncounter,
    monstersInCombat,
  };
}
