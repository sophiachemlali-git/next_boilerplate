import React, { useState, useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import Notification, { NotificationProps } from '@/components/ui/Notification'

export interface NotificationBannerProps {
  title?: string
  open: boolean
  severity: NotificationProps['severity']
  message?: string
  position?: { x: 'left' | 'right'; y: 'top' | 'bottom' }
  positionValue?: { x: number | string; y: number | string }
  autoHideDuration?: number
  isPermanent?: boolean
  onClose: () => void
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  title,
  open,
  severity,
  message,
  position = { x: 'left', y: 'top' },
  positionValue = { x: '50%', y: 20 }, // Centered by default
  autoHideDuration = 7500, // 7.5 seconds by default
  isPermanent = false,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(open)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  const isCenteredX = positionValue.x === '50%'
  const isCenteredY = positionValue.y === '50%'

  useEffect(() => {
    setIsOpen(open)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    if (!isPermanent) {
      timeoutIdRef.current = setTimeout(() => {
        setIsOpen(false)
        onClose()
      }, autoHideDuration)
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [autoHideDuration, isPermanent, onClose, open, title])

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
            ...(isCenteredX && { transform: 'translateX(-50%)' }),
            ...(isCenteredY && { transform: 'translateY(-50%)' }),
            zIndex: 9999,
          }}
        >
          <Notification
            title={title}
            message={message}
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%', zIndex: 9999 }}
          />
        </Stack>
      )}
    </>
  )
}

export default NotificationBanner
