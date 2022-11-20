import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import { Box, ClickAwayListener, Portal, Typography, useTheme } from '@mui/material';

import { useScreenStack } from '../../../App';
import { elevate } from '../../../utils/colors';
import { ConnectedUserModal } from '../modal/user/connected-modal';
import { ConnectedMemberPopover } from './connected-member-popover';
import { Bitfield } from '../../../utils/bitfield';
import { UserFlags } from '../../../features/users/slice';
import { BotBadge } from '../modal/user/bot-badge';

export type MemberProps = {
  id: Snowflake;
  guild: Snowflake;
  username: string;
  discriminator: number;
  flags: number;
  avatar: Nullable<string>;
};

export const Member: FC<MemberProps> = ({
  id, guild,
  username, discriminator,
  flags,
  avatar
}) => {
  const screens = useScreenStack();
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

  const onOpenProfile = useCallback(() => {
    setPopoverOpen(false);
    screens.push('user', <ConnectedUserModal id={id} />);
  }, [screens]);

  const bitfield = new Bitfield(flags);

  return <Box ref={anchor}
              onClick={onClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                borderRadius: '4px',
                cursor: popoverOpen ? 'unset' : 'pointer',
                userSelect: 'none',
                transition: 'background-color 100ms',
                ...(popoverOpen && {
                  backgroundColor: elevate(theme.palette.background.default, 5)
                }),
                ...(!popoverOpen && {
                  '&:hover': {
                    backgroundColor: elevate(theme.palette.background.default, 4)
                  }
                })
              }}>
    <img src={avatar!}
         style={{
           width: '3em',
           height: '3em',
           marginRight: '0.5em',
           borderRadius: '50%',
           border: '2px solid #f44336'
         }} />
    <Typography sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}>{username}</Typography>

    {bitfield.all(UserFlags.Bot) ? <Box sx={{ ml: 0.5 }}>
      {bitfield.all(UserFlags.Verified)
       ? <BotBadge size={'small'} variant={'verified'} />
       : <BotBadge size={'small'} variant={'normal'} />}
    </Box> : null}

    {popoverMounted ? (
      <Portal>
        <ClickAwayListener onClickAway={onPopoverClose}>
          <div>
            <ConnectedMemberPopover guild={guild}
                                    id={id}
                                    anchor={anchor.current!}
                                    placement={'left'}
                                    open={popoverOpen}
                                    onClosed={onPopoverClosed}
                                    onOpenProfile={onOpenProfile} />
          </div>
        </ClickAwayListener>
      </Portal>
    ) : null}
  </Box>;
};
