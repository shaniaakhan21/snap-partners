import React from 'react'
import { useStyles } from './styles'

export const HitsList = ({ children }) => {
  const classes = useStyles()

  return (
    <ul className={classes.list}>{children}</ul>
  )
}