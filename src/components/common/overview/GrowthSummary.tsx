import { useMemo, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import BarWithText from './BarWithText'
import { Button } from '../Button'
import HiddenTabScrollButton from './HiddenTabScrollButton'
import { Select, Option, selectClasses } from '@mui/joy'
import { KeyboardArrowDown } from '@mui/icons-material'
import * as React from 'react'
import { getLocalStorage } from '../../../lib/utils/localStorage'
import axios from 'axios'

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

type ClientDataItem = {
  admin?: number,
  customer?: number,
  agent?: number,
  driver?: number,
  merchant?: number,
  integrousAssociate?: number,
  integrousCustomer?: number,
}

type OrdersDataItem = {
  asCustomer?: number,
  asDriver?: number,
  asRestaurant?: number,
  asErc?: number,
}

type GrowthSummaryData = {
  volume: { direct?: number, manager?: number, director?: number, supervisor?: number, executive?: number },
  newIBOs: { direct?: number, manager?: number, director?: number, supervisor?: number, executive?: number, total?: number },
  newClientsData: { direct: ClientDataItem, manager: ClientDataItem, director: ClientDataItem, supervisor: ClientDataItem, executive: ClientDataItem },
  newOrdersData: { direct: OrdersDataItem, manager: OrdersDataItem, director: OrdersDataItem, supervisor: OrdersDataItem, executive: OrdersDataItem },
}

const sum = (...args: (number | undefined)[]) => args.reduce((a, b) => a + (parseFloat(b?.toString() ?? '0')), 0)

export default function GrowthSummary () {
  const [monthSelected, setMonthSelected] = React.useState(new Date().getMonth()) // 0-11
  const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemb' +
  'er', 'October', 'November', 'December']

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }

  const [growthSummaryData, setGrowthSummaryData] = React.useState<GrowthSummaryData | undefined>()
  const [selectedTab, setSelectedTab] = useState(0)

  React.useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getGrowthSummary', {
        params: {
          monthSelected,
          yearSelected
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setGrowthSummaryData(response.data)
    })()
  }, [monthSelected, yearSelected])

  const showingData = useMemo(() => {
    if (!growthSummaryData) return []
    const { newIBOs, newClientsData, newOrdersData, volume } = growthSummaryData
    switch (selectedTab) {
    case 0:
      return [
        [
          'Total',
          newIBOs?.direct ?? 0,
          newIBOs?.manager ?? 0,
          newIBOs?.supervisor ?? 0,
          newIBOs?.director ?? 0,
          newIBOs?.executive ?? 0,
          newIBOs?.total
        ]
      ]
    case 1:
      return [['ERC', 'agent'], ['Delivery Clients', 'customer'], ['Delivery Drivers', 'driver'], ['Delivery Rest.', 'merchant']].map(([name, type]) => [
        name,
        newClientsData?.direct?.[type] ?? 0,
        newClientsData?.manager?.[type] ?? 0,
        newClientsData?.supervisor?.[type] ?? 0,
        newClientsData?.director?.[type] ?? 0,
        newClientsData?.executive?.[type] ?? 0,
        sum(
          newClientsData?.direct?.[type],
          newClientsData?.manager?.[type],
          newClientsData?.director?.[type],
          newClientsData?.supervisor?.[type],
          newClientsData?.executive?.[type]
        )
      ])
    case 2:
      return [['ERC', 'asErc'], ['Delivery Clients', 'asCustomer'], ['Delivery Drivers', 'asDriver'], ['Delivery Rest.', 'asRestaurant']].map(([name, type]) => [
        name,
        newOrdersData?.direct?.[type] ?? 0,
        newOrdersData?.manager?.[type] ?? 0,
        newOrdersData?.supervisor?.[type] ?? 0,
        newOrdersData?.director?.[type] ?? 0,
        newOrdersData?.executive?.[type] ?? 0,
        sum(
          newOrdersData?.direct?.[type],
          newOrdersData?.manager?.[type],
          newOrdersData?.director?.[type],
          newOrdersData?.supervisor?.[type],
          newOrdersData?.executive?.[type]
        )
      ])
    case 3:
      return [
        [
          '',
          volume?.manager ?? 0,
          volume?.supervisor ?? 0,
          volume?.director ?? 0,
          volume?.executive ?? 0,
          sum(
            volume?.manager,
            volume?.director,
            volume?.supervisor,
            volume?.executive
          )
        ]
      ]
    default:
      return []
    }
  }, [selectedTab, growthSummaryData])

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
        <h5 className="text-xl text-black font-bold flex-1">{['New IBOs', 'New Clients', 'New Orders', 'New Orders Volume'][selectedTab]}</h5>
        <div className='flex flex-row items-center'>
          <select
            id='legalType'
            name='legalType'
            className='cursor-pointer outline-none appearance-none rounded-md border border-solid border-black py-2 pl-2 pr-12 text-sm sm:text-base'
            placeholder='User Rank'
            onChange={(current) => { setYearSelected(parseInt(current.target.value)) }}
          >
            {years.map((y, i) => {
              return (
                <option key={i} selected={(new Date().getFullYear() === y)} value={y}>
                  {y}
                </option>
              )
            })
            }
          </select>
          <select
            id='legalType'
            name='legalType'
            className='ml-5 cursor-pointer outline-none appearance-none rounded-md border border-solid border-black py-2 pl-2 text-sm sm:text-base'
            placeholder='User Rank'
            onChange={(current) => { setMonthSelected(parseInt(current.target.value)) }}
          >
            {month.map((m, i) => {
              return (
                <option key={i} selected={(new Date().getMonth() === i)} value={i}>
                  {m}
                </option>
              )
            })
            }
          </select>
        </div>
      </div>
      <div>
        <table className="mt-4 w-full text-center">
          <thead>
            <tr>
              <th className='text-xs font-normal'>&nbsp;</th>
              {selectedTab !== 3 && <th className='text-xs font-normal'>Direct</th>}
              <th className='text-xs font-normal hidden xs:table-cell'>O-L Manager</th>
              <th className='text-xs font-normal xs:hidden'>O-L Mngr.</th>
              <th className='text-xs font-normal hidden xs:table-cell'>O-L Supervisor</th>
              <th className='text-xs font-normal xs:hidden'>O-L Supv.</th>
              <th className='text-xs font-normal hidden xs:table-cell'>O-L Director</th>
              <th className='text-xs font-normal xs:hidden'>O-L Dire.</th>
              <th className='text-xs font-normal hidden xs:table-cell'>O-L Executive</th>
              <th className='text-xs font-normal xs:hidden'>O-L Exec.</th>
              <th className='text-xs font-normal'>Total</th>
            </tr>
          </thead>
          <tbody>
            {showingData.map((row, idx) => {
              return (
                <tr key={idx} className='h-10'>
                  <td className='text-xs font-normal'>{row[0]}</td>
                  {row.slice(1).map((r, idx2) => <td key={`${idx}_${idx2}`} className='text-sm text-gray-500'>{r}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
