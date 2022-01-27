import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '240px 1fr',
		gridTemplateRows: '64px 1fr',
		gridTemplateAreas: `"sidebar navbar"
												"sidebar content"`,
		backgroundColor: '#ECECEC',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr',
			gridTemplateRows: 'auto',
			gridTemplateAreas: `"navbar"
													"content"`
		}
	},
	profileContainer: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	profile: {
		'&:hover': {
			cursor: 'pointer'
		},
		marginRight: 16,
		[theme.breakpoints.down('sm')]: {
			marginRight: 0
		}
	},
	buttonLogout: {
		'&:hover': {
			cursor: 'pointer',
			fontWeight: 700
		}
	},
	navbar: {
		gridArea: 'navbar',
		backgroundColor: '#ffffff',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 24px',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	navbarMobile: {
		gridArea: 'navbar',
		backgroundColor: '#ffffff',
		display: 'none',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 18px',
		width: '100%',
		position: 'fixed',
		zIndex: '99',
		[theme.breakpoints.down('sm')]: {
			display: 'flex'
		}
	},
	navbarTitle: {
		fontSize: '22px',
		fontWeight: 700,
		color: '#585858'
	},
	sidebar: {
		gridArea: 'sidebar'
	},
	sidebarMobile: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		},
		minWidth: '164px',
		position: 'absolute',
		top: 60,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		listStyle: 'none',
		backgroundColor: '#DD4C37',

		margin: 0,
		paddingTop: '64px',
		paddingRight: 0,
		paddingLeft: 0
	},
	content: {
		gridArea: 'content',
		minHeight: '100vh',
		padding: '78px 18px 18px',
		fontFamily: 'Arial',
		[theme.breakpoints.up('md')]: {
			padding: '18px',
		}
	}
}))
