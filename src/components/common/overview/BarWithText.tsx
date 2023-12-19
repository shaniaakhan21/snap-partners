// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/system'
interface BorderLinearProgressProps {
  progressColor: string;
}

const BorderLinearProgress = styled(LinearProgress)<BorderLinearProgressProps>(
  ({ theme, progressColor }) => ({
    height: 20,
    borderRadius: 0,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#DCE5ED'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: progressColor
    }
  })
)

const BarWithText = ({ value, variant, progressColor }) => {
  return (
    <div style={{ position: 'relative' }}>
      <BorderLinearProgress className='mt-1' variant={variant} value={value} progressColor={progressColor} />
      <div style={{ position: 'absolute', top: '0px', left: '5px', width: `${value}%`, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '5px' }}>
        <span style={{ color: 'grey', fontSize: '10px', fontWeight: 'bold' }}>{value}%</span>
      </div>
    </div>
  )
}

export default BarWithText
