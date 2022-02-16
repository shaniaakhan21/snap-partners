import {
  DashboardIcon,
  ReferralLinksIcon,
  MarketingIcon,
  GenealogyIcon,
  CompensationPlanIcon,
  RelojTempIcon,
  AccountIcon
} from 'components/common/icons'

export const drawerRoutes = [
  {
    icon: <DashboardIcon />,
    to: '/overview',
    label: 'Overview'
  },
  {
    icon: <ReferralLinksIcon />,
    to: '/referrals',
    label: 'My Referrals links'
  },
  {
    icon: <MarketingIcon />,
    to: '/marketing',
    label: 'Marketing'
  },
  {
    icon: <RelojTempIcon />,
    to: '/comingsoon',
    label: 'Reports'
  },
  {
    icon: <RelojTempIcon />,
    to: '/comingsoon',
    label: 'Training'
  },
  {
    icon: <RelojTempIcon />,
    to: '/comingsoon',
    label: 'Tools'
  },
  {
    icon: <RelojTempIcon />,
    to: '/comingsoon',
    label: 'Recognition'
  },

  {
    icon: <GenealogyIcon />,
    to: '/genealogy',
    label: 'Genealogy'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/compensation-plan',
    label: 'Compensation Plan'
  },
  {
    icon: <RelojTempIcon />,
    to: '/comingsoon',
    label: 'Profile'
  },
  {
    icon: <AccountIcon />,
    to: '/account',
    label: 'Upgrade Manager'
  }
]
