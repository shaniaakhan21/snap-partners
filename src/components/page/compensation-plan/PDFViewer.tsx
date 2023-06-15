// import { Viewer, Worker, SpecialZoomLevel, PageChangeEvent } from '@react-pdf-viewer/core'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import { GTMTrack } from 'lib/utils/gtm'
import { useState } from 'react'

export default function PDFViewer () {
  const onPageChange = (e) => {
     GTMTrack.changeCompensationPlanPage(numPages)
  }
  const [numPages, setNumPages] = useState(null)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  GTMTrack.changeCompensationPlanPage(numPages)
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (
    <>
      <Document
        file='/static/FULL_Comp_Plan_1.pdf'
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </>
    // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
    //   <div
    //     className='mx-auto w-full'
    //     style={{ height: '900px', maxWidth: 1280 }}
    //   >
    //     <Viewer fileUrl="/static/FULL_Comp_Plan_1.pdf" defaultScale={SpecialZoomLevel.PageFit} onPageChange={onPageChange}/>
    //   </div>
    // </Worker>
  )
}
