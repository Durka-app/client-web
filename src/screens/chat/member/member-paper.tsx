import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { padDiscriminator } from '../../../features/members/slice';

export type MemberPaperProps = {
  guild: Snowflake;
  id: Snowflake;
  username: string;
  discriminator: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;

  inline: boolean;
}

export const MemberPaper: FC<MemberPaperProps> = ({
  guild, id,
  username, discriminator,
  avatar, banner,
  inline
}) => {
  return <Paper elevation={inline ? 1 : 4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '24em'
                }}>
    <img src={banner!}
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
      <img src={avatar!}
           style={{
             position: 'relative',
             width: '8em',
             height: '8em',
             top: '-5em',
             borderRadius: '50%',
             border: `4px solid #f44336`
           }} />
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
      <Typography variant={'h6'}>$5 за мiсяць чухання</Typography>
    </Box>
  </Paper>;
};
