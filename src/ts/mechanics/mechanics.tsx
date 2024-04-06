import React, { Component, FC, Suspense, lazy } from 'react';
import {
  Accordion,
  Box,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import mechanics from '../../res/rules/06 mechanics.json';
import combat from '../../res/rules/07 combat.json';
import races from '../../res/rules/01 races.json';
import classes from '../../res/rules/02 classes.json';
import conditions from '../../res/rules/12 conditions.json';
import other from '../../res/rules/09 running.json';
import RenderJsonRecursive from '../shared/render-json-recursive';

type UserGuide = {
  title: string;
  guides: object[];
};

export default function Mechanics() {
  const userGuides: UserGuide[] = [
    { title: 'Mechanics', guides: [mechanics, combat] },
    { title: 'Characters', guides: [races, classes] },
    { title: 'Other', guides: [conditions, other] },
  ];

  return (
    <Stack direction="column" margin="3%">
      <Typography variant="h4">User Guides</Typography>
      {userGuides.map(({ title, guides }) => (
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Paper sx={{ p: 1, m: 1 }}>
            {guides.map((guide) => RenderJsonRecursive({ instance: guide }))}
          </Paper>
        </Box>
      ))}
    </Stack>
  );
}
