import { Tooltip, useTheme } from '@mui/material';
import { FC, ReactElement, ReactNode } from 'react';

import { elevate } from '../../../../utils/colors';

export type UserBadgeProps = {
  name: ReactNode;
  icon: ReactElement;
};

export const UserBadge: FC<UserBadgeProps> = ({ name, icon }) => {
  const theme = useTheme();

  return <Tooltip title={name}
                  placement={'top'}
                  arrow={true}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        px: 1,
                        py: 0.5,
                        userSelect: 'none',
                        backgroundColor: elevate(theme.palette.background.paper, 1),
                        color: theme.palette.text.primary
                      }
                    },
                    arrow: {
                      sx: {
                        color: elevate(theme.palette.background.paper, 1)
                      }
                    }
                  }}>
    {icon}
  </Tooltip>;
};
