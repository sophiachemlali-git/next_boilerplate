import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    // If the user is not authenticated, redirect to the home page
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  // Render the content only if the user is authenticated
  return isAuthenticated ? <>{children}</> : null
}

export default AuthLayout
