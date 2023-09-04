import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ProductCard from './ProductCard'

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

const ProductTabs = ({teaCoffeeProducts, generalProducts}) => {
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
    <div className='m-14'>
      <Tabs value={value} onChange={handleChange as any} variant="scrollable" scrollButtons="auto" style={{ borderBottom: '3px solid red' }} TabIndicatorProps={{ style: { display: 'none' } }}>
        <Tab label="Weight Management" className={`
    ${value === 0 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg' : 'text-black-h'} 
    custom-text-none custom-padding
  `} />
        <Tab label="Coffee/Tea" className={`
    ${value === 1 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg' : 'text-black-h'} 
    custom-text-none custom-padding
  `} />
        <Tab label="Gut Health" className={`
    ${value === 2 ? 'bg-btn-color text-white-h rounded-tl-lg rounded-tr-lg' : 'text-black-h'} 
    custom-text-none custom-padding
  `} />
      </Tabs>
      <TabPanel value={value} index={0} >
        <div className='p-36  rounded-2xl bg-white shadow-custom'>
          <div className='flex justify-center'>
            <img src="/static/wellness/unavailable.png" />
          </div>
          <div>
            <h1 className='text-2xl text-center font-semibold'>No Products Available</h1>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductCard products={teaCoffeeProducts} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductCard products={generalProducts} />
      </TabPanel>
    </div>
  )
}

export default ProductTabs
