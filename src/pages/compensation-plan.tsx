import Head from 'next/head'
import dynamic from 'next/dynamic'

import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { Spinner } from 'components/common/loaders'
import { APP_INFO } from 'config/appInfo'
import { GTMTrack } from 'lib/utils/gtm'
import { CardComingSoon } from 'components/common/CardComingSoon'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import { Document, Page } from "react-pdf";


const { SEO } = APP_INFO

const PDFViewer = dynamic(
  () => import('../components/page/compensation-plan/PDFViewer'),
  {
    loading: () => (
      <div className='flex flex-col justify-center items-center'>
        <Spinner />
        <span>Loading Compensation Plan...</span>
      </div>
    ),
    ssr: false
  }
)

const CompensationPlanPage: Page = () => {
  const [fileData, setFileData] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  const fetchData = async () => {
    await axios.get('https://snap249-admin.snap.devopsteam.info/api/compensation')
      .then((result) => {
        setFileData(result?.data?.result)
        const buffer = Buffer.from(result?.data?.result?.fileData)
        const data = new Blob([buffer], { type: 'application/pdf' })
        setFileUrl(URL.createObjectURL(data))
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='w-full text-center'>
      {/* <h4 className='font-black text-4xl md:text-5xl'>Compensation Plan</h4>
      <div className='mt-8 flex justify-center'>
        <CardComingSoon text='We will get you the new Compensation Plan document soon!'/>
      </div> */}
      <div className='mt-8'>
        <a
          // href='/static/FULL_Comp_Plan_1.pdf'
          href= {fileUrl}
          download={`${fileData?.fileName}`}
          target='_blank'
          rel='noopener noreferrer'
          className='px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none hover:opacity-90'
          onClick={() => GTMTrack.downloadCompensationPlan(`${fileData?.fileName}`)}
        >
          Download Compensation Plan
        </a>
      </div>

      <div className='mt-10'>
        <PDFViewer fileData={fileData} setFileData={setFileData} />
      </div>
    </div>
  )
}

CompensationPlanPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Compensation Plan</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default CompensationPlanPage
