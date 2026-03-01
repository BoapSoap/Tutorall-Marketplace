/*
Providers for main application. Gives access to:

- Theme from Mui
- QueryClient from react-query
- Toast from react-toastify
- Custom Contexts within App

- Matthew A. Davis
*/
import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import baseTheme from './common/theme/colorThemes';

import { AnalyticsProvider } from "@keiko-app/react-google-analytics";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AuthProvider from "./common/providers/authContext";
import QueryContextProvider from "./common/providers/queryContext";
import LocalStoreProvider from "./common/providers/localStore";

const analyticsConfig = {
  measurementId: "G-9WH56DMFXV"
};
const queryClient = new QueryClient();

const AppProviders = props => {
  return (
    <AnalyticsProvider config={analyticsConfig}>
      <ThemeProvider theme={baseTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <QueryContextProvider>
              <LocalStoreProvider>
                <ToastContainer theme="colored"/>
                {props.children}
              </LocalStoreProvider>
            </QueryContextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  )
};

export default AppProviders;
