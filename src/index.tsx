/**
 * Main application for executing the website
 * @author Lachlan Charteris
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MonsterTable from './ts/MonsterTable';
import Header from './ts/Header';
import MonsterView from './ts/MonsterView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '', // 'monsters',
        element: <MonsterTable />,
      },
      {
        path: '/:name',
        element: <MonsterView />,
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
