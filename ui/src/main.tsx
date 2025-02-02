import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import { AppContextProvider } from './context/AppContext';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*
      If you eject from MUI (which we don't recommend!), you should add
      the `dockerDesktopTheme` class to your root <html> element to get
      some minimal Docker theming.
    */}
    <DockerMuiThemeProvider>
      <CssBaseline />

      <AppContextProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppContextProvider>
    </DockerMuiThemeProvider>
  </React.StrictMode>
);
