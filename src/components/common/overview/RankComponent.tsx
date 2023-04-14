// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@material-ui/core/styles'
import BarWithText from './BarWithText'


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

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  backgroundColor: '#C99FFF',
  borderRadius: 4
})

export default function RankComponent () {
  const [value, setValue] = React.useState(0)

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
        0
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="col-span-2 flex items-center">
          <StyledBox>
            <StarIcon style={{ color: '#fff', fontSize: 20, backgroundColor: '#C99FFF' }} />
          </StyledBox>
          <h1 className="text-2xl text-black font-bold pl-2">Manager</h1>
        </div>
        <div className='col-span-3 text-xs pt-5'>
          <span className='text-10'><strong>You need 100 Personal Commissionable Volume</strong></span>
          <BarWithText value={30} variant={'determinate'} />
        </div>
        <div className='col-span-3 text-xs pt-5'>
          <span className="text-15">To become a <strong>Supervisor</strong> you'll need</span>
        </div>
        <div className="flex pt-2">
          <span className="text-left text-10"><strong>You have 2/3 PSM</strong></span>
          <span className="text-right ml-auto text-10"><strong>You need 3 Active PSM</strong></span>
        </div>
        <BarWithText value={70} variant={'determinate'}/>
        <div className="flex pt-2">
          <span className="text-left text-10"><strong>You need</strong></span>
          <span className="text-right ml-auto text-10"><strong>3 Working Legs, 2500 V. Each</strong></span>
        </div>
        <div>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2'>
            <div className='col-span-1'>
              <BarWithText value={70} variant={'determinate'}/>
            </div>
            <div className='col-span-1'>
              <BarWithText value={70} variant={'determinate'}/>
            </div>
            <div className='col-span-1'>
              <BarWithText value={70} variant={'determinate'}/>
            </div>
            <div className='col-span-1 flex justify-end items-end'>
              <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-10 py-2 px-4 rounded-l-full rounded-r-full">+</button>
            </div>
          </div>
        </div>
        <div className="flex pt-2">
          <span className="text-left text-10"><strong>Gv You have $3500</strong></span>
          <span className="text-right ml-auto text-10"><strong>You need $5000</strong></span>
        </div>
        <div className='col-span-1'>
          <BarWithText value={70} variant={'determinate'}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        2
      </TabPanel>
      <TabPanel value={value} index={3}>
        3
      </TabPanel>
      <TabPanel value={value} index={4}>
        4
      </TabPanel>
    </Box>
  )
}
