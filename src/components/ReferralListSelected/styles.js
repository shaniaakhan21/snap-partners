import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 2,
    backgroundColor: '#fff',
    padding: '1rem 1rem 1rem 2rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
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