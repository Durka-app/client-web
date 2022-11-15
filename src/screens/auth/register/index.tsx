import {
  Box, Button, Card, CardContent, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography
} from '@mui/material';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { when } from '../../../utils/when';
import { LoadingScreen } from '../../loading';
import { Link } from 'react-router-dom';
import { useScreenStack } from '../../../App';

enum RegisterState {
  Idle,
  InProgress
}

export const RegisterScreen = () => {
  const screens = useScreenStack();

  const emailElement = useRef<HTMLElement>(null);
  const usernameElement = useRef<HTMLElement>(null);
  const passwordElement = useRef<HTMLElement>(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(RegisterState.Idle);

  const onLogin = useCallback(async () => {
    setState(RegisterState.InProgress);
    setTimeout(() => {
      setState(RegisterState.Idle);
      screens.pop();
    }, 5000);

    screens.push(<LoadingScreen />);
  }, [email, username, password, state, screens]);

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onEmailKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      usernameElement.current!.focus();
    }
  }, []);

  const onUsernameKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      passwordElement.current!.focus();
    }
  }, []);

  const onPasswordKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      void onLogin();
    }
  }, [onLogin]);

  return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
    <Card component={'form'} sx={{ width: '24em' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant={'h5'} sx={{ textAlign: 'center' }}>
          Register
        </Typography>

        <TextField variant={'standard'}
                   type={'email'}
                   inputRef={emailElement}
                   sx={{ width: '100%', my: 1 }}
                   label={'Email'}
                   value={email}
                   onChange={onEmailChange}
                   onKeyDown={onEmailKey} />
        <TextField variant={'standard'}
                   type={'text'}
                   inputRef={usernameElement}
                   sx={{ width: '100%', my: 1 }}
                   label={'Username'}
                   value={username}
                   onChange={onUsernameChange}
                   onKeyDown={onUsernameKey} />
        <TextField variant={'standard'}
                   type={'password'}
                   inputRef={passwordElement}
                   sx={{ width: '100%', my: 1 }}
                   label={'Password'}
                   value={password}
                   onChange={onPasswordChange}
                   onKeyDown={onPasswordKey} />

        <FormControlLabel control={<Checkbox />}
                          label='I agree to pay $5k'
                          sx={{ my: 1 }} />

        <Divider />

        <Button variant={'contained'}
                sx={{ width: '100%', my: 1, py: state === RegisterState.InProgress ? 0 : null }}
                onClick={onLogin}
                disabled={state !== RegisterState.Idle}>
          {when(state, [
            [RegisterState.Idle, () => <>Register</>],
            [RegisterState.InProgress, () => <CircularProgress sx={{ my: 1 }} size={20.5} />]
          ], () => null)}
        </Button>

        <Box sx={{ display: 'flex', width: '100%' }}>
          <Button variant={'text'}
                  sx={{ flexGrow: 1 }}
                  component={Link}
                  to={'/login'}
                  disabled={state !== RegisterState.Idle}>
            Already registered?
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>;
};
