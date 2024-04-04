import React from 'react';
import { styled, Accordion, AccordionProps } from '@mui/material';

export const CustomAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
  boxShadow: 'none', // this styles directly apply to accordion
  border: `0px`,
  '.MuiAccordionDetails-root': {},
  '.MuiAccordionSummary-root': {}, // this apply to Summary
}));
