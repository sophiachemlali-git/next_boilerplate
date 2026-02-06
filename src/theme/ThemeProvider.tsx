import React, { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './index'
import createEmotionCache from './createEmotionCache'

const cache = createEmotionCache()

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default ThemeProvider
