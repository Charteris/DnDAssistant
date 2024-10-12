import React, { FC, useCallback, useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { CLASSES, LEVELS, SCHOOLS, Spell, SpellComponent, defaultSpell } from '../types/Spell';

const getNumberingPostfix = (level: string): string => {
  switch (level) {
    case "1": return "1st-level";
    case "2": return "2nd-level";
    case "3": return "3rd-level";
    default: return `${level}th-level`;
  }
}

const SpellEditor: FC<{ onUpdateGear: (jsonInput: string) => void }> = ({ onUpdateGear }) => {
  const [newSpell, setNewSpell] = useState(defaultSpell);

  const onUpdateGearFormatted = useCallback(
    () => onUpdateGear(JSON.stringify(newSpell, null, "\t")),
    [newSpell]
  );

  const getNewComponents = useCallback((overrides: Partial<SpellComponent>): SpellComponent => {
    const components = { ...newSpell.components, ...overrides };
    const rawComponents = [];
    if (components.material) { rawComponents.push('M'); }
    if (components.somatic) { rawComponents.push('S'); }
    if (components.verbal) { rawComponents.push('V'); }
    const rawMaterialsNeeded = components.materials_needed.length > 0
      ? ` (${components.materials_needed.join(', ')})`
      : '';
    components.raw = rawComponents.join(', ') + rawMaterialsNeeded;
    return components
  }, [newSpell]);

  const getTagsAndType = useCallback((overrides: Partial<Spell>): Spell => {
    const spell = { ...newSpell, ...overrides };
    const isCantrip = spell.level === 'cantrip'

    spell.tags = [
      ...spell.classes,
      (isCantrip ? spell.level : `level${spell.level}`)
    ];

    spell.type = isCantrip
      ? `${spell.school[0].toUpperCase() + spell.school.slice(1)} ${spell.level}`
      : `${getNumberingPostfix(spell.level)} ${spell.school}`
    if (spell.ritual) spell.type += ' (ritual)';

    return spell;
  }, [newSpell]);

  useEffect(onUpdateGearFormatted, [onUpdateGearFormatted]);

  return (
    <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center">
      <TextField
        fullWidth
        value={newSpell.name}
        onChange={(event) => setNewSpell({ ...newSpell, name: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Name"
      />
      <TextField
        fullWidth
        value={newSpell.casting_time}
        onChange={(event) => setNewSpell({ ...newSpell, casting_time: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Casting Time"
      />
      <Autocomplete
        fullWidth
        multiple
        value={newSpell.classes}
        onChange={(_event, classes) => { console.log(classes); return classes !== null && setNewSpell(getTagsAndType({ classes })) }}
        onBlur={onUpdateGearFormatted}
        options={Object.values(CLASSES)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (<TextField {...params} label="Classes" />)}
      />
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Typography>Components:</Typography>
        <Stack spacing={1} direction="column" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox
                checked={newSpell.components.material}
                onChange={(event) => setNewSpell({
                  ...newSpell,
                  components: getNewComponents({ material: event.target.checked })
                })}
                name="material"
              />}
              label="Material"
            />
            <FormControlLabel
              control={<Checkbox
                checked={newSpell.components.somatic}
                onChange={(event) => setNewSpell({
                  ...newSpell,
                  components: getNewComponents({ somatic: event.target.checked })
                })}
                name="somatic"
              />}
              label="Somatic"
            />
            <FormControlLabel
              control={<Checkbox
                checked={newSpell.components.verbal}
                onChange={(event) => setNewSpell({
                  ...newSpell,
                  components: getNewComponents({ verbal: event.target.checked })
                })}
                name="verbal"
              />}
              label="Verbal"
            />
          </Stack>
          <Autocomplete
            fullWidth
            multiple
            freeSolo
            value={newSpell.components.materials_needed}
            onChange={(_event, materials_needed) => setNewSpell({
              ...newSpell,
              components: getNewComponents({ materials_needed })
            })}
            onBlur={onUpdateGearFormatted}
            options={[]}
            renderInput={(params) => (<TextField {...params} label="Materials Needed" />)}
            sx={{ flexGrow: 1, flexDirection: 'column' }}
          />
        </Stack>
      </Stack>
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1} direction="column" justifyContent="space-between" alignItems="center">
          <Autocomplete
            fullWidth
            value={newSpell.school}
            onChange={(_event, school) => school !== null && setNewSpell(getTagsAndType({ school }))}
            onBlur={onUpdateGearFormatted}
            options={Object.values(SCHOOLS)}
            renderInput={(params) => (<TextField {...params} label="School" />)}
            sx={{ flexGrow: 1, flexDirection: 'column' }}
          />
          <TextField
            fullWidth
            value={newSpell.range}
            onChange={(event) => setNewSpell({ ...newSpell, range: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Range"
          />
        </Stack>
        <Stack spacing={1} direction="column" justifyContent="space-between" alignItems="center">
          <Autocomplete
            fullWidth
            value={newSpell.level}
            onChange={(_event, level) => level !== null && setNewSpell(getTagsAndType({ level }))}
            onBlur={onUpdateGearFormatted}
            options={Object.values(LEVELS)}
            renderInput={(params) => (<TextField {...params} label="Level" />)}
          />
          <TextField
            fullWidth
            value={newSpell.duration}
            onChange={(event) => setNewSpell({ ...newSpell, duration: event.target.value })}
            onBlur={onUpdateGearFormatted}
            label="Duration"
          />
        </Stack>
        <FormControlLabel
          control={<Checkbox
            checked={newSpell.ritual}
            onChange={(event) => setNewSpell(getTagsAndType({ ritual: event.target.checked }))}
            name="ritual"
          />}
          label="Ritual Spell"
        />
      </Stack>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={newSpell.description}
        onChange={(event) => setNewSpell({ ...newSpell, description: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Description"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        value={newSpell.higher_levels}
        onChange={(event) => setNewSpell({ ...newSpell, higher_levels: event.target.value })}
        onBlur={onUpdateGearFormatted}
        label="Higher Levels"
      />
    </Stack>
  )
}

export default SpellEditor;
