import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { ConnectedMemberPaper } from '../chat/member/connected-member-paper';

type Props = Record<string, never>;

export const ProfileCategory: FC<Props> = () => {
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }}>
    <Typography>Your profile is shit</Typography>
    <ConnectedMemberPaper guild={'1'}
                          id={'1'}
                          inline={true} />
  </Box>;
};
