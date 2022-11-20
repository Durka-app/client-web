import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { raise } from '../../utils/raise';
import { RootState } from '../../app/store';
import { getOr, putOr, removeOr } from '../../utils/map';

export const UserFlags = {
  Reserved0: 1 << 0,

  Staff: 1 << 1,
  Developer: 1 << 2,
  BugHunter: 1 << 3,
  Supporter: 1 << 4,
  BotDeveloper: 1 << 5,
  Birthday: 1 << 6,
  Verified: 1 << 7,
  COVID19Vaccinated: 1 << 8,

  Bot: 1 << 9
};

export interface User {
  id: Snowflake;
  username: string;
  discriminator: number;

  flags: number;

  avatar: Nullable<string>;
  banner: Nullable<string>;
}

export interface UsersState {
  // Map<#User, User>
  users: Record<Snowflake, User>;
}

const initialState: UsersState = {
  users: {}
};

export const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<User>) => {
      putOr(
        state.users,
        payload.id,
        payload,
        raise(() => new Error(`User ${payload.id} is already present in the store`))
      );
    },
    remove: (state, { payload }: PayloadAction<Snowflake>) => {
      removeOr(
        state.users,
        payload,
        raise(() => new Error(`User ${payload} is not present in the store`))
      );
    }
  }
});

export const {
  add: addUser,
  remove: removeUser
} = slice.actions;

export const getUser = (id: Snowflake) => (state: RootState) => {
  return getOr(
    state.users.users,
    id,
    raise(() => new Error(`User ${id} is not present in the store`))
  );
};

export const reducer = slice.reducer;
