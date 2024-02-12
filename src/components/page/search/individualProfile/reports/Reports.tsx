/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import ErcReport from './ErcReport'
import WellnessReport from './WellnessReport'
import VidgoReport from './VidgoReport'
import SetcReport from './SetcReport'
import { Paper, MenuItem, Select, Typography } from '@mui/material'

const Reports = ({ userId }) => {
  const cname = 'profilePage-individualProfile'
  const [reportBody, setReportBody] = useState<'erc' | 'wellness' | 'vidgo' | 'setc'>('erc')
  const handleCategoryChange = (event) => {
    setReportBody(event.target.value)
  }

  const tabStyle = {
    borderTop: '1px solid #c8c8c8',
    borderLeft: '1px solid #c8c8c8',
    borderRight: '1px solid #c8c8c8',
    '&.Mui-selected': {
      backgroundColor: '#FF998B',
      color: 'white'
    },
    fontSize: '13px',
    textTransform: 'none',
    width: '20%'
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className="flex flex-row justify-between pb-2 text-xl font-sans font-semibold text-black">
          <h1>
        Available Reports
          </h1>
        </div>
        <Select
          value={reportBody}
          onChange={handleCategoryChange}
          displayEmpty={false}
          className="cursor-pointer font-semibold relative xs:mr-2 bg-[rgba(255,255,255,.13)] outline-none appearance-none rounded-full"
          sx={{
            '&.MuiInputBase-root .MuiSelect-select': {
              padding: '7.5px 14px!important'
            },
            '&.MuiInputBase-root': {
              width: '10%!important'
            }
          }}
        >
          <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'erc'}>ERC</MenuItem>
          <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'wellness'}>Wellness</MenuItem>
          <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'vidgo'}>Vidgo</MenuItem>
          <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'setc'}>SETC</MenuItem>
        </Select>
      </div>
      <div className='reportBodyContainer'>
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
          reportBody === 'setc'
            ? <SetcReport userId={userId}/>
            : <></>
        }
      </div>
    </div>
  )
}

export default Reports
