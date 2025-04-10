import React, { useCallback } from 'react';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { allSpells, Spell } from '../types/Spell';
import { useState } from 'react';
import PageIterator from '../shared/page-iterator';
import SpellCard from '../spells/spell-card';
import { Close } from '@mui/icons-material';
import { spellColumnDescriptor } from './spell-column-descriptor';
import CreateSpell from './create-spell';

export default function SpellTable() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [spellIndex, setSpellIndex] = useState<number>(0);

  const filteredSpells = allSpells.filter((spell) =>
    searchQuery
      .split('+')
      .some((query) => spell.name.toLowerCase().includes(query.toLowerCase()))
  ).map((spell) => spell as Spell);

  const onViewSpell = useCallback(
    (params: GridRowParams) => {
      setSelectedSpell(params.row);
      setSpellIndex(
        filteredSpells.findIndex((spell) => spell.name === params.row.name)
      );
    },
    [selectedSpell, filteredSpells, setSelectedSpell, setSpellIndex]
  );

  const onViewNextSpell = useCallback(
    (newPage: number) => {
      setSpellIndex(newPage);
      setSelectedSpell(filteredSpells[newPage]);
    },
    [filteredSpells, setSelectedSpell]
  );

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Spells</Typography>
        <CreateSpell />
      </Stack>
      <Divider orientation="horizontal" sx={{ mb: '1%', mt: '0.5%' }} />
      <Paper sx={{ p: 3 }}>
        <Stack direction="column">
          <TextField
            variant="filled"
            fullWidth
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label="Search Spells"
            size="small"
          />
          <Paper sx={{ m: 2 }}>
            <DataGrid
              localeText={{ noRowsLabel: "No Spells Found" }}
              rows={filteredSpells}
              columns={spellColumnDescriptor}
              onRowClick={onViewSpell}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(row) => row.name}
              autoHeight={true}
            />
          </Paper>
        </Stack>
      </Paper>
      <Dialog
        open={selectedSpell !== null}
        onClose={() => setSelectedSpell(null)}
        maxWidth="xl"
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Spell View</Typography>
            <PageIterator
              page={spellIndex}
              maxLength={filteredSpells.length}
              pageSetter={onViewNextSpell}
            />
            <IconButton onClick={() => setSelectedSpell(null)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Container sx={{ justifyContent: 'center', alignContent: 'center' }}>
            {selectedSpell !== null && <SpellCard spell={selectedSpell} />}
          </Container>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
