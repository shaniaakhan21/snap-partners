import React from 'react'
import { DrawerContext } from '../../../../contexts/Drawer'
import SideNav from '../../../../components/SideNav'
import { useStyles } from './styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Overlay } from '../../../../components/Overlay'

export const DrawerMobile = () => {
	const classes = useStyles()
	const { drawerDispatch } = React.useContext(DrawerContext)

	const isCurrentlyPage = (routeLink) => {
		return (
			location.pathname === routeLink ||
			location.pathname === `${routeLink}/customers` ||
			location.pathname === `${routeLink}/drivers` ||
			location.pathname === `${routeLink}/restaurants` ||
			location.pathname === `${routeLink}/ibo`
		)
	}

	const handleClickOverlay = () => {
		document.body.style.overflowY = 'auto'
		drawerDispatch(false)
	}

	return (
		<div className={classes.wrapper}>
			{/* <div  style={{ zIndex: 5, backgroundColor: '#00000026', height: '100%', width: '100%', position: 'absolute' }} /> */}
			<Overlay onClick={handleClickOverlay}>
				<aside style={{ zIndex: 10, width: 225, left: 0, top: 0, backgroundColor: '#DD4C37', height: '100%', position: 'absolute' }}>
					{
						SideNav().map(item => {
							return (
								<li key={item.name} className={isCurrentlyPage(item.link) ? classes.sidebarItem_currentRoute : classes.sidebarItem}>
									<Link className={classes.sidebarLink} to={item.link}>
										{item.icon}
										<Typography variant="body1" style={{ marginLeft: 10 }}>{item.name}</Typography>
									</Link>
								</li>
							)
						})
					}
				</aside>
			</Overlay>
		</div>
	)
}
