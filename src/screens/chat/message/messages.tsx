import { FC } from 'react';
import { Box } from '@mui/material';

import { MessageGroup } from './group';
import { MessageContent } from './content';
import { raise } from '../../../utils/raise';
import { getOr, putOr } from '../../../utils/map';
import { useAppSelector } from '../../../app/hooks';
import { getGuildMembers } from '../../../features/members/slice';
import { getSelectedGuild } from '../../../features/guilds/slice';
import { getSelectedChannel } from '../../../features/channels/slice';
import { getChannelMessages, Message } from '../../../features/messages/slice';

export const ChatMessages: FC = () => {
  const guild = useAppSelector(getSelectedGuild);
  const channel = useAppSelector(guild ? getSelectedChannel(guild.id) : () => null);
  const messages = useAppSelector(channel ? getChannelMessages(channel.id) : () => ({}));
  const members = useAppSelector(channel ? getGuildMembers(channel.guild) : () => ({}));

  if(!guild) return <h1>No selected guild</h1>; // TODO

  let lastAuthor: Nullable<Snowflake> = Object.values(messages)[0].author;
  const groups: Record<Snowflake, Message>[] = [];
  let group: Record<Snowflake, Message> = {};
  for(const message of Object.values(messages)) {
    const newGroup = message.author !== lastAuthor;
    if(newGroup) {
      // console.log('Finalize group', groups.length);
      groups.push(group);
      group = {};
    }

    lastAuthor = message.author;

    // console.log('Add message', message, 'to group', groups.length);
    putOr(
      group,
      message.id,
      message,
      raise(() => new Error(`Message ${message.id} is already present in the group`))
    );
  }
  if(Object.values(group).length > 0) {
    groups.push(group);
    group = {};
  }

  return <Box sx={{
    display: 'flex',
    flex: '1 0 0',
    flexDirection: 'column',
    py: 2,
    overflowY: 'auto'
  }}>
    {groups.map((group) => {
      const firstMessage = Object.values(group)[0];
      const author = getOr(
        members,
        firstMessage.author,
        raise(() => new Error(`Member ${firstMessage.author} (guild: ${guild.id}) is not present in the store`))
      );

      return <MessageGroup key={firstMessage.id}
                           channel={firstMessage.channel}
                           author={author}>
        {Object.values(group).map((message) => (
          <MessageContent key={message.id}
                          content={message.content} />
        ))}
      </MessageGroup>;
    })}
  </Box>;
};
