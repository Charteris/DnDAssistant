import React, { useCallback } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from '@mui/icons-material';
import monsters from '../../res/srd_5e_monsters.json';
import { useNavigate, useParams } from 'react-router-dom';
import MonsterCard from './monster-card';

export default function MonsterView() {
  const navigate = useNavigate();
  const { name } = useParams();
  const monsterIndex = monsters.findIndex((monster) => monster.name === name);
  const selectedMonster = monsters[monsterIndex];

  const iteratePage = useCallback(
    (pageSkip: number) => {
      let newIndex = monsterIndex + pageSkip;
      if (newIndex < 0) newIndex = monsters.length - 1;
      if (newIndex >= monsters.length) newIndex = 0;
      navigate(`/monsters/${monsters[newIndex].name}`);
    },
    [monsterIndex, monsters]
  );

  return selectedMonster === undefined ? (
    <Typography variant="h5">
      {`Cannot find monster with name "${name}"`}
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
      <MonsterCard monster={selectedMonster} />
    </Container>
  );
}
