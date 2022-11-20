import { FC } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

import { Member, padDiscriminator } from '../../../features/members/slice';

export type MemberPaperProps = {
  guild: Snowflake;
  id: Snowflake;
  username: string;
  discriminator: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;

  member: Nullable<Member>;

  inline: boolean;

  onOpenProfile?: () => void;
}

export const MemberPaper: FC<MemberPaperProps> = ({
  guild, id,
  username, discriminator,
  avatar, banner,
  member,
  inline,
  onOpenProfile
}) => {
  const theme = useTheme();

  return <Paper elevation={inline ? 1 : 4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '24em'
                }}>
    <img src={member?.banner ?? banner!}
         style={{
           width: '100%',
           height: '6em',
           borderTopLeftRadius: 'inherit',
           borderTopRightRadius: 'inherit',
           userSelect: 'none'
         }} />

    <Box sx={{
      height: '3em',
      userSelect: 'none'
    }}>
      <Box onClick={onOpenProfile}
           sx={{
             position: 'relative',
             width: '8em',
             height: '8em',
             top: '-5em',
             borderRadius: '50%',
             ...(onOpenProfile && {
               cursor: 'pointer',
               '&:hover': {
                 '&:after': {
                   position: 'absolute',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   width: 'calc(100% - 8px)',
                   height: 'calc(100% - 8px)',
                   left: '4px',
                   top: '4px',
                   borderRadius: '50%',
                   backgroundColor: '#00000088',
                   color: theme.palette.text.primary,
                   content: '"Profile"',
                   fontSize: '1em',
                   fontWeight: 600,
                   textAlign: 'center',
                   textTransform: 'uppercase'
                 }
               }
             })
           }}>
        <img src={member?.avatar ?? avatar!}
             style={{
               width: '8em',
               height: '8em',
               borderRadius: 'inherit',
               border: `4px solid #f44336`
             }} />
      </Box>
    </Box>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      px: 2,
      pt: 1,
      mb: 1
    }}>
      <Typography variant={'h5'}>{username}#{padDiscriminator(discriminator)}</Typography>
      {member && member.nickname !== null ? <Typography variant={'h6'}>{member.nickname}</Typography> : null}
    </Box>
  </Paper>;
};
