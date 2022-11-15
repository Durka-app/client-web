import { FC } from 'react';
import { Chat, Settings } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

import { elevate } from '../../../utils/colors';

type Props = {
  name: string;
};

export const Channel: FC<Props> = ({
  name
}) => {
  const theme = useTheme();

  return <Box sx={{
    display: 'flex',
    alignItem: 'center',
    px: 1,
    py: 0.5,
    my: '0.25em',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 100ms',
    backgroundColor: elevate(theme.palette.background.default, 3),
    '&:hover': {
      backgroundColor: elevate(theme.palette.background.default, 4),
      '.button-settings': {
        visibility: 'visible'
      }
    },
    '& .button-settings': {
      visibility: 'hidden'
    }
  }}>
    <Chat sx={{ mr: 0.5 }} />
    <Typography sx={{
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}>
      {name}
    </Typography>

    <IconButton size={'small'} className={'button-settings'}>
      <Settings sx={{ fontSize: '1rem' }} />
    </IconButton>
  </Box>;
};
