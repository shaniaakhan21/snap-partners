import Head from 'next/head'
import { useEffect, useState } from 'react'

import { monthGenerator } from 'lib/utils/vidgoCalculates'
import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { BonusBenmarks } from 'components/page/vidgo-commissions/BonusBenmarksTable'
import { RetentionMonthly } from 'components/page/vidgo-commissions/RetentionMonthly'
import { CustomerTable } from 'components/page/vidgo-commissions/CustomerTable'
import { TableRetentionBonusTracker } from 'components/page/vidgo-commissions/TableRetentionBonusTracker'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

import { commissions } from 'lib/services/vidgo/commissions'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { EmptyData } from 'components/common/empty/EmptyData'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const { SEO } = APP_INFO

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const VidgoComissionsPage: Page = () => {
  const { t } = useTranslation('vidgo-reporting')
  const { auth } = useAuthStore()
  const [vidgoReport, setVidgoReport] = useState(null)
  const [dateSelected, setDateSelected] = useState('0')
  const [, setTeamCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const [dates, setDates] = useState([])

  const [reportFullData, setReportFullData] = useState({
    month1: [],
    month2: [],
    month3: [],
    month6: [],
    month12: []
  })

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await commissions(auth.accessToken)

      if (error) {
        handleFetchError(error.status, error.info)
        setLoading(false)
        return
      }

      setVidgoReport(data)
      setLoading(false)
    })()
  }, [])

  const handleChange = (event) => {
    setDateSelected(event.target.value)
  }

  const getMonthName = (date, fullName) => {
    const monthName = monthNames[date]
    return fullName ? monthName : monthName.substring(0, 3)
  }

  useEffect(() => {
    if (vidgoReport?.length > 0) {
      const customs = []
      const teams = []
      const months = []

      vidgoReport.forEach((report) => {
        customs.push({
          customerName: report.name,
          customerEmail: report.email,
          package: report.package,
          joinDate: report.joinDate,
          lastPayment: report.paymentDate,
          monthlyEarning: report.total,
          days: report.days
        })
        teams.push({
          name: report.name,
          level: '3',
          customerCount: '3',
          comission: '2444'
        })
        const rowDate = new Date(report.joinDate)
        const name = getMonthName(rowDate.getMonth() + 1, monthNames) + ' ' + rowDate.getFullYear()
        const value = new Date(
          rowDate.getFullYear(),
          rowDate.getMonth() + 1,
          1
        ).toDateString()
        const monthObj = {
          name: name,
          value: value
        }
        if (!months.some((e) => e.value === value)) {
          months.push(monthObj)
        }
      })
      setDates(months)
      setCustomers(customs)
      setTeamCustomers(teams)
      setDateSelected(months[0]?.value)
    }
  }, [vidgoReport])

  useEffect(() => {
    if (vidgoReport) {
      const dateSelectedFormated = new Date(dateSelected)

      const reportFullData = vidgoReport.map(report => {
        return {
          ...report,
          month: new Date(report.paymentDate).getMonth() + 1,
          year: new Date(report.paymentDate).getFullYear()
        }
      })

      const monthYear = monthGenerator(dateSelectedFormated)

      const reportDataFiltered = {
        month1: reportFullData.filter((report: { month: number; year: number }) =>
          report.month === monthYear.month1.month && report.year === monthYear.month1.year),
        month2: reportFullData.filter((report: { month: number; year: number }) =>
          report.month === monthYear.month2.month && report.year === monthYear.month2.year),
        month3: reportFullData.filter((report: { month: number; year: number }) =>
          report.month === monthYear.month3.month && report.year === monthYear.month3.year),
        month6: reportFullData.filter((report: { month: number; year: number }) =>
          report.month === monthYear.month6.month && report.year === monthYear.month6.year),
        month12: reportFullData.filter((report: { month: number; year: number }) =>
          report.month === monthYear.month12.month && report.year === monthYear.month12.year)
      }

      setReportFullData(reportDataFiltered)
    }
  }, [dateSelected])

  // if (!auth.roles.merchant && !auth.roles.admin && auth.ranks.type !== 'executive') {
  //   return (
  //     <div className='h-screen-80 w-full flex justify-center items-center'>
  //       <span className='text-4xl font-black'>Should be a IBO</span>
  //     </div>
  //   )
  // }

  if (loading) {
    return (
      <SpinnerPageContent />
    )
  }

  if (vidgoReport?.length === 0) {
    return (
      <div className='w-full h-screen-80 flex flex-col items-center justify-center'>
        <EmptyData label={t('empty-title')} classes='w-52 h-52' />
        <a
          href={`https://www.vidgo.com/snap/?subpid=${auth.referralCode}`}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 font-semibold text-primary-500 px-6 py-1 border border-primary-500 rounded-md hover:bg-primary-500 hover:text-white'
        >
          {t('about_vidgo')}
        </a>
      </div>
    )
  }

  return (
    <div>
      <section className='w-full h-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8'>
        <div className='overflow-x-scroll scroll-x-primary w-full lg:w-2/3 h-96'>
          <h5 className='text-lg font-semibold'>{t('your_customers')}</h5>

          <CustomerTable myCustomers={customers} />
        </div>

        <div className='w-full lg:w-1/3'>
          <div className='flex justify-between items-start'>
            <h5 className='text-lg font-semibold'>{t('team_customers')}</h5>

            {/* <div className='flex justify-end items-center gap-x-4 text-right'>
                <span className='text-xs'>
                  Total Downline <br /> Customers
                </span>

                <div className='border border-zinc-400 rounded-sm px-4 py-1'>
                  <span className='text-xl font-semibold'>1766</span>
                </div>
              </div> */}
          </div>

          <div className='w-full border-primary-500 border-2 rounded-md px-4 py-4 lg:py-[9.9rem] mt-3 text-center'>
            <span className='font-bold text-primary-500'>
                {t('coming_soon')}
            </span>
          </div>
          {/* <TeamCustomerTable teamCustomers={teamCustomers} /> */}
        </div>
      </section>

      <section className='w-full h-full mt-10 flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8'>
        <div className='w-full lg:w-2/3 h-full'>
          <h5 className='text-2xl font-bold text-primary-500'>
            {t('personal_retention_bonus_tracker')}
          </h5>

          <div className='flex flex-col justify-start items-start'>
            <select
              className='mt-4 py-1 px-4 select-clean'
              value={dateSelected}
              onChange={handleChange}
            >
              {dates.map((option) => (
                <option key={option.value} value={option.value}>
                    Month: {option.name}
                </option>
              ))}
            </select>
          </div>

          <TableRetentionBonusTracker report={reportFullData} />
        </div>

        <div className='w-full lg:w-1/3'>
          <span className='text-xl font-bold'>
            {t('benchmarked')}
          </span>
          <br />

          <div className='w-full h-full mt-5'>
            <BonusBenmarks />

            <br />

            <span className='text-xl font-bold'>
              {t('weighted_payout_scale')}
            </span>
            <br />

            <RetentionMonthly />
          </div>
        </div>
      </section>
    </div>
  )
}

VidgoComissionsPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('vidgo-reporting:title')}</title>
      </Head>
      {page}
    </DashboardLayout>
  )
}

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...APP_INFO.COMMON_NS_LIST, 'vidgo-reporting']))
    }
  }
}

export default VidgoComissionsPage
