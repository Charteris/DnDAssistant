import { Container, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Vendor() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Vendor</Typography>
      </Stack>
      <Divider orientation="horizontal" sx={{ mb: '1%', mt: '0.5%' }} />
      <Paper sx={{ p: 3 }}>
        <Stack direction="column">
        </Stack>
      </Paper>
    </Container>
  );
}