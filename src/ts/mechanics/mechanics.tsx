import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import mechanics from '../../res/rules/06 mechanics.json';
import RenderJsonRecursive from '../shared/render-json-recursive';

export default function Mechanics() {
  return (
    <Stack direction="column" margin="3%">
      {Object.entries(mechanics).map(([title, value]) => (
        <Box>
          <Typography variant="h4">{title}</Typography>
          <Paper sx={{ p: 2, m: 2 }}>{RenderJsonRecursive({ instance: value })}</Paper>
        </Box>
      ))}
    </Stack>
  );
}
