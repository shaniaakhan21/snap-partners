/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import ErcReport from './ErcReport'
import WellnessReport from './WellnessReport'
import VidgoReport from './VidgoReport'
import InsuranceReport from './InsuranceReport'
import { Paper, MenuItem, Select, Typography } from '@mui/material'

const Reports = ({ userId }) => {
  const cname = 'profilePage-individualProfile'
  const [reportBody, setReportBody] = useState<'erc' | 'wellness' | 'vidgo' | 'insurance'>('erc')
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
      <Select
        value={reportBody}
        onChange={handleCategoryChange}
        className='w-full text-white bg-primary-500 border-primary-500 my-custom-select'
        sx={{
          ...tabStyle,
          '& .MuiSelect-select': {
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '8px',
            backgroundColor: '#DD4C37!important',
            color: 'white',
            borderColor: '#DD4C37!important'
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
            borderLeft: '1px solid white'
          },
          '& .MuiButtonBase-root': {
            minHeight: 'none!important'
          }
        }}
      >
        <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'erc'}>ERC</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'wellness'}>Wellness</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'vidgo'}>Vidgo</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-sm lg:text-base' value={'insurance'}>Insurance</MenuItem>
      </Select>
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
          reportBody === 'insurance'
            ? <InsuranceReport/>
            : <></>
        }
      </div>
    </div>
  )
}

export default Reports
