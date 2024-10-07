import * as React from 'react';
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Switch,
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
import {
  armourColumnDescriptor,
  weaponColumnDescriptor,
  gearColumnDescriptor,
} from './gear-column-descriptors';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Armour, Gear, Weapon } from '../types/Gear';
import CreateGear from './create-gear';
import { useCallback } from 'react';

type GearType = Weapon | Armour | Gear;
type SectionsType = {
  [id: string]: { rows: GearType[]; columns: GridColDef[] };
};

export default function MonsterTable() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeSection, setActiveSection] = React.useState<
    'Armour' | 'Weapons' | 'Gear'
  >('Weapons');
  const [showDescription, setShowDescription] = React.useState(false);
  const sections: SectionsType = {
    Weapons: {
      rows: [...weapons, ...custom_weapons],
      columns: weaponColumnDescriptor,
    },
    Armour: {
      rows: [...armours, ...custom_armours],
      columns: armourColumnDescriptor,
    },
    Gear: { rows: [...gears, ...custom_gears], columns: gearColumnDescriptor },
  };

  const getColumnDescription = useCallback(() => {
    const columns = [...sections[activeSection].columns];
    if (showDescription) {
      columns.push({
        field: 'description',
        headerName: 'Description',
        flex: 3,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Typography mt={1} mb={1}>
            {params.value}
          </Typography>
        ),
      });
    }
    return columns;
  }, [activeSection, showDescription]);

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
          <Stack direction="row" justifyContent="space-between">
            <Tabs
              value={activeSection}
              onChange={(_event, value) => setActiveSection(value)}
              aria-label="armaments-tabs"
            >
              {Object.keys(sections).map((title) => (
                <Tab label={title} value={title} />
              ))}
            </Tabs>
            <Switch
              checked={showDescription}
              onChange={(_event, checked) => setShowDescription(checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
          <Paper sx={{ m: 2 }}>
            <DataGrid
              rows={sections[activeSection].rows.filter((armament) =>
                searchQuery
                  .split('+')
                  .some((query) =>
                    armament.name.toLowerCase().includes(query.toLowerCase())
                  )
              )}
              columns={getColumnDescription()}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(row) => row.name}
              sx={{ width: '100%' }}
              getDetailPanelContent={(params) =>
                params.row.description && (
                  <Box sx={{ p: 2 }}>{params.row.description}</Box>
                )
              }
              getRowHeight={() => 'auto'}
            />
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
