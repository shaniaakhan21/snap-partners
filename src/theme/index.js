import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#01304e',
      light: '#37597a',
      greybackground: '#FAFAFA',
      outlined: 'rgba(01,48,78,0.5)',
      outlinedHover: 'rgba(1, 48, 78, 0.08)'
    },
    secondary: {
      main: '#4aa9c7',
      light: '#80dbfa',
      dark: '#007a96',
      outlined: 'rgba(74,169,199,0.08)',
      resting: 'rgba(74, 169, 199, 0.5)'
    },
    text: {
      primary: '#000',
      white: '#fff',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },    
    action: {
      disabled: 'rgba(0, 0, 0, 0.26)',
      active: 'rgba(0, 0, 0, 0.54)'
    },
    warning: {
      main: "rgba(255, 152, 0, 1)",
      dark: "rgba(199, 119, 0, 1)"
    },
    socials: {
      facebook: "#3b5998",
      twitter: "#00aced",
      whatsapp: "#25d366",
      telegram: "#37aee2",
      reddit: "#ff4500",
      email: "#7f7f7f",
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
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

export default theme
