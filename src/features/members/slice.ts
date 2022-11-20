import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { raise } from '../../utils/raise';
import { RootState } from '../../app/store';
import { getOr, getOrPut, putOr, removeOr } from '../../utils/map';

export interface Member {
  user: Snowflake;
  guild: Snowflake;
  nickname: Nullable<string>;

  /* Guild override */
  avatar: Nullable<string>;
  banner: Nullable<string>;
}

export interface MembersState {
  // Map<#Guild, Map<#User, Member>>
  members: Record<Snowflake, Record<Snowflake, Member>>;
}

const initialState: MembersState = {
  members: {}
};

export const slice = createSlice({
  name: 'members',
  initialState: initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Member>) => {
      const members = getOrPut(state.members, payload.guild, () => ({}));
      putOr(
        members,
        payload.user,
        payload,
        raise(() => new Error(`Member ${payload.user} (guild: ${payload.guild}) is already present in the store`))
      );
    },
    remove: (state, { payload }: PayloadAction<{ guild: Snowflake; user: Snowflake; }>) => {
      const members = getOr(
        state.members,
        payload.guild,
        raise(() => new Error(`Member ${payload.user} (guild: ${payload.guild}) is not present in the store (no guild)`))
      );

      removeOr(
        members,
        payload.user,
        raise(() => new Error(`Member ${payload.user} (guild: ${payload.guild}) is not present in the store`))
      );
    }
  }
});

export const {
  add: addMember,
  remove: removeMember
} = slice.actions;

export const getGuildMembers = (guild: Snowflake) => (state: RootState) => {
  return getOr<Snowflake, Record<Snowflake, Member>>(state.members.members, guild, () => ({}));
};

export const getMember = (guild: Snowflake, user: Snowflake) => (state: RootState) => {
  const members = getOr(
    state.members.members,
    guild,
    raise(() => new Error(`Member ${user} (guild: ${guild}) is not present in the store (no guild)`))
  );

  return getOr(
    members,
    user,
    raise(() => new Error(`Member ${user} (guild: ${guild}) is not present in the store`))
  );
};

export const reducer = slice.reducer;

export function padDiscriminator(discriminator: number) {
  return discriminator.toString().padStart(4, '0');
}
