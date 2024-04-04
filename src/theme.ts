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
});

export default theme;
