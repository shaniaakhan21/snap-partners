import React from 'react'
import { useStyles } from './styles'
import { Typography } from '@material-ui/core'
import SideNav from '../SideNav'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
	const classes = useStyles()
	const location = useLocation()

	return (
		<>
			<ul className={classes.sidebarContainer}>
				<div style={{ paddingLeft: 37 }}>
					<h2 className={classes.sidebarTitle}>SnapDeliver</h2>
				</div>
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
			</ul>
		</>
	)
}

export default Sidebar
