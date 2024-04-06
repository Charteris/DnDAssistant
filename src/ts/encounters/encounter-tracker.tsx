import React, { FC } from 'react';
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
import { Shield, Favorite, Speed, Delete, Event } from '@mui/icons-material';
import { Monster } from '../types/Monster';
import MonsterCard from '../monsters/monster-card';
import SelectMonster from './select-monster';
import PageIterator from '../shared/page-iterator';
import useTrackEncounter from './useTrackEncounter';

const PAGE_SIZE = 5;

const EncounterTracker: FC<{ monstersInCombat: Monster[] }> = ({
  monstersInCombat,
}) => {
  const {
    remainingMonsters,
    identifiedMonster,
    onAddMonster,
    onDeleteMonster,
    setSelectedMonster,
    onUpdateHealth,
    pageNumber,
    setPageNumber,
  } = useTrackEncounter(monstersInCombat);
  const pageOffset = pageNumber * PAGE_SIZE;

  return (
    <Stack direction="row" justifyContent="space-around">
      <Box sx={{ width: '70%' }}>
        {!identifiedMonster ? (
          <Container>
            <Paper
              sx={{ m: 2, p: 3, display: 'flex', justifyContent: 'center' }}
            >
              <Typography variant="h5">No monster selected</Typography>
            </Paper>
          </Container>
        ) : (
          <MonsterCard monster={identifiedMonster} />
        )}
      </Box>
      <Card sx={{ m: 2, width: '30%' }}>
        <CardContent>
          <Stack spacing={1} direction="column" alignItems="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Box />
              <Typography variant="h5">Enemies</Typography>
              <SelectMonster onSelectMonster={onAddMonster} />
            </Stack>
            {remainingMonsters.length > 0 && (
              <Typography variant="subtitle1" mt={-1}>
                {`(${remainingMonsters.length} monster(s) remaining)`}
              </Typography>
            )}
            {remainingMonsters
              .slice(pageOffset, pageOffset + PAGE_SIZE)
              .sort((a, b) => (a.initiative > b.initiative ? 1 : -1))
              .map((monster) => (
                <Paper variant="outlined" sx={{ p: 1 }}>
                  <Stack
                    spacing={0.5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setSelectedMonster(monster)}
                      fullWidth
                    >
                      <Typography>{monster.name}</Typography>
                    </Button>
                    <TextField
                      hiddenLabel
                      value={monster.hp}
                      onChange={(event) =>
                        onUpdateHealth(
                          monster.uuid,
                          parseFloat(event.target.value)
                        )
                      }
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
                        onClick={() => onDeleteMonster(monster)}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            {remainingMonsters.length > 0 && (
              <PageIterator
                page={pageNumber}
                maxLength={Math.floor(remainingMonsters.length / PAGE_SIZE)}
                pageSetter={setPageNumber}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EncounterTracker;
