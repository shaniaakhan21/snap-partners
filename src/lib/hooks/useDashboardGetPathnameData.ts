import { useRouter } from 'next/router'

import { globalRoutes } from 'components/layout/private/Dashboard/Drawer/routes'

interface IDashboardGetPathnameReturn {
  pathname: string,
  title: string
}

export const useDashboardGetPathname = (): IDashboardGetPathnameReturn => {
  const router = useRouter()

  const pathnameData = globalRoutes.find(pathnameData => router.pathname.includes(pathnameData.to))

  return pathnameData
    ? {
      pathname: pathnameData.to,
      title: pathnameData.label
    }
    : null
}
