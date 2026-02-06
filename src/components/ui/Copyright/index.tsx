import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

export type CopyrightProps = {
  websiteName: string
} & TypographyProps

function Copyright({ websiteName, ...props }: CopyrightProps) {
  const currentYear = new Date().getFullYear()

  return (
    <Typography variant="body2" color="primary" align="center" data-testid="copyright" {...props}>
      {`Copyright © ${websiteName} ${currentYear}.`}
    </Typography>
  )
}

export default Copyright
