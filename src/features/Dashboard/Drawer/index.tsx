import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import UserIcon from '@mui/icons-material/AccountCircleOutlined'
import Copyright from '@/components/ui/Copyright'

import { useRouter } from 'next/router'
import { useAppDispatch, persistor } from '@/store/store'
import { logoutUser } from '@/store/actions/authActions'

type MainLinkProps = {
  label: string
  path: string
  icon: React.ReactElement
}

type UserDataProps = {
  name?: string | null
  email?: string | null
}

export interface DrawerProps {
  children: React.ReactNode
  mainLinks: MainLinkProps[]
  userData: UserDataProps
}

const drawerWidth = 270

export default function ResponsiveDrawer(props: DrawerProps) {
  const { children, mainLinks, userData } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const isActive = (path: string) => router.pathname === path

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    const logoutCallback = () => {
      persistor.purge()
      sessionStorage.clear()
      router.push('/login')
    }

    dispatch(logoutUser({ callback: logoutCallback }))
  }

  const drawer = (
    <Box
      sx={{
        height: '100%',
        maxHeight: '100vh',
      }}
      data-testid="drawer-list"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <Toolbar
            sx={{
              margin: 2,
              display: 'flex',
            }}
          >
            <NextLink href="/dashboard">
              <Image src="/images/logo.webp" alt="Logo" fill objectFit="contain" />
            </NextLink>
          </Toolbar>
          <Divider />
          <List>
            {mainLinks?.map(mainLink => (
              <ListItem key={mainLink.label} disablePadding>
                <ListItemButton
                  selected={isActive(mainLink.path)}
                  onClick={() => router.push(mainLink.path)}
                >
                  <ListItemIcon>{mainLink.icon}</ListItemIcon>
                  <ListItemText
                    primary={mainLink.label}
                    primaryTypographyProps={{ color: 'primary', sx: { fontWeight: '500' } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={isActive('/profile')}
                onClick={() => router.push('/profile')}
              >
                <ListItemIcon>
                  <UserIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={userData.name || 'My Profile'}
                  primaryTypographyProps={{ color: 'primary', sx: { fontWeight: '500' } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ mt: 1 }}>
              <ListItemButton onClick={handleLogout} data-testid="logout-button">
                <ListItemIcon>
                  <LogoutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ color: 'primary', sx: { fontWeight: '500' } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem sx={{ mt: 1, display: 'flex', justifyContent: 'center', height: '100%' }}>
              <Copyright websiteName="Your Website" />
            </ListItem>
          </List>
          <Divider sx={{ mt: 2 }} />
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { sm: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'primary.light',
        }}
      >
        <Toolbar
          sx={{
            display: { sm: 'none' },
          }}
        />
        {children}
      </Box>
    </Box>
  )
}
