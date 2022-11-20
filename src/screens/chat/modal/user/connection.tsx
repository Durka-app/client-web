import { FC, ReactElement } from 'react';
import { IconButton, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { elevate } from '../../../../utils/colors';

export type UserConnectionProps = {
  name: string;
  icon: ReactElement;

  username: string;
  url: Nullable<string>;
};

export const UserConnection: FC<UserConnectionProps> = ({
  name, icon,
  username, url
}) => {
  const theme = useTheme();

  return <Paper variant={'outlined'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 'calc(50% - 0.25em)',
                  px: 1.5,
                  py: 1
                }}>
    <Tooltip title={name}
             placement={'top'}
             arrow={true}
             componentsProps={{
               tooltip: {
                 sx: {
                   px: 1,
                   py: 0.5,
                   userSelect: 'none',
                   backgroundColor: elevate(theme.palette.background.paper, 1),
                   color: theme.palette.text.primary
                 }
               },
               arrow: {
                 sx: {
                   color: elevate(theme.palette.background.paper, 1)
                 }
               }
             }}>
      {icon}
    </Tooltip>
    <Typography fontWeight={600}
                sx={{ ml: 1 }}>{username}</Typography>

    {url !== null ? <>
      <div style={{ flex: '1 1 auto' }} />
      <IconButton href={url} target={'_blank'} rel={'noopener'}>
        <OpenInNew />
      </IconButton>
    </> : null}
  </Paper>;
};
