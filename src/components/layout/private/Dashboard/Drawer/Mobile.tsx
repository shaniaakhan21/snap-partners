import Link from 'next/link'

import { useDrawerStore } from 'lib/stores'
import { drawerRoutes } from './routes'
import { GTMTrack } from 'lib/utils/gtm'
import { Fragment, ReactNode, useState } from 'react'
import { getLocalStorage, setLocalStorage } from 'lib/utils/localStorage'

export const DrawerMobile = ({ isCurrentlyPage, auth, isManager, isAdmin }: { isCurrentlyPage: (route: string) => boolean, auth:any, isManager: boolean, isAdmin: boolean }) => {
  const { isOpen, closeDrawer } = useDrawerStore()
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  const renderMenuItem = (content: ReactNode, hasSubItems: boolean, routeTo: string) => {
    return hasSubItems
      ? (
        content
      )
      : (
        <Link href={routeTo}>{content}</Link>
      )
  }

  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)

  const currentOverview = getLocalStorage('currentBackoffice') || ''

  return (
    <div
      style={{ transition: 'all 200ms ease-in-out' }}
      className={`left-0 w-full h-full z-20 overflow-hidden fixed lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div
        className='inset-0 fixed flex justify-center items-center'
        style={{ backdropFilter: 'blur(0.4rem)' }}
        onClick={closeDrawer}
      >
        <aside className={`dashboardLayout__drawer scroll-primary absolute h-screen lg:hidden ${isOpen ? 'visible opacity-100 block' : 'invisible opacity-0'}`}>
          <section className='mt-32 pl-10'>
          </section>

          <ul className='mt-10 mb-20 text-white'>
            {
              drawerRoutes.map((route, index) => {
                if ((isAdmin || isManager) && route.to === '/upgrade-to-manager') return <Fragment key={route.label} />
                const isSnap = (auth.roles.customer || auth.roles.driver || auth.roles.merchant)
                if (route.snap && !isSnap) return <Fragment key={route.label} />

                if (currentOverview === '') {
                  if (!route.integrous && isIntegrous) return <Fragment key={route.label} />
                }

                if (currentOverview === 'partners') {
                  if (route.to === '/binarytree') return <Fragment key={route.label} />
                }

                if (route.to === '/binarytree' && !isIntegrous) return <Fragment key={route.label} />
                if (route.label.includes('Visit') && !isIntegrous) return <Fragment key={route.label} />
                if (route.label.includes('Visit Snap Partners') && currentOverview === 'partners') return <Fragment key={route.label} />
                if (route.label.includes('Visit Snap Wellness') && currentOverview === '') return <Fragment key={route.label} />

                return (
                  <li
                    className={`w-full relative ${isCurrentlyPage(route.to) && 'linkWrapper__activate bg-[#19191914]'}`}
                    key={route.label}
                  >
                    {renderMenuItem(
                      <a
                        target={route.to.includes('https') ? '_blank' : '_self'}
                        className='cursor-pointer w-full flex justify-start items-center gap-x-2 py-4 hover:bg-[#19191914] pl-10'
                        onClick={(e) => {
                          if (route.label.includes('Visit Snap Partners')) {
                            setLocalStorage('currentBackoffice', 'partners')
                            return
                          }
                          if (route.label.includes('Visit Snap Wellness')) {
                            setLocalStorage('currentBackoffice', '')
                            return
                          }
                          GTMTrack.navbarPress(route.label)
                          if (route.subItems) {
                            e.stopPropagation()
                            toggleSubmenu(index)
                          }
                        }}
                      >
                        <div>{route.icon}</div>
                        <div>{route.label}</div>
                      </a>,
                      !!route.subItems,
                      route.to
                    )}
                    {route.subItems && activeSubmenu === index && (
                      <ul className='mt-2'>
                        {route.subItems.map(subItem => (
                          <li key={subItem.label}>
                            <Link href={subItem.to}>
                              <a
                                className='w-full flex justify-start items-center gap-x-2 py-2 hover:bg-[#19191914] pl-16'
                              >
                                <div>{subItem.label}</div>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })
            }
          </ul>
        </aside>
      </div>
    </div>
  )
}
