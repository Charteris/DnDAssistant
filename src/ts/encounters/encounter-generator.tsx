import React from 'react';
import {
  Autocomplete,
  Button,
  Container,
  Divider,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ALIGNMENTS,
  DIFFICULTIES,
  MAX_EXPERIENCE,
  MIN_EXPERIENCE,
  MONSTER_TYPES,
  SIZES,
} from '../constants';
import useGenerateEncounter from './use-generate-encounter';
import EncounterTracker from './encounter-tracker';

// TODO: Provide support for loading and saving encounters for quick-retrieval
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
    experience,
    setExperience,
    determineMonstersInEncounter,
    monstersInCombat,
  } = useGenerateEncounter();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Encounter</Typography>
      <Divider orientation="horizontal" sx={{ mb: '1%', mt: '0.5%' }} />
      <Paper sx={{ p: 2, m: 1 }}>
        <Stack
          spacing={1}
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Generate Encounter</Typography>
          <TextField
            variant="filled"
            fullWidth
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label="Keywords"
            size="small"
          />
          <Stack
            spacing={1}
            direction="row"
            width="100%"
            flexWrap="wrap"
            useFlexGap
          >
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
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            width="100%"
            flexWrap="wrap"
            useFlexGap
          >
            <Autocomplete
              options={[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
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
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              size="small"
              label="Max"
              value={experience[0]}
              onChange={(event) =>
                setExperience([parseInt(event.target.value), experience[1]])
              }
            />
            <Stack direction="column" flexGrow={2}>
              <Typography variant="subtitle2">Experience Range</Typography>
              <Slider
                value={experience}
                onChange={(_e, newValue) => setExperience(newValue as number[])}
                valueLabelDisplay="auto"
                min={MIN_EXPERIENCE}
                max={MAX_EXPERIENCE}
              />
            </Stack>
            <TextField
              size="small"
              label="Max"
              value={experience[1]}
              onChange={(event) =>
                setExperience([experience[0], parseInt(event.target.value)])
              }
            />
          </Stack>
          <Button variant="outlined" onClick={determineMonstersInEncounter}>
            Generate Encounter
          </Button>
        </Stack>
      </Paper>
      <EncounterTracker monstersInCombat={monstersInCombat} />
    </Container>
  );
}
