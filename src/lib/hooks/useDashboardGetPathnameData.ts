import { useRouter } from 'next/router'
import { dashboardPathnames } from 'lib/utils/dashboardPathnames'

export const useDashboardGetPathname = () => {
  const router = useRouter()

  const pathnamesArray = Object.values(dashboardPathnames)
  const pathnameData = pathnamesArray.find(pathnameData => router.pathname.includes(pathnameData.pathname))

  return pathnameData
}
