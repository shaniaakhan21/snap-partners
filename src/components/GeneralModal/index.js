import React from 'react'
import { Box, Modal, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from './styles'

function getModalStyle () {
	const top = 50
	const left = 50
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		overflowY: 'scroll',
		height: '70%',
		width: '90%',
		maxWidth: 1000,
	}
}

const GeneralModal = ({ children, open, onClose, showClose }) => {
	const classes = useStyles()
	return (
		<Modal
			disableBackdropClick
			open={open}
			onClose={onClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<div style={getModalStyle()} className={classes.paper}>
				{showClose && (
					<IconButton onClick={onClose} className={classes.closeButton}>
						<CloseIcon />
					</IconButton>
				)}
				{children}
			</div>
		</Modal>
	)
}

GeneralModal.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default GeneralModal
