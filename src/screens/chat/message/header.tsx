import { FC, MouseEvent, Ref } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export type MessageHeaderProps = {
  username: string;

  usernameRef?: Ref<HTMLElement>,
  onUsernameClick?: (event: MouseEvent) => void;
};

export const MessageHeader: FC<MessageHeaderProps> = ({
  username,
  usernameRef,
  onUsernameClick
}) => {
  const theme = useTheme();

  return <Box sx={{
    display: 'flex',
    alignItems: 'center'
  }}>
    <Typography ref={usernameRef}
                onClick={onUsernameClick}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}>{username}</Typography>
    <Typography color={theme.palette.text.secondary}
                sx={{
                  ml: 1,
                  fontSize: '0.75em',
                  userSelect: 'none'
                }}>Today at 21:12</Typography>
  </Box>;
};
