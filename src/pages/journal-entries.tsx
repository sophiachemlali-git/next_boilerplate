import React from 'react'
import withAuth from '@/features/Auth/withAuth'
import Drawerlayout from '@/layout/DrawerLayout'
import styles from '../styles/Home.module.css'

import { Typography } from '@mui/material'

const JournalEntriesPage: React.FC = () => {
  return (
    <Drawerlayout>
      <section className={styles.main}>
        <Typography component="h1" variant="h3" color="primary">
          Journal Entries Page
        </Typography>
      </section>
    </Drawerlayout>
  )
}

export default withAuth(JournalEntriesPage)
