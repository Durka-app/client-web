import { FC } from 'react';

import { MemberPopover } from './member-popover';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';

export type ConnectedMemberPopover = {
  guild: Snowflake;
  id: Snowflake;

  anchor: HTMLElement;
  open: boolean;
  onClosed: () => void;
}

export const ConnectedMemberPopover: FC<ConnectedMemberPopover> = ({
  guild, id,
  anchor, open,
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
                        open={open}
                        onClosed={onClosed} />;
};
