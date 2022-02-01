import React from 'react'
import { DashboardIcon, ReferralLinksIcon, MarketingIcon, GenealogyIcon, CompensationPlanIcon, RelojTempIcon } from '../icons'

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
			icon: <GenealogyIcon />,
			name: 'Genealogy',
			link: '/genealogy',
			side: true
		},
		{
			icon: <MarketingIcon />,
			name: 'Marketing',
			link: '/marketing',
			side: true
		},
		{
			icon: <RelojTempIcon />,
			name: 'Reports',
			link: '/comingsoon',
			side: true
		},
		{
			icon: <RelojTempIcon />,
			name: 'Training',
			link: '/comingsoon',
			side: true
		},
		{
			icon: <RelojTempIcon />,
			name: 'Tools',
			link: '/comingsoon',
			side: true
		},
		{
			icon: <RelojTempIcon />,
			name: 'Recognition',
			link: '/comingsoon',
			side: true
		},
		{
			icon: <CompensationPlanIcon />,
			name: 'Compensation Plan',
			link: '/compensation-plan',
			side: true
		},
		{
			icon: <RelojTempIcon />,
			name: 'Profile',
			link: '/comingsoon'
		}
	]
}

export default SideNav
