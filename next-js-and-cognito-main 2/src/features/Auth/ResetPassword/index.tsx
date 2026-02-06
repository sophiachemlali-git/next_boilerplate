import React, { useState } from 'react'
import Image from 'next/image'
import SendCode from '../SendCode'
import CreatePassword from '../CreatePassword'
import Notification from '@/components/ui/Notification'
import Link from '@/components/ui/Link'
import LockResetIcon from '@mui/icons-material/LockResetOutlined'

import { Grid, Box, Paper, Typography, Avatar } from '@mui/material'

enum Messages {
  SEND_CODE = 'Lost your password? Please enter your email address. You will receive a verification code which you will use to create your new password in the next step.',
  CREATE_PASSWORD = 'Enter the verification code you received by email and enter a new password',
}

const ResetPasswordForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [email, setEmail] = useState<string>('')

  const handleNextStep = (email: string) => {
    setEmail(email)
    setCurrentStep(currentStep + 1)
  }

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSuccess = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <Grid aria-label="Reset Password" container component="section" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: t =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: { xs: 8, sm: 10 },
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary" textAlign="center">
            Reset your Password
          </Typography>

          {currentStep === 1 && (
            <SendCode description={Messages.SEND_CODE} onNextStep={handleNextStep} />
          )}
          {currentStep === 2 && (
            <CreatePassword
              username={email}
              description={Messages.CREATE_PASSWORD}
              onBack={handleBackStep}
              onSuccess={handleSuccess}
            />
          )}
          {currentStep === 3 && (
            <Box
              sx={{
                mt: 5,
              }}
            >
              <Notification
                severity="success"
                title="Success"
                message="Your password has been updated successfully!"
              />
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
            <Link href="/">{currentStep === 3 ? 'Go to Login' : 'Remember your password?'}</Link>
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'center',
              mt: 8,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 200,
                height: 60,
              }}
            >
              <Image src="/images/logo.webp" alt="Logo" objectFit="contain" fill />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ResetPasswordForm
