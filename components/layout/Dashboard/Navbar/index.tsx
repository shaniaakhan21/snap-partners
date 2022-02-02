import { MoarOptionsVerticalIcon, SearchIcon } from 'components/common/icons'
import { useAuthStore, useDrawerStore } from 'lib/stores'
import { Account } from './Account'

export const Navbar = () => {
  const { auth, signOut } = useAuthStore()
  const { toggleDrawer } = useDrawerStore()

  return (
    <header className='dashboardLayout__navbar h-16'>
      <div className='w-full h-full px-6 py-3 flex justify-between items-center max-w-7xl mx-auto'>
        <section className='w-1/2 h-full flex justify-between items-center gap-x-5'>
          <div className='lg:hidden cursor-pointer' onClick={toggleDrawer}>
            <MoarOptionsVerticalIcon />
          </div>

          <div className='hidden lg:block'>
            <span className='text-2xl font-bold text-gray-700'>Dashboard</span>
          </div>

          <div className='w-full flex justify-start items-center'>
            <SearchIcon classes='w-5 h-5' />

            <input
              id=''
              name=''
              type='text'
              placeholder='Search'
              className='py-1 px-2 w-28'
            />
          </div>
        </section>

        {
          auth && <Account
            name={auth.name}
            email={auth.email}
            signOut={signOut}
            phone={auth.phone}
          />
        }
      </div>
    </header>
  )
}
