import * as React from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Paper,
  Stack,
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
import { DataGrid } from '@mui/x-data-grid';
import { CustomAccordion } from '../shared/custom-styles';
import { ArrowDropDown } from '@mui/icons-material';
import CreateGear from './create_gear';

export default function MonsterTable() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const sections = [
    { title: 'Armour', rows: [...armours, ...custom_armours], columns: armourColumnDescriptor },
    { title: 'Weapons', rows: [...weapons, ...custom_weapons], columns: weaponColumnDescriptor },
    { title: 'Gear', rows: [...gears, ...custom_gears], columns: gearColumnDescriptor },
  ];

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
