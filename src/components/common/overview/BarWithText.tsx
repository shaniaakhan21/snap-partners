// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'
interface BorderLinearProgressProps {
  progressColor: string;
}

const BorderLinearProgress = styled(LinearProgress)<BorderLinearProgressProps>(
  ({ theme, progressColor }) => ({
    height: 20,
    borderRadius: '0!important',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#DCE5ED'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: progressColor
    }
  })
)

const BarWithText = ({ value, variant, progressColor }) => {
  return (
    <div style={{ position: 'relative' }}>
      <BorderLinearProgress className='mt-1' variant={variant} value={value} progressColor={progressColor} />
      <div style={{ position: 'absolute', top: '0px', left: '5px', width: `${value}%`, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingLeft: '5px' }}>
        <Tooltip title={value} open={true} arrow><span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>{value}%</span></Tooltip>
      </div>
    </div>
  )
}

export default BarWithText
