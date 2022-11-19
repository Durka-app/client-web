import { FC } from 'react';
import { Typography } from '@mui/material';

import { MessageState } from '../../../features/messages/slice';

export type MessageProps = {
  content: string;
  state: MessageState;
};

export const MessageContent: FC<MessageProps> = ({
  content,
  state
}) => {
  return <Typography sx={{
    whiteSpace: 'pre-wrap',
    ...(state === MessageState.Sending && {
      opacity: 0.65
    })
  }}>{content}</Typography>;
};
