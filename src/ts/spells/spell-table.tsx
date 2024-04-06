import * as React from 'react';
import { Container, Paper, TextField } from '@mui/material';
import spells from '../../res/srd_5e_spells.json';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Spell } from '../types/Spell';

const columnDescriptor = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'level',
    headerName: 'Level',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'school',
    headerName: 'School',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'range',
    headerName: 'Range',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'casting_time',
    headerName: 'Casting Time',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'components',
    headerName: 'Components',
    flex: 1,
    sortable: true,
    filterable: true,
    valueGetter: (params: GridValueGetterParams<Spell>) =>
      params.row.components.raw,
  },
  {
    field: 'classes',
    headerName: 'Classes',
    flex: 1,
    sortable: true,
    filterable: true,
    valueGetter: (params: GridValueGetterParams<Spell>) =>
      params.row.classes.join(', '),
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
        label="Search Spells"
        size="small"
      />
      <Paper sx={{ m: 1 }}>
        <DataGrid
          rows={spells.filter((spell) =>
            searchQuery
              .split('+')
              .some((query) =>
                spell.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={columnDescriptor}
          onRowClick={(params) => navigate(`/spells/${params.row.name}`)}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
        />
      </Paper>
    </Container>
  );
}
