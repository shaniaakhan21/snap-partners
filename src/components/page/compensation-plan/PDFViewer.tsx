import { Viewer, Worker, SpecialZoomLevel, PageChangeEvent } from '@react-pdf-viewer/core'
import { compensationPlanPageChange } from 'lib/utils/gtm'

export default function PDFViewer () {
  const onPageChange = (e: PageChangeEvent) => {
    compensationPlanPageChange(e.currentPage)
  }
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
      <div
        className='mx-auto w-full'
        style={{ height: '750px', maxWidth: 1280 }}
      >
        <Viewer fileUrl="/static/new-plan.pdf" defaultScale={SpecialZoomLevel.PageFit} onPageChange={onPageChange}/>
      </div>
    </Worker>
  )
}
