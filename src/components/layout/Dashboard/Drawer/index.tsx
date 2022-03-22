import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'

import { DrawerDesktop } from './Desktop'
import { DrawerMobile } from './Mobile'

export const Drawer = () => {
  const router = useRouter()
  const { auth } = useAuthStore()

  const handleIsCurrentlyPage = (routeLink: string) => { // Should be refactor
    return (
      router.asPath === routeLink ||
      router.asPath === `${routeLink}/customers` ||
      router.asPath === `${routeLink}/drivers` ||
      router.asPath === `${routeLink}/merchants` ||
      router.asPath === `${routeLink}/ibo` ||
      router.asPath === `${routeLink}/comingsoon` ||
      router.asPath === `${routeLink}/profile`
    )
  }

  return (
    <>
      <DrawerDesktop isCurrentlyPage={handleIsCurrentlyPage} isManager={auth.isManager} />
      <DrawerMobile isCurrentlyPage={handleIsCurrentlyPage} isManager={auth.isManager} />
    </>
  )
}
