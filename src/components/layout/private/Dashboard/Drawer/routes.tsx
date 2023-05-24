import {
  DashboardIcon,
  ReferralLinksIcon,
  MarketingIcon,
  GenealogyIcon,
  CompensationPlanIcon,
  RelojTempIcon,
  AccountIcon,
  TrainingIcon,
  CreditCardIcon,
  CubeIcon
} from 'components/common/icons'
import { VidgoLogo } from 'components/common/illustrations'

export const drawerRoutes = [
  {
    icon: <DashboardIcon />,
    to: '/overview',
    label: 'Dashboard',
    integrous: true
  },
  {
    icon: <ReferralLinksIcon />,
    to: '/referrals',
    label: 'My Referral Links'
  },
  {
    icon: <MarketingIcon />,
    to: '/marketing',
    label: 'Marketing Tools'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/reports',
    label: 'Reports',
    subItems: [
      // {
      //   label: 'Global',
      //   to: '/global-reports'
      // },
      // {
      //   label: 'Customer',
      //   to: '/customer-reports'
      // },
      // {
      //   label: 'Driver',
      //   to: '/driver-reports'
      // },
      // {
      //   label: 'Merchant',
      //   to: '/merchant-reports'
      // },
      {
        label: 'ERC',
        to: '/ercreferrals'
      },
      {
        label: 'Vidgo',
        to: '/vidgo-reporting'
      }
    ]
  },
  {
    icon: <TrainingIcon />,
    to: '/training',
    label: 'Training'
  },
  {
    icon: <RelojTempIcon />,
    to: 'https://snapdelivered.ourproshop.com/',
    label: 'Tools'
  },
  {
    icon: <GenealogyIcon />,
    to: '/genealogy',
    label: 'Genealogy'
  },
  {
    icon: <GenealogyIcon />,
    to: '/tree',
    label: 'Tree',
    integrous: true
   },
   {
    icon: <GenealogyIcon />,
    to: '/binarytree',
    label: 'Binary Tree',
    integrous: true
   },
  {
    icon: <CompensationPlanIcon />,
    to: '/compensation-plan',
    label: 'Compensation Plan'
  },
  {
    icon: <AccountIcon />,
    to: '/profile',
    label: 'Profile',
    integrous: true
  },
  {
    icon: <CubeIcon />,
    to: '/my-points',
    label: 'My Points',
    snap: true
  },
  {
    icon: <CreditCardIcon />,
    to: '/my-wallet',
    label: 'My Wallet'
  }
]

export const globalRoutes = [
  ...drawerRoutes.map(route => {
    const routeNormalized = { ...route }
    delete routeNormalized.icon

    return routeNormalized
  }),
  {
    to: '/legal/privacy-policy',
    label: 'Privacy Policy'
  },
  {
    to: '/legal/terms-of-use',
    label: 'Terms Of Use'
  },
  {
    to: '/become-role',
    label: 'Become Role'
  },
  {
    to: '/my-wallet',
    label: 'My Wallet'
  }
]

interface IDashboardPatname {
  pathname: string,
  title: string
}

export const dashboardPathnames: { [key: string]: IDashboardPatname } = drawerRoutes.reduce((obj, item) => {
  const pathname = item.to
  const pathnameWithoutSlash = pathname.substring(1)

  const removeSeparator = (str: string, separatorChard: string) => {
    const newStr = str.split(separatorChard).reduce((str, element, index) => {
      const currentElement = index === 0
        ? element
        : `${element.charAt(0).toLocaleUpperCase()}${element.substring(1)}`

      return `${str}${currentElement}`
    }, '')

    if (newStr.includes(separatorChard)) {
      removeSeparator(newStr, separatorChard)
    }

    return newStr
  }

  const pathnameWithoutMinor = pathnameWithoutSlash.includes('-') ? removeSeparator(pathnameWithoutSlash, '-') : pathnameWithoutSlash
  const key = pathnameWithoutMinor.includes('_') ? removeSeparator(pathnameWithoutMinor, '_') : pathnameWithoutSlash

  return {
    ...obj,
    [key]: {
      pathname: item.to,
      title: item.label
    }
  }
}, {})
