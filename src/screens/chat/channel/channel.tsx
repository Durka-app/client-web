import { FC } from 'react';
import { Chat, Settings } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

import { elevate } from '../../../utils/colors';

export type ChannelProps = {
  id: Snowflake;
  name: string;

  selected: boolean;

  onSelect?: () => void;
  onSettingsClick?: () => void;
};

export const Channel: FC<ChannelProps> = ({
  id, name,
  selected,
  onSelect, onSettingsClick
}) => {
  const theme = useTheme();

  return <Box onClick={onSelect}
              sx={{
                display: 'flex',
                alignItem: 'center',
                px: 1,
                py: 0.5,
                my: '0.25em',
                borderRadius: '4px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background-color 100ms',
                '& .button-settings': {
                  visibility: 'hidden'
                },
                ...(selected && {
                  backgroundColor: elevate(theme.palette.background.default, 5),
                  '& .button-settings': {
                    visibility: 'visible'
                  }
                }),
                ...(!selected && {
                  '&:hover': {
                    backgroundColor: elevate(theme.palette.background.default, 4),
                    '.button-settings': {
                      visibility: 'visible'
                    }
                  }
                })
              }}>
    <Chat sx={{ mr: 0.5 }} />
    <Typography sx={{
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}>
      {name}
    </Typography>

    <IconButton size={'small'}
                className={'button-settings'}
                onClick={onSettingsClick}>
      <Settings sx={{ fontSize: '1rem' }} />
    </IconButton>
  </Box>;
};
