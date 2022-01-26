import React from 'react'
import { DrawerContext } from '../../../../contexts/Drawer'
import SideNav from '../../../../components/SideNav'
import { useStyles } from './styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const DrawerMobile = () => {
	const classes = useStyles()
	const { drawerDispatch } = React.useContext(DrawerContext)

	return (
		<div className={classes.wrapper}>
			<div onClick={() => drawerDispatch(false)} style={{ zIndex: 5, backgroundColor: '#00000026', height: '100%', width: '100%', position: 'absolute' }}></div>

			<aside style={{ zIndex: 10, width: 225, backgroundColor: '#DD4C37', height: '100%', position: 'absolute' }}>
				{
					SideNav().map(item => {
						return (
							<li key={item.name} className={location.pathname === item.link ? classes.sidebarItem_currentRoute : classes.sidebarItem}>
								<Link className={classes.sidebarLink} to={item.link}>
									{item.icon}
									<Typography variant="body1" style={{ marginLeft: 10 }}>{item.name}</Typography>
								</Link>
							</li>
						)
					})
				}
			</aside>
		</div>
	)
}
