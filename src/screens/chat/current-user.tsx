import { FC, useCallback } from 'react';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Headset, MicNone, Settings } from '@mui/icons-material';

import { useScreenStack } from '../../App';
import { elevate } from '../../utils/colors';
import { SettingsScreen } from '../settings';

export const CurrentUser: FC = () => {
  const screens = useScreenStack();
  const theme = useTheme();

  const onSettingsClick = useCallback(() => {
    screens.push('user-settings', <SettingsScreen />);
  }, [screens]);

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    px: 2,
    py: 1,
    backgroundColor: elevate(theme.palette.background.default, 1)
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <img src={'https://cdn.discordapp.com/avatars/738672017791909900/a1199f65cd2dbf7670ae50619068d3b7.png?size=2048'}
           style={{
             width: '2.75em',
             height: '2.75em',
             marginRight: '0.5em',
             borderRadius: '50%',
             border: '4px solid #f44336',
             userSelect: 'none'
           }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography>Assasans#2112</Typography>
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.8em'
        }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' style={{
            width: '1.25em',
            marginRight: '0.25em'
          }}>
            <path fill='#EEE'
                  d='M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z' />
            <circle fill='#ED1B2F' cx='18' cy='18' r='7' />
          </svg>
          Я пидорас
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ my: 0.5 }} />

    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 0.5
    }}>
      <IconButton disabled={true}
                  sx={{
                    borderRadius: '4px',
                    '& .MuiTouchRipple-ripple .MuiTouchRipple-child': {
                      borderRadius: '4px'
                    }
                  }}>
        {/* MicNone     - no input devices */}
        {/* Mic         - input device enabled */}
        {/* Mic (green) - input device active (in voice channel) */}
        {/* MicOff      - input device disabled */}
        <MicNone sx={{ fontSize: '0.8em' }} />
      </IconButton>

      <IconButton disabled={true}
                  sx={{
                    borderRadius: '4px',
                    '& .MuiTouchRipple-ripple .MuiTouchRipple-child': {
                      borderRadius: '4px'
                    }
                  }}>
        <Headset sx={{ fontSize: '0.8em' }} />
      </IconButton>

      <div style={{ flex: '1 1 auto' }} />

      <IconButton onClick={onSettingsClick}
                  sx={{
                    borderRadius: '4px',
                    '& .MuiTouchRipple-ripple .MuiTouchRipple-child': {
                      borderRadius: '4px'
                    }
                  }}>
        <Settings sx={{ fontSize: '0.8em' }} />
      </IconButton>
    </Box>
  </Box>;
};
