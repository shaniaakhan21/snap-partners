import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import BarWithText from './BarWithText'
import { Button } from '../Button'
import HiddenTabScrollButton from './HiddenTabScrollButton'
import { Select, Option, selectClasses } from '@mui/joy'
import { KeyboardArrowDown } from '@mui/icons-material'

interface DownLineRow {
    name: string;
    nameShort: string;
    direct: number;
    openLineManager: number;
    openLineDirector: number;
    openLineSupervisory: number;
    openLineExecutive: number;
}

const downLineData: DownLineRow[] = [
  { name: 'ERC', nameShort: 'ERC', direct: 58, openLineManager: 51, openLineDirector: 59, openLineSupervisory: 18, openLineExecutive: 20 },
  { name: 'Delivery Clients', nameShort: 'D. Clients', direct: 82, openLineManager: 46, openLineDirector: 17, openLineSupervisory: 48, openLineExecutive: 9 },
  { name: 'Delivery Rest.', nameShort: 'D. Rest.', direct: 76, openLineManager: 7, openLineDirector: 10, openLineSupervisory: 47, openLineExecutive: 34 },
  { name: 'Delivery Drivers', nameShort: 'D. Drivers', direct: 97, openLineManager: 13, openLineDirector: 46, openLineSupervisory: 33, openLineExecutive: 54 },
  { name: 'Vidgo', nameShort: 'Vidgo', direct: 4, openLineManager: 43, openLineDirector: 98, openLineSupervisory: 50, openLineExecutive: 98 }
]

const tabStyle = {
  color: '#777777',
  backgroundColoR: '#FFFFFF',
  fontSize: 12,
  width: '25%',
  '&.Mui-selected': {
    backgroundColor: '#E35C49',
    color: '#FFFFFF'
  }
}

export default function GrowthSummary () {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="bg-white rounded-lg px-2.5 py-3">
      <div>
        <span className='text-xl text-black font-bold'>Growth Summary</span>
      </div>
      <Tabs value={selectedTab}
        onChange={(_, value) => setSelectedTab(value)}
        centered
        className='mt-2.5 border-b-4 border-textAcent-500'
        textColor="inherit"
        indicatorColor="secondary"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
        {['Downline', 'New Clients', 'Orders', 'Volume'].map((label, index) => (<Tab sx={tabStyle} color={index === selectedTab ? '#ffffff' : undefined} label={label} />))}
      </Tabs>
      <div className="my-4 md:flex items-center">
        <h5 className="text-xl text-black font-bold flex-1">New IBOs</h5>
        <div className='flex items-center justify-end'>
          <span className="text-sm text-gray-600 mr-3">Month</span>
          <Select
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 180,
              border: 'none',
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)'
                }
              }
            }}
            value={''}
          >
            <Option value="">Current Month</Option>
          </Select>
        </div>
      </div>
      <div>
        <table className="mt-4 w-full text-center">
          <thead>
            <tr>
              <th className='text-xs font-normal'>&nbsp;</th>
              <th className='text-xs font-normal'>Direct</th>
              <th className='text-xs font-normal hidden xs:block'>Open-Line Manager</th>
              <th className='text-xs font-normal xs:hidden'>O-L Mngr.</th>
              <th className='text-xs font-normal hidden xs:block'>Open-Line Director</th>
              <th className='text-xs font-normal xs:hidden'>O-L Dire.</th>
              <th className='text-xs font-normal hidden xs:block'>Open-Line Supervisory</th>
              <th className='text-xs font-normal xs:hidden'>O-L Supv.</th>
              <th className='text-xs font-normal hidden xs:block'>Open-Line Executive</th>
              <th className='text-xs font-normal xs:hidden'>O-L Exec.</th>
              <th className='text-xs font-normal'>Total</th>
            </tr>
          </thead>
          <tbody>
            {downLineData.map((row, idx) => {
              return (
                <tr key={idx} className='h-10'>
                  <td className='text-xs font-normal hidden xs:block'>{row.name}</td>
                  <td className='text-xs font-normal xs:hidden'>{row.nameShort}</td>
                  <td className='text-sm text-gray-500'>{row.direct}</td>
                  <td className='text-sm text-gray-500'>{row.openLineManager}</td>
                  <td className='text-sm text-gray-500'>{row.openLineDirector}</td>
                  <td className='text-sm text-gray-500'>{row.openLineSupervisory}</td>
                  <td className='text-sm text-gray-500'>{row.openLineExecutive}</td>
                  <td className='text-sm text-gray-500'>
                    <div className=' flex items-center justify-between'>
                      {Object.values(row).slice(2).reduce((a, r) => a + r, 0)}
                      <i className="fa-sharp fa-solid fa-square-plus fa-1.5x text-primary-500 ml-2"></i>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
