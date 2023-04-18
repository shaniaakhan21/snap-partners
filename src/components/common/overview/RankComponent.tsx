// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@material-ui/core/styles'
import BarWithText from './BarWithText'
import { data } from './mock'

interface TabPanelProps {
  children?: React.ReactNode;
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
}));

interface WorkingLegs {
  [key: string]: {
    rate: number;
    percentage: number;
  };
}

interface GV {
  value: string,
  percentage: string
}

interface Post {
  commissionVol: number,
  PSMRatio: string,
  PSMPercentage: string,
  workingLegs: WorkingLegs,
  gv: GV
}
interface PVC {
  value: number,
  percentage: string
}

interface RankData {
  fm: {
    pvc: PVC
  },
  mng: Post,
  sv: Post,
  dct: Post,
  exec: Post
}

export default function RankComponent () {
  const [value, setValue] = React.useState(0)

  const [rankData, setRankData] = React.useState<RankData>(null)

  React.useEffect(() => {
    const details = data as RankData
    setRankData(details)
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ '& .Mui-selected': { color: 'black', bgcolor: 'white' }, '& .MuiTabs-indicator': { backgroundColor: 'transparent' } }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab sx={{ fontSize: 12, minWidth: 0, width: '80px', maxWidth: 100, bgcolor: '#E35C49' }} label="FM" />
        <Tab sx={{ fontSize: 12, minWidth: 0, width: '80px', maxWidth: 100, bgcolor: '#C99FFF' }} label="MNG" />
        <Tab sx={{ fontSize: 12, minWidth: 0, width: '80px', maxWidth: 100, bgcolor: '#54A52C' }} label="SV" />
        <Tab sx={{ fontSize: 12, minWidth: 0, width: '80px', maxWidth: 100, bgcolor: '#F18A00' }} label="DCT" />
        <Tab sx={{ fontSize: 12, minWidth: 0, width: '80px', maxWidth: 100, bgcolor: '#000000', color: '#FFFFFF' }} label="EXE" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Free Member */}
        {
          rankData && <><div className="col-span-2 flex items-center">
            <StyledBox backgroundColor={'#DD4C37'}>
              <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#DD4C37' }} />
            </StyledBox>
            <h1 className="text-2xl text-black font-bold pl-2">Free Member</h1>
          </div>
          <div className='col-span-3 text-xs pt-5'>
            <span className="text-15">To become a <strong>Manager</strong> you'll need</span>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`You have ${rankData.fm.pvc.value} PVC`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need 500 PVC</strong></span>
          </div>
          <BarWithText progressColor={'#DD4C37'} value={+rankData.fm.pvc.percentage} variant={'determinate'}/>
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
            <span className='text-10'><strong>You need 100 Personal Commissionable Volume</strong></span>
            <BarWithText progressColor={'#C99FFF'} value={+rankData.mng.commissionVol} variant={'determinate'} />
          </div>
          <div className='col-span-3 text-xs pt-5'>
            <span className="text-15">To become a <strong>Supervisor</strong> you'll need</span>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`You have ${rankData.mng.PSMRatio} PSM`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
          </div>
          <BarWithText progressColor={'#C99FFF'} value={+rankData.mng.PSMPercentage} variant={'determinate'}/>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>You need</strong></span>
            <span className="text-right ml-auto text-10"><strong>3 Working Legs, 2500 V. Each</strong></span>
          </div>
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2'>
              {
                rankData.mng.workingLegs && Object.values(rankData.mng.workingLegs).map((leg, index) => (
                  <div className='col-span-1'>
                    {<BarWithText progressColor={'#C99FFF'} value={leg.percentage} variant={'determinate'}/>}
                  </div>
                ))
              }

              <div className='col-span-1 flex justify-end items-end'>
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-10 py-2 px-4 rounded-l-full rounded-r-full">+</button>
              </div>
            </div>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`Gv You have $${rankData.mng.gv.value}`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need $5000</strong></span>
          </div>
          <div className='col-span-1'>
            <BarWithText progressColor={'#C99FFF'} value={+rankData.mng.gv.percentage} variant={'determinate'}/>
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
            <span className='text-10'><strong>You need 100 Personal Commissionable Volume</strong></span>
            <BarWithText progressColor={'#54A52C'} value={+rankData.sv.commissionVol} variant={'determinate'} />
          </div>
          <div className='col-span-3 text-xs pt-5'>
            <span className="text-15">To become a <strong>Supervisor</strong> you'll need</span>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`You have ${rankData.sv.PSMRatio} PSM`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
          </div>
          <BarWithText progressColor={'#54A52C'} value={+rankData.sv.PSMPercentage} variant={'determinate'}/>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>You need</strong></span>
            <span className="text-right ml-auto text-10"><strong>3 Working Legs, 2500 V. Each</strong></span>
          </div>
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-2'>
              {
                rankData.sv.workingLegs && Object.values(rankData.sv.workingLegs).map((leg, index) => (
                  <div className='col-span-1'>
                    {<BarWithText progressColor={'#54A52C'} value={leg.percentage} variant={'determinate'}/>}
                  </div>
                ))
              }

              <div className='col-span-1 flex justify-end items-end'>
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-10 py-2 px-4 rounded-l-full rounded-r-full">+</button>
              </div>
            </div>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`Gv You have $${rankData.sv.gv.value}`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need $5000</strong></span>
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
            <span className='text-10'><strong>You need 100 Personal Commissionable Volume</strong></span>
            <BarWithText progressColor={'#F18A00'} value={+rankData.dct.commissionVol} variant={'determinate'} />
          </div>
          <div className='col-span-3 text-xs pt-5'>
            <span className="text-15">To become a <strong>Supervisor</strong> you'll need</span>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`You have ${rankData.dct.PSMRatio} PSM`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
          </div>
          <BarWithText progressColor={'#F18A00'} value={+rankData.dct.PSMPercentage} variant={'determinate'}/>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>You need</strong></span>
            <span className="text-right ml-auto text-10"><strong>3 Working Legs, 2500 V. Each</strong></span>
          </div>
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 gap-2'>
              {
                rankData.dct.workingLegs && Object.values(rankData.dct.workingLegs).map((leg, index) => (
                  <div className='col-span-1'>
                    {<BarWithText progressColor={'#F18A00'} value={leg.percentage} variant={'determinate'}/>}
                  </div>
                ))
              }

              <div className='col-span-1 flex justify-end items-end'>
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-10 py-2 px-4 rounded-l-full rounded-r-full">+</button>
              </div>
            </div>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`Gv You have $${rankData.dct.gv.value}`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need $5000</strong></span>
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
            <span className='text-10'><strong>You need 100 Personal Commissionable Volume</strong></span>
            <BarWithText progressColor={'#000000'} value={+rankData.exec.commissionVol} variant={'determinate'} />
          </div>
          <div className='col-span-3 text-xs pt-5'>
            <span className="text-15">To become a <strong>Supervisor</strong> you'll need</span>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`You have ${rankData.exec.PSMRatio} PSM`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
          </div>
          <BarWithText progressColor={'#000000'} value={+rankData.exec.PSMPercentage} variant={'determinate'}/>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>You need</strong></span>
            <span className="text-right ml-auto text-10"><strong>3 Working Legs, 2500 V. Each</strong></span>
          </div>
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 gap-2'>
              {
                rankData.exec.workingLegs && Object.values(rankData.exec.workingLegs).map((leg, index) => (
                  <div className='col-span-1'>
                    {<BarWithText progressColor={'#000000'} value={leg.percentage} variant={'determinate'}/>}
                  </div>
                ))
              }

              <div className='col-span-1 flex justify-end items-end'>
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-10 py-2 px-4 rounded-l-full rounded-r-full">+</button>
              </div>
            </div>
          </div>
          <div className="flex pt-2">
            <span className="text-left text-10"><strong>{`Gv You have $${rankData.exec.gv.value}`}</strong></span>
            <span className="text-right ml-auto text-10"><strong>You need $5000</strong></span>
          </div>
          <div className='col-span-1'>
            <BarWithText progressColor={'#000000'} value={+rankData.exec.gv.percentage} variant={'determinate'}/>
          </div>
          </>
        }
      </TabPanel>
    </Box>
  )
}
