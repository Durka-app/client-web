import { FC, MouseEvent, Ref } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Bitfield } from '../../../utils/bitfield';
import { UserFlags } from '../../../features/users/slice';
import { BotBadge } from '../modal/user/bot-badge';

export type MessageHeaderProps = {
  username: string;
  flags: number;

  usernameRef?: Ref<HTMLElement>,
  onUsernameClick?: (event: MouseEvent) => void;
};

export const MessageHeader: FC<MessageHeaderProps> = ({
  username,
  flags,
  usernameRef,
  onUsernameClick
}) => {
  const theme = useTheme();

  const bitfield = new Bitfield(flags);

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
    {bitfield.all(UserFlags.Bot) ? <Box sx={{ ml: 0.5 }}>
      {bitfield.all(UserFlags.Verified)
       ? <BotBadge size={'small'} variant={'verified'} />
       : <BotBadge size={'small'} variant={'normal'} />}
    </Box> : null}

    <Typography color={theme.palette.text.secondary}
                sx={{
                  ml: 1,
                  fontSize: '0.75em',
                  userSelect: 'none'
                }}>Today at 21:12</Typography>
  </Box>;
};
