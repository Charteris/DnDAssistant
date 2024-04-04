import React from 'react';
import { Container, Typography } from '@mui/material';
import monsters from '../../res/srd_5e_monsters.json';
import { useNavigate, useParams } from 'react-router-dom';
import MonsterCard from './monster-card';
import PageIterator from '../shared/page-iterator';

export default function MonsterView() {
  const navigate = useNavigate();
  const { name } = useParams();
  const monsterIndex = monsters.findIndex((monster) => monster.name === name);
  const selectedMonster = monsters[monsterIndex];

  return selectedMonster === undefined ? (
    <Typography variant="h5">
      {`Cannot find monster with name "${name}"`}
    </Typography>
  ) : (
    <Container sx={{ justifyContent: 'center', alignContent: 'center' }}>
      <PageIterator
        page={monsterIndex}
        maxLength={monsters.length}
        pageSetter={(newPage: number) =>
          navigate(`/monsters/${monsters[newPage].name}`)
        }
      />
      <MonsterCard monster={selectedMonster} />
    </Container>
  );
}
