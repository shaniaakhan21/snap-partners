import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import IntegrousProducts from './IntegrousProducts'

interface TabPanelProps {
    children: any;
    index: number;
    value: number;
}

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

const ProductTabs = ({ teaCoffeeProducts, userData, generalProducts, userId, isLoggedIn, collectionIdTea, collectionIdGut, AllProducts, collectionIdAll }) => {
  const [value, setValue] = useState(0)
  const [IboId, setIboId] = useState(0)
  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className='pt-4'>
      <Tabs
        value={value}
        onChange={handleChange as any}
        centered
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#404040',
            width: '50%'
          },
          color: '#404040',
          fontWeight: '300',
          '& .Mui-selected': { color: '#404040!important', fontWeight: '600', fontSize: '16px' }
        }}
      >
        <Tab label="All Products" className={`
    ${value === 0} 
     p-0 mx-2 text-[#404040] text-base
  `} />
        <Tab label="Coffee/Tea" className={`
    ${value === 1} 
     p-0 mx-2 text-[#404040] text-base
  `} />
        <Tab label="Gut Health" className={`
    ${value === 2} 
     p-0 mx-2 text-[#404040] text-base
  `} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          <IntegrousProducts products={AllProducts} userId={userId || 0} collectionId={collectionIdAll} IboId={IboId} isLoggedIn={isLoggedIn} userRole={userData?.roles.ibo} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <IntegrousProducts products={teaCoffeeProducts} userId={userId || 0} collectionId={collectionIdTea} IboId={IboId} isLoggedIn={isLoggedIn} userRole={userData?.roles.ibo} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <IntegrousProducts products={generalProducts} userId={userId || 0} collectionId={collectionIdGut} IboId={IboId} isLoggedIn={isLoggedIn} userRole={userData?.roles.ibo} />
        </div>
      </TabPanel>
    </div>
  )
}

export default ProductTabs
