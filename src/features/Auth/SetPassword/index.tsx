import React, { useState, useEffect } from 'react'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'

import Image from 'next/image'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import Copyright from '@/components/ui/Copyright'
import ErrorValidation from '@/components/ui/ErrorValidation'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChangesOutlined'

import { useValidPassword } from '@/hooks/useValidation'
import { useAppDispatch } from '@/store/store'
import { completeLoginUser } from '@/store/actions/authActions'

import { selectError } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

const MESSAGE =
  "Do you have a temporary password? Don't worry, create your new password and enter our site."

const SetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const authError = useSelector(selectError)

  const passwordValidation = useValidPassword('')
  const confirmPasswordValidation = useValidPassword('', passwordValidation.value)

  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    setReset(true)
  }, [passwordValidation.value, confirmPasswordValidation.value])

  const areAllFieldsValid =
    passwordValidation.isValid &&
    passwordValidation.value &&
    confirmPasswordValidation.isValid &&
    confirmPasswordValidation.value &&
    passwordValidation.value === confirmPasswordValidation.value

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (areAllFieldsValid && !loading) {
      setLoading(true)

      try {
        await dispatch(
          completeLoginUser({
            password: passwordValidation.value,
          })
        )
        setReset(false)
      } catch (error) {
        console.error('Password validation:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Grid aria-label="Set Password" container component="section" sx={{ height: '100vh' }}>
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
            <PublishedWithChangesIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary" textAlign="center">
            Create your New Password
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="primary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              mt: 2,
            }}
          >
            {MESSAGE}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextFieldWithValidation
              label="New Password"
              type="password"
              hint={
                passwordValidation.errors && <ErrorValidation errors={passwordValidation.errors} />
              }
              validationHook={passwordValidation}
            />
            <TextFieldWithValidation
              label="Confirm Password"
              type="password"
              validationHook={confirmPasswordValidation}
              hint={
                confirmPasswordValidation.errors && (
                  <ErrorValidation errors={confirmPasswordValidation.errors} />
                )
              }
            />

            {authError && !reset && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                Something goes wrong. Try again.
              </Typography>
            )}

            <ButtonWithLoading
              label="Set Password"
              disabled={!areAllFieldsValid}
              isLoading={loading}
            />

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

            <Copyright sx={{ mt: { xs: 1, sm: 5 } }} websiteName="Your Website" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SetPassword
