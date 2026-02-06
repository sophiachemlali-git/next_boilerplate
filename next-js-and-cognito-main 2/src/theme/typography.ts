import { Montserrat } from 'next/font/google'
import { TypographyVariantsOptions } from '@mui/material/styles'

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const typography: TypographyVariantsOptions = {
  fontFamily: montserrat.style.fontFamily, // Main font
  // Other styles
}

export default typography
