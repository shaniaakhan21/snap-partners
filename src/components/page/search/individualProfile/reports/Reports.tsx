/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import ErcReport from './ErcReport'
import WellnessReport from './WellnessReport'
import VidgoReport from './VidgoReport'
import InsuranceReport from './InsuranceReport'
import { Paper } from '@mui/material'

const Reports = ({ userId }) => {
  const cname = 'profilePage-individualProfile'
  const [reportBody, setReportBody] = useState<'erc' | 'wellness' | 'vidgo' | 'insurance'>('erc')
  return (
    <div>
      <div className={`${cname}-header`}>
        <ul className={`${cname}-header-list`}>

          <li className={reportBody === 'erc' ? `${cname}-header-listItems listItems-firstItem listItems-active` : `${cname}-header-listItems listItems-firstItem`}
            onClick={() => setReportBody('erc')}>ERC</li>
          <li className={reportBody === 'wellness' ? `${cname}-header-listItems listItems-midItem listItems-active` : `${cname}-header-listItems listItems-midItem`}
            onClick={() => setReportBody('wellness')}>Wellness</li>
          <li className={reportBody === 'vidgo' ? `${cname}-header-listItems listItems-midItem listItems-active` : `${cname}-header-listItems listItems-midItem`}
            onClick={() => setReportBody('vidgo')}>Vidgo</li>
          <li className={reportBody === 'insurance' ? `${cname}-header-listItems listItems-lastItem listItems-active` : `${cname}-header-listItems listItems-lastItem`}
            onClick={() => setReportBody('insurance')}>Insurance</li>

        </ul>
      </div>
      <div className='reportBodyContainer'>
        <Paper className={`${cname}-conatiner`}>
          {
            reportBody === 'erc'
              ? <ErcReport userId={userId}/>
              : <></>
          }
          {
            reportBody === 'wellness'
              ? <WellnessReport/>
              : <></>
          }
          {
            reportBody === 'vidgo'
              ? <VidgoReport/>
              : <></>
          }
          {
            reportBody === 'insurance'
              ? <InsuranceReport/>
              : <></>
          }

        </Paper>
      </div>
    </div>
  )
}

export default Reports
