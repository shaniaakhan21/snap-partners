// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'
interface BorderLinearProgressProps {
  value: number;
}

const getColor = (value: number): string => {
  if (value >= 1 && value <= 20) {
    return '#DD1A1A' // Red color for 1%-20%
  } else if (value > 20 && value < 100) {
    return '#EDB525' // Yellow color for 20%-99%
  } else if (value === 100) {
    return '#71BF74' // Green color for 100%
  }
  return '#DCE5ED' // Default color
}

const BorderLinearProgress = styled(LinearProgress)<BorderLinearProgressProps>(
  ({ theme, value }) => ({
    height: 20,
    borderRadius: '0!important',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#DCE5ED'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: getColor(value)
    }
  })
)

const BarWithText = ({ value, variant }) => {
  return (
    <div style={{ position: 'relative' }}>
      <BorderLinearProgress className='mt-1' variant={variant} value={value} />
      <div style={{ position: 'absolute', top: '0px', left: '5px', width: `${value}%`, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '5px' }}>
        <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>{value}%</span>
      </div>
    </div>
  )
}

export default BarWithText
