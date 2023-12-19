import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { Fragment, ReactNode, useState } from 'react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { setLocalStorage, getLocalStorage } from 'lib/utils/localStorage'

import { drawerRoutes } from './routes'

export const DrawerDesktop = ({ isCurrentlyPage, auth, isManager, isAdmin }: { isCurrentlyPage: (route: string) => boolean, auth:any, isManager: boolean, isAdmin: boolean }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [drawerWidth, setDrawerWidth] = useState(180)
  const [arrowPosition, setArrowPosition] = useState(40)

  const increaseWidth = () => {
    setDrawerWidth((prevWidth) => {
      const newWidth = Math.min(prevWidth + 220, 260)
      setArrowPosition(40)
      return newWidth
    })
  }

  const decreaseWidth = () => {
    setDrawerWidth((prevWidth) => {
      const newWidth = Math.max(prevWidth - 240, 20)
      setArrowPosition(newWidth === 40 ? 40 : -150)
      return newWidth
    })
  }

  const renderArrowIcon = () => {
    const arrowStyle = {
      transform: `translateX(${arrowPosition}px)`
    }
    if (drawerWidth === 260) {
      return <ArrowBackIos className='' sx={{ fill: 'black!important' }} onClick={decreaseWidth} style={arrowStyle} />
    } else if (drawerWidth === 20) {
      return <ArrowForwardIos className='' sx={{ fill: 'black!important' }} onClick={increaseWidth} style={arrowStyle} />
    }
    return <ArrowBackIos className='' sx={{ fill: 'black!important' }} onClick={decreaseWidth} style={arrowStyle} />
  }
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
    <>
      <div className='duration-500 hidden lg:block absolute left-16 top-16 mt-1 rounded-full w-8 h-8 z-50 bg-white'>
        {renderArrowIcon()}
      </div>
      <aside className={`relative dashboardLayout__drawer scroll-primary rounded-[20px] shadow-xl w-${drawerWidth} duration-500`}>
        <section className='sticky top-0 z-10 pl-8 pr-5 py-4 flex justify-start items-center gap-x-4 bg-blackCustom'>
          <img src='/static/logo-white.svg' />
          <h1 className='text-white font-semibold text-2xl'>SNAP</h1>
        </section>
        <ul className='text-[#000000]'>
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
                  className='w-full'
                  key={route.label}
                >
                  {renderMenuItem(
                    <a
                      target={route.to.includes('https') ? '_blank' : '_self'}
                      rel='noopener noreferrer'
                      className={`w-full relative ${isCurrentlyPage(route.to) && 'linkWrapper__activate'} relative cursor-pointer w-full flex justify-start items-center gap-x-2 py-5 hover:bg-slate-100 pl-8 duration-500 font-semibold text-base `}
                      
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
                      <div className='LeftMenuIcon'>{route.icon}</div>
                      <div className='LeftMenuText'>{route.label}</div>
                    </a>,
                    !!route.subItems,
                    route.label.includes('Shopping Cart') ? `https://www.integrouswellness.com/${auth.referralCode}?access_token=${auth.accessToken}` : route.to
                  )}
                  {route.subItems && activeSubmenu === index && (
                    <ul>
                      {route.subItems.map(subItem => (
                        <li key={subItem.label}>
                          <Link href={subItem.to}>
                            <a
                              className='w-full flex justify-start items-center gap-x-2 py-3 hover:bg-slate-100 pl-20 text-base font-semibold'
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
    </>
  )
}
