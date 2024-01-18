/* eslint-disable array-callback-return */

/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, InputComponent, TextArea } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from 'lib/stores'
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align'

const ZendeskChatModal = ({ zendeskChatModal, closeChatModal, ticket, ticketFlag, setTicketFlag }) => {
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
  const { auth, setAuth } = useAuthStore()
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState('')
  const [user, setUser] = useState({})
  const [commentFlag, setCommentFlag] = useState(false)
  const getComments = async (ticketId: number) => {
    await axios.get('/api/zendesk/comments', {
      params: {
        ticket_id: ticketId
      }
    })
      .then((res) => {
        setComments(res.data.response?.comments)
      })
  }

  const getCommentUsers = async (comment: any[]) => {
    const userIds = comment.map((data) => data.author_id)
    const userIdString = (Array.from(new Set(userIds))).join(',') // to remove recurring ids and conert it to string
    await axios.get('/api/zendesk/multiple_requester', {
      params: {
        requester_array: userIdString
      }
    })
      .then((res) => {
        const userArray: any[] = res.data?.response?.users
        const userObj = {}
        userArray.map((data) => {
          userObj[data.id] = data
        })
        setUser(userObj)
        console.log('comment users we got', res.data?.response)
      })
  }
  useEffect(() => {
    if (ticket && ticket.id) {
      getComments(ticket.id)
    }
  }, [ticket, commentFlag])
  useEffect(() => {
    if (comments.length > 0) {
      getCommentUsers(comments)
    }
  }, [comments, commentFlag])

  const handleCommentValue = (event) => {
    setCommentBody(event.target.value)
  }

  const handlePostComment = async () => {
    console.log('comment body is', commentBody)
    await axios.post('/api/zendesk/comments', {
      ticket_id: ticket.id,
      author_id: auth?.zendesk_id,
      comment_body: commentBody
    })
      .then((res) => {
        if (res.data?.response?.ticket) {
          setCommentBody('')
          setCommentFlag(!commentFlag)
        } else {
          alert('adding comment failed')
        }
      })
  }
  console.log('comments are', comments, user)
  return (
    <Modal open={ zendeskChatModal } onClose={closeChatModal} >
      <Box sx={style}>
        <div>
          <h2 style={{ marginTop: 16, height: 10 }}>Ticket #{ticket?.id} abc</h2>
        </div>
        <div >
          {
            comments?.map((comment) =>
              <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'end', marginTop: 20, marginLeft: comment.author_id == auth?.zendesk_id ? '50%' : 0, marginRight: comment.author_id != auth?.zendesk_id ? '50%' : 0 } }>
                <div style={{ marginLeft: comment.author_id == auth?.zendesk_id ? 'auto' : 0, marginRight: comment.author_id != auth?.zendesk_id ? 'auto' : 0 }}>
                  <h2 style={{ marginBottom: 10, textAlign: comment?.author_id == auth?.zendesk_id ? 'right' : 'left' }}>
                    <strong>{user && user[comment.author_id]?.name }</strong>
                  </h2>
                  <p style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: comment?.author_id == auth?.zendesk_id ? '#ECECEC' : '#FF998B', borderRadius: 4 }}>
                    {comment.body}
                  </p>
                </div>
              </div>
            )}
        </div>
        {/* <InputComponent label='Subject' placeholder='Subject of your Issue' value={ticketBody.subject} param={'subject'} onChangeFunction={handleEditProfileUpdate} />
        <label>Ticket Attaachment</label> <br/>
        <input type='file' name='zendeskAttachment' onChange={(e) => { setTicketBody({ ...ticketBody, attachment: e.target.files[0] }) }} /> */}
        <TextArea label='Write Comment' placeholder='Type your comment here' param={'description'} value={commentBody} onChangeFunction={handleCommentValue}/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title={'Send'} onClickFunction={handlePostComment} />
        </div>
      </Box>
    </Modal>
  )
}

export default ZendeskChatModal
