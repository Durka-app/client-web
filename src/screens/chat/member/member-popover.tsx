import { FC } from 'react';
import { Box, Fade, Popper } from '@mui/material';

import { MemberPaper } from './member-paper';

export type MemberPopoverProps = {
  guild: Snowflake;
  id: Snowflake;
  username: string;
  discriminator: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;

  anchor: HTMLElement;
  open: boolean;
  onClosed: () => void;
};

export const MemberPopover: FC<MemberPopoverProps> = ({
  guild, id,
  username, discriminator,
  avatar, banner,
  anchor, open,
  onClosed
}) => {
  const canBeOpen = open && Boolean(anchor);
  const popoverId = canBeOpen ? 'member-popover' : undefined;

  return <Popper id={popoverId}
                 open={open}
                 anchorEl={anchor}
                 placement={'left'}
                 modifiers={[
                   { name: 'offset', options: { offset: [0, 16] } },
                   { name: 'preventOverflow', options: { padding: 16, tether: false } }
                 ]}
                 transition={true}>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps}
            onExited={onClosed}
            timeout={150}>
        <Box>
          <MemberPaper id={id}
                       guild={guild}
                       username={username}
                       discriminator={discriminator}
                       avatar={avatar}
                       banner={banner}
                       inline={false} />
        </Box>
      </Fade>
    )}
  </Popper>;
};
