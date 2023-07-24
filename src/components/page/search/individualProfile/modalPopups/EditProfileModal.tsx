/* eslint-disable no-use-before-define */
import { Modal, Box } from '@mui/material'
import axios from 'axios'
import { InputComponent, ButtonComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useState } from 'react'

interface IProfileData {
    email?:string,
    socialSecurityNumber?: number,
    username?: string,
    phoneNumber?: string,
    name?: string,
    lastname?: string,
    street?: string,
    state?: string,
    zip?: string
}

function EditProfileModal ({ editProfileModal, onCloseEditProfileModal, userId }) {
  const [editProfileData, setEditProfileData] = useState<IProfileData>({
    email: '',
    socialSecurityNumber: null,
    username: '',
    name: '',
    phoneNumber: '',
    lastname: '',
    street: '',
    state: '',
    zip: ''
  })
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  const handleEditProfile = async () => {
    let body = {}
    if (editProfileData.email !== '') {
      body = { ...body, email: editProfileData.email }
    }
    if (editProfileData.username !== '') {
      body = { ...body, username: editProfileData.username }
    }
    if (editProfileData.socialSecurityNumber !== null && !Number.isNaN(editProfileData.socialSecurityNumber)) {
      body = { ...body, socialSecurityNumber: editProfileData.socialSecurityNumber }
    }
    if (editProfileData.name !== '') {
      body = { ...body, name: editProfileData.name }
    }
    if (editProfileData.lastname !== '') {
      body = { ...body, lastname: editProfileData.lastname }
    }
    if (editProfileData.phoneNumber !== '') {
      body = { ...body, phoneNumber: editProfileData.phoneNumber }
    }
    if (editProfileData.street !== '') {
      body = { ...body, street: editProfileData.street }
    }
    if (editProfileData.state !== '') {
      body = { ...body, state: editProfileData.state }
    }
    if (editProfileData.zip !== '') {
      body = { ...body, zip: editProfileData.zip }
    }

    if (Object.keys(body).length !== 0) {
      console.log('in submit profile')
      await axios.put(`/api/admin/editUserProfile/${userId}`, body)
        .then((result) => {
          if (result.data.result[0] === 1) {
            alert('user Profile Updated')
            window.location.reload()
          }
        })
    }
  }
  const handleEditProfileUpdate = (event, param) => {
    if (param === 'email') { setEditProfileData({ ...editProfileData, email: event.target.value }) }
    if (param === 'username') { setEditProfileData({ ...editProfileData, username: event.target.value }) }
    if (param === 'socialSecurityNumber') { setEditProfileData({ ...editProfileData, socialSecurityNumber: parseInt(event.target.value) }) }
    if (param === 'name') { setEditProfileData({ ...editProfileData, name: event.target.value }) }
    if (param === 'lastname') { setEditProfileData({ ...editProfileData, lastname: event.target.value }) }
    if (param === 'phoneNumber') { setEditProfileData({ ...editProfileData, phoneNumber: event.target.value }) }
    if (param === 'street') { setEditProfileData({ ...editProfileData, street: event.target.value }) }
    if (param === 'state') { setEditProfileData({ ...editProfileData, state: event.target.value }) }
    if (param === 'zip') { setEditProfileData({ ...editProfileData, zip: event.target.value }) }
  }
  return (
    <Modal open={editProfileModal} onClose={onCloseEditProfileModal} className='resetPasswordModal'>
      <Box sx={style}>
        <InputComponent label='New Email' placeholder='New Email' value={editProfileData.email} onChangeFunction={handleEditProfileUpdate} param={'email'} />
        <InputComponent label='New UserName' placeholder='New userName' value={editProfileData.username} onChangeFunction={handleEditProfileUpdate} param={'username'} />
        <InputComponent label='New Social Security Number' placeholder='New SSN' type={'number'} value={editProfileData.socialSecurityNumber} onChangeFunction={handleEditProfileUpdate} param={'socialSecurityNumber'} />
        <InputComponent label='Phone Number' placeholder='phone number' value={editProfileData.phoneNumber} onChangeFunction={handleEditProfileUpdate} param={'phoneNumber'} />
        <InputComponent label='Name' placeholder='name' value={editProfileData.name} onChangeFunction={handleEditProfileUpdate} param={'name'} />
        <InputComponent label='lastname' placeholder='Lastname' value={editProfileData.lastname} onChangeFunction={handleEditProfileUpdate} param={'lastname'} />
        <hr />
        <InputComponent label='street' placeholder='Street' value={editProfileData.street} onChangeFunction={handleEditProfileUpdate} param={'street'} />
        <InputComponent label='state' placeholder='State' value={editProfileData.state} onChangeFunction={handleEditProfileUpdate} param={'state'} />
        <InputComponent label='zip' placeholder='Zip' value={editProfileData.zip} onChangeFunction={handleEditProfileUpdate} param={'zip'} />

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title='submit' onClickFunction={ handleEditProfile } />
        </div>
      </Box>
    </Modal>
  )
}

export default EditProfileModal
