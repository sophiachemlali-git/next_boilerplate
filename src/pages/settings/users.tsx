import React from 'react'
import withAuth from '@/features/Auth/withAuth'
import Drawerlayout from '@/layout/DrawerLayout'
import styles from '@/styles/Home.module.css'
import UsersList from '@/features/User/UserList'

import { Typography } from '@mui/material'

const UsersPage: React.FC = () => {
  return (
    <Drawerlayout>
      <section className={styles.main}>
        <Typography component="h1" variant="h3" color="primary">
          Manage Users Page
        </Typography>
        <UsersList />
      </section>
    </Drawerlayout>
  )
}

export default withAuth(UsersPage)
