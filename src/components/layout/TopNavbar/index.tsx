import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar, Toolbar, Box, Typography, Link as MuiLink,
  IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import { selectUserInfo } from '@/store/selectors/authSelectors'
import { logoutUser } from '@/store/actions/authActions'
import { persistor } from '@/store/store'
import { AppDispatch } from '@/store/store'

const navLinks = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '#contact' },
]

const TopNavbar: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const userInfo = useSelector(selectUserInfo)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleLogout = () => {
    setAnchorEl(null)
    const logoutCallback = () => {
      persistor.purge()
      sessionStorage.clear()
      router.push('/login')
    }
    dispatch(logoutUser({ callback: logoutCallback }))
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, fontSize: '1.5rem', cursor: 'pointer' }}
          onClick={() => router.push('/dashboard')}
        >
          <Box component="span" sx={{ color: '#1B2A4A' }}>
            Stratag
          </Box>
          <Box component="span" sx={{ color: '#5B9A4D' }}>
            ease
          </Box>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, md: 5 } }}>
          {navLinks.map((link) => (
            <MuiLink
              key={link.label}
              href={link.href}
              underline="none"
              onClick={(e: React.MouseEvent) => {
                if (!link.href.startsWith('#')) {
                  e.preventDefault()
                  router.push(link.href)
                }
              }}
              sx={{
                color: '#1B2A4A',
                fontWeight: 500,
                fontSize: '1rem',
                '&:hover': { color: '#5B9A4D' },
              }}
            >
              {link.label}
            </MuiLink>
          ))}

          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ ml: 1 }}
            aria-label="Account menu"
          >
            <AccountCircleIcon sx={{ fontSize: 32, color: '#1B2A4A' }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: { mt: 1, minWidth: 180 },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1B2A4A' }}>
                {userInfo.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#4A5568' }}>
                {userInfo.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); router.push('/profile') }}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNavbar
