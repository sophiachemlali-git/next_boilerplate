import React, { useState, useEffect } from 'react'

import Copyright from '@/components/ui/Copyright'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import ErrorValidation from '@/components/ui/ErrorValidation'
import Link from '@/components/ui/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Avatar, Box, Grid, Typography, Container } from '@mui/material'
import { useValidEmail, useValidPassword, useValidText, useValidCode } from '@/hooks/useValidation'
import { useAppDispatch } from '@/store/store'
import { signUpUser, verifyCode } from '@/store/actions/authActions'

import { selectError } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

const Signup: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isRegistered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)

  const authError = useSelector(selectError)

  const nameValidation = useValidText('')
  const lastNameValidation = useValidText('')
  const emailValidation = useValidEmail('')
  const passwordValidation = useValidPassword('')
  const codeValidation = useValidCode('')

  const areAllFieldsValid =
    nameValidation.isValid &&
    lastNameValidation.isValid &&
    emailValidation.isValid &&
    passwordValidation.isValid &&
    emailValidation.value &&
    passwordValidation.value &&
    nameValidation.value &&
    lastNameValidation.value

  const handleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!isRegistered) {
      // Signup
      try {
        await dispatch(
          signUpUser({ username: emailValidation.value, password: passwordValidation.value })
        )
        setRegistered(true)
        setReset(false)
      } catch (error) {
        console.error('Error signing up:', error)
      } finally {
        setLoading(false)
      }
    } else {
      // Verify Code
      try {
        await dispatch(
          verifyCode({
            username: emailValidation.value,
            verificationCode: codeValidation.value,
          })
        )
        setReset(false)
      } catch (error) {
        console.error('Error verifying code:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    setReset(true)
  }, [
    nameValidation.value,
    lastNameValidation.value,
    passwordValidation.value,
    emailValidation.value,
  ])

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
        <Typography component="h1" variant="h5" textAlign="center">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleAction} sx={{ mt: 3, width: '100%' }}>
          {!isRegistered && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextFieldWithValidation label="First Name" validationHook={nameValidation} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldWithValidation label="Last Name" validationHook={lastNameValidation} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation label="Email Address" validationHook={emailValidation} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation
                  label="Password"
                  type="password"
                  hint={
                    passwordValidation.errors && (
                      <ErrorValidation errors={passwordValidation.errors} />
                    )
                  }
                  validationHook={passwordValidation}
                />
              </Grid>
            </Grid>
          )}

          {isRegistered && (
            <TextFieldWithValidation
              type="number"
              label="Verification Code"
              placeholder="Ex. 491822"
              validationHook={codeValidation}
            />
          )}

          {authError && !reset && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              Something goes wrong. Try again.
            </Typography>
          )}

          <ButtonWithLoading
            buttonProps={{ type: 'submit' }}
            isLoading={loading}
            disabled={
              isRegistered ? !areAllFieldsValid && !codeValidation.isValid : !areAllFieldsValid
            }
            label={isRegistered ? 'Verify Code' : 'Signup'}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright websiteName="Your Website" sx={{ mt: 5 }} />
    </Container>
  )
}

export default Signup
