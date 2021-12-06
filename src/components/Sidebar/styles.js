import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({  
  sidebarContainer: {
    minWidth: '200px',
    position: "sticky",
    top: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  sidebarItem: {
    alignItems: 'center',
    display: 'flex',
    margin: '10% 0'
  },
  sidebarLink: {
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit'
  },
  sidebarImage: {
    marginRight: '10%'
  }
}))
