import React, { useRef } from 'react'
import { useStyles } from './styles'

export const Overlay = ({ onClick = () => {}, children }) => {
  const overlayRef = useRef()
  const classes = useStyles()

  return (
    <div 
      className={classes.overlay}
      ref={overlayRef}
      onClick={(e) => onClick(e, overlayRef.current)}
    >
      {children}
    </div>
  )
}