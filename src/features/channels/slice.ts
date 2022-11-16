import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { raise } from '../../utils/raise';
import { RootState } from '../../app/store';
import { getOr, putOr, removeOr } from '../../utils/map';

export interface Channel {
  id: Snowflake;
  guild: Snowflake;

  name: string;
}

export interface ChannelsState {
  channels: Record<Snowflake, Channel>;
  // Guild -> channel
  selected: Record<Snowflake, Nullable<Snowflake>>;
}

const initialState: ChannelsState = {
  channels: {},
  selected: {}
};

export const slice = createSlice({
  name: 'channels',
  initialState: initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Channel>) => {
      putOr(
        state.channels,
        payload.id,
        payload,
        raise(() => new Error(`Channel ${payload.id} is already present in the store`))
      );
    },
    remove: (state, { payload }: PayloadAction<Snowflake>) => {
      removeOr(state.channels, payload, raise(() => new Error(`Channel ${payload} is not present in the store`)));
    },
    select: (state, { payload }: PayloadAction<Snowflake>) => {
      const channel = getOr(
        state.channels,
        payload,
        raise(() => new Error(`Channel ${payload} is not present in the store`))
      );
      state.selected[channel.guild] = channel.id;
    }
  }
});

export const {
  add: addChannel,
  remove: removeChannel,
  select: selectChannel
} = slice.actions;

export const getGuildChannels = (guild: Snowflake) => (state: RootState) => {
  return Object.fromEntries(
    Object.entries(state.channels.channels)
          .filter(([id, channel]) => channel.guild === guild)
  );
};

export const getSelectedChannel = (guild: Snowflake) => (state: RootState) => {
  const channel = state.channels.selected[guild];
  if(!channel) return null;

  return state.channels.selected ? getOr(
    state.channels.channels,
    channel,
    raise(() => new Error(`Channel ${state.guilds.selected} is not present in the store (state error)`))
  ) : null;
};

export const reducer = slice.reducer;
