import { navbarPress } from 'lib/utils/gtm'
import Link from 'next/link'

import { drawerRoutes } from './routes'

export const DrawerDesktop = ({ isCurrentlyPage }: { isCurrentlyPage: (route: string) => boolean }) => {
  return (
    <aside className='dashboardLayout__drawer scroll-primary'>
      <section className='mt-16 pl-10 flex justify-start items-center gap-x-2'>
        <img src='/images/logo-dark.png' className='w-7' />
        <h2 className='text-white font-bold text-2xl'>SnapDelivered</h2>
      </section>

      <ul className='my-10 text-white'>
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
  )
}
