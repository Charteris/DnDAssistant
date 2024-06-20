import React, { FC, useCallback, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import MonsterTable from '../monsters/monster-table';
import { GridRowParams } from '@mui/x-data-grid';
import { Monster } from '../types/Monster';

const SelectMonster: FC<{
  onSelectMonster: (monsters: Monster[]) => void;
}> = ({ onSelectMonster }) => {
  const [open, setOpen] = useState(false);
  const [monstersToAdd, setMonstersToAdd] = useState<Monster[]>([]);

  const onSelect = useCallback(
    (params: GridRowParams) => setMonstersToAdd([...monstersToAdd, params.row]),
    [monstersToAdd, setMonstersToAdd]
  );

  const onRemoveMonster = useCallback(
    (index: number) => setMonstersToAdd(
      monstersToAdd.filter((_monster, monsterIndex) => index !== monsterIndex)
    ),
    [monstersToAdd, setMonstersToAdd]
  );

  const onSubmit = useCallback(
    () => {
      onSelectMonster(monstersToAdd);
      setMonstersToAdd([]);
      setOpen(false);
    },
    [monstersToAdd, onSelectMonster, setMonstersToAdd, setOpen]
  );

  return (
    <>
      <IconButton color="success" onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Select Monsters</DialogTitle>
        <DialogContent>
          <Container maxWidth="xl">
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="top"
            >
              <Card sx={{ width: '40%' }}>
                <CardContent>
                  <Typography variant="h5">Selected Monsters</Typography>
                  <Stack direction="column" justifyContent="center">
                    {monstersToAdd.map((monster, index) => (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconButton color="error" onClick={() => onRemoveMonster(index)}>
                          <Remove />
                        </IconButton>
                        <Typography variant="subtitle1">{`${monster.name} - ${monster.Challenge}`}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <MonsterTable
                onRowClick={onSelect}
                props={{
                  initialState: {
                    pagination: {
                      paginationModel: { pageSize: 10 },
                    },
                  },
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="right">
              <Button variant="outlined" onClick={onSubmit} disabled={monstersToAdd.length === 0}>
                Add Monster(s)
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
            </Stack>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectMonster;
