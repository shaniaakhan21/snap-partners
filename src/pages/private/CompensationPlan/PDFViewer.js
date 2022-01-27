import React from 'react'
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core'

export const PDFViewer = () => {
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
			<div
				id='pdf-viewer'
				style={{
					height: '750px',
					maxWidth: 900,
					width: '100%',
					marginLeft: 'auto',
					marginRight: 'auto'
				}}
			>
				<Viewer fileUrl='/svg/plan.pdf' defaultScale={SpecialZoomLevel.PageFit} />
			</div>
		</Worker>
	)
}
