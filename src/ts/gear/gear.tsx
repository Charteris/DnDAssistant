import * as React from 'react';
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import armours from '../../res/resources/srd_5e_armour.json';
import custom_armours from '../../res/resources/custom_armour.json';
import weapons from '../../res/resources/srd_5e_weapons.json';
import custom_weapons from '../../res/resources/custom_weapons.json';
import gears from '../../res/resources/srd_5e_gear.json';
import custom_gears from '../../res/resources/custom_gear.json';
import { armourColumnDescriptor, weaponColumnDescriptor, gearColumnDescriptor } from './gear_column_descriptors';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CreateGear from './create_gear';
import { Armour, Gear, Weapon } from '../types/Gear';

type GearType = Weapon | Armour | Gear;
type SectionsType = { [id: string]: { rows: GearType[], columns: GridColDef[] } };

export default function MonsterTable() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeSection, setActiveSection] = React.useState<'Armour' | 'Weapons' | 'Gear'>('Weapons');
  const sections: SectionsType = {
    'Weapons': { rows: [...weapons, ...custom_weapons], columns: weaponColumnDescriptor },
    'Armour': { rows: [...armours, ...custom_armours], columns: armourColumnDescriptor },
    'Gear': { rows: [...gears, ...custom_gears], columns: gearColumnDescriptor },
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Gear</Typography>
        <CreateGear />
      </Stack>
      <Divider orientation="horizontal" sx={{ mb: '1%', mt: '0.5%' }} />
      <TextField
        variant="filled"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        label="Search Armaments"
        size="small"
      />
      <Paper sx={{ p: 3 }}>
        <Stack direction="column">
          <Tabs value={activeSection} onChange={(_event, value) => setActiveSection(value)} aria-label="armaments-tabs">
            {Object.keys(sections).map((title) => (<Tab label={title} value={title} />))}
          </Tabs>
          <Paper sx={{ m: 2 }}>
            <DataGrid
              rows={sections[activeSection].rows.filter((armament) =>
                searchQuery
                  .split('+')
                  .some((query) =>
                    armament.name
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
              )}
              columns={sections[activeSection].columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(row) => row.name}
              sx={{ width: '100%' }}
              getDetailPanelContent={(params) => params.row.description && (<Box sx={{ p: 2 }}>{params.row.description}</Box>)}
              getRowHeight={() => 'auto'}
            />
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
