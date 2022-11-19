import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { raise } from '../../utils/raise';
import { RootState } from '../../app/store';
import { getOr, putOr, removeOr } from '../../utils/map';

export enum MessageState {
  None,
  Sending
}

export interface Message {
  id: Snowflake;
  channel: Snowflake;
  author: Snowflake;

  content: string;

  state: MessageState;
}

export interface MessagesState {
  messages: Record<Snowflake, Message>;
}

const initialState: MessagesState = {
  messages: {}
};

export const slice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Message>) => {
      putOr(
        state.messages,
        payload.id,
        payload,
        raise(() => new Error(`Message ${payload.id} is already present in the store`))
      );
    },
    remove: (state, { payload }: PayloadAction<Snowflake>) => {
      removeOr(state.messages, payload, raise(() => new Error(`Message ${payload} is not present in the store`)));
    },
    edit: (state, { payload }: PayloadAction<{ id: Snowflake } & Partial<Message>>) => {
      void getOr(
        state.messages,
        payload.id,
        raise(() => new Error(`Message ${payload.id} is not present in the store`))
      );
      Object.assign(state.messages[payload.id], payload);
    }
  }
});

export const {
  add: addMessage,
  remove: removeMessage,
  edit: editMessage
} = slice.actions;

export const getChannelMessages = (channel: Snowflake) => (state: RootState) => {
  return Object.fromEntries(
    Object.entries(state.messages.messages)
          .filter(([id, message]) => message.channel === channel)
  );
};

export const reducer = slice.reducer;
