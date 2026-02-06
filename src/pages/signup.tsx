import React, { useEffect } from 'react'
import SignUp from '@/features/Auth/Signup'

import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export default function SignUpPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return <SignUp />
}
