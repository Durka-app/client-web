import { FC } from 'react';
import { Box, Divider, TextField, Typography } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';
import { getSelectedGuild } from '../../../features/guilds/slice';
import { getSelectedChannel } from '../../../features/channels/slice';

export const CurrentChannelTopBar: FC = () => {
  const guild = useAppSelector(getSelectedGuild);
  const channel = useAppSelector(guild ? getSelectedChannel(guild.id) : () => null);
  if(!channel) return <h1>No selected channel</h1>; // TODO: ConnectedChannelTopBar

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '3em',
    px: 2,
    py: 1,
    boxShadow: '0 1px 1px #00000077',
    zIndex: 1
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none'
    }}>
      <Typography>#{channel.name}</Typography>
      <Divider orientation={'vertical'}
               sx={{
                 alignSelf: 'stretch',
                 height: 'auto',
                 mx: 2
               }} />
      <Typography sx={{
        // TODO: Broken
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        Повестка №!
      </Typography>
    </Box>

    <TextField variant={'standard'}
               type={'text'}
               label={'Search'}
               disabled={true}
               autoComplete={'off'}
               size={'small'} />
  </Box>;
};
