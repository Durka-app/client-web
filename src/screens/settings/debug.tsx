import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react';
import { Box, Button, TextField, useTheme } from '@mui/material';

type Props = Record<string, never>;

export const DebugCategory: FC<Props> = () => {
  const theme = useTheme();

  const [code, setCode] = useState('');
  const [active, setActive] = useState<null | true>(null);

  const onClick = useCallback(() => {
    if(active) {
      setActive(null);
      return;
    }

    // TODO: Implement
    setActive(true);
  }, [active, setActive]);

  const onCodeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  }, [setCode]);

  const onCodeKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      onClick();
    }
  }, []);

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }}>
    <TextField variant={'standard'}
               label={'Code'}
               autoComplete={'off'}
               value={code}
               onChange={onCodeChange}
               onKeyDown={onCodeKey}
               disabled={active !== null}
               sx={{ width: '100%', my: 1 }} />

    <Button variant={'contained'}
            color={active === null ? 'primary' : 'error'}
            disabled={code.length < 1}
            onClick={onClick}>
      {active === null ? 'Enable' : 'Disable'}
    </Button>
  </Box>;
};
