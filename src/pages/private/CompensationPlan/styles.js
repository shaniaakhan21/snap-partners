import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
	buttonDownload: {
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#DD4C37',
    padding: '12px 18px',
    fontWeight: 700,
    borderRadius: '24px',
    border: 'none',
    '&:hover': {
      opacity: '85%'
    }
	}
}))
