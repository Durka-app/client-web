import { FC } from 'react';
import { Box } from '@mui/material';

import { Channel } from './channel';

export const ChannelList: FC = () => {
  return <Box sx={{
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    p: 1
  }}>
    {Array(100).fill(null).map((_, i) => (
      <Channel name={`channel-${i}`} />
    ))}
  </Box>;
};
