/**
 * Provides the theme for the particular website
 * @author Lachlan Charteris
 */

import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontSize: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
        },
      },
    },
  },
});

export default theme;
