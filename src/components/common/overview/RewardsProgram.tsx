import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import BarWithText from './BarWithText'
import { Button } from '../Button'
import HiddenTabScrollButton from './HiddenTabScrollButton'

interface RewardProgramRow{
    rv: number;
    months: number;
    reward: string;
    cash: number;
    progress: number;
}

const mockData: RewardProgramRow[] = [
  // {
  //   rv: 1230,
  //   months: 2,
  //   reward: 'Apple TV',
  //   cash: 75,
  //   progress: 100
  // },
  // {
  //   rv: 1230,
  //   months: 2,
  //   reward: 'Sony TV',
  //   cash: 125,
  //   progress: 50
  // },
  // {
  //   rv: 1230,
  //   months: 2,
  //   reward: 'iPad 10,5',
  //   cash: 250,
  //   progress: 50
  // },
  // {
  //   rv: 1230,
  //   months: 2,
  //   reward: 'iWatch Ult',
  //   cash: 375,
  //   progress: 50
  // }
]

const tabStyle = {
  color: '#777777',
  backgroundColoR: '#FFFFFF',
  fontSize: 12,
  width: '33.33%',
  '&.Mui-selected': {
    backgroundColor: '#E35C49',
    color: '#FFFFFF'
  }
}

export default function RewardsProgram () {
  const [selectedRank, setSelectedRank] = useState(0)

  const renderRow = (row:RewardProgramRow) => {
    return (
      <tr key={row.reward}>
        <td className='text-sm'>${row.rv}</td>
        <td className='text-sm'>{row.months}</td>
        <td className='text-sm'>{row.reward}</td>
        <td className='text-sm'>${row.cash}</td>
        <td>
          <BarWithText value={row.progress} variant={'determinate'}/>
        </td>
        {
          row.progress === 100 && (
            <td>
              <Button classes='bg-white text-textAcent-500 focus:ring-0 font-normal'>Redeem now</Button>
            </td>
          )
        }
      </tr>
    )
  }

  return (
    <div className="bg-white rounded-lg px-2.5 py-3">
      <div>
        <span className='text-lg text-semibold'>Rewards Program</span>
      </div>
      <Tabs value={selectedRank}
        onChange={(_, value) => setSelectedRank(value)}
        centered
        className='mt-2.5 border-b-4 border-textAcent-500'
        textColor="inherit"
        indicatorColor="secondary"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
        <Tab sx={tabStyle} color='#Ffffff' label="Director" />
        <Tab sx={tabStyle} label="Supervisor" />
        <Tab sx={tabStyle} label="Executive" />
      </Tabs>
      <table className="mt-4 table-auto w-full ml-2 text-center">
        <thead>
          <tr>
            <th className='text-xs font-normal'>RV</th>
            <th className='text-xs font-normal'>Months</th>
            <th className='text-xs font-normal'>Reward</th>
            <th className='text-xs font-normal'>Cash</th>
            <th className='text-xs font-normal'>Progress</th>
            <th className='text-xs font-normal'>Redeem</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(renderRow)}
        </tbody>
      </table>
    </div>
  )
}
