import { drawerRoutes } from 'components/layout/Dashboard/Drawer/routes'
import { useRouter } from 'next/router'

interface IDashboardGetPathnameReturn {
  pathname: string,
  title: string
}

export const useDashboardGetPathname = (): IDashboardGetPathnameReturn | null => {
  const router = useRouter()

  const pathnameData = drawerRoutes.find(pathnameData => router.pathname.includes(pathnameData.to))

  return pathnameData
    ? {
      pathname: pathnameData.to,
      title: pathnameData.label
    }
    : null
}
