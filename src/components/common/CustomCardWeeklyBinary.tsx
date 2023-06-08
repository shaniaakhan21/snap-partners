import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Fragment } from 'react'

interface OutlinedCardProps {
  legName: string;
  legCVvalue: number;
  rollovervalue: number;
  totalValue: number;
}

const OutlinedCard = ({
  legName,
  legCVvalue,
  rollovervalue,
  totalValue
} : OutlinedCardProps) => {
  const card = (
    <Fragment>
      <CardContent style={{ padding: 0 }}>
        <p className='text-md md:text-sm font-bold md:text-center md:p-0 p-1 uppercase'>
          {legName}
        </p>
        <div className='p-1'>
          <p className='text-sm font-bold'>
            LEG CV
          </p>
          <p className='text-sm'>
            {legCVvalue} CV
          </p>
        </div>
        <div className='p-1'>
          <p className='text-sm font-bold'>
            ROLLOVER
          </p>
          <p className='text-sm'>
            {rollovervalue} CV
          </p>
        </div>
        <div className='p-1'>
          <p className='text-sm font-bold'>
            TOTAL
          </p>
          <p className='text-sm'>
            {totalValue} CV
          </p>
        </div>
      </CardContent>
    </Fragment>
  )
  return (
    <Box className='w-1/2 m-1'>
      <Card className='p-2' style={{ border: 'none', boxShadow: 'none', background: '#EFEFEF', borderRadius: '8px' }} >{card}</Card>
    </Box>
  )
}

export default OutlinedCard
