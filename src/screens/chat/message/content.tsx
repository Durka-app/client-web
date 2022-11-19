import { FC } from 'react';
import { Typography } from '@mui/material';

export type MessageProps = {
  content: string;
};

export const MessageContent: FC<MessageProps> = ({
  content
}) => {
  return <Typography sx={{}}>{content}</Typography>;
};
