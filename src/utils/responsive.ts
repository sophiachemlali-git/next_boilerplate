import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

interface ResponsiveCheckResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isMobileOrTablet: boolean
  isLandscape: boolean
}

const ResponsiveCheck = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.values.sm}px)`)
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.values.md}px)`) && !isMobile
  const isMobileOrTablet = isMobile || isTablet
  const isDesktop = !(isMobile || isTablet)
  const isLandscape = useMediaQuery('(orientation: landscape)')

  const result: ResponsiveCheckResult = {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isLandscape,
  }

  return result
}

export default ResponsiveCheck
