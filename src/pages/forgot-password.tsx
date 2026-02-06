import React, { useEffect } from 'react'
import ResetPassword from '@/features/Auth/ResetPassword'

import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export default function ForgotPasswordPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return <ResetPassword />
}
