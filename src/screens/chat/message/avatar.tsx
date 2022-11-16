import { Box } from '@mui/material';
import { FC, MouseEvent, Ref } from 'react';

export type MessageAvatarProps = {
  src: string;

  imageRef?: Ref<HTMLImageElement>;

  onClick?: (event: MouseEvent) => void;
};

export const MessageAvatar: FC<MessageAvatarProps> = ({
  src,
  imageRef,
  onClick
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
    <img ref={imageRef}
         src={src}
         onClick={onClick}
         style={{
           width: '3em',
           height: '3em',
           borderRadius: '50%',
           transition: 'box-shadow 100ms ease-in-out'
         }} />
  </Box>;
};
