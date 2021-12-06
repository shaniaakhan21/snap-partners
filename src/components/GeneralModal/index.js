import React from 'react'
import { Box, Modal, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from './styles'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  "&:focus":{
    outline: "none"
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
        <Box sx={{ ...style, width: '90%', maxWidth: "648px" }}>
          {showClose && (
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          )}
          {children}
        </Box>
      </Modal>
  )
}

GeneralModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default GeneralModal
