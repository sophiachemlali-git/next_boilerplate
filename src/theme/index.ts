import { createTheme } from '@mui/material/styles'
import palette from './palette'
import typography from './typography'

// Theme use Default Breakpoints
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

const theme = createTheme({
  palette,
  typography,
})

export default theme
