import { FC } from 'react';
import { Check } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';

export type BotBadgeSize = 'small' | 'medium';
export type BotBadgeVariant = 'normal' | 'verified';

export type BotBadgeProps = {
  size: BotBadgeSize;
  variant: BotBadgeVariant;
};

export const BotBadge: FC<BotBadgeProps> = ({ size, variant }) => {
  const theme = useTheme();

  return <Box sx={{
    display: 'flex',
    alignItems: 'center',
    px: size === 'medium' ? 1 : 0.5,
    borderRadius: 0.5,
    fontSize: size === 'medium' ? '1em' : '0.75em',
    userSelect: 'none',
    backgroundColor: theme.palette.primary.main
  }}>
    {variant === 'verified' ? <Check sx={{ mr: 0.25, fontSize: '1.3em' }} /> : null}
    <Typography sx={{ fontSize: '1em', textTransform: 'uppercase' }}>Bot</Typography>
  </Box>;
};
