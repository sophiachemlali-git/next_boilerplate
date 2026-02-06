import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeNotification } from '@/store/reducers/notificationReducer'
import NotificationBanner from '@/components/ui/NotificationBanner'
import { RootState } from '@/store/store'

const GlobalNotification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state: RootState) => state.notification)
  const { open, title, message, severity, isPermanent } = useMemo(
    () => notification,
    [notification]
  )

  const handleNotificationClose = () => {
    dispatch(closeNotification())
  }

  return (
    <>
      {open && (
        <NotificationBanner
          open={open}
          title={title}
          message={message}
          severity={severity}
          isPermanent={isPermanent}
          onClose={handleNotificationClose}
        />
      )}
    </>
  )
}

export default GlobalNotification
