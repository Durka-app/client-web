import { FC } from 'react';

import { Member } from './member';
import { useAppSelector } from '../../../app/hooks';
import { getMember } from '../../../features/members/slice';

export type ConnectedMemberProps = {
  guild: Snowflake;
  id: Snowflake;
}

export const ConnectedMember: FC<ConnectedMemberProps> = ({ guild, id }) => {
  const member = useAppSelector(getMember(guild, id));

  return <Member id={member.id}
                 guild={member.guild}
                 username={member.username}
                 discriminator={member.discriminator}
                 avatar={member.avatar} />;
};
