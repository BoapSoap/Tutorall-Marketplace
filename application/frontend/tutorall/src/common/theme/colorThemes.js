/*
Themes for MUI.

NO DARK MODE FOR NOW

- Matthew A. Davis
*/

import React from "react";
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#fbc02d',
    },
    warning: {
      main: '#e91e63',
    },
    divider: '#fbc02d',
  },
})

export default baseTheme;
