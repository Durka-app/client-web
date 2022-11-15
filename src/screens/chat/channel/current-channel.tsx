import { FC } from 'react';
import { Box, Divider, TextField, Typography } from '@mui/material';

export const CurrentChannelTopBar: FC = () => {
  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '3em',
    px: 2,
    py: 1,
    boxShadow: '0 1px 1px #00000077',
    zIndex: 1
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none'
    }}>
      <Typography>#dev</Typography>
      <Divider orientation={'vertical'}
               sx={{
                 alignSelf: 'stretch',
                 height: 'auto',
                 mx: 2
               }} />
      <Typography sx={{
        // TODO: Broken
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        Повестка №!
      </Typography>
    </Box>

    <TextField variant={'standard'}
               type={'text'}
               label={'Search'}
               disabled={true}
               autoComplete={'off'}
               size={'small'} />
  </Box>;
};
