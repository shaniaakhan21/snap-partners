import React from 'react'
import { DownloadIcon } from '../../icons'
import { useStyles } from './styles'

export const HitUser = ({ hit, onClick }) => {
  const classes = useStyles()

  return (
  <li key={hit.id} className={classes.item}>
    <a
      href='#'
      className={classes.link}
      onClick={onClick}
    >
      <div style={{ 
        display: 'grid', 
        alignItems: 'center', 
        justifyContent: 'center', 
        justifyItems: 'center',
        gap: '1rem', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: '100%'
      }}>
        <span
          className={classes.resultContent}
        >
          {hit.name}
        </span>
        <span
          className={classes.resultContent}
        >
          {hit.phone}
        </span>
        <span
          style={{ display: 'flex', alignItems: 'center', color: '#DD4C37' }}
          className={[classes.resultContent, classes.downloadText].join(' ')}
        >
          {hit.id}
          <DownloadIcon styles={{ marginLeft: '0.25rem' }} />
        </span>
      </div>
    </a>
  </li>
)}

// NO ESTÁ TOMANDO LOS ESTILOS DE LOS SPAN