import * as React from 'react';
import { Container, Stack, TextField, Typography } from '@mui/material';
import armours from '../../res/srd_5e_armour.json';
import weapons from '../../res/srd_5e_weapons.json';
import gears from '../../res/srd_5e_gear.json';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const armourColumnDescriptor = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'AC',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'strength',
    headerName: 'Strength Req.',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'stealth',
    headerName: 'Stealth Req.',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: true,
    filterable: true,
  },
];

const weaponColumnDescriptor = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'damage',
    headerName: 'Damage',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'properties',
    headerName: 'Properties',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: true,
    filterable: true,
  },
];

const gearColumnDescriptor = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: true,
    filterable: true,
  },
];

export default function MonsterTable() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  return (
    <Container>
      <TextField
        variant="filled"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        label="Search Monsters"
        size="small"
      />
      <Stack spacing={1}>
        <Typography variant="h5">Armour</Typography>
        <DataGrid
          rows={armours.filter((armour) =>
            searchQuery
              .split('+')
              .some((query) =>
                armour.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={armourColumnDescriptor}
          onRowClick={(params) => navigate(`/monsters/${params.row.name}`)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
          sx={{ width: '100%' }}
        />
        <Typography variant="h5">Weapons</Typography>
        <DataGrid
          rows={weapons.filter((weapon) =>
            searchQuery
              .split('+')
              .some((query) =>
                weapon.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={weaponColumnDescriptor}
          onRowClick={(params) => navigate(`/monsters/${params.row.name}`)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
          sx={{ width: '100%' }}
        />
        <Typography variant="h5">Gear</Typography>
        <DataGrid
          rows={gears.filter((gear) =>
            searchQuery
              .split('+')
              .some((query) =>
                gear.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={gearColumnDescriptor}
          onRowClick={(params) => navigate(`/monsters/${params.row.name}`)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
          sx={{ width: '100%' }}
        />
      </Stack>
    </Container>
  );
}
