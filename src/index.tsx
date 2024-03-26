/**
 * Main application for executing the website
 * @author Lachlan Charteris
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MonsterTable from './ts/monsters/monster-table';
import Header from './ts/header';
import MonsterView from './ts/monsters/monster-view';
import EncounterGenerate from './ts/encounters/encounter-generator';
import Mechanics from './ts/mechanics/mechanics';
import SpellTable from './ts/spells/spell-table';
import SpellView from './ts/spells/spell-view';
import Shop from './ts/shop/shop';

const router = createHashRouter([
  {
    path: '/*',
    element: <Header />,
    children: [
      {
        path: '',
        element: <Mechanics />,
      },
      {
        path: 'monsters',
        element: <MonsterTable />,
      },
      {
        path: 'monsters/:name',
        element: <MonsterView />,
      },
      {
        path: 'encounter',
        element: <EncounterGenerate />,
      },
      {
        path: 'spells',
        element: <SpellTable />,
      },
      {
        path: 'spells/:name',
        element: <SpellView />,
      },
      {
        path: 'gear',
        element: <Shop />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Box
      // style={{
      //   minHeight: '100vh',
      //   backgroundImage: `url(${Background})`,
      //   backgroundSize: '100vw 40vw',
      //   backgroundRepeat: 'repeat-y',
      // }}
      >
        <CssBaseline />
        <RouterProvider router={router} />
      </Box>
    </React.StrictMode>
  </ThemeProvider>
);
