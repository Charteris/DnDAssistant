import React, { FC, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Add, Close } from '@mui/icons-material';
import MonsterEditor from './monster-editor';

const CreateMonster: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMonsterJSON, setNewMonsterJSON] = useState("");

  return (
    <Box>
      <Button variant="outlined" startIcon={<Add />} onClick={() => setIsOpen(true)}>Create Monster</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Create Monster</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Card sx={{ flex: 1, flexGrow: 1, maxWidth: "lg" }}>
            <CardContent>
              <Stack spacing={2} direction="row" justifyContent="space-between" useFlexGap maxWidth="auto">
                <Box flexGrow={1}>
                  <MonsterEditor onUpdateGear={setNewMonsterJSON} />
                </Box>
                <Stack spacing={2} direction="column" justifyContent="space-between" flexGrow={1}>
                  <Alert severity="info">Please provide generated JSON to developers for review</Alert>
                  <TextField
                    fullWidth
                    value={newMonsterJSON}
                    disabled
                    inputProps={{ readOnly: true }}
                    multiline
                    sx={{ flex: 1, flexDirection: 'row' }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CreateMonster;