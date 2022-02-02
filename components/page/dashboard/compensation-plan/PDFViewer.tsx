import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core'

export const PDFViewer = () => {
  if (window) {
    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
        <div
          className='mx-auto w-full'
          style={{ height: '750px', maxWidth: 900 }}
        >
          <Viewer fileUrl="/static/plan.pdf" defaultScale={SpecialZoomLevel.PageFit} />
        </div>
      </Worker>
    )
  }

  return (
    <div>
      <span>Loading</span>
    </div>
  )
}
