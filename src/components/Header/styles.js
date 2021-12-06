import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
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
  flags: {
    backgroundColor: '#01304E',
    color: 'white'
  },
  flagsOuter: {
    marginLeft: 20,
    '& ul': {
      maxHeight: 500
    },
    [theme.breakpoints.down('xs')]: {
      width: 60
    }
  },
  buttonLogin: {
    color: theme.palette.secondary.main
  },
  buttonRegister: {
    [theme.breakpoints.down('xs')]: {
      padding: 3
    }
  }
}))
