import { Box, Divider, Typography, useTheme } from '@mui/material';

import { CurrentUser } from './current-user';
import { GuildList } from './guild/guilds';
import { MemberList } from './member/members';
import { Input } from './message/input';
import { elevate } from '../../utils/colors';
import { GuildTopBar } from './guild/current-guild';
import { ChannelList } from './channel/channels';
import { ChatMessages } from './message/messages';
import { CurrentChannelTopBar } from './channel/current-channel';

export const ChatScreen = () => {
  const theme = useTheme();

  return <Box sx={{ display: 'flex', flexGrow: 1 }}>
    <GuildList />
    <Box sx={{
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
      width: '25vw',
      minWidth: '10em',
      maxWidth: '16em',
      backgroundColor: elevate(theme.palette.background.default, 2)
    }}>
      <GuildTopBar />

      <Box sx={{
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none'
        }}>
          <Typography sx={{
            px: 2,
            py: 1
          }}>[Additional info]</Typography>

          <Divider sx={{ mx: 1, my: 1 }} />
        </Box>

        <ChannelList />
      </Box>

      <CurrentUser />
    </Box>
    <Box sx={{
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      backgroundColor: elevate(theme.palette.background.default, 3)
    }}>
      <CurrentChannelTopBar />

      <Box sx={{
        display: 'flex',
        flex: '1 1 auto',
        height: 0
      }}>
        <Box sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column'
        }}>
          <ChatMessages />
          <Input />
        </Box>

        <MemberList />
      </Box>
    </Box>
  </Box>;
};
