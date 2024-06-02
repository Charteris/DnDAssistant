import React, { useCallback } from 'react';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import spells from '../../res/srd_5e_spells.json';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Spell } from '../types/Spell';
import { useState } from 'react';
import PageIterator from '../shared/page-iterator';
import SpellCard from '../spells/spell-card';
import { Close } from '@mui/icons-material';
import { spellColumnDescriptor } from './spell-column-descriptor';

export default function SpellTable() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [spellIndex, setSpellIndex] = useState<number>(0);
  const filteredSpells = spells.filter((spell) =>
    searchQuery
      .split('+')
      .some((query) => spell.name.toLowerCase().includes(query.toLowerCase()))
  );

  const onViewSpell = useCallback(
    (params: GridRowParams) => {
      setSelectedSpell(params.row);
      setSpellIndex(
        spells.findIndex((spell) => spell.name === params.row.name)
      );
    },
    [selectedSpell, setSelectedSpell, setSpellIndex]
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
      <TextField
        variant="filled"
        fullWidth
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        label="Search Spells"
        size="small"
      />
      <Paper sx={{ margin: 1 }}>
        <DataGrid
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
        />
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
            <IconButton onClick={() => setSelectedSpell(null)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Container sx={{ justifyContent: 'center', alignContent: 'center' }}>
            {selectedSpell !== null && <SpellCard spell={selectedSpell} />}
            <PageIterator
              page={spellIndex}
              maxLength={spells.length}
              pageSetter={onViewNextSpell}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
