import React, { useEffect } from 'react'
import SignInSide from '@/features/Auth/SignInSide'

import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export default function Home() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  console.log('[v0] Home page, isAuthenticated:', isAuthenticated)

  useEffect(() => {
    console.log('[v0] Home useEffect, isAuthenticated:', isAuthenticated)
    if (isAuthenticated) {
      console.log('[v0] Redirecting to /dashboard')
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return <SignInSide />
}
