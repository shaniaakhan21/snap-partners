/* eslint-disable no-use-before-define */
import { Document, Page, pdfjs } from 'react-pdf'
import React from 'react'
import { Grid } from '@mui/material'

// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'

interface cardData {
    title:string,
    description:string,
    imgUrl:string
}
const DocumentCard = (props:cardData) => {
  const { title, description, imgUrl } = props
   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (
    <>
      <Grid item xs={6} md={2} lg={2}>
        <div style={{
          borderRadius: '10px',
          backgroundColor: '#FFFFFF'
        }}>
          <div className='documents'>
            {/* <img src={imgUrl} style={{
              width: '100%',
              height: '204px',
              objectFit: 'contain'
            }} /> */}
            <Document
              // file='/static/FULL_Comp_Plan_1.pdf'
              file={imgUrl}
            >
              <Page pageNumber={1} />
            </Document>
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
