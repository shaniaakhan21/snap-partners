import Head from 'next/head'
import Link from 'next/link'
import DashboardLayout from 'layouts/private/Dashboard'
import {
  // DriverIcon
  GenealogyIcon
  // RestaurantsIcon
} from 'components/common/icons'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import type { Page as PageNext, ReactNode } from 'lib/types'
// import { ROLES } from 'config/roles'

const { SEO } = APP_INFO

const ProfilePage: PageNext = () => {
  const { auth, removeAuth } = useAuthStore()

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Profile</title>
      </Head>

      <div className='flex justify-start items-center gap-x-5 select-none'>
        <div className='w-20 h-20 bg-gray-500 rounded-full flex justify-center items-center relative'>
          <GenealogyIcon classes='w-20 h-20' />

          {/* <button className='absolute top-0 right-0 px-1 py-1 bg-white rounded-full flex justify-center items-center border border-red'>
            <EditIcon classes='w-5 h-5' />
          </button> */}
        </div>

        <div>
          <span className='text-2xl font-bold text-gray-800'>{auth.username}</span>
          <span className='block text-center px-4 py-1 rounded-full border-2 border-amber-400 font-bold'>
            {auth.roles.admin && 'Admin'}
            {auth.roles.customer && 'Customer'}
            {auth.roles.driver && 'Driver'}
            {auth.roles.merchant && 'Merchant'}
          </span>
        </div>
      </div>

      <div className='mt-11'>
        <ul className='w-full h-full rounded-lg'>
          <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
            <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
              <div>
                <label htmlFor='name' className='text-sm'>Name</label>
                <br />
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={auth.name}
                  disabled={true}
                  className='w-full bg-transparent text-lg truncate'
                />
              </div>

              <div>
                <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                  Edit
                </button>
              </div>
            </li>

            <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
              <div>
                <label htmlFor='lastname' className='text-sm'>Last Name</label>
                <br />
                <input
                  id='lastname'
                  name='lastname'
                  type='text'
                  value={auth.lastname}
                  disabled={true}
                  className='w-full bg-transparent text-lg truncate'
                />
              </div>

              <div>
                <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                  Edit
                </button>
              </div>
            </li>
          </div>

          <div className='flex flex-col sm:flex-row justify-start items-start mt-2 gap-y-2 gap-x-2'>
            <li className='rounded-xl bg-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
              <div>
                <label htmlFor='name' className='text-sm'>Phone</label>
                <br />
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={auth.phoneNumber}
                  disabled={true}
                  className='w-full bg-transparent text-lg truncate'
                  autoComplete='off'
                />
              </div>

              <div>
                <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                  Edit
                </button>
              </div>
            </li>

            <li className='w-full sm:w-1/2 rounded-xl bg-white px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
              <div>
                <label htmlFor='email' className='text-sm'>Email</label>
                <br />
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={auth.email}
                  disabled={true}
                  className='w-full bg-transparent text-lg truncate'
                />
              </div>

              <div>
                <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
                </button>
              </div>
            </li>
          </div>

          <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='email' className='text-sm'>Password</label>
              <br />
              <input
                id='password'
                name='password'
                type='password'
                value='12345678'
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>

            <div>
              <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li>

          {/* <li className='rounded-xl bg-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='bankAccount' className='text-sm'>Bank Account</label>
              <br />
              <input
                id='bankAccount'
                name='bankAccount'
                type='text'
                value=''
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>

            <div>
              <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li> */}
        </ul>
      </div>

      {/* <div className='flex flex-col md:flex-row items-center justify-center mt-11'>
        <div className='w-full md:w-1/2 h-20 flex items-center bg-white rounded-lg px-4 mr-0 md:mr-4 mb-4 md:mb-0'>
          <div className='bg-warning-300 rounded-lg w-12 h-12 flex items-center justify-center mr-4'>
            <TrendingUpIcon />
          </div>

          <div>
            <span className='block text-gray-400 text-sm'>Rank</span>
            <span className='text-lg font-semibold'>Director</span>
          </div>
        </div>

        <button
          onClick={handleClickUpgradeToManager}
          className='w-full md:w-1/2 h-20 bg-textAcent-500 text-white rounded-lg shadow-md flex flex-col justify-center px-4'
        >
          <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
        </button>
      </div> */}

      {/* {
        (!auth.roles.customer || !auth.roles.driver || !auth.roles.merchant) && (
          <div className='w-full mt-10'>
            <span className='text-3xl font-bold'>Extend your posibilities</span> <br />
            <span className='text-lg font-semibold'>Your can be a driver at the same time as a costumber or a merchant</span>

            <div className='w-full flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-10 mt-10'>
              {
                (auth.roles.customer || auth.roles.merchant) &&
                  <Link href={`/auth/signup?role=${ROLES.DRIVER}`}>
                    <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                      <div className='flex flex-col md:flex-row justify-center items-center'>
                        <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Driver</span>
                        <DriverIcon classes='w-24' />
                      </div>
                    </a>
                  </Link>
              }

              {
                (auth.roles.customer || auth.roles.driver) &&
                <Link href={`/auth/signup?role=${ROLES.MERCHANT}`}>
                  <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                      <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Restaurant</span>
                      <RestaurantsIcon />
                    </div>
                  </a>
                </Link>
              }
            </div>
          </div>
        )
      } */}

      <button
        className='block text-primary-500 mx-auto mt-11 font-bold text-lg'
        onClick={removeAuth}
      >
        Logout
      </button>

      <span className='block text-center mt-11 text-gray-600'>
        Need Help?{' '}
        <Link href='https://opportunity.snapdelivered.com/#contact'>
          {/* We must to apply an emailTo here */}
          <a target='_blank' className='text-textAcent-500 font-medium'>Send us an email</a>
        </Link>
      </span>
    </>
  )
}

ProfilePage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default ProfilePage
