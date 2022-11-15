import { Box, LinearProgress, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled(Box)`
  background-color: #000000aa;
`;

type Props = Record<string, never>;

export const LoadingScreen: FC<Props> = () => {
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    setDescription('Authorizing...');
    setTimeout(() => setDescription('Loading user...'), 3000);
    setTimeout(() => setDescription('Loading messages...'), 7000);
    const interval = setInterval(() => {
      setProgress((progress) => progress + 10 > 100 ? 0 : progress + 10);
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Container sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }}>
    {description ? <Typography gutterBottom
                               variant={'h4'}
                               sx={{ textAlign: 'center' }}
                               color={'white'}>
      {description}
    </Typography> : null}

    <LinearProgress variant={'determinate'}
                    sx={{
                      width: '50%',
                      '& .MuiLinearProgress-bar': {
                        // transitionDuration: '500ms'
                      }
                    }}
                    value={progress} />
  </Container>;
};
