import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxHeight: 500,
    backgroundColor: 'red',
    borderRadius: 2,
    backgroundColor: '#fff',
    padding: '1rem',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '70%',
    }
  },
  divisor: {
    borderTop: '1px solid #D6D6D6'
  },
  list: {
    margin: 0,
    padding: 0
  }
}))