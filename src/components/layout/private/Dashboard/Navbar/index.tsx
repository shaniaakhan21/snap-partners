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
  const title = useDashboardGetPathname()?.title
  const { auth, removeAuth } = useAuthStore()
  const { toggleDrawer } = useDrawerStore()
  // const { toggleGenealogySearch } = useSearchModalStore()
  console.log('auth level is', auth)
  return (
    <header className='dashboardLayout__navbar pt-2 pb-2 border-b-2 border-[#D4DFE9] fixed lg:sticky left-0 -mt-1 top-0'>
      <div className='w-full h-full px-4 lg:px-0 py-3 flex justify-between items-center max-w-full'>
        <section className='w-auto h-full flex justify-between items-center gap-x-0'>
          <div className='lg:hidden cursor-pointer' onClick={toggleDrawer}>
            <MoarOptionsVerticalIcon />
          </div>

          <div className='hidden lg:flex justify-start items-center'>
            {/* <button
              onClick={() => router.back()}
              className='mr-2'
            >
              <ArrowLeftIcon classes='mt-1 w-7 h-7' isHovered />
            </button> */}

            <span className='hidden xl:block text-2xl font-bold text-[#000000] whitespace-nowrap'>{title}</span>
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
        <section className='flex w-full xl:w-auto'>
          <div className='w-auto h-full hidden md:flex justify-end lg:items-center gap-x-3 items-start mr-3 lg:mt-0'>
            {/* <a target="_blank" href={`https://mysnappartners.com/login/token=${auth.accessToken}`}>
              <Button classes='text-xs lg:text-sm xl:text-sm border-[#C9DAE8] border-2 bg-new py-0 sm:py-2 lg:py-2 px-1 lg:px-4 xl:px-8 text-black shadow-md'>
                Your Builder Website
              </Button>
            </a> */}
            <a target="_blank" href={`/wellness?referralCode=${auth.referralCode}`}>
              <Button classes='text-xs lg:text-sm xl:text-sm border-[#C9DAE8] border-2 bg-new py-0 sm:py-2 lg:py-2 px-1 lg:px-4 xl:px-8 text-black shadow-md'>
                Your Snap Wellness Store
              </Button>
            </a>
          </div>

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
        </section>
      </div>
    </header>
  )
}
