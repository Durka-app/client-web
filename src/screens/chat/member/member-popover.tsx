import { FC } from 'react';
import { Box, Fade, Popper } from '@mui/material';
import { PopperPlacementType } from '@mui/base/PopperUnstyled/PopperUnstyled';

import { MemberPaper } from './member-paper';
import { Member } from '../../../features/members/slice';

export type MemberPopoverProps = {
  guild: Snowflake;
  id: Snowflake;
  username: string;
  discriminator: number;
  flags: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;
  member: Nullable<Member>;

  anchor: HTMLElement;
  placement: PopperPlacementType;
  open: boolean;
  onClosed: () => void;
  onOpenProfile?: () => void;
};

export const MemberPopover: FC<MemberPopoverProps> = ({
  guild, id,
  username, discriminator,
  flags,
  avatar, banner,
  member,
  anchor, placement, open,
  onClosed, onOpenProfile
}) => {
  const canBeOpen = open && Boolean(anchor);
  const popoverId = canBeOpen ? 'member-popover' : undefined;

  return <Popper id={popoverId}
                 open={open}
                 anchorEl={anchor}
                 placement={placement}
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
                       flags={flags}
                       avatar={avatar}
                       banner={banner}
                       member={member}
                       inline={false}
                       onOpenProfile={onOpenProfile} />
        </Box>
      </Fade>
    )}
  </Popper>;
};
