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

type InstanceType = object | string | object[] | string[];

const RenderTable: FC<{ [key: string]: string[] }> = (tableObject) => {
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

const RenderText: FC<{
  text: string;
}> = ({ text }) => {
  return (
    <td
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

const RenderArray: FC<{ array: string[] | object[]; depth: number }> = ({
  array,
  depth,
}) => {
  return (
    <Stack direction="column">
      {((array ?? []) as InstanceType[]).map((subInstance: InstanceType) =>
        RenderJsonRecursive({ instance: subInstance, depth: depth + 1 })
      )}
    </Stack>
  );
};

const RenderObject: FC<{ object: object; depth: number }> = ({
  object,
  depth,
}) => {
  return (
    <Stack direction="column" p={1}>
      {Object.entries(object).map(([title, value]) => {
        switch (title) {
          case 'table':
            return <RenderTable {...value} />;
          case 'content':
            return (
              <Stack direction="column">
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
};

const RenderJsonRecursive: FC<{
  instance: InstanceType;
  depth?: number;
}> = ({ instance, depth = 0 }) => {
  if (typeof instance === 'string') {
    return <RenderText text={instance} />;
  } else if (Array.isArray(instance)) {
    return <RenderArray array={instance} depth={depth} />;
  } else if (typeof instance === 'object') {
    return <RenderObject object={instance} depth={depth} />;
  } else {
    return <Typography>{`Unsupported type: ${typeof instance}`}</Typography>;
  }
};

export default RenderJsonRecursive;
