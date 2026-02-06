import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  loginUser,
  signUpUser,
  logoutUser,
  verifyCode,
  completeLoginUser,
  resetToInitialStates,
} from '../actions/authActions'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export interface AuthState {
  isAuthenticated: boolean
  user: CognitoUserSession | null
  error: string | null // Handle authentication errors
  passwordChangeRequired: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  passwordChangeRequired: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPasswordChangeRequired: (state, action) => {
      state.passwordChangeRequired = action.payload
    },
    // You can add synchronous reducer cases here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = false // User is not authenticated until verification
        state.user = action.payload
        state.error = null // Reset error on success
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const requiresPasswordChange = action.payload.requiresPasswordChange || false
        if (requiresPasswordChange) {
          state.isAuthenticated = false // User is not authenticated until confirm password
          state.user = null
          state.error = null
          state.passwordChangeRequired = true
        } else {
          state.isAuthenticated = true
          state.user = action.payload
          state.error = null
          state.passwordChangeRequired = false
        }
      })
      .addCase(completeLoginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
        state.passwordChangeRequired = false
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isAuthenticated = false
        state.user = null
        state.error = null
      })
      .addCase(verifyCode.fulfilled, state => {
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      .addCase(completeLoginUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.user = null
        state.passwordChangeRequired = false
        state.error = action.payload as string
      })
      .addCase(resetToInitialStates, state => {
        state.isAuthenticated = initialState.isAuthenticated
        state.user = initialState.user
        state.passwordChangeRequired = initialState.passwordChangeRequired
        state.error = initialState.error
      })
  },
})

export default authSlice.reducer
