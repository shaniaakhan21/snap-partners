import React from 'react'
import { DashboardIcon, ReferralLinksIcon, MarketingIcon, GenealogyIcon } from '../icons'

const SideNav = () => {
	return [
		{
			icon: <DashboardIcon />,
			name: 'Dashboard',
			link: '/dashboard',
			side: true
		},
		{
			icon: <ReferralLinksIcon />,
			name: 'My Referral links',
			link: '/referrals',
			side: true
		},
		{
			icon: <MarketingIcon />,
			name: 'Marketing',
			link: '/marketing',
			side: true
		},
		{
			icon: <GenealogyIcon />,
			name: 'Genealogy',
			link: '/genealogy',
			side: true
		},
		{
			icon: <GenealogyIcon />,
			name: 'Compensation Plan',
			link: '/compensation-plan',
			side: true
		}
	]
}

export default SideNav
