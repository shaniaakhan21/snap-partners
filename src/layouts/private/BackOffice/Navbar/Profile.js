import React from 'react'
import { useStyles } from '../styles'
import { useDispatch } from 'react-redux'
import { ArrowDownIcon } from '../../../../components/icons'

export const ProfileMobile = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [showOptions, setShowOptions] = React.useState(false)

	const logout = () => {
		localStorage.removeItem('token')
		dispatch({
			type: 'auth/authenticate',
			payload: {
				isAuth: false
			}
		})
	}

	return (
		<div className={classes.profileContainer}>
			<img
				src='/svg/avatarAuth.png'
				className={classes.profile}
				onClick={() => setShowOptions(prevState => !prevState)}
			/>

			<div style={{
				position: 'absolute',
				top: -6,
				right: -12,
				height: 20,
				width: 20,
				backgroundColor: '#FF4343',
				borderRadius: 999,
				display: 'flex',
				justifyContent: 'center',
				items: 'center',
				paddingTop: 1,
				paddingLeft: 1
			}}>
				<span style={{ color: 'white', userSelect: 'none' }}>3</span>
			</div>

			{
				showOptions &&
				<div style={{ position: 'absolute', bottom: -28, left: -38, backgroundColor: 'white', padding: '6px 12px', borderRadius: '4px', boxShadow: '1px 2px 4px #d7d7d7' }}>
					<span className={classes.buttonLogout} onClick={logout}>Logout</span>
				</div>
			}
		</div>
	)
}

export const ProfileDesktop = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [showOptions, setShowOptions] = React.useState(false)

	const logout = () => {
		localStorage.removeItem('token')
		dispatch({
			type: 'auth/authenticate',
			payload: {
				isAuth: false
			}
		})
	}

	return (
		<div style={{ marginLeft: 36, display: 'flex', alignItems: 'center' }}>
			<img
				src='/svg/avatarAuth.png'
				className={classes.profile}
			/>

			<div style={{ marginRight: 23 }}>
				<span style={{ color: '#8C92A9' }}>User name</span> <br/>
				<span style={{ color: '#585858', fontWeight: 500 }}>Cameron Williamson</span>
			</div>

			<div style={{ cursor: 'pointer', position: 'relative' }}>
				<ArrowDownIcon onClick={() => setShowOptions(prevState => !prevState)} />

				{
					showOptions &&
				<div style={{ position: 'absolute', bottom: -38, left: -40, backgroundColor: 'white', padding: '6px 12px', borderRadius: '4px', boxShadow: '1px 2px 4px #d7d7d7' }}>
					<span className={classes.buttonLogout} onClick={logout}>Logout</span>
				</div>
				}
			</div>
		</div>
	)
}
