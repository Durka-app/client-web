import { Box, ClickAwayListener, Portal } from '@mui/material';
import {
  Children, FC, MouseEvent as ReactMouseEvent, ReactElement, ReactNode, useCallback, useRef, useState
} from 'react';

import { MessageProps } from './message';
import { MessageAvatar } from './avatar';
import { MessageHeader } from './header';
import { ConnectedMemberPopover } from '../member/connected-member-popover';

export type MessageGroupProps = {
  children: CanBeArray<ReactElement<MessageProps>>;
};

export const MessageGroup: FC<MessageGroupProps> = ({
  children
}) => {
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
          <MessageAvatar src={'https://cdn.discordapp.com/avatars/814857877637562379/2ce23f9513b1539317645ede22a298b0.png?size=512'}
                         imageRef={imageRef}
                         onClick={onClick} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto'
          }}>
            <MessageHeader usernameRef={usernameRef} onUsernameClick={onClick} />
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
                <ConnectedMemberPopover guild={'1'}
                                        id={'1'}
                                        anchor={anchor!}
                                        placement={'right'}
                                        open={popoverOpen}
                                        onClosed={onPopoverClosed} />
              </div>
            </ClickAwayListener>
          </Portal>
        ) : null}
      </Box>;
    })}
  </Box>;
};
