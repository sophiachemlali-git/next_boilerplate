import styles from '../styles/Home.module.css'
import { useTheme } from '@mui/material/styles'

export default function About() {
  const theme = useTheme()

  return (
    <div className={styles.container} style={{ backgroundColor: theme.palette.secondary.main }}>
      <section className={styles.main}>
        <h1>About Page</h1>
      </section>
    </div>
  )
}
