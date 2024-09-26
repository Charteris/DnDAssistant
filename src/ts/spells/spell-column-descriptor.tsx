import { GridValueGetterParams } from '@mui/x-data-grid';
import { Spell } from '../types/Spell';

export const spellColumnDescriptor = [
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
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'school',
    headerName: 'School',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'range',
    headerName: 'Range',
    flex: 0.5,
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
