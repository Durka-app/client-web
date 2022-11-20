import { Box, ClickAwayListener, Portal } from '@mui/material';
import {
  Children, FC, MouseEvent as ReactMouseEvent, ReactElement, ReactNode, useCallback, useRef, useState
} from 'react';

import { MessageProps } from './content';
import { MessageAvatar } from './avatar';
import { MessageHeader } from './header';
import { useScreenStack } from '../../../App';
import { Member } from '../../../features/members/slice';
import { ConnectedUserModal } from '../modal/user/connected-modal';
import { ConnectedMemberPopover } from '../member/connected-member-popover';
import { User } from '../../../features/users/slice';

export type MessageGroupProps = {
  channel: Snowflake;
  member: Member;
  user: User;

  children: CanBeArray<ReactElement<MessageProps>>;
};

export const MessageGroup: FC<MessageGroupProps> = ({
  channel, member, user,
  children
}) => {
  const screens = useScreenStack();

  const root = useRef<HTMLElement | null>(null);
  const usernameRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [popoverMounted, setPopoverMounted] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onClick = useCallback((event: ReactMouseEvent) => {
    const target = event.target;
    const valid = target instanceof HTMLElement &&
                  root.current?.contains(target);
    if(!valid) return;

    if(!popoverOpen || anchor === null || target === anchor) {
      setPopoverOpen((value) => {
        if(!value) setPopoverMounted(true);
        return !value;
      });
    }

    setAnchor(target);
  }, [popoverOpen, anchor, setPopoverOpen, setPopoverMounted]);

  const onPopoverClose = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target;
    if(!(target instanceof Node)) return;

    if(imageRef.current?.contains(target) && anchor?.contains(imageRef.current)) return;
    if(usernameRef.current?.contains(target) && anchor?.contains(usernameRef.current)) return;

    setPopoverOpen(false);
  }, [imageRef, usernameRef, anchor, setPopoverOpen]);

  const onPopoverClosed = useCallback(() => {
    setPopoverMounted(false);
    setAnchor(null);
  }, [setPopoverMounted, setAnchor]);

  const onOpenProfile = useCallback(() => {
    setPopoverOpen(false);
    screens.push('user', <ConnectedUserModal id={user.id} />);
  }, [screens]);

  return <Box ref={root}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 1
              }}>
    {Children.map(children, (node, index) => {
      let inner: ReactNode;
      if(index === 0) {
        inner = <Box sx={{
          display: 'flex',
          mx: '1em'
        }}>
          <MessageAvatar src={member.avatar ?? user.avatar!}
                         imageRef={imageRef}
                         onClick={onClick} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto'
          }}>
            <MessageHeader username={member.nickname ?? user.username}
                           flags={user.flags}
                           usernameRef={usernameRef}
                           onUsernameClick={onClick} />
            {node}
          </Box>
        </Box>;
      } else {
        inner = <Box sx={{ ml: '5em' }}>{node}</Box>;
      }

      return <Box sx={{
        display: 'flex',
        py: '0.1em',
        transition: 'background-color 75ms',
        '&:hover': {
          backgroundColor: '#00000015'
        }
      }}>
        {inner}

        {popoverMounted ? (
          <Portal>
            <ClickAwayListener onClickAway={onPopoverClose}>
              <div>
                <ConnectedMemberPopover guild={member.guild}
                                        id={member.user}
                                        anchor={anchor!}
                                        placement={'right'}
                                        open={popoverOpen}
                                        onClosed={onPopoverClosed}
                                        onOpenProfile={onOpenProfile} />
              </div>
            </ClickAwayListener>
          </Portal>
        ) : null}
      </Box>;
    })}
  </Box>;
};
