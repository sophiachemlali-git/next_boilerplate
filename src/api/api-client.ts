import axios, { AxiosError, AxiosResponse } from 'axios'
import { persistor } from '@/store/store'
import { resetToInitialStates } from '@/store/actions/authActions'
import { getUserInformation } from '@/utils/user'

import store from '@/store/store'
import router from 'next/router'

interface AuthInterceptorError extends AxiosError {
  response: AxiosResponse
}

// Create an instance of axios to handle authentication
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
})

// Interceptor for requests
apiClient.interceptors.request.use(
  async (config: any) => {
    // Check if the user is authenticated
    // Get current Store - Redux
    const currentState = store.getState()
    const accessToken = getUserInformation(currentState?.auth?.user)?.token

    // If authenticated, attach the access token to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error: AuthInterceptorError) => {
    // Handle request errors
    return Promise.reject(error)
  }
)

// Interceptor for responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Perform specific actions after receiving a successful response
    return response
  },
  (error: AuthInterceptorError) => {
    // Handle specific errors here

    if (error?.response?.status === 401) {
      const initialStatesCallback = () => {
        persistor.purge()
        sessionStorage.clear()
        router.push('/login')
      }

      store.dispatch(resetToInitialStates({ callback: initialStatesCallback }))
    }

    return Promise.reject(error?.response?.data)
  }
)
