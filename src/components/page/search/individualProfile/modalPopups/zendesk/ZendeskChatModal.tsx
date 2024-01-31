/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */

/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, InputComponent, TextArea } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useAuthStore } from 'lib/stores'
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align'

const ZendeskChatModal = ({ zendeskChatModal, closeChatModal, ticket, ticketFlag, setTicketFlag, scrollRef, ticketSelectFlag }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24
    // p: 4
  }
  const { auth, setAuth } = useAuthStore()
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState({
    author_id: auth?.zendesk_id,
    comment_body: '',
    attachment: null

  })
  const [commentFile, setCommentFile] = useState(null)
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
  }, [commentFlag, ticketSelectFlag])
  useEffect(() => {
    if (comments.length > 0) {
      getCommentUsers(comments)
    }
  }, [comments, commentFlag])
  useEffect(() => {
    scrollRef.current ? scrollRef.current.scrollTop = scrollRef?.current?.scrollHeight : () => {}
    // scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [comments, ticketSelectFlag])

  const handleCommentValue = (event) => {
    setCommentBody({ ...commentBody, comment_body: event.target.value })
  }

  const handlePostComment = async () => {
    console.log('comment body is', commentBody)
    const zendeskCommentData = new FormData()
    zendeskCommentData.append('ticket_id', ticket?.id)
    zendeskCommentData.append('ticketStatus', ticket?.status)

    Object.entries(commentBody).forEach(([key, value]) => {
      zendeskCommentData.append(key, value)
    })
    await axios.post('/api/zendesk/comments', zendeskCommentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        if (res.data?.response?.ticket) {
          setCommentBody({ ...commentBody, comment_body: '', attachment: null })
          setCommentFlag(!commentFlag)
          if (ticket?.status === 'solved') {
            setTicketFlag(!ticketFlag)
          }
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
          <h2 className='ticket_heading'>Ticket #{ticket?.id}</h2>
        </div>
        <div className='ticket_chatbox_mainbox' ref={scrollRef}>
          {
            comments?.map((comment) =>
              <div style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end',
                marginTop: 20,
                marginLeft: comment.author_id == auth?.zendesk_id ? '50%' : 0,
                marginRight: comment.author_id != auth?.zendesk_id ? '50%' : 0
              } }>
                <div style={{ marginLeft: comment.author_id == auth?.zendesk_id ? 'auto' : 0, marginRight: comment.author_id != auth?.zendesk_id ? 'auto' : 0 }}>
                  <h2 style={{ marginBottom: 10, textAlign: comment?.author_id == auth?.zendesk_id ? 'right' : 'left' }}>
                    <strong>{user && user[comment.author_id]?.name }</strong>
                  </h2>
                  <p className='zendesk_chatbox_comment' style={{
                    paddingTop: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                    backgroundColor: comment?.author_id == auth?.zendesk_id ? '#ECECEC' : '#FF998B',
                    borderRadius: 4
                  }}>
                    {comment.body}
                  </p>
                  {
                    comment.attachments.length > 0
                      ? <div>
                        <div className='ticket_commentbox_attachment_logo'>
                          <img src='/images/icons/file.svg' />
                        </div>
                        <a style={{ color: 'blue' }} href={`${comment.attachments[0].content_url}`} target='_blank'>file Attachment</a>
                      </div>
                      : <></>
                  }
                </div>
              </div>
            )}
        </div>
        {/* <InputComponent label='Subject' placeholder='Subject of your Issue' value={ticketBody.subject} param={'subject'} onChangeFunction={handleEditProfileUpdate} /> */}
        <div className='ticket_commentbox_footer'>
          <TextArea
            label='Write Comment'
            placeholder='Type your comment here'
            param={'description'}
            value={commentBody.comment_body}
            onChangeFunction={handleCommentValue}
            disabled={(ticket?.status && ticket?.status === 'closed')}/>
          <label>File Attachment(optional)</label> <br/>
          <input type='file' name='zendeskCommentAttachment' onChange={(e) => { setCommentBody({ ...commentBody, attachment: e.target.files[0] }) }} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ButtonComponent title={'Send'} onClickFunction={handlePostComment} />
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default ZendeskChatModal
