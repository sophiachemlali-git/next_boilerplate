import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'

import Image from 'next/image'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import Copyright from '@/components/ui/Copyright'
import ErrorValidation from '@/components/ui/ErrorValidation'
import Link from '@/components/ui/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { useValidEmail, useValidPassword } from '@/hooks/useValidation'
import { useAppDispatch } from '@/store/store'
import { loginUser, setPasswordChangeRequired } from '@/store/actions/authActions'

import { selectError, selectIsPasswordChangeRequired } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

const SignInSide: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const authError = useSelector(selectError)
  const isPasswordChangeRequired = useSelector(selectIsPasswordChangeRequired)

  const emailValidation = useValidEmail('')
  const passwordValidation = useValidPassword('')

  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    setReset(true)
  }, [passwordValidation.value, emailValidation.value])

  useEffect(() => {
    if (isPasswordChangeRequired) {
      dispatch(setPasswordChangeRequired(false))
      router.push('/set-password')
    }
  }, [dispatch, isPasswordChangeRequired, router])

  const areAllFieldsValid =
    emailValidation.isValid &&
    passwordValidation.isValid &&
    emailValidation.value &&
    passwordValidation.value

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('[v0] handleSubmit called, areAllFieldsValid:', areAllFieldsValid, 'loading:', loading)
    console.log('[v0] email:', emailValidation.value, 'emailValid:', emailValidation.isValid)
    console.log('[v0] passwordValid:', passwordValidation.isValid, 'password length:', passwordValidation.value.length)
    console.log('[v0] password errors:', passwordValidation.errors)
    console.log('[v0] NEXT_PUBLIC_MOCK_AUTH:', process.env.NEXT_PUBLIC_MOCK_AUTH)

    if (areAllFieldsValid && !loading) {
      setLoading(true)

      try {
        const result = await dispatch(
          loginUser({
            username: emailValidation.value,
            password: passwordValidation.value,
          })
        )
        console.log('[v0] loginUser dispatch result:', JSON.stringify(result, null, 2))
        setReset(false)
      } catch (error) {
        console.error('[v0] Authentication error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Grid aria-label="Sign In" container component="section" sx={{ height: '100vh' }}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary" textAlign="center">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextFieldWithValidation label="Email Address" validationHook={emailValidation} />
            <TextFieldWithValidation
              label="Password"
              type="password"
              hint={
                passwordValidation.errors && <ErrorValidation errors={passwordValidation.errors} />
              }
              validationHook={passwordValidation}
            />

            {authError && !reset && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                Invalid email or password. Please try again.
              </Typography>
            )}

            <ButtonWithLoading
              buttonProps={{ type: 'submit' }}
              isLoading={loading}
              disabled={!areAllFieldsValid}
              label="Sign In"
            />

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/forgot-password">Forgot password?</Link>
              </Grid>
            </Grid>

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

export default SignInSide
