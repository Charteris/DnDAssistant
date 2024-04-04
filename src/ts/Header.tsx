/**
 * Main application for executing the website
 * @author Lachlan Charteris
 */

import React from 'react';
import {
  Typography,
  Container,
  Toolbar,
  AppBar,
  Stack,
  Divider,
  MenuItem,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { pages } from './pages';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={{ justifyContent: 'center' }}>
      <AppBar position="sticky" sx={{ marginBottom: '2%' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignItems: 'center' }}>
            <Typography variant="h4">DnD Assistant</Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              marginLeft={5}
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              {pages.map((page) => (
                <MenuItem
                  onClick={() => navigate(page.path)}
                  sx={{ py: '6px', px: '12px' }}
                  key={page.label}
                >
                  <Typography variant="body2" color="info">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Header;
