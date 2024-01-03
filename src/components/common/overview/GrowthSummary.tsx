/* eslint-disable no-use-before-define */
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
  fontWeight: '600',
  fontSize: 14,
  width: '25%',
  '&.Mui-selected': {
    backgroundColor: '#E74426!important',
    color: '#FFFFFF!important'
  },
  '@media (max-width:567px)': {
    fontSize: '10px'
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

export default function GrowthSummary ({ userId }) {
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
        params: userId
          ? {
            monthSelected,
            yearSelected,
            userId
          }
          : {
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
    <div className="w-fit lg:w-full bg-white rounded-3xl p-6 shadow-lg">
      <div>
        <span className='text-sm lg:text-xl text-black-h font-bold'>Growth Summary</span>
      </div>
      <Tabs value={selectedTab}
        onChange={(_, value) => setSelectedTab(value)}
        centered
        className='mt-2.5 border-2 border-[#DCE5ED] rounded-3xl text-black-h'
        textColor="inherit"
        indicatorColor="secondary"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
        {["IBO's", 'New Clients', 'Orders', 'Volume'].map((label, index) => (<Tab sx={tabStyle} color={index === selectedTab ? '#ffffff' : undefined} label={label} />))}
      </Tabs>
      <div className="my-4 md:flex items-center">
        <h5 className="text-sm mb-2 lg:mb-0 lg:text-xl text-black-h font-bold flex-1">{['New IBOs', 'New Clients', 'New Orders', 'New Orders Volume'][selectedTab]}</h5>
        <div className='w-fit flex flex-row items-center border-2 border-[#DCE5ED] rounded-3xl text-black-h '>
          <select
            id='legalType'
            name='legalType'
            className='cursor-pointer outline-none appearance-none py-2 pl-2 pr-12 text-xs sm:text-sm sm:text-base rounded-l-3xl border-r-2 border-[#DCE5ED] text-black-h font-semibold'
            placeholder='User Rank'
            onChange={(current) => { setYearSelected(parseInt(current.target.value)) }}
            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)' }}
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
            className='ml-0 lg:ml-5 cursor-pointer outline-none appearance-none py-2 pl-2 text-xs sm:text-sm sm:text-base rounded-r-3xl text-black-h font-semibold border-0'
            placeholder='User Rank'
            onChange={(current) => { setMonthSelected(parseInt(current.target.value)) }}
            style={{ outline: 'none!important', backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)' }}
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
        <table className="mt-4 w-fit lg:w-full text-center rounded-3xl border-2 border-[#DCE5ED] p-2">
          <thead className='bg-[#DCE5ED] text-black-h my-4'>
            <tr>
              <th className='text-xs lg:text-sm font-semibold'>&nbsp;</th>
              {selectedTab !== 3 && <th className='text-xs lg:text-sm font-semibold p-4'>Direct</th>}
              <th className='text-xs lg:text-sm font-semibold hidden xs:table-cell'>O-L Manager</th>
              <th className='text-xs lg:text-sm font-semibold xs:hidden'>O-L Mngr.</th>
              <th className='text-xs lg:text-sm font-semibold hidden xs:table-cell'>O-L Supervisor</th>
              <th className='text-xs lg:text-sm font-semibold xs:hidden'>O-L Supv.</th>
              <th className='text-xs lg:text-sm font-semibold hidden xs:table-cell'>O-L Director</th>
              <th className='text-xs lg:text-sm font-semibold xs:hidden'>O-L Dire.</th>
              <th className='text-xs lg:text-sm font-semibold hidden xs:table-cell'>O-L Executive</th>
              <th className='text-xs lg:text-sm font-semibold xs:hidden'>O-L Exec.</th>
              <th className='text-xs lg:text-sm font-semibold pr-4'>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedTab === 0
              ? showingData.map((row, idx) => {
                return (
                  <tr key={idx} className='h-10'>
                    <td className='text-sm font-normal pl-4 py-4'>{row[0]}</td>
                    {row.slice(1).map((r, idx2) => <td key={`${idx}_${idx2}`} className='text-sm text-gray-500'>{r}</td>)}
                  </tr>
                )
              })
              : <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#E74426' }}>
                  Coming Soon
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
