import { FC, useCallback } from 'react';

import { Guild } from './guild';
import { getOr } from '../../../utils/map';
import { raise } from '../../../utils/raise';
import { useAppSelector } from '../../../app/hooks';

export type ConnectedGuildProps = {
  id: Snowflake;
  onSelect?: (id: Snowflake) => void;
}

export const ConnectedGuild: FC<ConnectedGuildProps> = ({ id, onSelect }) => {
  const guild = useAppSelector((state) => getOr(
    state.guilds.guilds,
    id,
    raise(() => new Error(`Guild ${id} is not present in the store`))
  ));

  const selected = useAppSelector((state) => state.guilds.selected === guild.id);

  const onClick = useCallback(() => onSelect?.(id), [onSelect]);

  return <Guild id={guild.id}
                name={guild.name}
                icon={guild.icon}
                selected={selected}
                unread={(Number(id) % 2) == 0}
                onClick={onClick} />;
};
