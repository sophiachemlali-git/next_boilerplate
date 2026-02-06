import React, { useState, useEffect } from 'react'

import Copyright from '@/components/ui/Copyright'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import ErrorValidation from '@/components/ui/ErrorValidation'
import Link from '@/components/ui/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Avatar, Box, Grid, Typography, Container } from '@mui/material'
import { useValidEmail, useValidPassword } from '@/hooks/useValidation'
import { useAppDispatch } from '@/store/store'
import { loginUser } from '@/store/actions/authActions'

import { selectError } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)

  const dispatch = useAppDispatch()
  const authError = useSelector(selectError)

  const emailValidation = useValidEmail('')
  const passwordValidation = useValidPassword('')

  useEffect(() => {
    setReset(true)
  }, [passwordValidation.value, emailValidation.value])

  const areAllFieldsValid =
    emailValidation.isValid &&
    passwordValidation.isValid &&
    emailValidation.value &&
    passwordValidation.value

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (areAllFieldsValid && !loading) {
      setLoading(true)

      try {
        await dispatch(
          loginUser({
            username: emailValidation.value,
            password: passwordValidation.value,
          })
        )
        setReset(false)
      } catch (error) {
        console.error('Authentication error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
              <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright websiteName="Your Website" sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default SignIn
