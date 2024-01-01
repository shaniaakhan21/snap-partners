/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, InputComponent, TextArea } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useEffect, useState } from 'react'

const ZendeskTicketCreation = ({ zendeskTicketModal, closeModal, setTicketFlag, ticketFlag, zendesk_id, name, email }) => {
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
  const [ticketBody, setTicketBody] = useState({
    subject: '',
    description: '',
    attachment: null,
    zendesk_id,
    name,
    email

  })
  const handleEditProfileUpdate = (event, param) => {
    if (param === 'subject') { setTicketBody({ ...ticketBody, subject: event.target.value }) }
    if (param === 'description') { setTicketBody({ ...ticketBody, description: event.target.value }) }
  }
  const createTicketFunc = async () => {
    console.log('coming to this ZendeskIntegration TICKETTS', ticketBody)
    const zendeskFormData = new FormData()

    Object.entries(ticketBody).forEach(([key, value]) => {
      zendeskFormData.append(key, value)
    })
    await axios.post('/api/zendesk/ticket', zendeskFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        alert('Ticket Created Successfully')
        setTicketFlag(!ticketFlag)
        closeModal()
      })
      .catch((e) => {
        alert('error while submitting the ticket')
      })
  }
  return (
    <Modal open={ zendeskTicketModal } onClose={closeModal} >
      <Box sx={style}>
        <h2>Create Ticket For Your Issue</h2>
        <InputComponent label='Subject' placeholder='Subject of your Issue' value={ticketBody.subject} param={'subject'} onChangeFunction={handleEditProfileUpdate} />
        <label>Ticket Attaachment</label> <br/>
        <input type='file' name='zendeskAttachment' onChange={(e) => { setTicketBody({ ...ticketBody, attachment: e.target.files[0] }) }} />
        <TextArea label='Write Details' placeholder='Write here details of the event reported' value={ticketBody.description} onChangeFunction={handleEditProfileUpdate} param={'description'}/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title={'submit ticket'} onClickFunction={createTicketFunc} />
        </div>
      </Box>
    </Modal>
  )
}

export default ZendeskTicketCreation
