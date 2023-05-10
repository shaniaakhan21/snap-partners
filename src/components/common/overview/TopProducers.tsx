// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Divider } from '@mui/material'
import { ITopProducerCategoryGeneric } from './TopProducerCategory'

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
  fontSize: '13px',
  textTransform: 'none'
}

const Info = ({ img, noOfCustomers, name }) => {
  return (
    <div className="grid grid-cols-4">
      <div className='col-span-1'>
        <img className="w-10 h-10 rounded-full" src={img} alt="Profile picture" />
      </div>
      <div className='col-span-3 pt-1 pl-2'>
        <div>
          <Typography variant="body1"
            sx={{
              fontSize: '10px',
              color: '#828282'
            }}
          >
            + {noOfCustomers} customers
          </Typography>
        </div>
        <div>
          <Typography variant="body1"
            sx={{
              fontSize: '12px',
              color: '#222020'
            }}
          >
            {name}
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

interface ITopProducerProps {
  data: ITopProducerCategoryGeneric;
  value: number
}

export const TopProducers: React.FC<ITopProducerProps> = ({ data, value }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <TabPanel value={value} index={0}>
        {
          data && data.personal && <>
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
              {
                data.personal.map((itm) => <div className='mt-3'>
                  <Info img={itm.profileImage} noOfCustomers={itm.noOfCustomers} name={itm.name}/>
                </div>)
              }
            </div>
          </>
        }

      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          data && data.manager && <>
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
              {
                data.manager.map((itm) => <div>
                  <Info img={itm.profileImage} noOfCustomers={itm.noOfCustomers} name={itm.name}/>
                </div>)
              }
            </div>
          </>
        }
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
