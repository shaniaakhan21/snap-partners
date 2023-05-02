import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Button } from '../Button'

export default function Commissions () {
  const [selectedTimeline, setSelectedTimeline] = useState(0)
  const commissionAtRank = 200

  return (
    <div className="bg-white rounded-lg px-2.5 py-3">
      <div className='flex flex-row justify-between'>
        <span className='text-lg text-semibold'>Commissions</span>
        <Button classes='bg-white text-textAcent-500 focus:ring-0 font-normal'>See Details</Button>
      </div>
      <Tabs value={selectedTimeline}
        onChange={(_, value) => setSelectedTimeline(value)}
        centered
        className='mt-2.5 border-b-4 border-textAcent-500'
        textColor="inherit"
        indicatorColor="secondary"
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
        <Tab sx={{ fontSize: 12, width: '20%', bgcolor: selectedTimeline === 0 ? '#E35C49' : '#FFFFFF', color: selectedTimeline === 0 ? '#FFFFFF' : '#777777' }} color='#Ffffff' label="Current" />
        <Tab sx={{ fontSize: 12, width: '20%', bgcolor: selectedTimeline === 1 ? '#E35C49' : '#FFFFFF', color: selectedTimeline === 1 ? '#FFFFFF' : '#777777' }} label="Last Month" />
        <Tab sx={{ fontSize: 12, width: '20%', bgcolor: selectedTimeline === 2 ? '#E35C49' : '#FFFFFF', color: selectedTimeline === 2 ? '#FFFFFF' : '#777777' }} label="Quarter" />
        <Tab sx={{ fontSize: 12, width: '20%', bgcolor: selectedTimeline === 3 ? '#E35C49' : '#FFFFFF', color: selectedTimeline === 3 ? '#FFFFFF' : '#777777' }} label="Year" />
        <Tab sx={{ fontSize: 12, width: '20%', bgcolor: selectedTimeline === 4 ? '#E35C49' : '#FFFFFF', color: selectedTimeline === 4 ? '#FFFFFF' : '#777777' }} label="All time" />
      </Tabs>
      <div className='flex flex-row mt-5'>
        <div className='flex flex-col text-right'>
          <span className='text-sm'>
            Your Commissions <br /> at current rank
          </span>
          <span className='text-2xl font-bold'>
            ${commissionAtRank}
          </span>
        </div>
        <table className="table-auto flex-1 ml-2 text-center">
          <thead>
            <tr>
              <th className='text-xs font-normal'>As Manager</th>
              <th className='text-xs font-normal'>As Supervisor</th>
              <th className='text-xs font-normal'>As Director</th>
              <th className='text-xs font-normal'>As Executive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-sm'>$1,230</td>
              <td className='text-sm'>$2,250</td>
              <td className='text-sm'>$3,500</td>
              <td className='text-sm'>$9,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
