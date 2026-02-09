import React, { useEffect } from 'react'
import SignInSide from '@/features/Auth/SignInSide'

import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export default function Login() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return <SignInSide />
}
