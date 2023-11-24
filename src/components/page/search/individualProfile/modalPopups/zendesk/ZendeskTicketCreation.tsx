/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import { ButtonComponent, InputComponent, TextArea } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React from 'react'

const ZendeskTicketCreation = ({ zendeskTicketModal, closeModal }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  console.log('coming to this ZendeskIntegration')
  return (
    <Modal open={ zendeskTicketModal } onClose={closeModal} >
      <Box sx={style}>
        <InputComponent label='Subject' placeholder='Subject of your Issue' value={''} param={'sponsor'} />
        <TextArea label='Write Details' placeholder='Write here details of the event reported'/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title={'submit ticket'} />
        </div>
      </Box>
    </Modal>
  )
}

export default ZendeskTicketCreation
