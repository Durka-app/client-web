import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { MemberPaper } from '../chat/member/member-popover';

type Props = Record<string, never>;

export const ProfileCategory: FC<Props> = () => {
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }}>
    <Typography>Your profile is shit</Typography>
    <MemberPaper inline={true} />
  </Box>;
};
