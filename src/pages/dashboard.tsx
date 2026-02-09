import React from 'react'
import withAuth from '@/features/Auth/withAuth'
import Drawerlayout from '@/layout/DrawerLayout'
import { Box, Typography } from '@mui/material'

const DashboardPage: React.FC = () => {
  return (
    <Drawerlayout>
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EDEDEE',
          px: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            textAlign: 'center',
          }}
        >
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
              lineHeight: 1.6,
            }}
          >
            {"Strategy apps that gives you certainty and confidence to tackle and control life's challenges with ease"}
          </Typography>
        </Box>
      </Box>
    </Drawerlayout>
  )
}

export default withAuth(DashboardPage)
