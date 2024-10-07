import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Armour, Gear, Weapon } from '../types/Gear';
import { Container, Typography } from '@mui/material';

const weaponColumnDescriptor: GridColDef<Weapon>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
    renderCell: (params) => (
      <Typography mt={1} mb={1}>
        {params.value}
      </Typography>
    ),
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
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'properties',
    headerName: 'Properties',
    flex: 2,
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

const armourColumnDescriptor: GridColDef<Armour>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filterable: true,
    renderCell: (params) => (
      <Typography mt={1} mb={1}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'AC',
    flex: 1.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'strength',
    headerName: 'Requirements',
    flex: 1.5,
    sortable: true,
    filterable: true,
    renderCell: (params) => {
      const requirements = params.row.strength ? [params.row.strength] : [];
      if (params.row.stealth)
        requirements.push(`${params.row.stealth} (Stealth)`);
      return <Typography>{requirements.join(', ')}</Typography>;
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: true,
    filterable: true,
  },
];

const gearColumnDescriptor: GridColDef<Gear>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1.5,
    sortable: true,
    filterable: true,
    renderCell: (params) => (
      <Typography mt={1} mb={1}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    flex: 0.5,
    sortable: true,
    filterable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1.5,
    sortable: true,
    filterable: true,
  },
];

export { armourColumnDescriptor, weaponColumnDescriptor, gearColumnDescriptor };
