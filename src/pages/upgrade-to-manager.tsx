import Head from 'next/head'
import DashboardLayout from 'layouts/private/Dashboard'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import type { Page as PageNext, ReactNode } from 'lib/types'
import Link from 'next/link'

const { SEO } = APP_INFO

const UpgradeToManagerPage: PageNext = () => {
  const { auth } = useAuthStore()
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
        <title>{SEO.TITLE_PAGE} - Upgrade To Manager</title>
      </Head>

      <div className='max-w-4xl mx-auto w-full'>
        <div className='w-full flex flex-col md:flex-row items-center justify-center mt-11'>
          <button
            onClick={handleClickUpgradeToManager}
            className='w-full h-20 bg-textAcent-500 text-white rounded-lg shadow-md flex flex-col justify-center px-4'
          >
            <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
          </button>
        </div>

        <span className='block text-center mt-11 text-gray-600'>
        Need Help?{' '}
          <Link href='#'>
            {/* We must to apply an emailTo here */}
            <a className='text-textAcent-500 font-medium'>Send us an email</a>
          </Link>
        </span>

        <div className='w-full bg-transparent sm:bg-gray-300 rounded-lg max-w-4xl mx-auto mt-20 p-5'>
          <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-x-20'>
            <figure>
              <img src='/images/logo.svg' className='w-60' />
            </figure>

            <section>
              <div className='text-right mt-10 sm:mt-0'>
                <h6 className='text-2xl font-bold text-gray-800'>Reward POINTS!</h6>

                <div className='text-lg mt-4 font-semibold text-gray-800'>
                  <p>Every $1.00 Earned = 1 Point</p>
                  <p>Customer = 1 Point</p>
                  <p>Driver = 1 Point</p>
                  <p>Restaurant = 1 Point</p>
                </div>
              </div>
              <br />

              <p>
                All points for Customers are realeased after <br /> the Customer places their first Order.
              </p>
              <br />

              <p>
                Points for Drivers release after the Driver <br /> completes their first delivery
              </p>
              <br />

              <p>
                Points for Restaurants are release after the <br /> Restaurant Fulfills their first Order
              </p>
              <br />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

UpgradeToManagerPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default UpgradeToManagerPage
