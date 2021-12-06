import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  loginBackground: {
    backgroundColor: theme.palette.secondary.resting
  },
  loginImage: {
    width: '60%',
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
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }

  },
  formContainer: {
    backgroundColor: '#fff',
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: '20%'
  },
  loginTitle: {
    styleName: 'typography/h4',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '34px',
    fontStyle: 'normal',
    fontWeight: '400px',
    lineHeight: '42px',
    letterSpacing: '0.25',
    textAlign: 'left',
    color: '#4AA9C7',
    marginBottom: 20
  },
  btnGoogle: {
    border: '1px blue solid',
    padding: 0,
    marginTop: '4%',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    width: '100%',
    maxWidth: '630px',
    fontStyle: 'normal',
    fontWeight: '500px',
    lineHeight: '26px',
    letterSpacing: '0.46000000834465027px',
    textAlign: 'left',

    color: '#4AA9C7',
    '&:hover': {
      cursor: 'pointer',
      border: '1px #4AA9C7 solid',
      background: '#E5E5E5'
    }
  },
  containerGoogle: {
    marginTop: '4%'
  },
  imgGoogle: {
    margin: '1% 5% 1% 0'
  },
  linkPassword: {
    textDecoration: 'none',
    // styleName: button;
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500px',
    lineHeight: '24px',
    display: 'flex',
    letterSpacing: '0.4000000059604645px',
    textAlign: 'center',
    color: '#4AA9C7'
  },
  containerForgotPassword: {
    height: '24px',
    textAlign: "center",
    marginTop: '3%',
  },
  btnLoginStyle: {
    width: '100%',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontStyle: 'normal',
    boxShadow: '0px 1px 5px 0px #0000001F',
    backgroundColor: '#4AA9C7',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4AA9C7',
      color: '#fff'
    }

  },
  containerRegisterLink: {
    color: 'black',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    justifyContent: 'center',
    marginTop: '5%'
  },
  registerTypog: {
    styleName: 'typography/body1',
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.15000000596046448px',
    textAlign: 'left',
    '&& a': {
      marginLeft: '5px'
    }

  },
  inputCode: {
    width: "100%",
    marginBottom: 20
  }
}))
