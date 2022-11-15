import { FC } from 'react';
import { Box, useTheme } from '@mui/material';

import { Member } from './member';
import { elevate } from '../../../utils/colors';

export const MemberList: FC = () => {
  const theme = useTheme();

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
    {Array(100).fill(null).map((_, i) => (
      <Member username={`Member ${i} dolbaeb ebaniy sosixu pidaras`} />
    ))}
  </Box>;
};
