import Head from 'next/head'
// import { useState } from 'react'

import type { Page, ReactNode } from 'lib/types'
// import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
// import { BonusBenmarks } from 'components/page/vidgo-comisions/BonusBenmarksTable'
// import { RetentionMonthly } from 'components/page/vidgo-comisions/RetentionMonthly'
// import { CustomerTable } from 'components/page/vidgo-comisions/CustomerTable'
// import { TeamCustomerTable } from 'components/page/vidgo-comisions/TeamCustomerTable'
// import { TableRetentionBonusTracker } from 'components/page/vidgo-comisions/TableRetentionBonusTracker'
import ComingSoon from './comingsoon'

const { SEO } = APP_INFO

// const dataReport = {
//   teamCustomers: [
//     {
//       label: 'Level 1',
//       count: 10,
//       comission: 13
//     }
//   ],

//   myCustomers: [
//     {
//       level: 1,
//       customerName: 'customer1',
//       customerEmail: 'customer@gmail.com',
//       package: 'Package 1',
//       joinDate: '01/01/2020',
//       lastPayment: '01/01/2020',
//       monthlyEarning: 4
//     }
//   ],

//   bonusTrackerMonthly: {
//     totalActiveCount: {
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     },

//     eligibleBenchmark: {
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     },

//     payOfTotal: {
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     },

//     commission: {
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     }
//   },

//   activePayments: [
//     {
//       customerName: 'customer1',
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     },
//     {
//       customerName: 'customer3',
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     },
//     {
//       customerName: 'customer2',
//       month1: 0,
//       month2: 0,
//       month3: 0,
//       month6: 0,
//       month12: 0
//     }
//   ]
// }

const VidgoComisionsPage: Page = () => {
  // const [vidgoReport] = useState(dataReport)
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
  //       <div className='overflow-x-scroll scroll-x-primary w-full lg:w-2/3 h-full'>
  //         <h5 className='text-lg font-semibold'>
  //           Your Customers
  //         </h5>

  //         <CustomerTable myCustomers={vidgoReport.myCustomers} />
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

  //         <TeamCustomerTable teamCustomers={vidgoReport.teamCustomers} />
  //       </div>
  //     </section>

  //     <section className='w-full h-full mt-10 flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8'>
  //       <div className='w-full lg:w-2/3 h-full'>
  //         <h5 className='text-2xl font-bold text-primary-500'>
  //         Vidgo Premium Service RETENTION BONUS TRACKER
  //         </h5>

  //         <div className='flex flex-col justify-start items-start'>
  //           <select className='mt-4 py-1 px-4 select-clean'>
  //             <option value='Month: May 2022'>Month: May 2022</option>
  //           </select>
  //         </div>

  //         <TableRetentionBonusTracker />
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
