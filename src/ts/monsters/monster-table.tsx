import * as React from 'react';
import { Container, Paper, TextField } from '@mui/material';
import monsters from '../../res/srd_5e_monsters.json';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columnDescriptor = [
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
    field: 'HP',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'Speed',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'STR',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'DEX',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'CON',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'INT',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'WIS',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'CHA',
    flex: 0.25,
    sortable: true,
    filterable: true,
  },
  {
    field: 'Senses',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'Challenge',
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
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        label="Search Monsters"
        size="small"
      />
      <Paper sx={{ margin: 3 }}>
        <DataGrid
          rows={monsters.filter((monster) =>
            searchQuery
              .split('+')
              .some((query) =>
                monster.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={columnDescriptor}
          onRowClick={(params) => navigate(`/monsters/${params.row.name}`)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
          sx={{ width: '100%' }}
        />
      </Paper>
    </Container>
  );
}
