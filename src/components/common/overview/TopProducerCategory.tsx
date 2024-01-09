// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TopProducers } from './TopProducers'
import { topProducers } from './mock'
import { MenuItem, Select, Typography } from '@mui/material'
import { TabScrollButton, withStyles } from '@material-ui/core'
import HiddenTabScrollButton from './HiddenTabScrollButton'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'

interface ISubCategoryInfo {
  name: string,
  noOfCustomers: string,
  profileImage: string
}

export interface ITopProducerCategoryGeneric {
  personal: Array<ISubCategoryInfo>,
    manager: Array<ISubCategoryInfo>,
    supervisor: Array<ISubCategoryInfo>,
    director: Array<ISubCategoryInfo>,
    executive: Array<ISubCategoryInfo>
}
interface ITopProducerCategory {
  ibo: ITopProducerCategoryGeneric,
  erc: ITopProducerCategoryGeneric,
  delivery: ITopProducerCategoryGeneric,
  vidgo: ITopProducerCategoryGeneric,
  products: ITopProducerCategoryGeneric
}

const tabStyle = {
  '&.Mui-selected': {
    backgroundColor: '#E74426',
    color: 'white'
  },
  fontSize: '13px',
  textTransform: 'none',
  width: '20%'
}

const subTabStyle = {
  '&.Mui-selected': {
    backgroundColor: '#E74426',
    color: 'white'
  },
  fontSize: '13px',
  textTransform: 'none',
  width: '20%',
  '@media (max-width: 567px)': {
    fontSize: '10px',
    padding: '1px!important'
  }
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export default function TopProducerCategory () {
  const [value, setValue] = React.useState(0)
  const [subctegoryValue, setSubcategoryValue] = React.useState(0)
  const [data, setData] = React.useState({})

  const [monthSelected, setMonthSelected] = React.useState(new Date().getMonth()) // 0-11
  const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }

  const [topProducerData, setTopProducers] = React.useState<ITopProducerCategory>()

  React.useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getTopProducers', {
        params: {
          monthSelected,
          yearSelected
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(response.data)
      setTopProducers(response.data)
    })()
  }, [monthSelected, yearSelected])

  const handleSubcategoryChange = (event, newValue) => {
    setSubcategoryValue(newValue)
  }

  const handleCategoryChange = (event) => {
    setValue(event.target.value)
  }

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  return (
    <Box sx={{ width: '100%', padding: '10px' }} className=' bg-white rounded-3xl shadow-lg p-4 lg:p-6'>
      <div className='flex flex-col lg:flex-row justify-between items-center mb-4'>
        <span className='text-sm sm:text-lg md:text-xl font-bold mb-4 lg:mb-0'>
          Global SNAP Top Producers
        </span>
        <div className='flex flex-row items-center'>
          <select
            id='legalType'
            name='legalType'
            className='cursor-pointer outline-none appearance-none rounded-3xl border border-solid py-2 pl-4 pr-14 text-xs lg:text-sm sm:text-base bg-[#E74426] text-white'
            placeholder='User Rank'
            onChange={(current) => { setYearSelected(parseInt(current.target.value)) }}
            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #ffffff 50%), linear-gradient(135deg, #ffffff 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc' }}
          >
            {years.map((y, i) => {
              return (
                <option className='text-black bg-white' key={i} selected={(new Date().getFullYear() === y)} value={y}>
                  {y}
                </option>
              )
            })
            }
          </select>
          <select
            id='legalType'
            name='legalType'
            className='ml-5 cursor-pointer outline-none appearance-none rounded-3xl border border-solid bg-[#E74426] text-white py-2 pl-4 pr-8 text-xs lg:text-sm sm:text-base'
            placeholder='User Rank'
            onChange={(current) => { setMonthSelected(parseInt(current.target.value)) }}
            style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #ffffff 50%), linear-gradient(135deg, #ffffff 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc' }}
          >
            {month.map((m, i) => {
              return (
                <option className='text-black bg-white' key={i} selected={(new Date().getMonth() === i)} value={i}>
                  {m}
                </option>
              )
            })
            }
          </select>
        </div>
      </div>
      <Tabs
        TabIndicatorProps={{ sx: { display: 'none' } }}
        value={subctegoryValue}
        onChange={handleSubcategoryChange}
        aria-label="Top Producers SubCategories"
        variant='scrollable'
        className='border-2 border-[#DCE5ED] rounded-3xl'
        ScrollButtonComponent={HiddenTabScrollButton}
        sx={{
          '.& MuiTabs-scroller': {
            marginBottom: '0px!important',
            height: '73%!important'
          },
          '.& MuiTabs-indicator': {
            backgroundColor: 'none!important',
            height: '14px!important'
          }
        }}
      >
        <Tab sx={subTabStyle} label="Directly Sponsored" />
        <Tab sx={subTabStyle} label="Manager" />
        <Tab sx={subTabStyle} label="Supervisor" />
        <Tab sx={subTabStyle} label="Director" />
        <Tab sx={subTabStyle} label="Executive" />
      </Tabs>
      <br></br>
      <Select
        value={value}
        onChange={handleCategoryChange}
        className='w-full text-white bg-[#E74426] border-[#E74426] my-custom-select'
        sx={{
          ...tabStyle,
          '& .MuiSelect-select': {
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '8px',
            backgroundColor: '#E74426!important',
            color: 'white',
            borderColor: '#E74426!important'
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
            borderLeft: '1px solid white'
          },
          '& .MuiButtonBase-root': {
            minHeight: 'none!important'
          }
        }}
      >
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={0}>IBO</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={1}>ERC</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={2}>SETC</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={3}>Delivery Merchant</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={4}>Delivery Customer</MenuItem>
        <MenuItem className='flex flex-col lg:flex-row text-xs sm:text-sm lg:text-base' value={5}>Delivery Driver</MenuItem>
      </Select>
      <TabPanel value={value} index={0}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='agent' type='topAgent' typeText='IBOs'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='erc' type='topErc' typeText='ERCs'/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='setc' type='topSetc' typeText='SETCs'/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='merchant' type='topMerchant' typeText='Merchants'/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='customer' type='topCustomer' typeText='Customers'/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='driver' type='topDriver' typeText='Drivers'/>
      </TabPanel>
    </Box>
  )
}
