/* eslint-disable no-use-before-define */
import { pdfjs } from 'react-pdf'
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import ImageComponent from './ImageComponent'
import { Spinner } from 'components/common/loaders'
import { getLocalStorage } from 'lib/utils/localStorage'

interface cardData {
    file : any
}
const DocumentCard = (props:cardData) => {
  const { file } = props
  const [loading, setLoading] = useState(false)
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (
    <>
      <Grid item xs={6} md={2} lg={2}>
        <div style={{
          borderRadius: '10px',
          backgroundColor: '#FFFFFF'
        }}>
          { !loading
            ? <>
              <a
                href = {file.fileUrl ? file.fileUrl : `https://snap-delivered.nyc3.digitaloceanspaces.com/documents/${encodeURIComponent(file?.fileName)}`}
                target='_blank'
                rel="noopener noreferrer"
              >
                <div className='documents' style={{ textAlign: 'center' }}>
                  <ImageComponent fileId={file?.fileId} />
                </div>
              </a>
              <div style={{ padding: '8px 11px 15px 18px' }}>
                <p style={{
                  fontWeight: '600',
                  fontSize: '12px'
                }}>{file?.fileName}</p>
                <p style={{
                  fontWeight: '400',
                  fontSize: '12px'
                }}>{file?.description}</p>
              </div>
            </>
            : <><Spinner /></>
          }
        </div>
      </Grid>
    </>
  )
}

export default DocumentCard
