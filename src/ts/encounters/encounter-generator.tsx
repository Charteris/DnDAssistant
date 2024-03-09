import React from 'react';
import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
} from '@mui/material';
import { ALIGNMENTS, DIFFICULTIES, MONSTER_TYPES, SIZES } from '../constants';
import useGenerateEncounter from './useGenerateEncounter';
import EncounterTracker from './encounter-tracker';

export default function EncounterGenerator() {
  const {
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
  } = useGenerateEncounter();

  return (
    <Container>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          variant="filled"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          label="Keywords"
          size="small"
        />
        <Stack spacing={1} direction="row" width="100%">
          <Autocomplete
            multiple
            options={MONSTER_TYPES}
            onChange={(_event, newValue) => setMonsterTypes(newValue)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Monster Type" />
            )}
          />
          <Autocomplete
            multiple
            options={ALIGNMENTS}
            onChange={(_event, newValue) => setAlignments(newValue)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Alignment" />
            )}
          />
          <Autocomplete
            multiple
            options={SIZES}
            onChange={(_event, newValue) => setSizes(newValue)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="Size" />}
          />
          <Autocomplete
            options={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ]}
            value={playerLevel}
            onChange={(_event, newValue) => setPlayerLevel(newValue ?? 1)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Max Player Level" />
            )}
            getOptionLabel={(option) => `${option}`}
          />
          <Autocomplete
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={partySize}
            onChange={(_event, newValue) => setPartySize(newValue ?? 1)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Party Size" />
            )}
            getOptionLabel={(option) => `${option}`}
          />
          <Autocomplete
            options={DIFFICULTIES}
            value={difficulty}
            onChange={(_event, newValue) => setDifficulty(newValue ?? 'Easy')}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Difficulty" />
            )}
          />
        </Stack>
        <Button variant="contained" onClick={determineMonstersInEncounter}>
          Generate Encounter
        </Button>
        <EncounterTracker monstersInCombat={monstersInCombat} />
      </Stack>
    </Container>
  );
}
