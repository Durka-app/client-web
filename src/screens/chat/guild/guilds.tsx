import { FC, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';

import { elevate } from '../../../utils/colors';
import { ConnectedGuild } from './connected-guild';
import { selectGuild } from '../../../features/guilds/slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const GuildList: FC = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const guilds = useAppSelector((state) => state.guilds.guilds);

  const onSelect = useCallback((id: Snowflake) => dispatch(selectGuild(id)), [dispatch]);

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    width: '4em',
    p: 1,
    gap: 1,
    backgroundColor: elevate(theme.palette.background.default, 1)
  }}>
    {Object.values(guilds).map((guild) => (
      <ConnectedGuild key={guild.id}
                      id={guild.id}
                      onSelect={onSelect} />
    ))}
  </Box>;
};
