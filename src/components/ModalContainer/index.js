import React from 'react'
import { useStyles } from './styles'

export const ModalContainer = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.modal}>
      {children}
    </div>
  )
}