import React, { FC, useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { defaultMonster } from '../types/Monster';

const MonsterEditor: FC<{ onUpdateGear: (jsonInput: string) => void }> = ({ onUpdateGear }) => {
  const [newMonster, setNewMonster] = useState(defaultMonster);

  const onUpdateGearFormatted = useCallback(() => {
    onUpdateGear(
      JSON.stringify(newMonster, null, "\t")
        .replaceAll("],\n\t\"", "],\n\n\t\"")
    )
  }, [newMonster]);

  useEffect(onUpdateGearFormatted, [onUpdateGearFormatted]);

  return (
    <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center">
    </Stack>
  )
}

export default MonsterEditor;
