import { FC, useCallback } from 'react';

import { Channel } from './channel';
import { getOr } from '../../../utils/map';
import { raise } from '../../../utils/raise';
import { useAppSelector } from '../../../app/hooks';

export type ConnectedChannelProps = {
  id: Snowflake;

  onSelect?: (id: Snowflake) => void;
  onSettingsClick?: (id: Snowflake) => void;
};

export const ConnectedChannel: FC<ConnectedChannelProps> = ({
  id,
  onSelect, onSettingsClick
}) => {
  const channel = useAppSelector((state) => getOr(
    state.channels.channels,
    id,
    raise(() => new Error(`Channel ${id} is not present in the store`))
  ));

  const selected = useAppSelector((state) => state.channels.selected[channel.guild] === channel.id);

  const onSelectHandler = useCallback(() => onSelect?.(id), [onSelect]);
  const onSettingsClickHandler = useCallback(() => onSettingsClick?.(id), [onSettingsClick]);

  return <Channel id={channel.id}
                  name={channel.name}
                  selected={selected}
                  onSelect={onSelectHandler}
                  onSettingsClick={onSettingsClickHandler} />;
};
