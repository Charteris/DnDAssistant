import React, { useCallback } from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
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
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IconButton onClick={() => iteratePage(-1)}>
          <ArrowCircleLeftOutlined />
        </IconButton>
        <Typography>{`Page ${monsterIndex + 1}`}</Typography>
        <IconButton onClick={() => iteratePage(1)}>
          <ArrowCircleRightOutlined />
        </IconButton>
      </Stack>
      <MonsterCard monster={selectedMonster} />
    </Container>
  );
}
