import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import withAuth from '@/features/Auth/withAuth'
import {
  AppBar, Toolbar, Box, Typography, Button, Link as MuiLink,
  IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { selectUserInfo } from '@/store/selectors/authSelectors'
import { logoutUser } from '@/store/actions/authActions'
import { persistor } from '@/store/store'
import { AppDispatch } from '@/store/store'

const navLinks = ['Solutions', 'Team', 'Contact']

const DashboardPage: React.FC = () => {
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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
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
          >
            <Box component="span" sx={{ color: '#1B2A4A' }}>
              Stratag
            </Box>
            <Box component="span" sx={{ color: '#5B9A4D' }}>
              ease
            </Box>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, md: 5 } }}>
            {navLinks.map((label) => (
              <MuiLink
                key={label}
                href={`#${label.toLowerCase()}`}
                underline="none"
                sx={{
                  color: '#1B2A4A',
                  fontWeight: 500,
                  fontSize: '1rem',
                  '&:hover': { color: '#5B9A4D' },
                }}
              >
                {label}
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

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EDEDEE',
          px: 3,
          py: 8,
        }}
      >
        <Box sx={{ maxWidth: 800, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.1,
              color: '#1B2A4A',
              mb: 3,
            }}
          >
            Making Complex Life{' '}
            <br />
            Tasks{' '}
            <Box component="span" sx={{ color: '#5B9A4D' }}>
              Simple
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: '#4A5568',
              maxWidth: 600,
              mx: 'auto',
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            {"Strategy apps that gives you certainty and confidence to tackle and control life's challenges with ease"}
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: '#5B9A4D',
              color: '#FFFFFF',
              borderRadius: '50px',
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(91, 154, 77, 0.35)',
              '&:hover': {
                backgroundColor: '#4E8A42',
                boxShadow: '0 6px 20px rgba(91, 154, 77, 0.45)',
              },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withAuth(DashboardPage)
