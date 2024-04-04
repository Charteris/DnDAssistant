import React from 'react';
import { Container, Typography } from '@mui/material';
import spells from '../../res/srd_5e_spells.json';
import { useNavigate, useParams } from 'react-router-dom';
import SpellCard from './spell-card';
import PageIterator from '../shared/page-iterator';

export default function SpellView() {
  const navigate = useNavigate();
  const { name } = useParams();
  const spellIndex = spells.findIndex((spell) => spell.name === name);
  const selectedSpell = spells[spellIndex];

  return selectedSpell === undefined ? (
    <Typography variant="h5">
      {`Cannot find spell with name "${name}"`}
    </Typography>
  ) : (
    <Container sx={{ justifyContent: 'center', alignContent: 'center' }}>
      <PageIterator page={spellIndex} maxLength={spells.length} pageSetter={(newPage) => navigate(`/spells/${spells[newPage].name}`)} />
      <SpellCard spell={selectedSpell} />
    </Container>
  );
}
