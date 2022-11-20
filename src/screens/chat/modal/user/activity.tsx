import { FC, ReactNode } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

export type UserActivityProps = {
  type: string;
  name: ReactNode;
  icon: Nullable<ReactNode>;
};

export const UserActivity: FC<UserActivityProps> = ({ type, name, icon }) => {
  const theme = useTheme();

  return <Paper variant={'outlined'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  px: 1.5,
                  py: 1
                }}>
    <Typography fontWeight={600}
                sx={{
                  mb: 0.5
                }}>{type}</Typography>
    <Box sx={{
      display: 'flex'
    }}>
      {icon}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ml: 0.5
      }}>
        {name}
        <Typography>For 6 hours</Typography>
      </Box>
    </Box>
  </Paper>;
};
