import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { Fragment, ReactNode, useState } from 'react'
import { setLocalStorage, getLocalStorage } from 'lib/utils/localStorage'

import { drawerRoutes } from './routes'

export const DrawerDesktop = ({ isCurrentlyPage, auth, isManager, isAdmin }: { isCurrentlyPage: (route: string) => boolean, auth:any, isManager: boolean, isAdmin: boolean }) => {
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
  const isIntegrousAssociate = auth.roles.integrousAssociate
  const isIntegrousCustomer = auth.roles.integrousCustomer && !auth.roles.integrousAssociate

  const currentOverview = getLocalStorage('currentBackoffice') || ''

  return (
    <aside className='dashboardLayout__drawer scroll-primary'>
      <section className='mt-16 pl-10 flex justify-start items-center gap-x-2'>
        <img src='/images/logo-dark.png' className='w-7' />
      </section>

      <ul className='my-10 text-white'>
        {
          drawerRoutes.map((route, index) => {
            if ((isAdmin || isManager) && route.to === '/upgrade-to-manager') return <Fragment key={route.label} />

            const isSnap = (auth.roles.customer || auth.roles.driver || auth.roles.merchant)
            if (route.snap && !isSnap) return <Fragment key={route.label} />

            if (!['/overview', '/profile'].includes(route.to) && isIntegrousCustomer) return <Fragment key={route.label} />

            if (currentOverview === '') {
              if (!route.integrous && isIntegrous) return <Fragment key={route.label} />
            }

            if (currentOverview === 'partners') {
              if (route.to === '/binarytree') return <Fragment key={route.label} />
            }

            if (route.to === '/binarytree' && !isIntegrousAssociate) return <Fragment key={route.label} />
            if (route.label.includes('Visit') && !isIntegrousAssociate) return <Fragment key={route.label} />
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
                    rel='noopener noreferrer'
                    className='cursor-pointer w-full flex justify-start items-center gap-x-2 py-4 hover:bg-[#19191914] pl-10'
                    onClick={() => {
                      if (route.label.includes('Visit Snap Partners')) {
                        setLocalStorage('currentBackoffice', 'partners')
                        return
                      }
                      if (route.label.includes('Visit Snap Wellness')) {
                        setLocalStorage('currentBackoffice', '')
                        return
                      }
                      GTMTrack.navbarPress(route.label)
                      if (route.subItems) toggleSubmenu(index)
                    }}
                  >
                    <div>{route.icon}</div>
                    <div>{route.label}</div>
                  </a>,
                  !!route.subItems,
                  route.label.includes('Shopping Cart') ? `https://www.integrouswellness.com/${auth.referralCode}?access_token=${auth.accessToken}` : route.to
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
  )
}
