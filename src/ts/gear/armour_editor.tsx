import React, { FC, useCallback, useEffect, useState } from 'react';
import { defaultArmour } from '../types/Gear';
import { Stack, TextField } from '@mui/material';

const ArmourEditor: FC<{ onUpdateGear: (jsonInput: string) => void }> = ({ onUpdateGear }) => {
  const [newArmour, setNewArmour] = useState(defaultArmour);

  const onUpdateGearFormatted = useCallback(() => {
    onUpdateGear(
      JSON.stringify(newArmour, null, "\t")
        .replaceAll("],\n\t\"", "],\n\n\t\"")
    )
  }, [newArmour]);

  useEffect(onUpdateGearFormatted, [onUpdateGearFormatted]);

  return (
    <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center">
      <TextField
        fullWidth
        value={newArmour.name}
        onChange={(event) => setNewArmour({ ...newArmour, name: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Name"
      />
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1} direction="column" justifyContent="space-between">
          <TextField
            fullWidth
            value={newArmour.AC}
            onChange={(event) => setNewArmour({ ...newArmour, AC: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="AC"
          />
          <TextField
            fullWidth
            value={newArmour.type}
            onChange={(event) => setNewArmour({ ...newArmour, type: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Type"
          />
        </Stack>
        <Stack spacing={1} direction="column" justifyContent="space-between">
          <TextField
            fullWidth
            value={newArmour.strength}
            onChange={(event) => setNewArmour({ ...newArmour, strength: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Strength"
          />
          <TextField
            fullWidth
            value={newArmour.stealth}
            onChange={(event) => setNewArmour({ ...newArmour, stealth: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Stealth"
          />
        </Stack>
        <Stack spacing={1} direction="column" justifyContent="space-between">
          <TextField
            fullWidth
            value={newArmour.cost}
            onChange={(event) => setNewArmour({ ...newArmour, cost: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Cost"
          />
          <TextField
            fullWidth
            value={newArmour.weight}
            onChange={(event) => setNewArmour({ ...newArmour, weight: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Weight"
          />
        </Stack>
      </Stack>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={newArmour.description}
        onChange={(event) => setNewArmour({ ...newArmour, description: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Description"
      />
    </Stack>
  )
}

export default ArmourEditor;
