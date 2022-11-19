import { useTheme } from '@mui/material';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Dispatch, FunctionComponent, ReactElement, ReducerState, useContext } from 'react';

import './App.css';
import { raise } from './utils/raise';
import { ChatScreen } from './screens/chat';
import { LoginScreen } from './screens/auth/login';
import { getOr, putOr, removeOr } from './utils/map';
import { RegisterScreen } from './screens/auth/register';
import { ScreenStack, ScreenStackContext } from './screens/stack';

export type ScreenState = {
  key: string;
  element: ReactElement;
  visible: boolean;
};
export type State = Record<string, ScreenState>;
export type Action =
  | { type: 'push', key: string, element: ReactElement }
  | { type: 'pop', key: string }
  /* Internal */
  | { type: 'show', key: string }
  | { type: 'delete', key: string };

export function useScreenStack() {
  const stack = useContext(ScreenStackContext);
  if(!stack) throw new Error('Missing screen stack context');

  const [screens, dispatch] = stack;

  return {
    push: (key: string, element: ReactElement) => {
      dispatch({ type: 'push', key: key, element: element });
    },
    pop: (key: string) => {
      dispatch({ type: 'pop', key: key });
    }
  };
}

export const App: FunctionComponent = () => {
  const theme = useTheme();

  const reducer: [
    ReducerState<(state: State, action: Action) => State>,
    Dispatch<Action>
  ] = useImmerReducer((state: State, action: Action) => {
    switch(action.type) {
      case 'push': {
        putOr(
          state,
          action.key,
          { key: action.key, element: action.element, visible: false },
          raise(() => new Error(`Screen ${action.key} is already present in the stack`))
        );
        break;
      }

      case 'show': {
        const screen = getOr(
          state,
          action.key,
          raise(() => new Error(`Screen ${action.key} is not present in the stack`))
        );
        screen.visible = true;
        break;
      }

      case 'pop': {
        const screen = getOr(
          state,
          action.key,
          raise(() => new Error(`Screen ${action.key} is not present in the stack`))
        );
        screen.visible = false;
        break;
      }

      case 'delete': {
        removeOr(
          state,
          action.key,
          raise(() => new Error(`Screen ${action.key} is not present in the stack`))
        );
      }
    }
  }, {});

  return <div className='App'>
    {/* <img style={{ */}
    {/*   position: 'fixed', */}
    {/*   width: '100%', */}
    {/*   height: '100%', */}
    {/*   zIndex: -1, */}
    {/*   objectFit: 'cover', */}
    {/*   filter: 'brightness(1)' */}
    {/* }} */}
    {/*   src={'https://web.archive.org/web/20130321104025if_/http://tankionline.com/en/start/i2/images/bg-paint.jpg'} /> */}
    <BrowserRouter>
      <ScreenStackContext.Provider value={reducer}>
        <ScreenStack>
          <Routes>
            <Route path={'/'} element={<h1>IQ loss</h1>} />,
            <Route path={'login'} element={<LoginScreen />} />
            <Route path={'register'} element={<RegisterScreen />} />
            <Route path={'/channels/:guild/:channel'} element={<ChatScreen />} />
          </Routes>

          {/* <RouterProvider router={router} /> */}

          {/* <LoginScreen /> */}
          {/* <LoadingScreen /> */}
        </ScreenStack>
      </ScreenStackContext.Provider>
    </BrowserRouter>
  </div>;
};
