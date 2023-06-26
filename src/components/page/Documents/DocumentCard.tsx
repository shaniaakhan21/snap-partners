/* eslint-disable no-use-before-define */
import { Document, Page, pdfjs } from 'react-pdf'
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import ImageComponent from './ImageComponent'

// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'

interface cardData {
    categoryFiles : any
}
const DocumentCard = (props:cardData) => {
  const { categoryFiles } = props
  const [flag, setFlag] = useState(false)
  const fetchThumbnailUrl = async (fileId) => {
    await axios.get(`/api/document/thumbnail/${fileId}`)
      .then(async (response) => {
        if (response.data.status) {
          const res = await Promise.resolve(getFileSrc(response.data.result[0], true))
          console.log('result is', res)
          return res
        } else {
          return ''
        }
      })
      .catch((e) => {
        return ''
      })
    return ''
  }
  const getThumbnailUrl = (fileId):string => {
    fetchThumbnailUrl(fileId)
      .then((result) => {
        const res: string = result
        return res
      })
      return ''
  }
  const getFileSrc = (file, isThumbnail) => {
    const buffer = Buffer.from(isThumbnail ? file?.thumbnailData : file?.fileData)
    const data = new Blob([buffer], { type: `${isThumbnail ? file?.thumbnailType : file?.fileType}` })
    return (URL.createObjectURL(data))
  }
  console.log('categoryFiles are', categoryFiles)
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (
    <>
      { categoryFiles
        ? categoryFiles.map((file) => (
          <>
            <Grid item xs={6} md={2} lg={2}>
              <div style={{
                borderRadius: '10px',
                backgroundColor: '#FFFFFF'
              }}>
                <a
                href={getFileSrc(file, false)}
                target='_blank'
                >
                <div className='documents' style={{ textAlign: 'center' }}>
                    <ImageComponent fileId={file?.fileId} />
                  {/* <img src={ getThumbnailUrl(file?.fileId) } style={{
                    width: '100%',
                    height: '204px',
                    objectFit: 'contain'
                  }} /> */}
                  {/* <Document
                  // file='/static/FULL_Comp_Plan_1.pdf'
                    file={''}
                  >
                    <Page pageNumber={1} />
                  </Document> */}
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
              </div>
            </Grid>
          </>
        ))
        : <></> }
    </>
  )
}

export default DocumentCard
