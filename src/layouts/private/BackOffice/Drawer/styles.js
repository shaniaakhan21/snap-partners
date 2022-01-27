import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
	wrapper: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		},
		position: 'absolute',
		overflow: 'hidden',
		top: 60,
		left: 0,
		zIndex: 20,
		width: '100%',
		height: '100%'
	},

	sidebarContainer: {
		minWidth: '200px',
		position: 'sticky',
		top: 0,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		listStyle: 'none',
		backgroundColor: '#DD4C37',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
		margin: 0,
		paddingTop: '64px',
		paddingRight: 0,
		paddingLeft: 0
	},
	sidebarItem: {
		alignItems: 'center',
		display: 'flex',
		color: 'white',
		padding: '20px 37px',
		'&:hover': {
			backgroundColor: '#19191914'
		}
	},
	sidebarItem_currentRoute: {
		alignItems: 'center',
		display: 'flex',
		color: 'white',
		padding: '20px 37px',
		backgroundColor: '#19191914',
		'&::before': {
			content: '\' \'',
			position: 'absolute',
			left: '-28px',
			transform: 'rotate(90deg)',
			width: '63px',
			height: '5px',
			background: 'white'
		}
	},
	sidebarLink: {
		alignItems: 'center',
		display: 'flex',
		textDecoration: 'none',
		color: 'inherit'
	},
	sidebarImage: {
		marginRight: '10%'
	},
	sidebarTitle: {
		fontSize: '18px',
		marginBottom: 68,
		fontWeight: 800,
		color: 'white'
	}
}))
