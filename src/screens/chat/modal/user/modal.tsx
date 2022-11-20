import {
  AllInclusive, ArrowDropDown, Block, BugReport, Cake, Call, Code, Construction, Coronavirus, Fingerprint, GitHub,
  HowToReg, PersonRemove, YouTube
} from '@mui/icons-material';
import { FC, MouseEvent, ReactNode, SyntheticEvent, useCallback, useRef, useState } from 'react';
import {
  Box, Button, ButtonGroup, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper, Tab, Tabs, Typography,
  useTheme
} from '@mui/material';

import { UserBadge } from './badge';
import { useScreen } from '../../../stack';
import { UserConnection } from './connection';
import { elevate } from '../../../../utils/colors';
import { UserActivity } from './activity';
import { padDiscriminator } from '../../../../features/members/slice';
import { Bitfield } from '../../../../utils/bitfield';
import { UserFlags } from '../../../../features/users/slice';

export type UserModalProps = {
  id: Snowflake;
  username: string;
  discriminator: number;
  flags: number;
  avatar: Nullable<string>;
  banner: Nullable<string>;
};

interface TabPanelProps {
  visible: boolean;

  children?: ReactNode;
}

const TabPanel: FC<TabPanelProps> = ({ visible, children }) => {
  if(!visible) return null;

  return <Box sx={{ p: 2 }}>
    {children}
  </Box>;
};

export const UserModal: FC<UserModalProps> = ({
  id,
  username, discriminator,
  flags,
  avatar, banner
}) => {
  const [, close] = useScreen();
  const theme = useTheme();

  const bitfield = new Bitfield(flags);

  /* Actions */
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const onSendMessageClick = useCallback(() => {
    console.info(`You clicked send-message`);
  }, []);

  const onActionClick = useCallback((event: MouseEvent<HTMLLIElement>, key: string) => {
    setOpen(false);
    console.info(`You clicked ${key}`);
  }, [setOpen]);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  const handleClose = useCallback((event: Event) => {
    if(event.target instanceof HTMLElement && anchorRef.current?.contains(event.target)) return;
    setOpen(false);
  }, [setOpen]);

  /* Tabs */
  const [tab, setTab] = useState('personal');

  const handleChange = useCallback((event: SyntheticEvent, tab: string) => {
    setTab(tab);
  }, [setTab]);

  /* Close */
  const onModalClose = useCallback(() => close(), [close]);

  return <Box sx={{
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa'
  }}>
    <ClickAwayListener onClickAway={onModalClose} mouseEvent={'onMouseUp'}>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '40em'
      }}>
        <img src={banner!}
             style={{
               width: '100%',
               height: '10em',
               borderTopLeftRadius: 'inherit',
               borderTopRightRadius: 'inherit',
               userSelect: 'none'
             }} />

        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          mx: 2,
          userSelect: 'none'
        }}>
          <img src={avatar!}
               style={{
                 position: 'absolute',
                 width: '8em',
                 height: '8em',
                 left: 0,
                 top: '-4.5em',
                 borderRadius: '50%',
                 border: `4px solid #f44336`
               }} />

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2
          }}>
            <ButtonGroup ref={anchorRef}
                         variant={'contained'}
                         color={'success'}>
              <Button onClick={onSendMessageClick}>Send message</Button>
              <Button size={'small'}
                      onClick={handleToggle}>
                <ArrowDropDown />
              </Button>
            </ButtonGroup>

            <Popper open={open}
                    anchorEl={anchorRef.current}
                    transition={true}
                    disablePortal={true}
                    sx={{
                      zIndex: 1
                    }}>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                      }}>
                  <Paper elevation={3}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList disablePadding={true}>
                        <MenuItem onClick={(event) => onActionClick(event, 'remove-friend')}
                                  sx={{ py: 1.5, color: theme.palette.error.main }}>
                          <PersonRemove sx={{ mr: 1.5 }} />
                          Remove from friends
                        </MenuItem>

                        <MenuItem onClick={(event) => onActionClick(event, 'block')}
                                  sx={{ py: 1.5, color: theme.palette.error.main }}>
                          <Block sx={{ mr: 1.5 }} />
                          Block
                        </MenuItem>

                        <Divider sx={{
                          '&.MuiDivider-root.MuiDivider-fullWidth': {
                            my: 0
                          }
                        }} />

                        <MenuItem onClick={(event) => onActionClick(event, 'copy-id')}
                                  sx={{ py: 1.5 }}>
                          <Fingerprint sx={{ mr: 1.5 }} />
                          Copy ID
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          px: 2,
          py: 1
        }}>
          <Box sx={{
            display: 'flex'
          }}>
            <Typography variant={'h5'}>{username}#{padDiscriminator(discriminator)}</Typography>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              maxWidth: '11em',
              px: 0.5,
              py: 0.5,
              ml: 1,
              gap: 0.5,
              borderRadius: 1,
              backgroundColor: elevate(theme.palette.background.paper, 1)
            }}>
              {bitfield.all(UserFlags.Staff)
               ? <UserBadge name={'Staff'}
                            icon={<Construction color={'primary'} />} /> : null}
              {bitfield.all(UserFlags.Developer)
               ? <UserBadge name={'Developer'}
                            icon={<Code color={'warning'} />} /> : null}
              {bitfield.all(UserFlags.BugHunter)
               ? <UserBadge name={'Bug Hunter'}
                            icon={<BugReport color={'primary'} />} /> : null}
              {bitfield.all(UserFlags.Supporter)
               ? <UserBadge name={'Supporter'}
                            icon={<AllInclusive color={'warning'} />} /> : null}
              {bitfield.all(UserFlags.BotDeveloper)
               ? <UserBadge name={'Bot Developer'}
                            icon={<Code sx={{
                              borderRadius: 1.5,
                              backgroundColor: theme.palette.success.main,
                              color: theme.palette.background.paper
                            }} />} /> : null}
              {bitfield.all(UserFlags.Birthday)
               ? <UserBadge name={'Birthday'}
                            icon={<Cake color={'warning'} />} /> : null}
              {bitfield.all(UserFlags.Verified)
               ? <UserBadge name={'Verified'}
                            icon={<HowToReg color={'primary'} />} /> : null}
              {bitfield.all(UserFlags.COVID19Vaccinated)
               ? <UserBadge name={'COVID-19 Vaccinated'}
                            icon={<Coronavirus color={'success'} />} />
               : null}
            </Box>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab}
                onChange={handleChange}>
            <Tab label='Personal info'
                 value={'personal'} />
            <Tab label='Connections'
                 value={'connections'} />
            <Tab label='Activity'
                 value={'activity'} />
            <Tab label='Mutual guilds'
                 value={'guilds'}
                 disabled={true} />
          </Tabs>
        </Box>

        <TabPanel visible={tab === 'personal'}>
          <Typography fontWeight={600}
                      sx={{
                        mb: 0.5,
                        userSelect: 'none'
                      }}>About me</Typography>
          <Typography sx={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre-wrap'
          }}>
            I want to live in
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' style={{
              width: '1.25em',
              marginLeft: '0.25em'
            }}>
              <path fill='#EEE'
                    d='M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z' />
              <circle fill='#ED1B2F' cx='18' cy='18' r='7' />
            </svg>.
          </Typography>
        </TabPanel>

        <TabPanel visible={tab === 'connections'}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}>
            <UserConnection name={'GitHub'}
                            icon={<GitHub />}
                            username={'Assasans'}
                            url={'https://github.com/Assasans'} />
            <UserConnection name={'YouTube'}
                            icon={<YouTube />}
                            username={'Assasans'}
                            url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} />
          </Box>
        </TabPanel>

        <TabPanel visible={tab === 'activity'}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <UserActivity type={'Playing'}
                          name={<Typography fontWeight={600}>Genshin Impact</Typography>}
                          icon={
                            <img src={'https://cdn.discordapp.com/app-icons/762434991303950386/eb0e25b739e4fa38c1671a3d1edcd1e0.png?size=512'}
                                 style={{
                                   width: '3em',
                                   height: '3em',
                                   borderRadius: '4px',
                                   userSelect: 'none'
                                 }} />
                          } />

            <UserActivity type={'Calling'}
                          name={<Typography fontWeight={600}>OLX</Typography>}
                          icon={
                            <Call sx={{
                              width: '3rem',
                              height: '3rem',
                              borderRadius: '4px',
                              userSelect: 'none'
                            }} />
                          } />
          </Box>
        </TabPanel>

        <TabPanel visible={tab === 'guilds'}>TODO</TabPanel>
      </Paper>
    </ClickAwayListener>
  </Box>;
};
