import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import { Box, ClickAwayListener, Portal, Typography, useTheme } from '@mui/material';
import { elevate } from '../../../utils/colors';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CurrentGuildPopover } from './guild-popover';

export type GuildTopBarProps = Record<string, never>;

export const GuildTopBar: FC<GuildTopBarProps> = () => {
  const theme = useTheme();

  const anchor = useRef<HTMLElement | null>(null);

  const [popoverMounted, setPopoverMounted] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onClick = useCallback((event: MouseEvent) => {
    const valid = event.target instanceof Node &&
                  anchor.current?.contains(event.target);
    if(!valid) return;

    setPopoverOpen((value) => {
      if(!value) setPopoverMounted(true);
      return !value;
    });
  }, [anchor, setPopoverOpen, setPopoverMounted]);

  const onPopoverClose = useCallback(() => {
    setPopoverOpen(false);
  }, [setPopoverOpen]);

  const onPopoverClosed = useCallback(() => {
    setPopoverMounted(false);
  }, [setPopoverMounted]);

  return <Box ref={anchor}
              onClick={onClick}
              sx={{
                display: 'flex',
                flex: '0 0 auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '3em',
                px: 2,
                py: 1,
                boxShadow: '0 1px 1px #00000077',
                zIndex: 1,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background-color 100ms',
                '&:hover': {
                  backgroundColor: elevate(theme.palette.background.default, 4)
                }
              }}>
    <Typography>Guild name</Typography>
    {popoverOpen ? <ExpandLess /> : <ExpandMore />}

    {popoverMounted ? (
      <Portal>
        <ClickAwayListener onClickAway={onPopoverClose}>
          <div>
            <CurrentGuildPopover anchor={anchor.current!}
                                 open={popoverOpen}
                                 onClosed={onPopoverClosed} />
          </div>
        </ClickAwayListener>
      </Portal>
    ) : null}
  </Box>;
};
