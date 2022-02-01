import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  loginBackground: {
    backgroundColor: theme.palette.primary.light
  },
  loginImage: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  notificationAlert: {
    backgroundColor: '#fff',
    color: 'green',
    border: '2px green solid'
  },
  imageContainer: {
    backgroundImage: `url("/svg/Login/login.jpg")`, 
    backgroundSize:`cover`,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }

  },
  formContainer: {
    backgroundColor: '#fff',
    paddingBottom: 50,
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: '20%'
  },
  loginTitle: {
    styleName: 'typography/h4',
    fontFamily: 'Red Hat Display, Roboto, sans-serif',
    fontSize: '34px',
    fontStyle: 'normal',
    fontWeight: '400px',
    lineHeight: '42px',
    letterSpacing: '0.25',
    textAlign: 'left',
    color: theme.palette.primary.main,
    marginBottom: 20
  },
  linkPassword: {
    textDecoration: 'none',
    // styleName: button;
    fontFamily: 'Red Hat Display, Roboto, sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500px',
    lineHeight: '24px',
    display: 'flex',
    letterSpacing: '0.4000000059604645px',
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  containerForgotPassword: {
    height: '24px',
    textAlign: "center",
    marginTop: '3%',
  },
  btnLoginStyle: {
    width: '100%',
  },
  containerRegisterLink: {
    color: 'black',
    fontFamily: 'Red Hat Display, Roboto, sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    justifyContent: 'center',
    marginTop: '5%'
  },
  inputCode: {
    width: "100%",
    marginBottom: 20
  }
}))
