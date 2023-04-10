import { AppRouter } from './router';
import { ProviderTheme } from './theme'

export const CarnetApp = () => {
  return (
    <ProviderTheme>
        <AppRouter />
    </ProviderTheme>
  )
}
