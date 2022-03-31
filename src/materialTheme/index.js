import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fe0002',
      secondary: '#191919',
      light: 'rgba(221,76,55,0.5)'
    }
  },
  typography: {
    fontFamily: [
      'Red Hat Display',
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})
