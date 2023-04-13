// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import StarIcon from '@material-ui/icons/Star'
import { styled } from '@material-ui/core/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#D2D2D2' : '#D2D2D2'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#C99FFF'
  }
}))

const BarWithText = ({ value, variant }) => {
  const [textPosition, setTextPosition] = React.useState(0)

  React.useEffect(() => {
    // set the text position based on the value
    setTextPosition((value * 100) / 90)
  }, [value])

  return (
    <>
      <Typography
        variant="caption"
        style={{
          zIndex: 100,
          position: 'relative',
          right: `${100 - textPosition}%`, // set right property based on value
          top: '25px'
        }}
      >
        {`${value}%`}
      </Typography>
      <BorderLinearProgress className='mt-1' variant={variant} value={value} />
    </>
  )
}

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
          <strong>You need 100 Personal Commissionable Volume</strong>
          <BarWithText value={50} variant={'determinate'} />
        </div>
        <div className='col-span-3 text-xs pt-5'>

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
