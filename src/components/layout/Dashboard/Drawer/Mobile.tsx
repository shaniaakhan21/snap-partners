import Link from 'next/link'

import { useDrawerStore } from 'lib/stores'
import { drawerRoutes } from './routes'
import { navbarPress } from 'lib/utils/gtm'

export const DrawerMobile = ({ isCurrentlyPage }: { isCurrentlyPage: (route: string) => boolean }) => {
  const { isOpen, closeDrawer } = useDrawerStore()

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
            <h2 className='text-white font-bold text-2xl'>SnapDelivered</h2>
          </section>

          <ul className='mt-10 mb-20 text-white'>
            {
              drawerRoutes.map(route => (
                <li
                  className={`w-full relative ${isCurrentlyPage(route.to) && 'linkWrapper__activate bg-[#19191914]'}`}
                  key={route.label}
                >
                  <Link href={route.to}>
                    <a className='w-full flex justify-start items-center gap-x-2 py-4 hover:bg-[#19191914] pl-10' onClick={() => navbarPress(route.label)}>
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
  )
}
