import React from 'react'
import withAuth from '@/features/Auth/withAuth'
import { Box } from '@mui/material'
import TopNavbar from '@/components/layout/TopNavbar'
import Profile from '@/features/Profile'

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#EDEDEE' }}>
      <TopNavbar />
      <Box sx={{ flex: 1, py: 4, px: 2 }}>
        <Profile />
      </Box>
    </Box>
  )
}

export default withAuth(ProfilePage)
