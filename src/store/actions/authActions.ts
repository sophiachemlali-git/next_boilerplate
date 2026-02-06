import {
  signInWithEmail,
  signOut,
  signUpUserWithEmail,
  verifyCodeValidation,
  completeNewPassword,
} from '@/lib/cognito'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === 'true'

interface AuthUser {
  username: string
  password: string
}

interface CompleteLoginUserProps {
  password: string
}

interface VerifyCodePayload {
  username: string
  verificationCode: string
}

interface LogoutUserProps {
  callback?: () => void
}

interface ResetInitialStatesProps {
  callback?: () => void
}

/**
 * Creates a mock Cognito-like session object so the rest of the app
 * (selectors, withAuth, getUserInformation) works without changes.
 */
function createMockSession(email: string) {
  return {
    isValid: () => true,
    getIdToken: () => ({
      getJwtToken: () => 'mock-jwt-token',
      payload: {
        name: email.split('@')[0],
        email,
        'cognito:groups': ['admin'],
      },
    }),
    getAccessToken: () => ({
      getJwtToken: () => 'mock-access-token',
    }),
    getRefreshToken: () => ({
      getToken: () => 'mock-refresh-token',
    }),
    // Spread-friendly properties used by getUserInformation via state.auth.user
    idToken: {
      jwtToken: 'mock-jwt-token',
      payload: {
        name: email.split('@')[0],
        email,
        'cognito:groups': ['admin'],
      },
    },
  }
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: AuthUser, thunkAPI) => {
    try {
      if (isMockAuth) {
        // Simulate a short network delay for realism
        await new Promise(resolve => setTimeout(resolve, 400))
        return createMockSession(username)
      }

      const user = await signInWithEmail(username, password, '')
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const completeLoginUser = createAsyncThunk(
  'auth/completeLoginUser',
  async ({ password }: CompleteLoginUserProps, thunkAPI) => {
    try {
      if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 400))
        return createMockSession('mock@user.com')
      }

      const user = await completeNewPassword(password)
      return user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ username, password }: AuthUser, thunkAPI) => {
    try {
      if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 400))
        return { getUsername: () => username }
      }

      const signUpResult = await signUpUserWithEmail(username, '', password)
      return signUpResult?.user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async ({ username, verificationCode }: VerifyCodePayload, thunkAPI) => {
    try {
      if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 400))
        return
      }

      await verifyCodeValidation(username, verificationCode)
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async ({ callback }: LogoutUserProps, thunkAPI) => {
    try {
      if (isMockAuth) {
        callback && callback()
        return
      }

      await signOut()
      callback && callback()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const resetToInitialStates = createAction(
  'auth/resetToInitialStates',
  (payload: ResetInitialStatesProps) => {
    payload.callback && payload.callback()

    return {
      payload,
    }
  }
)

export const setPasswordChangeRequired = createAction<boolean>('auth/setPasswordChangeRequired')
