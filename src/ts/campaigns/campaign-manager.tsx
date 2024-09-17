import {
  Box,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { FC, Suspense, useState } from 'react';
import CampaignMap from './campaign-map';

import MapOfAvandria from '../../res/talesOfAvandria/Avandria.png';
import MapProperties from '../../res/talesOfAvandria/Avandria.json';
import AvandriaLore from '../../res/talesOfAvandria/AvandriaLore.json';
import RenderJsonRecursive from '../shared/render-json-recursive';

const LORE = 'Lore';
const MAP = 'Map';
const ADVENTURE_LOG = 'Adventure Log';

const CampaignManager: FC = () => {
  const [openTab, setOpenTab] = useState<string>(MAP);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Campaign</Typography>
      <Divider orientation="horizontal" sx={{ mb: '1%', mt: '0.5%' }} />
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
          <Box sx={{ p: 2, textAlign: 'left' }}>
            {openTab === LORE && (
              <Suspense
                fallback={<Skeleton animation="wave" variant="rounded" />}
              >
                <RenderJsonRecursive instance={AvandriaLore} />
              </Suspense>
            )}
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
