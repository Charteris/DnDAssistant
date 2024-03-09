import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import mechanics from '../../res/rules/06 mechanics.json';
import { DataGrid } from '@mui/x-data-grid';

const renderTable: FC<{ [key: string]: string[] }> = (tableObject) => {
  const objectEntries = Object.entries(tableObject);
  const values = Object.values(tableObject)[0].map((_value, index) => {
    const valueObject: { [key: string]: string } = { id: `${index}` };
    objectEntries.forEach(([key, array]) => {
      valueObject[key] = array[index];
    });
    return valueObject;
  });
  const columnDescriptor = Object.keys(tableObject).map((title) => ({
    field: title,
    flex: 1,
    sortable: true,
    filterable: true,
  }));
  console.log(tableObject, values, columnDescriptor);
  return <DataGrid rows={values} columns={columnDescriptor} hideFooter />;
};

const displayObject: FC<object | string | object[] | string[]> = (instance) => {
  if (typeof instance === 'string') {
    return (
      <Typography variant="subtitle1" marginLeft={1}>
        {instance}
      </Typography>
    );
  } else if (Array.isArray(instance)) {
    return (
      <Stack direction="column" marginLeft={1}>
        {(instance ?? []).map((subInstance) => displayObject(subInstance))}
      </Stack>
    );
  } else if (typeof instance === 'object') {
    return (
      <Stack direction="column" marginLeft={1}>
        {Object.entries(instance).map(([title, value]) =>
          title === 'table' ? (
            renderTable(value)
          ) : (
            <Stack direction="column" marginLeft={1}>
              {title !== 'content' && (
                <Typography variant="h5" margin={1}>
                  {title}
                </Typography>
              )}
              {displayObject(value)}
            </Stack>
          )
        )}
      </Stack>
    );
  } else {
    console.log('Unsupported type', instance);
    return <Typography>Error</Typography>;
  }
};

export default function Mechanics() {
  return (
    <Stack direction="column" margin="3%">
      {Object.entries(mechanics).map(([title, value]) => (
        <Box>
          <Typography variant="h5">{title}</Typography>
          {displayObject(value)}
        </Box>
      ))}
    </Stack>
  );
}
