// import { MoarOptionsVerticalIcon, SearchIcon } from 'components/common/icons'
import { ArrowLeftIcon, MoarOptionsVerticalIcon } from 'components/common/icons'
import { Account } from './Account'
// import { useAuthStore, useDrawerStore, useSearchModalStore } from 'lib/stores'
import { useAuthStore, useDrawerStore } from 'lib/stores'
import { useDashboardGetPathname } from 'lib/hooks/useDashboardGetPathnameData'
import { useRouter } from 'next/router'
import { Button } from '../../../../common/Button'

export const Navbar = () => {
  const router = useRouter()
  // const { title, pathname } = useDashboardGetPathname()
  const { title } = useDashboardGetPathname()
  const { auth, removeAuth } = useAuthStore()
  const { toggleDrawer } = useDrawerStore()
  // const { toggleGenealogySearch } = useSearchModalStore()
  console.log('auth level is', auth)
  return (
    <header className='dashboardLayout__navbar h-16'>
      <div className='w-full h-full px-6 py-3 flex justify-between items-center max-w-7xl mx-auto'>
        <section className='w-1/3 h-full flex justify-between items-center gap-x-5'>
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
        <section className='w-full h-full flex justify-end items-center gap-x-5'>
          <a target="_blank" href={`https://mysnappartners.com/login/token=${auth.accessToken}`}>
            <Button classes='text-sm bg-primary-500'>
              Your Builder Website
            </Button>
          </a>
          <a target="_blank" href={`/wellness/${auth.referralCode}?access_token=${auth.accessToken}`}>
            <Button classes='text-sm bg-primary-500'>
              Your Snap Wellness Store
            </Button>
          </a>
        </section>

        {auth && <Account
          roles={auth.roles}
          name={auth.name}
          email={auth.email}
          signOut={removeAuth}
          phone={auth.phoneNumber}
          photoUrl={auth.profileImage}
          rank={auth?.ranks?.type}
          level={auth?.level}
        />}
      </div>
    </header>
  )
}
