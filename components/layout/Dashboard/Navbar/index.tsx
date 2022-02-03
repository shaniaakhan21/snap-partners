import { MoarOptionsVerticalIcon, NotificationIcon, SearchIcon } from 'components/common/icons'
import { useAuthStore, useDrawerStore } from 'lib/stores'
import { useSearchModalStore } from 'lib/stores/SearchModal'
import { Profile } from './Profile'

export const Navbar = () => {
  const { auth, signOut } = useAuthStore()
  const { toggleDrawer } = useDrawerStore()
  const { referralsIsOpen, setReferralIsOpen } = useSearchModalStore()

  const handleClickButtonSearch = () => {
    setReferralIsOpen(!referralsIsOpen)
  }

  return (
    <header className='dashboardLayout__navbar h-16'>
      <div className='w-full h-full px-6 py-3 flex justify-between items-center max-w-7xl mx-auto'>
        <section className='w-1/2 h-full flex justify-between items-center gap-x-5'>
          <div className='lg:hidden cursor-pointer' onClick={toggleDrawer}>
            <MoarOptionsVerticalIcon />
          </div>

          <div className='hidden lg:block'>
            <span className='text-2xl font-bold'>Dashboard</span>
          </div>

          {/* <div className='w-full flex justify-start items-center'>
            <SearchIcon classes='w-5 h-5' />

            <input
              id=''
              name=''
              type='text'
              placeholder='Search'
              className='py-1 px-2 w-28'
            />
          </div> */}

          <div className='w-full flex justify-start items-center'>
            <button onClick={handleClickButtonSearch}>
              <SearchIcon classes='w-5 h-5' />
            </button>
          </div>
        </section>

        <section className='w-full h-full flex justify-end items-center gap-x-5'>
          <div className='relative'>
            <NotificationIcon classes='w-6 h-6' />
            <div className='absolute -top-2 -right-4 h-5 w-5 bg-primary-500 rounded-full text-white flex justify-center items-center'>
              <span>3</span>
            </div>
          </div>

          {
            auth && <Profile
              name={auth.name}
              email={auth.email}
              signOut={signOut}
              phone={auth.phone}
            />
          }
        </section>
      </div>
    </header>
  )
}
