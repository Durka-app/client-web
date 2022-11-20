import { FC } from 'react';
import { UserModal } from './modal';

export type ConnectedUserModalProps = {
  id: Snowflake;
};

export const ConnectedUserModal: FC<ConnectedUserModalProps> = ({ id }) => {
  // TODO: Redux
  return <UserModal id={id}
                    username={'Lann'}
                    discriminator={1337}
                    avatar={'https://cdn.discordapp.com/avatars/814857877637562379/4590cda57f4c1544756f16e2ec37deec.png?size=512'}
                    banner={'https://cdn.discordapp.com/attachments/866686986159783947/1041624529950212116/SPOILER_DSC02284.JPG'} />;
};
