import { FC } from 'react';

import { MemberPaper } from './member-paper';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';
import { getUser } from '../../../features/users/slice';

export type ConnectedMemberPaperProps = {
  guild: Snowflake;
  id: Snowflake;

  inline: boolean;
}

export const ConnectedMemberPaper: FC<ConnectedMemberPaperProps> = ({
  guild, id,
  inline
}) => {
  const member = useAppSelector(getMember(guild, id));
  const user = useAppSelector(getUser(id));

  return <MemberPaper id={user.id}
                      guild={member.guild}
                      username={user.username}
                      discriminator={user.discriminator}
                      flags={user.flags}
                      avatar={user.avatar}
                      banner={user.banner}
                      member={member}
                      inline={inline} />;
};
