import Head from 'next/head'
import dynamic from 'next/dynamic'
import DownloadIcon from '@mui/icons-material/Download'
import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { Spinner } from 'components/common/loaders'
import { APP_INFO } from 'config/appInfo'
import { GTMTrack } from 'lib/utils/gtm'
import { CardComingSoon } from 'components/common/CardComingSoon'
import axios from 'axios'
import { useState, useEffect } from 'react'

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
    await axios.get('/api/compensation')
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
    <div className='w-full flex flex-col md:flex-row-reverse text-center '>
      {/* <h4 className='font-black text-4xl md:text-5xl'>Compensation Plan</h4>
      <div className='mt-8 flex justify-center'>
        <CardComingSoon text='We will get you the new Compensation Plan document soon!'/>
      </div> */}
      <div className='mt-2 md:mt-8 relative md:top-[30rem] md:w-1/6'>
        <div
          className='py-2 flex flex-col items-center disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-full font-semibold focus:outline-none hover:opacity-90'
        >
          <div className='flex flex-row'>
            <img className='hidden md:block md:relative md:-right-8 md:-top-4' src='/images/pdficon.svg'></img>
          Download <br></br> Compensation Plan
          </div>
          <a href= {fileUrl}
            download={`${fileData?.fileName}`}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => GTMTrack.downloadCompensationPlan(`${fileData?.fileName}`)}>
            <DownloadIcon className='text-white bg-primary-500 text-3xl w-[12%] h-[12%] md:w-[20%] md:h-[20%] rounded-full p-2 shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] mt-2'/>
          </a>
        </div>
      </div>

      <div className='mt-2 md:mt-4 shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] rounded-2xl bg-white px-6 py-4'>
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
