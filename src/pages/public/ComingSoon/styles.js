import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  generalContainer: {
    margin: '5% 0'
  },
  imageContainer: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  title: {
    padding: '0 5% 1% 5%',
    fontWeight: 600,

    [theme.breakpoints.down('md')]: {
      fontSize: 23
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 19
    }
  }
}))
