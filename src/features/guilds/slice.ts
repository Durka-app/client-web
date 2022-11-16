import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { raise } from '../../utils/raise';
import { getOr, putOr, removeOr } from '../../utils/map';
import { RootState } from '../../app/store';

export interface Guild {
  id: Snowflake;
  name: string;
  icon: Nullable<string>;
}

export interface GuildsState {
  guilds: Record<Snowflake, Guild>;
  selected: Nullable<Snowflake>;
}

const initialState: GuildsState = {
  guilds: {},
  selected: null
};

export const slice = createSlice({
  name: 'guilds',
  initialState: initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Guild>) => {
      putOr(
        state.guilds,
        payload.id,
        payload,
        raise(() => new Error(`Guild ${payload.id} is already present in the store`))
      );
    },
    remove: (state, { payload }: PayloadAction<Snowflake>) => {
      removeOr(state.guilds, payload, raise(() => new Error(`Guild ${payload} is not present in the store`)));
    },
    select: (state, { payload }: PayloadAction<Snowflake>) => {
      const guild = getOr(
        state.guilds,
        payload,
        raise(() => new Error(`Guild ${payload} is not present in the store`))
      );
      state.selected = guild.id;
    }
  }
});

export const {
  add: addGuild,
  remove: removeGuild,
  select: selectGuild
} = slice.actions;

export const getSelectedGuild = (state: RootState) => state.guilds.selected ? getOr(
  state.guilds.guilds,
  state.guilds.selected,
  raise(() => new Error(`Guild ${state.guilds.selected} is not present in the store (state error)`))
) : null;

export const reducer = slice.reducer;
