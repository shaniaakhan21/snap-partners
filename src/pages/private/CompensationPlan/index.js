import React from 'react'
import { PDFViewer } from './PDFViewer'
import { useStyles } from './styles'

export const CompensationPlanPage = () => {
	const classes = useStyles()

	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				<h4 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>Compensation Plan</h4> <br />
				<a
					download
					href='/svg/plan.pdf'
					className={classes.buttonDownload}
				>
					Download Compensation Plan
				</a>
			</div>
			<br/>
			<br/>

			<PDFViewer />
		</div>
	)
}
