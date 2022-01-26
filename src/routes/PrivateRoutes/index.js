import React from 'react'
import { Genealogy, MarketingPage } from '../../pages/private'
import { CommonComponents, PrivateRoute } from '../../components'
import { BackOfficeLayout } from '../../layouts/private/BackOffice'
import { DrawerProvider } from '../../contexts/Drawer'

const PrivateRoutesArray = [
	{ path: '/genealogy', component: <CommonComponents sidebar><Genealogy /></CommonComponents> },
	{ path: '/marketing', component: <MarketingPage /> },
	{ path: '/marketing/customers', component: <MarketingPage /> },
	{ path: '/marketing/drivers', component: <MarketingPage /> },
	{ path: '/marketing/restaurants', component: <MarketingPage /> },
	{ path: '/marketing/ibo', component: <MarketingPage /> }
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
