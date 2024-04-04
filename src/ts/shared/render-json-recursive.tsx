import React, { FC } from 'react';
import {
  Paper,
  Stack,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ArrowDropDown } from '@mui/icons-material';
import { CustomAccordion } from '../shared/custom-styles';

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
  return (
    <Paper>
      <DataGrid rows={values} columns={columnDescriptor} hideFooter />
    </Paper>
  );
};

const RenderJsonRecursive: FC<{
  instance: object | string | object[] | string[];
  depth?: number;
}> = ({ instance, depth = 0 }) => {
  if (typeof instance === 'string') {
    return (
      <td
        dangerouslySetInnerHTML={{
          __html: instance,
        }}
      />
    );
  } else if (Array.isArray(instance)) {
    return (
      <Stack direction="column">
        {(instance ?? []).map((subInstance) =>
          RenderJsonRecursive({ instance: subInstance, depth: depth + 1 })
        )}
      </Stack>
    );
  } else if (typeof instance === 'object') {
    return (
      <Stack direction="column" m={1} p={1}>
        {Object.entries(instance).map(([title, value]) => {
          switch (title) {
            case 'table':
              return renderTable(value);
            case 'content':
              return (
                <Stack direction="column" mb={2}>
                  {RenderJsonRecursive({ instance: value, depth: depth + 1 })}
                </Stack>
              );
            default:
              return (
                <CustomAccordion defaultExpanded={depth > 1}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="h5" p={1}>
                      {title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction="column" marginLeft={1}>
                      {RenderJsonRecursive({
                        instance: value,
                        depth: depth + 1,
                      })}
                    </Stack>
                  </AccordionDetails>
                </CustomAccordion>
              );
          }
        })}
      </Stack>
    );
  } else {
    return <Typography>{`Unsupported type: ${typeof instance}`}</Typography>;
  }
};

export default RenderJsonRecursive;
