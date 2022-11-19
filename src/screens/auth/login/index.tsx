import { Box, Button, Card, CardContent, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { when } from '../../../utils/when';
import { LoadingScreen } from '../../loading';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useScreenStack } from '../../../App';

enum LoginState {
  Idle,
  InProgress
}

export const LoginScreen = () => {
  const screens = useScreenStack();
  const navigate = useNavigate();

  const emailElement = useRef<HTMLElement>(null);
  const passwordElement = useRef<HTMLElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(LoginState.Idle);

  const onLogin = useCallback(async () => {
    setState(LoginState.InProgress);

    setTimeout(() => {
      navigate('/channels/1/2');
    }, 3000);

    setTimeout(() => {
      setState(LoginState.Idle);
      screens.pop('loading');
    }, 5000);

    screens.push('loading', <LoadingScreen />);
  }, [email, password, state, screens]);

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onEmailKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
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
    <Card component={'form'} sx={{ width: '42em' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
          <Typography gutterBottom variant={'h5'} sx={{ textAlign: 'center' }}>
            Login
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
                     type={'password'}
                     inputRef={passwordElement}
                     sx={{ width: '100%', my: 1 }}
                     label={'Password'}
                     value={password}
                     onChange={onPasswordChange}
                     onKeyDown={onPasswordKey} />

          <Divider sx={{ width: '100%' }} />

          <Button variant={'contained'}
                  sx={{ width: '100%', my: 1, py: state === LoginState.InProgress ? 0 : null }}
                  onClick={onLogin}
                  disabled={state !== LoginState.Idle}>
            {when(state, [
              [LoginState.Idle, () => <>Login</>],
              [LoginState.InProgress, () => <CircularProgress sx={{ my: 1 }} size={20.5} />]
            ], () => null)}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant={'text'}
                    sx={{ flexGrow: 0 }}
                    component={Link}
                    to={'/register'}
                    disabled={state !== LoginState.Idle}>
              Not registered yet?
            </Button>

            <Button variant={'text'}
                    sx={{ flexGrow: 0 }}
                    disabled={state !== LoginState.Idle}>
              Forgot password?
            </Button>
          </Box>
        </Box>

        <Divider orientation={'vertical'} sx={{ height: 'auto', mx: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <QRCodeSVG value={'https://durka.assasans.ml/qrcode/ODQ5M3Z0YXonNFt3MHllNG9peXY5ZXJ5YTM5NTQ4'}
                     size={196}
                     level={'M'}
                     imageSettings={{
                       src: 'https://cdn.discordapp.com/emojis/748995609964445726.png',
                       width: 64,
                       height: 64,
                       excavate: false
                     }}
                     style={{
                       padding: '8px',
                       borderRadius: '4px',
                       backgroundColor: '#ffffff'
                     }}
          />

          <Typography variant={'h6'} sx={{ mt: 1, textAlign: 'center' }}>
            Login with QR-code
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>;
};
