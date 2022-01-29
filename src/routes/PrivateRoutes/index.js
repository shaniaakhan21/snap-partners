import React from 'react'
import {
	Genealogy,
	Referrals,
	MarketingPage,
	CustomersPage,
	DriversPage,
	RestaurantsPage,
	IBOPage,
	CompensationPlanPage
} from '../../pages/private'
import { PrivateRoute } from '../../components'
import { BackOfficeLayout } from '../../layouts/private/BackOffice'
import { DrawerProvider } from '../../contexts/Drawer'
import { SearchModalProvider } from '../../contexts/SearchModal'

const PrivateRoutesArray = [
	{ path: '/genealogy', component: <Genealogy /> },
	{ path: '/referrals', component :<Referrals /> },
	{ path: '/marketing', component: <MarketingPage /> },
	{ path: '/marketing/customers', component: <CustomersPage /> },
	{ path: '/marketing/drivers', component: <DriversPage /> },
	{ path: '/marketing/restaurants', component: <RestaurantsPage /> },
	{ path: '/marketing/ibo', component: <IBOPage /> },
	{ path: '/compensation-plan', component: <CompensationPlanPage /> }
]

const PrivateRoutes = () => {
	const routes = []

	PrivateRoutesArray.forEach((route, i) => {
		routes.push(
			<PrivateRoute key={i} exact path={route.path} component={() =>
				<DrawerProvider>
					<SearchModalProvider>
						<BackOfficeLayout>
							{route.component}
						</BackOfficeLayout>
					</SearchModalProvider>
				</DrawerProvider>
			}/>
	)})

	return routes
}

export default PrivateRoutes
