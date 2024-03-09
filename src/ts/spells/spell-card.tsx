import React, { FC } from 'react';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Spell } from '../types/Spell';

const SpellCard: FC<{ spell: Spell }> = ({ spell }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="column">
          <Typography variant="h4">{spell.name}</Typography>
          <Typography variant="subtitle1">{spell.type}</Typography>
          <Divider
            orientation="horizontal"
            sx={{ marginTop: 1, marginBottom: 2 }}
          />
          <Container sx={{ marginBottom: 2 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="left"
              width="45%"
              height="100%"
            >
              <Typography variant="subtitle1">{`Casting Time: ${spell.casting_time}`}</Typography>
              <Typography variant="subtitle1">{`Casting Duration: ${spell.duration}`}</Typography>
              <Typography variant="subtitle1">{`Range: ${spell.range}`}</Typography>
              <Typography variant="subtitle1">{`Components: ${spell.components.raw}`}</Typography>
              <Typography variant="subtitle1">{`Classes: ${spell.classes.join(', ')}`}</Typography>
            </Stack>
          </Container>
          <Container>
            <Divider orientation="horizontal" sx={{ margin: 1 }} />
            <Typography variant="h5">Description</Typography>
            <Typography variant="subtitle1">{spell.description}</Typography>
          </Container>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SpellCard;
