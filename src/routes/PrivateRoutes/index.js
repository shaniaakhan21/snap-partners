import React from 'react'
import { Genealogy, Referrals } from '../../pages/private'
import { CommonComponents, PrivateRoute } from '../../components'
import { BackOfficeLayout } from '../../layouts/private/BackOffice'
import { DrawerProvider } from '../../contexts/Drawer'

const PrivateRoutesArray = [
	{ path: '/genealogy', component: <CommonComponents sidebar><Genealogy /></CommonComponents> },
	{ path:'/referrals' , component :<CommonComponents sidebar><Referrals /></CommonComponents> },
]

const PrivateRoutes = () => {
	const routes = []

	PrivateRoutesArray.forEach((route, i) => {
		routes.push(
			<PrivateRoute key={i} exact path={route.path} component={() =>
				<DrawerProvider>
					<BackOfficeLayout>
						{route.component}
					</BackOfficeLayout>
				</DrawerProvider>
			}/>
	)})

	return routes
}

export default PrivateRoutes
