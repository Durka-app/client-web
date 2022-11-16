import { FC, MouseEvent, Ref } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export type MessageHeaderProps = {
  usernameRef?: Ref<HTMLElement>,
  onUsernameClick?: (event: MouseEvent) => void;
};

export const MessageHeader: FC<MessageHeaderProps> = ({
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
                }}>$5 за мiсяць чухання</Typography>
    <Typography color={theme.palette.grey[400]}
                sx={{
                  ml: 1,
                  fontSize: '0.75em',
                  userSelect: 'none'
                }}>Today at 21:12</Typography>
  </Box>;
};
