/* eslint-disable no-use-before-define */
import axios from 'axios'
import React, { useEffect } from 'react'
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
      <div>
        {/* Your React component content */}
        <button onClick={() => { getZendeskData() }}>click here</button>
      </div>
    </div>
  )
}

export default Tickets
