/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { userLevelOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { getLocalStorage } from 'lib/utils/localStorage'
import React, { useState } from 'react'

function UpdateUserLevelModal ({ userLevelModal, onCloseUserLevelModal, userId }) {
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
  const [userLevel, setUserLevel] = useState('')
  const handleUpdateUserLevel = async () => {
    const token = getLocalStorage('accessToken')
    if (userLevel !== '') {
      const body = {
        userLevel
      }
      await axios.put(`/api/admin/updateUserLevel/${userId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
          }
      })
        .then((result) => {
          if (result.data.result[0]) {
            alert('User Level Updated Successfully')
            window.location.reload()
          }
        })
    }
  }
  const updateUsreLevel = (event, param) => {
    setUserLevel(event.target.value)
  }
  return (
    <Modal open={userLevelModal} onClose={onCloseUserLevelModal} className='resetPasswordModal'>
      <Box sx={style}>
        <SelectComponent label={'Edit User Role'} name={'userLevel'} value={userLevel} options={userLevelOptions} onChangeFunction={updateUsreLevel} param={'userLevel'} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title='submit' onClickFunction={handleUpdateUserLevel}/>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateUserLevelModal
