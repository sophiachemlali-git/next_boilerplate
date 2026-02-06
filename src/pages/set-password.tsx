import React, { useEffect } from 'react'
import SetPassword from '@/features/Auth/SetPassword'

import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export default function SetPasswordPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return <SetPassword />
}
