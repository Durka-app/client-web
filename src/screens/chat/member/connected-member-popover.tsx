import { FC } from 'react';
import { PopperPlacementType } from '@mui/base/PopperUnstyled/PopperUnstyled';

import { MemberPopover } from './member-popover';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';

export type ConnectedMemberPopover = {
  guild: Snowflake;
  id: Snowflake;

  anchor: HTMLElement;
  placement: PopperPlacementType;
  open: boolean;
  onClosed: () => void;
}

export const ConnectedMemberPopover: FC<ConnectedMemberPopover> = ({
  guild, id,
  anchor, placement, open,
  onClosed
}) => {
  const member = useAppSelector(getMember(guild, id));

  return <MemberPopover id={member.id}
                        guild={member.guild}
                        username={member.username}
                        discriminator={member.discriminator}
                        avatar={member.avatar}
                        banner={member.banner}
                        anchor={anchor}
                        placement={placement}
                        open={open}
                        onClosed={onClosed} />;
};
