/* eslint-disable new-cap */
import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import StarAchieversTable from './promotion/StarAchieverTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '@mui/material'

const { SEO } = APP_INFO

const StarAchiever: Page = () => {
  const [sprintDataArray, setSprintDataArray] = useState([])
  useEffect(() => {
    const token = getLocalStorage('accessToken')
    axios.get('/api/sprint-to-paradise/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log('result is', result)
        setSprintDataArray(result?.data?.userSprintData)
      })
      .catch((e) => {
        console.log('error occoured while getting reports')
      })
  }, [])

  const downloadStarAchieverReport = async () => {
    // const doc = new jsPDF();
    // doc.html(document.getElementById('html-content'));
    // doc.save('my-document.pdf');

    // Convert the HTML element to a canvas
    html2canvas(document.getElementById('html-content')).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', [canvas.width, canvas.height])
      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 500 // Width of the PDF page in mm (A4 size)
      // const imgHeight = (canvas.height * imgWidth) / canvas.width
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('my-document.pdf')
    })
  }
  return (
    <>
      <span className='text-lg sm:text-3xl font-bold'>Sprint to Paradise Achievers Report</span><br /><br />
      <Button classes='text-10 lg:text-sm bg-primary-500 py-1 lg:py-2 px-1 lg:px-4' onClick={() => { downloadStarAchieverReport() }}>Download</Button>
      <div className="w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col" id='html-content'>
        <h1 className='text-base sm:text-xl font-semibold'>1 Star Achievers</h1>
        <StarAchieversTable userSprintData={sprintDataArray?.filter((data) => data?.starCount === 1) || []} />
        <h1 className='text-base sm:text-xl font-semibold'>2 Star Achievers</h1>
        <StarAchieversTable userSprintData={sprintDataArray?.filter((data) => data?.starCount === 2) || []} />
        <h1 className='text-base sm:text-xl font-semibold'>3 Star Achievers</h1>
        <StarAchieversTable userSprintData={sprintDataArray?.filter((data) => data?.starCount === 3) || []} />
        <h1 className='text-base sm:text-xl font-semibold'>4 Star Achievers</h1>
        <StarAchieversTable userSprintData={sprintDataArray?.filter((data) => data?.starCount === 4) || []} />
        <h1 className='text-base sm:text-xl font-semibold'>5 Star Achievers</h1>
        <StarAchieversTable userSprintData={sprintDataArray?.filter((data) => data?.starCount === 5) || []} />
      </div>
    </>
  )
}

StarAchiever.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Achievers Report</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default StarAchiever
