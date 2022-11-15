import { FC } from 'react';
import { Box, Fade, Paper, Popper, Typography } from '@mui/material';

type PaperProps = {
  inline: boolean;
}

export const MemberPaper: FC<PaperProps> = ({ inline }) => {
  return <Paper elevation={inline ? 1 : 4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '24em'
                }}>
    <img src={'https://cdn.discordapp.com/attachments/866686986159783947/1041624529950212116/SPOILER_DSC02284.JPG'}
         style={{
           width: '100%',
           height: '6em',
           borderRadius: 'inherit',
           userSelect: 'none'
         }} />

    <Box sx={{
      height: '3em',
      userSelect: 'none'
    }}>
      <img src={'https://cdn.discordapp.com/avatars/814857877637562379/2ce23f9513b1539317645ede22a298b0.png?size=512'}
           style={{
             position: 'relative',
             width: '8em',
             height: '8em',
             top: '-5em',
             borderRadius: '50%',
             border: `4px solid #f44336`
           }} />
    </Box>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      px: 2,
      pt: 1,
      mb: 1
    }}>
      <Typography variant={'h5'}>Lann#1337</Typography>
      <Typography variant={'h6'}>$5 за мiсяць чухання</Typography>
    </Box>
  </Paper>;
};

type Props = {
  anchor: HTMLElement;
  open: boolean;
  onClosed: () => void;
};

export const MemberPopover: FC<Props> = ({
  anchor,
  open,
  onClosed
}) => {
  const canBeOpen = open && Boolean(anchor);
  const id = canBeOpen ? 'member-popover' : undefined;

  return <Popper id={id}
                 open={open}
                 anchorEl={anchor}
                 placement={'left'}
                 modifiers={[
                   { name: 'offset', options: { offset: [0, 16] } },
                   { name: 'preventOverflow', options: { padding: 16, tether: false } }
                 ]}
                 transition={true}>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps}
            onExited={onClosed}
            timeout={150}>
        <Box>
          <MemberPaper inline={false} />
        </Box>
      </Fade>
    )}
  </Popper>;
};
