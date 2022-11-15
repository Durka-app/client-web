import { FC } from 'react';
import { Divider, Fade, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

type Props = {
  anchor: HTMLElement;
  open: boolean;
  onClosed: () => void;
};

export const CurrentGuildPopover: FC<Props> = ({
  anchor,
  open,
  onClosed
}) => {
  const canBeOpen = open && Boolean(anchor);
  const id = canBeOpen ? 'current-guild-popover' : undefined;

  return <Popper id={id}
                 open={open}
                 anchorEl={anchor}
                 placement={'bottom'}
                 modifiers={[
                   { name: 'offset', options: { offset: [0, 8] } }
                 ]}
                 transition={true}>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps}
            onExited={onClosed}
            timeout={150}>
        <Paper elevation={4}
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 width: 'calc(25vw - 2em)',
                 minWidth: '10em',
                 maxWidth: '16em'
               }}>
          <MenuList disablePadding={true}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <Divider sx={{
              '&.MuiDivider-root': {
                my: 0
              }
            }} />
            <MenuItem sx={{ color: '#ef5350' }}>
              <ListItemIcon>
                <ExitToApp sx={{ color: '#ef5350' }} />
              </ListItemIcon>
              <ListItemText>Leave</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Fade>
    )}
  </Popper>;
};
