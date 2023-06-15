/* eslint-disable import/no-absolute-path */
// import { Viewer, Worker, SpecialZoomLevel, PageChangeEvent, RenderPageProps } from '@react-pdf-viewer/core'
import { GTMTrack } from 'lib/utils/gtm'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { renderTextLayer } from 'pdfjs-dist'
import { useState } from 'react'
// import pdfFile from '/static/new-plan-v2.pdf'

export default function PDFViewer () {
  const [numPages, setNumPages] = useState(null)
  const onPageChange = (e) => {
    console.log('ll', e.currentPage)
    GTMTrack.changeCompensationPlanPage(e.currentPage)
  }
  // const renderPage = (props:RenderPageProps) => {
  //   return(
  //     <>
  //       {props.canvasLayer.children}
  //       {/* {props.textLayer.children} */}
  //     </>
  //   )
  // }
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (

    <>
      <Document
        file='/static/FULL_Comp_Plan_1.pdf'
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={1} /> */}
        {Array.from(new Array(numPages), (el, index) => (
          <div >
            <Page key={`page_${index + 1}`} pageNumber={index + 1} onLoadSuccess={onPageChange}/>
          </div>
        ))}
      </Document>
    </>

  // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
  //   <div
  //     className='mx-auto w-full'
  //     style={{ height: '750px', maxWidth: 1280 }}
  //   >
  //     <Viewer fileUrl="/static/new-plan-v2.pdf" defaultScale={SpecialZoomLevel.PageFit} onPageChange={onPageChange} renderPage={renderPage} />
  //   </div>
  // </Worker>

  )
}
