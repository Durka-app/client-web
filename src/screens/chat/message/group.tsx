import { Box } from '@mui/material';
import { Children, FC, ReactElement, ReactNode } from 'react';

import { MessageProps } from './message';
import { MessageAvatar } from './avatar';
import { MessageHeader } from './header';

export type MessageGroupProps = {
  children: CanBeArray<ReactElement<MessageProps>>;
};

export const MessageGroup: FC<MessageGroupProps> = ({
  children
}) => {
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    py: 1
  }}>
    {Children.map(children, (node, index) => {
      let inner: ReactNode;
      if(index === 0) {
        inner = <Box sx={{
          display: 'flex',
          mx: '1em'
        }}>
          <MessageAvatar src={'https://cdn.discordapp.com/avatars/814857877637562379/2ce23f9513b1539317645ede22a298b0.png?size=512'} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto'
          }}>
            <MessageHeader />
            {node}
          </Box>
        </Box>;
      } else {
        inner = <Box sx={{ ml: '5em' }}>{node}</Box>;
      }

      return <Box sx={{
        display: 'flex',
        py: '0.1em',
        transition: 'background-color 75ms',
        '&:hover': {
          backgroundColor: '#00000015'
        }
      }}>
        {inner}
      </Box>;
    })}
  </Box>;
};
