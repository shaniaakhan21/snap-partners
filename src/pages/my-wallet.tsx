import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  return (
    <div className='max-w-xl mx-auto'>
      <h5 className='text-2xl font-bold'>My Wallet</h5>

      <div>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

MyWalletPage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Wallet</title>
    </Head>

    <DashboardLayout>
      {page}
    </DashboardLayout>
  </>
)

export default MyWalletPage
