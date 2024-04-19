/**
 * Main application for executing the website
 * @author Lachlan Charteris
 */

import React, { FC } from 'react';
import {
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Page, pages } from './pages';

const PageMenu: FC<{ pages: Page[] }> = ({ pages }) => {
  const navigate = useNavigate();

  return (
    <>
      {pages.map((page) =>
        typeof page.path === 'string' ? (
          <MenuItem
            onClick={() => typeof page.path === 'string' && navigate(page.path)}
            sx={{ py: '6px', px: '12px' }}
            key={page.label}
          >
            <Typography variant="body2" color="info">
              {page.name}
            </Typography>
          </MenuItem>
        ) : (
          <PageMenu pages={page.path} />
        )
      )}
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={{ justifyContent: 'center' }}>
      <AppBar position="sticky" sx={{ mb: 3 }}>
        <Toolbar>
          <Button onClick={() => navigate('')}>
            <Typography variant="h4">DnD Assistant</Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <PageMenu pages={pages} />
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Header;
