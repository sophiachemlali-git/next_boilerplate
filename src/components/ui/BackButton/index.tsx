import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export interface BackButtonProps extends ButtonProps {
  onClick: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, ...buttonProps }) => {
  return (
    <Button
      onClick={onClick}
      startIcon={<ArrowBackIcon />}
      variant="text"
      color="primary"
      data-testid="back-button"
      {...buttonProps}
    >
      Back
    </Button>
  )
}

export default BackButton
