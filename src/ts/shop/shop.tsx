import * as React from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import armours from '../../res/srd_5e_armour.json';
import weapons from '../../res/srd_5e_weapons.json';
import gears from '../../res/srd_5e_gear.json';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { CustomAccordion } from '../shared/custom-styles';
import { ArrowDropDown } from '@mui/icons-material';

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

  const sections = [
    { title: 'Armour', rows: armours, columns: armourColumnDescriptor },
    { title: 'Weapons', rows: weapons, columns: weaponColumnDescriptor },
    { title: 'Gear', rows: gears, columns: gearColumnDescriptor },
  ];

  return (
    <Container>
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
        {sections.map(({ title, rows, columns }) => (
          <CustomAccordion>
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h5" margin={1}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper sx={{ m: 2 }}>
                <DataGrid
                  rows={rows.filter((armament) =>
                    searchQuery
                      .split('+')
                      .some((query) =>
                        armament.name
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      )
                  )}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 25, 50]}
                  getRowId={(row) => row.name}
                  sx={{ width: '100%' }}
                />
              </Paper>
            </AccordionDetails>
          </CustomAccordion>
        ))}
      </Paper>
    </Container>
  );
}
