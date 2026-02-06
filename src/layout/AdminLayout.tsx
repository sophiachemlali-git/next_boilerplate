import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { selectUserInfo } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const isAdmin = useSelector(selectUserInfo).isAdmin
  const router = useRouter()

  useEffect(() => {
    // If the user is not Admin Role, redirect to the Dashboard
    if (!isAdmin) {
      router.push('/dashboard')
    }
  }, [isAdmin, router])

  // Render the content only if the user is Admin
  return isAdmin ? <>{children}</> : null
}

export default AdminLayout
