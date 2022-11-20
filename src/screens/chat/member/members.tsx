import { FC } from 'react';
import { Box, useTheme } from '@mui/material';

import { elevate } from '../../../utils/colors';
import { useAppSelector } from '../../../app/hooks';
import { ConnectedMember } from './connected-member';
import { getGuildMembers } from '../../../features/members/slice';
import { getSelectedGuild } from '../../../features/guilds/slice';

export const MemberList: FC = () => {
  const theme = useTheme();

  const guild = useAppSelector(getSelectedGuild);
  const members = useAppSelector(guild ? getGuildMembers(guild.id) : () => ({}));

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    width: '30%',
    maxWidth: '16em',
    p: 1,
    gap: 0.5,
    overflowY: 'auto',
    backgroundColor: elevate(theme.palette.background.default, 2)
  }}>
    {Object.values(members).map((member) => (
      <ConnectedMember key={`${member.guild}-${member.user}`}
                       guild={member.guild}
                       id={member.user} />
    ))}
  </Box>;
};
