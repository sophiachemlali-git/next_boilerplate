import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Box, Typography, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function Home() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
          <Box
            component="span"
            sx={{ color: '#5B9A4D' }}
          >
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
          onClick={() => router.push('/login')}
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
  )
}
