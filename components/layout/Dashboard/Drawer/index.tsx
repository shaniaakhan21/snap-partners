import { useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDrawerStore } from 'lib/stores'
import {
  DashboardIcon,
  ReferralLinksIcon,
  MarketingIcon,
  GenealogyIcon,
  CompensationPlanIcon
} from 'components/common/icons'

export const Drawer = () => {
  const router = useRouter()
  const { isOpen, closeDrawer } = useDrawerStore()
  const { current: routes } = useRef([
    {
      icon: <DashboardIcon />,
      to: '/dashboard',
      label: 'Dashboard'
    },
    {
      icon: <ReferralLinksIcon />,
      to: '/dashboard/referrals',
      label: 'My Referrals links'
    },
    {
      icon: <MarketingIcon />,
      to: '/dashboard/marketing',
      label: 'Marketing'
    },
    {
      icon: <GenealogyIcon />,
      to: '/dashboard/genealogy',
      label: 'Genealogy'
    },
    {
      icon: <CompensationPlanIcon />,
      to: '/dashboard/compensation-plan',
      label: 'Compensation Plan'
    }
  ])

  const isCurrentlyPage = (routeLink: string) => {
    return (
      router.pathname === routeLink ||
      router.pathname === `${routeLink}/customers` ||
      router.pathname === `${routeLink}/drivers` ||
      router.pathname === `${routeLink}/restaurants` ||
      router.pathname === `${routeLink}/ibo`
    )
  }

  return (
    <>
      {/* Drawer Desktop */}
      <aside className='dashboardLayout__drawer hidden lg:block lg:z-40'>
        <section className='mt-16 pl-10'>
          <h2 className='text-white font-bold text-2xl'>SnapDelivered</h2>
        </section>

        <ul className='mt-10 text-white'>
          {
            routes.map(route => (
              <li
                className={`w-full relative ${isCurrentlyPage(route.to) && 'linkWrapper__activate'}`}
                key={route.label}
              >
                <Link href={route.to}>
                  <a className='w-full flex justify-start items-center gap-x-2 py-4 hover:bg-[#19191914] pl-10'>
                    <div>{route.icon}</div>
                    <div>{route.label}</div>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </aside>

      {/* Drawer Mobile */}
      <div
        style={{ transition: 'all 200ms ease-in-out' }}
        className={`top-16 left-0 w-full h-full z-20 overflow-hidden fixed lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className='inset-0 fixed flex justify-center items-center'
          style={{ backdropFilter: 'blur(0.4rem)' }}
          onClick={closeDrawer}
        >
          <aside className={`dashboardLayout__drawer absolute h-screen lg:hidden ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            <section className='mt-16 pl-10'>
              <h2 className='text-white font-bold text-2xl'>SnapDeliver</h2>
            </section>

            <ul className='mt-10 text-white'>
              {
                routes.map(route => (
                  <li
                    className={`w-full relative ${isCurrentlyPage(route.to) && 'linkWrapper__activate bg-[#19191914]'}`}
                    key={route.label}
                  >
                    <Link href={route.to}>
                      <a className='w-full flex justify-start items-center gap-x-2 py-4 hover:bg-[#19191914] pl-10'>
                        <div>{route.icon}</div>
                        <div>{route.label}</div>
                      </a>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </aside>
        </div>
      </div>
    </>
  )
}
