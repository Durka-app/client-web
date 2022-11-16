import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import { addGuild, reducer as guildsReducer, selectGuild } from '../features/guilds/slice';
import { addChannel, reducer as channelsReducer, selectChannel } from '../features/channels/slice';
import { addMember, reducer as membersReducer } from '../features/members/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    guilds: guildsReducer,
    channels: channelsReducer,
    members: membersReducer
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

for(const guild of Object.values(store.getState().guilds.guilds)) {
  for(let index = 0; index < 10; index++) {
    store.dispatch(addChannel({
      id: `${guild.id}${index}`,
      guild: guild.id,
      name: `${guild.name.slice(0, 3).toLowerCase()}-chan${index}`
    }));
  }

  store.dispatch(selectChannel(`${guild.id}0`));

  store.dispatch(addMember({
    id: '1',
    guild: guild.id,
    username: `Lann (on ${guild.name.slice(0, 3)})`,
    discriminator: 1337,
    avatar: 'https://cdn.discordapp.com/avatars/814857877637562379/2ce23f9513b1539317645ede22a298b0.png?size=512',
    banner: 'https://cdn.discordapp.com/attachments/866686986159783947/1041624529950212116/SPOILER_DSC02284.JPG'
  }));
}
