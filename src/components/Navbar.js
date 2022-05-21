import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import BusinessIcon from '@mui/icons-material/Business';
import AttributionIcon from '@mui/icons-material/Attribution';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FenceIcon from '@mui/icons-material/Fence';
import DevicesIcon from '@mui/icons-material/Devices';
import {useHistory} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Icon = props => {
  const { iconName } = props;
  
  switch (iconName) {
    case "LocationSearchingIcon":   return <LocationSearchingIcon />;
    case "BusinessIcon":   return <BusinessIcon />;
    case "AttributionIcon":   return <AttributionIcon />;
    case "AccessibilityNewIcon":   return <AccessibilityNewIcon />;
    case "FenceIcon":   return <FenceIcon />;
    case "DevicesIcon":   return <DevicesIcon />;
    default: return <InfoIcon />;
  }
};


export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menu = [
    {
      id: "program",
      label: "Program",
      path: '/all_program',
      icon: "LocationSearchingIcon"
    },
    {
      id: "program_unggulan",
      label: "Program Unggulan",
      path: '/all_program_unggulan',
      icon: "LocationSearchingIcon"
    },
  ];

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("profile");
  };
  
  const handleLogout = () => {
    return history.push("/");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  sx={{ flexGrow: 1 }} noWrap component="div">
            YAKIN
          </Typography><Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Box sx={{ m: 2 }}>
              <Button sx={{ color:'white' }}>
                Program
              </Button>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button sx={{ color:'white' }}>
                Program Unggulan
              </Button>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button sx={{ color:'white' }}>
                Artikel
              </Button>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button sx={{ color:'white' }}>
                Donasi
              </Button>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button sx={{ color:'white' }}>
                Tentang Kami
              </Button>
            </Box>

          </Box>
          
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                </div> :
                <div>
                  <MenuItem onClick={() => history.push('/')}>Login</MenuItem>
                </div>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <div>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem button key={item.label} onClick={() => history.push(item.path)}>
                <ListItemIcon>
                  <Icon iconName={item.icon}/>
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        
      </div>
    </Box>
  );
}
