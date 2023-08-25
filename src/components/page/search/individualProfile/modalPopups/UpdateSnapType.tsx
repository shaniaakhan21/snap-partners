/* eslint-disable no-var */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import { passFilterLogic } from '@mui/x-data-grid/internals'
import axios from 'axios'
import { ButtonComponent, CheckboxComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { userRoleOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { getLocalStorage } from 'lib/utils/localStorage'
import React, { useState, useEffect } from 'react'

function UpdateSnapTypeModal ({ snapTypeModal, onCloseSnapTypeModal, userId, userRoles }) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }

  useEffect(() => {
    var arr = []
    userRoles && Object.keys(userRoles).map((key) => {
      if (userRoles[key] && key !== 'admin') {
        arr.push(key)
      }
      setSnapType([...arr])
    })
  }, [userRoles])
  const [snapType, setSnapType] = useState([])

  const handleUpdateSnapType = async (e) => {
    var roles = {}
    var snapTypeArray = snapType
    userRoles && Object.keys(userRoles).map((role) => {
      if (role === 'admin') {
        roles[role] = userRoles.admin
      } else if (snapTypeArray.includes(role)) {
        snapTypeArray.splice(snapTypeArray.indexOf(role), 1)
        roles[role] = true
      } else {
        roles[role] = false
      }
    })
    if (snapTypeArray.length > 0) {
      snapTypeArray.map((role) => {
        roles[role] = true
      })
    }
    var body = { userId, roles }
    const token = getLocalStorage('accessToken')
    await axios.put('/api/admin/snapType', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        if (result.data.result[0]) {
          alert('User Snap Type Updated Successfully')
          window.location.reload()
        }
      })
      .catch((e) => {
        console.log('error while updating snap type', e)
      })
  }
  const updateSnapType = (event, param) => {
    if (event.target.checked) {
      setSnapType([...snapType, event.target.value])
    } else {
      setSnapType(snapType.filter((item) => item !== event.target.value))
    }
  }
  return (
    <Modal open={snapTypeModal} onClose={onCloseSnapTypeModal} className='resetPasswordModal'>
      <Box sx={style}>
        <CheckboxComponent label={'select user type'} options={userRoleOptions} onChangeFunction={updateSnapType} checkedArray={snapType} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title='submit' onClickFunction={handleUpdateSnapType}/>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateSnapTypeModal
