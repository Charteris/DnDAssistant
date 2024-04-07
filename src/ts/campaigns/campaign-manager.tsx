import {
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import CampaignMap from './campaign-map';

import MapOfAvandria from '../../res/talesOfAvandria/Avandria.png';
import MapProperties from '../../res/talesOfAvandria/Avandria.json';

const LORE = 'Lore';
const MAP = 'Map';
const ADVENTURE_LOG = 'Adventure Log';

const CampaignManager: FC = () => {
  const [openTab, setOpenTab] = useState<string>(MAP);

  return (
    <Container maxWidth="xl">
      <Stack spacing={1} direction="column" textAlign="center">
        <Paper sx={{ p: 1, m: 2 }}>
          <Typography variant="h4">Tales of Avandria</Typography>
          <Tabs
            indicatorColor="secondary"
            variant="fullWidth"
            value={openTab}
            onChange={(_e, newValue) => setOpenTab(newValue)}
          >
            <Tab label={LORE} value={LORE} />
            <Tab label={MAP} value={MAP} />
            <Tab label={ADVENTURE_LOG} value={ADVENTURE_LOG} />
          </Tabs>
        </Paper>
        <Paper sx={{ p: 1, m: 2 }}>
          <Box sx={{ p: 2 }}>
            {openTab === LORE && <Typography>{LORE}</Typography>}
            {openTab === MAP && (
              <CampaignMap
                campaignMap={MapOfAvandria}
                mapProperties={MapProperties}
              />
            )}
            {openTab === ADVENTURE_LOG && (
              <Typography>{ADVENTURE_LOG}</Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CampaignManager;