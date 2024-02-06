/* eslint-disable no-use-before-define */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ZendeskTicketCreation from 'components/page/search/individualProfile/modalPopups/zendesk/ZendeskTicketCreation'
import ZendeskChatModal from 'components/page/search/individualProfile/modalPopups/zendesk/ZendeskChatModal'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import { useAuthStore } from 'lib/stores'
import { Spinner } from 'components/common/loaders'
// import Zendesk from 'react-zendesk'

const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#FBFDFF',
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none'
  },
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'hidden'
  }

}))
const Tickets = ({ zendesk_id, name, email }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [allTickets, setAllTickets] = useState([])
  const [tickets, setTickets] = useState([])
  const [singleTicket, setSingleTicket] = useState()
  const [ticketFlag, setTicketFlag] = useState(false)
  const scrollRef = useRef(null)
  const [ticketSelectFlag, setTicketSelectFlag] = useState(false)
  const { auth } = useAuthStore()


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    getZendeskData()
  }, [ticketFlag])

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => {
        const value = params.value
        const cellStyle = {
          padding: '3% 10%',
          color: 'white',
          fontSize: '1.2em',
          backgroundColor: value === 'open' ? '#FFB7AD' : value === 'solved' ? '#A2E85D' : 'black'
        }

        return <div style={cellStyle}>{`${value}`}</div>
      }
    },
    {
      field: 'id',
      headerName: 'ID'
      // flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'clientName',
      headerName: 'Client Name',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'dayCreated',
      headerName: 'DayCreated',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'lastResponse',
      headerName: 'Last Response',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'comments',
      headerName: 'Comments',
      flex: windowWidth <= 400 ? 0.5 : 1
    }
  ]

  const [zendeskTicketModal, setZendeskTicketModal] = useState(false)
  const [zendeskChatOpen, setZendeskChatOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ticketSearchString, setTicketSearchString] = useState('')

  // Example: Fetch all tickets
  const getZendeskData = () => {
    setLoading(true)
    axios.get('/api/zendesk/ticket', {
      params: {
        zendesk_id: zendesk_id,
        IsPublic: false
      }
    })
      .then(async (response) => {
        const ticketArray = await Promise.all(response.data.response.tickets.map(async (ticket) => {
          const requesterData = await axios.get('/api/zendesk/requester', { params: { requester_id: ticket.requester_id } })
          const requesterName = await requesterData.data.response.user.name
          const dayCreated = new Date(ticket.created_at)
          const lastUpdated = new Date(ticket.updated_at)
          return {
            clientName: requesterName,
            status: ticket.status,
            subject: ticket.raw_subject,
            dayCreated: `${dayCreated.getMonth() + 1}/${dayCreated.getDate()}/${dayCreated.getFullYear()}`,
            lastUpdated: `${lastUpdated.getMonth() + 1}/${lastUpdated.getDate()}/${lastUpdated.getFullYear()}`,
            lastResponse: ticket.lastRespondentName,
            comments: ticket.comment_count,
            id: ticket.id
          }
        }))
        setTickets(ticketArray)
        setAllTickets(ticketArray)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error fetching tickets:', error)
      })
  }

  const onZendeskTicketModalClose = () => {
    setZendeskTicketModal(false)
  }
  const onZendeskChatModalClose = () => {
    setZendeskChatOpen(false)
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

  const handleTicketSelect = (params) => {
    setSingleTicket(params.row)
    setZendeskChatOpen(true)
    setTicketSelectFlag(!ticketSelectFlag)
  }

  const handleInputSearchString = (event) => {
    setTicketSearchString(event.target.value)
  }

  const handleTicketSearch = (event) => {
    event.preventDefault()
    if (Number(ticketSearchString)) {
      setTickets(allTickets && allTickets.filter((ticket) => ticket.id === Number(ticketSearchString)))
    } else {
      if (ticketSearchString === 'solved' || ticketSearchString === 'closed' || ticketSearchString === 'open' || ticketSearchString === 'new') {
        setTickets(allTickets && allTickets.filter((ticket) => ticket.status === ticketSearchString))
      } else {
        console.log('search by name')
      }
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
          <InputComponent label={'search ticket'} placeholder={'ID, Name, Status'} value={ticketSearchString} onChangeFunction={handleInputSearchString} />
        </div>
        <div className='searchForm-ButtonContainer'>
          <ButtonComponent title={'search'} onClickFunction={handleTicketSearch} />
        </div>
      </div>
      <div>
        <p className='text-[#404040] font-open-sans text-xl font-semibold leading-6 mt-10'>Friday, June 21, 2019</p>
      </div>
      <div className='mt-10'>
        {!loading
          ? <StyledDataGrid rows={tickets && tickets}
            columns={columns}
            sx={{
              minHeight: '214px',
              borderColor: 'rgba(224, 224, 224, 0.5)!important'
            }}
            onCellClick={handleTicketSelect}
          />
          : <Spinner />}
      </div>
      {/* <div>
        <button onClick={() => { getZendeskData() }}>click here</button>
      </div> */}

      <ZendeskTicketCreation zendeskTicketModal={zendeskTicketModal} closeModal = {onZendeskTicketModalClose} ticketFlag={ticketFlag} setTicketFlag={setTicketFlag} zendesk_id={auth.zendesk_id} name= {auth.name} email= {auth.email} />
      <ZendeskChatModal zendeskChatModal={zendeskChatOpen} closeChatModal = {onZendeskChatModalClose} ticket={singleTicket} ticketFlag={ticketFlag} setTicketFlag={setTicketFlag} scrollRef={scrollRef} ticketSelectFlag={ticketSelectFlag} IsPublic={false} />
    </div>
  )
}

export default Tickets
