import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 1024,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 14
	},
	container_contentArticles: {
		// overflowY: 'scroll'
	},
	container_cards: {
		marginTop: 51,
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center'
		},
		alignItems: 'start',
		flexWrap: 'wrap'
	},
	cards: {
		maxWidth: 320,
		height: '100%',
		backgroundColor: 'white',
		padding: '20px 0px 0px 0px',
		textAlign: 'left',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 18,
		position: 'relative',
		borderRadius: 4,
		marginRight: 10,
		marginLeft: 10,
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0,
			marginRight: 0,
			maxWidth: 300,
			width: '100%'
		}
	}
}))
