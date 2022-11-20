import { FC } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { AllInclusive, BugReport, Cake, Code, Construction, Coronavirus, HowToReg } from '@mui/icons-material';

import { elevate } from '../../../utils/colors';
import { UserBadge } from '../modal/user/badge';
import { BotBadge } from '../modal/user/bot-badge';
import { Bitfield } from '../../../utils/bitfield';
import { UserFlags } from '../../../features/users/slice';
import { Member, padDiscriminator } from '../../../features/members/slice';

export type MemberPaperProps = {
  guild: Snowflake;
  id: Snowflake;
  username: string;
  discriminator: number;
  flags: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;

  member: Nullable<Member>;

  inline: boolean;

  onOpenProfile?: () => void;
}

export const MemberPaper: FC<MemberPaperProps> = ({
  guild, id,
  username, discriminator,
  flags,
  avatar, banner,
  member,
  inline,
  onOpenProfile
}) => {
  const theme = useTheme();

  const bitfield = new Bitfield(flags);

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
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <Typography variant={'h5'}>{username}#{padDiscriminator(discriminator)}</Typography>

        {bitfield.all(UserFlags.Bot) ? <Box sx={{
          alignSelf: 'center',
          ml: 1
        }}>
          {bitfield.all(UserFlags.Verified)
           ? <BotBadge size={'small'} variant={'verified'} />
           : <BotBadge size={'small'} variant={'normal'} />}
        </Box> : null}

        <div style={{ flex: '1 1 auto' }} />

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          maxWidth: '11em',
          px: 0.5,
          py: 0.5,
          ml: 1,
          gap: 0.5,
          borderRadius: 1,
          backgroundColor: elevate(theme.palette.background.paper, 1)
        }}>
          {bitfield.all(UserFlags.Staff)
           ? <UserBadge name={'Staff'}
                        icon={<Construction color={'primary'} />} /> : null}
          {bitfield.all(UserFlags.Developer)
           ? <UserBadge name={'Developer'}
                        icon={<Code color={'warning'} />} /> : null}
          {bitfield.all(UserFlags.BugHunter)
           ? <UserBadge name={'Bug Hunter'}
                        icon={<BugReport color={'primary'} />} /> : null}
          {bitfield.all(UserFlags.Supporter)
           ? <UserBadge name={'Supporter'}
                        icon={<AllInclusive color={'warning'} />} /> : null}
          {bitfield.all(UserFlags.BotDeveloper)
           ? <UserBadge name={'Bot Developer'}
                        icon={<Code sx={{
                          borderRadius: 1.5,
                          backgroundColor: theme.palette.success.main,
                          color: theme.palette.background.paper
                        }} />} /> : null}
          {bitfield.all(UserFlags.Birthday)
           ? <UserBadge name={'Birthday'}
                        icon={<Cake color={'warning'} />} /> : null}
          {bitfield.all(UserFlags.Verified)
           ? <UserBadge name={'Verified'}
                        icon={<HowToReg color={'primary'} />} /> : null}
          {bitfield.all(UserFlags.COVID19Vaccinated)
           ? <UserBadge name={'COVID-19 Vaccinated'}
                        icon={<Coronavirus color={'success'} />} />
           : null}
        </Box>
      </Box>

      {member && member.nickname !== null ? <Typography variant={'h6'}>{member.nickname}</Typography> : null}
    </Box>
  </Paper>;
};
