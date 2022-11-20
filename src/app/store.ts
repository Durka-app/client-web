import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import { addGuild, reducer as guildsReducer, selectGuild } from '../features/guilds/slice';
import { addChannel, reducer as channelsReducer, selectChannel } from '../features/channels/slice';
import { addMember, reducer as membersReducer } from '../features/members/slice';
import { addMessage, MessageState, reducer as messagesReducer } from '../features/messages/slice';
import { addUser, reducer as usersReducer, UserFlags } from '../features/users/slice';
import { Bitfield } from '../utils/bitfield';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    guilds: guildsReducer,
    channels: channelsReducer,
    members: membersReducer,
    messages: messagesReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

store.dispatch(addGuild({
  id: '1',
  name: 'SCP Foundation',
  icon: 'https://cdn.discordapp.com/icons/646393082430095383/a_6a0a1b0d20da5c823542120c63cd88ec.png?size=512'
}));

store.dispatch(addGuild({
  id: '2',
  name: 'SUS Foundation',
  icon: 'https://cdn.discordapp.com/icons/852221026933669898/7c3e541a321ab13816aefae086b4d8b1.png?size=512'
}));

store.dispatch(addGuild({
  id: '3',
  name: 'DCP Foundation',
  icon: 'https://cdn.discordapp.com/icons/833440437397749770/8979b83158bd2088077598910af08eb4.png?size=512'
}));

store.dispatch(selectGuild('1'));

store.dispatch(addUser({
  id: '1',
  username: 'Lann',
  discriminator: 1337,
  flags: new Bitfield([
    UserFlags.Staff,
    UserFlags.Developer,
    UserFlags.BugHunter,
    UserFlags.Supporter,
    UserFlags.BotDeveloper,
    UserFlags.Birthday,
    UserFlags.Verified,
    UserFlags.COVID19Vaccinated
  ]).valueOf(),
  avatar: 'https://cdn.discordapp.com/avatars/814857877637562379/4590cda57f4c1544756f16e2ec37deec.png?size=512',
  banner: 'https://cdn.discordapp.com/attachments/866686986159783947/1041624529950212116/SPOILER_DSC02284.JPG'
}));

store.dispatch(addUser({
  id: '2',
  username: 'Марии',
  discriminator: 2012,
  flags: new Bitfield([
    UserFlags.Verified,
    UserFlags.Staff,
    UserFlags.BugHunter,
    UserFlags.COVID19Vaccinated
  ]).valueOf(),
  avatar: 'https://cdn.discordapp.com/avatars/749926631769899030/de293601eb50a1254092a357d737f19a.png?size=512',
  banner: null // TODO
}));

for(const guild of Object.values(store.getState().guilds.guilds)) {
  for(let index = 0; index < 10; index++) {
    store.dispatch(addChannel({
      id: `${guild.id}${index}`,
      guild: guild.id,
      name: `${guild.name.slice(0, 3).toLowerCase()}-chan${index}`
    }));

    for(let message = 0; message < 20; message++) {
      if(message % 5 !== 0) {
        store.dispatch(addMessage({
          id: `${guild.id}${index}${message}`,
          channel: `${guild.id}${index}`,
          author: '1',
          content: `Test message ${guild.name.slice(0, 3)}-${index}-${message}`,
          state: MessageState.None
        }));
      } else {
        store.dispatch(addMessage({
          id: `${guild.id}${index}${message}`,
          channel: `${guild.id}${index}`,
          author: '2',
          content: `Test message ${guild.name.slice(0, 3)}-${index}-${message}`,
          state: MessageState.None
        }));
      }
    }
  }

  store.dispatch(selectChannel(`${guild.id}0`));

  store.dispatch(addMember({
    user: '1',
    guild: guild.id,
    nickname: `Lann (on ${guild.name.slice(0, 3)})`,
    avatar: null,
    banner: null
  }));

  store.dispatch(addMember({
    user: '2',
    guild: guild.id,
    nickname: null,
    avatar: null,
    banner: null
  }));
}
