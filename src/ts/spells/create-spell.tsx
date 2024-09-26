import React, { FC, useState } from 'react';
import {
  Alert,
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
import SpellEditor from './spell-editor';

const CreateSpell: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSpellJSON, setNewSpellJSON] = useState("");

  return (
    <Box>
      <Button variant="outlined" startIcon={<Add />} onClick={() => setIsOpen(true)}>Create Spell</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Create Spell</Typography>
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
                  <SpellEditor onUpdateGear={setNewSpellJSON} />
                </Box>
                <Stack spacing={2} direction="column" justifyContent="space-between" flexGrow={1}>
                  <Alert severity="info">Please provide generated JSON to developers for review</Alert>
                  <TextField
                    fullWidth
                    value={newSpellJSON}
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

export default CreateSpell;