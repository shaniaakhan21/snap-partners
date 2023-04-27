// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Divider } from '@mui/material'

const tabStyle = {
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderTop: '1px solid #c8c8c8',
  borderLeft: '1px solid #c8c8c8',
  borderRight: '1px solid #c8c8c8',
  '&.Mui-selected': {
    backgroundColor: '#fe0002',
    color: 'white'
  },
  fontSize: '10px'
}

const Info = () => {
  return (
    <div className="grid grid-cols-4">
      <div className='col-span-1'>
        <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60" alt="Profile picture" />
      </div>
      <div className='col-span-3 pt-1 pl-2'>
        <div>
          <Typography variant="body1"
            sx={{
              fontSize: '10px',
              color: '#828282'
            }}
          >
            + 3 customers
          </Typography>
        </div>
        <div>
          <Typography variant="body1"
            sx={{
              fontSize: '12px',
              color: '#222020'
            }}
          >
            Cameron Williamson
          </Typography>
        </div>
      </div>
    </div>

  )
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function TopProducers () {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          // disable the tab indicator because it doesn't work well with wrapped container
          TabIndicatorProps={{ sx: { display: 'none' } }}
          sx={{
            '& .MuiTabs-flexContainer': {
              flexWrap: 'wrap'
            }
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tabStyle} label="IBO" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="ERC" {...a11yProps(1)} />
          <Tab sx={tabStyle} label="Vidgo" {...a11yProps(2)} />
          <Tab sx={tabStyle} label="Products" {...a11yProps(3)} />
          <Tab sx={tabStyle} label="Personal" {...a11yProps(4)} />
          <Tab sx={tabStyle} label="Manager" {...a11yProps(5)} />
          <Tab sx={tabStyle} label="supervisor" {...a11yProps(6)} />
          <Tab sx={tabStyle} label="Director" {...a11yProps(7)} />
          <Tab sx={tabStyle} label="Executive" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='pt-5 pb-1'>
          <Typography variant="body1"
            sx={{
              fontSize: '12px',
              color: '#DC2626'
            }}
          >
            Independent Business Owners
          </Typography>
        </div>
        <div className='pb-2'>
          <Typography variant="body1"
            sx={{
              fontSize: '15px',
              color: 'black'
            }}
          >
            For the last 7 days
          </Typography>
        </div>
        <div className='pb-3'>
          <Divider color="primary"/>
        </div>
        <div className="grid grid-cols-2 gap-0">
          <div>
            <Info />
          </div>
          <div>
            <Info />
          </div>
        </div>
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
      <TabPanel value={value} index={5}>
        Item 6
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item 6
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item 6
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item 6
      </TabPanel>
    </Box>
  )
}
