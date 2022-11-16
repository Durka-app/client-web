import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import { addGuild, reducer as guildsReducer, selectGuild } from '../features/guilds/slice';
import { addChannel, reducer as channelReducer, selectChannel } from '../features/channels/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    guilds: guildsReducer,
    channels: channelReducer
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
}
