import * as React from 'react';
import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  armourColumnDescriptor,
  weaponColumnDescriptor,
  gearColumnDescriptor,
} from './gear-column-descriptors';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { allArmour, allGear, allWeapons, Armour, Gear, Weapon } from '../types/Gear';
import CreateGear from './create-gear';
import { useCallback } from 'react';

type GearType = Weapon | Armour | Gear;
type SectionsType = {
  [id: string]: { rows: GearType[]; columns: GridColDef[] };
};

export default function GearTable() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeSection, setActiveSection] = React.useState<
    'Armour' | 'Weapons' | 'Gear'
  >('Weapons');
  const [showDescription, setShowDescription] = React.useState(false);
  const sections: SectionsType = {
    Weapons: {
      rows: allWeapons,
      columns: weaponColumnDescriptor,
    },
    Armour: {
      rows: allArmour,
      columns: armourColumnDescriptor,
    },
    Gear: { rows: allGear, columns: gearColumnDescriptor },
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
      <Paper sx={{ p: 3 }}>
        <Stack direction="column">
          <TextField
            variant="filled"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            label="Search Armaments"
            size="small"
          />
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
            <FormControlLabel
              value="start"
              control={<Switch
                checked={showDescription}
                onChange={(_event, checked) => setShowDescription(checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
              label="Show Descriptions"
              labelPlacement="start"
            />
          </Stack>
          <Paper sx={{ m: 2 }}>
            <DataGrid
              localeText={{ noRowsLabel: "No Gear Found" }}
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
              autoHeight={true}
            />
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
