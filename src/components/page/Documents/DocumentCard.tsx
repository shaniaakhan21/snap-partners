/* eslint-disable no-use-before-define */
import React from 'react'
import { Grid } from '@mui/material'

interface cardData {
    title:string,
    description:string,
    imgUrl:string
}
const DocumentCard = (props:cardData) => {
  const { title, description, imgUrl } = props
  return (
    <>
      <Grid item xs={6} md={2} lg={2}>
        <div style={{
          borderRadius: '10px',
          backgroundColor: '#FFFFFF'
        }}>
          <div>
            <img src={imgUrl} style={{
              width: '100%',
              height: '204px',
              objectFit: 'contain'
            }} />
          </div>
          <div style={{ padding: '8px 11px 15px 18px' }}>
            <p style={{
              fontWeight: '600',
              fontSize: '12px'
            }}>{title}</p>
            <p style={{
              fontWeight: '400',
              fontSize: '12px'
            }}>{description}</p>
          </div>
        </div>
      </Grid>
    </>
  )
}

export default DocumentCard
