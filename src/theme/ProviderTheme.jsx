import { ThemeProvider } from '@mui/material'
import { defaultTheme } from './defaultTheme'

export const ProviderTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ defaultTheme }>
        { children }
    </ThemeProvider>
  )
}
