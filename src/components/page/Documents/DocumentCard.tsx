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
  return (
    <>
      <Grid item xs={12} md={2} lg={3}>
        <div
          className='shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] rounded-2xl'
          style={{
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
              <div style={{ padding: '8px 11px 15px 18px' }} className='bg-[#F0F4F8] rounded-b-2xl border border-[#DCE5ED]'>
                <p
                  className='text-xl font-semibold'
                >{file?.title}</p>
                <p className='text-xs font-medium'
                >{file?.description}</p>
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
