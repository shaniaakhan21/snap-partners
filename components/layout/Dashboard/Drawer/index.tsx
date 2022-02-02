import { useRouter } from 'next/router'

import { DrawerDesktop } from './Desktop'
import { DrawerMobile } from './Mobile'

export const Drawer = () => {
  const router = useRouter()

  const handleIsCurrentlyPage = (routeLink: string) => { // Should be refactor
    return (
      router.pathname === routeLink ||
      router.pathname === `${routeLink}/customers` ||
      router.pathname === `${routeLink}/drivers` ||
      router.pathname === `${routeLink}/restaurants` ||
      router.pathname === `${routeLink}/ibo` ||
      router.pathname === `${routeLink}/comingsoon`
    )
  }

  return (
    <>
      <DrawerDesktop isCurrentlyPage={handleIsCurrentlyPage} />
      <DrawerMobile isCurrentlyPage={handleIsCurrentlyPage} />
    </>
  )
}
