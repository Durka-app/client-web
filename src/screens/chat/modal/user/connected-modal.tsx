import { FC } from 'react';
import { UserModal } from './modal';

import { useAppSelector } from '../../../../app/hooks';
import { getUser } from '../../../../features/users/slice';

export type ConnectedUserModalProps = {
  id: Snowflake;
};

export const ConnectedUserModal: FC<ConnectedUserModalProps> = ({ id }) => {
  const user = useAppSelector(getUser(id));

  return <UserModal id={id}
                    username={user.username}
                    discriminator={user.discriminator}
                    avatar={user.avatar}
                    banner={user.banner} />;
};
