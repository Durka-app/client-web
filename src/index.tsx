import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, darkScrollbar, ThemeProvider } from '@mui/material';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { App } from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import '@fontsource/open-sans';
import './index.css';
import { ChatScreen } from './screens/chat';
import { LoginScreen } from './screens/auth/login';
import { RegisterScreen } from './screens/auth/register';

const container = document.getElementById('root')!;
const root = createRoot(container);

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={'/'} element={<h1>IQ loss</h1>} />,
    <Route path={'login'} element={<LoginScreen />} />
    <Route path={'register'} element={<RegisterScreen />} />
    <Route path={'/channels/:guild/:channel'} element={<ChatScreen />} />
  </>
));

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#5865f2' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      }
    }
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Open Sans', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    button: {
      textTransform: 'none'
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
