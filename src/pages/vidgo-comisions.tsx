import Head from 'next/head'
// import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import type { Page, ReactNode } from 'lib/types'
// import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
// import { BonusBenmarks } from 'components/page/vidgo-comisions/BonusBenmarksTable'
// import { RetentionMonthly } from 'components/page/vidgo-comisions/RetentionMonthly'
// import { CustomerTable } from 'components/page/vidgo-comisions/CustomerTable'
// import { TeamCustomerTable } from 'components/page/vidgo-comisions/TeamCustomerTable'
import ComingSoon from './comingsoon'

const { SEO } = APP_INFO

// const columns = [
//   { name: 'name', header: 'Name', minWidth: 50, defaultFlex: 2 },
//   { name: 'age', header: 'Age', maxWidth: 1000, defaultFlex: 1 }
// ]

// const gridStyle = { minHeight: 550 }

// const dataSource = [
//   { id: 1, name: 'John McQueen', age: 35 },
//   { id: 2, name: 'Mary Stones', age: 25 },
//   { id: 3, name: 'Robert Fil', age: 27 },
//   { id: 4, name: 'Roger Robson', age: 81 },
//   { id: 5, name: 'Billary Konwik', age: 18 },
//   { id: 6, name: 'Bob Martin', age: 18 },
//   { id: 7, name: 'Matthew Richardson', age: 54 },
//   { id: 8, name: 'Ritchie Peterson', age: 54 },
//   { id: 9, name: 'Bryan Martin', age: 40 },
//   { id: 10, name: 'Mark Martin', age: 44 },
//   { id: 11, name: 'Michelle Sebastian', age: 24 },
//   { id: 12, name: 'Michelle Sullivan', age: 61 },
//   { id: 13, name: 'Jordan Bike', age: 16 },
//   { id: 14, name: 'Nelson Ford', age: 34 },
//   { id: 15, name: 'Tim Cheap', age: 3 },
//   { id: 16, name: 'Robert Carlson', age: 31 },
//   { id: 17, name: 'Johny Perterson', age: 40 }
// ]

const VidgoComisionsPage: Page = () => {
  // const { auth } = useAuthStore()

  return (
    <ComingSoon />
  )

  // if (!auth.roles.merchant) {
  //   return (
  //     <div className='h-screen-80 w-full flex justify-center items-center'>
  //       <span className='text-4xl font-black'>Should be a IBO</span>
  //     </div>
  //   )
  // }

  // return (
  //   <div>
  //     <section className='w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8'>
  //       <div className='overflow-x-scroll w-full lg:w-2/3 h-full'>
  //         <h5 className='text-lg font-semibold'>
  //           Your Customers
  //         </h5>

  //         <CustomerTable />
  //       </div>

  //       <div className='w-full lg:w-1/3'>
  //         <div className='flex justify-between items-start'>
  //           <h5 className='text-lg font-semibold'>
  //             Team Customers
  //           </h5>

  //           <div className='flex justify-end items-center gap-x-4 text-right'>
  //             <span className='text-xs'>Total Downline <br /> Customers</span>

  //             <div className='border border-zinc-400 rounded-sm px-4 py-1'>
  //               <span className='text-xl font-semibold'>
  //                 1766
  //               </span>
  //             </div>
  //           </div>
  //         </div>

  //         <TeamCustomerTable />
  //       </div>
  //     </section>

  //     <section className='w-full h-full mt-10 flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8'>
  //       <div className='w-full lg:w-2/3 h-full'>
  //         <h5 className='text-2xl font-bold text-primary-500'>
  //         Vidgo Premium Service RETENTION BONUS TRACKER
  //         </h5>

  //         <div className='flex flex-col justify-start items-start'>
  //           <select className='mt-4 py-1 px-4'>
  //             <option value='Month: May 2022'>Month: May 2022</option>
  //           </select>
  //         </div>

  //         <ReactDataGrid
  //           idProperty='id'
  //           className='mt-5'
  //           columns={columns}
  //           dataSource={dataSource}
  //           style={gridStyle}
  //         />
  //       </div>

  //       <div className='w-full lg:w-1/3'>
  //         <span className='text-xl font-bold'>Retention Bonus Benchmarked</span>
  //         <br />

  //         <div className='w-full h-full mt-5'>
  //           <BonusBenmarks />

  //           <RetentionMonthly />
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // )
}

VidgoComisionsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Vidgo Comisions</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default VidgoComisionsPage
