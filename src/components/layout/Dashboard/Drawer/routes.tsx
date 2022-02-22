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
    label: 'My Referrals Link'
  },
  {
    icon: <MarketingIcon />,
    to: '/marketing',
    label: 'Marketing Tools'
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
