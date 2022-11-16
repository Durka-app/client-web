import { Box } from '@mui/material';
import { FC, useCallback } from 'react';

import { ConnectedChannel } from './connected-channel';
import { getSelectedGuild } from '../../../features/guilds/slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getGuildChannels, getSelectedChannel, selectChannel } from '../../../features/channels/slice';

export const ChannelList: FC = () => {
  const dispatch = useAppDispatch();

  const guild = useAppSelector(getSelectedGuild);
  const channels = useAppSelector(guild ? getGuildChannels(guild.id) : () => ({}));
  const selectedChannel = useAppSelector(guild ? getSelectedChannel(guild.id) : () => null);

  const onSelect = useCallback((id: Snowflake) => dispatch(selectChannel(id)), [dispatch]);
  const onSettingsClick = useCallback((id: Snowflake) => {
    // TODO: Not implemented
  }, [dispatch]);

  return <Box sx={{
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    p: 1
  }}>
    {Object.values(channels).map((channel) => (
      <ConnectedChannel key={channel.id}
                        id={channel.id}
                        onSelect={onSelect}
                        onSettingsClick={onSettingsClick} />
    ))}
  </Box>;
};
