import React, { FC } from 'react';
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

const PageIterator: FC<{
  page: number;
  maxLength: number;
  pageSetter: (newPage: number) => void;
}> = ({ page, maxLength, pageSetter }) => {
  const iteratePage = (pageSkip: number) => {
    let newPage = page + pageSkip;
    if (newPage < 0) newPage = maxLength - 1;
    if (newPage >= maxLength) newPage = 0;
    pageSetter(newPage);
  };

  return (
    <Stack
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton disabled={maxLength <= 1} onClick={() => iteratePage(-1)}>
        <ArrowCircleLeftOutlined />
      </IconButton>
      <Typography>{`Page ${page + 1} of ${maxLength}`}</Typography>
      <IconButton disabled={maxLength <= 1} onClick={() => iteratePage(1)}>
        <ArrowCircleRightOutlined />
      </IconButton>
    </Stack>
  );
};

export default PageIterator;
