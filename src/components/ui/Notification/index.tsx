import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { AlertProps } from '@mui/material'

export type NotificationProps = {
  title?: string
  message?: string
  severity: AlertProps['severity']
} & AlertProps

const Notification: React.FC<NotificationProps> = ({ title, message, severity, ...alertProps }) => {
  return (
    <Alert severity={severity} {...alertProps}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message || ''}
    </Alert>
  )
}

export default Notification
