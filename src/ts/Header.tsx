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
  Menu,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Page, pages } from './pages';

const PageMenu: FC<{ pages: Page[] }> = ({ pages }) => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLLIElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const navigate = useNavigate();

  const onButtonClick = (path: string | Page[], index: number, event: React.MouseEvent<HTMLLIElement>) => {
    if (typeof path === 'string') {
      navigate(path);
    } else {
      setAnchorElement(event.currentTarget);
      setActiveIndex(index);
    }
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <span>
            <MenuItem
              onClick={(event) => onButtonClick(page.path, index, event)}
              sx={{ py: '6px', px: '12px' }}
              key={page.label}
            >
              <Typography variant="body2" color="info">
                {page.name}
              </Typography>
            </MenuItem>
            {Array.isArray(page.path) && (
              <Menu
                anchorEl={anchorElement}
                open={index === activeIndex}
                onClose={() => { setAnchorElement(null); setActiveIndex(-1); }}
              >
                {page.path.map((subPage) => (
                  <MenuItem onClick={() => (typeof subPage.path === 'string') && navigate(subPage.path)}>
                    {subPage.name}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </span>
        )
      })}
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
