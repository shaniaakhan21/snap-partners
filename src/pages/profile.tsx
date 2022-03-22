import Head from 'next/head'
import Link from 'next/link'
import DashboardLayout from 'layouts/private/Dashboard'
import {
  CustomerIcon,
  DriverIcon,
  GenealogyIcon,
  MerchantsIcon,
  MerchantIcon,
  TrendingUpIcon
} from 'components/common/icons'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import type { Page as PageNext, ReactNode } from 'lib/types'
import { ROLES } from 'config/roles'

const { SEO } = APP_INFO

const ProfilePage: PageNext = () => {
  const { auth, removeAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()

  const handleClickUpgradeToManager = () => {
    const windowOpened = window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${auth.id}`,
      'windowUpgradeToManager'
    )

    setNewWindow(windowOpened)
    // When a newWindow is sent, in DashboardLayout we have an effect to handle upgrade to manager.
  }

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
          <ul className='flex justify-start items-center gap-x-2 mt-1'>
            {(auth.ranks.type === 'referralPartner' && auth.roles.customer) && <li><img src='/static/badges/FreeMemberCustomer.png' /> </li>}
            {(auth.ranks.type === 'referralPartner' && auth.roles.driver) && <li><img src='/static/badges/FreeMemberDriver.png' /> </li>}
            {(auth.ranks.type === 'referralPartner' && auth.roles.merchant) && <li><img src='/static/badges/FreeMemberRestaurant.png' /> </li>}

            {(auth.ranks.type === 'manager' && auth.roles.customer) && <li><img src='/static/badges/ManagerCustomer.png' /> </li>}
            {(auth.ranks.type === 'manager' && auth.roles.driver) && <li><img src='/static/badges/ManagerDriver.png' /> </li>}
            {(auth.ranks.type === 'manager' && auth.roles.merchant) && <li><img src='/static/badges/ManagerRestaurant.png' /> </li>}

            {(auth.ranks.type === 'supervisor' && auth.roles.customer) && <li><img src='/static/badges/SupervisorCustomer.png' /> </li>}
            {(auth.ranks.type === 'supervisor' && auth.roles.driver) && <li><img src='/static/badges/SupervisorDriver.png' /> </li>}
            {(auth.ranks.type === 'supervisor' && auth.roles.merchant) && <li><img src='/static/badges/SupervisorRestaurant.png' /> </li>}

            {(auth.ranks.type === 'director' && auth.roles.customer) && <li><img src='/static/badges/DirectorCustomer.png' /> </li>}
            {(auth.ranks.type === 'director' && auth.roles.driver) && <li><img src='/static/badges/DirectorDriver.png' /> </li>}
            {(auth.ranks.type === 'director' && auth.roles.merchant) && <li><img src='/static/badges/DirectorRestaurant.png' /> </li>}

            {(auth.ranks.type === 'executive' && auth.roles.customer) && <li><img src='/static/badges/ExecutiveCustomer.png' /> </li>}
            {(auth.ranks.type === 'executive' && auth.roles.driver) && <li><img src='/static/badges/ExecutiveDriver.png' /> </li>}
            {(auth.ranks.type === 'executive' && auth.roles.merchant) && <li><img src='/static/badges/ExecutiveRestaurant.png' /> </li>}

            <li>
              <span className='font-bold text-xl capitalize'>{auth.ranks.type}</span>
            </li>
          </ul>
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
                <button disabled className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
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
                <button disabled className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
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
                <button disabled className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
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
                <button disabled className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
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
              <button disabled className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li>

        </ul>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center mt-11'>
        <div className='w-full md:w-1/2 h-20 flex items-center bg-white rounded-lg px-4 mr-0 md:mr-4 mb-4 md:mb-0'>
          <div className='bg-warning-300 rounded-lg w-12 h-12 flex items-center justify-center mr-4'>
            <TrendingUpIcon />
          </div>

          <div>
            <span className='block text-gray-400 text-sm'>Rank</span>
            <span className='text-lg font-semibold capitalize'>{auth.ranks?.type}</span>
          </div>
        </div>

        <button
          onClick={handleClickUpgradeToManager}
          className='w-full md:w-1/2 h-20 bg-textAcent-500 text-white rounded-lg shadow-md flex flex-col justify-center px-4'
        >
          <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
        </button>
      </div>

      {
        (!auth.roles.customer || !auth.roles.driver || !auth.roles.merchant) && (!auth.roles.admin) && (
          <div className='w-full mt-10'>
            <span className='text-3xl font-bold'>Extend your posibilities</span> <br />
            <span className='text-lg font-semibold'>Your can be a driver at the same time as a costumber or a merchant</span>

            <div className='w-full flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-10 mt-10'>
              {
                (auth.roles.merchant || auth.roles.driver) &&
                <Link href={`/become-role?role=${ROLES.CUSTOMER}`}>
                  <a className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                      <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Customer</span>
                      <CustomerIcon classes='w-24' />
                    </div>
                  </a>
                </Link>
              }
              {
                (auth.roles.customer || auth.roles.merchant) &&
                  <Link href={`/become-role?role=${ROLES.DRIVER}`}>
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
                      <MerchantsIcon />
                      <MerchantIcon />
                    </div>
                  </a>
                </Link>
              }
            </div>
          </div>
        )
      }

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
