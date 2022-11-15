import { FC } from 'react';
import { Typography } from '@mui/material';

export type MessageProps = {
  content: string;
};

export const Message: FC<MessageProps> = ({
  content
}) => {
  return <Typography sx={{}}>{content}</Typography>;
};
