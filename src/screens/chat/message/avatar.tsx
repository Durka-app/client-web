import { FC } from 'react';
import { Box } from '@mui/material';

export type MessageAvatarProps = {
  src: string;
};

export const MessageAvatar: FC<MessageAvatarProps> = ({
  src
}) => {
  return <Box sx={{
    display: 'flex',
    mr: 2,
    cursor: 'pointer',
    userSelect: 'none',
    // TODO: Move into <img />
    '& > img:hover': {
      boxShadow: '0 1px 4px #00000077'
    }
  }}>
    <img src={src}
         style={{
           width: '3em',
           height: '3em',
           borderRadius: '50%',
           transition: 'box-shadow 100ms ease-in-out'
         }} />
  </Box>;
};
