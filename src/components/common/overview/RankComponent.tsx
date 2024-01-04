import { ReactNode, useEffect, useState, CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@mui/system'
import BarWithText from './BarWithText'
import { RankData } from 'lib/types/overview'
import { RankSteps } from './RankSteps'
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import { StarTrophyIcon } from '../icons/StarTrophyIcon'
import { StarSuccessIcon } from '../icons/StarSuccessIcon'
import PVComponentSnap from '../dashBackOffice/PersonalVolumeSnap'
import moment from 'moment'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

interface StyledBoxProps {
  backgroundColor: string;
}

const StyledBox = styled(Box)<StyledBoxProps>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  backgroundColor: props.backgroundColor,
  borderRadius: 4
}))

interface RankComponentProps{
  data: RankData | null
  userId?: string
}

export default function RankComponent (props: RankComponentProps) {
  const { data } = props
  const [value, setValue] = useState(0)
  const [currentRank, setCurrentRank] = useState(undefined)
  const [month, setsetMonth] = useState('Current Month')
  const [rankData, setrankData] = useState(data)
  const [norank, setnorank] = useState(false)

  useEffect(() => {
    setrankData(data)
  }, [data])

  useEffect(() => {
    if (rankData) {
      setValue(Math.min(rankData.currentRankLevel + 1, 4))
      setCurrentRank(rankData.currentRank)
    }
  }, [rankData])

  const rankColors = new Map()
  rankColors.set('Free Member', '#DD4C37')
  rankColors.set('Manager', '#C99FFF')
  rankColors.set('Supervisor', '#71BF74')
  rankColors.set('Director', '#71BF74')
  rankColors.set('Executive', '#000000')

  function formatNumberToLocale (num, decimals) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  const convertName = (name) => {
    if (name === 'Free Member') {
      return 'IBO'
    }
    return name
  }

  const months = []
  const dates = []
  const start = moment().subtract(12, 'months').startOf('month')
  const end = moment().subtract(1, 'months').startOf('month')
  while (end.isSameOrAfter(start, 'month')) {
    months.push(end.format('MMMM, YYYY'))
    dates.push(end.clone().endOf('month').format('YYYY-MM-DD'))
    end.subtract(1, 'months')
  }

  const changeData = async (month) => {
    setsetMonth(month)
    if (month === 'Current Month') {
      setrankData(data)
      setnorank(false)
      return
    }
    const token = getLocalStorage('accessToken')
    const params:any = {
      effective_day: month
    }
    if (props.userId) {
      params.userId = props.userId
    }
    const response = await axios.get('/api/snap/getHistoricalRank', {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data && response.data.mng) {
      setrankData(response.data)
      setnorank(false)
    } else {
      setnorank(true)
    }
  }

  return (
    <div>
      <Box sx={{ '& .Mui-selected': { color: 'black', bgcolor: 'white' }, '& .MuiTabs-indicator': { backgroundColor: 'transparent' } }}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 '>
          {currentRank && (
            <div className='bg-white rounded-3xl flex flex-col justify-between shadow-xl' >
              <div className='bg-[#fff] rounded-t-3xl py-8  h-full w-full flex flex-col justify-center'>
                <div className='flex justify-between'>
                  <div className='flex flex-col justify-center ml-[10%]'>
                    <h1 className="text-sm lg:text-xl font-bold">Your current </h1><span className='text-xs lg:text-base font-normal text-gray-500 '>Pay Rank is:</span>
                  </div>
                  <div className="flex items-center flex-col p-[5%] rounded-full border-2 border-[#EFEFEF] w-4/12 lg:w-3/12  mr-[6%]">
                    <StyledBox backgroundColor={'white'}>
                      <StarTrophyIcon/>
                    </StyledBox>
                    <h1 className="text-xs lg:text-base text-black-h font-semibold">{convertName(data.realRank)}</h1>
                  </div>
                </div>
              </div>
              <div className='bg-[#000000] rounded-b-3xl py-8 h-full w-full flex flex-col justify-center'>
                <div className='flex flex-row justify-between' >
                  <div className='flex flex-col justify-center ml-[10%]'>
                    <h1 className="text-sm lg:text-xl text-white font-bold">Highest </h1><span className='text-xs lg:text-base font-normal text-gray-500'>Achieved Rank:</span>
                  </div>
                  <div className="flex items-center flex-col p-[5%] rounded-full border-2 border-[#EFEFEF] w-4/12 lg:w-3/12 mr-[6%] bg-[#fff]">
                    <StyledBox backgroundColor={'white'}>
                      <StarSuccessIcon/>
                    </StyledBox>
                    <h1 className="text-xs lg:text-base text-black-h font-semibold ">{convertName(data.highestRank)}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='bg-white rounded-3xl col-span-2 p-4 shadow-xl'>
            <h1 className='text-xl font-bold'>Rank Progress</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={month}
                onChange={(e) => changeData(e.target.value)}
              >
                <MenuItem value="Current Month">Current Month</MenuItem>
                {
                  months.map((item, index) => (
                    <MenuItem value={dates[index]}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            {norank && (
              <div className='flex flex-col justify-center items-center'>
                <h2>No rank achieved in this month</h2>
              </div>)}
            {!norank && (
              <>
                <RankSteps currentRank={value} onRankPress={setValue}/>
                <TabPanel value={value} index={0}>
                  {/* Free Member */}
                  {
                    rankData && <><div className="col-span-2 flex items-center justify-center rounded-2xl bg-[#F7F8F9] border-2 border-[#D6E2ED] py-2">
                      <div className='w-[20%] lg:w-[10%] py-4 rounded-full border-2 border-[#D1D1D1] flex justify-center bg-white'>
                        <StyledBox backgroundColor={'white'}>
                          <StarSuccessIcon/>
                        </StyledBox>
                      </div>
                      <h1 className="text-xl lg:text-2xl text-black-h font-semibold pl-2">IBO</h1>
                    </div>
                    </>
                  }
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {/* Manager */}
                  <div className='flex flex-row'>
                    {
                      rankData && <><div className="w-5/12  flex flex-col items-start justify-between border-r-2 border-[#D1D1D1]">
                        <h1 className="text-lg lg:text-2xl text-black-h font-semibold">Manager</h1>
                        <div className='pt-2'>
                          <span className="text-[9px] lg:text-14">To be a <strong>Manager</strong> you'll need</span>
                        </div>
                      </div>

                      <div className='w-7/12 text-xs pt-0 lg:pt-4 pl-8'>
                        <div className='flex flex-row justify-between'>
                          <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.mng.commissionVol, 0)} PVC
                          </strong>
                          <strong className='text-10'>
                    You need 100 PVC
                          </strong>
                        </div>
                        <BarWithText value={+rankData.mng.commissionVol > 100 ? 100 : +rankData.mng.commissionVol} variant={'determinate'} />
                      </div>

                      </>
                    }
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {/* Supervisor */}
                  {
                    rankData && <>
                      <div className='flex flex-row'>
                        <div className="w-5/12  flex flex-col items-start justify-between border-r-2 border-[#D1D1D1]">
                          <h1 className="text-lg lg:text-2xl text-black-h font-semibold">Supervisor</h1>
                          <div className='pt-2'>
                            <span className="text-[9px] lg:text-14">To be <strong>Supervisor</strong> you'll need</span>

                          </div>
                        </div>

                        <div className='w-7/12  text-xs pt-0 lg:pt-5 pl-4'>
                          <div className='flex flex-row justify-between'>
                            <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.sv.commissionVol, 0)} PVC
                            </strong>
                            <strong className='text-10'>
                    You need 100 PVC
                            </strong>
                          </div>
                          <BarWithText value={+rankData.sv.commissionVol > 100 ? 100 : +rankData.sv.commissionVol} variant={'determinate'} />
                        </div>
                      </div>

                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>{`You have ${rankData.sv.PSMRatio} PSM`}</strong></span>
                        <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
                      </div>
                      <BarWithText value={+rankData.sv.PSMPercentage} variant={'determinate'}/>
                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>You need</strong></span>
                        <span className="text-right ml-auto text-10"><strong>3 Working Legs, 500 V. Each</strong></span>
                      </div>
                      <div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2'>
                          {
                            rankData.sv.workingLegs && Object.values(rankData.sv.workingLegs).map((leg, index) => (
                              <div className='col-span-1'>
                                { <Tooltip title={leg.name}><div><BarWithText value={leg.percentage} variant={'determinate'}/></div></Tooltip> }
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>{`GV You have ${formatNumberToLocale(rankData.sv.gv.value, 0)}`}</strong></span>
                        <span className="text-right ml-auto text-10"><strong>You need 5,000</strong></span>
                      </div>
                      <div className='col-span-1'>
                        <BarWithText value={+rankData.sv.gv.percentage} variant={'determinate'}/>
                      </div>
                    </>
                  }
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {/* Director */}
                  {
                    rankData && <>                  <div className='flex flex-row'>
                      <div className="w-5/12  flex flex-col items-start justify-between border-r-2 border-[#D1D1D1]">
                        <h1 className="text-lg lg:text-2xl text-black-h font-semibold">Director</h1>
                        <div className='pt-2 lg:pt-5'>
                          <span className="text-[9px] lg:text-14">To be a <strong>Director</strong> you'll need</span>

                        </div>
                      </div>

                      <div className='w-7/12  text-xs pt-0 lg:pt-5 pl-4'>
                        <div className='flex flex-row justify-between'>
                          <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.dct.commissionVol, 0)} PVC
                          </strong>
                          <strong className='text-10'>
                    You need 100 PVC
                          </strong>
                        </div>
                        <BarWithText value={+rankData.dct.commissionVol > 100 ? 100 : +rankData.dct.commissionVol} variant={'determinate'} />
                      </div>
                    </div>
                    <div className="flex pt-2">
                      <span className="text-left text-10"><strong>{`You have ${rankData.dct.PSMRatio} PSM`}</strong></span>
                      <span className="text-right ml-auto text-10"><strong>You need 4 Active PSM</strong></span>
                    </div>
                    <BarWithText value={+rankData.dct.PSMPercentage} variant={'determinate'}/>
                    <div className="flex pt-2">
                      <span className="text-left text-10"><strong>You need</strong></span>
                      <span className="text-right ml-auto text-10"><strong>4 Working Legs, 5,000 V. Each</strong></span>
                    </div>
                    <div>
                      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2'>
                        {
                          rankData.dct.workingLegs && Object.values(rankData.dct.workingLegs).map((leg, index) => (
                            <div className='col-span-1'>
                              { <Tooltip title={leg.name}><div><BarWithText value={leg.percentage} variant={'determinate'}/></div></Tooltip> }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="flex pt-2">
                      <span className="text-left text-10"><strong>{`GV You have ${formatNumberToLocale(rankData.dct.gv.value, 0)}`}</strong></span>
                      <span className="text-right ml-auto text-10"><strong>You need 50,000</strong></span>
                    </div>
                    <div className='col-span-1'>
                      <BarWithText value={+rankData.dct.gv.percentage} variant={'determinate'}/>
                    </div>

                    </>
                  }
                </TabPanel>
                <TabPanel value={value} index={4}>
                  {/* Executive */}
                  {
                    rankData && <>
                      <div className='flex flex-row'>
                        <div className="w-5/12  flex flex-col items-start justify-between border-r-2 border-[#D1D1D1]">
                          <h1 className="text-lg lg:text-2xltext-black-h font-semibold">Executive</h1>
                          <div className='col-span-3 text-xs pt-2 lg:pt-5'>
                            <span className="text-[9px] lg:text-14">To be a <strong>Executive</strong> you need</span>

                          </div>
                        </div>

                        <div className='w-7/12  text-xs pt-0 lg:pt-5 pl-4'>
                          <div className='flex flex-row justify-between'>
                            <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.exec.commissionVol, 0)} PVC
                            </strong>
                            <strong className='text-10'>
                    You need 100 PVC
                            </strong>
                          </div>
                          <BarWithText value={+rankData.exec.commissionVol > 100 ? 100 : +rankData.exec.commissionVol} variant={'determinate'} />
                        </div>
                      </div>
                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>{`You have ${rankData.exec.PSMRatio} PSM`}</strong></span>
                        <span className="text-right ml-auto text-10"><strong>You need 5 Active PSM</strong></span>
                      </div>
                      <BarWithText value={+rankData.exec.PSMPercentage} variant={'determinate'}/>
                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>You need</strong></span>
                        <span className="text-right ml-auto text-10"><strong>5 Working Legs, 10,000 V. Each</strong></span>
                      </div>
                      <div>
                        <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-2'>
                          {
                            rankData.exec.workingLegs && Object.values(rankData.exec.workingLegs).map((leg, index) => (
                              <div className='col-span-1'>
                                {<Tooltip title={leg.name}><div><BarWithText value={leg.percentage} variant={'determinate'}/></div></Tooltip>}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="flex pt-2">
                        <span className="text-left text-10"><strong>{`GV You have ${formatNumberToLocale(rankData.exec.gv.value, 0)}`}</strong></span>
                        <span className="text-right ml-auto text-10"><strong>You need 100,000</strong></span>
                      </div>
                      <div className='col-span-1'>
                        <BarWithText value={+rankData.exec.gv.percentage} variant={'determinate'}/>
                      </div>
                    </>
                  }
                </TabPanel>
              </>
            )}
          </div>
          <div className='col-span-1'>
            <PVComponentSnap userId={null} />
          </div>
        </div>
      </Box>
    </div>

  )
}
