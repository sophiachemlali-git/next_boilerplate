import React, { useState, useEffect } from 'react'

import { Typography, Box, Grid } from '@mui/material'
import { useValidPassword, useValidCode } from '@/hooks/useValidation'
import { forgotPassword } from '@/lib/cognito'
import { sendCode } from '@/lib/cognito'
import { MessagesCode, MessageProps } from '@/utils/constants'

import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import ErrorValidation from '@/components/ui/ErrorValidation'
import BackButton from '@/components/ui/BackButton'
import Toast from '@/components/ui/Toast'

interface CreatePasswordProps {
  username: string
  onBack?: () => void
  onSuccess?: () => void
  description?: string
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  onBack,
  onSuccess,
  username,
  description,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<MessageProps | undefined>()
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const verificationCodeValidation = useValidCode('')
  const passwordValidation = useValidPassword('')
  const confirmPasswordValidation = useValidPassword('', passwordValidation.value)

  const areAllFieldsValid =
    verificationCodeValidation.isValid &&
    verificationCodeValidation.value &&
    passwordValidation.isValid &&
    passwordValidation.value &&
    confirmPasswordValidation.isValid &&
    confirmPasswordValidation.value &&
    passwordValidation.value === confirmPasswordValidation.value

  useEffect(() => {
    setErrorMessage('')
  }, [verificationCodeValidation.value, passwordValidation.value, confirmPasswordValidation.value])

  const handleToastClose = () => {
    setToastOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (areAllFieldsValid) {
      try {
        setErrorMessage('')
        setLoading(true)
        await forgotPassword(
          username || '',
          verificationCodeValidation.value || '',
          confirmPasswordValidation.value
        )

        onSuccess && onSuccess()
      } catch (error) {
        setErrorMessage(error as string)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleResendCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (username) {
      try {
        setResendLoading(true)
        await sendCode(username)
        setResendStatus(MessagesCode.SUCCESS)
        setToastOpen(true)
        setResendLoading(false)
      } catch (error) {
        console.error('Send code error:', error)
        setResendLoading(false)
        setResendStatus(MessagesCode.ERROR)
        setToastOpen(true)
      }
    }
  }

  return (
    <Box>
      {description && (
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
          {description}
        </Typography>
      )}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: description ? 3 : 0, width: '100%' }}
      >
        <TextFieldWithValidation
          type="number"
          label="Verification Code"
          placeholder="Ex. 491822"
          validationHook={verificationCodeValidation}
        />
        <TextFieldWithValidation
          label="New Password"
          type="password"
          hint={passwordValidation.errors && <ErrorValidation errors={passwordValidation.errors} />}
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

        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2, width: '100%' }}>
            {errorMessage}
          </Typography>
        )}

        <ButtonWithLoading
          label="Reset Password"
          disabled={!areAllFieldsValid}
          isLoading={loading}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {onBack && (
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <BackButton onClick={onBack} />
            </Grid>
          )}
          <Grid item>
            <ButtonWithLoading
              label="Resend Verification Code"
              onClick={handleResendCode}
              fullWidth={false}
              isLoading={resendLoading}
              variant="outlined"
              buttonProps={{ sx: { minWidth: 200 } }}
            />
          </Grid>
        </Grid>

        {toastOpen && resendStatus && (
          <Toast
            open={toastOpen}
            title={resendStatus.title}
            message={resendStatus.message}
            severity={resendStatus.severity}
            onClose={handleToastClose}
          />
        )}
      </Box>
    </Box>
  )
}

export default CreatePassword
