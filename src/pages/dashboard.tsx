import React from 'react'
import styles from '../styles/Home.module.css'
import withAuth from '@/features/Auth/withAuth'
import Drawerlayout from '@/layout/DrawerLayout'

import { Typography } from '@mui/material'

const DashboardPage: React.FC = () => {
  return (
    <Drawerlayout>
      <section className={styles.main}>
        <Typography component="h1" variant="h3" color="primary">
          Dashboard Page
        </Typography>
      </section>
    </Drawerlayout>
  )
}

export default withAuth(DashboardPage)
