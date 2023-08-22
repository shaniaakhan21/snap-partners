import { useState } from 'react'
import BackButton from './BackButton'
import CommonHeader from './CommonHeader'
import CustomSearchHeader from './CustomSearchHeader'
import InputSection from './InputSection'
import ReportLink from './ReportLink'

const PayReportComponent = ({ onBackClick }) => {
  const dates = [
    'Friday, Jun 21, 2019',
    'Saturday, Jun 22, 2019',
    'Sunday, Jun 23, 2019'
  ]
  const [activeReportDate, setActiveReportDate] = useState<string | null>(null)
  return (
    <div className="flex flex-col w-full">
      <BackButton onBackClick={onBackClick}/>
      <br></br>
      <div className="w-full bg-white rounded-lg px-6 py-8">
        <CommonHeader
          text="Pay Report"
          icon={
            <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5833 0.333328C30.4375 0.333328 29.5 1.27083 29.5 2.41666V33.6667C29.5 34.8125 30.4375 35.75 31.5833 35.75C32.7291 35.75 33.6666 34.8125 33.6666 33.6667V2.41666C33.6666 1.27083 32.7291 0.333328 31.5833 0.333328ZM17 8.66666C15.8541 8.66666 14.9166 9.60416 14.9166 10.75V33.6667C14.9166 34.8125 15.8541 35.75 17 35.75C18.1458 35.75 19.0833 34.8125 19.0833 33.6667V10.75C19.0833 9.60416 18.1458 8.66666 17 8.66666ZM0.333313 19.0833C0.333313 17.9375 1.27081 17 2.41665 17C3.56248 17 4.49998 17.9375 4.49998 19.0833V33.6667C4.49998 34.8125 3.56248 35.75 2.41665 35.75C1.27081 35.75 0.333313 34.8125 0.333313 33.6667V19.0833Z" fill="#DD4C37"/>
            </svg>
          }
        />
        <div className='mt-10'>
          <CustomSearchHeader title="Search Report" />
        </div>
        <div className='mt-2'>
          <InputSection
            title="PROFILE SEARCH"
            hint="Help text"
            placeholderText="RepID, Name or Email"
            buttonText="Search"
          />
        </div>
        <div className='mt-5'>
          {dates.map((date, index) => (
            <div key={index} className="mb-2">
              <div key={index} className="mb-2">
                <ReportLink linkText={date} setActiveReportDate={setActiveReportDate} activeReportDate={activeReportDate} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PayReportComponent
