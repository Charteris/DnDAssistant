import React, { FC, useCallback, useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import { Shield, Favorite, Air, Delete } from '@mui/icons-material';
import { Monster } from '../types/Monster';
import MonsterCard from '../monsters/monster-card';

const EncounterTracker: FC<{ monstersInCombat: Monster[] }> = ({
  monstersInCombat,
}) => {
  const [initiatives, setInitiatives] = useState<number[]>([]);
  const [tempHP, setTempHP] = useState<number[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster>(
    monstersInCombat[0]
  );

  if (selectedMonster === undefined && monstersInCombat.length > 0) {
    setSelectedMonster(monstersInCombat[0]);
  }

  const setTempHPByIndex = useCallback(
    (newHP: number, index: number) => {
      const newTempHPs = [...tempHP];
      newTempHPs[index] = newHP;
      setTempHP(newTempHPs);
    },
    [tempHP, setTempHP]
  );

  return monstersInCombat.length === 0 ? (
    <></>
  ) : (
    <Stack direction="row" justifyContent="space-around">
      <Stack spacing={1} direction="column" alignItems="center">
        {monstersInCombat.map((monster, index) => (
          <Stack direction="row" alignItems="top">
            <IconButton onClick={() => monstersInCombat.splice(index, 1)}>
              <Delete />
            </IconButton>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              marginBottom={2}
            >
              <Button
                variant="outlined"
                onClick={() => setSelectedMonster(monster)}
                fullWidth
              >
                <Typography>{monster.name}</Typography>
              </Button>
              <Stack direction="row" justifyContent="center">
                <Shield />
                <Typography marginRight={2}>
                  {monster.AC.split(' ')[0]}
                </Typography>
                <Favorite />
                <TextField
                  value={tempHP}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTempHPByIndex(Number(event.target.value), index);
                  }}
                  label="HP"
                  variant="filled"
                />
                <Typography marginRight={2}>
                  {` / ${monster.HP.split(' ')[0]}`}
                </Typography>
                <Air />
                <Typography marginRight={2}>
                  {initiatives[index] ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Box width="70%" margin={1}>
        <MonsterCard monster={selectedMonster} />
      </Box>
    </Stack>
  );
};

export default EncounterTracker;
