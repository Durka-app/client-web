import { FC } from 'react';
import { AttachFile } from '@mui/icons-material';
import { Box, IconButton, TextField, useTheme } from '@mui/material';

export const Input: FC = () => {
  const theme = useTheme();

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    px: 1,
    py: 2
  }}>
    <IconButton sx={{
      height: 'auto',
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    }}>
      <AttachFile />
    </IconButton>

    <TextField variant={'standard'}
               type={'text'}
               placeholder={'Message'}
               multiline={true}
               maxRows={20}
               autoComplete={'off'}
               sx={{
                 flex: '1 0 auto',
                 ml: 1
               }} />
  </Box>;
};
