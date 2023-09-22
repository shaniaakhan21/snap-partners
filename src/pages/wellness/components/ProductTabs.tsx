import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ProductCard from './ProductCard'
import WeightCare from './WeightCare'

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

const ProductTabs = ({ userId, isLoggedIn, collectionIdTea, collectionIdGut, collectionIdAllProducts, referralCode, isIntegrous }) => {
  const [value, setValue] = useState(0)

  const products = [
    { productName: 'Therapeutic Gourmet Coffee (Latte Coffee) 20 Sachets in a box', productImage: '/static/wellness/Latte-Coffee.svg', productPrice: '$30.00' },
    { productName: 'Therapeutic Gourmet Coffee (Gourmet Black Coffee) 30 Sachets in a box', productImage: '/static/wellness/Tea.svg', productPrice: '$45.00' },
    { productName: 'Therapeutic Gourmet Tea (Tea Flavor) 20 Sachets in a box', productImage: '/static/wellness/Black.svg', productPrice: '$30.00' }
  ]

  const gutproducts = [
    { productName: 'Digestive Enzymes', productImage: '/static/wellness/enzymes.svg', productPrice: '$59.95' },
    { productName: 'Qardio Fuel', productImage: '/static/wellness/fuel.svg', productPrice: '$49.95' },
    { productName: 'EMF Shields (Pack of 9)', productImage: '/static/wellness/shields.svg', productPrice: '$149.00' },
    { productName: 'Hologram Qubits (Pack of 12)', productImage: '/static/wellness/qubits.svg', productPrice: '$120.00' }
  ]

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className='mx-5 md:mx-10 lg:mx-20 2xl:mx-24 pt-4'>
      <Tabs value={value} onChange={handleChange as any} variant="scrollable" scrollButtons="auto" style={{ borderBottom: '3px solid red' }} TabIndicatorProps={{ style: { display: 'none' } }}>
        <Tab label="All Products" className={`
    ${value === 0 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg 3xl:text-xl' : 'text-black-h 3xl:text-xl'} 
    custom-text-none custom-padding
  `} />
        <Tab label="Coffee/Tea" className={`
    ${value === 1 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg 3xl:text-xl' : 'text-black-h 3xl:text-xl'} 
    custom-text-none custom-padding
  `} />
        <Tab label="Gut Health" className={`
    ${value === 2 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg 3xl:text-xl' : 'text-black-h 3xl:text-xl'} 
    custom-text-none custom-padding
  `} />
  {!isIntegrous && (
        <Tab label="Weight Management" className={`
    ${value === 3 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg 3xl:text-xl' : 'text-black-h 3xl:text-xl'} 
    custom-text-none custom-padding
  `} />
  )}
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className='p-1 2xl:p-10  rounded-2xl bg-white shadow-custom'>
          <ProductCard userId={userId} collectionId={collectionIdAllProducts} isLoggedIn={isLoggedIn} referralCode={referralCode} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='p-1 2xl:p-10  rounded-2xl bg-white shadow-custom'>
          <ProductCard userId={userId} collectionId={collectionIdTea} isLoggedIn={isLoggedIn} referralCode={referralCode}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='p-1 2xl:p-10  rounded-2xl bg-white shadow-custom'>
          <ProductCard userId={userId} collectionId={collectionIdGut} isLoggedIn={isLoggedIn} referralCode={referralCode}/>
        </div>
      </TabPanel>
      {!isIntegrous && (
      <TabPanel value={value} index={3} >
        <div className='p-1 2xl:p-10  rounded-2xl bg-white shadow-custom'>
          <div>
            <WeightCare isLoggedIn={isLoggedIn} referralCode={referralCode}/>
          </div>
        </div>
      </TabPanel>
      )}
    </div>
  )
}

export default ProductTabs
