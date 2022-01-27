import React from 'react'
import { PDFViewer } from './PDFViewer'

export const CompensationPlanPage = () => {
	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				<h4 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Compensation Plan</h4>
			</div>
			<br/>

			<PDFViewer />
		</div>
	)
}
