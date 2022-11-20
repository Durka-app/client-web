import { FC } from 'react';
import { PopperPlacementType } from '@mui/base/PopperUnstyled/PopperUnstyled';

import { MemberPopover } from './member-popover';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';
import { getUser } from '../../../features/users/slice';

export type ConnectedMemberPopover = {
  guild: Snowflake;
  id: Snowflake;

  anchor: HTMLElement;
  placement: PopperPlacementType;
  open: boolean;
  onClosed: () => void;
  onOpenProfile?: () => void;
}

export const ConnectedMemberPopover: FC<ConnectedMemberPopover> = ({
  guild, id,
  anchor, placement, open,
  onClosed, onOpenProfile
}) => {
  const member = useAppSelector(getMember(guild, id));
  const user = useAppSelector(getUser(id));

  return <MemberPopover id={user.id}
                        guild={member.guild}
                        username={user.username}
                        discriminator={user.discriminator}
                        avatar={user.avatar}
                        banner={user.banner}
                        member={member}
                        anchor={anchor}
                        placement={placement}
                        open={open}
                        onClosed={onClosed}
                        onOpenProfile={onOpenProfile} />;
};
