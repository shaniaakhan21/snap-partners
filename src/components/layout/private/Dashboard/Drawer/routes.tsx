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
import { SnapPartnersIcon } from 'components/common/icons/SnapPartners'
import { SnapWellnessIcon } from 'components/common/icons/SnapWellness'
import { VidgoLogo } from 'components/common/illustrations'

export const drawerRoutes = [
  {
    icon: <SnapPartnersIcon />,
    to: '/overview#snap-partners',
    label: 'Visit Snap Partners Backoffice',
    i18n: 'drawer.overview.snap-partners',
    integrous: true
  },
  {
    icon: <SnapWellnessIcon />,
    to: '/overview#snap-wellness',
    label: 'Visit Snap Wellness Backoffice',
    i18n: 'drawer.overview.snap-wellness',
    integrous: true
  },
  {
    icon: <DashboardIcon />,
    to: '/overview',
    label: 'Dashboard',
    i18n: 'drawer.overview-main',
    integrous: true
  },
  {
    icon: <ReferralLinksIcon />,
    to: '/referrals',
    label: 'My Referral Links',
    i18n: 'drawer.referrals'
  },
  {
    icon: <MarketingIcon />,
    to: '/marketing',
    label: 'Marketing Tools',
    i18n: 'drawer.marketing'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/reports',
    label: 'Reports',
    i18n: 'drawer.reports-main',
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
        to: '/ercreferrals',
        i18n: 'drawer.reports.ercreferrals'
      },
      {
        label: 'Vidgo',
        to: '/vidgo-reporting',
        i18n: 'drawer.reports.vidgo-reporting'
      }
    ]
  },
  {
    icon: <TrainingIcon />,
    to: '/training',
    label: 'Training',
    i18n: 'drawer.training'
  },
  {
    icon: <RelojTempIcon />,
    to: 'https://snapdelivered.ourproshop.com/',
    label: 'Tools',
    i18n: 'drawer.tools'
  },
  {
    icon: <GenealogyIcon />,
    to: '/genealogy',
    label: 'Genealogy',
    i18n: 'drawer.genealogy',
    integrous: true
  },
  {
    icon: <GenealogyIcon />,
    to: '/tree',
    label: 'Tree',
    i18n: 'drawer.tree'
  },
  {
    icon: <GenealogyIcon />,
    to: '/binarytree',
    label: 'Binary Tree',
    i18n: 'drawer.binarytree',
    integrous: true
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/compensation-plan',
    label: 'Compensation Plan',
    i18n: 'drawer.compensation-plan'
  },
  {
    icon: <AccountIcon />,
    to: '/profile',
    label: 'Profile',
    i18n: 'drawer.profile',
    integrous: true
  },
  {
    icon: <CubeIcon />,
    to: '/my-points',
    label: 'My Points',
    i18n: 'drawer.my-points',
    snap: true
  },
  {
    icon: <CreditCardIcon />,
    to: '/my-wallet',
    label: 'My Wallet',
    i18n: 'drawer.my-wallet'
  },
  {
    icon: <CompensationPlanIcon />,
    to: '/Documents',
    label: 'Documents',
    i18n: 'drawer.documents'
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
  },
  {
    to: '/search',
    label: 'Advance Search'
  },
  {
    to: '/search/profile',
    label: 'Individual Profile'
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
