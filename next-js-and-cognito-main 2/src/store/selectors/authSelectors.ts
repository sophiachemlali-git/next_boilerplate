import { AuthState } from '../reducers/authReducer'
import { getUserInformation } from '@/utils/user'

export const selectAuthState = (state: { auth: AuthState }) => state.auth
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectUserInfo = (state: { auth: AuthState }) => getUserInformation(state.auth.user)
export const selectError = (state: { auth: AuthState }) => state.auth.error
export const selectIsPasswordChangeRequired = (state: { auth: AuthState }) =>
  state.auth.passwordChangeRequired
