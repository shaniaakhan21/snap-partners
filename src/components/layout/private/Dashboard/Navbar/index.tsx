// import { MoarOptionsVerticalIcon, SearchIcon } from 'components/common/icons'
import { ArrowLeftIcon, MoarOptionsVerticalIcon } from 'components/common/icons'
import { Account } from './Account'
// import { useAuthStore, useDrawerStore, useSearchModalStore } from 'lib/stores'
import { useAuthStore, useDrawerStore } from 'lib/stores'
import { useDashboardGetPathname } from 'lib/hooks/useDashboardGetPathnameData'
import { useRouter } from 'next/router'

export const Navbar = () => {
  const router = useRouter()
  // const { title, pathname } = useDashboardGetPathname()
  const { title } = useDashboardGetPathname()
  const { auth, removeAuth } = useAuthStore()
  const { toggleDrawer } = useDrawerStore()
  // const { toggleGenealogySearch } = useSearchModalStore()

  return (
    <header className='dashboardLayout__navbar h-16'>
      <div className='w-full h-full px-6 py-3 flex justify-between items-center max-w-7xl mx-auto'>
        <section className='w-1/2 h-full flex justify-between items-center gap-x-5'>
          <div className='lg:hidden cursor-pointer' onClick={toggleDrawer}>
            <MoarOptionsVerticalIcon />
          </div>

          <div className='hidden lg:flex justify-start items-center'>
            <button
              onClick={() => router.back()}
              className='mr-2'
            >
              <ArrowLeftIcon classes='mt-1 w-7 h-7' isHovered />
            </button>

            <span className='text-2xl font-bold text-gray-700 whitespace-nowrap'>{title}</span>
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

          {/* <div className='w-full flex justify-start items-center'>
            <button onClick={() => toggleGenealogySearch(pathname)}>
              <SearchIcon classes='w-5 h-5' />
            </button>
          </div> */}
        </section>

        {
          auth && <Account
            name={auth.name}
            email={auth.email}
            signOut={removeAuth}
            phone={auth.phoneNumber}
            photoUrl={null}
          />
        }
      </div>
    </header>
  )
}