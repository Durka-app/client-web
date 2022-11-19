import {
  Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from '@mui/material';
import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { elevate } from '../../utils/colors';
import { AcUnit, BugReport, Close, Logout } from '@mui/icons-material';
import { useScreenStack } from '../../App';
import { useNavigate } from 'react-router-dom';
import { AccountCategory } from './account';
import { ProfileCategory } from './profile';
import { DebugCategory } from './debug';

type CategoryProps = {
  name: string;
  selected: boolean;
  onClick: () => void;
};

export const Category: FC<CategoryProps> = ({
  name, selected,
  onClick
}) => {
  const theme = useTheme();

  return <ListItem disablePadding={true}>
    <ListItemButton selected={selected}
                    onClick={onClick}
                    sx={{
                      '&:hover': {
                        backgroundColor: elevate(theme.palette.background.default, 2)
                      },
                      '&.Mui-selected': {
                        backgroundColor: elevate(theme.palette.background.default, 4)
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: elevate(theme.palette.background.default, 5)
                      }
                    }}>
      <ListItemIcon sx={{
        minWidth: 'unset',
        mr: 1.5
      }}>
        {/* TODO: XD */}
        {name === 'Debug mode' ? <BugReport /> : <AcUnit />}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  </ListItem>;

  // return <Button variant={selected ? 'contained' : 'text'}
  //                onClick={onClick}
  //                sx={{ px: 2 }}>
  //   <AcUnit sx={{ mr: 1 }} />
  //   {name}
  //
  //   {/* TODO: HACK */}
  //   <div style={{ flex: '1 1 auto' }} />
  // </Button>;
};

type Props = Record<string, never>;

interface SettingsCategory {
  name: string;
  element: ReactElement;
}

export const SettingsScreen: FC<Props> = () => {
  const screens = useScreenStack();
  const theme = useTheme();
  const navigate = useNavigate();

  const [selected, setSelected] = useState('account');

  const categories = useMemo<Record<string, SettingsCategory>>(() => ({
    account: { name: 'Account', element: <AccountCategory /> },
    profile: { name: 'Profile', element: <ProfileCategory /> },
    debug: { name: 'Debug mode', element: <DebugCategory /> }
  }), [selected]);

  const onClose = useCallback(() => {
    screens.pop();
  }, [screens]);

  const onLogout = useCallback(() => {
    onClose();
    navigate('/login');
  }, [onClose, navigate]);

  return <Box sx={{
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default
  }}>
    <Drawer variant={'permanent'}
            anchor={'left'}
            sx={{
              width: '218px',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: '218px',
                boxSizing: 'border-box'
              }
            }}>
      <List disablePadding={true}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column'
            }}>
        {Object.entries(categories).map(([key, category]) => (
          <Category key={key}
                    name={category.name}
                    selected={selected === key}
                    onClick={() => setSelected(key)} />
        ))}

        <div style={{ flex: '1 1 auto' }} />
        <Divider />
        <ListItem onClick={onLogout}
                  disablePadding={true}>
          <ListItemButton sx={{ color: '#ef5350' }}>
            <ListItemIcon sx={{
              minWidth: 'unset',
              mr: 1.5
            }}>
              <Logout sx={{ color: '#ef5350' }} />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
    {/* <Box sx={{
      display: 'flex',
      flex: '1 0 218px',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%',
      pr: 2,
      py: 6,
      backgroundColor: theme.palette.background.default
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {Object.entries(categories).map(([key, category]) => (
          <Category key={key}
                    name={category.name}
                    selected={selected === key}
                    onClick={() => setSelected(key)} />
        ))}
      </Box>
    </Box> */}

    <Box sx={{
      display: 'flex',
      flex: '1 1 800px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      p: 3,
      backgroundColor: elevate(theme.palette.background.default, 1)
    }}>
      <Typography>Selected: {selected}</Typography>
      {categories[selected].element}
    </Box>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      p: 3,
      backgroundColor: elevate(theme.palette.background.default, 1)
    }}>
      <IconButton onClick={onClose}>
        <Close sx={{ fontSize: '1.5em' }} />
      </IconButton>
    </Box>
  </Box>;
};
