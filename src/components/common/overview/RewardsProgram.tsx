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
  color: '#00000',
  backgroundColor: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
  width: '33.33%',
  '&.Mui-selected': {
    backgroundColor: '#E74426',
    color: '#FFFFFF'
  },
  '@media (max-width:567px)': {
    fontSize: '10px'
  }
}

const fulltabStyle = {
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between!important'
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
    <div className="w-fit lg:w-full bg-white rounded-3xl shadow-lg p-6">
      <div>
        <span className='text-sm lg:text-xl font-bold'>Rewards Program</span>
      </div>
      <Tabs value={selectedRank}
        onChange={(_, value) => setSelectedRank(value)}
        centered
        className='w-full mt-2.5 border-2 border-[#DCE5ED] rounded-3xl text-black-h justify-between'
        textColor="inherit"
        indicatorColor="secondary"
        variant='scrollable'
        sx={fulltabStyle}
        ScrollButtonComponent={HiddenTabScrollButton}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
        <Tab sx={tabStyle} color='#Ffffff' label="Director" />
        <Tab sx={tabStyle} label="Supervisor" />
        <Tab sx={tabStyle} label="Executive" />
      </Tabs>
      <table className="mt-4 w-fit lg:w-full text-center rounded-3xl border-2 border-[#DCE5ED] p-2">
        <thead className='bg-[#DCE5ED] text-black-h my-4'>
          <tr>
            <th className='text-xs lg:text-sm font-semibold p-4'>RV</th>
            <th className='text-xs lg:text-sm font-semibold'>Months</th>
            <th className='text-xs lg:text-sm font-semibold'>Reward</th>
            <th className='text-xs lg:text-sm font-semibold'>Cash</th>
            <th className='text-xs lg:text-sm font-semibold'>Progress</th>
            <th className='text-xs lg:text-sm font-semibold'>Redeem</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#E74426' }}>
                  Coming Soon
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
