import { FC } from 'react';
import { Box } from '@mui/material';

import { Message } from './message';
import { MessageGroup } from './group';

export const ChatMessages: FC = () => {
  return <Box sx={{
    display: 'flex',
    flex: '1 0 0',
    flexDirection: 'column',
    py: 2,
    overflowY: 'auto'
  }}>
    {Array(100).fill(null).map((_, i) => (
      <MessageGroup>
        {Array(Math.floor(Math.random() * 4) + 1).fill(null).map((_, j) => (
          <Message content={`Message ${i} : ${j}`} />
        ))}
      </MessageGroup>
    ))}
  </Box>;
};
