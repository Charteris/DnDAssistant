import * as React from 'react';
import { Container, Paper, TextField } from '@mui/material';
import monsters from '../../res/srd_5e_monsters.json';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
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

const MonsterTable: React.FC<{
  onRowClick?: (params: GridRowParams) => void;
  props?: object;
}> = ({ onRowClick, props = {} }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const onViewMonster = (params: GridRowParams) =>
    navigate(`/monsters/${params.row.name}`);

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
      <Paper sx={{ margin: 1 }}>
        <DataGrid
          rows={monsters.filter((monster) =>
            searchQuery
              .split('+')
              .some((query) =>
                monster.name.toLowerCase().includes(query.toLowerCase())
              )
          )}
          columns={columnDescriptor}
          onRowClick={onRowClick ?? onViewMonster}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.name}
          {...props}
        />
      </Paper>
    </Container>
  );
};

export default MonsterTable;
