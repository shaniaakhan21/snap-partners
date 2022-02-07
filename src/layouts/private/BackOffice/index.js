import React from 'react'
import { DrawerContext } from '../../../contexts/Drawer'
import { useSelector } from 'react-redux'

import { useStyles } from './styles'
import Sidebar from '../../../components/Sidebar'
import { DrawerMobile } from './Drawer'
import { Navbar } from './Navbar'

// eslint-disable-next-line react/prop-types
export const BackOfficeLayout = ({ children }) => {
	const { drawer: darwerMobile } = React.useContext(DrawerContext)
	const { isAuth } = useSelector(state => state.auth)
	const classes = useStyles()

	return (
		<div className={classes.wrapper}>
			<Navbar />

			{ darwerMobile && <DrawerMobile /> }

			<aside className={classes.sidebar}>
				{(isAuth) && <Sidebar />}
			</aside>

			<main className={classes.content}>
				{children}
			</main>
		</div>
	)
}
