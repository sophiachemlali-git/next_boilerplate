import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
})

export default rootReducer
