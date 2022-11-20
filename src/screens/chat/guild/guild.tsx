import { FC } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Box, Tooltip, useTheme } from '@mui/material';

import { when } from '../../../utils/when';
import { elevate } from '../../../utils/colors';

type Props = {
  id: Snowflake;
  name: string;
  icon: Nullable<string>;

  selected: boolean;
  unread: boolean;

  onClick?: () => void;
}

export const Guild: FC<Props> = ({
  id, name, icon,
  selected, unread,
  onClick
}) => {
  const theme = useTheme();

  return <Tooltip title={name}
                  placement={'right'}
                  arrow={true}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        px: 1.5,
                        py: 1,
                        fontSize: '1em',
                        userSelect: 'none',
                        backgroundColor: elevate(theme.palette.background.paper, -4),
                        color: theme.palette.text.primary,
                        boxShadow: '0 0px 6px 1px #00000077'
                      }
                    },
                    arrow: {
                      sx: {
                        color: elevate(theme.palette.background.paper, -4)
                      }
                    }
                  }}>
    <Box onClick={onClick}
         sx={{
           position: 'relative',
           display: 'flex',
           alignItems: 'center',
           borderRadius: selected ? '16px' : '50%',
           userSelect: 'none',
           transition: 'border-radius 200ms ease-in-out',
           ...(!selected && {
             // Round on hover (if not selected)
             '&:hover': {
               borderRadius: '16px'
             },
             // Expand on hover (if not selected)
             '&:hover .guild-pill': {
               height: '1.25em',
               left: '-0.5em'
             }
           })
         }}>
      <Box className={'guild-pill'}
           sx={{
             position: 'absolute',
             width: '0.25em',
             height: selected ? '2em' : '0.5em',
             left: '-1em',
             borderRadius: '0 8px 8px 0',
             pointerEvents: 'none',
             transitionProperty: 'height, left',
             transitionDuration: '200ms',
             transitionTimingFunction: 'ease-in-out',
             ...(when<boolean, SxProps<Theme>>(true, [
               [unread, () => ({ left: '-0.5em', backgroundColor: theme.palette.warning.main })],
               [selected, () => ({ left: '-0.5em', backgroundColor: theme.palette.primary.main })]
             ], () => ({ backgroundColor: theme.palette.primary.main })))
           }} />

      {/* TODO */}
      <img src={icon!}
           style={{
             width: '100%',
             borderRadius: 'inherit',
             cursor: 'pointer'
           }} />
    </Box>
  </Tooltip>;
};
