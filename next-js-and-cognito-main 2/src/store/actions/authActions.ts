import {
  signInWithEmail,
  signOut,
  signUpUserWithEmail,
  verifyCodeValidation,
  completeNewPassword,
} from '@/lib/cognito'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: AuthUser, thunkAPI) => {
    try {
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
