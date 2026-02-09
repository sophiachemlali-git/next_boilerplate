import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'

import TextFieldWithValidation from '@/components/forms/TextFieldWithValidation'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'

import { useValidEmail } from '@/hooks/useValidation'
import { sendCode } from '@/lib/cognito'

const isMockAuth = !!process.env.NEXT_PUBLIC_MOCK_AUTH

interface SendCodeProps {
  onNextStep: (email: string) => void
  description?: string
}

const SendCode: React.FC<SendCodeProps> = ({ onNextStep, description }) => {
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailValidation = useValidEmail('')
  const areAllFieldsValid = emailValidation.isValid && emailValidation.value

  useEffect(() => {
    setIsError(false)
  }, [emailValidation.value])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailValidation.isValid) {
      try {
        setLoading(true)
        if (isMockAuth) {
          await new Promise(resolve => setTimeout(resolve, 400))
        } else {
          await sendCode(emailValidation.value)
        }
        onNextStep(emailValidation.value)
      } catch (error) {
        console.error('Send code error:', error)
        setIsError(true)
      } finally {
        setLoading(false)
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
            mt: 3,
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
        <TextFieldWithValidation label="Email Address" validationHook={emailValidation} />
        {isError && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
            Please check your email and try again.
          </Typography>
        )}
        <ButtonWithLoading
          label="Send code and continue"
          disabled={!areAllFieldsValid}
          isLoading={loading}
          LoadingProps={{
            size: 24,
          }}
        />
      </Box>
    </Box>
  )
}

export default SendCode
