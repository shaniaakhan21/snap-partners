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

const Info = ({ img, noOfCustomers, name, nameValue }) => {
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
            + {noOfCustomers} {noOfCustomers === 1 ? nameValue.slice(0, -1).toLowerCase() : nameValue.toLowerCase()}
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

export const TopProducers: React.FC<any> = ({ data, value, type, typeText, monthSelected, yearSelected }) => {
  const rankTolevel = new Map()
  rankTolevel.set('referralPartner', 0)
  rankTolevel.set('manager', 1)
  rankTolevel.set('supervisor', 2)
  rankTolevel.set('director', 3)
  rankTolevel.set('executive', 4)

  const rankTolevelUppercasy = new Map()
  rankTolevelUppercasy.set(0, 'Referral Partners')
  rankTolevelUppercasy.set(1, 'Managers')
  rankTolevelUppercasy.set(2, 'Supervisors')
  rankTolevelUppercasy.set(3, 'Directors')
  rankTolevelUppercasy.set(4, 'Executives')

  const values = [0, 1, 2, 3, 4]
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <Box sx={{ width: '100%' }}>
      {values.map((index) =>
        <TabPanel value={value} index={index}>
          {
            data && data[type] && <>
              <div className='pt-5 pb-1'>
                <Typography variant="body1"
                  sx={{
                    fontSize: '12px',
                    color: '#DC2626'
                  }}
                >
                  New {typeText} Acquired by {rankTolevelUppercasy.get(value)}
                </Typography>
              </div>
              <div className='pb-2'>
                <Typography variant="body1"
                  sx={{
                    fontSize: '15px',
                    color: 'black'
                  }}
                >
            For {month[monthSelected]} {yearSelected}
                </Typography>
              </div>
              <div className='pb-3'>
                <Divider color="primary"/>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {
                  data[type].map((itm) => {
                    if (index === 0 && ![0, 1].includes(rankTolevel.get(itm.rank))) return <></>
                    if (index === 1 && ![1].includes(rankTolevel.get(itm.rank))) return <></>
                    if (rankTolevel.get(itm.rank) < index) return <></>
                    return (<div>
                      <Info img={itm.profileImage} noOfCustomers={itm.amount} name={itm.name} nameValue={typeText}/>
                    </div>)
                  })
                }
              </div>
            </>
          }
        </TabPanel>
      )}
    </Box>
  )
}
