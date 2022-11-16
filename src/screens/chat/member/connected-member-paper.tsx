import { FC } from 'react';

import { MemberPaper } from './member-paper';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';

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

  return <MemberPaper id={member.id}
                      guild={member.guild}
                      username={member.username}
                      discriminator={member.discriminator}
                      avatar={member.avatar}
                      banner={member.banner}
                      inline={inline} />;
};
