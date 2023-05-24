import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { Fragment, ReactNode, useState } from 'react'

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

            const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)
            if (!route.integrous && isIntegrous) return <Fragment key={route.label} />

            if (route.to === '/binarytree' && !isIntegrous) return <Fragment key={route.label} />

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
                      GTMTrack.navbarPress(route.label)
                      if (route.subItems) toggleSubmenu(index)
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
  )
}
