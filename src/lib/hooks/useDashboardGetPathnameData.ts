import { useRouter } from 'next/router'

import { globalRoutes } from 'components/layout/private/Dashboard/Drawer/routes'

interface IDashboardGetPathnameReturn {
  pathname: string,
  title: string
}

export const useDashboardGetPathname = (): IDashboardGetPathnameReturn => {
  const router = useRouter()

  const flattenRoutes = (routes) => {
    let flatRoutes = []
    routes.forEach(route => {
      flatRoutes.push(route)

      if (route.subItems) {
        flatRoutes = flatRoutes.concat(route.subItems)
      }
    })
    return flatRoutes
  }

  const flatRoutes = flattenRoutes(globalRoutes);
  const pathnameData = flatRoutes.find(pathnameData => router.pathname.includes(pathnameData.to));

  return pathnameData
    ? {
      pathname: pathnameData.to,
      title: pathnameData.label
    }
    : null
}
