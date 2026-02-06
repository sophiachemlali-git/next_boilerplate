import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Notification, { NotificationProps } from '@/components/ui/Notification'

export interface ToastProps {
  title?: string
  open: boolean
  severity: NotificationProps['severity']
  message: string
  position?: { x: 'left' | 'right'; y: 'top' | 'bottom' }
  positionValue?: { x: number; y: number }
  autoHideDuration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({
  title,
  open,
  severity,
  message,
  position = { x: 'right', y: 'bottom' },
  positionValue = { x: 16, y: 16 },
  autoHideDuration = 6000,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    setIsOpen(open)

    timeoutId = setTimeout(() => {
      setIsOpen(false)
      onClose()
    }, autoHideDuration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [autoHideDuration, onClose, open])

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <Stack
          spacing={2}
          sx={{
            position: 'fixed',
            [position.y]: [positionValue.y],
            [position.x]: [positionValue.x],
          }}
        >
          <Notification
            title={title}
            message={message}
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          />
        </Stack>
      )}
    </>
  )
}

export default Toast
