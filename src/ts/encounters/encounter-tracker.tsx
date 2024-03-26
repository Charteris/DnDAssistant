import React, { FC, useCallback, useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper,
  Container,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import { Shield, Favorite, Speed, Delete } from '@mui/icons-material';
import { Monster } from '../types/Monster';
import MonsterCard from '../monsters/monster-card';

type RemainingMonster = {
  monsterIndex: number;
  name: string;
  maxHP: string;
  hp: number;
  ac: number;
  initiative: number;
};

const getRemainingMonsters = (monsters: Monster[]): RemainingMonster[] => {
  return monsters.map((monster, index) => {
    const modifier = parseInt(monster.DEX_mod.replace(/([(+)])/g, ''));
    const initiative = Math.floor(Math.random() * 20) + modifier;
    return {
      monsterIndex: index,
      name: monster.name,
      maxHP: monster.HP,
      hp: parseInt(monster.HP),
      ac: parseInt(monster.AC),
      initiative,
    };
  });
};

const EncounterTracker: FC<{ monstersInCombat: Monster[] }> = ({
  monstersInCombat,
}) => {
  const [selectedMonster, setSelectedMonster] = useState<Monster>(
    monstersInCombat[0]
  );
  const [remainingMonsters, setRemainingMonsters] = useState(
    getRemainingMonsters(monstersInCombat)
  );

  if (selectedMonster === undefined && monstersInCombat.length > 0) {
    setSelectedMonster(monstersInCombat[0]);
    setRemainingMonsters(getRemainingMonsters(monstersInCombat));
  }

  // const setTempHPByIndex = useCallback(
  //   (newHP: number, index: number) => {
  //     const newTempHPs = [...tempHP];
  //     newTempHPs[index] = newHP;
  //     setTempHP(newTempHPs);
  //   },
  //   [tempHP, setTempHP]
  // );

  return monstersInCombat.length === 0 ? (
    <Container>
      <Paper sx={{ m: 2, p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Could not find any worthy opponents</Typography>
      </Paper>
    </Container>
  ) : (
    <Stack direction="row" justifyContent="space-around">
      <Box sx={{ width: '70%' }}>
        <MonsterCard monster={selectedMonster} />
      </Box>
      <Card sx={{ m: 2, width: '30%' }}>
        <CardContent>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant="h5">Enemies</Typography>
            {remainingMonsters.map((monster, index) => (
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Stack
                  spacing={0.5}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setSelectedMonster(monstersInCombat[monster.monsterIndex])
                    }
                    fullWidth
                  >
                    <Typography>{monster.name}</Typography>
                  </Button>
                  <TextField
                    hiddenLabel
                    value={monster.hp}
                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    //   setTempHPByIndex(Number(event.target.value), index);
                    // }}
                    placeholder="HP"
                    variant="filled"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 2 }}>
                          <Favorite />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography marginRight={2}>
                            {` / ${monster.maxHP.split(' ')[0]}`}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack
                    spacing={8}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack spacing={1} direction="row">
                      <Shield />
                      <Typography marginRight={2}>{monster.ac}</Typography>
                    </Stack>
                    <Stack spacing={1} direction="row">
                      <Speed />
                      <Typography marginRight={2}>
                        {monster.initiative}
                      </Typography>
                    </Stack>
                    <IconButton
                      size="small"
                      onClick={() => monstersInCombat.splice(index, 1)}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EncounterTracker;
