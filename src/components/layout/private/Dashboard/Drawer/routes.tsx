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
    label: 'Overview'
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
    to: '/customer-reports',
    label: 'Customer Reports'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/driver-reports',
    label: 'Driver Reports'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/merchant-reports',
    label: 'Merchant Reports'
  },
  {
    icon: <TrainingIcon />,
    to: '/training',
    label: 'Training'
  },
  {
    icon: <GenealogyIcon />,
    to: '/ercreferrals',
    label: 'ERC Reporting'
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
  // {
  //  icon: <GenealogyIcon />,
  //  to: '/tree',
  //  label: 'Tree'
  // },
  {
    icon: <CompensationPlanIcon />,
    to: '/compensation-plan',
    label: 'Compensation Plan'
  },
  {
    icon: <AccountIcon />,
    to: '/profile',
    label: 'Profile'
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
  },
  {
    icon: <VidgoLogo />,
    to: '/vidgo-reporting',
    label: 'Vidgo Reporting'
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
