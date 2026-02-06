import React from 'react'
import Typography from '@mui/material/Typography'

export type ErrorValidationProps = {
  errors: string[]
}

const ErrorValidation: React.FC<ErrorValidationProps> = ({ errors }) => {
  return (
    <Typography variant="body2" color="error">
      {errors.map((error, index) => (
        <React.Fragment key={index}>
          {error}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  )
}

export default ErrorValidation
