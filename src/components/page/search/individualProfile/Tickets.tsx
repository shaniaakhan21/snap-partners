/* eslint-disable no-use-before-define */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ZendeskTicketCreation from './modalPopups/zendesk/ZendeskTicketCreation'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
// import Zendesk from 'react-zendesk'
const ZENDESK_KEY = '324987dc-ca53-451c-b524-096403f15e91'

const Tickets = () => {
  const zendeskAPI = axios.create({
    baseURL: 'https://dyrani.zendesk.com/api/v2', // Replace with your Zendesk subdomain
    auth: {
      username: 'amiralirang98@gmail.com', // Replace with your API token or email/password
      password: 'Amiralirang@123'
    }
  })

  const [zendeskTicketModal, setZendeskTicketModal] = useState(false)

  // Example: Fetch all tickets
  const getZendeskData = () => {
    zendeskAPI.get('/tickets.json')
      .then((response) => {
        console.log('Tickets:', response.data)
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error)
      })
  }

  const onZendeskTicketModalClose = () => {
    setZendeskTicketModal(false)
  }

  const setting = {
    color: {
      theme: '#000'
    },
    launcher: {
      chatLabel: {
        'en-US': 'Need Help'
      }
    },
    contactForm: {
      fields: [
        { id: 'description', prefill: { '*': 'My pre-filled description' } }
      ]
    }
  }
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-2'>
          <img src='/images/message-circle.svg' style={{ width: '50px', height: '50px' }} />
          <span className='mt-3 text-[#E35C49] font-open-sans text-xl font-semibold leading-6'>Help Tickets</span>
        </div>
        <div>
          <button onClick = {() => { setZendeskTicketModal(true) }} className= {'bg-[#2C7D0E] text-white px-3 py-2'}><span className='text-[#FFF] text-center font-open-sans text-sm font-bold leading-4 uppercase'>CREATE NEW TICKET</span></button>
        </div>
      </div>
      <div className='flex flex-row justify-evenly mt-10 gap-3'>
        <div className='searchForm-inputContainer'>
          <InputComponent label={'search ticket'} placeholder={'ID, Name, Status'} />
        </div>
        <div className='searchForm-ButtonContainer'>
          <ButtonComponent title={'search'} />
        </div>
      </div>
      <div>
        <p className='text-[#404040] font-open-sans text-xl font-semibold leading-6 mt-10'>Friday, June 21, 2019</p>
      </div>
      <div>
        {/* Your React component content */}
        <button onClick={() => { getZendeskData() }}>click here</button>
      </div>

      <ZendeskTicketCreation zendeskTicketModal={zendeskTicketModal} closeModal = {onZendeskTicketModalClose} />
    </div>
  )
}

export default Tickets
