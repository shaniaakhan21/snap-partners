import { ReactNode, useEffect, useState, CSSProperties, FlexDirection } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@mui/system'
import BarWithText from './BarWithText'
import { RankData } from 'lib/types/overview'
import { RankSteps } from './RankSteps'
import { Tooltip } from '@mui/material'
import { StarTrophyIcon } from '../icons/StarTrophyIcon'
import { StarSuccessIcon } from '../icons/StarSuccessIcon'

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
}

interface CustomStyles extends CSSProperties {
  flexDirection: FlexDirection;
  justifyContent?: string;
  // Add other style properties as needed
}

const rowStyle: CustomStyles = {
  flexDirection: 'row'
}

const colStyle: CustomStyles = {
  flexDirection: 'column'
}

const widerStyle = {
  justifyContent: 'space-between'
}

const normalStyle = {
  justifyContent: 'space-evenly'
}

const textStyle = {
  width: '66.66667%'
}

const newTextStyle = {
  textAlign: 'center',
  width: '100%',
  marginTop: '4%'
}

const iconStyle = {
  marginRight: '6%'
}

const newIconStyle = {
  margin: '12px 35%'
}
export default function RankComponent (props: RankComponentProps) {
  const { data: rankData } = props
  const [value, setValue] = useState(0)
  const [currentRank, setCurrentRank] = useState(undefined)

  useEffect(() => {
    if (rankData) {
      setValue(Math.min(rankData.currentRankLevel + 1, 4))
      setCurrentRank(rankData.currentRank)
      console.log('Current Rank:', rankData.currentRank)
    }
  }, [rankData])

  const rankColors = new Map()
  rankColors.set('Free Member', '#DD4C37')
  rankColors.set('Manager', '#C99FFF')
  rankColors.set('Supervisor', '#54A52C')
  rankColors.set('Director', '#F18A00')
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

  return (
    <div>
      <Box sx={{ '& .Mui-selected': { color: 'black', bgcolor: 'white' }, '& .MuiTabs-indicator': { backgroundColor: 'transparent' } }}>
        <div className='grid grid-cols-3 gap-4'>
          {currentRank && (
            <div className='bg-white rounded-3xl flex flex-col justify-between' >
              <div className='bg-[#fff] rounded-t-3xl py-4'>
                <div className='flex justify-between'>
                  <div className='flex flex-col justify-center ml-[10%]'>
                    <h1 className="text-xl font-bold">Your current </h1><span className='text-base font-normal text-gray-500'>Qualified rank is:</span>
                  </div>
                  <div className="flex items-center flex-col p-[6px] rounded-full border-2 border-[#D1D1D1] w-4/12  mr-[6%]">
                    <StyledBox backgroundColor={'white'}>
                      {/* <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: rankColors.get(rankData.currentRank) }} /> */}
                      <StarTrophyIcon/>
                    </StyledBox>
                    <h1 className="text-lg text-black-h font-bold ">{convertName(rankData.currentRank)}</h1>
                  </div>
                </div>
              </div>
              <div className='bg-[#000000] rounded-b-3xl py-4'>
                <div className='flex flex-row justify-between' >
                  <div className='flex flex-col justify-center ml-[10%]'>
                    <h1 className="text-xl text-white font-bold">Highest </h1><span className='text-base font-normal text-gray-500'>Achieved Rank:</span>
                  </div>
                  <div className="flex items-center flex-col p-[6px] rounded-full border-2 border-[#D1D1D1] w-4/12 mr-[6%] bg-[#fff]">
                    <StyledBox backgroundColor={'white'}>
                      {/* <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: rankColors.get(rankData.highestRank) }} /> */}
                      <StarSuccessIcon/>
                    </StyledBox>
                    <h1 className="text-lg text-black-h font-bold ">{convertName(rankData.highestRank)}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='bg-white rounded-lg col-span-2'>
            <RankSteps currentRank={value} onRankPress={setValue}/>
            <TabPanel value={value} index={0}>
              {/* Free Member */}
              {
                rankData && <><div className="col-span-2 flex items-center">
                  <StyledBox backgroundColor={'#DD4C37'}>
                    <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#DD4C37' }} />
                  </StyledBox>
                  <h1 className="text-2xl text-black font-bold pl-2">IBO</h1>
                </div>
                </>
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* Manager */}
              {
                rankData && <><div className="col-span-2 flex items-center">
                  <StyledBox backgroundColor={'#C99FFF'}>
                    <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#C99FFF' }} />
                  </StyledBox>
                  <h1 className="text-2xl text-black font-bold pl-2">Manager</h1>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <span className="text-15">To be a <strong>Manager</strong> you'll need</span>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <div className='flex flex-row justify-between'>
                    <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.mng.commissionVol, 0)} PVC
                    </strong>
                    <strong className='text-10'>
                    You need 100 PVC
                    </strong>
                  </div>
                  <BarWithText progressColor={'#C99FFF'} value={+rankData.mng.commissionVol > 100 ? 100 : +rankData.mng.commissionVol} variant={'determinate'} />
                </div>
                </>
              }
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* Supervisor */}
              {
                rankData && <><div className="col-span-2 flex items-center">
                  <StyledBox backgroundColor={'#54A52C'}>
                    <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#54A52C' }} />
                  </StyledBox>
                  <h1 className="text-2xl text-black font-bold pl-2">Supervisor</h1>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <span className="text-15">To be <strong>Supervisor</strong> you'll need</span>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <div className='flex flex-row justify-between'>
                    <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.sv.commissionVol, 0)} PVC
                    </strong>
                    <strong className='text-10'>
                    You need 100 PVC
                    </strong>
                  </div>
                  <BarWithText progressColor={'#54A52C'} value={+rankData.sv.commissionVol > 100 ? 100 : +rankData.sv.commissionVol} variant={'determinate'} />
                </div>

                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>{`You have ${rankData.sv.PSMRatio} PSM`}</strong></span>
                  <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
                </div>
                <BarWithText progressColor={'#54A52C'} value={+rankData.sv.PSMPercentage} variant={'determinate'}/>
                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>You need</strong></span>
                  <span className="text-right ml-auto text-10"><strong>3 Working Legs, 500 V. Each</strong></span>
                </div>
                <div>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2'>
                    {
                      rankData.sv.workingLegs && Object.values(rankData.sv.workingLegs).map((leg, index) => (
                        <div className='col-span-1'>
                          { <Tooltip title={leg.name}><div><BarWithText progressColor={'#54A52C'} value={leg.percentage} variant={'determinate'}/></div></Tooltip> }
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
                  <BarWithText progressColor={'#54A52C'} value={+rankData.sv.gv.percentage} variant={'determinate'}/>
                </div>
                </>
              }
            </TabPanel>
            <TabPanel value={value} index={3}>
              {/* Director */}
              {
                rankData && <><div className="col-span-2 flex items-center">
                  <StyledBox backgroundColor={'#F18A00'}>
                    <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#F18A00' }} />
                  </StyledBox>
                  <h1 className="text-2xl text-black font-bold pl-2">Director</h1>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <span className="text-15">To be a <strong>Director</strong> you'll need</span>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <div className='flex flex-row justify-between'>
                    <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.dct.commissionVol, 0)} PVC
                    </strong>
                    <strong className='text-10'>
                    You need 100 PVC
                    </strong>
                  </div>
                  <BarWithText progressColor={'#F18A00'} value={+rankData.dct.commissionVol > 100 ? 100 : +rankData.dct.commissionVol} variant={'determinate'} />
                </div>
                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>{`You have ${rankData.dct.PSMRatio} PSM`}</strong></span>
                  <span className="text-right ml-auto text-10"><strong>You need 4 Active PSM</strong></span>
                </div>
                <BarWithText progressColor={'#F18A00'} value={+rankData.dct.PSMPercentage} variant={'determinate'}/>
                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>You need</strong></span>
                  <span className="text-right ml-auto text-10"><strong>4 Working Legs, 5,000 V. Each</strong></span>
                </div>
                <div>
                  <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2'>
                    {
                      rankData.dct.workingLegs && Object.values(rankData.dct.workingLegs).map((leg, index) => (
                        <div className='col-span-1'>
                          { <Tooltip title={leg.name}><div><BarWithText progressColor={'#F18A00'} value={leg.percentage} variant={'determinate'}/></div></Tooltip> }
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
                  <BarWithText progressColor={'#F18A00'} value={+rankData.dct.gv.percentage} variant={'determinate'}/>
                </div>

                </>
              }
            </TabPanel>
            <TabPanel value={value} index={4}>
              {/* Executive */}
              {
                rankData && <><div className="col-span-2 flex items-center">
                  <StyledBox backgroundColor={'#000000'}>
                    <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#000000' }} />
                  </StyledBox>
                  <h1 className="text-2xl text-black font-bold pl-2">Executive</h1>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <span className="text-15">To be a <strong>Executive</strong> you need</span>
                </div>
                <div className='col-span-3 text-xs pt-5'>
                  <div className='flex flex-row justify-between'>
                    <strong className='text-10'>
                    You have {formatNumberToLocale(rankData.exec.commissionVol, 0)} PVC
                    </strong>
                    <strong className='text-10'>
                    You need 100 PVC
                    </strong>
                  </div>
                  <BarWithText progressColor={'#000000'} value={+rankData.exec.commissionVol > 100 ? 100 : +rankData.exec.commissionVol} variant={'determinate'} />
                </div>
                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>{`You have ${rankData.exec.PSMRatio} PSM`}</strong></span>
                  <span className="text-right ml-auto text-10"><strong>You need 5 Active PSM</strong></span>
                </div>
                <BarWithText progressColor={'#000000'} value={+rankData.exec.PSMPercentage} variant={'determinate'}/>
                <div className="flex pt-2">
                  <span className="text-left text-10"><strong>You need</strong></span>
                  <span className="text-right ml-auto text-10"><strong>5 Working Legs, 10,000 V. Each</strong></span>
                </div>
                <div>
                  <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-2'>
                    {
                      rankData.exec.workingLegs && Object.values(rankData.exec.workingLegs).map((leg, index) => (
                        <div className='col-span-1'>
                          {<Tooltip title={leg.name}><div><BarWithText progressColor={'#000000'} value={leg.percentage} variant={'determinate'}/></div></Tooltip>}
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
                  <BarWithText progressColor={'#000000'} value={+rankData.exec.gv.percentage} variant={'determinate'}/>
                </div>
                </>
              }
            </TabPanel>
          </div>
        </div>
      </Box>
    </div>

  )
}
