import {
  DashboardIcon,
  ReferralLinksIcon,
  MarketingIcon,
  GenealogyIcon,
  CompensationPlanIcon,
  RelojTempIcon
} from 'components/common/icons'

export const drawerRoutes = [
  {
    icon: <DashboardIcon />,
    to: '/dashboard',
    label: 'Dashboard'
  },
  {
    icon: <ReferralLinksIcon />,
    to: '/dashboard/referrals',
    label: 'My Referrals links'
  },
  {
    icon: <MarketingIcon />,
    to: '/dashboard/marketing',
    label: 'Marketing'
  },
  {
    icon: <RelojTempIcon />,
    to: '/dashboard/comingsoon',
    label: 'Reports'
  },
  {
    icon: <RelojTempIcon />,
    to: '/dashboard/comingsoon',
    label: 'Training'
  },
  {
    icon: <RelojTempIcon />,
    to: '/dashboard/comingsoon',
    label: 'Tools'
  },
  {
    icon: <RelojTempIcon />,
    to: '/dashboard/comingsoon',
    label: 'Recognition'
  },

  {
    icon: <GenealogyIcon />,
    to: '/dashboard/genealogy',
    label: 'Genealogy'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/dashboard/compensation-plan',
    label: 'Compensation Plan'
  },
  {
    icon: <RelojTempIcon />,
    to: '/dashboard/comingsoon',
    label: 'Profile'
  }
]
