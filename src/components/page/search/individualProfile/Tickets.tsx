/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import Zendesk from 'react-zendesk'
const ZENDESK_KEY = '324987dc-ca53-451c-b524-096403f15e91'

const Tickets = () => {
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
        zendesk will be here
        <Zendesk zendeskKey={ZENDESK_KEY} {...setting} />
      </div>
    </div>
  )
}

export default Tickets
