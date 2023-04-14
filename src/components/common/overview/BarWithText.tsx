// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@material-ui/core/styles'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#D2D2D2'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#C99FFF'
  }
}))

const BarWithText = ({ value, variant }) => {
  return (
    <>
      <BorderLinearProgress className='mt-1' variant={variant} value={value} />
    </>
  )
}

export default BarWithText
