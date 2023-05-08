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
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
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

  const [topProducerData, setTopProducers] = React.useState<ITopProducerCategory>()

  React.useEffect(() => {
    const data = topProducers
    setTopProducers(data)
  }, [])

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
      >Top Producers</Typography>
      <Tabs
        // disable the tab indicator because it doesn't work well with wrapped container
        TabIndicatorProps={{ sx: { display: 'none' } }}
        value={value}
        onChange={handleChange}
        aria-label="Top Producers Categories"
        variant='scrollable'
        ScrollButtonComponent={HiddenTabScrollButton}
      >
        <Tab sx={tabStyle} label="IBO" {...a11yProps(0)} />
        <Tab sx={tabStyle} label="ERC" {...a11yProps(1)} />
        <Tab sx={tabStyle} label="Delivery" {...a11yProps(2)} />
        <Tab sx={tabStyle} label="Vidgo" {...a11yProps(3)} />
        <Tab sx={tabStyle} label="Products" {...a11yProps(4)} />
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
        <Tab sx={subTabStyle} label="Personal" />
        <Tab sx={subTabStyle} label="Manager" />
        <Tab sx={subTabStyle} label="Supervisor" />
        <Tab sx={subTabStyle} label="Director" />
        <Tab sx={subTabStyle} label="Executive" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TopProducers data={topProducerData?.ibo} value={subctegoryValue}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item 4
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item 5
      </TabPanel>
    </Box>
  )
}
