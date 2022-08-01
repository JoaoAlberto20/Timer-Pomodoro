import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/Global'
import { defaultTheme } from './styles/Themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Olá mundo</h1>

      <GlobalStyle />
    </ThemeProvider>
  )
}
