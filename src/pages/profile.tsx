import React from 'react'
import withAuth from '@/features/Auth/withAuth'
import Drawerlayout from '@/layout/DrawerLayout'
import Profile from '@/features/Profile'

const ProfilePage: React.FC = () => {
  return (
    <Drawerlayout>
      <Profile />
    </Drawerlayout>
  )
}

export default withAuth(ProfilePage)
