import { AttachFile } from '@mui/icons-material';
import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react';
import { Box, IconButton, TextField, useTheme } from '@mui/material';

import { addMessage, editMessage, MessageState } from '../../../features/messages/slice';
import { getSelectedGuild } from '../../../features/guilds/slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getSelectedChannel } from '../../../features/channels/slice';

export const Input: FC = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const guild = useAppSelector(getSelectedGuild);
  const channel = useAppSelector(guild ? getSelectedChannel(guild.id) : () => null);
  if(!channel) return <h1>No selected channel</h1>; // TODO

  const [content, setContent] = useState('');

  const onContentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }, [setContent]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter' && !event.shiftKey) {
      if(content.trim().length < 1) return;

      const id = `${Date.now()}`;
      dispatch(addMessage({
        id: id,
        channel: channel.id,
        author: '1',
        content: content,
        state: MessageState.Sending
      }));
      setContent('');

      setTimeout(() => dispatch(editMessage({
        id: id,
        state: MessageState.None
      })), 1000);

      event.preventDefault();
    }
  }, [dispatch, content, setContent]);

  return <Box sx={{
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    px: 1,
    py: 2
  }}>
    <IconButton sx={{
      height: 'auto',
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    }}>
      <AttachFile />
    </IconButton>

    <TextField variant={'standard'}
               type={'text'}
               placeholder={'Message'}
               multiline={true}
               maxRows={20}
               autoComplete={'off'}
               value={content}
               onChange={onContentChange}
               onKeyDown={onKeyDown}
               sx={{
                 flex: '1 0 auto',
                 ml: 1
               }} />
  </Box>;
};
