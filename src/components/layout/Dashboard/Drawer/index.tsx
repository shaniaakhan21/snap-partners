import { useRouter } from 'next/router'

import { DrawerDesktop } from './Desktop'
import { DrawerMobile } from './Mobile'

export const Drawer = () => {
  const router = useRouter()

  const handleIsCurrentlyPage = (routeLink: string) => { // Should be refactor
    return (
      router.asPath === routeLink ||
      router.asPath === `${routeLink}/customers` ||
      router.asPath === `${routeLink}/drivers` ||
      router.asPath === `${routeLink}/restaurants` ||
      router.asPath === `${routeLink}/ibo` ||
      router.asPath === `${routeLink}/comingsoon` ||
      router.asPath === `${routeLink}/profile`
    )
  }

  return (
    <>
      <DrawerDesktop isCurrentlyPage={handleIsCurrentlyPage} />
      <DrawerMobile isCurrentlyPage={handleIsCurrentlyPage} />
    </>
  )
}
