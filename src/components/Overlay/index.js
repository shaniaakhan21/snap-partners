import React from 'react'
import { useStyles } from './styles'

export const Overlay = ({ onClick = () => {}, children }) => {
  const classes = useStyles()

  return (
    <div id='overlay' className={classes.overlay} onClick={onClick}>
      {children}
    </div>
  )
}