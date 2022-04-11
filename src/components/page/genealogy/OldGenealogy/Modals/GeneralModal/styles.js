import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: 20
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 130,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
}))
