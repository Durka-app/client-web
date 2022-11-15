import { useTheme } from '@mui/material';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Dispatch, FunctionComponent, ReactElement, ReducerState, useContext } from 'react';

import './App.css';
import { ScreenStack, ScreenStackContext } from './screens/stack';
import { LoginScreen } from './screens/auth/login';
import { RegisterScreen } from './screens/auth/register';
import { ChatScreen } from './screens/chat';

export type State = { element: ReactElement; visible: boolean; }[];
export type Action =
  | { type: 'push', screen: ReactElement }
  | { type: 'activate' }
  | { type: 'pop' }
  | { type: 'delete' };

export function useScreenStack() {
  const stack = useContext(ScreenStackContext);
  if(!stack) throw new Error('Missing screen stack context');

  const [screens, dispatch] = stack;

  return {
    push: (element: ReactElement) => {
      dispatch({ type: 'push', screen: element });
    },
    pop: () => {
      dispatch({ type: 'pop' });
    }
  };
}

export const App: FunctionComponent = () => {
  const theme = useTheme();

  const reducer: [ReducerState<(state: State, action: Action) => State>, Dispatch<Action>] = useImmerReducer((
    state,
    action
  ) => {
    switch(action.type) {
      case 'push':
        return void state.push({ element: action.screen, visible: false });
      case 'activate':
        return void (state[state.length - 1].visible = true);
      case 'pop':
        return void (state[state.length - 1].visible = false);
      case 'delete':
        return void state.pop();
    }
  }, [] as State);

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
