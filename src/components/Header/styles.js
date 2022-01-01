import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.secondary,
    height: 64
  },
  logo: {
    padding: 12,
    height: 64
  },
  inter: {
    maxWidth: '90%',
    height: 64,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      maxWidth: '98%'
    }
  },
  buttonsWrap: {
    marginLeft: 'auto'
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'row',
    alignItems: 'center',
    '& :hover': {
      cursor: 'pointer'
    }
  },
  buttons: {
    color: theme.palette.text.white,
    margin: '0 10px',
    [theme.breakpoints.down('xs')]: {
      padding: 3,
      margin: '0 2px'
    }
  },
  dropDown: {
    color: theme.palette.text.white
  },
  buttonLogin: {
    color: theme.palette.primary.main
  },
  buttonRegister: {
    [theme.breakpoints.down('xs')]: {
      padding: 3
    }
  }
}))
