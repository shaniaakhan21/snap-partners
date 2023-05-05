import { useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Button } from '../Button'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { Rank } from 'lib/types/overview'

interface Commission{
  manager: number;
  supervisor: number;
  director: number;
  executive: number
}

interface RankedCommissions{
  allTime: Commission
  currentPeriod: Commission;
  lastMonth: Commission
  quarter: Commission
  year: Commission
}

const timelineMap = {
  0: 'currentPeriod',
  1: 'lastMonth',
  2: 'quarter',
  3: 'year',
  4: 'allTime'
}

interface CommissionsProps{
  currentRank: Rank
}

export default function Commissions (props: CommissionsProps) {
  const { currentRank } = props
  let rankKey: keyof Commission = 'manager'
  switch (currentRank) {
  case 'Manager': {
    rankKey = 'manager'
    break
  }
  case 'Director': {
    rankKey = 'director'
    break
  }
  case 'Supervisor': {
    rankKey = 'supervisor'
    break
  }
  case 'Executive': {
    rankKey = 'executive'
    break
  }
  default:
    break
  }
  const [selectedTimeline, setSelectedTimeline] = useState(0)
  const [commissionData, setCommissionData] = useState<RankedCommissions>(null)
  const selectedData: Commission = commissionData ? commissionData[timelineMap[selectedTimeline]] : { manager: 0, supervisor: 0, director: 0, executive: 0 }

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getEstimatedCommissions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCommissionData(response.data)
      console.log({ data: response.data })
    })()
  }, [])

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
            ${currentRank === 'Free Member' ? 0 : selectedData[rankKey]}
          </span>
        </div>
        <table className="table-fixed flex-1 ml-2 text-center">
          <thead>
            <tr>
              <th className='text-xs font-normal'>Manager</th>
              <th className='text-xs font-normal'>Supervisor</th>
              <th className='text-xs font-normal'>Director</th>
              <th className='text-xs font-normal'>Executive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-sm'>${selectedData.manager}</td>
              <td className='text-sm'>${selectedData.supervisor}</td>
              <td className='text-sm'>${selectedData.director}</td>
              <td className='text-sm'>${selectedData.manager}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
