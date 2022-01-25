import React from 'react'
import { Genealogy } from '../../pages/private'
import { CommonComponents, PrivateRoute } from '../../components'
import { BackOfficeLayout } from '../../layouts/private/BackOffice'
import { DrawerProvider } from '../../contexts/Drawer'

const PrivateRoutesArray = [
	{ path: '/genealogy', component: <CommonComponents sidebar><Genealogy /></CommonComponents> }
]

const PrivateRoutes = () => {
	const routes = []

	for (const route of PrivateRoutesArray) {
		routes.push(
			<PrivateRoute exact path={route.path} component={() =>
				<DrawerProvider>
					<BackOfficeLayout>
						{route.component}
					</BackOfficeLayout>
				</DrawerProvider>
			}/>
		)
	}

	return routes
}

export default PrivateRoutes
