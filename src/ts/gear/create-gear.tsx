import React, { FC, useCallback, useState } from 'react';
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
import GearEditor from './gear-editor';
import WeaponEditor from './weapon-editor';
import ArmourEditor from './armour-editor';

enum GEAR_TYPE {
  ARMOUR = 'Armour',
  WEAPON = 'Weapon',
  GEAR = 'Gear'
}

const CreateGear: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gearType, setGearType] = useState(GEAR_TYPE.GEAR);
  const [newGearJSON, setNewGearJSON] = useState("");

  const renderGearEditor = useCallback(() => {
    switch (gearType) {
      case GEAR_TYPE.WEAPON: return <WeaponEditor onUpdateGear={setNewGearJSON} />;
      case GEAR_TYPE.ARMOUR: return <ArmourEditor onUpdateGear={setNewGearJSON} />;
      default: return <GearEditor onUpdateGear={setNewGearJSON} />;
    }
  }, [gearType]);

  return (
    <Box>
      <Button variant="outlined" startIcon={<Add />} onClick={() => setIsOpen(true)}>Create Gear</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Create Gear</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Card sx={{ flex: 1, flexGrow: 1, maxWidth: "lg" }}>
            <CardContent>
              <Stack spacing={2} direction="row" justifyContent="space-between" useFlexGap maxWidth="auto">
                <Stack spacing={2} direction="column" justifyContent="space-between" flexGrow={1}>
                  <Autocomplete
                    fullWidth
                    value={gearType}
                    onChange={(_event, newValue) => newValue !== null && setGearType(newValue)}
                    options={Object.values(GEAR_TYPE)}
                    renderInput={(params) => (<TextField {...params} label="Gear Type" />)}
                  />
                  {renderGearEditor()}
                </Stack>
                <Stack spacing={2} direction="column" justifyContent="space-between" flexGrow={1}>
                  <Alert severity="info">Please provide generated JSON to developers for review</Alert>
                  <TextField
                    fullWidth
                    value={newGearJSON}
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

export default CreateGear;