import React, { FC, useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import MonsterTable from '../monsters/monster-table';
import { GridRowParams } from '@mui/x-data-grid';
import { Monster } from '../types/Monster';

const SelectMonster: FC<{
  onSelectMonster: (monster: Monster) => void;
}> = ({ onSelectMonster }) => {
  const [open, setOpen] = useState(false);
  const onSelect = useCallback(
    (params: GridRowParams) => {
      setOpen(false);
      onSelectMonster(params.row);
    },
    [setOpen, onSelectMonster]
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
        <DialogTitle>Select Monster</DialogTitle>
        <DialogContent>
          <Container maxWidth="xl">
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
            <Stack direction="row" justifyContent="right">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </Stack>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectMonster;
