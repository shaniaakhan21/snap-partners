import React from 'react'
import {
	Genealogy,
	MarketingPage,
	CustomersPage,
	DriversPage,
	RestaurantsPage,
	IBOPage,
	CompensationPlanPage
} from '../../pages/private'
import { CommonComponents, PrivateRoute } from '../../components'
import { BackOfficeLayout } from '../../layouts/private/BackOffice'
import { DrawerProvider } from '../../contexts/Drawer'

const PrivateRoutesArray = [
	{ path: '/genealogy', component: <CommonComponents sidebar><Genealogy /></CommonComponents> },
	{ path: '/marketing', component: <MarketingPage /> },
	{ path: '/marketing/customers', component: <CustomersPage /> },
	{ path: '/marketing/drivers', component: <DriversPage /> },
	{ path: '/marketing/restaurants', component: <RestaurantsPage /> },
	{ path: '/marketing/ibo', component: <IBOPage /> },
	{ path: '/compensation-plan', component: <CompensationPlanPage /> }
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
