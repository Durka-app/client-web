import { FC } from 'react';

import { Member } from './member';
import { useAppSelector } from '../../../app/hooks';
import { getUser } from '../../../features/users/slice';
import { getMember } from '../../../features/members/slice';

export type ConnectedMemberProps = {
  guild: Snowflake;
  id: Snowflake;
}

export const ConnectedMember: FC<ConnectedMemberProps> = ({ guild, id }) => {
  const member = useAppSelector(getMember(guild, id));
  const user = useAppSelector(getUser(id));

  return <Member id={user.id}
                 guild={member.guild}
                 username={member.nickname ?? user.username}
                 discriminator={user.discriminator}
                 avatar={member.avatar ?? user.avatar} />;
};
