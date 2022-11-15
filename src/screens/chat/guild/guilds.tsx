import { FC } from 'react';
import { Box, useTheme } from '@mui/material';

import { Guild } from './guild';
import { elevate } from '../../../utils/colors';

export const GuildList: FC = () => {
  const theme = useTheme();

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    width: '4em',
    p: 1,
    gap: 1,
    backgroundColor: elevate(theme.palette.background.default, 1)
  }}>
    <Guild selected={true} unread={false} />
    <Guild selected={false} unread={false} />
    <Guild selected={true} unread={true} />
    <Guild selected={false} unread={true} />
  </Box>;
};
