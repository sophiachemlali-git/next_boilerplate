import { NotificationProps } from '@/components/ui/Notification'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
  open: boolean
  title?: string
  message?: string
  isPermanent?: boolean
  severity: NotificationProps['severity']
}

const initialState: NotificationState = {
  open: false,
  isPermanent: false,
  title: '',
  message: '',
  severity: 'success',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification: (
      state,
      action: PayloadAction<{
        title?: string
        message?: string
        severity: NotificationProps['severity']
        isPermanent?: boolean
      }>
    ) => {
      state.open = true
      state.title = action.payload.title
      state.message = action.payload.message
      state.severity = action.payload.severity
      state.isPermanent = action.payload.isPermanent || false
    },
    closeNotification: state => {
      state.open = false
      state.isPermanent = false
      state.title = ''
      state.message = ''
      state.severity = 'success'
    },
  },
})

export const { openNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer
