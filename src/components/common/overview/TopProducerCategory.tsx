// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TopProducers } from './TopProducers'
import { topProducers } from './mock'
import { Typography } from '@mui/material'
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
  borderTop: '1px solid #c8c8c8',
  borderLeft: '1px solid #c8c8c8',
  borderRight: '1px solid #c8c8c8',
  '&.Mui-selected': {
    backgroundColor: '#FF998B',
    color: 'white'
  },
  fontSize: '13px',
  textTransform: 'none',
  width: '20%'
}

const subTabStyle = {
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderTop: '1px solid #c8c8c8',
  borderLeft: '1px solid #c8c8c8',
  borderRight: '1px solid #c8c8c8',
  '&.Mui-selected': {
    backgroundColor: '#DD4C37',
    color: 'white'
  },
  fontSize: '13px',
  textTransform: 'none',
  width: '20%'
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSubcategoryChange = (event, newValue) => {
    setSubcategoryValue(newValue)
  }

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <Typography
        sx={{
          fontSize: '20px',
          paddingBottom: '20px'
        }}
      >Global SNAP Top Producers

        <select
          id='legalType'
          name='legalType'
          className='ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
          placeholder='User Rank'
          style={{ float: 'right' }}
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
          className='ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
          placeholder='User Rank'
          style={{ float: 'right' }}
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
        <br/>
        <br/>

      </Typography>

      <Tabs
        // disable the tab indicator because it doesn't work well with wrapped container
        TabIndicatorProps={{ sx: { display: 'none' } }}
        value={value}
        onChange={handleChange}
        aria-label="Top Producers Categories"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
      >
        <Tab sx={tabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="IBO" {...a11yProps(0)} />
        <Tab sx={tabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="ERC" {...a11yProps(1)} />
        <Tab sx={tabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Merchant" {...a11yProps(2)} />
        <Tab sx={tabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Customer" {...a11yProps(3)} />
        <Tab sx={tabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Driver" {...a11yProps(4)} />
      </Tabs>
      <Tabs
        TabIndicatorProps={{ sx: { display: 'none' } }}
        value={subctegoryValue}
        onChange={handleSubcategoryChange}
        aria-label="Top Producers SubCategories"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
        className='border-b-4 border-primary-500'
      >
        <Tab sx={subTabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Referral Partner" />
        <Tab sx={subTabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Manager" />
        <Tab sx={subTabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Supervisor" />
        <Tab sx={subTabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Director" />
        <Tab sx={subTabStyle} style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} label="Executive" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='agent' type='topAgent' typeText='IBOs'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='erc' type='topErc' typeText='ERCs'/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='merchant' type='topMerchant' typeText='Merchants'/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='customer' type='topCustomer' typeText='Customers'/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TopProducers monthSelected={monthSelected} yearSelected={yearSelected} data={topProducerData} value={subctegoryValue} typeLow='driver' type='topDriver' typeText='Drivers'/>
      </TabPanel>
    </Box>
  )
}
