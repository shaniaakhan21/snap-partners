import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 1024,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 14
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
		maxWidth: 248,
		height: 394,
		backgroundColor: 'white',
		padding: '20px 0px',
		textAlign: 'left',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 18,
		position: 'relative',
		borderRadius: '4px 4px 0px 0px',
		marginRight: 10,
		'&:last-child': {
			marginRight: 0
		},
		[theme.breakpoints.down('md')]: {
			marginLeft: 0,
			marginRight: 0
		}
	}
}))
