import { Viewer, Worker, SpecialZoomLevel, PageChangeEvent } from '@react-pdf-viewer/core'
import { GTMTrack } from 'lib/utils/gtm'

export default function PDFViewer () {
  const onPageChange = (e: PageChangeEvent) => {
    GTMTrack.changeCompensationPlanPage(e.currentPage)
  }
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
      <div
        className='mx-auto w-full'
        style={{ height: '750px', maxWidth: 1280 }}
      >
        <Viewer fileUrl="/static/new-plan-v2.pdf" defaultScale={SpecialZoomLevel.PageFit} onPageChange={onPageChange}/>
      </div>
    </Worker>
  )
}
