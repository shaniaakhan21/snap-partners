import React from 'react'
import { useStyles } from './styles'

export const ReferralTabList = ({ children }) => {
  const classes = useStyles()

  return (
    <ul className={classes.container}>
      {children}
    </ul>
  )
}