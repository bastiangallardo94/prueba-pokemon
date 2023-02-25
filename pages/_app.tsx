
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
   <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Component {...pageProps} />
    </ThemeProvider>
  </>)
}
