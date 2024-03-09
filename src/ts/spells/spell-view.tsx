import React, { useCallback } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from '@mui/icons-material';
import spells from '../../res/srd_5e_spells.json';
import { useNavigate, useParams } from 'react-router-dom';
import SpellCard from './spell-card';

export default function SpellView() {
  const navigate = useNavigate();
  const { name } = useParams();
  const spellIndex = spells.findIndex((spell) => spell.name === name);
  const selectedSpell = spells[spellIndex];

  const iteratePage = useCallback(
    (pageSkip: number) => {
      let newIndex = spellIndex + pageSkip;
      if (newIndex < 0) newIndex = spells.length - 1;
      if (newIndex >= spells.length) newIndex = 0;
      navigate(`/spells/${spells[newIndex].name}`);
    },
    [spellIndex, spells]
  );

  return selectedSpell === undefined ? (
    <Typography variant="h5">
      {`Cannot find spell with name "${name}"`}
    </Typography>
  ) : (
    <Container sx={{ justifyContent: 'center', alignContent: 'center' }}>
      <Box justifyContent="space-between" alignItems="center">
        <IconButton onClick={() => iteratePage(-1)}>
          <ArrowCircleLeftOutlined />
        </IconButton>
        <IconButton onClick={() => iteratePage(1)}>
          <ArrowCircleRightOutlined />
        </IconButton>
      </Box>
      <SpellCard spell={selectedSpell} />
    </Container>
  );
}
